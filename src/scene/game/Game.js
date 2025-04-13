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

    this.m_room = new howlkraul.room.Room(this);

    this.borders = this.m_room.borders;

    this.m_background = this.m_room.background;

    this.players = this.groups.create(this.stage);

    this.enemies = this.groups.create(this.stage);

    this.m_spells = this.groups.create(this.stage);

    this.coins = this.groups.create(this.stage);

    this.m_collisionHandler = new howlkraul.handler.CollisionHandler(this);

    this.moneyCounter = null;

    console.log(this.m_room.borders)
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
    this.m_initMoneyCounter();
    this.m_initPlayers();
    this.m_initEnemies(5);
    this.m_initSort();
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
    this.m_handlePause();
    this.m_collisionHandler.update();
    this.m_handleRoundWin();

    // follow player
    this.enemies.forEachMember(function (enemy) {
        if (enemy.hp > 0) {
            enemy.followPlayers(this.players);
        }
    }, this)
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

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.scene.Game.prototype.removeSpell = function (spell) {
    if (this.spells && spell) {
        this.m_spells.removeMember(spell, true);
    }
}

howlkraul.scene.Game.prototype.addCoin = function (coin) {
    this.coins.addMember(coin);
};

howlkraul.scene.Game.prototype.addToMoneyCounter = function (amount) {
    var money = this.moneyCounter.value + amount;
    this.moneyCounter.setValue(money);
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.scene.Game.prototype.m_initMoneyCounter = function () {
    this.moneyCounter = new rune.ui.Counter(5, undefined, undefined, undefined, 5);
    this.moneyCounter.moveTo(320, 0);
    this.moneyCounter.setValue(0);
    this.stage.addChild(this.moneyCounter);
};

howlkraul.scene.Game.prototype.m_initPlayers = function () {
    this.players.addMember(new howlkraul.entity.Wizard());
};

howlkraul.scene.Game.prototype.m_initEnemies = function (amount) {
    for (var i = 0; i < amount; i++) {
        var x = rune.util.Math.randomInt(30, (this.application.width - 50));
        var y = rune.util.Math.randomInt(30, (this.application.height - 50));

        this.enemies.addMember(new howlkraul.entity.Knight(x, y));
    }
}

/**
 * @private
 */
howlkraul.scene.Game.prototype.m_initSort = function () {
    var m_this = this;
    console.log(m_this.m_background);
    this.stage.sort = function (a, b) {
        if (b == m_this.m_background) {
            return Number.POSITIVE_INFINITY;
        }

        return a.bottom - b.bottom;
    };
};

howlkraul.scene.Game.prototype.m_handlePause = function () {
    if (this.keyboard.justPressed("escape")) {
        this.application.scenes.load([new howlkraul.scene.Menu()]);
    }
};

howlkraul.scene.Game.prototype.m_handleRoundWin = function () {
    if (this.enemies.numMembers <= 0 && !this.m_room.gateOpen) {
        this.m_room.openDoor();
    }
}

