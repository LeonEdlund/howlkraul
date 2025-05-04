howlkraul.entity.Enemy = function (x, y, width, height, texture, particles) {
  howlkraul.entity.Entity.call(this, x, y, width, height, texture);

  /**
   * Character health.
   * 
   * @protected
   */
  this.hp = 100;

  // Emitters and particles
  this.m_bloodEmitter = null;
  this.m_bodypartEmitter = null;
  this.m_particles = particles;

  // Flags 
  this.m_horizontalMovement = false;

  // STATS 
  this.m_potionDropChance = 10;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.entity.Enemy.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Enemy.prototype.constructor = howlkraul.entity.Enemy;

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

  this.m_initEmitters();
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
  this.m_moveEmittersWithCharacter();
  this.followPlayers();
};

howlkraul.entity.Enemy.prototype.dispose = function () {
  howlkraul.entity.Entity.prototype.dispose.call(this);
  this.m_bloodEmitter = null;
  this.m_bodypartEmitter = null;
  this.m_particles = null;
};

//--------------------------------------------------------------------------
// Overide Entity Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Enemy.prototype.initStates = function () {
  howlkraul.entity.Entity.prototype.initStates.call(this);
  console.log(this.states)
  this.states.load([
    new howlkraul.entity.FollowPlayerState(),
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
  if (this.hp <= 0) this.die();
};

/**
 * Play die animation and drop coin.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.die = function () {
  this.dropCoin();
  // if (rune.util.Math.chance(m_potionDropChance)) {
  //   //this.dropPotion();
  // }
  this.explode();
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
 * Drops a healtPotion. 
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.dropPotion = function () {
  var potion = new howlkraul.drops.hpPotion(this.x, this.y);
  this.application.scenes.selected.drops.addMember(coin);
};

/**
 * Play die animation and drop coin.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.explode = function () {
  this.m_bloodEmitter.emit(50);

  if (this.m_bodypartEmitter) {
    this.m_bodypartEmitter.emit(1);
  }
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
// Private Methods
//--------------------------------------------------------------------------

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.m_initEmitters = function () {
  this.m_initBloodEmitter();

  if (this.m_particles && this.m_particles.length > 0) {
    this.m_initBodypartEmitter();
  }
};

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.m_initBloodEmitter = function () {
  this.m_bloodEmitter = new rune.particle.Emitter(this.x, this.y, 15, 15, {
    capacity: 92,
    accelerationY: 0.05,
    maxVelocityX: 1.25,
    minVelocityX: -1.25,
    maxVelocityY: -1.25,
    minVelocityY: -0.85,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 300,
    maxLifespan: 1000,
    particles: [howlkraul.particle.Blood]
  });

  this.stage.addChild(this.m_bloodEmitter)
};

howlkraul.entity.Enemy.prototype.m_initBodypartEmitter = function () {
  this.m_bodypartEmitter = new rune.particle.Emitter(this.x, this.y, 50, 50, {
    capacity: 4,
    accelerationY: 0.05,
    maxVelocityX: 1.25,
    minVelocityX: -1.25,
    maxVelocityY: -1.25,
    minVelocityY: -0.85,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 300,
    maxLifespan: 1000,
    particles: this.m_particles
  });

  this.stage.addChild(this.m_bodypartEmitter)
};

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.m_moveEmittersWithCharacter = function () {
  this.m_bloodEmitter.moveTo(this.x, this.y);

  if (this.m_bodypartEmitter) {
    this.m_bodypartEmitter.moveTo(this.x, this.y);
  }
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
howlkraul.entity.Enemy.prototype.followPlayers = function () {
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