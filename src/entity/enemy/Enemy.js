/**
 * Abstract Enemy class.
 * 
 * @constructor
 * @extends howlkraul.entity.Entity
 * 
 * @param {number} x  - Spawn point on X-axis.
 * @param {number} y  - Spawn point on Y-axis.
 * @param {number} height  - The sprites height.
 * @param {number} width  - The sprites width.
 * @param {string} texture  - the name of the resource.
 * 
 * @class
 * @classdesc
 * 
 * Abstract class reprecenting a Enemy.
 * Inherit from this class to create enemies.
 */
howlkraul.entity.Enemy = function (x, y, width, height, texture) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  howlkraul.entity.Entity.call(this, x, y, width, height, texture);

  //--------------------------------------------------------------------------
  // Overide Properties (BASIC STATS)
  //--------------------------------------------------------------------------

  /**
   * @inheritdoc
   */
  this.hp = 100;

  //--------------------------------------------------------------------------
  // Protected Properties
  //--------------------------------------------------------------------------

  /**
   * The default speed of the enemy.
   */
  this.m_defaultSpeed = 0;

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * The closest player to the enemy
   * 
   * @private
   * @type {howlkraul.entity.Wizard}
   */
  this.m_closestPlayer = null;

  /**
   * The distance to the closest player.
   * 
   * @private
   * @type {number}
   */
  this.m_distanceToClosestPlayer = 0;

  /**
   * Flag to check if enemy is attacking.
   * 
   * @private
   * @type {boolean}
   */
  this.m_isAttacking = false;

  /**
   * Flag to check if enemy is moving horizontal.
   * 
   * @private
   * @type {boolean}
   */
  this.m_horizontalMovement = false;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.Enemy.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Enemy.prototype.constructor = howlkraul.entity.Enemy;

//--------------------------------------------------------------------------
// Getter and setters
//--------------------------------------------------------------------------

/**
 * The default speed of the Enemy.
 * Used to reset between different states. 
 *
 * @member {number} defaultSpeed
 * @memberof howlkraul.entity.Enemy
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Enemy.prototype, "defaultSpeed", {
  /**
   * @this howlkraul.entity.Enemy
   * @ignore
   */
  get: function () {
    return this.m_defaultSpeed;
  },

  /**
   * @this howlkraul.entity.Enemy
   * @ignore
   */
  set: function (value) {
    this.m_defaultSpeed = value;
  }
});

/**
 * Flag checking if enemy is currently attacking.
 *
 * @member {boolean} isAttacking
 * @memberof howlkraul.entity.Enemy
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Enemy.prototype, "isAttacking", {
  /**
   * @this howlkraul.entity.Enemy
   * @ignore
   */
  get: function () {
    return this.m_isAttacking;
  }
});

/**
 * The closest player to the enemy.
 *
 * @member {howlkraul.entity.Wizard} closestPlayer
 * @memberof howlkraul.entity.Enemy
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Enemy.prototype, "closestPlayer", {
  /**
   * @this howlkraul.entity.Enemy
   * @ignore
   */
  get: function () {
    return this.m_closestPlayer;
  }
});

/**
 * The distance to the closest player.
 *
 * @member {number} distanceToClosestPlayer
 * @memberof howlkraul.entity.Enemy
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Enemy.prototype, "distanceToClosestPlayer", {
  /**
   * @this howlkraul.entity.Enemy
   * @ignore
   */
  get: function () {
    return this.m_distanceToClosestPlayer;
  }
});

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.init = function () {
  howlkraul.entity.Entity.prototype.init.call(this);

  this.getClosestPlayer();
  this.initAnimationScripts();
};

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);

  this.getClosestPlayer();
  this.setState();
};

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.dispose = function () {
  this.removeChildren(true);

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

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.moveRight = function () {
  howlkraul.entity.Entity.prototype.moveRight.call(this);

  this.facing = "side";
  this.setRunningAnimation();
}

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.moveLeft = function () {
  howlkraul.entity.Entity.prototype.moveLeft.call(this);

  this.facing = "side";
  this.setRunningAnimation();
}

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.moveUp = function () {
  howlkraul.entity.Entity.prototype.moveUp.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    this.facing = "side";
    this.setRunningAnimation();
    return;
  }

  this.facing = "up";
  this.setRunningAnimation();
}

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.moveDown = function () {
  howlkraul.entity.Entity.prototype.moveDown.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    this.facing = "side";
    this.setRunningAnimation();
    return;
  }

  this.facing = "down";
  this.setRunningAnimation();
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
  console.log("take damage " + "hp: " + this.hp);
  this.hp -= amount;

  if (this.hp <= 0) {
    this.die();
  } else {
    this.playDamageSound();
  }
};

/**
 * Play die animation and drop coin.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.die = function () {
  this.playDeathSound();
  this.dropCoin();
  this.application.scenes.selected.enemies.explode(this);
  this.application.scenes.selected.enemies.removeMember(this, true);
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
 * @returns {howlkraul.entity.Wizard}
 */
howlkraul.entity.Enemy.prototype.getClosestPlayer = function () {
  var players = this.application.scenes.selected.players;

  if (players.numMembers === 0) return;

  var m_this = this;

  // Filter out dead players
  var allPlayers = players.getMembers().filter(function (player) {
    return player.hp > 0;
  });

  if (!allPlayers.length) return;

  // Sort by the closest player
  allPlayers.sort(function (a, b) {
    return m_this.distance(a) - m_this.distance(b);
  });

  var distance = rune.util.Math.distance(this.centerX, this.centerY, allPlayers[0].centerX, allPlayers[0].centerY)
  this.m_distanceToClosestPlayer = Math.round(distance);
  this.m_closestPlayer = allPlayers[0];
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
howlkraul.entity.Enemy.prototype.setRunningAnimation = function () {
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