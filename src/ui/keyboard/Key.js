/**
 * Creates a new Key instance.
 *
 * @constructor
 * @extends rune.display.BitmapField
 * 
 * @param {string} key - The key value.
 * 
 * @class
 * @classdesc
 * 
 * Represents a individual key.
 */
howlkraul.ui.Key = function (key) {

  //--------------------------------------------------------------------------
  // Abstract Properties
  //--------------------------------------------------------------------------

  /**
   * The value of the key.
   * 
   * @private
   * @type {string}
  */
  this.m_value = key;

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.text.BitmapField.call(this, this.m_value, "small_font_256x24");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.Key.prototype = Object.create(rune.text.BitmapField.prototype);
howlkraul.ui.Key.prototype.constructor = howlkraul.ui.Key;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Returns the value of the key.
 * 
 * @public
 * @returns {string} - The value of the key.
 */
howlkraul.ui.Key.prototype.press = function () {
  return this.m_value;
}

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Runs when object is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Key.prototype.init = function () {
  rune.text.BitmapField.prototype.init.call(this);

  this.autoSize = true;
}
