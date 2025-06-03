/**
 * Creates a new instance of a MainMenu object.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 * 
 * @class
 * @classdesc
 * 
 * Represents the games main menu, including highscore and overlay.
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
   * @private
   * @type {rune.display.Graphic}
   */
  this.m_overlay = null;

  /**
   * The logo.
   * 
   * @private
   * @type {rune.display.Graphic}
   */
  this.m_logo = null;

  /**
   * reference to the menu.
   * 
   * @private
   * @type {howlkraul.ui.Menu}
   */
  this.m_menu = null;

  /**
   * reference to the graphical highscore
   * 
   * @private
   * @type {howlkraul.ui.Highscore}
   */
  this.m_highscore = null;

  /**
   * reference to the how to text.
   * 
   * @private
   * @type {rune.display.Graphic}
   */
  this.m_howToText = null;

  /**
   * reference to the how to controller.
   * 
   * @private
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

/**
 * The logo.
 *
 * @member {string} logo
 * @memberof howlkraul.ui.MainMenu
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.ui.MainMenu.prototype, "logo", {
  /**
   * @this howlkraul.ui.MainMenu
   * @ignore
   */
  get: function () {
    return this.m_logo;
  }
});

/**
 * The menu.
 *
 * @member {string} menu
 * @memberof howlkraul.ui.MainMenu
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.ui.MainMenu.prototype, "menu", {
  /**
   * @this howlkraul.ui.MainMenu
   * @ignore
   */
  get: function () {
    return this.m_menu;
  }
});

/**
 * The highscore.
 *
 * @member {string} highscore
 * @memberof howlkraul.ui.MainMenu
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.ui.MainMenu.prototype, "highscore", {
  /**
   * @this howlkraul.ui.MainMenu
   * @ignore
   */
  get: function () {
    return this.m_highscore;
  }
});

/**
 * The how to text.
 *
 * @member {string} howToText
 * @memberof howlkraul.ui.MainMenu
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.ui.MainMenu.prototype, "howToText", {
  /**
   * @this howlkraul.ui.MainMenu
   * @ignore
   */
  get: function () {
    return this.m_howToText;
  }
});

/**
 * The controller grapic.
 *
 * @member {string} controller
 * @memberof howlkraul.ui.MainMenu
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.ui.MainMenu.prototype, "controller", {
  /**
   * @this howlkraul.ui.MainMenu
   * @ignore
   */
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
 * Dispose and clean up resources.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.MainMenu.prototype.dispose = function () {
  this.removeChildren(true);

  rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};


//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Init states. 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.MainMenu.prototype.m_initStates = function () {
  this.states.load([
    new howlkraul.ui.MenuIdle(),
    new howlkraul.ui.MenuHowTo(),
    new howlkraul.ui.MenuCredits(),
  ])
};

/**
 * Creates a new overlay and add it to display group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.MainMenu.prototype.m_initOverlay = function () {
  if (!this.m_overlay) {
    this.m_overlay = new rune.display.Graphic(0, 0, this.width, this.height);
    this.m_overlay.backgroundColor = "black";
    this.m_overlay.alpha = 0.7;
    this.addChild(this.m_overlay);
  }
};

/**
 * Adds logo to menu.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.MainMenu.prototype.m_initLogo = function () {
  if (!this.m_logo) {
    this.m_logo = new rune.display.Graphic(0, 0, 314, 82, "howlkraul_314x82");
    this.m_logo.centerX = this.centerX;
    this.m_logo.y = 1;
    this.addChild(this.m_logo);
  }
};

/**
 * Initializes the menu object with options and adds it to displayGroup.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.ui.MainMenu.prototype.m_initMenu = function () {
  if (!this.m_menu) {
    this.m_menu = new howlkraul.ui.Menu(30, 90);
    this.addChild(this.m_menu);
  }
};

/**
 * Method that initializes the visual highscore grapic.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.ui.MainMenu.prototype.m_initHighscore = function () {
  if (!this.m_highscore) {
    this.m_highscore = new howlkraul.ui.HighScore();
    this.addChild(this.m_highscore);
    this.m_highscore.moveTo(255, 90)
  }
};