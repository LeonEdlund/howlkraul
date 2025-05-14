/**
 * creates an instance of a Vase object.
 *
 * @constructor
 * @extends howlkraul.room.Furniture
 * @abstract
 * 
 * @param {number} x - X spawn position.
 * @param {number} y - Y spawn position.
 * 
 * @class
 * @classdesc
 *
 * Represents a Vase object that can be placed on the stage.
 */
howlkraul.room.Vase = function (x, y) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  howlkraul.room.Furniture.call(this, x || 0, y || 0, 19, 27, "vase_19x29");

  //--------------------------------------------------------------------------
  // Protect properties
  //--------------------------------------------------------------------------

  /**
   * @inheritdoc
   */
  this.m_health = 7;
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
  this.animation.create("animation", [0, 1, 2, 3, 4, 5, 6, 7], 1, false);
}