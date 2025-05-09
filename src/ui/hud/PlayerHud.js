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

howlkraul.ui.PlayerHud.prototype.changeHeadColor = function () {
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

  newC1 = new rune.color.Color24(194, 167, 138);
  newC2 = new rune.color.Color24(196, 118, 69);
  newC3 = new rune.color.Color24(181, 104, 60);
  newC4 = new rune.color.Color24(115, 55, 28);
  newC5 = new rune.color.Color24(46, 19, 5);

  this.m_head.texture.replaceColor(originalC1, newC1);
  this.m_head.texture.replaceColor(originalC2, newC2);
  this.m_head.texture.replaceColor(originalC3, newC3);
  this.m_head.texture.replaceColor(originalC4, newC4);
  this.m_head.texture.replaceColor(originalC5, newC5);
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.ui.PlayerHud.prototype.m_initBackground = function () {
  this.addChild(new rune.display.Graphic(0, 0, 69, 31, "player_hud_69x31"));
};

howlkraul.ui.PlayerHud.prototype.m_initHearts = function () {
  for (var i = 0; i < 3; i++) {
    this.m_hearts["heart" + i] = new howlkraul.ui.Heart(28 + (i * (11 + 2)), 10, "heart" + i);
    this.addChild(this.m_hearts["heart" + i]);
  }
};

howlkraul.ui.PlayerHud.prototype.m_initHead = function () {
  this.m_head = new howlkraul.ui.Head(2, 3)
  this.addChild(this.m_head);
};

