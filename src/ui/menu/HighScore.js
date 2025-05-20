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

  this.m_initBackground();
  this.m_initList();
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

/**
 * Updates the list based on amount of players.
 * 
 * @public
 * @param {boolean} nrPlayers - what list should be used.
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.updateList = function (nrPlayers) {

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
howlkraul.ui.HighScore.prototype.m_initBackground = function () {
  var background = new rune.display.Graphic(0, 0, 93, 120, "highscore_93x120");
  this.addChild(background);
};

/**
 * Initialises the highscore-list.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.m_initList = function () {

};


