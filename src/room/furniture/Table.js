howlkraul.room.Table = function (x, y) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  howlkraul.room.Furniture.call(this, x || 0, y || 0, 47, 35, "table_47x35");

  /**
   * @inheritdoc
   */
  this.m_health = 8;
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
 * @override
 * @inheritdoc
 */
howlkraul.room.Table.prototype.init = function () {
  howlkraul.room.Furniture.prototype.init.call(this);
}

/**
 * @override
 * @inheritdoc
 */
howlkraul.room.Table.prototype.update = function () {
  howlkraul.room.Furniture.prototype.update.call(this);
}

/**
 * @override
 * @inheritdoc
 */
howlkraul.room.Table.prototype.m_initAnimations = function () {
  howlkraul.room.Furniture.prototype.update.call(this);
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.room.Table.prototype.test = function () {
}