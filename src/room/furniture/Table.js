/**
 * creates an instance of a Table object.
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
 * Represents a table object that can be placed on the stage. 
 */
howlkraul.room.Table = function (x, y) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  howlkraul.room.Furniture.call(this, x || 0, y || 0, 47, 35, "table_47x35");

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

howlkraul.room.Table.prototype = Object.create(howlkraul.room.Furniture.prototype);
howlkraul.room.Table.prototype.constructor = howlkraul.room.Table;

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.room.Table.prototype.m_initAnimations = function () {
  howlkraul.room.Furniture.prototype.update.call(this);
  this.animation.create("animation", [0, 1, 2, 3, 4, 5, 6, 7], 1, false);
}

/**
 * @inheritdoc
 */
howlkraul.room.Table.prototype.m_changeFrame = function () {
  this.animation.gotoNextFrame();
}