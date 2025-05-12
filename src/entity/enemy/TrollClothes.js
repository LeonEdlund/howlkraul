howlkraul.entity.TrollClothes = function () {

  this.textures = [
    "helmet1_29x29",
  ]

  var i = rune.util.Math.randomInt(0, this.textures.length - 1);

  rune.display.Sprite.call(this, 0, 0, 29, 29, this.textures[i]);
}

howlkraul.entity.TrollClothes.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.entity.TrollClothes.prototype.constructor = howlkraul.particle.TrollClothes;

howlkraul.entity.TrollClothes.prototype.setAnimation = function (animation) {
  this.animation.gotoAndPlay(animation);
}

howlkraul.entity.TrollClothes.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
}

howlkraul.entity.TrollClothes.prototype.m_initAnimations = function () {
  // IDLE
  this.animation.create("idle", [0], 0, false);

  // RUNNING
  this.animation.create("r", [1, 2, 3, 4, 5, 6], 5, true);
  this.animation.create("r-side", [9, 10, 11, 12, 13, 14, 15, 16], 5, true);
  this.animation.create("r-up", [20, 21, 22, 23, 24, 25], 5, true);

  // ATTACKING
  this.animation.create("s", [7, 8, 6, 6, 6, 6], 5, true);
  this.animation.create("s-side", [17, 18, 9, 9], 8, true);
  this.animation.create("s-up", [26, 27], 5, true);
}
