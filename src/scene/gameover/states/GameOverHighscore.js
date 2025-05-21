/**
 * Represents a state where the main menu overlayes the character selection.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The menu over character selection. 
 */
howlkraul.scene.GameOverHighscore = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "GameOverHighscore");

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
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.scene.GameOverHighscore.prototype.update = function (step) {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("d") || gamepad1.justPressed(9) || gamepad2.justPressed(9)) {
    this.m_keyboard.moveRight();
  }

  if (keyboard.justPressed("a") || gamepad1.justPressed(9) || gamepad2.justPressed(9)) {
    this.m_keyboard.moveLeft();
  }

  if (keyboard.justPressed("enter") || gamepad1.justPressed(9) || gamepad2.justPressed(9)) {
    var selectedKey = this.m_keyboard.select();

    if (selectedKey === "BACK") {
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
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.scene.GameOverHighscore.prototype.onEnter = function () {
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
 * ... 
 * 
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