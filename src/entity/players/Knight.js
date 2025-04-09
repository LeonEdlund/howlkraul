howlkraul.entity.Knight = function () {
  howlkraul.entity.Player.call(this, 50, 50, 28, 42, "knight_walk");
}

howlkraul.entity.Knight.prototype = Object.create(howlkraul.entity.Player.prototype);
howlkraul.entity.Knight.prototype.constructor = howlkraul.entity.Knight;

/**
 * @override
 */
howlkraul.entity.Knight.prototype.init = function () {
  howlkraul.entity.Player.prototype.init.call(this);
  this.m_initAnimation();
};

/**
 * Configures the animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Knight.prototype.m_initAnimation = function () {
  this.animation.create("running", [0, 1, 1, 2, 2, 3, 4, 5, 6], 10, true);
};

howlkraul.entity.Knight.prototype.m_startRunningAnimation = function () {
  //this.animation.play("running");
};

/**
 * @override
 */
howlkraul.entity.Knight.prototype.update = function (step) {
  howlkraul.entity.Player.prototype.update.call(this, step);
  currentAnimation = this.animation.current.name;
  //console.log(currentAnimation)
  if (this.keyboard.pressed("right")) {
    if (this.left > this.application.width) {
      this.moveTo(-10, this.globalY);
    }

    this.moveRight();
    this.m_startRunningAnimation();
  };

  if (this.keyboard.pressed("left")) {
    if (this.right < -10) {
      this.moveTo(this.application.width, this.globalY);
    }

    this.moveLeft();
  };

  if (this.keyboard.pressed("up")) {
    if (this.bottom < -10) {
      this.moveTo(this.globalX, this.application.height);
    }

    this.moveUp();
  };

  if (this.keyboard.pressed("down")) {
    if (this.top > this.application.height) {
      this.moveTo(this.globalX, -10);
    }

    this.moveDown();
  };
};



