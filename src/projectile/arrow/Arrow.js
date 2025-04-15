howlkraul.projectile.Arrow = function (x, y, castedBy) {
  rune.display.Sprite.call(this, x, y, 19, 5, "arrow_19x5");

  this.acceleration = 1;

  this.castedBy = castedBy;
}

howlkraul.projectile.Arrow.prototype = Object.create(howlkraul.projectile.Projectile.prototype);
howlkraul.projectile.Arrow.prototype.constructor = howlkraul.projectile.Arrow;

/**
 * @override
 */
howlkraul.projectile.Arrow.prototype.init = function () {
  howlkraul.projectile.Projectile.prototype.init.call(this);
  this.m_initHitbox();
};

/**
 * @override
 */
howlkraul.projectile.Arrow.prototype.dispose = function () {
  howlkraul.projectile.Projectile.prototype.dispose.call(this);
};

howlkraul.projectile.Arrow.prototype.m_initHitbox = function () {
  this.hitbox.set(5, 1, 10, 5);
};