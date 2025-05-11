howlkraul.entity.Enemy = function (x, y, width, height, texture) {
  howlkraul.entity.Entity.call(this, x, y, width, height, texture);

  /**
   * Character health.
   * 
   * @protected
   */
  this.hp = 100;

  // Flags 
  this.m_horizontalMovement = false;
  this.m_isAttacking = false;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.entity.Enemy.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Enemy.prototype.constructor = howlkraul.entity.Enemy;

//--------------------------------------------------------------------------
// Getter and setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.entity.Enemy.prototype, "isAttacking", {
  get: function () {
    return this.m_isAttacking;
  }
});

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.init = function () {
  howlkraul.entity.Entity.prototype.init.call(this);
  this.initAnimationScripts();
};

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);

  this.setState();
};

howlkraul.entity.Enemy.prototype.dispose = function () {
  howlkraul.entity.Entity.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Overide Entity Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.initStates = function () {
  this.states.load([
    new howlkraul.entity.FollowPlayerState(),
    new howlkraul.entity.Attack(),
    new howlkraul.entity.RunAwayState(),
    new howlkraul.entity.RoamState(),
  ]);
}

howlkraul.entity.Enemy.prototype.moveRight = function () {
  howlkraul.entity.Entity.prototype.moveRight.call(this);
  this.facing = "side";
  this.m_setRunningAnimation();
}

howlkraul.entity.Enemy.prototype.moveLeft = function () {
  howlkraul.entity.Entity.prototype.moveLeft.call(this);

  this.facing = "side";
  this.m_setRunningAnimation();
}

howlkraul.entity.Enemy.prototype.moveUp = function () {
  howlkraul.entity.Entity.prototype.moveUp.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    this.facing = "side";
    this.m_setRunningAnimation();
    return;
  }

  this.facing = "up";
  this.m_setRunningAnimation();
}

howlkraul.entity.Enemy.prototype.moveDown = function () {
  howlkraul.entity.Entity.prototype.moveDown.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    this.facing = "side";
    this.m_setRunningAnimation();
    return;
  }

  this.facing = "down";
  this.m_setRunningAnimation();
}

//--------------------------------------------------------------------------
// Public Methods (API)
//--------------------------------------------------------------------------

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
  } else {
    this.application.scenes.selected.enemies.bleed(this);
  }
};

/**
 * Play die animation and drop coin.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.die = function () {
  this.dropCoin();
  this.application.scenes.selected.enemies.explode(this);
  this.application.scenes.selected.enemies.removeMember(this);
};

/**
 * Drops a coin. 
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.dropCoin = function () {
  var coin = new howlkraul.drops.Coin(this.x, this.y);
  this.application.scenes.selected.coins.addMember(coin);
};

/**
 * Gets the closest player
 * 
 * @public
 * @returns {howlkraul.entity.PlayableCharacter}
 */
howlkraul.entity.Enemy.prototype.getClosestPlayer = function (players) {
  if (players.numMembers === 0) return;

  var m_this = this;

  // Filter out dead players
  var allPlayers = players.getMembers().filter(function (player) {
    return player.hp > 0;
  });

  // Sort by the closest player
  allPlayers.sort(function (a, b) {
    return m_this.distance(a) - m_this.distance(b);
  });

  return allPlayers[0];
};

//--------------------------------------------------------------------------
// Abstract Methods
//--------------------------------------------------------------------------

/**
 * Sets the running animation.
 * Overide in sub class to set specific animations.
 * 
 * @protected
 * @returns {undefined}
*/
howlkraul.entity.Enemy.prototype.m_setRunningAnimation = function () {
  // OVERIDE IN CHILD CLASS
};

/**
 * Sets the running animation.
 * Overide in sub class to set specific movement behaviors.
 * 
 * @protected
 * @returns {undefined}
*/
howlkraul.entity.Enemy.prototype.setState = function () {
  // OVERIDE IN CHILD CLASS
};

/**
 * Attack player.
 * Overide in sub class to specific logic for attacking.
 * 
 * @public
 * @returns {undefined}
*/
howlkraul.entity.Enemy.prototype.attack = function () {
  // OVERIDE IN CHILD CLASS
};

/**
 * Attack player.
 * Overide in sub class to specific logic for attacking.
 * 
 * @public
 * @returns {undefined}
*/
howlkraul.entity.Enemy.prototype.initAnimationScripts = function () {
  // OVERIDE IN CHILD CLASS
};