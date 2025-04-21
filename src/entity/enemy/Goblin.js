howlkraul.entity.Goblin = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 29, 29, "goblin_29x29", [
    howlkraul.particle.GoblinHead,
    howlkraul.particle.GoblinChunk,
  ]);

  this.m_lastShot = 0;
  this.m_shootCooldown = 2000;
  this.m_lastShotAnimation = 0;
}

howlkraul.entity.Goblin.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Goblin.prototype.constructor = howlkraul.entity.Goblin;

//--------------------------------------------------------------------------
// Overide Rune methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.Goblin.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.setVelocity(0.1, 1);
  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
};

/**
 * @override
 */
howlkraul.entity.Goblin.prototype.update = function (step) {
  howlkraul.entity.Enemy.prototype.update.call(this, step);
};

/**
 * @override
 */
howlkraul.entity.Goblin.prototype.dispose = function () {
  howlkraul.entity.Enemy.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Overide Protected Methods
//--------------------------------------------------------------------------

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
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

howlkraul.entity.Goblin.prototype.followPlayers = function (players) {
  var closestPlayer = this.m_getClosestPlayer(players);
  if (!closestPlayer) return;

  var distance = Math.round(this.distance(closestPlayer.center));
  if (distance > 150) {
    howlkraul.entity.Enemy.prototype.followPlayers.call(this, players);
    this.allowMovement = true;
  } else if (distance > 120 && distance < 170) {
    this.velocity.x = 0;
    this.velocity.y = 0;
  } else {
    this.runAwayFromPlayer(closestPlayer);
  }

  this.attack(closestPlayer);
};

howlkraul.entity.Goblin.prototype.attack = function (player) {
  var scene = this.application.scenes.selected;
  var now = Date.now();

  if (now > this.m_lastShot) {
    var x = this.flippedX ? this.x - 12 : this.x + 12;
    var y = this.flippedX ? this.y + 5 : this.y + 10;

    var arrow = new howlkraul.projectile.Arrow(x, y, this);

    this.m_setShootingAnimation();
    arrow.shootAtPoint(player.center, scene.enemyProjectiles);
    this.m_lastShot = now + this.m_shootCooldown;
  }
}

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Goblin.prototype.m_setShootingAnimation = function () {
  var now = Date.now();
  this.m_lastShotAnimation = now + 200;

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
      this.animation.goto("s-down", [0]);
      this.animation.play();
      break;
  }
};

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Goblin.prototype.m_setRunningAnimation = function () {
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