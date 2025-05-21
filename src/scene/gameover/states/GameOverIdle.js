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
howlkraul.scene.GameOverIdle = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "GameOverIdle");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.scene.GameOverIdle.prototype = Object.create(rune.state.State.prototype);
howlkraul.scene.GameOverIdle.prototype.constructor = howlkraul.scene.GameOverIdle;

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
howlkraul.scene.GameOverIdle.prototype.update = function (step) {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("enter") || gamepad1.justPressed(9) || gamepad2.justPressed(9)) {
    var list = this.owner.twoPlayer ? 1 : 0;
    var isHighscore = this.owner.application.highscores.test(this.owner.score, list);
    console.log(isHighscore)

    if (isHighscore !== -1) {
      this.owner.states.select("GameOverHighscore");
    } else {
      this.owner.fadeToMainMenu();
    }
  }
};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.scene.GameOverIdle.prototype.onExit = function () {
  this.owner.stage.removeChildren(true);
};