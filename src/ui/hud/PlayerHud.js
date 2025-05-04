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
  this.removeChildren(true);

  switch (this.m_character.hp) {
    case 6:
      this.addChild(new rune.display.Graphic(0, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(15, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(30, 0, 11, 12, "full-heart_11x12"));
      break;
    case 5:
      this.addChild(new rune.display.Graphic(0, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(15, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(30, 0, 11, 12, "half-heart_11x12"));
      break;
    case 4:
      this.addChild(new rune.display.Graphic(0, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(15, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(30, 0, 11, 12, "empty-heart_11x12"));
      break;
    case 3:
      this.addChild(new rune.display.Graphic(0, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(15, 0, 11, 12, "half-heart_11x12"));
      this.addChild(new rune.display.Graphic(30, 0, 11, 12, "empty-heart_11x12"));
      break;
    case 2:
      this.addChild(new rune.display.Graphic(0, 0, 11, 12, "full-heart_11x12"));
      this.addChild(new rune.display.Graphic(15, 0, 11, 12, "empty-heart_11x12"));
      this.addChild(new rune.display.Graphic(30, 0, 11, 12, "empty-heart_11x12"));
      break;
    case 1:
      this.addChild(new rune.display.Graphic(0, 0, 11, 12, "half-heart_11x12"));
      this.addChild(new rune.display.Graphic(15, 0, 11, 12, "empty-heart_11x12"));
      this.addChild(new rune.display.Graphic(30, 0, 11, 12, "empty-heart_11x12"));
      break;
    case 0:
      this.addChild(new rune.display.Graphic(0, 0, 11, 12, "empty-heart_11x12"));
      this.addChild(new rune.display.Graphic(15, 0, 11, 12, "empty-heart_11x12"));
      this.addChild(new rune.display.Graphic(30, 0, 11, 12, "empty-heart_11x12"));
      break;
  }
};