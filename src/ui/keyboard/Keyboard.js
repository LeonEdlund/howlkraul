howlkraul.ui.Keyboard = function () {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.DisplayObjectContainer.call(this, 0, 0, 320, 30);

  /**
   * All keys in the keyboard.
   * 
   * @private
   * @type {array}
   */
  this.m_keys = [];

  /**
   * Key selector.
   * 
   * @private
   * @type {array}
   */
  this.m_selector = null;

  /**
   * Current selection.
   * 
   * @type {number}
   */
  this.m_currentKey = 0;

  /**
   * Current key position, used to space characters.
   * 
   * @type {number}
   */
  this.m_currentX = 10;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.Keyboard.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.Keyboard.prototype.constructor = howlkraul.ui.Keyboard;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Move selector left.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.moveLeft = function () {
  (this.m_currentKey === this.m_keys.length - 1) ? this.m_currentKey = 0 : this.m_currentKey--;
  this.m_currentKey = rune.util.Math.wrap(this.m_currentKey, 0, this.m_keys.length - 2);
  this.m_moveSelector();
}

/**
 * Move selector left.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.moveRight = function () {
  (this.m_currentKey === this.m_keys.length - 1) ? this.m_currentKey = this.m_keys.length - 2 : this.m_currentKey++;
  this.m_currentKey = rune.util.Math.wrap(this.m_currentKey, 0, this.m_keys.length - 2);
  this.m_moveSelector();
}

/**
 * Move selector to save button.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.moveToSave = function () {
  this.m_currentKey = this.m_keys.length - 1;
  this.m_moveSelector();
}

/**
 * Move selector to save button.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.moveBackToKeyboard = function () {
  this.m_currentKey = 13;
  this.m_moveSelector();
}

/**
 * selects a character
 * 
 * @public
 * @returns {rune.text.BitmapField}
 */
howlkraul.ui.Keyboard.prototype.select = function () {

  return this.m_keys[this.m_currentKey].text;
}

//--------------------------------------------------------------------------
// Overide rune Methods
//--------------------------------------------------------------------------

/**
 * Init keyboard.
 * Runs when object is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initKeys();
  this.m_initSelector();
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Moves selector.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.m_moveSelector = function () {
  this.m_selector.width = this.m_keys[this.m_currentKey].width + 2;
  this.m_selector.center = this.m_keys[this.m_currentKey].center;
  this.m_selector.centerY += 5;
}

/**
 * Init all keys
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.m_initKeys = function () {
  if (this.m_keys.length === 0) {

    for (var i = 0; i < 26; i++) {
      var value = String.fromCharCode(97 + i).toUpperCase();
      this.m_createKey(value);
    }

    this.m_createKey("#");
    this.m_createKey("$");
    var save = this.m_createKey("SAVE");
    save.centerX = this.centerX;
    save.centerY = 20;
  }
}

/**
 * Creates a individual key.
 * 
 * @private
 * @returns {howlkraul.ui.Key}
*/
howlkraul.ui.Keyboard.prototype.m_createKey = function (value) {
  var key = new howlkraul.ui.Key(value);

  key.autoSize = true;
  key.centerY = 5;
  key.x = this.m_currentX;
  this.m_currentX += key.width + 3;

  this.m_keys.push(key);
  this.addChild(key);
  return key;
}

/**
 * Init key selector.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Keyboard.prototype.m_initSelector = function () {

  this.m_selector = new rune.display.Graphic(0, 0, 10, 1);
  this.m_selector.backgroundColor = "white";
  this.m_selector.center = this.m_keys[0].center;
  this.m_selector.centerY += 5;

  this.addChild(this.m_selector);
}