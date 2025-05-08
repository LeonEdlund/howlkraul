howlkraul.handler.InputHandler = function (controller, keyboard, keys) {
  this.m_controller = controller || {};
  this.m_keyboard = keyboard || {};

  this.m_keys = keys || {};

  // this.m_init();
}


/**
 * Returns the current inputs.
 * 
 * @public
 * @returns {object}
 */
howlkraul.handler.InputHandler.prototype.currentInput = function () {
  return {
    left: this.m_keyboard.pressed(this.m_keys.left) || this.m_controller.stickLeftLeft,
    right: this.m_keyboard.pressed(this.m_keys.right) || this.m_controller.stickLeftRight,
    up: this.m_keyboard.pressed(this.m_keys.up) || this.m_controller.stickLeftUp,
    down: this.m_keyboard.pressed(this.m_keys.down) || this.m_controller.stickLeftDown,
    shoot: this.m_keyboard.justPressed(this.m_keys.shoot) || this.m_controller.justPressed(0),
    hold: this.m_keyboard.pressed(this.m_keys.hold) || this.m_controller.pressed(7),
  }
}

/**
 * Binds keyboard keys.
 *
 * @public
 * @param {object}
 * @returns {undefined}
 */
// howlkraul.handler.InputHandler.prototype.bind = function (keys) {
// this.m_keys = {
//   left: keys.left,
//   right: keys.right,
//   up: keys.up,
//   down: keys.down,
//   shoot: keys.shoot,
//   hold: keys.hold,
// }
// }
