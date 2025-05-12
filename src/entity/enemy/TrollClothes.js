howlkraul.entity.TrollClothes = function (textures) {
  this.textures = textures || [];
  var i = rune.util.Math.randomInt(0, this.textures.length - 1);

  rune.display.Sprite.call(this, 0, 0, 29, 29, this.textures[i] || null);
}

howlkraul.entity.TrollClothes.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.entity.TrollClothes.prototype.constructor = howlkraul.particle.TrollClothes;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.entity.TrollClothes.prototype.setAnimation = function (animation) {
  if (this.animation.find(animation)) {
    this.animation.gotoAndPlay(animation);
  }
}

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.TrollClothes.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
}

/**
 * @inheritdoc
 */
howlkraul.entity.TrollClothes.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
  this.textures = null;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.entity.TrollClothes.prototype.m_initAnimations = function () {
  // IDLE
  this.animation.create("idle", [0], 0, false);

  // RUNNING
  this.animation.create("r", [1, 2, 3, 4, 5, 6], 10, true);
  this.animation.create("r-side", [9, 10, 11, 12, 13, 14, 15, 16], 10, true);
  this.animation.create("r-up", [20, 21, 22, 23, 24, 25], 10, true);

  // ATTACKING
  this.animation.create("s", [7, 8, 6, 6, 6, 6], 5, true);
  this.animation.create("s-side", [17, 18, 9, 9], 8, true);
  this.animation.create("s-up", [26, 27], 5, true);
}
