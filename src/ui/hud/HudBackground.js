howlkraul.ui.HudBackground = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.Graphic.call(this, x, y, 69, 31, "player_hud_69x31");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.HudBackground.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.HudBackground.prototype.constructor = howlkraul.ui.HudBackground;


/**
 * Change color of HudBackground.
 * 
 * @public
 * @param {string} color - The color to make the background as a string. 
 * @returns {undefined}
 */
howlkraul.ui.HudBackground.prototype.changeColor = function (color) {
  if (color === "blue") return;

  //orignal (blue)
  //Light: 163, 219, 229
  //Mid: 143, 209, 221
  //Dark: 111, 169, 180

  //green
  //Light: 179, 227, 181
  //Mid: 141, 205, 145
  //Dark: 104, 164, 107

  //Red
  //Light: 232, 179, 179
  //Mid: 210, 140, 140
  //Dark: 166, 101, 101

  //Brown
  //Light: 214, 194, 179
  //Mid. 181, 148, 122
  //Dark 140, 108, 79

  // LIGHTEST
  var originalC1 = new rune.color.Color24(163, 219, 229);
  var newC1 = null;

  // LIGHT
  var originalC2 = new rune.color.Color24(143, 209, 221);
  var newC2 = null;

  // MEDIUM
  var originalC3 = new rune.color.Color24(111, 169, 180);
  var newC3 = null;

  switch (color) {
    case "brown":
      newC1 = new rune.color.Color24(214, 194, 179);
      newC2 = new rune.color.Color24(181, 148, 122);
      newC3 = new rune.color.Color24(140, 108, 79);
      break;
    case "green":
      newC1 = new rune.color.Color24(179, 227, 181);
      newC2 = new rune.color.Color24(141, 205, 145);
      newC3 = new rune.color.Color24(104, 164, 107);
      break;
    case "red":
      newC1 = new rune.color.Color24(232, 179, 179);
      newC2 = new rune.color.Color24(210, 140, 140);
      newC3 = new rune.color.Color24(166, 101, 101);
      break;
  }


  this.texture.replaceColor(originalC1, newC1);
  this.texture.replaceColor(originalC2, newC2);
  this.texture.replaceColor(originalC3, newC3);
}