//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Player instance.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number} [x] The x position of the object.
 * @param {number} [y] The y position of the object.
 * 
 * @class
 * @classdesc
 * 
 * The Player class represents an animated Player sprite.
 */
howlkraul.entity.Player = function (x, y, height, width, texture) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Extend rune.display.Sprite.
   */
  rune.display.Sprite.call(this, x || 0, y || 0, height, width, texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.entity.Player.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.entity.Player.prototype.constructor = howlkraul.entity.Player;

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.Player.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initVelocity();

  this.hitbox.debug = true;
  this.debug = true;
  this.elasticity = 1;
  this.sticky = true;
  this.hitbox.set(0, (this.height - 10), this.width, 9);
};

howlkraul.entity.Player.prototype.m_initVelocity = function () {
  this.velocity.drag.x = 0.3;
  this.velocity.drag.y = 0.3;
  this.velocity.max.x = 1.6;
  this.velocity.max.y = 1.6;
};

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

howlkraul.entity.Player.prototype.moveRight = function () {
  this.flippedX = false;
  this.velocity.x++;
}

howlkraul.entity.Player.prototype.moveLeft = function () {
  this.flippedX = true;
  this.velocity.x--;
}

howlkraul.entity.Player.prototype.moveUp = function () {
  this.velocity.y--;
}

howlkraul.entity.Player.prototype.moveDown = function () {
  this.velocity.y++;
}