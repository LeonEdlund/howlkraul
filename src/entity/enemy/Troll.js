/**
 * Creates a new Troll object
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
 * Creates an instance of a troll enemy.
 */
howlkraul.entity.Troll = function (x, y) {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  howlkraul.entity.Enemy.call(this, x, y, 29, 29, "troll_29x29");

  //--------------------------------------------------------------------------
  // Overide protected Properties
  //--------------------------------------------------------------------------

  /**
   * @inheritdoc
   */
  this.hp = 150;

  /**
   * @inheritdoc
   */
  this.speed = rune.util.Math.random(0.3, 0.4);

  /**
   * @inheritdoc
   */
  this.defaultSpeed = this.speed;

  /**
   * Time since last attack in ms.
   * 
   * @private
   * @type {number}
   */
  this.m_lastAttack = 0;

  /**
   * Time between attacks
   * 
   * @private
   * @type {number}
   */
  this.m_attackCoolDown = 500;

  /**
   * Array with clothes objects. 
   * 
   * @private
   * @type {array<howlkraul.entity.TrollClothes>}
   */
  this.m_clothes = [];
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.Troll.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Troll.prototype.constructor = howlkraul.entity.Troll;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
  this.initClothes();
};

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.update = function (step) {
  howlkraul.entity.Enemy.prototype.update.call(this, step);

  this.updateClothingAnimation();
};

//--------------------------------------------------------------------------
// Overide Enemy Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.attack = function () {
  var now = Date.now();

  if (now > this.m_lastAttack) {
    this.isAttacking = true;
    this.states.select("Attack");
    this.m_lastAttack = now + this.m_attackCoolDown;
  }
};

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.initAnimations = function () {
  // IDLE
  this.animation.create("idle", [0], 0, false);

  // RUNNING
  this.animation.create("r", [1, 2, 3, 4, 5, 6], 10, true);
  this.animation.create("r-side", [9, 10, 11, 12, 13, 14, 15, 16], 10, true);
  this.animation.create("r-up", [20, 21, 22, 23, 24, 25], 10, true);

  // ATTACKING
  this.animation.create("s", [7, 8, 6, 6, 6, 6], 5, true);
  this.animation.create("s-side", [17, 18, 9, 9], 8, true);
  this.animation.create("s-up", [26, 27], 5, true);
};

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.initSounds = function () {
  this.damageSounds.push(
    "sfx_troll_hit1",
    "sfx_troll_hit2",
    "sfx_troll_hit3"
  );

  this.deathSounds.push(
    "sfx_troll_death1",
    "sfx_troll_death2",
    "sfx_troll_death3",
    "sfx_troll_death4",
    "sfx_troll_death5"
  );
};

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.initAnimationScripts = function () {
  var shootingDown = this.animation.find("s");
  var shootingSide = this.animation.find("s-side");
  var shootingUp = this.animation.find("s-up");

  shootingDown.scripts.add(5, function () { this.isAttacking = false; }, this);
  shootingSide.scripts.add(3, function () { this.isAttacking = false; }, this);
  shootingUp.scripts.add(1, function () { this.isAttacking = false; }, this);
};

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.setRunningAnimation = function () {
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

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.setState = function () {
  if (this.isAttacking || !this.closestPlayer) return;

  if (this.distanceToClosestPlayer < 12) {
    if (this.facing === "down") this.moveTo(this.x, (this.y + 1));
    if (!this.isAttacking) this.attack();
  } else if (this.distanceToClosestPlayer < 160) {
    this.states.select("FollowPlayer");
  } else {
    this.states.select("Roam");
  }
};

//--------------------------------------------------------------------------
// Protected Methods
//--------------------------------------------------------------------------

/**
 * Adds clothes to the troll.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Troll.prototype.initClothes = function () {
  var m_self = this;

  if (rune.util.Math.chance(50)) {
    this.m_clothes.push(new howlkraul.entity.TrollClothes([
      "helmet1_29x29",
      "helmet2_29x29"]));
  }

  if (rune.util.Math.chance(50)) {
    this.m_clothes.push(new howlkraul.entity.TrollClothes(["clothing_29x29"]));
  }

  this.m_clothes.forEach(function (clothing) {
    m_self.addChild(clothing)
  });
};

/**
 * Updates the clothing animation.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Troll.prototype.updateClothingAnimation = function () {
  var m_self = this;

  if (this.m_clothes && this.m_clothes.length > 0) {
    this.m_clothes.forEach(function (clothing) {
      clothing.setAnimation(m_self.animation.current.name);
    });
  }
};

