howlkraul.entity.Entity = function (x, y, height, width, texture, hp) {
  rune.display.Sprite.call(this, x || 0, y || 0, height, width, texture);

  this.hp = hp;
  this.facing = "down";
  this.acceleration = 1;
  this.m_movementAllowed = true;
}

howlkraul.entity.Entity.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.entity.Entity.prototype.constructor = howlkraul.entity.Entity;

//--------------------------------------------------------------------------
// Getter and Setters
//--------------------------------------------------------------------------
Object.defineProperty(howlkraul.entity.Entity.prototype, "movementAllowed", {
  get: function () {
    return this.m_movementAllowed;
  },

  /**
   * @param {boolean} value 
   */
  set: function (value) {
    this.m_movementAllowed = value;
  }
});

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @overide
 */
howlkraul.entity.Entity.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.initAnimations();
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * @public
 */
howlkraul.entity.Entity.prototype.moveRight = function () {
  if (!this.movementAllowed) return;
  this.flippedX = false;
  this.velocity.x += this.acceleration;
}

/**
 * @public
 */
howlkraul.entity.Entity.prototype.moveLeft = function () {
  if (!this.movementAllowed) return;
  this.flippedX = true;
  this.velocity.x -= this.acceleration;
}

/**
 * @public
 */
howlkraul.entity.Entity.prototype.moveUp = function () {
  if (!this.movementAllowed) return;
  this.velocity.y -= this.acceleration;
}

/**
 * @public
 */
howlkraul.entity.Entity.prototype.moveDown = function () {
  if (!this.movementAllowed) return;
  this.velocity.y += this.acceleration;
}

/**
 * @public
 */
howlkraul.entity.Entity.prototype.takeDamage = function (amount) {
  this.m_handleDamage(amount);

  if (this.hp <= 0) {
    this.die();
  }
}

/**
 * 
 * @protected
 * @param {number} drag 
 * @param {number} speed 
 */
howlkraul.entity.Entity.prototype.setVelocity = function (drag, speed) {
  this.velocity.drag.x = drag;
  this.velocity.drag.y = drag;
  this.velocity.max.x = speed;
  this.velocity.max.y = speed;
};

//--------------------------------------------------------------------------
// Abstract methods
//--------------------------------------------------------------------------

/**
 * @abstract
 * @protected
 */
howlkraul.entity.Entity.prototype.initAnimations = function () {
  // OVERIDE
};

/**
 * @abstract
 * @public
 */
howlkraul.entity.Entity.prototype.die = function () {
  // OVERIDE
};

/**
 * @abstract
 * @protected
 */
howlkraul.entity.Entity.prototype.m_handleDamage = function () {
  // OVERIDE
};