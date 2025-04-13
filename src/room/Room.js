howlkraul.room.Room = function (game) {
  this.game = game;
  this.m_borders = this.game.groups.create(this.game.stage);
  this.m_background = null;
  this.m_gate = null;
  this.m_gateOpen = false;
  this.m_init();
}

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
  this.m_initBackground();
  this.m_initBorders();
}

howlkraul.room.Room.prototype.m_initBackground = function () {
  this.m_background = new rune.display.Graphic(
    0,
    0,
    this.game.application.screen.width,
    this.game.application.screen.height,
    "background"
  );

  this.game.stage.addChild(this.m_background);
}

howlkraul.room.Room.prototype.m_initBorders = function () {
  var width = this.game.application.width;
  var height = this.game.application.height;
  var thicknessTop = 25;
  var thicknessSides = 35;

  var bottomY = height - thicknessTop;
  var rightX = width - thicknessSides;

  var top = new rune.display.Graphic(0, 0, width, thicknessTop);
  var left = new rune.display.Graphic(0, 0, thicknessSides, height);
  var bottom = new rune.display.Graphic(0, bottomY, width, thicknessTop);
  var rightTop = new rune.display.Graphic(rightX, 0, thicknessSides, 80);
  this.m_gate = new rune.display.Graphic(rightX, 50, thicknessSides, 180);

  this.m_borders.addMember(top);
  this.m_borders.addMember(left);
  this.m_borders.addMember(bottom);
  this.m_borders.addMember(rightTop);
  this.m_borders.addMember(this.m_gate);

  this.m_borders.forEachMember(function (wall) {
    wall.immovable = true;
    //wall.backgroundColor = "red";
  }, this);
}

howlkraul.room.Room.prototype.openDoor = function () {
  if (!this.m_gateOpen) {
    this.m_gateOpen = true;
    this.m_gate.y = 130;
  }
}

howlkraul.room.Room.prototype.closeDoor = function () {
  if (this.m_gateOpen) {
    this.m_gateOpen = false;
    this.m_gate.y = 70;
  }
}