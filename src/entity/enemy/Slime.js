/**
 * Creates a new Slime object
 * 
 * @constructor
 * @extends howlkraul.entity.Enemy
 * 
 * @param {number} x  - Spawn point on X-axis.
 * @param {number} y  - Spawn point on Y-axis.
 * 
 * @class
 * @classdesc
 * 
 * Creates an instance of a Slime enemy.
 */
howlkraul.entity.Slime = function (x, y) {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  howlkraul.entity.Enemy.call(this, x, y, 19, 19, "slime_19x19");

  //--------------------------------------------------------------------------
  // Overide Protected Properties
  //--------------------------------------------------------------------------

  /**
   * @inheritdoc
   */
  this.hp = 50;

  /**
   * @inheritdoc
   */
  this.speed = rune.util.Math.random(0.15, 0.2);

  /**
   * @inheritdoc
   */
  this.defaultSpeed = this.speed;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.Slime.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Slime.prototype.constructor = howlkraul.entity.Slime;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Slime.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.hitbox.set(0, 0, this.height, this.width);
  this.states.select("FollowPlayer");
};

//--------------------------------------------------------------------------
// Overide Enemy Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
*/
howlkraul.entity.Slime.prototype.initAnimations = function () {
  this.animation.create("r", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
};

/**
 * @inheritdoc
*/
howlkraul.entity.Slime.prototype.initSounds = function () {
  this.deathSounds.push("sfx_slime_death1", "sfx_slime_death2")
};