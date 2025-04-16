howlkraul.entity.Wizard = function () {
  howlkraul.entity.Player.call(this, 50, 50, 27, 34, "Wizard_27x34");

  this.facing = "down";
  this.power = 50;
  this.mana = 100;
  this.m_manabar = null;
  this.m_manaEmpty = false;
  this.m_lastShot = 0;
  this.m_isShooting = false;
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
  this.m_initManabar();
};

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.update = function (step) {
  howlkraul.entity.Player.prototype.update.call(this, step);

  this.m_manabarFollow();
  this.m_regenMana();
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.entity.Wizard.prototype.shoot = function () {
  var scene = this.application.scenes.selected;

  if (this.mana <= 0) {
    this.m_manaEmpty = true;
    this.m_manabar.forgroundColor = "red";
  }

  if (!this.m_manaEmpty) {
    this.mana -= 20;
    this.m_manabar.progress = this.mana / 100;
    var x = 0;
    var y = 0;

    if (this.facing === "up" || this.facing === "down") {
      x = this.topLeft.x;
      y = this.topLeft.y;
    } else {
      x = this.flippedX ? this.x - 12 : this.x + 12;
      y = this.flippedX ? this.y + 5 : this.y + 10;

    }

    this.m_setShootingAnimation();
    var spell = new howlkraul.projectile.Spell(x, y, this);
    spell.shootInDirection(this.facing, scene.spells);
  }
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
  // IDLE
  this.animation.create("idle-down", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 0, 0, 0, 17, 18, 17, 18, 17, 18, 0, 0, 0, 0], 13, true);
  this.animation.create("idle-sideways", [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43], 10, true);
  this.animation.create("idle-up", [62, 62, 62, 62, 62, 62, 62, 62, 62, 71, 72, 71, 72, 71], 10, true);

  // RUNNING
  this.animation.create("r-down", [19, 20, 21, 22, 23, 24], 10, true);
  this.animation.create("r-up", [63, 64, 65, 66, 67, 68, 69], 10, true);
  this.animation.create("r-up-side", [73, 74, 75, 76, 77, 78], 10, true);
  this.animation.create("r-down-side", [57, 58, 59, 60], 10, true);
  this.animation.create("r-sideways", [46, 47, 48, 49, 50, 51, 52], 10, true);

  // HIT
  this.animation.create("s-up", [71, 72], 8, true);
  this.animation.create("s-down", [26, 27], 8, true);
  this.animation.create("s-side", [54, 55], 8, true);
  this.animation.create("s-up-side", [82, 83], 8, true);
};

/**
 * Init manabar
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_initManabar = function () {
  this.m_manabar = new rune.ui.Progressbar(this.width, 2, "#cad4de", "#6697c4");
  this.m_manabar.progress = this.mana / 100;
  this.stage.addChild(this.m_manabar);
};

howlkraul.entity.Wizard.prototype.m_manabarFollow = function () {
  this.m_manabar.moveTo(this.bottomLeft.x, this.bottomLeft.y + 2);
}

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

howlkraul.entity.Wizard.prototype.move = function (input) {
  this.m_setFacingDirection(input);
  this.m_setAnimation(input);

  if (input.up) { this.moveUp(); };
  if (input.down) { this.moveDown(); };
  if (input.left) { this.moveLeft(); };
  if (input.right) { this.moveRight(); };
  if (input.shoot) { this.shoot() };

};

howlkraul.entity.Wizard.prototype.m_regenMana = function () {
  if (this.mana === 100) {
    this.m_manaEmpty = false;

    if (this.m_manabar.forgroundColor !== "#6697c4") {
      this.mana -= 1;
      this.m_manabar.forgroundColor = "#6697c4";
    }

    return;
  }

  if (this.mana < 100) {
    this.mana += 0.5;
    this.m_manabar.progress = this.mana / 100;
  }
};

//--------------------------------------------------------------------------
// Animations
//--------------------------------------------------------------------------

howlkraul.entity.Wizard.prototype.m_setAnimation = function () {
  var now = Date.now();

  if (this.facing.includes("right")) {
    this.flippedX = false;
  }

  if (this.facing === "left") {
    this.flippedX = true;
  }

  if (now < this.m_lastShot) {
    return;
  }

  if (!this.velocity.x && !this.velocity.y) {
    this.m_setIdleAnimation();
    return;
  }

  switch (this.facing) {
    case "up":
      this.animation.gotoAndPlay("r-up");
      break;
    case "up-left":
    case "up-right":
      this.animation.gotoAndPlay("r-up-side");
      break;
    case "down":
      this.animation.gotoAndPlay("r-down");
      break;
    case "down-left":
    case "down-right":
      this.animation.gotoAndPlay("r-down-side");
      break;
    case "right":
    case "left":
      this.animation.gotoAndPlay("r-sideways");
      break;
    default:
      this.animation.gotoAndPlay("r-down");
  }
}

howlkraul.entity.Wizard.prototype.m_setIdleAnimation = function () {
  switch (this.facing) {
    case "up":
    case "up-left":
    case "up-right":
      this.animation.gotoAndPlay("idle-up");
      break;
    case "down":
    case "down-left":
    case "down-right":
      this.animation.gotoAndPlay("idle-down");
      break;
    case "right":
    case "left":
      this.animation.gotoAndPlay("idle-sideways");
      break;
    default:
      this.animation.gotoAndPlay("idle-down");
  }
}

howlkraul.entity.Wizard.prototype.m_setFacingDirection = function (input) {
  if (input.up) {
    if (input.left) {
      this.facing = "up-left";
      return;
    }

    if (input.right) {
      this.facing = "up-right";
      return;
    }

    this.facing = "up";

  } else if (input.down) {

    if (input.left) {
      this.facing = "down-left";
      return;
    }

    if (input.right) {
      this.facing = "down-right";
      return;
    }

    this.facing = "down";
  } else if (input.right) {
    this.facing = "right";
    return;
  } else if (input.left) {
    this.facing = "left";
    return;
  }
}

howlkraul.entity.Wizard.prototype.m_setShootingAnimation = function () {
  var now = Date.now();


  this.m_lastShot = now + 300;


  switch (this.facing) {
    case "up":
      this.animation.gotoAndPlay("s-up");
      break;
    case "up-left":
    case "up-right":
      this.animation.gotoAndPlay("s-up-side");
      break;
    case "down":
    case "down-left":
    case "down-right":
      this.animation.gotoAndPlay("s-down");
      break;
    case "right":
    case "left":
      this.animation.gotoAndPlay("s-side");
      break;
    default:
      this.animation.gotoAndPlay("r-down");
  }
}