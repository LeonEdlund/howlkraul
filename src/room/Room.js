/**
 * Creates an instans of a room.
 * 
 * @class
 * @classdesc - Reppresents a room with borders.
 * 
 * @param {rune.display.scene} game - reference to the active scene
 */
howlkraul.room.Room = function (game) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.display.Sprite.call(this, 0, 0, 400, 225, "room_400x225");

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * Reference to the active scene.
   * 
   * @private
   * @type {rune.display.scene}
   */
  this.game = game;

  /**
   * Invisible walls, used as room borders.
   * 
   * @private 
   * @type {rune.display.DisplayGroup}
   */
  this.m_borders = null;

  /**
   * Invisible walls, used as room borders.
   * 
   * @private 
   * @type {howlkraul.room.FurnitureGroup}
   */
  this.m_furniture = null;

  /**
   * The invisible gate.
   * 
   * @private 
   * @type {rune.display.Grapic}
   */
  this.m_gate = null;

  /**
   * Flag for the gates state.
   * 
   * @private 
   * @type {boolean}
   */
  this.m_gateOpen = false;

  /**
   * The color to change from in arcade rooms.
   * 
   * @private 
   * @type {rune.color.Color24}
   */
  this.m_lastColor = new rune.color.Color24(38, 41, 42);
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.Room.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.room.Room.prototype.constructor = howlkraul.room.Room;

//--------------------------------------------------------------------------
// Getter and setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.room.Room.prototype, "walls", {
  get: function () {
    return this.m_borders;
  }
});

Object.defineProperty(howlkraul.room.Room.prototype, "furniture", {
  get: function () {
    return this.m_furniture;
  }
});

Object.defineProperty(howlkraul.room.Room.prototype, "gateOpen", {
  get: function () {
    return this.m_gateOpen;
  }
});

//--------------------------------------------------------------------------
// Overide rune public methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.room.Room.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
  this.m_initFurnitureGroup();
  this.m_initBorders();
  this.placeFurniture();
}

/**
 * @inheritdoc
 */
howlkraul.room.Room.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);

  this.m_borders = null;
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

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
    this.animation.gotoAndPlay("closed-door", 0);
    this.m_gateOpen = false;
    this.m_gate.y = 70;
  }
}

howlkraul.room.Room.prototype.randomizeColors = function () {
  var c2 = new rune.color.Color24();
  c2.random();
  this.texture.replaceColor(this.m_lastColor, c2);
  this.m_lastColor = c2;
}

/**
 * Places random furniture in room.
 * If there is already furniture in the room they are removed.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.room.Room.prototype.placeFurniture = function () {
  this.m_furniture.spawnRandomFurniture();
}


//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Inititiates animations for door.
 * 
 * @private 
 * @returns {undefined}
 */
howlkraul.room.Room.prototype.m_initAnimations = function () {
  this.animation.create("closed-door", [13, 14, 15, 16, 17, 18, 19], 10, false);
  this.animation.create("open-door", [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
}

/**
 * Inititiates the furnitureDisplayGroup.
 * 
 * @private 
 * @returns {undefined}
 */
howlkraul.room.Room.prototype.m_initFurnitureGroup = function () {
  this.m_furniture = this.game.groups.add(new howlkraul.room.FurnitureGroup(this.game.stage))
}

/**
 * Inititiates hidden walls used as borders.
 * 
 * @private 
 * @returns {undefined}
 */
howlkraul.room.Room.prototype.m_initBorders = function () {
  if (this.m_borders == null) {
    this.m_borders = this.game.groups.create(this.game.stage);

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
      // wall.backgroundColor = "red";
      // wall.alpha = 0.5;
    }, this);
  }
}