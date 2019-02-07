

//== Coin Class ================================================================

//-- Dependencies --------------------------------
const fileCoin = require('../../static/coin.png');

//-- Project Constants ---------------------------
const EASING_FACTOR = 2/3;
// The amount the coin will progress each cycle, as a factor of total distance
const TIME_FADE = 16;
// The number of drawing cycles before a coin disappears
const imageCoin = document.createElement('img');
imageCoin.src = fileCoin;

//-- Definition and Initialization ---------------
export default class {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.targetX = undefined;
    this.targetY = undefined;
    this.timeFade = 0;
  }
  
  //-- Drawing -------------------------------------
  draw(drawingState) {
    const mainContext = drawingState.mainContext;
    this.advancePosition();
    mainContext.save();
    mainContext.globalAlpha = this.timeFade / TIME_FADE;
    if(this.timeFade <= 2) { mainContext.globalAlpha = 0;}
    mainContext.globalCompositeOperation = 'source-over';
    let squish = Math.min(this.deltaTotal, 24);
    let drawWidth  = 32 - squish;
    let drawHeight = 32;
    mainContext.translate(this.x, this.y);
    mainContext.rotate(this.angle);
    mainContext.drawImage(
      imageCoin,
      0 - drawWidth/2, 0 - drawHeight/2,
      drawWidth, drawHeight,
    );
    mainContext.restore();
  }
  active() {
    // Determines whether or not the coin needs to be drawn
    // If the coin is moving, it's active
    if(this.x !== this.targetX || this.y !== this.targetY) { return true;}
    // If the coin is fading out, it's active
    if(--this.timeFade > 0) { return true;}
    // Otherwise, not active
    return false;
  }
  
  //-- Positioning ---------------------------------
  advancePosition(){
    // Determine distance between target and current position
    let deltaX = this.targetX - this.x;
    let deltaY = this.targetY - this.y;
    // If distance is less than 1, skip directly to target
    if(Math.abs(deltaX) <= 1) {
      deltaX = 0;
      this.x = this.targetX;
    }
    if(Math.abs(deltaY) <= 1) {
      deltaY = 0;
      this.y = this.targetY;
    }
    // Do nothing if there's no distance to travel
    if(!deltaX && !deltaY) { return;}
    // Calculate distance to travel this tick. Move at least 1
    deltaX *= EASING_FACTOR;
    deltaY *= EASING_FACTOR;
    if(Math.abs(deltaX) < 1) { deltaX = Math.sign(deltaX);}
    if(Math.abs(deltaY) < 1) { deltaY = Math.sign(deltaY);}
    // Advance current position
    if(deltaX) { this.x += deltaX;}
    if(deltaY) { this.y += deltaY;}
    // Calculate movement angle
    this.angle = Math.atan2(deltaY, deltaX);
    this.deltaTotal = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    // Reset fade time
    this.timeFade = TIME_FADE;
  }
  setPosition(newX, newY) {
    // Inititialize coordinates
    if(this.x === undefined) { this.x = newX;}
    if(this.y === undefined) { this.y = newY;}
    //
    this.targetX = newX;
    this.targetY = newY;
  }
}
