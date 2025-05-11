howlkraul.entity.Slime = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 19, 19, "slime_19x19");
  this.hp = 50;
  this.speed = rune.util.Math.random(0.15, 0.2);
}

howlkraul.entity.Slime.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Slime.prototype.constructor = howlkraul.entity.Slime;

/**
 * @override
 */
howlkraul.entity.Slime.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  //this.setVelocity(0.1, 0.2);
  this.hitbox.set(0, 0, this.height, this.width);
};

/**
 * @override
 */
howlkraul.entity.Slime.prototype.initAnimations = function () {
  this.animation.create("r", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
};