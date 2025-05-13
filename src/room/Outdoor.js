/**
 * Creates a new Outdoor object.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rune.scene.Scene} game - The scene where the group should be added.
 * 
 * @class
 * @classdesc
 *
 * Represents a Outdoor.
 */
howlkraul.room.Outdoor = function (game) {
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
   * Invisible walls, used as Outdoor borders.
   * 
   * @private 
   * @type {rune.display.DisplayGroup}
   */
  this.m_borders = null;

  /**
   * Invisible walls, used as Outdoor borders.
   * 
   * @private 
   * @type {howlkraul.Outdoor.FurnitureGroup}
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
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.Outdoor.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.room.Outdoor.prototype.constructor = howlkraul.room.Outdoor;

//--------------------------------------------------------------------------
// Getter and setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.room.Outdoor.prototype, "walls", {
  get: function () {
    return this.m_borders;
  }
});

Object.defineProperty(howlkraul.room.Outdoor.prototype, "gateOpen", {
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
howlkraul.room.Outdoor.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimations();
  this.m_initBorders();
}

/**
 * @inheritdoc
 */
howlkraul.room.Outdoor.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);

  this.m_borders.removeMembers(true);
  this.m_furniture.removeMembers(true);
  this.m_lastColor.dispose();

  this.m_game = null;
  this.m_borders = null;
  this.m_furniture = null;
  this.m_lastColor = null;
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Removes borders from door. 
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.room.Outdoor.prototype.openDoor = function () {
  if (!this.m_gateOpen) {
    this.animation.goto("open-door", 0);
    this.animation.play();
    this.m_gateOpen = true;
    this.m_gate.y = 125;
  }
}

/**
 * Adds borders to door. 
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.room.Outdoor.prototype.closeDoor = function () {
  if (this.m_gateOpen) {
    this.animation.gotoAndPlay("closed-door", 0);
    this.m_gateOpen = false;
    this.m_gate.y = 70;
  }
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
howlkraul.room.Outdoor.prototype.m_initAnimations = function () {
  this.animation.create("closed-door", [13, 14, 15, 16, 17, 18, 19], 10, false);
  this.animation.create("open-door", [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
}

/**
 * Inititiates hidden walls used as borders.
 * 
 * @private 
 * @returns {undefined}
 */
howlkraul.room.Outdoor.prototype.m_initBorders = function () {
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
    }, this);
  }
}