//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Game scene object.
 *
 * @constructor
 * @extends rune.scene.Scene
 * @param {array<howlkraul.entity.Wizard>} selectedPlayers  - An array of all selected players.
 * 
 * @class
 * @classdesc
 * 
 * Game scene.
 */
howlkraul.scene.Game = function (selectedPlayers) {

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
     * The playable characters that should be added to the scene.
     * 
     * @private
     * @type {array}
     */
    this.m_selectedPlayers = selectedPlayers || [];

    /**
     * The background song.
     * 
     * @private
     * @type {rune.media.Sound}
     */
    this.m_song = null;

    /**
     * Refers to the room object.
     * 
     * @private
     * @type {howlkraul.room.Room}
     */
    this.m_room = null;

    /**
     * Referes to the ScoreCounter. 
     * 
     * @private
     * @type {howlkraul.ui.ScoreCounter}
     */
    this.m_moneyCounter = null;

    /**
     * Referes to the DisplayGroup holding all players. 
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.m_players = null;

    /**
     * Referes to the DisplayGroup holding all Wizard enemies. 
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.m_enemies = null;

    /**
     * Referes to the DisplayGroup holding all Wizard spells. 
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.m_spells = null;

    /**
     * Referes to the DisplayGroup holding all Wizard spells. 
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.m_enemyProjectiles = null;

    /**
     * Referes to the DisplayGroup holding all coins. 
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.m_coins = null;

    /**
     * Referes to the DisplayGroup holding all potions. 
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.m_potions = null;

    /**
     * Referes to the DisplayGroup holding all bombs. 
     * 
     * @private
     * @type {rune.display.DisplayGroup}
     */
    this.m_bombs = null;

    /**
     * Referes to the CollisonHandler.
     * Used to check collision. 
     * 
     * @private
     * @type {howlkraul.handler.CollisionHandler}
     */
    this.m_collisionHandler = null;

    /**
     * Flag to check if game is currently transitioning.  
     * 
     * @private
     * @type {boolean}
     */
    this.m_roundTransition = false;

    /**
     * The number of rounds played.
     * 
     * @private
     * @type {number}
     */
    this.m_round = 1;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.Game.prototype.constructor = howlkraul.scene.Game;

//--------------------------------------------------------------------------
// Public Getter And Setters
//--------------------------------------------------------------------------

/**
 * Referes to the room object that holds the room sprite and walls.
 * Usefull for collision testing against walls. 
 *
 * @member {howlkraul.room.Room} room
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "room", {
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
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "players", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_players;
    }
});

/**
 * Referes to the DisplayGroup holding all enemies. 
 *
 * @member {rune.display.DisplayGroup} enemies
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "enemies", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_enemies;
    }
});

/**
 * Referes to the DisplayGroup holding all Wizard spells. 
 *
 * @member {rune.display.DisplayGroup} spells
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "spells", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_spells;
    }
});

/**
 * Referes to the DisplayGroup holding all enemy projectiles. 
 *
 * @member {rune.display.DisplayGroup} enemyProjectiles
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "enemyProjectiles", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_enemyProjectiles;
    }
});

/**
 * Referes to the DisplayGroup holding all coins. 
 *
 * @member {rune.display.DisplayGroup} coins
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "coins", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_coins;
    }
});

/**
 * Referes to the DisplayGroup holding all potions. 
 *
 * @member {rune.display.DisplayGroup} potions
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "potions", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_potions;
    }
});

/**
 * Referes to the DisplayGroup holding all bombs. 
 *
 * @member {rune.display.DisplayGroup} bombs
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "bombs", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_bombs;
    }
});

/**
 * Referes to the ScoreCounter object.
 * Usefull for updating or retriving the score.
 *
 * @member {howlkraul.ui.ScoreCounter} moneyCounter
 * @memberof howlkraul.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.scene.Game.prototype, "moneyCounter", {
    /**
     * @this rune.scene.Scene
     * @ignore
     */
    get: function () {
        return this.m_moneyCounter;
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
howlkraul.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_initMusic();
    this.m_initRoom();
    this.m_initMoneyCounter();
    this.m_initPlayers();
    this.m_initEnemyGroup();
    this.m_initSpellGroup();
    this.m_initEnemyProjectileGroup();
    this.m_initCoinGroup();
    this.m_initPotionGroup();
    this.m_initBombGroup();
    this.m_initCollisionHandler();
    this.m_initSort();
    this.m_spawnEnemies();
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
*
* @public
* @param {number} step Fixed time step.
* @returns {undefined}
*/
howlkraul.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    this.m_handlePause();
    this.m_collisionHandler.update();
    this.m_handleRoundWin();
    this.m_checkGameOver();
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
    this.m_disposeRoom();
    this.m_disposeMoneyCounter();
    this.m_disposePlayers();
    this.m_disposeEnemieGroup();
    this.m_disposeSpellGroup();
    this.m_disposeEnemyProjectileGroup();
    this.m_disposeCoinGroup();
    this.m_disposePotionGroup();
    this.m_disposeBombGroup();
    this.m_disposeCollisionHandler();
    this.stage.removeChildren(true);

    rune.scene.Scene.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Pivate Methods (GAME LOGIC)
//--------------------------------------------------------------------------

/**
 * Spawns enemies to stage;
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_spawnEnemies = function () {
    random = rune.util.Math.randomInt;
    var minX = 200;
    var maxX = this.application.width - 50;

    var minY = 30;
    var maxY = this.application.height - 50;

    for (var i = 0; i < this.m_round; i++) {
        // Goblin
        if (rune.util.Math.chance(50)) {
            this.m_enemies.addMember(new howlkraul.entity.Goblin(random(minX, maxX), random(minY, maxY)));
        }

        // Slimes
        if (rune.util.Math.chance(80)) {
            this.m_enemies.addMember(new howlkraul.entity.Slime(random(minX, maxX), random(minY, maxY)));
        }

        // Troll
        if (rune.util.Math.chance(65)) {
            this.m_enemies.addMember(new howlkraul.entity.Troll(random(minX, maxX), random(minY, maxY)));
        }
    }

    // Big Troll
    if (rune.util.Math.chance(60) && this.m_round > 5) {
        this.m_enemies.addMember(new howlkraul.entity.BigTroll(
            random(minX, this.application.width - 80),
            random(minY, this.application.height - 80)
        ));
    }

}

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
    if (this.m_enemies.numMembers > 0) return;

    this.m_room.openDoor();

    for (var i = 0; i < this.m_players.numMembers; i++) {
        if (this.m_players.getMemberAt(i).topLeft.x > this.application.width && !this.m_roundTransition) {
            this.m_roundTransition = true;

            this.cameras.getCameraAt(0).fade.out(100);
            this.m_transitionTimer = this.timers.create({
                duration: 1000,
                onComplete: this.m_loadNewRound,
                scope: this
            }, true);

            break;
        }
    }
}

/**
 * Load a new round.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_loadNewRound = function () {
    this.m_disposeBetweenRound();

    this.m_roundTransition = false;
    this.m_round++;
    this.m_room.closeDoor();
    this.m_room.randomizeColors();
    this.m_room.placeFurniture();
    this.m_spawnEnemies();
    this.m_movePlayersToEntrance()
    this.cameras.getCameraAt(0).fade.in(100);
};

/**
 * Check if all characters are dead.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_checkGameOver = function () {
    var deadPlayers = 0;

    this.m_players.forEachMember(function (player) {
        if (player.hp === 0) deadPlayers += 1;
    }, this);

    if (deadPlayers >= this.m_players.numMembers && !this.m_gameOver) {
        this.m_gameOver = true;
        this.m_handleGameOver();
    }
};

/**
 * Handles game over.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_handleGameOver = function () {
    var twoPlayer = (this.m_selectedPlayers.length === 2) ? true : false;
    var playerStats = [];

    this.m_players.forEachMember(function (player) {
        playerStats.push(player.stats);
    }, this);

    this.cameras.getCameraAt(0).fade.out(800, function () {
        this.application.scenes.load([new howlkraul.scene.GameOver(this.m_moneyCounter.score, twoPlayer, playerStats)])
    }, this);
};



//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Initializes the background music.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initMusic = function () {
    this.m_song = this.application.sounds.music.get("music_playing");
    this.m_song.loop = true;
    this.m_song.volume = 0.6;
    this.m_song.play();
};

/**
 * Initializes the room.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initRoom = function () {
    this.m_disposeRoom();

    if (!this.m_room) {
        this.m_room = new howlkraul.room.Room(this);
        this.stage.addChild(this.m_room);
    }
};

/**
 * Moves players to the entrance.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_movePlayersToEntrance = function () {
    // move players
    var spawnPoint = 10;
    this.m_players.forEachMember(function (player) {
        spawnPoint += 20;
        player.moveTo(spawnPoint, 130);
        if (player.hp === 0) player.raiseFromDead();
    }, this);
};


/**
 * Initializes the money counter.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initMoneyCounter = function () {
    this.m_disposeMoneyCounter();

    if (!this.m_moneyCounter) {
        this.m_moneyCounter = new howlkraul.ui.ScoreCounter(0, 15);
        this.m_moneyCounter.centerX = this.application.screen.centerX;
        this.stage.addChild(this.m_moneyCounter);
    }
};

/**
 * Initializes as many players as m_players.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_initPlayers = function () {
    this.m_disposePlayers();

    if (!this.m_players) {
        this.m_players = this.groups.create(this.stage);

        for (var i = 0; i < this.m_selectedPlayers.length; i++) {
            var player = this.m_selectedPlayers[i];
            this.m_players.addMember(player);
            this.stage.addChild(player.HUD);
            player.HUD.changeColor(player.color);
        }

        this.m_movePlayersToEntrance();
    }
};

/**
 * Initializes enemy group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initEnemyGroup = function () {
    this.m_disposeEnemieGroup();

    if (!this.m_enemies) {
        this.m_enemies = this.groups.add(new howlkraul.entity.Enemies(this));
    }
};

/**
 * Initializes spell group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initSpellGroup = function () {
    this.m_disposeSpellGroup();

    if (!this.m_spells) {
        this.m_spells = this.groups.create(this.stage);
    }
};

/**
 * Initializes EnemyProjectile group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initEnemyProjectileGroup = function () {
    this.m_disposeEnemyProjectileGroup();

    if (!this.m_enemyProjectiles) {
        this.m_enemyProjectiles = this.groups.create(this.stage);
    }
};


/**
 * Initializes Coin group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initCoinGroup = function () {
    this.m_disposeCoinGroup();

    if (!this.m_coins) {
        this.m_coins = this.groups.create(this.stage);
    }
};

/**
 * Initializes potion group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initPotionGroup = function () {
    this.m_disposePotionGroup();

    if (!this.m_potions) {
        this.m_potions = this.groups.create(this.stage);
    }
};

/**
 * Initializes potion group.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initBombGroup = function () {
    this.m_disposeBombGroup();

    if (!this.m_bombs) {
        this.m_bombs = this.groups.add(new howlkraul.drops.Bombs(this));
    }
};

/**
 * Initializes Collision handler.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_initCollisionHandler = function () {
    this.m_disposeCollisionHandler();

    if (!this.m_collisionHandler) {
        this.m_collisionHandler = new howlkraul.handler.CollisionHandler(this);
    }
};

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


//--------------------------------------------------------------------------
// Private Methods (DISPOSE)
//--------------------------------------------------------------------------

/**
 * Clear up resources between rounds.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Game.prototype.m_disposeBetweenRound = function () {
    this.application.sounds.sound.clear();
    this.m_enemies.removeMembers(true);
    this.m_spells.removeMembers(true);
    this.m_enemyProjectiles.removeMembers(true);
    this.m_coins.removeMembers(true);
    this.m_potions.removeMembers(true);
    this.m_bombs.removeMembers(true);
    this.m_room.furniture.removeMembers(true);
};

/**
 * Disposes room.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeRoom = function () {
    if (this.m_room) {
        this.stage.removeChild(this.m_room, true);
        this.m_room = null;
    }
};

/**
 * Disposes moneycounter
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeMoneyCounter = function () {
    if (this.m_moneyCounter) {
        this.stage.removeChild(this.m_moneyCounter, true);
        this.m_moneyCounter = null;
    }
};

/**
 * Disposes players
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposePlayers = function () {
    if (this.m_players) {
        this.m_players.removeMembers(true);
        this.m_players = null;
    }
};

/**
 * Disposes Enemie Group
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeEnemieGroup = function () {
    if (this.m_enemies) {
        this.m_enemies.removeMembers(true);
        this.m_enemies = null;
    }
};

/**
 * Disposes spell Group
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeSpellGroup = function () {
    if (this.m_spells) {
        this.m_spells.removeMembers(true);
        this.m_spells = null;
    }
};

/**
 * Disposes EnemyProjectile Group
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeEnemyProjectileGroup = function () {
    if (this.m_enemyProjectiles) {
        this.m_enemyProjectiles.removeMembers(true);
        this.m_enemyProjectiles = null;
    }
};

/**
 * Disposes Coin Group
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeCoinGroup = function () {
    if (this.m_coins) {
        this.m_coins.removeMembers(true);
        this.m_coins = null;
    }
};

/**
 * Disposes potion group
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposePotionGroup = function () {
    if (this.m_potions) {
        this.m_potions.removeMembers(true);
        this.m_potions = null;
    }
};

/**
 * Disposes potion group
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeBombGroup = function () {
    if (this.m_bombs) {
        this.m_bombs.removeMembers(true);
        this.m_bombs = null;
    }
};

/**
 * Disposes Collision handler.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Game.prototype.m_disposeCollisionHandler = function () {
    if (this.m_collisionHandler) {
        this.m_collisionHandler.dispose();
        this.m_collisionHandler = null;
    }
};