howlkraul.room.Vase = function (x, y) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  howlkraul.room.Furniture.call(this, x || 0, y || 0, 19, 27, "vase_19x29", 7);
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.Vase.prototype = Object.create(howlkraul.room.Furniture.prototype);
howlkraul.room.Vase.prototype.constructor = howlkraul.room.Vase;

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.room.Vase.prototype.m_initAnimations = function () {
  howlkraul.room.Furniture.prototype.update.call(this);
  this.animation.create("animation", [0, 1, 2, 3, 4, 5, 6, 7], 1, false);
}

/**
 * @inheritdoc
 */
howlkraul.room.Vase.prototype.m_changeFrame = function () {
  this.animation.gotoNextFrame();
}