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
  console.log(i)

  rune.display.Sprite.call(this, 50, 100, 6, 6, this.textures[i]);
}

howlkraul.particle.Blood.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.particle.Blood.prototype.constructor = howlkraul.particle.Blood;