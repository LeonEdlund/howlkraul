howlkraul.handler.CollisionHandler = function (game) {
  this.game = game;
}

howlkraul.handler.CollisionHandler.prototype.update = function () {
  this.m_handleEnemySpellHit();
  this.m_handleCoinPickup();
  this.m_handleDamageHit();
  this.m_handleEnemyProjectileHit();
  this.m_handleFurnitureHit();
};

// ENEMY HIT BY SPELL
howlkraul.handler.CollisionHandler.prototype.m_handleEnemySpellHit = function () {
  var deadEnemies = [];
  var m_this = this;

  this.game.enemies.hitTestAndSeparateGroup(this.game.spells, function (enemy, spell) {
    enemy.takeDamage(spell.castedBy.power);
    this.game.spells.removeMember(spell);

    this.game.cameras.getCameraAt(0).shake.start(300, 1, 1);
    this.game.gamepads.get(0).vibrate(100, 0.3, 0.6);

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
    this.game.enemyProjectiles.removeMember(projectile);
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

howlkraul.handler.CollisionHandler.prototype.m_handleFurnitureHit = function () {
  this.game.furniture.hitTestAndSeparateGroup(this.game.players, function (player, furniture) {
    //player.takeDamage();
  }, this);
}