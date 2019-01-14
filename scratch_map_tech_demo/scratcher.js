

//== Scratchable Canvas ========================================================

class Scratcher {

    //-- Initialization ------------------------------
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
        this.compositingContext.fillStyle = 'black';
        //container.appendChild(compositingCanvas);
        // Load Resources
        this.ready = false;
        this.resources = {};
        this.setupResource(compositingCanvas, 'compositingCanvas');
        this.loadResources().then(() => {
        // Do initial Draw
            this.ready = true;
            this.compositingContext.save();
            this.centerImage(this.resources.alphaMask, this.compositingContext);
            this.compositingContext.globalCompositeOperation = 'source-out';
            this.compositingContext.fillRect(
                0, 0, compositingCanvas.width, compositingCanvas.height
            );
            this.compositingContext.restore();
            this.draw();
        });
    }

    //-- Resource Loading and Management -------------
    async loadResources() {
        const imagesToLoad = {
            alphaMask: 'alpha_mask.svg',
            flag: 'flag.jpg',
        };
        const loadingPromises = [];
        Object.keys(imagesToLoad).forEach(imageId => {
            const imageUrl = imagesToLoad[imageId];
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
    setupResource(resourceElement, resourceId) {
        this.resources[resourceId] = {
            image: resourceElement,
            aspectRatio: resourceElement.width / resourceElement.height,
        };
    }
    
    //-- Drawing -------------------------------------
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
        context.fillStyle = 'tan';
        context.fillRect(0, 0, canvas.width, canvas.height);
        // Draw Foreground (Map)
        this.drawScratchOverlay();
        // Cleanup
        context.restore();
    }
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
        });
    }

    //-- Interaction ---------------------------------
    handleTouchMove(touchEvent) {
        touchEvent.preventDefault();
        touchEvent = touchEvent.changedTouches[0];
        this.handleMouseMove(touchEvent);
    }
    handleMouseMove(mouseEvent) {
        const bounds = this.context.canvas.getBoundingClientRect();
        const mouseX = mouseEvent.clientX - bounds.left;
        const mouseY = mouseEvent.clientY - bounds.top ;
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
        this.eraseScratchLine(startX, startY, mouseX, mouseY);
    }
}
