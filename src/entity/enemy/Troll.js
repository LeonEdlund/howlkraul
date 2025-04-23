howlkraul.entity.Troll = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 29, 29, "troll_29x29");
  this.hp = 100;
}

howlkraul.entity.Troll.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Troll.prototype.constructor = howlkraul.entity.Troll;

/**
 * @override
 */
howlkraul.entity.Troll.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.setVelocity(0.1, 0.4);
  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
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

  // SHOOTING
  this.animation.create("s", [7, 8], 10, false);
  this.animation.create("s-side", [17, 18], 10, false);
  this.animation.create("s-up", [26, 27], 10, false);

  this.animation.create("dead", [10], 0, false);

};

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Troll.prototype.m_setRunningAnimation = function () {
  // var now = Date.now();

  // if (now < this.m_lastShotAnimation) return;

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

howlkraul.entity.Troll.prototype.followPlayers = function () {
  howlkraul.entity.Enemy.prototype.followPlayers.call(this);

  var players = this.application.scenes.selected.players;
  var closestPlayer = this.getClosestPlayer(players);
  if (!closestPlayer) return;

  var distance = Math.round(this.distance(closestPlayer.center));

  if (distance < 160) {
    this.states.select("FollowPlayer");
  } else {
    this.states.select("Roam");
  }

  //this.attack(closestPlayer);
};