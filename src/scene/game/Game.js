/**
 * Creates a new scene for the game.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
howlkraul.scene.Game = function (numPlayers) {
    rune.scene.Scene.call(this);

    /**
     * Numbers of players.
     * 
     * @private
     * @type {number}
     */
    this.m_numPlayers = numPlayers || 1;


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
     * @type {rune.display.DisplayGroup}
     */
    this.potions = this.groups.create(this.stage);

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

//--------------------------------------------------------------------------
// Getters And Setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.scene.Game.prototype, "room", {
    get: function () {
        return this.m_room;
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritdoc
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
 * @inheritdoc
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
 * @inheritdoc
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

/**
 * Add money to the total money counter.
 * 
 * @public
 * @param {number} amount - How much should be added.
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.addToMoneyCounter = function (amount) {
    this.money += amount;
    this.moneyCounter.setValue(this.money);
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initializes the money counter.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_initMoneyCounter = function () {
    this.moneyCounter = new rune.ui.Counter(5, undefined, undefined, undefined, 5);
    this.moneyCounter.moveTo(320, 0);
    this.moneyCounter.setValue(0);
    this.stage.addChild(this.moneyCounter);
};

/**
 * Initializes all players.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_initPlayers = function () {
    switch (this.m_numPlayers) {
        case 1:
            var playerOne = new howlkraul.player.PlayerOne("wizard");
            this.playerControllers.push(playerOne);
            this.players.addMember(playerOne.character);
            this.stage.addChild(playerOne.hud)
            break;

        case 2:
            // PLAYER ONE
            var playerOne = new howlkraul.player.PlayerOne("wizard");
            this.playerControllers.push(playerOne);
            this.players.addMember(playerOne.character);
            this.stage.addChild(playerOne.hud)

            // PLAYER TWO
            var playerTwo = new howlkraul.player.PlayerTwo("wizard", "green");
            this.playerControllers.push(playerTwo);
            this.players.addMember(playerTwo.character);
            this.stage.addChild(playerTwo.hud)
            break;
    }
};

/**
 * Initializes all Enemies.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_initEnemies = function (amount) {
    var minX = 200; // Determin min distance from left wall of room
    var minY = 30;// Determin min distance from top wall of room

    for (var i = 0; i < amount; i++) {
        var x1 = rune.util.Math.randomInt(minX, (this.application.width - 50));
        var x2 = rune.util.Math.randomInt(minX, (this.application.width - 50));
        var x3 = rune.util.Math.randomInt(minX, (this.application.width - 50));

        var y1 = rune.util.Math.randomInt(minY, (this.application.height - 50));
        var y2 = rune.util.Math.randomInt(minY, (this.application.height - 50));
        var y3 = rune.util.Math.randomInt(minY, (this.application.height - 50));

        // Goblin
        if (rune.util.Math.chance(50)) {
            this.enemies.addMember(new howlkraul.entity.Goblin(x2, y2));
        }

        // Slimes
        if (rune.util.Math.chance(80)) {
            this.enemies.addMember(new howlkraul.entity.Slime(x1, y1));
        }

        // Troll
        if (rune.util.Math.chance(65)) {
            this.enemies.addMember(new howlkraul.entity.Troll(x3, y3));
        }
    }
}

/**
 * Sort the visual objects on the stage. 
 * 
 * @private
 * @returns {undefined}
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

/**
 * Handle pause of the game.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_handlePause = function () {
    if (this.keyboard.justPressed("escape")) {
        this.application.scenes.load([new howlkraul.scene.Menu()]);
    }
};

/**
 * Handle what happens when all enemies are dead and a round is won. 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_handleRoundWin = function () {
    if (this.enemies.numMembers <= 0 && !this.m_room.gateOpen) {
        this.m_room.openDoor();
    }

    if (!this.m_room.gateOpen) return;

    // Check if a player walks through the door
    var playersReady = 0;
    this.players.forEachMember(function (player) {
        if (player.topLeft.x > this.application.width) {
            playersReady += 1;
        }
    }, this);

    if (playersReady === 1 && !this.m_roundTransition) {
        this.cameras.getCameraAt(0).fade.out(100);
        this.m_roundTransition = true;

        this.m_transitionTimer = this.timers.create({
            duration: 1000,
            onComplete: this.m_loadNewRound,
            scope: this
        }, true);
    }
}

/**
 * Load a new round.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_loadNewRound = function () {
    this.m_roundTransition = false;
    this.m_disposeBetweenRound();

    this.m_round++;
    this.m_room.closeDoor();
    this.cameras.getCameraAt(0).fade.in(100);

    this.m_room.randomizeColors();
    this.m_room.placeFurniture();
    this.m_initEnemies(this.m_round);

    // move players
    var spawnPoint = 10;
    this.players.forEachMember(function (player) {
        spawnPoint += 20;
        player.moveTo(spawnPoint, 130);
        if (player.hp === 0) player.raiseFromDead();
    }, this);
};

/**
 * Check if all characters are dead.
 * 
 * @private
 * @returns {undefined}
 */
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

/**
 * Clear up resources between rounds
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_disposeBetweenRound = function () {
    this.coins.removeMembers(true);
    this.potions.removeMembers(true);
    this.enemies.removeMembers(true);
    this.spells.removeMembers(true);
    this.enemyProjectiles.removeMembers(true);

    //TIMERS FOR COINS DONT GET REMOVED
    //this.timers.clear();
};