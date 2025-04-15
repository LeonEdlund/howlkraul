howlkraul.entity.Enemy = function (x, y, width, height, texture) {
  howlkraul.entity.Entity.call(this, x, y, width, height, texture);

  this.hp = 100;
  this.m_deathEmiter = null;
  this.m_horizontalMovement = false;
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
  this.m_initDeathEmiter();
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
  this.m_moveEmitterWithCharacter();
};


/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.m_initDeathEmiter = function () {
  //OVERRIDE IN CHILD CLASS

  console.log(howlkraul.particle.Blood);
  this.m_deathEmiter = new rune.particle.Emitter(this.x, this.y, 50, 50, {
    capacity: 92,
    accelerationY: 0.05,
    maxVelocityX: 1.25,
    minVelocityX: -1.25,
    maxVelocityY: -1.25,
    minVelocityY: -0.85,
    minRotation: -2,
    maxRotation: 2,
    particles: [howlkraul.particle.Blood]
  });

  this.stage.addChild(this.m_deathEmiter)
};

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Enemy.prototype.m_moveEmitterWithCharacter = function () {
  //console.log(this.m_deathEmiter.x);
  this.m_deathEmiter.moveTo(this.x, this.y);
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

  if (this.hp <= 0) {
    this.die();
  }

  this.flicker.start(200);
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
  // var coin = new rune.display.Graphic(this.centerX, this.centerY, 10, 10);
  // coin.backgroundColor = "gold";
  // coin.hitbox.set(0, 0, coin.width, coin.height);

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
  console.log(this.m_deathEmiter)
  this.m_deathEmiter.emit(50);
};