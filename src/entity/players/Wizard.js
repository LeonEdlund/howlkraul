howlkraul.entity.Wizard = function () {
  howlkraul.entity.Player.call(this, 50, 50, 27, 32, "Wizard_27x32");

  this.facing = "down";
  this.power = 50;
}

howlkraul.entity.Wizard.prototype = Object.create(howlkraul.entity.Player.prototype);
howlkraul.entity.Wizard.prototype.constructor = howlkraul.entity.Wizard;

//--------------------------------------------------------------------------
// Overiding Public Methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.init = function () {
  howlkraul.entity.Player.prototype.init.call(this);
  this.m_initAnimations();
};

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.update = function (step) {
  howlkraul.entity.Player.prototype.update.call(this, step);
  this.m_move();
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.entity.Wizard.prototype.shoot = function () {
  var scene = this.application.scenes.selected;

  if (scene.spells.numMembers >= 5) return;

  var spell = new howlkraul.particle.Spell(this.centerX, this.centerY, this);
  spell.emit(this.facing);
  scene.spells = spell;
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Configures the wizards animation sequences.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_initAnimations = function () {
  this.animation.create("idle", [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 17, 0, 17, 0, 17], 13, true);
  this.animation.create("r-sideways", [46, 47, 48, 49, 50, 51, 52], 10, true);
  this.animation.create("r-up", [63, 64, 65, 66, 67, 68, 69], 10, true);
  this.animation.create("r-up-side", [73, 74, 75, 76, 77, 78], 10, true);
  this.animation.create("r-down-side", [57, 58, 59, 60], 10, true);
  this.animation.create("r-down", [19, 20, 21, 22, 23, 24], 10, true);
  this.animation.create("running-hit", [26, 27, 26], 10, true);
};

howlkraul.entity.Wizard.prototype.m_getInput = function () {
  var gamepad = this.gamepads.get(0);

  return {
    left: this.keyboard.pressed("a") || gamepad.stickLeftLeft,
    right: this.keyboard.pressed("d") || gamepad.stickLeftRight,
    up: this.keyboard.pressed("w") || gamepad.stickLeftUp,
    down: this.keyboard.pressed("s") || gamepad.stickLeftDown,
    shoot: this.keyboard.justPressed("q") || gamepad.justPressed(0),
  }
}

howlkraul.entity.Wizard.prototype.m_setAnimation = function (input) {

  if (input.up) {

    if (input.left) {
      this.facing = "up-left";
      this.animation.gotoAndPlay("r-up-side");
    } else if (input.right) {
      this.facing = "up-right";
      this.animation.gotoAndPlay("r-up-side");
      this.flippedX = false;
    } else {
      this.facing = "up";
      this.animation.gotoAndPlay("r-up")
    }

  } else if (input.down) {

    if (input.left) {
      this.facing = "down-left";
      this.animation.gotoAndPlay("r-down-side");
    } else if (input.right) {
      this.facing = "down-right";
      this.animation.gotoAndPlay("r-down-side");
      this.flippedX = false;
    } else {
      this.facing = "down";
      this.animation.gotoAndPlay("r-down");
    }

  } else if (input.right) {

    this.facing = "right";
    this.animation.gotoAndPlay("r-sideways");

  } else if (input.left) {

    this.facing = "left";
    this.animation.gotoAndPlay("r-sideways");
    this.flippedX = true;

  }

  if (!this.velocity.x && !this.velocity.y) {
    this.animation.gotoAndPlay("idle");
  }

}

howlkraul.entity.Wizard.prototype.m_move = function () {
  var input = this.m_getInput();

  if (input.up) { this.moveUp(); };
  if (input.down) { this.moveDown(); };
  if (input.left) { this.moveLeft(); };
  if (input.right) { this.moveRight(); };
  if (input.shoot) { this.shoot() };

  this.m_setAnimation(input);
};


