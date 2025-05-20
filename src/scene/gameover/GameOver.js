//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new GameOver scene object.
 *
 * @constructor
 * @extends rune.scene.Scene
 * @param {number} score - the score that should be displayed. 
 * 
 * @class
 * @classdesc
 * 
 * GameOver scene.
 */
howlkraul.scene.GameOver = function (score) {

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
  this.m_score = score;

  /**
   * Game over grapic.
   * 
   * @private 
   * @type {rune.text.BitmapField}
   */
  this.m_graphic = null;

  /**
   * Referse to the BitmapField of the score text.
   * 
   * @private 
   * @type {rune.text.BitmapField}
   */
  this.m_scoreText = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.GameOver.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.GameOver.prototype.constructor = howlkraul.scene.GameOver;

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

  this.m_initGrapic();
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

  if (this.keyboard.justPressed("enter") || this.gamepads.get(0).justPressed(9) || this.gamepads.get(0).justPressed(9)) {
    this.application.scenes.load([new howlkraul.scene.CharacterSelection()]);
  }
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
// Private Methods (INIT)
//--------------------------------------------------------------------------

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