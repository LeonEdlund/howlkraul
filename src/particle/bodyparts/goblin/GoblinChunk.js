howlkraul.particle.GoblinChunk = function () {
  rune.display.Sprite.call(this, 50, 100, 25, 16, "goblin_gore_4_16x16");
}

howlkraul.particle.GoblinChunk.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.particle.GoblinChunk.prototype.constructor = howlkraul.particle.GoblinChunk;