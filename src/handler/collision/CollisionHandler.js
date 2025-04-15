howlkraul.handler.CollisionHandler = function (game) {
  this.game = game;
}

howlkraul.handler.CollisionHandler.prototype.update = function () {
  this.m_handleBorderCollision();
  this.m_handleEnemySpellHit();
  this.m_handleCoinPickup();
  this.m_handleDamageHit()
};

howlkraul.handler.CollisionHandler.prototype.m_handleBorderCollision = function () {
  this.game.borders.hitTestAndSeparate(this.game.players);
  this.game.borders.hitTestAndSeparate(this.game.enemies);
  this.game.enemies.hitTestAndSeparate(this.game.enemies);

  this.game.borders.hitTest(this.game.spells, function (border, spell) {
    this.game.removeSpell(spell);
    this.game.gamepads.get(0).vibrate(500);
  }, this);
}

howlkraul.handler.CollisionHandler.prototype.m_handleEnemySpellHit = function () {
  this.game.enemies.hitTestAndSeparate(this.game.spells, function (enemy, spell) {
    enemy.takeDamage(spell.castedBy.power);
    this.game.removeSpell(spell);
    this.game.cameras.getCameraAt(0).shake.start(300, 1, 1);
    this.game.gamepads.get(0).vibrate(500);

    if (enemy.hp <= 0) {
      this.game.timers.create({
        duration: 500,
        onComplete: enemy.dispose,
        scope: enemy
      }, true);
    }
    return true;
  }, this);
}

howlkraul.handler.CollisionHandler.prototype.m_handleCoinPickup = function () {
  this.game.players.hitTest(this.game.coins, function (player, coin) {
    this.game.addToMoneyCounter(coin.worth);
    this.game.coins.removeMember(coin);
    coin.dispose();
  }, this);
}

howlkraul.handler.CollisionHandler.prototype.m_handleDamageHit = function () {
  this.game.players.hitTest(this.game.enemies, function (player, enemy) {
    player.takeDamage();
  }, this);
}