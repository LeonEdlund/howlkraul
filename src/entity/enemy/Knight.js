howlkraul.entity.Knight = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 28, 42, "knight_walk");
  this.hp = 100;
}

howlkraul.entity.Knight.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Knight.prototype.constructor = howlkraul.entity.Knight;

/**
 * @override
 */
howlkraul.entity.Knight.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.setVelocity(0.1, 0.3);
  this.m_initAnimation();
  this.hitbox.set(0, (this.height - 10), this.width, 9);
};

/**
 * @override
 */
howlkraul.entity.Knight.prototype.update = function (step) {
  howlkraul.entity.Enemy.prototype.update.call(this, step);
};

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Knight.prototype.m_initAnimation = function () {
  this.animation.create("running", [0, 1, 1, 2, 2, 3, 4, 5, 6], 10, true);
  this.animation.create("dead", [0], 0, false);
  this.flippedX = true;
};

