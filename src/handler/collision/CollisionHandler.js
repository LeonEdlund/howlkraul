/**
 * Creates a new instance of CollisionHandler.
 *
 * @constructor
 * 
 * @param {rune.display.Scene} game - reference to the active scene.
 * 
 * @class
 * @classdesc
 *
 * Represents a class that handles collisions.
 */
howlkraul.handler.CollisionHandler = function (game) {
  //--------------------------------------------------------------------------
  // Private Methods
  //--------------------------------------------------------------------------

  /**
   * reference to the active scene.
   * 
   * @private
   * @type {rune.display.Scene}
   */
  this.game = game;
}

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Gets called every frame.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.update = function () {
  this.m_handleBorderCollision();

  if (this.game.potions.numMembers > 0) {
    this.m_handlePotionPickup();
  }

  if (this.game.enemies.numMembers > 0) {
    this.m_handleDamageHit();

    if (this.game.enemyProjectiles.numMembers > 0) {
      this.m_handleEnemyProjectileHit();
    }
  }

  this.m_checkForRevive();
};

/**
 * Cleans up resources.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.dispose = function () {
  this.game = null;
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Handles all collisions with walls.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_handleBorderCollision = function () {
  // Set hidden walls
  this.game.room.walls.hitTestAndSeparateGroup(this.game.players);
  this.game.room.walls.hitTestAndSeparateGroup(this.game.enemies);
  this.game.room.walls.hitTestAndSeparateGroup(this.game.room.furniture);

  // remove player projectiles when hiting borders
  this.game.room.walls.hitTestGroup(this.game.spells, function (border, spell) {
    // Stop spell from being removed when beeing at the top of the room
    if ((spell.castedBy.facing === "right" || spell.castedBy.facing === "left") && border.center.x === 200) {
      return;
    }

    this.game.spells.removeMember(spell, true);
  }, this);

  // remove enemy projectiles when hiting borders
  this.game.room.walls.hitTestGroup(this.game.enemyProjectiles, function (border, projectile) {
    this.game.enemyProjectiles.removeMember(projectile, true);
  }, this);
}

/**
 * Handles player getting hit by enemy.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_handleDamageHit = function () {
  this.game.players.hitTestGroup(this.game.enemies, function (player, enemy) {
    player.takeDamage(enemy);
  }, this);
}

/**
 * Handles player getting hit by projectiles.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_handleEnemyProjectileHit = function () {
  this.game.players.hitTestGroup(this.game.enemyProjectiles, function (player, projectile) {
    if (player.hp === 0) return;

    player.takeDamage(projectile);
    this.game.enemyProjectiles.removeMember(projectile, true);
    this.game.cameras.getCameraAt(0).shake.start(300, 1, 1);
  }, this);
}

/**
 * Handles player picking up potions.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_handlePotionPickup = function () {
  this.game.players.hitTestGroup(this.game.potions, function (player, potion) {
    potion.playSound();
    player.regenHealth(potion.healingPower);
    this.game.potions.removeMember(potion, true);
  }, this);
}

/**
 * Handles player reviwing
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_checkForRevive = function () {
  this.game.players.hitTestGroup(this.game.players, function (alivePlayer, deadPlayer) {
    if (deadPlayer.isDead && alivePlayer.isReviving) {
      alivePlayer.takeDamage();
      deadPlayer.raiseFromDead();
    }
  }, this);
}