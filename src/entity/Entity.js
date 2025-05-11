howlkraul.entity.Entity = function (x, y, height, width, texture) {
  rune.display.Sprite.call(this, x || 0, y || 0, height, width, texture);

  this.facing = "down";
  this.acceleration = 1;
  this.speed = 1;
  this.drag = 0.1;
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
  this.initStates();
  this.setVelocity();
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
 * 
 * @protected
 * @param {number} drag 
 * @param {number} speed 
 */
howlkraul.entity.Entity.prototype.setVelocity = function () {
  this.velocity.drag.x = this.drag;
  this.velocity.drag.y = this.drag;
  this.velocity.max.x = this.speed;
  this.velocity.max.y = this.speed;
};

//--------------------------------------------------------------------------
// Abstract methods
//--------------------------------------------------------------------------

/**
 * Runs when a entity is instasiated. 
 * Override to add animations to entity.
 * 
 * @abstract
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.initAnimations = function () {
  // OVERIDE
};

/**
 * Runs when a entity is instasiated. 
 * Override to add states to entity.
 * 
 * @abstract
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.initStates = function () {
  // OVERIDE
};