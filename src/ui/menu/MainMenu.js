//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new main menu object.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 * 
 * @class
 * @classdesc
 * 
 * Represents the games main menu.
 */
howlkraul.ui.MainMenu = function () {
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

  /**
   * The logo.
   * 
   * @type {rune.display.Graphic}
   */
  this.m_logo = null;

  /**
   * reference to the menu.
   * 
   * @type {howlkraul.ui.Menu}
   */
  this.m_menu = null;

  /**
   * reference to the graphical highscore
   * 
   * @type {howlkraul.ui.Highscore}
   */
  this.m_highscore = null;

  /**
   * reference to the how to text.
   * 
   * @type {rune.display.Graphic}
   */
  this.m_howToText = null;

  /**
   * reference to the how to controller.
   * 
   * @type {rune.display.Graphic}
   */
  this.m_controller = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.MainMenu.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.MainMenu.prototype.constructor = howlkraul.ui.MainMenu;

//--------------------------------------------------------------------------
// Getters and setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.ui.MainMenu.prototype, "logo", {
  get: function () {
    return this.m_logo;
  }
});

Object.defineProperty(howlkraul.ui.MainMenu.prototype, "menu", {
  get: function () {
    return this.m_menu;
  }
});

Object.defineProperty(howlkraul.ui.MainMenu.prototype, "highscore", {
  get: function () {
    return this.m_highscore;
  }
});

Object.defineProperty(howlkraul.ui.MainMenu.prototype, "howToText", {
  get: function () {
    return this.m_howToText;
  }
});

Object.defineProperty(howlkraul.ui.MainMenu.prototype, "controller", {
  get: function () {
    return this.m_controller;
  }
});

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
howlkraul.ui.MainMenu.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initStates();
  this.m_initOverlay();
  this.m_initLogo();
  this.m_initMenu();
  this.m_initHighscore();

};

/**
 * @inheritdoc
*/
howlkraul.ui.MainMenu.prototype.update = function (step) {
  rune.display.DisplayObjectContainer.prototype.update.call(this, step);
};

/**
 * @inheritdoc
 */
howlkraul.ui.MainMenu.prototype.dispose = function () {
  rune.display.DisplayObjectContainer.prototype.dispose.call(this);

  this.removeChildren(true);
};


//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Creates a new overlay and add it to display group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.MainMenu.prototype.m_initStates = function () {
  this.states.load([
    new howlkraul.ui.MenuIdle(),
    new howlkraul.ui.MenuHowTo(),
  ])
};

/**
 * Creates a new overlay and add it to display group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.MainMenu.prototype.m_initOverlay = function () {
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
howlkraul.ui.MainMenu.prototype.m_initLogo = function () {
  this.m_logo = new rune.display.Graphic(0, 0, 314, 82, "howlkraul_314x82");
  this.m_logo.centerX = this.centerX;
  this.m_logo.y = 1;
  this.addChild(this.m_logo);
};

/**
 * Method that initializes the menu object with options and adds it to the stage.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.ui.MainMenu.prototype.m_initMenu = function () {
  this.m_menu = new howlkraul.ui.Menu(30, 90);
  this.addChild(this.m_menu);
};

/**
 * Method that initializes the visual display of the highscore.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.ui.MainMenu.prototype.m_initHighscore = function () {
  this.m_highscore = new howlkraul.ui.HighScore();
  this.addChild(this.m_highscore);
  this.m_highscore.moveTo(255, 90)
};