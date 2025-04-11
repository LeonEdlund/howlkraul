//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Player instance.
 *
 * @constructor
 * @extends howlkraul.entity.Entity
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
  howlkraul.entity.Entity.call(this, x || 0, y || 0, height, width, texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.entity.Player.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Player.prototype.constructor = howlkraul.entity.Player;

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.Player.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.setVelocity(0.8, 1.6);
  this.hitbox.set(0, (this.height - 10), this.width, 9);
  //this.showDebug();
};