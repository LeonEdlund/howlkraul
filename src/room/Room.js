howlkraul.room.Room = function (game) {
  rune.display.Sprite.call(this, 0, 0, 400, 225, "room_400x225");
  this.game = game;
  this.m_borders = this.game.groups.create(this.game.stage);
  this.m_background = this.graphics;
  this.m_gate = null;
  this.m_gateOpen = false;
  this.m_lastColor = new rune.color.Color24(38, 41, 42);
  this.m_init();
}

howlkraul.room.Room.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.room.Room.prototype.constructor = howlkraul.room.Room;

Object.defineProperty(howlkraul.room.Room.prototype, "borders", {
  get: function () {
    return this.m_borders;
  }
});

Object.defineProperty(howlkraul.room.Room.prototype, "background", {
  get: function () {
    return this.m_background;
  }
});

Object.defineProperty(howlkraul.room.Room.prototype, "gateOpen", {
  get: function () {
    return this.m_gateOpen;
  }
});

howlkraul.room.Room.prototype.m_init = function () {
  this.m_initAnimations();
  this.m_initBorders();
}

howlkraul.room.Room.prototype.m_initAnimations = function () {
  this.animation.create("closed-door", [0], 0, false);
  this.animation.create("open-door", [0, 1, 2, 3, 4, 5], 10, false);
}

howlkraul.room.Room.prototype.m_initBorders = function () {
  var width = this.game.application.width;
  var height = this.game.application.height;
  var thicknessTop = 45;
  var thicknessBottom = 16;
  var thicknessSides = 16;

  var bottomY = height - thicknessBottom;
  var rightX = width - thicknessSides;

  var top = new rune.display.Graphic(0, 0, width, thicknessTop);
  var left = new rune.display.Graphic(0, 0, thicknessSides, height);
  var bottom = new rune.display.Graphic(0, bottomY, width, thicknessBottom);
  var rightTop = new rune.display.Graphic(rightX, 0, thicknessSides, 100);
  this.m_gate = new rune.display.Graphic(rightX, 40, thicknessSides, 180);

  this.m_borders.addMember(top);
  this.m_borders.addMember(left);
  this.m_borders.addMember(bottom);
  this.m_borders.addMember(rightTop);
  this.m_borders.addMember(this.m_gate);

  this.m_borders.forEachMember(function (wall) {
    wall.immovable = true;
    //wall.backgroundColor = "red";
    //wall.alpha = 0.5;
  }, this);
}

howlkraul.room.Room.prototype.openDoor = function () {
  if (!this.m_gateOpen) {
    this.animation.goto("open-door", 0);
    this.animation.play();
    this.m_gateOpen = true;
    this.m_gate.y = 125;
  }
}

howlkraul.room.Room.prototype.closeDoor = function () {
  if (this.m_gateOpen) {
    this.animation.goto("closed-door", 0);
    this.m_gateOpen = false;
    this.m_gate.y = 70;
  }
}

howlkraul.room.Room.prototype.randomizeColors = function () {
  //var c1 = new rune.color.Color24(38, 41, 42);
  console.log(this.m_lastColor, c2);
  var c2 = new rune.color.Color24();
  c2.random();
  this.texture.replaceColor(this.m_lastColor, c2);
  this.m_lastColor = c2;


}