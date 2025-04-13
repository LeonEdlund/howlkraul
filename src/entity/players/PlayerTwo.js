howlkraul.entity.PlayerTwo = function () {
  howlkraul.entity.Wizard.call(this);
}

howlkraul.entity.PlayerTwo.prototype = Object.create(howlkraul.entity.Wizard.prototype);
howlkraul.entity.PlayerTwo.prototype.constructor = howlkraul.entity.PlayerTwo;

//--------------------------------------------------------------------------
// Overiding Public Methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.PlayerTwo.prototype.update = function (step) {
  howlkraul.entity.Wizard.prototype.update.call(this, step);
  var input = this.m_getInput();
  this.move(input);
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------


howlkraul.entity.PlayerTwo.prototype.m_getInput = function () {
  var gamepad = this.gamepads.get(1);

  return {
    left: this.keyboard.pressed("left") || gamepad.stickLeftLeft,
    right: this.keyboard.pressed("right") || gamepad.stickLeftRight,
    up: this.keyboard.pressed("up") || gamepad.stickLeftUp,
    down: this.keyboard.pressed("down") || gamepad.stickLeftDown,
    shoot: this.keyboard.justPressed("m") || gamepad.justPressed(0),
  }
}


