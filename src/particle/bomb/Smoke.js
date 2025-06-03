/**
 * Creates a new instance of Smoke.
 *
 * @constructor
 * @extends rune.particle.Particle
 * 
 * @class
 * @classdesc
 *
 * Represents a random Smoke particle used for emitters.
 */
howlkraul.particle.Smoke = function () {
  this.textures = [
    "smoke1_6x6",
    "smoke2_6x6",
    "smoke3_6x6",
    "smoke4_6x6",
    "smoke5_6x6",
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

howlkraul.particle.Smoke.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.Smoke.prototype.constructor = howlkraul.particle.Smoke;



