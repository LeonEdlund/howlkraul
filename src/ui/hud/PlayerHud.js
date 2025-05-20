howlkraul.ui.PlayerHud = function (x, y, character, flipped) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.DisplayObjectContainer.call(this, x, y, 69, 31);

  this.m_character = character;

  this.m_hearts = {};

  this.m_head = null;

  this.m_flipped = flipped || false;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.PlayerHud.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.PlayerHud.prototype.constructor = howlkraul.ui.PlayerHud;

/**
 * @inheritdoc
 */
howlkraul.ui.PlayerHud.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initBackground();
  this.m_initHearts();
  this.m_initHead();
  this.flippedX = this.m_flipped;
};

/**
 * @inheritdoc
 */
howlkraul.ui.PlayerHud.prototype.dispose = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.removeChildren(true);
  this.m_character = null;
  this.m_hearts = null;
  this.m_head = null;
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.ui.PlayerHud.prototype.updateHealth = function (health) {

  switch (health) {
    case 6:
      this.m_hearts.heart2.setHeart(2);
      this.m_hearts.heart1.setHeart(2);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 5:
      this.m_hearts.heart2.setHeart(1);
      this.m_hearts.heart1.setHeart(2);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 4:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(2);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 3:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(1);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 2:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(0);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 1:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(0);
      this.m_hearts.heart0.setHeart(1);
      break;
    case 0:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(0);
      this.m_hearts.heart0.setHeart(0);
      break;
  }
};

/**
 * Change color of character.
 * Overide this method if you wanna implement color changing.
 * 
 * @abstract
 * @protected
 * @param {string} color - The color to make the character as a string. 
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.changeColor = function (color) {
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


  this.m_head.texture.replaceColor(originalC1, newC1);
  this.m_head.texture.replaceColor(originalC2, newC2);
  this.m_head.texture.replaceColor(originalC3, newC3);
  this.m_head.texture.replaceColor(originalC4, newC4);
  this.m_head.texture.replaceColor(originalC5, newC5);
  this.m_head.texture.replaceColor(originalC6, newC6);
  this.m_head.texture.replaceColor(originalC7, newC7);
  this.m_head.texture.replaceColor(originalC8, newC8);
  this.m_head.texture.replaceColor(originalC9, newC9);
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.ui.PlayerHud.prototype.m_initBackground = function () {
  this.addChild(new rune.display.Graphic(0, 0, 69, 31, "player_hud_69x31"));
};

howlkraul.ui.PlayerHud.prototype.m_initHearts = function () {
  for (var i = 0; i < 3; i++) {
    this.m_hearts["heart" + i] = new howlkraul.ui.Heart(28 + (i * 12), 10, "heart" + i);
    this.addChild(this.m_hearts["heart" + i]);
  }
};

howlkraul.ui.PlayerHud.prototype.m_initHead = function () {
  this.m_head = new howlkraul.ui.Head(2, 3)
  this.addChild(this.m_head);
};

