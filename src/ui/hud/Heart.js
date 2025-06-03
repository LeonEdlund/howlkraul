/**
 * Creates a new Heart instance.
 *
 * @constructor
 * @extends rune.display.Graphic
 * 
 * @param {number} [x=0] - The x position.
 * @param {number} [y=0] - The y position.
 * 
 * @class
 * @classdesc
 * 
 * Represents a single heart in the hud. 
 */
howlkraul.ui.Heart = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 11, 12, "hearts_11x12");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.Heart.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.ui.Heart.prototype.constructor = howlkraul.ui.Heart;

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Set Heart state.
 * 
 * @public
 * @param {number} state - 0: empty, 1: half, 2: full.
 * @returns {undefined}
 */
howlkraul.ui.Heart.prototype.setHeart = function (state) {
  if (typeof state !== 'number') throw new Error('State needs to be a number');

  switch (state) {
    case 2:
      this.animation.goto("full");
      break;
    case 1:
      this.animation.goto("half");
      break;
    case 0:
      this.animation.goto("empty");
      break;
    default:
      throw new Error('state needs to be between 0 and 2')
  }
};

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Is run once when an instance is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Heart.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initFrames();
};

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------

/**
 * Initiates the frames.
 * 
 * @private
 * @returns {undefined} 
 */
howlkraul.ui.Heart.prototype.m_initFrames = function () {
  this.animation.create("full", [2], 0, false);
  this.animation.create("half", [1], 0, false);
  this.animation.create("empty", [0], 0, false);
  this.animation.goto("full");
};