howlkraul.particle.TablePiece = function () {

  this.textures = [
    "table_part1_18x18",
    "table_part2_18x18",
    "table_part3_18x18",
    "table_part4_18x18",
    "table_part5_18x18",
    "table_part6_18x18",
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

howlkraul.particle.TablePiece.prototype = Object.create(rune.particle.Particle.prototype);
howlkraul.particle.TablePiece.prototype.constructor = howlkraul.particle.TablePiece;