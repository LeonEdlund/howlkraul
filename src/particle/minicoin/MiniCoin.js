/**
 * Creates a new instance of a MiniCoin.
 *
 * @constructor
 * @extends rune.particle.Particle
 * 
 * @class
 * @classdesc
 *
 * Represents a small coin used as particle for emitters.
 */
howlkraul.particle.MiniCoin = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.particle.Particle.call(this, 0, 0, 12, 18, "coin_hud_12x18");
}

//--------------------------------------------------------------------------
// Inheritance 
//--------------------------------------------------------------------------

howlkraul.particle.MiniCoin.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.MiniCoin.prototype.constructor = howlkraul.particle.MiniCoin;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Is run once when an instance is created.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.particle.MiniCoin.prototype.init = function () {
  rune.particle.Particle.prototype.init.call(this);
  this.scaleX = 0.6;
  this.scaleY = 0.6;
} 