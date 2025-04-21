howlkraul.entity.Enemy = function (x, y, width, height, texture, particles) {
  howlkraul.entity.Entity.call(this, x, y, width, height, texture);

  // Default stats
  this.hp = 100;

  // Emitters and particles
  this.m_bloodEmitter = null;
  this.m_bodypartEmitter = null;
  this.m_particles = particles;

  // Flags 
  this.m_horizontalMovement = false;
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
howlkraul.entity.Enemy.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);
  this.m_moveEmittersWithCharacter();
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

  if (!horizontal) {
    this.m_setRunningAnimation();
  }
}

//--------------------------------------------------------------------------
// Public Methods (API)
//--------------------------------------------------------------------------

/**
 * Follow the players in the display group. 
 * 
 * @public
 * @param {rune.display.DisplayGroup} players - The display group with the players to follow.
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.followPlayers = function (players) {
  var closestPlayer = this.m_getClosestPlayer(players);
  if (!closestPlayer) return;

  var tX = this.centerX;
  var tY = this.centerY;
  var pX = closestPlayer.centerX;
  var pY = closestPlayer.centerY;
  var distance = this.distance(closestPlayer.center);

  var distanceX = rune.util.Math.abs(tX - pX);
  var distanceY = rune.util.Math.abs(tY - pY);

  if (distance < 20) {
    this.allowMovement = false;
    return;
  } else {
    this.allowMovement = true;
  }

  if (distanceX > distanceY * 2) {

    if (tX > pX) {
      this.moveLeft();
    } else if (tX < pX) {
      this.moveRight();
    }

    this.velocity.y = 0;

  } else if (distanceY > distanceX * 2) {

    if (tY > pY) {
      this.moveUp();
    } else if (tY < pY) {
      this.moveDown();
    }

    this.velocity.x = 0;
  } else {

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
  }
};

howlkraul.entity.Enemy.prototype.runAwayFromPlayer = function (player) {
  var closestPlayer = player;

  var tX = this.centerX;
  var tY = this.centerY;
  var pX = closestPlayer.centerX;
  var pY = closestPlayer.centerY;

  var distanceX = rune.util.Math.abs(tX - pX);
  var distanceY = rune.util.Math.abs(tY - pY);
  if (distanceX > distanceY * 2) {

    if (tX < pX) {
      this.moveLeft();
    } else if (tX > pX) {
      this.moveRight();
    }

    this.velocity.y = 0;

  } else if (distanceY > distanceX * 2) {

    if (tY < pY) {
      this.moveUp();
    } else if (tY > pY) {
      this.moveDown();
    }

    this.velocity.x = 0;
  } else {

    if (tX < pX) {
      this.moveLeft();
    } else if (tX > pX) {
      this.moveRight();
    }

    if (tY < pY) {
      this.moveUp();
    } else if (tY > pY) {
      this.moveDown();
    }
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
  this.application.scenes.selected.addCoin(coin);
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

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Gets the closest player
 * 
 * @protected
 * @returns {howlkraul.entity.PlayableCharacter}
 */
howlkraul.entity.Enemy.prototype.m_getClosestPlayer = function (players) {
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

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.m_initBloodEmitter = function () {
  this.m_bloodEmitter = new rune.particle.Emitter(this.x, this.y, 50, 50, {
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
 * Attack player.
 * Overide in sub class to specific logic for attacking.
 * 
 * @public
 * @returns {undefined}
*/
howlkraul.entity.Enemy.prototype.attack = function () {
  // OVERIDE IN CHILD CLASS
};