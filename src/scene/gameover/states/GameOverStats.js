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
  if (!this.m_cards) return;

  var centerX = this.owner.application.screen.center.x;
  var spacing = 70;

  for (var i = 0; i < this.m_cards.length; i++) {
    var card = this.m_cards[i];
    this.owner.stage.addChild(card);

    card.y = this.owner.application.screen.height + 20;
    card.rotation = (i === 0) ? -45 : 45;

    if (this.m_cards.length === 1) {
      card.centerX = centerX;
    } else {
      card.centerX = centerX + (i === 0 ? -spacing : spacing);
    }

    this.m_animateCard(card);
  }
};


/**
 * Apply tween animation to card.
 * 
 * @private
 * @param {howlkraul.ui.PlayerCard}
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.m_animateCard = function (card) {
  this.owner.application.scenes.selected.tweens.create({
    target: card,
    scope: this,
    duration: 1000,
    args: {
      centerY: this.owner.application.screen.centerY,
      rotation: 0,
    }
  });
};