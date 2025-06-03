/**
 * Creates a new instance of GameOverHighscore.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * Represents a state where the user can input a name. 
 */
howlkraul.scene.GameOverHighscore = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "GameOverHighscore");

  /**
   * The virtual keyboard.
   * 
   * @private
   * @type {howlkraul.ui.Keyboard}
   */
  this.m_keyboard = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.scene.GameOverHighscore.prototype = Object.create(rune.state.State.prototype);
howlkraul.scene.GameOverHighscore.prototype.constructor = howlkraul.scene.GameOverHighscore;

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
howlkraul.scene.GameOverHighscore.prototype.update = function () {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("d") || gamepad1.stickLeftJustRight || gamepad2.stickLeftJustRight) {
    this.m_keyboard.moveRight();
  }

  if (keyboard.justPressed("a") || gamepad1.stickLeftJustLeft || gamepad2.stickLeftJustLeft) {
    this.m_keyboard.moveLeft();
  }

  if (keyboard.justPressed("s") || gamepad1.stickLeftJustDown || gamepad2.stickLeftJustDown) {
    this.m_keyboard.moveToSave();
  }

  if (keyboard.justPressed("w") || gamepad1.stickLeftJustUp || gamepad2.stickLeftJustUp) {
    this.m_keyboard.moveBackToKeyboard();
  }

  if (keyboard.justPressed("enter") || gamepad1.justPressed(0) || gamepad2.justPressed(0)) {
    var selectedKey = this.m_keyboard.select();

    if (selectedKey === "$") {
      this.m_inputArea.remove();
      return;
    }

    if (selectedKey === "SAVE") {
      this.m_saveHighscore(this.m_inputArea.name);
      return;
    }

    this.m_inputArea.add(selectedKey);
  }
};

/**
 * Runs when scene is selected.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.GameOverHighscore.prototype.onEnter = function () {
  this.m_initBackground();
  this.m_initText();

  this.m_keyboard = new howlkraul.ui.Keyboard();
  this.owner.stage.addChild(this.m_keyboard);

  this.m_inputArea = new howlkraul.ui.InputArea();
  this.owner.stage.addChild(this.m_inputArea);

  this.m_keyboard.center = this.owner.application.screen.center;
  this.m_keyboard.y += 40;

  this.m_inputArea.center = this.owner.application.screen.center;
  this.m_inputArea.y -= 10;
};

/**
 * Runs when scene is deselected.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.GameOverHighscore.prototype.onExit = function () {
  this.owner.stage.removeChildren(true);
};

/**
 * save highscore.
 * 
 * @returns {undefined}
*/
howlkraul.scene.GameOverHighscore.prototype.m_saveHighscore = function (name) {
  var list = this.owner.twoPlayer ? 1 : 0;
  this.owner.application.highscores.send(this.owner.score, name, list);
  this.owner.fadeToMainMenu();
};

//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Initalize the background.
 * 
 * @private
 * @returns {undefined}
*/
howlkraul.scene.GameOverHighscore.prototype.m_initBackground = function () {
  this.owner.background = new rune.display.Graphic(0, 0, 400, 225, "dead_background2_400x225");
};

/**
 * Initalize the text.
 * 
 * @private
 * @returns {undefined}
*/
howlkraul.scene.GameOverHighscore.prototype.m_initText = function () {
  var bigText = new rune.text.BitmapField("BIND_YOUR SOUL TO TREASURE", "font_480x45");
  bigText.autoSize = true;
  bigText.centerX = this.owner.application.screen.centerX;
  bigText.centerY = 40;

  var smallText = new rune.text.BitmapField("MAX 7 CHARACTERS", "small_font_256x24");
  smallText.autoSize = true;
  smallText.centerX = this.owner.application.screen.centerX;
  smallText.centerY = 60;

  this.owner.stage.addChild(bigText)
  this.owner.stage.addChild(smallText)
};