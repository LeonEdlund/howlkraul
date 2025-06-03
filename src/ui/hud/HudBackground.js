/**
 * Creates a new HudBackground instance.
 *
 * @constructor
 * @extends rune.display.Graphic
 * 
 * @param {number} [x=0] - The x position.
 * @param {number} [y=0] - The y position.
 * 
 * @class
 * @classdesc
 * 
 * Represents the background of the hud element.
 */
howlkraul.ui.HudBackground = function (x, y) {
  
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Graphic.call(this, x || 0, y || 0, 69, 31, "player_hud_69x31");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.HudBackground.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.HudBackground.prototype.constructor = howlkraul.ui.HudBackground;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Change color of HudBackground.
 * 
 * @public
 * @param {string} color - The color to make the background as a string. 
 * @returns {undefined}
 */
howlkraul.ui.HudBackground.prototype.changeColor = function (color) {
  if (color === "blue") return;

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