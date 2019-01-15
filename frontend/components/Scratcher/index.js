

/*== Scratcher =================================================================

    Scratcher is a React Component which displays an Image, which a user may
    scratch off to initiate an event. It accepts the following props:

        urlMap(string/URL) - An image specifying the shape of the component.
        urlFlag(string/URL) - An image to be overlaid on the map shape.
        colorOutline(string/color) - The map shape is outlined in this color.
        colorScratch(string/color) - Scratching the image reveals this color.
        handleScratchAll(function) - A callback to invoke once fully scratched.
        handleLoadingError(function) - A callback invoked if images can't load.

*/

//-- Dependencies --------------------------------
import React from 'react';
import * as utilities from './utilities.js';


//== React Life Cycle Methods ==================================================

//-- Constructor and definition ------------------
export default class Scratcher extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    
    //-- Render --------------------------------------
    render(props) {
        /* Debug code to determine if a new canvas is created with each render
        setTimeout(() => {
            const lastCanvas = this.canvasRef.current;
            if(!lastCanvas) {
                console.log('No canvas');
                return;
            }
            if(!lastCanvas.gack) {
                lastCanvas.gack = Math.random();
            }
            console.log(lastCanvas.gack);
        }, 100);*/
        return <canvas
            ref={this.canvasRef}
            className="scratcher"
        />
    }
    
    //-- Component Did Mount (already rendered) ------
    async componentDidMount() {
        // Get display canvas from DOM (now that component has rendered)
        const displayCanvas = this.canvasRef.current;
        // Setup drawing contexts and load images
        try {
            await this.setup(displayCanvas);
        } catch(error) {
            this.props.handleLoadingError(error);
            return;
        }
        // Do initial Drawing
        this.draw();
    }
    

//== Non-React Methods =========================================================

    //-- Setup All Canvases and Values ---------------
    async setup(displayCanvas){
        // Setup Drawing Contexts
        this.generateDrawingContexts(displayCanvas);
        // Configure for current Country
        const urlMap  = this.props.urlMap ;
        const urlFlag = this.props.urlFlag;
        await this.configureCountry(urlMap, urlFlag);
    }
    
    //-- Generate Drawing Contexts -------------------
    generateDrawingContexts(displayCanvas) {
        const movementHandler = (moveEndX, moveEndY) => {
            this.handleMovement(moveEndX, moveEndY);
        };
        this.mainContext = utilities.initializeCanvas(
            displayCanvas, movementHandler,
        );
        this.compositingContext = utilities.createCompositingCanvas(
            displayCanvas,
        );
    }
    
    //-- Configure Country ---------------------------
    async configureCountry(urlMap, urlFlag) {
        // Load Image from Urls
        const imageArray = await utilities.configureCountry(
            urlMap, urlFlag,
        );
        this.imageMap  = imageArray[0];
        this.imageFlag = imageArray[1];
        // Setup scratch overlay
        utilities.createScratchLayer(
            this.compositingContext, this.imageMap, this.imageFlag,
        );
        // Calculate number of pixels that need to be scratched
        this.itchyPixels = utilities.unscratchedPixelCount(
            this.compositingContext,
        );
        // Generate Outline
        const colorOutline = this.props.colorOutline;
        this.imageOutline = utilities.generateOutline(
            this.compositingContext, this.imageMap, colorOutline,
        );
    }

    //-- Draw Canvas ---------------------------------
    draw() {
        requestAnimationFrame(() => {
            utilities.draw(
                this.mainContext, this.compositingContext,
                this.imageMap, this.imageFlag, this.imageOutline,
                this.props.colorScratch,
            );
        })
    }
    
    //-- Handle Mouse & Touch Movements --------------
    handleMovement(moveEndX, moveEndY) {
        // Compare to previous events (or initialize if first)
        const moveStartX = this.lastMoveX || moveEndX;
        const moveStartY = this.lastMoveY || moveEndY;
        // Store last movement on state, for future comparisons
        this.lastMoveX = moveEndX;
        this.lastMoveY = moveEndY;
        // Scratch line from previous coordinates to current coordinates
        utilities.eraseScratchLine(
            this.compositingContext,
            moveStartX, moveStartY, moveEndX, moveEndY,
        );
        // Check if canvas is completely scratched
        if(!this.scratchingComplete) {
            const complete = utilities.checkCompletion(
                this.compositingContext,
                this.itchyPixels,
            );
            if(complete) {
                this.scratchingComplete = true;
                utilities.scratchAll(this.compositingContext);
                this.props.handleScratchAll();
            }
        }
        // Redraw
        this.draw();
    }
}
