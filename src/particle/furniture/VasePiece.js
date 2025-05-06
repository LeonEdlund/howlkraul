howlkraul.particle.VasePiece = function () {

  this.textures = [
    "vase_part1_18x18",
    "vase_part2_18x18",
    "vase_part3_18x18",
    "vase_part4_18x18",
    "vase_part5_18x18",
  ]

  var i = rune.util.Math.randomInt(0, this.textures.length - 1);

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.particle.Particle.call(this, 0, 0, 18, 18, this.textures[i]);
}

//--------------------------------------------------------------------------
// Inheritance 
//--------------------------------------------------------------------------

howlkraul.particle.VasePiece.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.VasePiece.prototype.constructor = howlkraul.particle.VasePiece;