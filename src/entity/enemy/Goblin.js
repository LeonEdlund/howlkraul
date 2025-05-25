/**
 * Creates a new Goblin object
 * 
 * @constructor
 * @extends howlkraul.entity.Enemy
 * 
 * @param {number} x  - Spawn point on X-axis.
 * @param {number} y  - Spawn point on Y-axis.
 * 
 * @class
 * @classdesc
 * 
 * Creates an instance of a Goblin enemy.
 */
howlkraul.entity.Goblin = function (x, y) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  howlkraul.entity.Enemy.call(this, x, y, 29, 29, "goblin_29x29");

  //--------------------------------------------------------------------------
  // Overide properties
  //--------------------------------------------------------------------------

  /**
   * @inheritdoc
   */
  this.hp = 100;

  /**
   * @inheritdoc
   */
  this.speed = rune.util.Math.random(0.4, 0.5);

  /**
   * @inheritdoc
   */
  this.defaultSpeed = this.speed;

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * When the goblin last shot in ms.
   * 
   * @private
   * @type {number}
   */
  this.m_lastShot = Date.now() + rune.util.Math.randomInt(1500, 2500);

  /**
   * Flag for setting the shooting animation.
   * 
   * @private
   * @type {number}
   */
  this.m_lastShotAnimation = 0;

  /**
   * Time between shots.
   * 
   * @private
   * @type {number}
   */
  this.m_shootCooldown = rune.util.Math.randomInt(2000, 4000);
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.Goblin.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Goblin.prototype.constructor = howlkraul.entity.Goblin;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Goblin.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
};

//--------------------------------------------------------------------------
// Overide Protected Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
*/
howlkraul.entity.Goblin.prototype.initAnimations = function () {
  // IDLE
  this.animation.create("idle", [0], 0, false);

  // RUNNING
  this.animation.create("r", [1, 2, 3, 4, 5, 6], 10, true);
  this.animation.create("r-side", [10, 11, 12, 13], 10, true);
  this.animation.create("r-up", [18, 19, 20, 21, 22, 23], 10, true);

  // SHOOTING
  this.animation.create("s", [7, 8, 9], 10, false);
  this.animation.create("s-side", [14, 15, 16], 10, false);
  this.animation.create("s-up", [24, 25, 26], 10, false);
  this.animation.create("dead", [10], 0, false);

  this.flippedX = true;
};

/**
 * @inheritdoc
*/
howlkraul.entity.Goblin.prototype.initSounds = function () {
  this.damageSounds.push(
    "sfx_goblin_hit1",
    "sfx_goblin_hit2",
    "sfx_goblin_hit3",
    "sfx_goblin_hit4"
  );

  this.deathSounds.push(
    "sfx_goblin_death1",
    "sfx_goblin_death2",
    "sfx_goblin_death3",
    "sfx_goblin_death4"
  );
};

/**
 * @inheritdoc
 */
howlkraul.entity.Goblin.prototype.setState = function () {
  if (!this.closestPlayer) return;

  if (this.distanceToClosestPlayer < 110 && this.distanceToClosestPlayer > 70) {
    this.states.select("RunAway");
    this.attack(this.closestPlayer);
    return;
  } else if (this.distanceToClocestPlayer > 120) {
    this.states.select("Roam");
  } else if (this.distanceToClosestPlayer < 70 && this.distanceToClosestPlayer > 50) {
    this.states.select("FollowPlayer");
  } else {
    this.states.select("Roam");
  }

  this.attack(this.closestPlayer);
};

/**
 * @inheritdoc
 */
howlkraul.entity.Goblin.prototype.attack = function (player) {
  var scene = this.application.scenes.selected;
  var now = Date.now();

  if (now > this.m_lastShot) {
    var x = this.flippedX ? this.x - 12 : this.x + 12;
    var y = this.flippedX ? this.y + 5 : this.y + 10;

    var arrow = new howlkraul.projectile.Arrow(x, y);

    this.m_setShootingAnimation();
    arrow.shootAtPoint(player.hitbox.center, scene.enemyProjectiles);
    this.m_lastShot = now + this.m_shootCooldown;
  }
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Sets the correct shooting animation.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Goblin.prototype.m_setShootingAnimation = function () {
  var now = Date.now();
  this.m_lastShotAnimation = now + 300;

  switch (this.facing) {
    case "up":
      this.animation.goto("s-up", [0]);
      this.animation.play();
      break;
    case "side":
      this.animation.goto("s-side", [0]);
      this.animation.play();
      break;
    case "down":
      this.animation.goto("s", [0]);
      this.animation.play();
      break;
  }
};

/**
 * @inheritdoc
*/
howlkraul.entity.Goblin.prototype.setRunningAnimation = function () {
  var now = Date.now();
  if (now < this.m_lastShotAnimation) return;


  switch (this.facing) {
    case "up":
      this.animation.gotoAndPlay("r-up");
      break;
    case "side":
      this.animation.gotoAndPlay("r-side");
      break;
    case "down":
      this.animation.gotoAndPlay("r");
      break;
  }
};