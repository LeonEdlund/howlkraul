/**
 * Creates a new instance of InputHandler.
 *
 * @constructor
 * 
 * @param {rune.input.Gamepad} controller - refference to the controller to be used.
 * @param {rune.input.Keyboard} keyboard - refference to the controller to be used.
 * @param {Object} keys - A object with the keys that should be bound.
 * 
 * @class
 * @classdesc
 *
 * Represents a class that handles input from keyboard and Gamepads.
 */
howlkraul.handler.InputHandler = function (controller, keyboard, keys) {

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * Referense to the controller
   * 
   * @private
   * @type {rune.input.Gamepad}
   */
  this.m_controller = controller;

  /**
   * Referense to the Keyboard
   * 
   * @private
   * @type {rune.input.Keyboard}
   */
  this.m_keyboard = keyboard;

  /**
   * Config object holding what keys should be used. 
   * 
   * @private
   * @type {rune.input.Keyboard}
   */
  this.m_keys = keys || {};
}

//--------------------------------------------------------------------------
// Getters And Setters 
//--------------------------------------------------------------------------

/**
 * Referense to the controller.
 *
 * @member {rune.input.Gamepad} controller
 * @memberof howlkraul.handler.InputHandler
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.handler.InputHandler.prototype, "controller", {
  /**
   * @this howlkraul.handler.InputHandler
   * @ignore
   */
  get: function () {
    return this.m_controller;
  }
});

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Clean up resources.
 * 
 * @public
 * @returns {object}
 */
howlkraul.handler.InputHandler.prototype.dispose = function () {
  this.m_controller = null;
  this.m_keyboard = null;
  this.m_keys = null;
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
    dash: this.m_keyboard.justPressed(this.m_keys.dash) || this.m_controller.justPressed(6),
  }
}
