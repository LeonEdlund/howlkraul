howlkraul.ui.PlayerHud = function (x, y, character, flipped) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.DisplayObjectContainer.call(this, x, y, 69, 31);

  this.m_character = character;

  this.m_hearts = {};

  this.m_flipped = flipped || false;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.PlayerHud.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.PlayerHud.prototype.constructor = howlkraul.ui.PlayerHud;

howlkraul.ui.PlayerHud.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initBackground();
  this.m_initHearts();
  this.m_initHead();

  this.flippedX = this.m_flipped;
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.ui.PlayerHud.prototype.updateHealth = function () {
  switch (this.m_character.hp) {
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
  this.addChild(new howlkraul.ui.Head(2, 3));
};

