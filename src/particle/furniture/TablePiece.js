howlkraul.particle.TablePiece = function () {

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
  // Super call
  //--------------------------------------------------------------------------
  rune.display.Sprite.call(this, 50, 100, 6, 6, this.textures[i]);
}

//--------------------------------------------------------------------------
// Inheritance 
//--------------------------------------------------------------------------

howlkraul.particle.TablePiece.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.particle.TablePiece.prototype.constructor = howlkraul.particle.TablePiece;