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
  this.m_move();
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

// howlkraul.entity.PlayerTwo.prototype.m_move = function () {
//   var input = this.m_getInput();

//   if (input.up) { this.moveUp(); };
//   if (input.down) { this.moveDown(); };
//   if (input.left) { this.moveLeft(); };
//   if (input.right) { this.moveRight(); };
//   if (input.shoot) { this.shoot() };

//   this.m_setAnimation(input);
// };


