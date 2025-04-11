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

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.update = function (step) {
  howlkraul.entity.Player.prototype.update.call(this, step);
  this.m_move();
};

howlkraul.entity.Wizard.prototype.shoot = function () {
  var scene = this.application.scenes.selected;

  if (scene.spells.numMembers >= 2) return;

  var particle = new howlkraul.particle.Spell(this.centerX, this.centerY);
  particle.emit(this.facing);
  scene.spells = particle;

  this.stage.addChild(particle);
};