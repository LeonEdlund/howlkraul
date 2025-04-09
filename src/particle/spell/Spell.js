howlkraul.particle.Spell = function () {
  rune.display.Sprite.call(this, 0, 0, 27, 32, "knight_walk");

  this.spell = null;

}

howlkraul.particle.Spell.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.particle.Spell.prototype.constructor = howlkraul.particle.Spell;

/**
 * @override
 */
howlkraul.particle.Spell.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
};

/**
 * @override
 */
howlkraul.particle.Spell.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  this.velocity.x = 4;
};