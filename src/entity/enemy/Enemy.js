howlkraul.entity.Enemy = function (x, y, width, height, texture, particles) {
  howlkraul.entity.Entity.call(this, x, y, width, height, texture);

  this.hp = 100;

  this.m_bloodEmitter = null;
  this.m_bodypartEmitter = null;
  this.m_horizontalMovement = false;
  this.m_particles = particles;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.entity.Enemy.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Enemy.prototype.constructor = howlkraul.entity.Enemy;

//--------------------------------------------------------------------------
// Overide
//--------------------------------------------------------------------------

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.init = function () {
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

  console.log(this.hp)
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