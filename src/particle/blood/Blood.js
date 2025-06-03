/**
 * Creates a new instance of Blood.
 *
 * @constructor
 * @extends rune.particle.Particle
 * 
 * @class
 * @classdesc
 *
 * Represents a random Blood particle used for emitters.
 */
howlkraul.particle.Blood = function () {
  this.textures = [
    "blood1",
    "blood2",
    "blood3",
    "blood4",
    "blood5",
    "blood6",
    "blood7",
  ]

  var i = rune.util.Math.randomInt(0, this.textures.length - 1);

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.particle.Particle.call(this, 50, 100, 6, 6, this.textures[i]);
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.particle.Blood.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.Blood.prototype.constructor = howlkraul.particle.Blood;