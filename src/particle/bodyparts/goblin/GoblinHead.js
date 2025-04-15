howlkraul.particle.GoblinHead = function () {
  rune.display.Sprite.call(this, 50, 100, 25, 16, "goblin_gore_2_25x16");
}

howlkraul.particle.GoblinHead.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.particle.GoblinHead.prototype.constructor = howlkraul.particle.GoblinHead;