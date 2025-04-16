howlkraul.projectile.Spell = function (x, y, castedBy) {
  rune.display.Sprite.call(this, x, y, 27, 32, "magic_27x27");

  this.acceleration = 1;

  this.castedBy = castedBy;
}

howlkraul.projectile.Spell.prototype = Object.create(howlkraul.projectile.Projectile.prototype);
howlkraul.projectile.Spell.prototype.constructor = howlkraul.projectile.Spell;

/**
 * @override
 */
howlkraul.projectile.Spell.prototype.init = function () {
  howlkraul.projectile.Projectile.prototype.init.call(this);
  this.m_initAnimation();
  this.m_initHitbox();
};

/**
 * @override
 */
howlkraul.projectile.Spell.prototype.dispose = function () {
  howlkraul.projectile.Projectile.prototype.dispose.call(this);

};

howlkraul.projectile.Spell.prototype.m_initAnimation = function () {
  this.animation.create("spell", [0, 1, 2, 3, 4, 5, 6, 7], 20, true);
};

howlkraul.projectile.Spell.prototype.m_initHitbox = function () {
  this.hitbox.set(10, 10, 10, 10);
  this.hitbox.debug = true;
};