/**
 * 
 * 
 * @class
 * @classdesc - creates an instance of CollisionHandler.
 * 
 * @param {rune.display.scene} game 
 */
howlkraul.handler.CollisionHandler = function (game) {
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

  if (this.game.spells.numMembers > 0) {
    this.m_handleEnemySpellHit();
  }


  if (this.game.coins.numMembers > 0) {
    this.m_handleCoinPickup();
  }

  if (this.game.potions.numMembers > 0) {
    this.m_handlePotionPickup();
  }


  if (this.game.enemies.numMembers > 0) {
    this.m_handleDamageHit();

    if (this.game.enemyProjectiles.numMembers > 0) {
      this.m_handleEnemyProjectileHit();
    }
  }
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

    this.game.spells.removeMember(spell);
  }, this);

  // remove enemy projectiles when hiting borders
  this.game.room.walls.hitTestGroup(this.game.enemyProjectiles, function (border, projectile) {
    this.game.enemyProjectiles.removeMember(projectile);
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
    player.takeDamage();
  }, this);
}

/**
 * Handles enemies getting hit by projectiles.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_handleEnemySpellHit = function () {
  var m_this = this;
  var enemiesToRemove = [];

  this.game.enemies.hitTestAndSeparateGroup(this.game.spells, function (enemy, spell) {
    enemy.takeDamage(spell.castedBy.power);
    this.game.spells.removeMember(spell);

    this.game.cameras.getCameraAt(0).shake.start(300, 1, 1);
    this.game.gamepads.get(0).vibrate(100, 0.3, 0.6);

    if (enemy.hp <= 0) {
      enemiesToRemove.push(enemy);
    }
  }, this);

  if (enemiesToRemove.length > 0) {
    enemiesToRemove.forEach(function (enemy) {
      m_this.game.enemies.removeMember(enemy, true);
    });
  }
}

/**
 * Handles player getting hit by projectiles.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_handleEnemyProjectileHit = function () {
  this.game.players.hitTestGroup(this.game.enemyProjectiles, function (player, projectile) {
    player.takeDamage(projectile.castedBy.power);
    this.game.enemyProjectiles.removeMember(projectile);
    this.game.cameras.getCameraAt(0).shake.start(300, 1, 1);
    this.game.gamepads.get(0).vibrate(500);
  }, this);
}

/**
 * Handles player picking up coin.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.handler.CollisionHandler.prototype.m_handleCoinPickup = function () {
  this.game.players.hitTestGroup(this.game.coins, function (player, coin) {
    this.game.addToMoneyCounter(coin.worth);
    this.game.coins.removeMember(coin, true);
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
    player.hp += potion.healingPower;
    this.game.potions.removeMember(potion, true);
  }, this);
}