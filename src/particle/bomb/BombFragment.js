/**
 * Creates a new instance of BombFragment.
 *
 * @constructor
 * @extends rune.particle.Particle
 * 
 * @class
 * @classdesc
 *
 * Represents a random BombFragment particle used for emitters.
 */
howlkraul.particle.BombFragment = function () {
  this.textures = [
    "fragmentation1_6x8",
    "fragmentation2_6x8",
    "fragmentation3_6x8",
    "fragmentation4_6x8",
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

howlkraul.particle.BombFragment.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.BombFragment.prototype.constructor = howlkraul.particle.BombFragment;



