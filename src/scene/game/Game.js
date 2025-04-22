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

    /**
     * ...
     * 
     * @private
     * @type {array}
     */
    this.playerControllers = [];

    /**
     * ...
     * 
     * @private
     * @type {howlkraul.room.Room}
     */
    this.m_room = new howlkraul.room.Room(this);

    /**
     * ...
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.borders = this.m_room.borders;

    /**
     * ...
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.players = this.groups.create(this.stage);

    /**
     * ...
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.enemies = this.groups.create(this.stage);

    /**
     * ...
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.spells = this.groups.create(this.stage);

    /**
     * ...
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.enemyProjectiles = this.groups.create(this.stage);

    /**
     * ...
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.coins = this.groups.create(this.stage);

    /**
     * ...
     * 
     * @private
     * @type {howlkraul.handler.CollisionHandler}
     */
    this.m_collisionHandler = new howlkraul.handler.CollisionHandler(this);

    /**
     * ...
     * 
     * @private
     * @type {rune.ui.Counter}
     */
    this.moneyCounter = null;

    /**
     * ...
     * 
     * @private
     * @type {boolean}
     */
    this.m_roundTransition = false;

    /**
     * ...
     * 
     * @private
     * @type {number}
     */
    this.m_round = 1;

    this.money = 0;
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
    this.stage.addChild(this.m_room);
    this.m_initMoneyCounter();
    this.m_initPlayers();
    this.m_initEnemies(this.m_round);
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
    this.m_checkGameOver();


    this.playerControllers.forEach(function (player) {
        player.update();
    });
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

    this.playerControllers.forEach(function (player) {
        player.dispose();
    });

    this.playerControllers = null;
    this.m_room = null;
    this.borders = null;
    this.players = null;
    this.enemies = null;
    this.spells = null;
    this.enemyProjectiles = null;
    this.coins = null;
    this.m_collisionHandler = null;
    this.moneyCounter = null;
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.scene.Game.prototype.removeProjectile = function (group, projectile) {
    if (group && projectile) {
        group.removeMember(projectile, true);
    }
}

howlkraul.scene.Game.prototype.addCoin = function (coin) {
    this.coins.addMember(coin);
};

howlkraul.scene.Game.prototype.removeCoin = function (coin) {
    this.coins.removeMember(coin);
};

howlkraul.scene.Game.prototype.addToMoneyCounter = function (amount) {
    this.money += amount;
    this.moneyCounter.setValue(this.money);
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
    // PLAYER ONE
    var playerOne = new howlkraul.player.PlayerOne("wizard");
    this.playerControllers.push(playerOne);
    this.players.addMember(playerOne.character);
    this.stage.addChild(playerOne.hud)

    // PLAYER two
    var playerTwo = new howlkraul.player.PlayerTwo("wizard");
    this.playerControllers.push(playerTwo);
    this.players.addMember(playerTwo.character);
    this.stage.addChild(playerTwo.hud)
};

howlkraul.scene.Game.prototype.m_initEnemies = function (amount) {
    var minX = 200; // Determin min distance from left wall of room
    var minY = 30;// Determin min distance from top wall of room
    for (var i = 0; i < amount; i++) {
        var x1 = rune.util.Math.randomInt(minX, (this.application.width - 50));
        var x2 = rune.util.Math.randomInt(minX, (this.application.width - 50));
        var y1 = rune.util.Math.randomInt(minY, (this.application.height - 50));
        var y2 = rune.util.Math.randomInt(minY, (this.application.height - 50));

        this.enemies.addMember(new howlkraul.entity.Goblin(x2, y2));
        this.enemies.addMember(new howlkraul.entity.Slime(x1, y1));
    }
}

/**
 * @private
 */
howlkraul.scene.Game.prototype.m_initSort = function () {
    var room = this.m_room;

    this.stage.sort = function (a, b) {
        if (a === room) {
            return Number.NEGATIVE_INFINITY;
        }

        if (b == room) {
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


    if (this.m_room.gateOpen) {
        var playersReady = 0;

        this.players.forEachMember(function (player) {
            if (player.topLeft.x > this.application.width) {
                playersReady += 1;
            }
        }, this);


        if (this.players.numMembers <= playersReady && !this.m_roundTransition) {
            this.cameras.getCameraAt(0).fade.out(100);
            this.m_roundTransition = true;

            this.m_transitionTimer = this.timers.create({
                duration: 1000,
                onComplete: function () {
                    this.m_round++;
                    this.m_room.closeDoor();
                    this.m_loadNewRound();
                },
                scope: this
            }, true);
        }
    }
}

howlkraul.scene.Game.prototype.m_loadNewRound = function () {
    this.m_roundTransition = false;
    this.cameras.getCameraAt(0).fade.in(100);
    this.m_room.randomizeColors();
    this.m_initEnemies(this.m_round);

    // move players
    var spawnPoint = 10;
    this.players.forEachMember(function (player) {
        spawnPoint += 20;
        player.moveTo(spawnPoint, 130);
    }, this);

};

howlkraul.scene.Game.prototype.m_checkGameOver = function () {
    var deadPlayers = 0;
    this.players.forEachMember(function (player) {
        if (player.hp === 0) {
            deadPlayers += 1;
        }
    }, this);

    if (deadPlayers >= this.players.numMembers) {
        this.application.scenes.load([new howlkraul.scene.GameOver(this.money)])
    }
};