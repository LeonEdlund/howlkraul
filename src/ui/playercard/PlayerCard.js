/**
 * Creates a new PlayerCard instance.
 *
 * @constructor
 * @extends rune.display.Graphic
 * 
 * @param {howlkraul.utils.StatCounter} playerStats - A reference to the players stat object.
 * 
 * @class
 * @classdesc
 * 
 * Represents a visual card where the player can see the stats from a previus game.
 */
howlkraul.ui.PlayerCard = function (playerStats) {

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * A reference to the players stat object.
   * 
   * @private
   * @type {howlkraul.utils.playerStats}
   */
  this.m_playerStats = playerStats;

  /**
   * Name of the card texture.
   * 
   * @private
   * @type {string}
   */
  this.m_texture = "";

  /**
   * An array with all the score objects as BitmapFields.
   * 
   * @private
   * @type {array<rune.text.BitmapField>}
   */
  this.m_scores = [];

  //--------------------------------------------------------------------------
  // Init Calls
  //--------------------------------------------------------------------------

  this.m_setTexture();

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Graphic.call(this, 0, 0, 94, 136, this.m_texture);
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.PlayerCard.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.PlayerCard.prototype.constructor = howlkraul.ui.PlayerCard;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Runs when object is instantiated.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.PlayerCard.prototype.init = function () {
  rune.display.Graphic.prototype.init.call(this);

  this.m_setStats();
  this.m_renderScores();
};

/**
 * Dispose and clean up resources.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.PlayerCard.prototype.dispose = function () {
  this.removeChildren(true);

  rune.display.Graphic.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * sets card color based on wizard color.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.PlayerCard.prototype.m_setTexture = function () {
  switch (this.m_playerStats.wizColor) {
    case "brown":
      this.m_texture = "brown_card_94x136";
      break;
    case "green":
      this.m_texture = "green_card_94x136";
      break;
    case "red":
      this.m_texture = "red_card_94x136";
      break;
    case "blue":
    default:
      this.m_texture = "blue_card_94x136";
      break;
  }
};

/**
 * Creates all stat objects.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.PlayerCard.prototype.m_setStats = function () {
  var kills = new rune.text.BitmapField(this.m_playerStats.kills.toString(), "small_font_256x24");
  var coins = new rune.text.BitmapField(this.m_playerStats.coins.toString(), "small_font_256x24");
  var hits = new rune.text.BitmapField(this.m_playerStats.hits.toString(), "small_font_256x24");

  this.m_scores.push(kills, coins, hits);

  for (var i = 0; i < this.m_scores.length; i++) {
    this.m_scores[i].autoSize = true;
  }
};

/**
 * Render the scores on the card.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.PlayerCard.prototype.m_renderScores = function () {
  var defaultX = 77;
  var currentY = 84;

  for (var i = 0; i < this.m_scores.length; i++) {
    this.addChild(this.m_scores[i]);
    this.m_scores[i].x = defaultX - this.m_scores[i].width;
    this.m_scores[i].y = currentY;
    currentY += 20;

    if (i === this.m_scores.length - 1) {
      this.m_scores[i].y -= 4;
    }
  }
};