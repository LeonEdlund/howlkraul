/**
 * Creates a new MiniHat instance.
 *
 * @constructor
 * 
 * @param {number} [x=0] - X position.
 * @param {number} [y=0] - Y position.
 * 
 * @class
 * @classdesc
 * 
 * Represents a small visual hat that can change color based on the wizards color.
 */
howlkraul.ui.MiniHat = function (x, y) {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Graphic.call(this, x || 0, y || 0, 12, 13, "player_x_died_12x13");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.MiniHat.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.MiniHat.prototype.constructor = howlkraul.ui.MiniHat;

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Change color of the hat.
 * 
 * @public
 * @param {number} color - The color that it should be replaced by.
 * @returns {undefined}
 */
howlkraul.ui.MiniHat.prototype.replaceColor = function (color) {
  if (color === "blue") return;

  // LIGHTEST
  var originalC1 = new rune.color.Color24(178, 206, 219);
  var newC1 = null;

  // LIGHT
  var originalC2 = new rune.color.Color24(0, 152, 220);
  var newC2 = null;

  // MEDIUM
  var originalC3 = new rune.color.Color24(0, 105, 170);
  var newC3 = null;

  // MEDIUM DARK
  var originalC4 = new rune.color.Color24(0, 57, 109);
  var newC4 = null;

  // DARK
  var originalC5 = new rune.color.Color24(3, 25, 63);
  var newC5 = null;

  // Shadows
  var originalC6 = new rune.color.Color24(32, 51, 84);
  var newC6 = null;

  var originalC7 = new rune.color.Color24(11, 35, 77);
  var newC7 = null;

  var originalC8 = new rune.color.Color24(31, 45, 73);
  var newC8 = null;

  var originalC9 = new rune.color.Color24(37, 56, 89);
  var newC9 = null;

  switch (color) {
    case "brown":
      newC1 = new rune.color.Color24(196, 176, 158);
      newC2 = new rune.color.Color24(150, 110, 90);
      newC3 = new rune.color.Color24(110, 70, 50);
      newC4 = new rune.color.Color24(80, 50, 30);
      newC5 = new rune.color.Color24(40, 20, 10);
      newC6 = new rune.color.Color24(50, 40, 30);
      newC7 = new rune.color.Color24(35, 25, 20);
      newC8 = new rune.color.Color24(45, 35, 25);
      newC9 = new rune.color.Color24(60, 50, 35);
      break;
    case "green":
      newC1 = new rune.color.Color24(188, 219, 178);
      newC2 = new rune.color.Color24(0, 180, 100);
      newC3 = new rune.color.Color24(0, 140, 80);
      newC4 = new rune.color.Color24(0, 85, 50);
      newC5 = new rune.color.Color24(10, 50, 20);
      newC6 = new rune.color.Color24(30, 60, 40);
      newC7 = new rune.color.Color24(15, 45, 30);
      newC8 = new rune.color.Color24(25, 55, 35);
      newC9 = new rune.color.Color24(40, 70, 45);
      break;
    case "red":
      newC1 = new rune.color.Color24(200, 160, 160);
      newC2 = new rune.color.Color24(180, 60, 60);
      newC3 = new rune.color.Color24(140, 40, 40);
      newC4 = new rune.color.Color24(90, 25, 25);
      newC5 = new rune.color.Color24(50, 10, 10);
      newC6 = new rune.color.Color24(60, 30, 30);
      newC7 = new rune.color.Color24(45, 20, 20);
      newC8 = new rune.color.Color24(55, 25, 25);
      newC9 = new rune.color.Color24(70, 35, 35);
      break;

  }

  this.texture.replaceColor(originalC1, newC1);
  this.texture.replaceColor(originalC2, newC2);
  this.texture.replaceColor(originalC3, newC3);
  this.texture.replaceColor(originalC4, newC4);
  this.texture.replaceColor(originalC5, newC5);
  this.texture.replaceColor(originalC6, newC6);
  this.texture.replaceColor(originalC7, newC7);
  this.texture.replaceColor(originalC8, newC8);
  this.texture.replaceColor(originalC9, newC9);
};