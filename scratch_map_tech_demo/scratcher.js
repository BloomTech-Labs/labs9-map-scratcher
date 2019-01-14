

//== Scratchable Canvas ========================================================

//-- Project Constants ---------------------------
const COMPLETION_CHECK_RATE = 1000/4;
/* Completion Check Rate: The number of miliseconds between checks to see if
    the user has completed scratching the entire map. (only takes place during
    and immediately after scratch actions.)*/
const COMPLETION_PIXEL_RATIO = 1/75;
/* Completion Pixel Ratio: The ratio of unscratched pixels to scratchable pixels
    below which scratching is considered complete.*/


//== Initialization ============================================================

class Scratcher {
    constructor(container, options, callback) {
        // Store provided completion callback
        this.completionCallback = callback;
        // Setup Main canvas and drawing context
        const scratchCanvas = document.createElement('canvas');
        scratchCanvas.addEventListener(
            'mousemove',
            this.handleMouseMove.bind(this),
        );
        scratchCanvas.addEventListener(
            'touchmove',
            this.handleTouchMove.bind(this),
        );
        container.appendChild(scratchCanvas);
        this.context = scratchCanvas.getContext('2d');
        // Setup compositing canvas and context
        const compositingCanvas = document.createElement('canvas');
        compositingCanvas.width  = scratchCanvas.width ;
        compositingCanvas.height = scratchCanvas.height;
        this.compositingContext = compositingCanvas.getContext('2d');
        //container.appendChild(compositingCanvas);
        // Configure scratch color
        this.scratchColor = options.scratchColor;
        // Load Resources
        this.ready = false;
        this.resources = {};
        this.setupResource(compositingCanvas, 'compositingCanvas');
        const resourcesToLoad = {
            alphaMask: options.countryImageUrl,
            flag: options.countryFlagUrl,
        };
        this.loadResources(resourcesToLoad).then(() => {
            this.ready = true;
            // Setup scratch overlay
            this.createScratchLayer();
            // Do initial Draw
            requestAnimationFrame(() => {
                this.draw();
            });
        });
    }


//== Resource Loading and Management ===========================================

    //-- Load Resources ------------------------------
    async loadResources(urlsToLoad) {
        const loadingPromises = [];
        Object.keys(urlsToLoad).forEach(imageId => {
            const imageUrl = urlsToLoad[imageId];
            const loadImage = new Image();
            const loadPromise = new Promise((resolve, reject) => {
                loadImage.addEventListener("error", reject);
                loadImage.addEventListener("load" , () => {
                    this.setupResource(loadImage, imageId);
                    resolve();
                });
                loadImage.src = imageUrl;
            });
            loadingPromises.push(loadPromise);
        });
        return Promise.all(loadingPromises);
    };
    
    //-- Setup Resources -----------------------------
    setupResource(resourceElement, resourceId) {
        this.resources[resourceId] = {
            image: resourceElement,
            aspectRatio: resourceElement.width / resourceElement.height,
        };
    }

    
//== Drawing ===================================================================

    //-- Draw full map scratcher ---------------------
    draw() {
        if(!this.ready) { return;}
        const context = this.context;
        const canvas = context.canvas;
        context.save();
        // Clear Canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Set Alpha Mask
        this.centerImage(this.resources.alphaMask, context);
        context.globalCompositeOperation = 'source-in';
        // Draw Background
        context.fillStyle = this.scratchColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        // Draw Foreground (Map)
        this.drawScratchOverlay();
        // Cleanup
        context.restore();
    }
    
    //-- Draw an unscratched scratching layer --------
    createScratchLayer() {
        /* Onto the compositing context, draw full black everywhere except
            within the bounds of the country, which remain transparent. As the
            user scratches the country, the transparent region will be filled
            with black pixels. */
        const compositingCanvas = this.compositingContext.canvas;
        // First center image of country, then overlay black using 'source-out'
        this.compositingContext.save();
        this.centerImage(this.resources.alphaMask, this.compositingContext);
        this.compositingContext.globalCompositeOperation = 'source-out';
        this.compositingContext.fillStyle = 'black';
        this.compositingContext.fillRect(
            0, 0, compositingCanvas.width, compositingCanvas.height
        );
        this.compositingContext.restore();
        // Calculate number of pixels that need to be scratched
        this.itchyPixels = this.unscratchedPixelCount();
    }
    
    //-- Draw image centered on supplied context -----
    centerImage(drawResource, context, offsetX, offsetY) {
        const canvas = context.canvas;
        const aspectRatio = canvas.width / canvas.height;
        let drawWidth;
        let drawHeight;
        if(drawResource.aspectRatio > aspectRatio){
            drawWidth = canvas.width;
            drawHeight = drawWidth / drawResource.aspectRatio;
        } else {
            drawHeight = canvas.height;
            drawWidth = drawResource.aspectRatio * drawHeight;
        }
        let drawOffsetX = (canvas.width  - drawWidth ) / 2;
        let drawOffsetY = (canvas.height - drawHeight) / 2;
        if(offsetX){ drawOffsetX += offsetX;}
        if(offsetY){ drawOffsetY += offsetY;}
        context.drawImage(
            drawResource.image,
            drawOffsetX, drawOffsetY, drawWidth, drawHeight,
        );
    }
    
