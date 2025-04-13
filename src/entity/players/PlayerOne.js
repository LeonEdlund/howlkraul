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
  this.m_move();
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
    shoot: this.keyboard.justPressed("q") || gamepad.justPressed(0),
  }
}

howlkraul.entity.PlayerOne.prototype.m_move = function () {
  var input = this.m_getInput();

  if (input.up) { this.moveUp(); };
  if (input.down) { this.moveDown(); };
  if (input.left) { this.moveLeft(); };
  if (input.right) { this.moveRight(); };
  if (input.shoot) { this.shoot() };

  this.m_setAnimation(input);
};


