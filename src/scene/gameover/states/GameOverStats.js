/**
 * Creates a new GameOverState object.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * Represents a state where the players stats are shown.
 */
howlkraul.scene.GameOverStats = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "GameOverStats");

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * List of player cards.
   * 
   * @private
   * @type {array<howlkraul.ui.PlayerCards>}
   */
  this.m_cards = [];
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.scene.GameOverStats.prototype = Object.create(rune.state.State.prototype);
howlkraul.scene.GameOverStats.prototype.constructor = howlkraul.scene.GameOverStats;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Runs every frame. 
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.update = function (step) {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("enter") || gamepad1.justPressed(0) || gamepad2.justPressed(0)) {
    var list = this.owner.twoPlayer ? 1 : 0;
    var isHighscore = this.owner.application.highscores.test(this.owner.score, list);

    if (isHighscore !== -1) {
      this.owner.states.select("GameOverHighscore");
    } else {
      this.owner.fadeToMainMenu();
    }
  }
};

/**
 * Runs when scene is selected.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.onEnter = function () {
  this.m_createCards();
  this.m_displayCards();

};

/**
 * Runs when scene is deselected.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.onExit = function () {
  this.owner.stage.removeChildren(true);
};

/**
 * Creates the player cards. 
 * 
 * @private
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.m_createCards = function () {
  for (var i = 0; i < this.owner.playerStats.length; i++) {
    var card = new howlkraul.ui.PlayerCard(this.owner.playerStats[i]);
    this.m_cards.push(card);
  }
};

/**
 * Displays the player cards.
 * 
 * @private
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.m_displayCards = function () {
  console.log(this.m_cards)
  if (!this.m_cards) return;

  if (this.m_cards.length === 1) {
    var card = this.m_cards[0];
    this.owner.stage.addChild(card);
    card.center = this.owner.application.screen.center;
  }

  if (this.m_cards.length === 2) {
    var card1 = this.m_cards[0];
    var card2 = this.m_cards[1];

    this.owner.stage.addChild(card1);
    this.owner.stage.addChild(card2);

    card1.centerY = this.owner.application.screen.centerY;
    card2.centerY = this.owner.application.screen.centerY;

    card1.centerX = this.owner.application.screen.centerX - card1.width - 5;
    card2.centerX = this.owner.application.screen.centerX + card2.width + 5;
  }
};