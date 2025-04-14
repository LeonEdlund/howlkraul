howlkraul.entity.Goblin = function (x, y) {
  howlkraul.entity.Enemy.call(this, x, y, 29, 27, "goblin_29x27");
  this.hp = 100;
}

howlkraul.entity.Goblin.prototype = Object.create(howlkraul.entity.Enemy.prototype);
howlkraul.entity.Goblin.prototype.constructor = howlkraul.entity.Goblin;

/**
 * @override
 */
howlkraul.entity.Goblin.prototype.init = function () {
  howlkraul.entity.Enemy.prototype.init.call(this);

  this.setVelocity(0.1, 0.5);
  this.m_initAnimation();
  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
  //this.hitbox.debug = true;
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

howlkraul.entity.Goblin.prototype.moveRight = function () {
  howlkraul.entity.Entity.prototype.moveRight.call(this);
  this.animation.gotoAndPlay("r-side");
}

howlkraul.entity.Goblin.prototype.moveLeft = function () {
  howlkraul.entity.Entity.prototype.moveLeft.call(this);

  this.animation.gotoAndPlay("r-side");
}

howlkraul.entity.Goblin.prototype.moveUp = function () {
  howlkraul.entity.Entity.prototype.moveUp.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    this.animation.gotoAndPlay("r-side");
  } else {
    this.animation.gotoAndPlay("r-up");
  }
}

howlkraul.entity.Goblin.prototype.moveDown = function () {
  howlkraul.entity.Entity.prototype.moveDown.call(this);

  var horizontal = rune.util.Math.abs(this.velocity.x) >= 0.1;

  if (horizontal) {
    //this.animation.gotoAndPlay("r");
  } else {
    this.animation.gotoAndPlay("r");
  }
}

