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

  this.m_hsList = [];

  this.m_hsItems = [];
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
  this.m_initItems();

  this.updateList(1);
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
  this.m_hsList = [];

  if (nrPlayers === 1) {
    this.m_hsList.push(this.application.highscores.get(0, 0));
    this.m_hsList.push(this.application.highscores.get(1, 0));
    this.m_hsList.push(this.application.highscores.get(2, 0));
  } else if (nrPlayers === 2) {
    this.m_hsList.push(this.application.highscores.get(0, 1));
    this.m_hsList.push(this.application.highscores.get(1, 1));
    this.m_hsList.push(this.application.highscores.get(2, 1));
  }

  this.m_renderList();
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
howlkraul.ui.HighScore.prototype.m_initItems = function () {
  var currentX = 17;
  var currentY = 53;

  for (var i = 0; i < 3; i++) {
    var item = new rune.text.BitmapField("AA", "small_font_256x24");
    item.autoSize = true;
    item.x = currentX;
    item.y = currentY;
    currentY += 28
    this.m_hsItems.push(item);
    this.addChild(item);
  }
};

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
 * Creates a new overlay and add it to display group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.m_renderList = function () {
  for (var i = 0; i < this.m_hsList.length; i++) {
    this.m_hsItems[i].text = this.m_hsList[i].name + " " + this.m_hsList[i].score;
  }
};