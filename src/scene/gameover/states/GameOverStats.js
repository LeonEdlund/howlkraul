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
  this.m_handleInput();
};

/**
 * Runs when scene is selected.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.onEnter = function () {
  this.m_initBackground();
  this.m_createCards();
  this.m_displayCards();
  this.m_showHighscoreText();
  this.owner.addNextButton();
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

//--------------------------------------------------------------------------
// Private Methods (LOGIC)
//--------------------------------------------------------------------------

/**
 * Handle input.
 * 
 * @private
 * @returns {boolean}
*/
howlkraul.scene.GameOverStats.prototype.m_handleInput = function () {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("enter") || gamepad1.justPressed(0) || gamepad2.justPressed(0)) {
    if (this.m_isHighscore()) {
      this.owner.states.select("GameOverHighscore");
    } else {
      this.owner.fadeToMainMenu();
    }
  }
};

/**
 * Checks if the score is a highscore
 * 
 * @private
 * @returns {boolean}
*/
howlkraul.scene.GameOverStats.prototype.m_isHighscore = function () {
  var list = this.owner.twoPlayer ? 1 : 0;
  var isHighscore = this.owner.application.highscores.test(this.owner.score, list);

  if (isHighscore === -1) {
    return false;
  }

  return true;
};

//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Creates the player cards. 
 * 
 * @private
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.m_initBackground = function () {
  this.owner.background = new rune.display.Graphic(0, 0, 400, 225, "dead_background_400x225");
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

    this.m_animateCard(i);

  }
};

/**
 * Apply tween animation to card.
 * 
 * @private
 * @param {howlkraul.ui.PlayerCard}
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.m_animateCard = function (index) {
  var card = this.m_cards[index];

  this.owner.timers.create({
    duration: 300 + (index * 500),
    onComplete: function () {
      var sound = this.owner.application.sounds.sound.get("sfx_card" + (index + 1).toString());
      sound.play();

      this.owner.application.scenes.selected.tweens.create({
        target: card,
        scope: this,
        duration: 400,
        args: {
          centerY: this.owner.application.screen.centerY,
          rotation: 0,
        }
      });
    },
    scope: this
  });
};


/**
 * Apply tween animation to card.
 * 
 * @private
 * @param {howlkraul.ui.PlayerCard}
 * @returns {undefined}
*/
howlkraul.scene.GameOverStats.prototype.m_showHighscoreText = function () {
  if (!this.m_isHighscore()) return;

  var text = new rune.text.BitmapField("NEW HIGHSCORE", "font_480x45");
  text.autoSize = true;
  text.centerX = this.owner.application.screen.centerX;
  text.centerY = 20;
  text.alpha = 0;
  this.owner.stage.addChild(text);


  this.owner.tweens.create({
    target: text,
    scope: this,
    duration: 400,
    args: {
      alpha: 1
    }
  });
};