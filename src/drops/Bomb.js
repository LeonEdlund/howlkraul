/**
 * Creates a new Bomb object.
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
 * Creates an instance of a Bomb that can be placed on the stage.
 */
howlkraul.drops.Bomb = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 19, 22, "bomb_19x22");


  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * How long the Bomb should flicker.
   * 
   * @private
   * @type {number}
   */
  this.FLICKER_TIME = 700;

  /**
   * The fragmentEmitter.
   * 
   * @private
   * @type {number}
   */
  this.m_emitter = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.drops.Bomb.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.drops.Bomb.prototype.constructor = howlkraul.drops.Bomb;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.drops.Bomb.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
  this.m_initEmitter();
  this.flicker.start(this.FLICKER_TIME)
}

/**
 * @inheritdoc
 */
howlkraul.drops.Bomb.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
}

/**
 * @inheritdoc
 */
howlkraul.drops.Bomb.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
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
howlkraul.drops.Bomb.prototype.m_initAnimations = function () {
  this.animation.create("countDown", [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12, false);
  this.m_setAnimationScript(this.animation.find("countDown"));
}

/**
 * Initializes emitter.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Bomb.prototype.m_initEmitter = function () {
  this.m_emitter = new rune.particle.Emitter(this.x, this.y, 10, 10, {
    capacity: 30,
    accelerationY: 0,
    maxVelocityX: 3,
    minVelocityX: -3,
    maxVelocityY: 3,
    minVelocityY: -3,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 700,
    maxLifespan: 700,
    particles: [howlkraul.particle.BombFragment]
  });

  this.application.scenes.selected.stage.addChild(this.m_emitter);
}

/**
 * Counts down, flicker and removes Bomb when counter reaches 0.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Bomb.prototype.m_setAnimationScript = function (animation) {
  animation.scripts.add(19, function () {
    this.m_emitter.moveTo(this.centerX, this.centerY);
    this.m_emitter.emit(30);
    this.dispose();
  }, this);
}