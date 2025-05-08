howlkraul.projectile.Arrow = function (x, y) {
  rune.display.Sprite.call(this, x, y, 19, 5, "arrow_19x5");

  this.acceleration = 1;
}

howlkraul.projectile.Arrow.prototype = Object.create(howlkraul.projectile.Projectile.prototype);
howlkraul.projectile.Arrow.prototype.constructor = howlkraul.projectile.Arrow;

/**
 * @overide
 */
howlkraul.projectile.Arrow.prototype.m_initHitbox = function () {
  this.hitbox.set(5, 1, 10, 5);
};