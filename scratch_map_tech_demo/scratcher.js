

//== Scratchable Canvas ========================================================

//-- Project Constants ---------------------------
const COMPLETION_CHECK_RATE = 1000/4;
/* Completion Check Rate: The number of miliseconds between checks to see if
    the user has completed scratching the entire map. (only takes place during
    and immediately after scratch actions.) */
const COMPLETION_PIXEL_RATIO = 1/75;
/* Completion Pixel Ratio: The ratio of unscratched pixels to scratchable pixels
    below which scratching is considered complete. */
const OUTLINE_WIDTH = 3;
/* OUTLINE_WIDTH: The size of the outline around the scratchable country map.
    Will be rounded up to nearest integer. */
const SCRATCH_LINE_WIDTH = 28;
/* SCRATCH_LINE_WIDTH: the width of lines that are scratched into the map while
    the user scratches across the map (either via mouse or touch device). */


//== Initialization ============================================================

class Scratcher {
    constructor(container, options, callback) {
        // Store provided completion callback
        this.completionCallback = callback;
        // Setup Main canvas and drawing context
        const scratchCanvas = document.createElement('canvas');
        scratchCanvas.width  = 300;
        scratchCanvas.height = 300;
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
        // Configure colors
        this.colorScratch = options.colorScratch;
        this.colorBorder  = options.colorBorder ;
        // Load Resources
        this.ready = false;
        this.configureCountry(options.urlCountry, options.urlFlag)
        .then(() => {
            this.ready = true;
            // Setup scratch overlay
            this.createScratchLayer();
            // Generate Outline
            this.generateOutline();
            // Do initial Draw
            requestAnimationFrame(() => {
                this.draw();
            });
        // Throw any errors encountered while loading
        }).catch((error) => {
            throw error;
        });
    }

    //-- Load Resources for specific Country ---------
    async configureCountry(urlCountry, urlFlag) {
        // Create images of the map (alpha mask) and flag, to be used in draw
        this.imageCountry = new Image();
        this.imageFlag    = new Image();
        // Create a promise that will resolve once the image loads
        function loadImage(unloadedImage, urlToLoad) {
            return new Promise((resolve, reject) => {
                unloadedImage.addEventListener("error", reject );
                unloadedImage.addEventListener("load" , resolve);
                unloadedImage.src = urlToLoad;
            });
        }
        // Wrap both promises in one promise
        return Promise.all([
            loadImage(this.imageCountry, urlCountry),
            loadImage(this.imageFlag   , urlFlag   ),
        ]);
    };

    
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
        this.centerImage(this.imageCountry, context, OUTLINE_WIDTH);
        context.globalCompositeOperation = 'source-in';
        // Draw Background
        context.fillStyle = this.colorScratch;
        context.fillRect(0, 0, canvas.width, canvas.height);
        // Draw Foreground (Map)
        this.drawScratchOverlay();
        // Draw Outline
        context.globalCompositeOperation = 'destination-over';
        context.drawImage(this.imageOutline, 0, 0, canvas.width, canvas.height);
        // Cleanup
        context.restore();
    }
    
    //-- Generate Outline ----------------------------
    generateOutline() {
        const context = this.compositingContext;
        const canvas = context.canvas;
        // Save old data from compositing canvas
        const savedData = context.getImageData(
            0, 0, canvas.width, canvas.height,
        );
        context.save();
        // Create new canvas to use as source image to draw onto this context
        const stampCanvas = document.createElement('canvas');
        stampCanvas.width  = canvas.width ;
        stampCanvas.height = canvas.height;
        const stampContext = stampCanvas.getContext('2d');
        // Draw country shape onto stamp canvas
        stampContext.fillStyle = this.colorBorder;
        stampContext.fillRect(0, 0, stampCanvas.width, stampCanvas.height);
        stampContext.globalCompositeOperation = 'destination-in';
        this.centerImage(this.imageCountry, stampContext, OUTLINE_WIDTH);
        // Build outline by repeatedly drawing "stamp" at several pixel offsets
        let outlineWidth = OUTLINE_WIDTH;
        for(let iteration = 0; iteration < outlineWidth; iteration++) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for(let posY = -1; posY <= 1; posY++) {
                for(let posX = -1; posX <= 1; posX++) {
                    context.drawImage(stampCanvas, posX, posY);
                }
            }
            stampContext.globalCompositeOperation = 'copy';
            stampContext.drawImage(canvas, 0, 0);
        }
        // Save outline for later use
        this.imageOutline = stampCanvas;
        //document.body.appendChild(stampCanvas)
        // Restore compositing canvas to previous state
        context.restore();
        context.putImageData(savedData, 0, 0);
    }
    
    //-- Draw image centered on supplied context -----
    centerImage(sourceImage, context, margin, offsetX, offsetY) {
        /* Draw sourceImage into the center of supplied context, optionally
            offset by (x,y), and leaving an optional margin around all edges.
        */
        const canvas = context.canvas;
        margin = margin || 0;
        // Calculate the available space on the canvas, and its aspect ratio
        const fullWidth  = canvas.width  - (margin*2);
        const fullHeight = canvas.height - (margin*2);
        const aspectRatio = fullWidth / fullHeight;
        // Calculate dimensions at which to draw the image.
        const resourceRatio = sourceImage.width / sourceImage.height;
        let drawWidth;
        let drawHeight;
        if(resourceRatio > aspectRatio){
            drawWidth = fullWidth;
            drawHeight = drawWidth / resourceRatio;
        } else {
            drawHeight = fullHeight;
            drawWidth = resourceRatio * drawHeight;
        }
        // Calculate the offset at which the resized image will be centered
        let drawOffsetX = ((fullWidth  - drawWidth ) / 2)+margin;
        let drawOffsetY = ((fullHeight - drawHeight) / 2)+margin;
        // Apply specified offset (useful for slight thinkess effect)
        if(offsetX){ drawOffsetX += offsetX;}
        if(offsetY){ drawOffsetY += offsetY;}
        // Draw image
        context.drawImage(
            sourceImage,
            drawOffsetX, drawOffsetY, drawWidth, drawHeight,
        );
    }
    
    //-- Draw an unscratched scratching layer --------
    createScratchLayer() {
        /* Onto the compositing context, draw full black everywhere except
            within the bounds of the country, which remain transparent. As the
            user scratches the country, the transparent region will be filled
            with black pixels.
        */
        const context = this.compositingContext;
        const canvas = context.canvas;
        // First center image of country, then overlay black using 'source-out'
        context.save();
        this.centerImage(this.imageCountry, context, OUTLINE_WIDTH);
        context.globalCompositeOperation = 'source-out';
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
        // Calculate number of pixels that need to be scratched
        this.itchyPixels = this.unscratchedPixelCount();
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
        this.centerImage(canvas, this.context);
        // Draw flag onto composite context
        context.globalCompositeOperation = 'source-atop';
        this.centerImage(this.imageFlag, context);
        // Draw composite onto MAIN CONTEXT
        this.centerImage(canvas, this.context, 0, 0, -1);
        // Replace Scratch amount data
        this.context.restore();
        context.restore();
        context.putImageData(scratchData, 0, 0);
    }
    
    //-- Erase a line across the scratch layer -------
    eraseScratchLine(startX, startY, endX, endY) {
        // Draw a line on compositing canvas from start(x,y) to end(x,y)
        const context = this.compositingContext;
        context.strokeStyle = 'black';
        context.lineWidth = SCRATCH_LINE_WIDTH;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.closePath();
        context.stroke();
        // Display Canvas
        requestAnimationFrame(() => {
            this.draw();
            // Check if canvas is completely scratched
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
