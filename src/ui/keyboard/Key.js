howlkraul.ui.Key = function (key) {

  /**
   * The value of the key
   * 
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

howlkraul.ui.Key.prototype.press = function (key) {
  return this.m_value;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.ui.Key.prototype.init = function () {
  rune.text.BitmapField.prototype.init.call(this);
  this.autoSize = true;
}