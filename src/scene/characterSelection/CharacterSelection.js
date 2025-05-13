//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new CharacterSelection scene object.
 *
 * @constructor
 * @extends rune.scene.Scene
 * @param {bool} twoPlayer  - how many players that should be instantiated.
 * 
 * @class
 * @classdesc
 * 
 * CharacterSelection scene.
 */
howlkraul.scene.CharacterSelection = function (twoPlayer) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
  * Calls the constructor method of the super class.
  */
  rune.scene.Scene.call(this);

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * The amount of players that should be instantiated
   * 
   * @private
   * @type {number}
   */
  this.m_twoPlayer = twoPlayer || false;

  /**
   * Refers to 
   * 
   * @private
   * @type {howlkraul.room.Room}
   */
  this.m_room = null;

  /**
   * Referes to the DisplayGroup holding all players. 
   * 
   * @private
   * @type {rune.display.DisplayGroup}
   */
  this.m_players = null;

  /**
   * Referes to the DisplayGroup holding all Wizard spells. 
   * 
   * @private
   * @type {rune.display.DisplayGroup}
   */
  this.m_spells = null;

  /**
   * Referes to the CollisonHandler.
   * Used to check collision. 
   * 
   * @private
   * @type {howlkraul.handler.CollisionHandler}
   */
  this.m_collisionHandler = null;

  /**
   * Flag to check if CharacterSelection is currently transitioning.  
   * 
   * @private
   * @type {boolean}
   */
  this.m_roundTransition = false;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.CharacterSelection.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.CharacterSelection.prototype.constructor = howlkraul.scene.CharacterSelection;

//--------------------------------------------------------------------------
// Public Getter And Setters
//--------------------------------------------------------------------------

/**
* Referes to the room object that holds the room sprite and walls.
* Usefull for collision testing against walls. 
*
* @member {howlkraul.room.Room} room
* @memberof howlkraul.scene.CharacterSelection
* @instance
* @readonly
*/
Object.defineProperty(howlkraul.scene.CharacterSelection.prototype, "room", {
  /**
   * @this rune.scene.Scene
   * @ignore
   */
  get: function () {
    return this.m_room;
  }
});

/**
* Referes to the DisplayGroup holding all players. 
*
* @member {rune.display.DisplayGroup} players
* @memberof howlkraul.scene.CharacterSelection
* @instance
* @readonly
*/
Object.defineProperty(howlkraul.scene.CharacterSelection.prototype, "players", {
  /**
   * @this rune.scene.Scene
   * @ignore
   */
  get: function () {
    return this.m_players;
  }
});

/**
* Referes to the DisplayGroup holding all Wizard spells. 
*
* @member {rune.display.DisplayGroup} spells
* @memberof howlkraul.scene.CharacterSelection
* @instance
* @readonly
*/
Object.defineProperty(howlkraul.scene.CharacterSelection.prototype, "spells", {
  /**
   * @this rune.scene.Scene
   * @ignore
   */
  get: function () {
    return this.m_spells;
  }
});

//------------------------------------------------------------------------------
// Override rune methods
//------------------------------------------------------------------------------

/**
* Initializes all objects for the scene.
* Is run once when an instance is created.
* 
* @public
* @returns {undefined}
*/
howlkraul.scene.CharacterSelection.prototype.init = function () {
  rune.scene.Scene.prototype.init.call(this);

  this.m_initEnvironment();
  //this.m_initSort();
};

/**
* This method is automatically executed once per "tick". The method is used for 
* calculations such as application logic.
*
* @public
* @param {number} step Fixed time step.
* @returns {undefined}
*/
howlkraul.scene.CharacterSelection.prototype.update = function (step) {
  rune.scene.Scene.prototype.update.call(this, step);
};

/**
* This method is automatically called once just before the scene ends. Use 
* the method to reset references and remove objects that no longer need to 
* exist when the scene is destroyed. The process is performed in order to 
* avoid memory leaks.
*
* @returns {undefined}
*/
howlkraul.scene.CharacterSelection.prototype.dispose = function () {

  this.stage.removeChildren(true);
  rune.scene.Scene.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Pivate Methods (CharacterSelection LOGIC)
//--------------------------------------------------------------------------


//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
* Initializes the room.
* 
* @private
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_initEnvironment = function () {
  this.m_disposeEnvironment();

  if (!this.m_enviroment) {
    this.m_enviroment = new howlkraul.room.Outdoor(this);
    this.stage.addChild(this.m_enviroment);
  }
};


//--------------------------------------------------------------------------
// Private Methods (DISPOSE)
//--------------------------------------------------------------------------

/**
 * Disposes enviroment.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.CharacterSelection.prototype.m_disposeEnvironment = function () {
  if (this.m_enviroment) {
    this.stage.removeChild(this.m_enviroment, true);
    this.m_enviroment = null;
  }
};