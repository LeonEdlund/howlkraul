howlkraul.entity.Enemy = function (x, y, width, height, texture) {
  howlkraul.entity.Entity.call(this, x, y, width, height, texture);

  this.hp = 100;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.entity.Enemy.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Enemy.prototype.constructor = howlkraul.entity.Enemy;

/**
 * Follow the players in the display group. 
 * 
 * @public
 * @param {rune.display.DisplayGroup} players - The display group with the players to follow.
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.followPlayers = function (players) {
  var closestPlayer = players.getMembersCloseTo(this)[0];

  var tX = this.centerX;
  var tY = this.centerY;
  var pX = closestPlayer.centerX;
  var pY = closestPlayer.centerY;

  if (tX > pX) {
    this.moveLeft();
  } else if (tX < pX) {
    this.moveRight();
  }

  if (tY > pY) {
    this.moveUp();
  } else if (tY < pY) {
    this.moveDown();
  }
};

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @public
 * @param {number} amount - Amount of damage. 
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.takeDamage = function (amount) {
  this.hp -= amount;

  if (this.hp <= 0) {
    this.die();
  }
};

/**
 * Play die animation and drop coin.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.die = function () {
  this.animation.gotoAndPlay("dead");
  this.y += 10;
  this.rotation = -90;
  this.allowCollisions = rune.physics.Space.NONE;
  this.dropCoin();
};

/**
 * Drops a coin. 
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.dropCoin = function () {
  var coin = new rune.display.Graphic(this.centerX, this.centerY, 10, 10);
  coin.backgroundColor = "gold";
  coin.hitbox.set(0, 0, coin.width, coin.height);
  this.application.scenes.selected.addCoin(coin);
};

howlkraul.entity.Enemy.prototype.m_stop = function () {
  this.velocity.x = 0;
  this.velocity.y = 0;
};