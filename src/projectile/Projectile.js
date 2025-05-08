howlkraul.projectile.Projectile = function (x, y, texture) {
  rune.display.Sprite.call(this, x, y, 27, 32, texture);
}

//--------------------------------------------------------------------------
// Inherit
//--------------------------------------------------------------------------

howlkraul.projectile.Projectile.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.projectile.Projectile.prototype.constructor = howlkraul.projectile.Projectile;

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/** 
 * @override
 */
howlkraul.projectile.Projectile.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
  this.m_initHitbox();
};

/**
 * @override
 */
howlkraul.projectile.Projectile.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Initialize hitbox
 * 
 * @method
 * @public
 * @param {string} direction - The direction as a string.
 * @param {rune.display.DisplayGroup} direction - The direction as a string.
 */
howlkraul.projectile.Projectile.prototype.shootInDirection = function (direction, group) {
  switch (direction) {
    case "down":
      this.velocity.x = 0;
      this.velocity.y = 4;
      this.rotation = 90;
      break;
    case "down-right":
      this.velocity.x = 4;
      this.velocity.y = 4;
      this.rotation = 45;
      break;
    case "down-left":
      this.velocity.x = -4;
      this.velocity.y = 4;
      this.rotation = 145;
      break;
    case "up":
      this.velocity.x = 0;
      this.velocity.y = -4;
      this.rotation = -90;
      break;
    case "up-right":
      this.velocity.x = 4;
      this.velocity.y = -4;
      this.rotation = -45;
      break;
    case "up-left":
      this.velocity.x = -4;
      this.velocity.y = -4;
      this.rotation = -145;
      break;
    case "right":
      this.velocity.x = 4;
      this.velocity.y = 0;
      this.rotation = 0;
      break;
    case "left":
      this.velocity.x = -4;
      this.velocity.y = 0;
      this.rotation = -180;
      break;
  }

  group.addMember(this);
}

/**
 * Initialize hitbox
 * 
 * @protected
 * @return {undefined}
 */
howlkraul.projectile.Projectile.prototype.shootAtPoint = function (point, group) {
  // Calculate the angle in radians
  var dx = point.x - this.centerX;
  var dy = point.y - this.centerY;
  var radians = Math.atan2(dy, dx);

  // Calculate the angle in degrees (for rotation)
  var degrees = radians * (180 / Math.PI);

  // Set projectile speed (adjust this value as needed)
  var speed = 3;

  // Calculate velocity components using the angle
  this.velocity.x = rune.util.Math.cos(radians) * speed;
  this.velocity.y = rune.util.Math.sin(radians) * speed;

  // Set the rotation to match the direction
  this.rotation = degrees;

  // Add the projectile to the group
  group.addMember(this);
}

//--------------------------------------------------------------------------
// Protected Methods
//--------------------------------------------------------------------------

/**
 * Initialize sprite animations.
 * 
 * @protected
 * @return {undefined}
 */
howlkraul.projectile.Projectile.prototype.m_initAnimation = function () {
  // OVERIDE IN SUB CLASS
};

/**
 * Initialize hitbox
 * 
 * @protected
 * @return {undefined}
 */
howlkraul.projectile.Projectile.prototype.m_initHitbox = function () {
  // OVERIDE IN SUB CLASS
};