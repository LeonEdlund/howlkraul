//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new GameOver scene object.
 *
 * @constructor
 * @extends rune.scene.Scene
 * @param {number} score - the score that should be displayed. 
 * @param {array<howlkraul.utils.playerStats>} playerStats - an array with playerstats objects from the played game. 
 * 
 * @class
 * @classdesc
 * 
 * GameOver scene.
 */
howlkraul.scene.GameOver = function (score, playerStats) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
  */
  rune.scene.Scene.call(this);

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * The total score from the last played game.
   * 
   * @private 
   * @type {number}
   */
  this.m_score = score || 0;

  /**
   * The playerstat objects from each player.
   * 
   * @private 
   * @type {array<howlkraul.utils.playerStats>}
   */
  this.m_playerStats = playerStats || [new howlkraul.utils.StatCounter("blue")];

  /**
   * Gameover grapic.
   * 
   * @private 
   * @type {rune.text.BitmapField}
   */
  this.m_graphic = null;

  /**
   * Refers next button.
   * 
   * @private 
   * @type {rune.display.Graphic}
   */
  this.m_background = null;

  /**
   * Refers to the BitmapField of the score text.
   * 
   * @private 
   * @type {rune.text.BitmapField}
   */
  this.m_scoreText = null;

  /**
   * Refers next button.
   * 
   * @private 
   * @type {rune.display.Sprite}
   */
  this.m_nextButton = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.GameOver.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.GameOver.prototype.constructor = howlkraul.scene.GameOver;

//------------------------------------------------------------------------------
// Getters and Setters
//------------------------------------------------------------------------------

/**
 * The total score from the game 
 *
 * @member {number} score
 * @memberof howlkraul.scene.GameOver
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.GameOver.prototype, "score", {
  /**
   * @this howlkraul.scene.GameOver
   * @ignore
   */
  get: function () {
    return this.m_score;
  }
});

/**
 * Flag if the game is in 2 player mode or not.
 *
 * @member {number} twoPlayer
 * @memberof howlkraul.scene.GameOver
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.GameOver.prototype, "twoPlayer", {
  /**
   * @this howlkraul.scene.GameOver
   * @ignore
   */
  get: function () {
    return (this.m_playerStats.length === 2) ? true : false;
  }
});

/**
 * A list of player stats from the previusly played game.
 *
 * @member {array<howlkraul.utils.PlayerStats} playerStats
 * @memberof howlkraul.scene.GameOver
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.GameOver.prototype, "playerStats", {
  /**
   * @this howlkraul.scene.GameOver
   * @ignore
   */
  get: function () {
    return this.m_playerStats;
  }
});

/**
 * The background of the game over section.
 *
 * @member {rune.display.Graphic} background
 * @memberof howlkraul.scene.GameOver
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.GameOver.prototype, "background", {
  /**
   * @this howlkraul.scene.GameOver
   * @ignore
   */
  get: function () {
    return this.m_playerStats;
  },

  /**
 * @this howlkraul.scene.GameOver
 * @ignore
 */
  set: function (background) {
    this.m_background = background;
    this.stage.addChild(this.m_background);
  }
});

//------------------------------------------------------------------------------
// Override rune methods
//------------------------------------------------------------------------------

/**
 * Initializes all objects for the scene.
 * Is run once when an instance is created.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.init = function () {
  rune.scene.Scene.prototype.init.call(this);

  this.m_initStates();
  this.m_initGrapic();
  this.addNextButton();
  this.m_initScore();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @public
 * @param {number} step Fixed time step.
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.update = function (step) {
  rune.scene.Scene.prototype.update.call(this, step);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @public
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.dispose = function () {
  this.stage.removeChild(this.m_graphic, true);
  this.stage.removeChild(this.m_scoreText, true);
  this.stage.removeChildren(true);

  this.m_graphic = null;
  this.m_scoreText = null;

  rune.scene.Scene.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.scene.GameOver.prototype.fadeToMainMenu = function () {
  this.cameras.getCameraAt(0).fade.out(1000, function () {
    this.application.scenes.load([new howlkraul.scene.CharacterSelection()]);
  }, this);
}

/**
 * Adds a next button to the stage.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.addNextButton = function () {
  this.m_disposeNextButton()

  if (!this.m_nextButton) {
    this.m_nextButton = new rune.display.Sprite(0, 0, 24, 24, "continue_24x24");
    this.m_nextButton.animation.create("blink", [0, 1], 2, true);

    this.m_nextButton.centerX = 370;
    this.m_nextButton.centerY = 200;
    this.m_nextButton.alpha = 0;
    this.stage.addChild(this.m_nextButton);

    this.timers.create({
      duration: 2000,
      onComplete: this.m_fadeInNextButton,
      scope: this
    }, true);
  }
};

//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Fade in next button
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.m_fadeInNextButton = function () {
  if (!this.m_nextButton) return;

  this.tweens.create({
    target: this.m_nextButton,
    scope: this,
    duration: 1000,
    args: {
      alpha: 1,
    }
  });
};

/**
 * Initializes states for GameOver
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.m_initStates = function () {
  this.states.load([
    new howlkraul.scene.GameOverIdle(),
    new howlkraul.scene.GameOverStats(),
    new howlkraul.scene.GameOverHighscore(),
  ]);
};

/**
 * Initializes and fades in game over graphic
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.m_initGrapic = function () {
  this.m_graphic = new rune.display.Graphic(0, 0, 218, 152, "death_screen_218x152");
  this.m_graphic.center = this.application.screen.center;
  this.m_graphic.alpha = 0;
  this.stage.addChild(this.m_graphic);

  this.tweens.create({
    target: this.m_graphic,
    scope: this,
    duration: 1000,
    args: {
      alpha: 1,
    }
  });
};

/**
 * Initializes and fades in score text.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.m_initScore = function () {
  this.m_scoreText = new rune.text.BitmapField("SCORE: " + this.m_score);
  this.m_scoreText.autoSize = true;
  this.m_scoreText.center = this.application.screen.center;
  this.m_scoreText.y += 90;
  this.m_scoreText.alpha = 0;

  this.stage.addChild(this.m_scoreText);

  this.tweens.create({
    target: this.m_scoreText,
    scope: this,
    duration: 1000,
    args: {
      alpha: 1,
    }
  });
};

//--------------------------------------------------------------------------
// Private Methods (DISPOSE)
//--------------------------------------------------------------------------

/**
 * Initializes and fades in score text.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.m_disposeNextButton = function () {
  if (this.m_nextButton) {
    this.stage.removeChild(this.m_nextButton, true);
    this.m_nextButton = null;
  }
};