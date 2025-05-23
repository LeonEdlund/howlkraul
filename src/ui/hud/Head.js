howlkraul.ui.Head = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.Graphic.call(this, x, y, 22, 25, "face_hud_22x25");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.Head.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.Head.prototype.constructor = howlkraul.ui.Head;