    //-- Overlay scratch layer onto display context --
    drawScratchOverlay() {
        const context = this.compositingContext;
        const canvas = context.canvas;
        // Get scratch amount data
        const scratchData = context.getImageData(0, 0, canvas.width, canvas.height);
        context.save();
        // Draw shadow layer onto MAIN CONTEXT
        this.context.save();
        this.context.globalCompositeOperation = 'source-atop';
        context.globalCompositeOperation = 'source-out';
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.centerImage(this.resources.compositingCanvas, this.context);
        // Draw flag onto composite context
        context.globalCompositeOperation = 'source-atop';
        this.centerImage(this.resources.flag, context);
        // Draw composite onto MAIN CONTEXT
        this.centerImage(this.resources.compositingCanvas, this.context, 0, -1);
        // Replace Scratch amount data
        this.context.restore();
        context.restore();
        context.putImageData(scratchData, 0, 0);
    }
    
    //-- Erase a line across the scratch layer -------
    eraseScratchLine(startX, startY, endX, endY) {
        this.compositingContext.strokeStyle = 'black';
        this.compositingContext.lineWidth = 15;
        this.compositingContext.beginPath();
        this.compositingContext.moveTo(startX, startY);
        this.compositingContext.lineTo(endX, endY);
        this.compositingContext.closePath();
        this.compositingContext.stroke();
        requestAnimationFrame(() => {
            this.draw();
            this.scheduleCompletionCheck();
        });
    }
    
    //-- Count the number of pixels not scratched ----
    unscratchedPixelCount(){
        // Define basic metrics and get imageData from compositingCanvas
        const canvasWidth  = this.compositingContext.canvas.width ;
        const canvasHeight = this.compositingContext.canvas.height;
        const scratchData = this.compositingContext.getImageData(
            0, 0, canvasWidth, canvasHeight,
        ).data;
        const pixelWidth = 4; // 4 channels, rgba, for each pixel of imageData
        const pixelCount = canvasWidth*canvasHeight;
        // count each pixel of compositing canvas not yet changed (scratched)
        let unscratchedPixels = 0
        for(let pixelNumber = 0; pixelNumber < pixelCount; pixelNumber++) {
            // Find index offset from pixel number
            const pixelOffset = pixelNumber * pixelWidth;
            // we only check the alpha channel, index 3, for unscratched pixels
            const alphaValue = scratchData[pixelOffset+3];
            if(alphaValue === 0){
                unscratchedPixels++;
            }
        }
        // Return unscratched pixel count
        return unscratchedPixels;
    }
    
    //-- Erase the entire scratch layer --------------
    scratchAll() {
        // Scratch off entire canvas by filling compositingContext with black;
        const context = this.compositingContext;
        context.save();
        context.fillStyle = 'black';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
    }


//== Interaction ===============================================================

    //-- Respond to user touch events ----------------
    handleTouchMove(touchEvent) {
        // Prevent the user from scrolling the page while scratching
        touchEvent.preventDefault();
        // Only consider the first instance of a moving touch as a scratch
        touchEvent = touchEvent.changedTouches[0];
        // Handle touchEvent samee as mouseEvent
        this.handleMouseMove(touchEvent);
    }
    
    //-- Respond to user mouse movements -------------
    handleMouseMove(mouseEvent) {
        // Calculate coordinates of event relativee to the canvas
        const bounds = this.context.canvas.getBoundingClientRect();
        const mouseX = mouseEvent.clientX - bounds.left;
        const mouseY = mouseEvent.clientY - bounds.top ;
        // Compare to previous events (or initialize if first)
        let startX = mouseX;
        let startY = mouseY;
        if(this.lastCoords) {
            startX = this.lastCoords.x;
            startY = this.lastCoords.y;
        }
        this.lastCoords = {
            x: mouseX,
            y: mouseY,
        };
        // Scratch line from previous coordinates to current coordinates
        this.eraseScratchLine(startX, startY, mouseX, mouseY);
    }

    //-- Schedule Completion Check -------------------
    scheduleCompletionCheck() {
        // Cancel if there is already a check scheduled
        if(this.scheduledCheck) { return;}
        // Schedule a check, and made note of scheduling
        this.scheduledCheck = setTimeout(() => {
            this.checkCompletion()
        }, COMPLETION_CHECK_RATE);
    }

    //-- Check if all the map has been scratched -----
    checkCompletion() {
        // Clear the schedule so other checks can be scheduled.
        this.scheduledCheck = null;
        // Calculate percentage of canvas still unscratched.
        const unscratchedRatio = this.unscratchedPixelCount()/this.itchyPixels;
        // Check if ratio is below the threshold to be considered complete
        if(unscratchedRatio < COMPLETION_PIXEL_RATIO){
            // Caution! Magic numbers!
            this.complete();
        }
        // Cancel any checks scheduled during processing
            /* Not sure if the JS engine will execute event handlers
            while context2d.getImageData is executing. */
        if(this.scheduledCheck){
            clearTimeout(this.scheduledCheck);
        }
    }
    
    //-- Mark scratching as complete -----------------
    complete() {
        // Allow scratching after map is already complete (only callback, once)
        if(this.completed){ return;}
        this.completed = true;
        // Clear stray pixels
        this.scratchAll();
        requestAnimationFrame(() => {
            this.draw();
            // Invoke completion callback
            this.completionCallback();
        });
    }
}
