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
   * Refers to the eviroment sprite with walls
   * 
   * @private
   * @type {howlkraul.room.Outdoor}
   */
  this.m_environment = null;

  /**
   * Refers to the gate sprite
   * 
   * @private
   * @type {howlkraul.room.Outdoorgate}
   */
  this.m_gate = null;

  /**
   * All playable dummy wizards.
   * 
   * @private
   * @type {array}
   */
  this.m_wizards = [];

  /**
   * Selector for player one
   * 
   * @private
   * @type {rune.display.Graphic}
   */
  this.m_p1Selector = null

  /**
   * Selector for player two
   * 
   * @private
   * @type {rune.display.Graphic}
   */
  this.m_p2Selector = null

  /**
   * The wizard coice for player one.
   * 
   * @private
   * @type {array}
   */
  this.m_p1Choice = 0;

  /**
   * The wizard coice for player two.
   * 
   * @private
   * @type {array}
   */
  this.m_p2Choice = 2;

  /**
   * The chosen wizard for player one.
   * 
   * @private
   * @type {array}
   */
  this.m_playerOne = null;

  /**
   * The chosen wizard for player two.
   * 
   * @private
   * @type {array}
   */
  this.m_playerTwo = null;

  /**
   * All active players.
   * 
   * @private
   * @type {array}
   */
  this.m_allActivePlayers = [];

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
  this.m_initSelectors();
  this.m_initWizards();
  this.m_initSpellGroup();
  this.m_initSort();
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


  if (!this.m_playerOne) {
    this.m_moveP1Selector();
  }

  if (!this.m_playerTwo && this.m_twoPlayer) {
    this.m_moveP2Selector();
  }

  if (this.m_playerOne) {
    this.m_enviroment.openDoor();
    this.m_checkIfGameStarted();
  }

  this.m_enviroment.borders.hitTestAndSeparateContentOf(this.m_allActivePlayers, this);
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
  this.m_disposeEnvironment();
  this.m_disposeWizards();
  this.stage.removeChildren(true);
  rune.scene.Scene.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Pivate Methods (CharacterSelection LOGIC)
//--------------------------------------------------------------------------

