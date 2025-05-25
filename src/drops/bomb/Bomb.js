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
  // Constant Properies
  //--------------------------------------------------------------------------

  /**
   * How long the Bomb should flicker.
   * 
   * @private
   * @type {number}
   */
  this.FLICKER_TIME = 700;

}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.drops.Bomb.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.drops.Bomb.prototype.constructor = howlkraul.drops.Bomb;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Throw bomb in direction.
 * 
 * @private
 * @param {boolean} direction - True: throw left, False: throw right
 * @returns {undefined}
 */
howlkraul.drops.Bomb.prototype.throw = function (direction) {
  var directionX = direction ? -2 : 2;

  this.velocity.max.x = 4;
  this.velocity.max.y = 4;

  this.velocity.x = directionX;
  this.velocity.y = -1;

  this.velocity.acceleration.y = 0.02;

  this.velocity.drag.x = 0.01;
  this.velocity.drag.y = 0.01;
}

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Runs when the object is instantiated.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.drops.Bomb.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimations();
  this.m_initRoll();
  this.flicker.start(this.FLICKER_TIME);
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
 * Counts down, flicker and removes Bomb when counter reaches 0.
 * 
 * @private
 * @param {rune.animation.Animation}
 * @returns {undefined}
 */
howlkraul.drops.Bomb.prototype.m_setAnimationScript = function (animation) {
  animation.scripts.add(19, function () {
    var bombGroup = this.application.scenes.selected.bombs;
    bombGroup.explode(new rune.geom.Vector2D(this.centerX, this.centerY));
    bombGroup.removeMember(this, true);
  }, this);
}

/**
 * Initializes random rolling.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Bomb.prototype.m_initRoll = function () {
  this.velocity.max.x = 0.05;
  var randomNum = rune.util.Math.random(-0.02, 0.02)
  this.velocity.acceleration.x = randomNum;
  this.velocity.angularAcceleration = randomNum;
}