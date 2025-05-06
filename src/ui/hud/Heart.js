howlkraul.ui.Heart = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.Sprite.call(this, x, y, 11, 12, "hearts_11x12");
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
  }
};

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
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