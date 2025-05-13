/**
 * Represents a state where the enemy attacks the closest player on the scene. 
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The Attack state is used to make enemies go in to attack mode. 
 */
howlkraul.scene.GamePlaying = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.state.State.call(this, "GamePlaying");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.scene.GamePlaying.prototype = Object.create(rune.state.State.prototype);
howlkraul.scene.GamePlaying.prototype.constructor = howlkraul.scene.GamePlaying;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * @override
*/
howlkraul.scene.GamePlaying.prototype.update = function (step) {
    rune.state.State.prototype.update.call(this, step);

    this.m_handlePause();
    this.owner.m_collisionHandler.update();
    this.m_handleRoundWin();
    this.m_checkGameOver();
};

/**
 * @override
*/
howlkraul.scene.GamePlaying.prototype.onEnter = function () {
    console.log("GamePlaying");
};

//--------------------------------------------------------------------------
// Pivate Methods (GamePlaying LOGIC)
//--------------------------------------------------------------------------

/**
 * Spawns enemies to stage;
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GamePlaying.prototype.m_spawnEnemies = function () {
    randomFunc = rune.util.Math.randomInt;
    var minX = 200;
    var maxX = this.owner.application.width - 50;

    var minY = 30;
    var maxY = this.owner.application.height - 50;

    for (var i = 0; i < this.owner.m_round; i++) {
        // Goblin
        if (rune.util.Math.chance(50)) {
            this.owner.enemies.addMember(new howlkraul.entity.Goblin(randomFunc(minX, maxX), randomFunc(minY, maxY)));
        }

        // Slimes
        if (rune.util.Math.chance(80)) {
            this.owner.enemies.addMember(new howlkraul.entity.Slime(randomFunc(minX, maxX), randomFunc(minY, maxY)));
        }

        // Troll
        if (rune.util.Math.chance(65)) {
            this.owner.enemies.addMember(new howlkraul.entity.Troll(randomFunc(minX, maxX), randomFunc(minY, maxY)));
        }
    }

    // Big Troll
    if (rune.util.Math.chance(60) && this.m_round > 5) {
        this.owner.enemies.addMember(new howlkraul.entity.BigTroll(
            randomFunc(minX, this.application.width - 80),
            randomFunc(minY, this.application.height - 80)
        ));
    }

    console.log(this.owner.enemies);

}

/**
 * Handle pause of the GamePlaying.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GamePlaying.prototype.m_handlePause = function () {
    if (this.owner.keyboard.justPressed("escape")) {
        this.owner.application.scenes.load([new howlkraul.scene.Menu()]);
    }
};

/**
 * Handle what happens when all enemies are dead and a round is won. 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GamePlaying.prototype.m_handleRoundWin = function () {
    if (this.owner.m_enemies.numMembers > 0) return;

    this.owner.room.openDoor();

    for (var i = 0; i < this.owner.players.numMembers; i++) {
        if (this.owner.players.getMemberAt(i).topLeft.x > this.owner.application.width && !this.owner.m_roundTransition) {
            this.owner.cameras.getCameraAt(0).fade.out(100);
            this.owner.m_roundTransition = true;

            this.m_transitionTimer = this.owner.timers.create({
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
howlkraul.scene.GamePlaying.prototype.m_loadNewRound = function () {
    this.owner.m_roundTransition = false;
    this.m_disposeBetweenRound();

    this.owner.m_round++;
    this.owner.room.closeDoor();
    this.owner.cameras.getCameraAt(0).fade.in(100);

    this.owner.room.randomizeColors();
    this.owner.room.placeFurniture();
    this.m_spawnEnemies();

    // move players
    var spawnPoint = 10;
    this.owner.players.forEachMember(function (player) {
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
howlkraul.scene.GamePlaying.prototype.m_checkGameOver = function () {
    var deadPlayers = 0;
    this.owner.players.forEachMember(function (player) {
        if (player.hp === 0) {
            deadPlayers += 1;
        }
    }, this);

    if (deadPlayers >= this.owner.players.numMembers) {
        this.owner.application.scenes.load([new howlkraul.scene.GameOver(this.owner.moneyCounter.score)])
    }
};

/**
 * Clear up resources between rounds.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.GamePlaying.prototype.m_disposeBetweenRound = function () {
    this.owner.enemies.removeMembers(true);
    this.owner.spells.removeMembers(true);
    this.owner.enemyProjectiles.removeMembers(true);
    this.owner.coins.removeMembers(true);
    this.owner.potions.removeMembers(true);
    this.owner.bombs.removeMembers(true);
    this.owner.room.furniture.removeMembers(true);
};