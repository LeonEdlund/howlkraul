//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Menu scene.
 */
howlkraul.scene.GameOver = function (score) {

  this.score = score;

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.GameOver.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.GameOver.prototype.constructor = howlkraul.scene.GameOver;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.init = function () {
  rune.scene.Scene.prototype.init.call(this);
  var scoreText = "SCORE: " + this.score;
  var text = new rune.text.BitmapField("GAME OVER");
  var score = new rune.text.BitmapField(scoreText);

  text.autoSize = true;
  score.autoSize = true;
  text.center = this.application.screen.center;
  score.center = this.application.screen.center;
  score.y += 20;

  this.stage.addChild(text);
  this.stage.addChild(score);
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
howlkraul.scene.GameOver.prototype.update = function (step) {
  rune.scene.Scene.prototype.update.call(this, step);
  if (this.keyboard.justPressed("space")) {
    this.m_startGame();
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
  rune.scene.Scene.prototype.dispose.call(this);
};



howlkraul.scene.GameOver.prototype.m_startGame = function () {
  this.application.scenes.load([new howlkraul.scene.Game()]);
};