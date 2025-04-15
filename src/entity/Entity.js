howlkraul.entity.Entity = function (x, y, height, width, texture) {
  rune.display.Sprite.call(this, x || 0, y || 0, height, width, texture);

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
// Public Methods
//--------------------------------------------------------------------------

howlkraul.entity.Entity.prototype.moveRight = function () {
  if (!this.movementAllowed) return;
  this.flippedX = false;
  this.velocity.x += this.acceleration;
}

howlkraul.entity.Entity.prototype.moveLeft = function () {
  if (!this.movementAllowed) return;
  this.flippedX = true;
  this.velocity.x -= this.acceleration;
}

howlkraul.entity.Entity.prototype.moveUp = function () {
  if (!this.movementAllowed) return;
  this.velocity.y -= this.acceleration;
}

howlkraul.entity.Entity.prototype.moveDown = function () {
  if (!this.movementAllowed) return;
  this.velocity.y += this.acceleration;
}

howlkraul.entity.Entity.prototype.setVelocity = function (drag, speed) {
  this.velocity.drag.x = drag;
  this.velocity.drag.y = drag;
  this.velocity.max.x = speed;
  this.velocity.max.y = speed;
};

howlkraul.entity.Entity.prototype.showDebug = function () {
  this.hitbox.debug = true;
  this.debug = true;
};
