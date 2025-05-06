howlkraul.particle.GoblinChunk = function () {
  rune.particle.Particle.call(this, 50, 100, 25, 16, "goblin_gore_4_16x16");
}

howlkraul.particle.GoblinChunk.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.GoblinChunk.prototype.constructor = howlkraul.particle.GoblinChunk;