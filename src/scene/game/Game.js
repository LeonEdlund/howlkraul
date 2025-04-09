//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
howlkraul.scene.Game = function () {

    this.players = null;

    this.borders = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.Game.prototype.constructor = howlkraul.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initBackground();
    this.m_initPlayers();
    this.m_setBorders();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.keyboard.justPressed("escape")) {
        this.m_endGame();
    }

    this.borders.hitTestAndSeparate(this.players);
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

howlkraul.scene.Game.prototype.m_endGame = function () {
    this.application.scenes.load([new howlkraul.scene.Menu()]);
};

howlkraul.scene.Game.prototype.m_initPlayers = function () {
    this.players = this.groups.create(this.stage);

    var knight = new howlkraul.entity.Knight();
    var wiz = new howlkraul.entity.Wizard();

    this.players.addMember(knight);
    this.players.addMember(wiz);

    this.stage.addChild(knight);
    this.stage.addChild(wiz);
};

howlkraul.scene.Game.prototype.m_initBackground = function () {
    var background = new rune.display.Graphic(
        0,
        0,
        this.application.screen.width,
        this.application.screen.height,
        "background"
    );

    this.stage.addChild(background);
};

howlkraul.scene.Game.prototype.m_setBorders = function () {
    this.borders = this.groups.create(this.stage);
    var thicknessTop = 25;
    var thicknessSides = 35;

    var top = new rune.display.Graphic(0, 0, 400, thicknessTop);
    var left = new rune.display.Graphic(0, 0, thicknessSides, 225);
    var bottom = new rune.display.Graphic(0, (225 - thicknessTop), 400, thicknessTop);
    var right = new rune.display.Graphic((400 - thicknessSides), 0, thicknessSides, 225);

    this.borders.addMember(top);
    this.borders.addMember(left);
    this.borders.addMember(bottom);
    this.borders.addMember(right);

    this.borders.forEachMember(function (wall) {
        wall.immovable = true;
        wall.backgroundColor = "red";
        wall.alpha = 0.2;
    }, this);

    this.stage.addChild(top);
    this.stage.addChild(left);
    this.stage.addChild(bottom);
    this.stage.addChild(right);
};