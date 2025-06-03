/**
 * Creates a new Menu instance.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 * 
 * @param {number} [x=0] - X position.
 * @param {number} [y=0] - Y position.
 * 
 * @class
 * @classdesc
 * 
 * Represents the games menu system.
 */
howlkraul.ui.Menu = function (x, y) {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.DisplayObjectContainer.call(this, x || 0, y || 0, 220, 130);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * An array with all menu options.
   * 
   * @private
   * @type {array<rune.text.BitmapField>}
   */
  this.m_options = [];

  /**
   * Index of the current choice.
   * 
   * @private
   * @type {number}
   */
  this.m_choice = 0;

  /**
   * Index of the previous choice.
   * 
   * @private
   * @type {number}
   */
  this.m_previousChoice = 0;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.Menu.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.Menu.prototype.constructor = howlkraul.ui.Menu;

//--------------------------------------------------------------------------
// Getters and setters
//--------------------------------------------------------------------------

/**
 * The hovered item text.
 *
 * @member {string} hoveredItem
 * @memberof howlkraul.ui.Menu
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.ui.Menu.prototype, "hoveredItem", {
  /**
   * @this howlkraul.ui.Menu
   * @ignore
   */
  get: function () {
    return this.m_options[this.m_choice].text.toLowerCase();
  }
})

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Initializes all objects for the main menu.
 * Is run once when an instance is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initMenuOptions();
};

/**
 * Dispose and clean up resources.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.dispose = function () {
  this.removeChildren(true);

  rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Move up in menu.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.up = function () {
  this.m_previousChoice = this.m_choice;
  this.m_choice--;
  this.m_choice = rune.util.Math.wrap(this.m_choice, 0, this.m_options.length - 1);
  this.m_playSound();
  this.m_scaleChoice();
};

/**
 * Move down in menu.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.down = function () {
  this.m_previousChoice = this.m_choice;
  this.m_choice++;
  this.m_choice = rune.util.Math.wrap(this.m_choice, 0, this.m_options.length - 1);
  this.m_playSound();
  this.m_scaleChoice();
};

/**
 * Select option.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.select = function () {
  this.m_playSound();
  return this.m_options[this.m_choice];
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Creates and adds all options in the menu.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.m_playSound = function () {
  var sound = this.application.sounds.sound.get("sfx_menu_tick");
  sound.play(true);
};

/**
 * Creates and adds all options in the menu.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.m_initMenuOptions = function () {
  this.m_options.push(new rune.text.BitmapField("SOLO", "font_480x45"));
  this.m_options.push(new rune.text.BitmapField("CO-OP", "font_480x45"));
  this.m_options.push(new rune.text.BitmapField("HOW TO", "font_480x45"));
  this.m_options.push(new rune.text.BitmapField("CREDITS", "font_480x45"));

  for (var i = 0; i < this.m_options.length; i++) {
    this.addChild(this.m_options[i]);
    this.m_options[i].autoSize = true;

    this.m_options[i].x = 15;
    this.m_options[i].y = 10 + (i * 30);

    if (i === 0) {
      this.m_options[i].scaleX = 1.2;
      this.m_options[i].scaleY = 1.2;
    }
  }
};

/**
 * Scale up current coice and make previus smaller
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.m_scaleChoice = function () {
  // Previus choice
  this.application.scenes.selected.tweens.create({
    target: this.m_options[this.m_previousChoice],
    scope: this,
    duration: 200,
    args: {
      scaleX: 1,
      scaleY: 1,
    }
  });

  // Current choice
  this.application.scenes.selected.tweens.create({
    target: this.m_options[this.m_choice],
    scope: this,
    duration: 200,
    args: {
      scaleX: 1.2,
      scaleY: 1.2,
    }
  });
};