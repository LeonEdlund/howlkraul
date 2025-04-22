howlkraul.handler.CollisionHandler = function (game) {
  this.game = game;
}

howlkraul.handler.CollisionHandler.prototype.update = function () {
  this.m_handleBorderCollision();
  this.m_handleEnemySpellHit();
  this.m_handleCoinPickup();
  this.m_handleDamageHit()
  this.m_handleEnemyProjectileHit()
};

howlkraul.handler.CollisionHandler.prototype.m_handleBorderCollision = function () {
  // Set hidden walls
  this.game.borders.hitTestAndSeparateGroup(this.game.players);
  this.game.borders.hitTestAndSeparateGroup(this.game.enemies);
  this.game.enemies.hitTestAndSeparateGroup(this.game.enemies);

  // remove player projectiles when hiting borders
  this.game.borders.hitTestGroup(this.game.spells, function (border, spell) {
    // Stop spell from being removed when beeing at the top of the room
    if ((spell.castedBy.facing === "right" || spell.castedBy.facing === "left") && border.center.x === 200) {
      return;
    }

    this.game.removeProjectile(this.game.spells, spell);
  }, this);

  // remove enemy projectiles when hiting borders
  this.game.borders.hitTestGroup(this.game.enemyProjectiles, function (border, projectile) {
    this.game.removeProjectile(this.game.enemyProjectiles, projectile);
  }, this);
}

// ENEMY HIT BY SPELL
howlkraul.handler.CollisionHandler.prototype.m_handleEnemySpellHit = function () {
  var deadEnemies = [];
  var m_this = this;

  this.game.enemies.hitTestAndSeparateGroup(this.game.spells, function (enemy, spell) {
    enemy.takeDamage(spell.castedBy.power);
    this.game.removeProjectile(this.game.spells, spell);

    this.game.cameras.getCameraAt(0).shake.start(300, 1, 1);
    this.game.gamepads.get(0).vibrate(500);

    if (enemy.hp <= 0) {
      deadEnemies.push(enemy);
    }
  }, this);

  deadEnemies.forEach(function (enemy) {
    m_this.game.enemies.removeMember(enemy, true);
  });
}

howlkraul.handler.CollisionHandler.prototype.m_handleEnemyProjectileHit = function () {
  this.game.players.hitTestGroup(this.game.enemyProjectiles, function (player, projectile) {
    player.takeDamage(projectile.castedBy.power);
    this.game.removeProjectile(this.game.enemyProjectiles, projectile);
    this.game.cameras.getCameraAt(0).shake.start(300, 1, 1);
    this.game.gamepads.get(0).vibrate(500);
  }, this);
}

howlkraul.handler.CollisionHandler.prototype.m_handleCoinPickup = function () {
  this.game.players.hitTestGroup(this.game.coins, function (player, coin) {
    this.game.addToMoneyCounter(coin.worth);
    this.game.coins.removeMember(coin, true);
  }, this);
}

howlkraul.handler.CollisionHandler.prototype.m_handleDamageHit = function () {
  this.game.players.hitTestGroup(this.game.enemies, function (player, enemy) {
    player.takeDamage();
  }, this);
}