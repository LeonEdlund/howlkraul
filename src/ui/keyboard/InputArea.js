howlkraul.ui.InputArea = function () {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.DisplayObjectContainer.call(this, 0, 0, 70, 15);

  /**
   * All keys in the InputArea.
   * 
   * @private
   * @type {array<rune.text.BitmapField>}
   */
  this.m_characters = [];

  /**
   * All keys in the InputArea.
   * 
   * @private
   * @type {string}
   */
  this.m_name = "";

  /**
   * Input width in pixels
   * 
   * @private
   * @type {number}
   */
  this.m_inputWidth = 0;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.InputArea.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.InputArea.prototype.constructor = howlkraul.ui.InputArea;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.ui.InputArea.prototype, "name", {
  get: function () {
    return this.m_name;
  }
})

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * add a character to input area
 * 
 * @public
 * @param {string} value - the character.
 * @returns {undefined}
 */
howlkraul.ui.InputArea.prototype.add = function (value) {
  if (this.m_characters.length >= 7) return;

  if (value === "#") {
    value = " ";
  }

  var char = new rune.text.BitmapField(value, "small_font_256x24");
  char.autoSize = true;
  this.m_characters.push(char);
  this.m_name += value;

  this.m_renderText();
}

/**
 * Removes last character.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.InputArea.prototype.remove = function () {
  var lastChar = this.m_characters.pop();
  this.m_name = this.m_name.slice(0, -1);
  this.removeChild(lastChar);

  this.m_renderText();
}

//--------------------------------------------------------------------------
// Overide rune Methods
//--------------------------------------------------------------------------

/**
 * Init InputArea.
 * Runs when object is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.InputArea.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);
  this.m_initLine();

}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Creates a line under text.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.InputArea.prototype.m_initLine = function () {
  var line = new rune.display.Graphic(0, 0, this.width, 1);
  line.backgroundColor = "white";
  line.moveTo(0, this.height - 5);
  this.addChild(line);
}

/**
 * Moves selector.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.InputArea.prototype.m_renderText = function () {
  var totalWidth = 0;

  for (var i = 0; i < this.m_characters.length; i++) {
    this.m_characters[i].autoSize = true;
    totalWidth += this.m_characters[i].width;
  }

  var startX = (this.width - totalWidth) / 2;
  var currentX = startX;

  for (var i = 0; i < this.m_characters.length; i++) {
    this.removeChild(this.m_characters[i]);
    this.addChild(this.m_characters[i]);
    this.m_characters[i].x = currentX;
    currentX += this.m_characters[i].width;
  }
}