/**
* Moves player ones selector.
* 
* @private
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_moveP1Selector = function () {
  if (this.keyboard.justPressed("d")) {
    this.m_p1Choice++;

    if (this.m_p1Choice > this.m_wizards.length - 1) {
      this.m_p1Choice = 0
    };

  } else if (this.keyboard.justPressed("a")) {
    this.m_p1Choice--;

    if (this.m_p1Choice < 0) {
      this.m_p1Choice = this.m_wizards.length - 1
    };
  }

  this.m_p1Selector.center = this.m_wizards[this.m_p1Choice].center;

  if (this.keyboard.justPressed("enter")) {
    this.m_selectPlayerP1();
  }
};

/**
* Moves player twos selector.
* 
* @private
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_moveP2Selector = function () {
  if (this.keyboard.justPressed("right")) {
    this.m_p2Choice++;

    if (this.m_p2Choice > this.m_wizards.length - 1) {
      this.m_p2Choice = 0
    };

  } else if (this.keyboard.justPressed("left")) {
    this.m_p2Choice--;

    if (this.m_p2Choice < 0) {
      this.m_p2Choice = this.m_wizards.length - 1
    };
  }

  this.m_p2Selector.center = this.m_wizards[this.m_p2Choice].center;

  if (this.keyboard.justPressed("m")) {
    this.m_selectPlayerP2();
  }
};


/**
* Selects a wizard for player one and binds controlls.
* 
* @private
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_selectPlayerP1 = function () {
  this.m_playerOne = this.m_wizards[this.m_p1Choice];

  var p1Input = new howlkraul.handler.InputHandler(
    this.gamepads.get(0),
    this.keyboard,
    {
      left: "a",
      right: "d",
      up: "w",
      down: "s",
      shoot: "space",
      hold: "shift",
    });

  this.m_playerOne.bindControlls(p1Input);
  this.m_bindHUD(this.m_playerOne, new howlkraul.ui.PlayerHud(20, 10, this.m_playerOne));

  this.m_wizards.splice(this.m_p1Choice, 1);
  this.m_allActivePlayers.push(this.m_playerOne);
  this.stage.removeChild(this.m_p1Selector);
};

/**
 * Selects a wizard for player two and binds controlls.
 * 
 * @private
 * @returns {undefined}
 * @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_selectPlayerP2 = function () {
  this.m_playerTwo = this.m_wizards[this.m_p2Choice];

  var p2Input = new howlkraul.handler.InputHandler(
    this.gamepads.get(1),
    this.keyboard,
    {
      left: "left",
      right: "right",
      up: "up",
      down: "down",
      shoot: "m",
      hold: "n",
    });
  this.m_playerTwo.bindControlls(p2Input);
  this.m_bindHUD(this.m_playerTwo, new howlkraul.ui.PlayerHud(310, 10, this.m_playerTwo));

  this.m_wizards.splice(this.m_p2Choice, 1);
  this.m_allActivePlayers.push(this.m_playerTwo);
  this.stage.removeChild(this.m_p2Selector);
};

/**
* Selects a player and binds controlls.
* 
* @private
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_checkIfGameStarted = function () {
  var playerOneReady = this.m_playerOne.topLeft.x > this.application.screen.right;

  // TWO PLAYER
  if (this.m_twoPlayer && this.m_playerTwo) {
    var playerTwoReady = this.m_playerTwo.topLeft.x > this.application.screen.right;

    if (playerOneReady && playerTwoReady) {
      this.application.scenes.load([new howlkraul.scene.Game(this.m_allActivePlayers)]);
    }
    return;
  }

  // SINGLE PLAYER
  if (playerOneReady) {
    this.application.scenes.load([new howlkraul.scene.Game(this.m_allActivePlayers)]);
  }
};

//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
* Initializes the HUD for a player.
* 
* @private
* @param {howlkraul.entity.Wizard} player - the instantiated player object to bind the hud. 
* @param {howlkraul.ui.PlayerHud} hud - the instantiated hud object. 
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_bindHUD = function (player, hud) {
  player.bindHUD(hud);
  this.stage.addChild(hud);
};

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

  if (!this.m_gate) {
    this.m_gate = new rune.display.Sprite(0, 0, 49, 90, "entrance_49x90");
    this.m_gate.animation.create("glimmer", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    this.stage.addChild(this.m_gate);
    this.m_gate.moveTo(this.application.screen.right - this.m_gate.width, 65)
  }
};

/**
* Initializes all wizzards in different colors.
* 
* @private
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_initWizards = function () {
  this.m_disposeWizards();

  if (this.m_wizards.length <= 0) {
    var blueWiz = new howlkraul.entity.Wizard(60, 70);
    var brownWiz = new howlkraul.entity.Wizard(120, 50);
    var greenWiz = new howlkraul.entity.Wizard(220, 70);
    var redWiz = new howlkraul.entity.Wizard(300, 50);

    brownWiz.changeColor("brown");
    greenWiz.changeColor("green");
    redWiz.changeColor("red");

    this.m_wizards.push(blueWiz);
    this.m_wizards.push(brownWiz);
    this.m_wizards.push(greenWiz);
    this.m_wizards.push(redWiz);

    for (let i = 0; i < this.m_wizards.length; i++) {
      this.stage.addChild(this.m_wizards[i]);
    }
  }
};

/**
* Initializes all wizzards in different colors.
* 
* @private
* @returns {undefined}
* @ignore
*/
howlkraul.scene.CharacterSelection.prototype.m_initSelectors = function () {
  if (!this.m_p1Selector) {
    this.m_p1Selector = new rune.display.Graphic(0, 0, 30, 30);
    this.m_p1Selector.backgroundColor = "red";
    this.m_p1Selector.alpha = 0.4;
    this.stage.addChild(this.m_p1Selector);
  }

  if (this.m_twoPlayer && !this.m_p2Selector) {
    this.m_p2Selector = new rune.display.Graphic(0, 0, 30, 30);
    this.m_p2Selector.backgroundColor = "blue";
    this.m_p2Selector.alpha = 0.4;
    this.stage.addChild(this.m_p2Selector);
  }
};

/**
 * Initializes spell group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.CharacterSelection.prototype.m_initSpellGroup = function () {
  this.m_disposeSpellGroup();

  if (!this.m_spells) {
    this.m_spells = this.groups.create(this.stage);
  }
};

/**
 * Sort the visual objects on the stage. 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.CharacterSelection.prototype.m_initSort = function () {
  var enviroment = this.m_enviroment;

  this.stage.sort = function (a, b) {
    if (a === enviroment) {
      return Number.NEGATIVE_INFINITY;
    }

    if (b == enviroment) {
      return Number.POSITIVE_INFINITY;
    }

    return a.bottom - b.bottom;
  };
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

  if (this.m_gate) {
    this.stage.removeChild(this.m_gate, true);
    this.m_gate = null;
  }
};

/**
 * Disposes dummy wizards.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.CharacterSelection.prototype.m_disposeWizards = function () {
  if (this.m_wizards) {
    for (let i = 0; i < this.m_wizards.length; i++) {
      this.stage.removeChild(this.m_wizards[i], true);
    }

    this.m_wizards = [];
  }
};

/**
 * Disposes spell group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.CharacterSelection.prototype.m_disposeSpellGroup = function () {
  if (this.m_spells) {
    this.m_spells.removeChildren(true);
    this.m_spells = null;
  }
};