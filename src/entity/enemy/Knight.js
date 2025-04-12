howlkraul.entity.Knight = function (x, y) {
  howlkraul.entity.Entity.call(this, x, y, 28, 42, "knight_walk");
  this.hp = 100;
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
  this.animation.create("dead", [0], 0, false);
  this.flippedX = true;
};

/**
 * @override
 */
howlkraul.entity.Knight.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);
};

howlkraul.entity.Knight.prototype.followPlayers = function (players) {
  var closestPlayer = players.getMembersCloseTo(this)[0];

  var tX = rune.util.Math.abs(this.centerX);
  var tY = rune.util.Math.abs(this.centerY);
  var pX = rune.util.Math.abs(closestPlayer.centerX);
  var pY = rune.util.Math.abs(closestPlayer.centerY);


  if (tX > pX) {
    this.moveLeft();
  } else if (tX < pX) {
    this.moveRight();
  }

  if (tY > pY) {
    this.moveUp();
  } else if (tY < pY) {
    this.moveDown();
  }
};

howlkraul.entity.Knight.prototype.takeDamage = function (amount) {
  this.hp -= amount;

  if (this.hp <= 0) {
    this.die();
  }
};

howlkraul.entity.Knight.prototype.die = function () {
  this.animation.gotoAndPlay("dead");
  this.y += 10;
  this.rotation = -90;
  this.hitbox.set(0, 0, 0, 0);
};