howlkraul.ui.PlayerHud = function (x, y, character) {
  rune.display.Graphic.call(this, x, y, 60, 40);
  this.m_character = character;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.PlayerHud.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.PlayerHud.prototype.constructor = howlkraul.ui.PlayerHud;



howlkraul.ui.PlayerHud.prototype.init = function () {
  rune.display.Graphic.prototype.init.call(this);
  this.m_initHearts();
};

howlkraul.ui.PlayerHud.prototype.m_initHearts = function () {
  this.addChild(new rune.display.Graphic(0, 0, 11, 12, "full-heart_11x12"));
  this.addChild(new rune.display.Graphic(15, 0, 11, 12, "full-heart_11x12"));
  this.addChild(new rune.display.Graphic(30, 0, 11, 12, "full-heart_11x12"));
};

howlkraul.ui.PlayerHud.prototype.updateHealth = function () {
  switch (this.m_character.hp) {
    case 6:
      this.forEachChild(function (heart) {
        heart.texture = "full-heart_11x12";
      }, this);
      break;
    case 5:
      this.removeChildAt(2);
      this.addChildAt(new rune.display.Graphic(30, 0, 11, 12, "half-heart_11x12"), 2);
      break;
    case 4:
      this.removeChildAt(2);
      this.addChildAt(new rune.display.Graphic(30, 0, 11, 12, "empty-heart_11x12"), 2);
      break;
    case 3:
      this.removeChildAt(1);
      this.addChildAt(new rune.display.Graphic(15, 0, 11, 12, "half-heart_11x12"), 1);
      break;
    case 2:
      this.removeChildAt(1);
      this.addChildAt(new rune.display.Graphic(15, 0, 11, 12, "empty-heart_11x12"), 1);
      break;
    case 1:
      this.removeChildAt(0);
      this.addChildAt(new rune.display.Graphic(0, 0, 11, 12, "half-heart_11x12"), 0);
      break;
    case 0:
      this.removeChildAt(0);
      this.addChildAt(new rune.display.Graphic(0, 0, 11, 12, "empty-heart_11x12"), 0);
      break;
  }
};