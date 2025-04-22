howlkraul.player.PlayerTwo = function (characterChoice) {
  howlkraul.player.Player.call(this, characterChoice, 50, 70);

  // DEFAULT SPAWN VALUES - can be overritten
  this.spawnX = 70;
  this.spawnY = 70;
}

howlkraul.player.PlayerTwo.prototype = Object.create(howlkraul.player.Player.prototype);
howlkraul.player.PlayerTwo.prototype.constructor = howlkraul.player.PlayerTwo;

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.player.PlayerTwo.prototype.m_getInput = function () {
  var gamepad = this.gamepads.get(1);

  return {
    left: this.keyboard.pressed("left") || gamepad.stickLeftLeft,
    right: this.keyboard.pressed("right") || gamepad.stickLeftRight,
    up: this.keyboard.pressed("up") || gamepad.stickLeftUp,
    down: this.keyboard.pressed("down") || gamepad.stickLeftDown,
    shoot: this.keyboard.justPressed("m") || gamepad.justPressed(0),
    hold: this.keyboard.pressed("n") || gamepad.pressed(7),
  }
}

howlkraul.player.PlayerTwo.prototype.m_initHud = function () {
  this.m_hud = new howlkraul.ui.PlayerHud(350, 20, this.character);
}