howlkraul.entity.Troll = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 29, 29, "troll_29x29");
  this.hp = 150;
  this.speed = rune.util.Math.random(0.3, 0.4);
  this.defaultSpeed = this.speed;
  this.m_lastAttack = 0;
  this.m_attackCoolDown = 500;
  this.m_isAttacking = false;
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
 * @override
 */
howlkraul.entity.Troll.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
};

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

howlkraul.entity.Troll.prototype.attack = function () {
  var now = Date.now();

  if (now > this.m_lastAttack) {
    this.m_isAttacking = true;
    this.states.select("Attack");
    this.m_lastAttack = now + this.m_attackCoolDown;
  }
};

/**
 * @override
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
 * @override
 */
howlkraul.entity.Troll.prototype.initAnimationScripts = function () {
  var shootingDown = this.animation.find("s");
  var shootingSide = this.animation.find("s-side");
  var shootingUp = this.animation.find("s-up");

  shootingDown.scripts.add(5, function () { this.m_isAttacking = false; }, this);
  shootingSide.scripts.add(3, function () { this.m_isAttacking = false; }, this);
  shootingUp.scripts.add(1, function () { this.m_isAttacking = false; }, this);
};

/**
 * @inheritdoc
 */
howlkraul.entity.Troll.prototype.m_setRunningAnimation = function () {
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
  if (this.m_isAttacking || !this.closestPlayer) return;

  if (this.distanceToClosestPlayer < 12) {
    if (this.facing === "down") this.moveTo(this.x, (this.y + 1));
    if (!this.m_isAttacking) this.attack();
  } else if (this.distanceToClosestPlayer < 160) {
    this.states.select("FollowPlayer");
  } else {
    this.states.select("Roam");
  }
};

