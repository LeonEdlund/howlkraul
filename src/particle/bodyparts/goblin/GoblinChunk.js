/**
 * Creates a new instance of GoblinChunk.
 *
 * @constructor
 * @extends rune.particle.Particle
 * 
 * @class
 * @classdesc
 *
 * Represents a random GoblinChunk particle used for emitters.
 */
howlkraul.particle.GoblinChunk = function () {
  this.textures = [
    "goblin_gore3_25x16",
    "goblin_gore4_25x16",
    "goblin_gore5_25x16",
  ]

  var i = rune.util.Math.randomInt(0, this.textures.length - 1);

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.particle.Particle.call(this, 50, 100, 25, 16, this.textures[i]);
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.particle.GoblinChunk.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.GoblinChunk.prototype.constructor = howlkraul.particle.GoblinChunk;