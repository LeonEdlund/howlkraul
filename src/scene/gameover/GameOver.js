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
   * Referse to the BitmapField of the title.
   * 
   * @private 
   * @type {rune.text.BitmapField}
   */
  this.m_title = null;

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

  this.m_title = new rune.text.BitmapField("GAME OVER");
  this.m_title.autoSize = true;
  this.m_title.center = this.application.screen.center;

  this.m_scoreText = new rune.text.BitmapField("SCORE: " + this.m_score);
  this.m_scoreText.autoSize = true;
  this.m_scoreText.center = this.application.screen.center;
  this.m_scoreText.y += 20;

  this.stage.addChild(this.m_title);
  this.stage.addChild(this.m_scoreText);
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
    this.application.scenes.load([new howlkraul.scene.Menu()]);
  }
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.dispose = function () {
  this.stage.removeChild(this.m_title, true);
  this.stage.removeChild(this.m_scoreText, true);

  this.m_title = null;
  this.m_scoreText = null;

  rune.scene.Scene.prototype.dispose.call(this);
};