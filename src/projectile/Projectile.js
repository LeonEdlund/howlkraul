/**
 * Abstract class for a Projectile.
 *
 * @constructor
 * @extends rune.display.Sprite
 * @abstract
 * 
 * @param {number} [x=0] - X spawn position.
 * @param {number} [y=0] - Y spawn position.
 * @param {string} texture - The name of the texture.
 * 
 * @class
 * @classdesc
 *
 * Represents a abstract class for Projectile. 
 * Used to creat a shooting particle.
 */
howlkraul.projectile.Projectile = function (x, y, texture) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 27, 32, texture);
}

//--------------------------------------------------------------------------
// Inherit
//--------------------------------------------------------------------------

howlkraul.projectile.Projectile.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.projectile.Projectile.prototype.constructor = howlkraul.projectile.Projectile;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Shot projectile in set a direction.
 * 
 * @public
 * @param {string} direction - The direction as a string.
 * @param {number} speed - The speed of the projectile.
 * @param {rune.display.DisplayGroup} group - The group the projectile should be added to.
 * @returns {undefined} 
 */
howlkraul.projectile.Projectile.prototype.shootInDirection = function (direction, speed, group) {
  this.velocity.acceleration.x = 0.9;
  switch (direction) {
    case "down":
      this.velocity.acceleration.x = 0;
      this.velocity.acceleration.y = speed;
      this.rotation = 90;
      break;
    case "down-right":
      this.velocity.acceleration.x = speed;
      this.velocity.acceleration.y = speed;
      this.rotation = 45;
      break;
    case "down-left":
      this.velocity.acceleration.x = -speed;
      this.velocity.acceleration.y = speed;
      this.rotation = 145;
      break;
    case "up":
      this.velocity.acceleration.x = 0;
      this.velocity.acceleration.y = -speed;
      this.rotation = -90;
      break;
    case "up-right":
      this.velocity.acceleration.x = speed;
      this.velocity.acceleration.y = -speed;
      this.rotation = -45;
      break;
    case "up-left":
      this.velocity.acceleration.x = -speed;
      this.velocity.acceleration.y = -speed;
      this.rotation = -145;
      break;
    case "right":
      this.velocity.acceleration.x = speed;
      this.velocity.acceleration.y = 0;
      this.rotation = 0;
      break;
    case "left":
      this.velocity.acceleration.x = -speed;
      this.velocity.acceleration.y = 0;
      this.rotation = -180;
      break;
  }

  group.addMember(this);
}

/**
 * Shoot projectile in 360 deg.
 * 
 * @protected
 * @param {rune.geom.point} point - Where the projectile should aim.
 * @param {rune.display.DisplayGroup} group - The group the projectile should be added to.
 * @return {undefined}
 */
howlkraul.projectile.Projectile.prototype.shootAtPoint = function (point, group) {
  var dx = point.x - this.centerX;
  var dy = point.y - this.centerY;
  var radians = Math.atan2(dy, dx);
  var degrees = radians * (180 / Math.PI);
  var speed = 3;

  this.velocity.x = rune.util.Math.cos(radians) * speed;
  this.velocity.y = rune.util.Math.sin(radians) * speed;

  this.rotation = degrees;

  group.addMember(this);
}

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Is run once when an instance is created.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.projectile.Projectile.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimation();
  this.m_initSounds();
  this.m_initHitbox();
};

/**
* This method is automatically executed once per "tick".
*
* @public
* @param {number} step Fixed time step.
* @returns {undefined}
*/
howlkraul.projectile.Projectile.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  if (this.m_isOutOfBounds()) {
    this.dispose();
  }
};

/**
 * Clean up and remove resources.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.projectile.Projectile.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Check if projectile is outside of map.
 * 
 * @private
 * @return {boolean}
 */
howlkraul.projectile.Projectile.prototype.m_isOutOfBounds = function () {
  // RIGHT
  if (this.centerX > this.application.screen.right) {
    return true;
  }

  // LEFT
  if (this.centerX < 0) {
    return true;
  }

  // BOTTOM
  if (this.centerY > this.application.screen.height) {
    return true;
  }

  // TOP
  if (this.centerY < 0) {
    return true;
  }

  return false;
}

//--------------------------------------------------------------------------
// Abstract Methods
//--------------------------------------------------------------------------

/**
 * Initialize sprite animations.
 * 
 * @protected
 * @abstract
 * @return {undefined}
 */
howlkraul.projectile.Projectile.prototype.m_initAnimation = function () {
  // OVERIDE IN SUB CLASS
};

/**
 * Initialize hitbox
 * 
 * @protected
 * @abstract
 * @return {undefined}
 */
howlkraul.projectile.Projectile.prototype.m_initHitbox = function () {
  // OVERIDE IN SUB CLASS
};

/**
 * Initialize sounds
 * 
 * @protected
 * @abstract
 * @return {undefined}
 */
howlkraul.projectile.Projectile.prototype.m_initSounds = function () {
  // OVERIDE IN SUB CLASS
};