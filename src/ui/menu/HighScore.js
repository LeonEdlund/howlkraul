/**
 * Creates a new highscore instance.
 *
 * @constructor
 * @extends rune.display.Graphic
 * 
 * @class
 * @classdesc
 * 
 * Represents the games highscore display.
 */
howlkraul.ui.HighScore = function () {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Graphic.call(this, 0, 0, 117, 123, "highscore_v4_117x123");

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * List highscore objects.
   * 
   * @type {Object}
   */
  this.m_hsList = [];

  /**
   * List of names.
   * 
   * @type {array<rune.text.BitmapField>}
   */
  this.m_hsItems = [];

  /**
   * List of scores.
   * 
   * @type {array<rune.text.BitmapField>}
   */
  this.m_hsScores = [];
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.HighScore.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.HighScore.prototype.constructor = howlkraul.ui.HighScore;

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
howlkraul.ui.HighScore.prototype.init = function () {
  rune.display.Graphic.prototype.init.call(this);

  this.m_initItems();
  this.updateList(1);
};

/**
 * Dispose and clean up resources.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.dispose = function () {
  this.removeChildren(true);

  rune.display.Graphic.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Updates the list based on nr of players.
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
 * Initalize BitmapFields for names.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.m_initItems = function () {
  var defaultXName = 10;
  var defaultXScore = 70;
  var currentY = 51;

  for (var i = 0; i < 3; i++) {
    var item = new rune.text.BitmapField("a", "small_font_256x24");
    var score = new rune.text.BitmapField("a", "small_font_256x24");

    item.autoSize = true;
    score.autoSize = true;

    item.x = defaultXName;
    score.x = defaultXScore - score.width;

    item.y = currentY;
    score.y = currentY;

    currentY += 29;

    this.m_hsItems.push(item);
    this.m_hsScores.push(score);

    this.addChild(item);
    this.addChild(score);
  }
};

/**
 * Render list of highscores.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.HighScore.prototype.m_renderList = function () {
  var defaultXScore = 110;

  for (var i = 0; i < this.m_hsList.length; i++) {
    this.m_hsItems[i].text = this.m_hsList[i].name.toUpperCase();
    this.m_hsScores[i].text = this.m_hsList[i].score.toString();
    this.m_hsScores[i].x = defaultXScore - this.m_hsScores[i].width;
  }
};