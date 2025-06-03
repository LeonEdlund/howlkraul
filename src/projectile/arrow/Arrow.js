/**
 * Creates a new instance of a Arrow.
 *
 * @constructor
 * @extends howlkraul.projectile.Projectile
 * 
 * @param {number} [x=0] - X spawn position.
 * @param {number} [y=0] - Y spawn position.
 * 
 * @class
 * @classdesc
 *
 * Represents a arrow shot by a goblin.
 */
howlkraul.projectile.Arrow = function (x, y) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 19, 5, "arrow_19x5");

  this.acceleration = 1;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.projectile.Arrow.prototype = Object.create(howlkraul.projectile.Projectile.prototype);
howlkraul.projectile.Arrow.prototype.constructor = howlkraul.projectile.Arrow;

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @overide
 */
howlkraul.projectile.Arrow.prototype.m_initHitbox = function () {
  this.hitbox.set(5, 1, 10, 5);
};