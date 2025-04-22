howlkraul.player.PlayerOne = function (characterChoice) {
  howlkraul.player.Player.call(this, characterChoice, 50, 50);

}

howlkraul.player.PlayerOne.prototype = Object.create(howlkraul.player.Player.prototype);
howlkraul.player.PlayerOne.prototype.constructor = howlkraul.player.PlayerOne;

//--------------------------------------------------------------------------
// Overide Player Methods
//--------------------------------------------------------------------------

/**
 * ...
 * @overide
 */
howlkraul.player.PlayerOne.prototype.init = function () {
  howlkraul.player.Player.prototype.init.call(this);
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.player.PlayerOne.prototype.m_getInput = function () {
  var gamepad = this.gamepads ? this.gamepads.get(0) : {};

  return {
    left: this.keyboard.pressed("a") || gamepad.stickLeftLeft,
    right: this.keyboard.pressed("d") || gamepad.stickLeftRight,
    up: this.keyboard.pressed("w") || gamepad.stickLeftUp,
    down: this.keyboard.pressed("s") || gamepad.stickLeftDown,
    shoot: this.keyboard.justPressed("space") || gamepad.justPressed(0),
    hold: this.keyboard.pressed("c") || gamepad.pressed(7),
  }
}

howlkraul.player.PlayerOne.prototype.m_initHud = function () {
  this.m_hud = new howlkraul.ui.PlayerHud(20, 20, this.character);
}