howlkraul.particle.Spell = function (x, y, castedBy) {
  rune.display.Sprite.call(this, x || 0, y || 0, 27, 32, "magic_27x27");

  this.castedBy = castedBy;
}

howlkraul.particle.Spell.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.particle.Spell.prototype.constructor = howlkraul.particle.Spell;

/**
 * @override
 */
howlkraul.particle.Spell.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
  this.m_initHitbox();
};

/**
 * @override
 */
howlkraul.particle.Spell.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  //this.destroy();
};

/**
 * @override
 */
howlkraul.particle.Spell.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);

};

howlkraul.particle.Spell.prototype.m_initAnimation = function () {
  this.animation.create("spell", [0, 1, 2, 3], 12, true);
};

howlkraul.particle.Spell.prototype.m_initHitbox = function () {
  this.hitbox.set(10, 10, 10, 10);
};

howlkraul.particle.Spell.prototype.emit = function (direction) {
  switch (direction) {
    case "down":
      this.velocity.x = 0;
      this.velocity.y = 4;
      this.rotation = 90;
      break;
    case "down-right":
      this.velocity.x = 2;
      this.velocity.y = 2;
      this.rotation = 45;
      break;
    case "down-left":
      this.velocity.x = -2;
      this.velocity.y = 2;
      this.rotation = 145;
      break;
    case "up":
      this.velocity.x = 0;
      this.velocity.y = -4;
      this.rotation = -90;
      break;
    case "up-right":
      this.velocity.x = 4;
      this.velocity.y = -4;
      this.rotation = -45;
      break;
    case "up-left":
      this.velocity.x = -4;
      this.velocity.y = -4;
      this.rotation = -145;
      break;
    case "right":
      this.velocity.x = 4;
      this.velocity.y = 0;
      this.rotation = 0;
      break;
    case "left":
      this.velocity.x = -4;
      this.velocity.y = 0;
      this.rotation = -180;
      break;
  }
}