/**
 * Creates a new Coin object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number} x - X position
 * @param {number} y - Y position
 * 
 * @class
 * @classdesc
 *
 * Creates an instance of a coin that can be placed on the stage.
 */
howlkraul.drops.Coin = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 11, 26, "coin_11x26");


  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * Reference to the scene.
   * 
   * @private
   * @type {rune.display.Scene}
   */
  this.m_scene = this.application.scenes.selected;

  /**
   * The coins worth.
   * 
   * @private
   * @type {number}
   */
  this.m_worth = 1;

  /**
   * How long the coin should stay on the screen.
   * 
   * @private
   * @type {number}
   */
  this.m_lifespan = 10000;

  /**
   * How long the coin should flicker.
   * 
   * @private
   * @type {number}
   */
  this.m_flickerTime = 2000;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.drops.Coin.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.drops.Coin.prototype.constructor = howlkraul.drops.Coin;

//--------------------------------------------------------------------------
// Getters And Setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.drops.Coin.prototype, "worth", {
  /**
   * The coins worth
   * 
   * @returns {number}
   */
  get: function () {
    return this.m_worth;
  },

  /**
   * Set coins worth
   * 
   * @param {number} value
   * @returns {number}
   */
  set: function (value) {
    this.m_worth = value;
  }
});

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.drops.Coin.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
}

/**
 * @inheritdoc
 */
howlkraul.drops.Coin.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  this.m_countDown();
}

/**
 * @inheritdoc
 */
howlkraul.drops.Coin.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);

  this.m_scene = null;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initializes animation sequenses.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Coin.prototype.m_initAnimations = function () {
  this.animation.create("drop", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
  this.animation.create("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
}

/**
 * Counts down, flicker and removes coin when counter reaches 0.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Coin.prototype.m_countDown = function () {
  if (this.m_lifespan <= 0) {
    this.m_scene.coins.removeMember(this, true);
    this.m_lifespan = 0;
    return;
  }

  this.m_lifespan -= 1000 / 60;

  if (this.m_lifespan > this.m_flickerTime - 100 && this.m_lifespan < this.m_flickerTime) {
    this.flicker.start(this.m_flickerTime, 80);
  }
}