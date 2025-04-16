howlkraul.entity.PlayerOne = function () {
  howlkraul.entity.Wizard.call(this);
}

howlkraul.entity.PlayerOne.prototype = Object.create(howlkraul.entity.Wizard.prototype);
howlkraul.entity.PlayerOne.prototype.constructor = howlkraul.entity.PlayerOne;

//--------------------------------------------------------------------------
// Overiding Public Methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.PlayerOne.prototype.update = function (step) {
  howlkraul.entity.Wizard.prototype.update.call(this, step);

  var input = this.m_getInput();
  this.move(input);
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.entity.PlayerOne.prototype.m_getInput = function () {
  var gamepad = this.gamepads.get(0);

  return {
    left: this.keyboard.pressed("a") || gamepad.stickLeftLeft,
    right: this.keyboard.pressed("d") || gamepad.stickLeftRight,
    up: this.keyboard.pressed("w") || gamepad.stickLeftUp,
    down: this.keyboard.pressed("s") || gamepad.stickLeftDown,
    shoot: this.keyboard.justPressed("space") || gamepad.justPressed(0),
  }
}


