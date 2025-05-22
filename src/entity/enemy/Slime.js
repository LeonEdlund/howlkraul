howlkraul.entity.Slime = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 19, 19, "slime_19x19");
  this.hp = 50;
  this.speed = rune.util.Math.random(0.15, 0.2);
  this.defaultSpeed = this.speed;
}

howlkraul.entity.Slime.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Slime.prototype.constructor = howlkraul.entity.Slime;

/**
 * @override
 */
howlkraul.entity.Slime.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.hitbox.set(0, 0, this.height, this.width);
  this.states.select("FollowPlayer");
};

/**
 * @override
 */
howlkraul.entity.Slime.prototype.initAnimations = function () {
  this.animation.create("r", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
};

/**
 * @inheritdoc
*/
howlkraul.entity.Slime.prototype.initSounds = function () {
  // Death Sound
  // this.deathSounds.push(this.application.sounds.sound.get("sfx_slime_death1"));
  // this.deathSounds.push(this.application.sounds.sound.get("sfx_slime_death2"));

  this.deathSounds.push("sfx_slime_death1", "sfx_slime_death2")
};