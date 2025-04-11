howlkraul.entity.Knight = function (players) {
  howlkraul.entity.Entity.call(this, 300, 50, 28, 42, "knight_walk");
  this.players = players;
}

howlkraul.entity.Knight.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Knight.prototype.constructor = howlkraul.entity.Knight;

/**
 * @override
 */
howlkraul.entity.Knight.prototype.init = function () {
  howlkraul.entity.Entity.prototype.init.call(this);

  this.setVelocity(0.1, 0.5);
  this.m_initAnimation();
  this.hitbox.set(0, (this.height - 10), this.width, 9);
};

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Knight.prototype.m_initAnimation = function () {
  this.animation.create("running", [0, 1, 1, 2, 2, 3, 4, 5, 6], 10, true);
  this.flippedX = true;
};

/**
 * @override
 */
howlkraul.entity.Knight.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);
  //this.m_followPlayer();
};

howlkraul.entity.Knight.prototype.m_followPlayer = function (step) {
  var closestPlayer = this.players.getMembersCloseTo(this)[0];
  console.log(closestPlayer);

  if (this.centerX > closestPlayer.centerX) {
    this.moveLeft();
  } else if (this.centerX < closestPlayer.centerX) {
    this.moveRight();
  }

  if (this.centerY > closestPlayer.centerY) {
    this.moveUp();
  } else if (this.centerY < closestPlayer.centerY) {
    this.moveDown();
  }
  //this.moveTo(closestPlayer.centerX, closestPlayer.centerY);
};
