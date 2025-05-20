//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new DisplayObjectContainer for highscore display.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 * 
 * @class
 * @classdesc
 * 
 * Represents the games highscore display
 */
howlkraul.ui.HighScore = function () {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.DisplayObjectContainer.call(this, 0, 0, this.application.screen.width, this.application.screen.height);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * Overlay with opacity. 
   * 
   * @type {rune.display.Graphic}
   */
  this.m_overlay = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.HighScore.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.HighScore.prototype.constructor = howlkraul.ui.HighScore;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Initializes all objects for the main menu.
 * Is run once when an instance is created.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initOverlay();
  this.m_initLogo();
  this.m_initMenu();
};

/**
 * @inheritdoc
 */
howlkraul.ui.HighScore.prototype.dispose = function () {
  rune.display.DisplayObjectContainer.prototype.dispose.call(this);

  this.removeChildren(true);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Creates a new overlay and add it to display group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.m_initOverlay = function () {
  this.m_overlay = new rune.display.Graphic(0, 0, this.width, this.height);
  this.m_overlay.backgroundColor = "black";
  this.m_overlay.alpha = 0.7;
  this.addChild(this.m_overlay);
};

/**
 * Adds logo to menu.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.m_initLogo = function () {
  this.m_logo = new rune.display.Graphic(0, 0, 314, 82, "howlkraul_314x82");
  this.m_logo.centerX = this.centerX;
  this.m_logo.y = 5;
  this.addChild(this.m_logo);
};

/**
 * Method that initializes the menu object with options and adds it to the stage.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.ui.HighScore.prototype.m_initMenu = function () {
  this.m_menu = new howlkraul.ui.Menu();
  this.addChild(this.m_menu);
};


