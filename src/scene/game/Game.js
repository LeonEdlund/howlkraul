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
    rune.scene.Scene.call(this);

    this.players = this.groups.create(this.stage);

    this.enemies = this.groups.create(this.stage);

    this.borders = this.groups.create(this.stage);

    this.m_spells = this.groups.create(this.stage);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.Game.prototype.constructor = howlkraul.scene.Game;

Object.defineProperty(howlkraul.scene.Game.prototype, "spells", {
    get: function () {
        return this.m_spells;
    },

    set: function (spell) {
        if (this.m_spells && this.m_spells.numMembers < 5) {
            this.m_spells.addMember(spell);
        }
        console.log(this.m_spells);
    }
});

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
    this.m_setBorders();
    this.m_initBackground();
    this.m_initPlayers();
    this.m_initEnemies();
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

    this.borders.hitTestAndSeparate(this.enemies);
    this.players.hitTestAndSeparate(this.enemies);

    this.borders.hitTest(this.spells, function () {
        this.m_spells.removeMember(this.m_spells.getMemberAt(0), true);
        this.gamepads.get(0).vibrate(500);
    }, this);

    this.enemies.hitTestAndSeparate(this.spells, function () {
        this.m_spells.removeMember(this.m_spells.getMemberAt(0), true);
        this.cameras.getCameraAt(0).shake.start(300, 1, 1);
        this.gamepads.get(0).vibrate(500);
    }, this);
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
    this.players.addMember(new howlkraul.entity.Wizard());
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
    }, this);
};

howlkraul.scene.Game.prototype.m_initEnemies = function () {
    this.enemies.addMember(new howlkraul.entity.Knight(this.players));
}

