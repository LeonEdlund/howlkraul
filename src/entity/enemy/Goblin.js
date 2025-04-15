howlkraul.entity.Goblin = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 29, 29, "goblin_29x29");

  this.hp = 100;
  this.facing = "down";

  this.m_lastShot = 0;
  this.m_shootCooldown = 2000;
}

howlkraul.entity.Goblin.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Goblin.prototype.constructor = howlkraul.entity.Goblin;

/**
 * @override
 */
howlkraul.entity.Goblin.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.setVelocity(0.1, 1);
  this.m_initAnimation();
  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
};

/**
 * @override
 */
howlkraul.entity.Goblin.prototype.update = function (step) {
  howlkraul.entity.Enemy.prototype.update.call(this, step);
};

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Goblin.prototype.m_initAnimation = function () {
  this.animation.create("r", [1, 2, 3, 4, 5, 6], 10, true);
  this.animation.create("r-side", [10, 11, 12, 13], 10, true);
  this.animation.create("r-up", [18, 19, 20, 21, 22, 23], 10, true);
  this.animation.create("s", [7, 8, 9], 10, true);
  this.animation.create("s-side", [14, 15, 16], 10, true);
  this.animation.create("s-up", [24, 25, 26], 10, true);
  this.animation.create("dead", [10], 0, false);
  this.flippedX = true;
};

/**
 * Take damage and lower hp. 
 * If hp is lower then 0 die.
 * 
 * @protected
 * @returns {undefined}
 */
// howlkraul.entity.Goblin.prototype.m_initDeathEmiter = function () {

// };

howlkraul.entity.Goblin.prototype.moveRight = function () {
  howlkraul.entity.Enemy.prototype.moveRight.call(this);
  this.animation.gotoAndPlay("r-side");
}

howlkraul.entity.Goblin.prototype.moveLeft = function () {
  howlkraul.entity.Enemy.prototype.moveLeft.call(this);

  this.animation.gotoAndPlay("r-side");
}

howlkraul.entity.Goblin.prototype.moveUp = function () {
  howlkraul.entity.Enemy.prototype.moveUp.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    this.animation.gotoAndPlay("r-side");
  } else {
    this.animation.gotoAndPlay("r-up");
  }
}

howlkraul.entity.Goblin.prototype.moveDown = function () {
  howlkraul.entity.Enemy.prototype.moveDown.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    //this.animation.gotoAndPlay("r");
  } else {
    this.animation.gotoAndPlay("r");
  }
}

howlkraul.entity.Goblin.prototype.followPlayers = function (players) {
  var closestPlayer = players.getMembersCloseTo(this)[0];
  var distance = Math.round(this.distance(closestPlayer.center));

  if (distance > 150) {

    howlkraul.entity.Enemy.prototype.followPlayers.call(this, players);
    this.allowMovement = true;


  } else if (distance <= 150 && distance >= 140) {

    this.shoot(closestPlayer);
    // this.allowMovement = false;

  } else {
    this.allowMovement = true;
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
  }
};

// howlkraul.entity.Goblin.prototype.roam = function () {
//   var directions = [
//     this.moveUp.bind(this),
//     this.moveDown.bind(this),
//     this.moveLeft.bind(this),
//     this.moveRight.bind(this),
//   ]

//   var i = rune.util.Math.randomInt(0, directions.length - 1);
//   directions[i]();
// }

howlkraul.entity.Goblin.prototype.shoot = function (player) {
  var scene = this.application.scenes.selected;
  var now = Date.now();

  if (now > this.m_lastShot) {
    var x = this.flippedX ? this.x - 12 : this.x + 12;
    var y = this.flippedX ? this.y + 5 : this.y + 10;

    var arrow = new howlkraul.projectile.Arrow(x, y, this);

    arrow.shootAtPoint(player.center, scene.enemyProjectiles);
    this.m_lastShot = now + this.m_shootCooldown;
  }
}

/**
 * Play die animation and drop coin.
 *
 * @public
 * @returns {undefined}
 */
// howlkraul.entity.Goblin.prototype.explode = function () {
//   console.log("EXPLODE IN GOBLIN ")
//   howlkraul.entity.Enemy.prototype.moveDown.call(this);
// };
