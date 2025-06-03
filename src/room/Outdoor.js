/**
 * Creates a new Outdoor object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {rune.scene.Scene} game - The scene where the group should be added.
 * 
 * @class
 * @classdesc
 *
 * Represents the outdoor area.
 */
howlkraul.room.Outdoor = function (game) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, 0, 0, 400, 225, "outside_400x225");

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

/**
 * The displaygroup that holds the invisible borders.
 *
 * @member {rune.display.DisplayGroup} borders
 * @memberof howlkraul.room.Outdoor
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.room.Outdoor.prototype, "borders", {
  /**
   * @this howlkraul.room.Outdoor
   * @ignore
   */
  get: function () {
    return this.m_borders;
  }
});

/**
 * Flag that checks if gate is open or not.
 *
 * @member {boolean} gateOpen
 * @memberof howlkraul.room.Outdoor
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.room.Outdoor.prototype, "gateOpen", {
  /**
   * @this howlkraul.room.Outdoor
   * @ignore
   */
  get: function () {
    return this.m_gateOpen;
  }
});

//--------------------------------------------------------------------------
// Overide rune public methods
//--------------------------------------------------------------------------

/**
 * Is run once when an instance is created.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.room.Outdoor.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initBorders();
}

/**
 * Clean up and remove resources.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.room.Outdoor.prototype.dispose = function () {
  this.m_borders.removeMembers(true);
  this.m_game = null;
  this.m_borders = null;

  rune.display.Sprite.prototype.dispose.call(this);
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
    this.m_gate.y = 142;
  }
}


//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

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
    var thicknessTop = 20;
    var thicknessBottom = 5;
    var thicknessSides = 13;

    var bottomY = height - thicknessBottom;
    var rightX = width - thicknessSides;

    var top = new rune.display.Graphic(0, 0, width, thicknessTop);
    var left = new rune.display.Graphic(0, 0, thicknessSides, height);
    var bottom = new rune.display.Graphic(0, bottomY, width, thicknessBottom);
    var rightTop = new rune.display.Graphic(rightX, 0, thicknessSides, 90);
    this.m_gate = new rune.display.Graphic(rightX, 70, thicknessSides, 230);

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