/**
 * Creates a new instance of GameOverIdle.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * Represents a state where the GameOver screen is shown.
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
howlkraul.scene.GameOverIdle.prototype.update = function () {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("enter") || gamepad1.justPressed(0) || gamepad2.justPressed(0)) {
    this.owner.states.select("GameOverStats");
  }
};

/**
 * Runs when scene is deselected.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.GameOverIdle.prototype.onExit = function () {
  this.owner.stage.removeChildren(true);
};