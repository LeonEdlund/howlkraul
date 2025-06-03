/**
 * Creates a new CounterCoin.
 *
 * @constructor
 * @extends rune.display.Sprite
 * 
 * @param {number} [x=0] - x position.
 * @param {number} [y=0] - y position.
 * 
 * @class
 * @classdesc
 * 
 * Represents a visual coin that can spin.
 */
howlkraul.ui.CounterCoin = function (x, y) {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 12, 18, "coin_hud_12x18");

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * The small coin emitter.
   * 
   * @private
   * @type {rune.particle.Emitter}
   */
  this.m_emitter = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.CounterCoin.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.ui.CounterCoin.prototype.constructor = howlkraul.ui.CounterCoin;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Runs when object is instantiated.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.CounterCoin.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimations();
  this.m_initEmitter();
}

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Spins the coin and emits a coin.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.CounterCoin.prototype.spin = function () {
  this.animation.gotoAndPlay("spin", 0);
  this.m_emitter.emit(1);
};

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------

/**
 * Initalizes animations.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.CounterCoin.prototype.m_initAnimations = function () {
  this.animation.create("stop", [0], 20, false);
  this.animation.create("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0], 20, false);
  this.animation.find("spin").scripts.add(12, function () { this.animation.goto("stop") }, this)
  this.animation.stop();
};

/**
 * Initalizes emitter and adds it to stage.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.CounterCoin.prototype.m_initEmitter = function () {
  this.m_emitter = new rune.particle.Emitter(this.globalX, this.globalY, 2, 2, {
    particles: [howlkraul.particle.MiniCoin],
    minLifespan: 500,
    maxLifespan: 700,
    minRotation: -2,
    maxRotation: 2,
    capacity: 10,
    accelerationY: 0.05,
    maxVelocityX: 1,
    minVelocityX: -1,
    maxVelocityY: -1,
    minVelocityY: -0.5,
  });

  this.stage.addChild(this.m_emitter);
};