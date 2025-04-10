howlkraul.entity.Wizard = function () {
  howlkraul.entity.Player.call(this, 50, 50, 27, 32, "Wizard_28x40");

  this.spell = null;

  this.facing = "down";
}

howlkraul.entity.Wizard.prototype = Object.create(howlkraul.entity.Player.prototype);
howlkraul.entity.Wizard.prototype.constructor = howlkraul.entity.Wizard;

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.init = function () {
  howlkraul.entity.Player.prototype.init.call(this);
  this.m_initAnimation();
  this.m_initSpell();
};

/**
 * Configures the astronaut's animation sequence.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_initAnimation = function () {
  this.animation.create("idle", [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 17, 0, 17, 0, 17], 13, true);
  this.animation.create("running-sideways", [47, 48, 49], 12, true);
  this.animation.create("running-sideways-down", [51, 52, 53, 54, 55], 6, true);
  this.animation.create("running-forward", [19, 20, 21, 22, 23, 24], 6, true);
  this.animation.create("running-hit", [26, 27, 26], 12, true);
};

howlkraul.entity.Wizard.prototype.m_move = function () {
  var gamepad = this.gamepads.get(0);

  if (this.keyboard.pressed("d") || gamepad.stickLeftRight) {
    this.facing = "right";
    this.animation.gotoAndPlay("running-sideways");
    this.moveRight();
  };

  if (this.keyboard.pressed("a") || gamepad.stickLeftLeft) {
    this.facing = "left";
    this.animation.gotoAndPlay("running-sideways");
    this.moveLeft();
  };

  if (this.keyboard.pressed("w") || gamepad.stickLeftUp) {
    this.facing = "up";
    this.moveUp();
  };

  if (this.keyboard.pressed("s") || gamepad.stickLeftDown) {
    this.facing = "down";
    this.animation.gotoAndPlay("running-forward");
    this.moveDown();
  };

  if (this.keyboard.pressed("d") && this.keyboard.pressed("s")) {
    this.animation.gotoAndPlay("running-sideways-down");
  };

  if (this.keyboard.justPressed("q")) {
    this.shoot();
    this.animation.gotoAndPlay("running-hit");
  };
};

howlkraul.entity.Wizard.prototype.m_initSpell = function () {
  this.spell = new rune.particle.Emitter(this.centerX, this.centerY, 10, 10, {
    capacity: 1,
    particles: [howlkraul.particle.Spell],
  });

  //this.spell.debug = true;
  this.stage.addChild(this.spell);
};

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.update = function (step) {
  howlkraul.entity.Player.prototype.update.call(this, step);
  this.m_move();
  this.spell.center = this.center;
};

howlkraul.entity.Wizard.prototype.shoot = function (step) {
  this.spell.emit(1);
  var particle = this.spell.getParticles()[0];

  switch (this.facing) {
    case "down":
      particle.velocity.x = 0;
      particle.velocity.y = 4;
      break;
    case "up":
      particle.velocity.x = 0;
      particle.velocity.y = -4;
      break;
    case "right":
      particle.velocity.x = 4;
      particle.velocity.y = 0;
      break;
    case "left":
      particle.velocity.x = -4;
      particle.velocity.y = 0;
      break;
  }
};