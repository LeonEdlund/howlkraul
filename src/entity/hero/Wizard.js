/**
 * Creates a new Wizard instance.
 *
 * @constructor
 * @extends howlkraul.entity.Entity
 *
 * @param {number} [x] The x position of the object.
 * @param {number} [y] The y position of the object.
 * 
 * @class
 * @classdesc
 * 
 * The Wizard class represents an animated Wizard sprite.
 */
howlkraul.entity.Wizard = function (x, y, input, hud) {
  howlkraul.entity.Entity.call(this, x || 30, y || 50, 27, 34, "Wizard_27x34");

  // Default Stats
  this.m_hp = 6;
  this.maxHp = 6;
  this.power = 50;
  this.m_energy = 100;
  this.energyRegenSpeed = 0.7;
  this.energyCost = 20;

  // Ui
  this.m_energybar = null;

  // Timers
  this.m_lastDamageHit = 0;
  this.m_damageHitCoolDown = 1000;

  // Flags
  this.m_isDead = false;
  this.m_isAttacking = false;
  this.m_energyEmpty = false;
  this.m_isReviving = false;

  // INPUT
  this.m_input = input;

  this.m_hud = hud;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.entity.Wizard.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Wizard.prototype.constructor = howlkraul.entity.Wizard;

//------------------------------------------------------------------------------
// Getters and Setters
//------------------------------------------------------------------------------

Object.defineProperty(howlkraul.entity.Wizard.prototype, "isDead", {
  /**
   * Check if charecter is alive.
   * 
   * @public
   * @returns {boolean}
   */
  get: function () {
    return this.m_isDead;
  },

  /**
   * Set if character is dead or not.
   * 
   * @public
   * @param {bolean}
   * @returns {boolean}
   */
  set: function (value) {
    return this.m_isDead = value;
  }

})

Object.defineProperty(howlkraul.entity.Wizard.prototype, "isReviving", {
  /**
   * Check if player is reviving.
   * 
   * @public
   * @returns {boolean}
   */
  get: function () {
    return this.m_isReviving;
  },

  /**
   * 
   * 
   * @public
   * @param {bolean}
   * @returns {boolean}
   */
  set: function (value) {
    return this.m_isReviving = value;
  }

})

Object.defineProperty(howlkraul.entity.Wizard.prototype, "hp", {
  /**
   * gets players hp
   * 
   * @returns {boolean}
   */
  get: function () {
    return this.m_hp;
  },
})

Object.defineProperty(howlkraul.entity.Wizard.prototype, "energy", {
  /**
   * gets players m_energy
   * 
   * @returns {boolean}
   */
  get: function () {
    return this.m_energy;
  }
});

Object.defineProperty(howlkraul.entity.Wizard.prototype, "controller", {
  /**
   * gets controller controlling to character
   * 
   * @returns {boolean}
   */
  get: function () {
    return this.m_input.controller;
  }
});

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.init = function () {
  howlkraul.entity.Entity.prototype.init.call(this);

  this.hitbox.set(5, (this.height - 10), (this.width - 10), 9);
  this.setVelocity(0.08, 1.2);
  this.m_initEnergybar();
};

/**
 * @overide
*/
howlkraul.entity.Wizard.prototype.initAnimations = function () {
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

  //DOWN
  this.animation.create("dead", [84, 85, 86, 87, 88, 89], 4, true);
  this.animation.create("res", [90, 91, 92, 93, 94, 95, 96, 97, 98, 99], 8, true);
};

/**
 * @override
 */
howlkraul.entity.Wizard.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);
  this.m_checkInput();
  this.m_regenEnergy();
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.entity.Wizard.prototype.move = function () {
  if (this.m_isDead) return;
  var input = this.m_input.currentInput();

  this.m_isReviving = false;
  this.m_setFacingDirection(input);
  this.m_setAnimation(input);

  if (input.up) this.moveUp();
  if (input.down) this.moveDown();
  if (input.left) this.moveLeft();
  if (input.right) this.moveRight();
  if (input.shoot) this.attack();

  if (input.hold) {
    this.m_isReviving = true;
    this.velocity.x = 0;
    this.velocity.y = 0;
    return;
  }
};

howlkraul.entity.Wizard.prototype.attack = function () {
  if (!this.m_energyEmpty && !this.m_isDead) {

    var scene = this.application.scenes.selected;
    var cordinates = this.m_setSpellStartingPosition();

    this.m_setShootingAnimation();
    this.takeEnergy();
    var spell = new howlkraul.projectile.Spell(cordinates.x, cordinates.y, this);
    spell.shootInDirection(this.facing, scene.spells);
  };
}

howlkraul.entity.Wizard.prototype.takeDamage = function () {
  var now = Date.now();

  if (now > this.m_lastDamageHit && this.m_hp > 0) {
    this.m_hp -= 1;
    this.flicker.start(this.m_damageHitCoolDown);
    this.m_lastDamageHit = now + this.m_damageHitCoolDown;
    this.m_input.controller.vibrate(500);
    if (this.m_hud) this.m_hud.updateHealth(this.m_hp);
  }

  if (this.m_hp <= 0) this.die();
};

howlkraul.entity.Wizard.prototype.die = function () {
  if (this.m_isDead) return;

  this.m_isDead = true;
  this.animation.gotoAndPlay("dead");
  this.movementAllowed = false;
  this.m_energybar.visible = false;
};

howlkraul.entity.Wizard.prototype.takeEnergy = function () {
  if (this.m_energyEmpty) return;

  this.m_energy -= this.energyCost;
  this.m_energybar.progress = this.m_energy / 100;

  if (this.m_energy <= 0) {
    this.m_energyEmpty = true;
    this.m_energy = 0;
  }
}

howlkraul.entity.Wizard.prototype.raiseFromDead = function () {
  if (this.m_hp !== 0 || this.m_hp === this.maxHp) return;

  this.m_isDead = false;
  this.movementAllowed = true;
  this.m_hp = 2;
  this.m_energybar.visible = true;
  if (this.m_hud) this.m_hud.updateHealth(this.m_hp);
}

howlkraul.entity.Wizard.prototype.regenHealth = function (amount) {
  if (this.m_hp === this.maxHp) return;

  if (this.m_hp === this.maxHp - 1) {
    this.m_hp = this.maxHp;
  } else {
    this.m_hp += amount;
  }

  if (this.m_hud) this.m_hud.updateHealth(this.m_hp);

}

howlkraul.entity.Wizard.prototype.bindHUD = function (hud) {
  this.m_hud = hud;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Checks for user input
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_checkInput = function () {
  this.move();
};

/**
 * Init manabar
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_initEnergybar = function () {
  this.m_energybar = new howlkraul.ui.Manabar(this);
  this.stage.addChild(this.m_energybar);
};

howlkraul.entity.Wizard.prototype.m_regenEnergy = function () {
  if (this.m_energy < 100) {
    this.m_energy = Math.round(this.m_energy + this.energyRegenSpeed);
  }

  if (this.m_energy >= 100) {
    this.m_energyEmpty = false;
    this.m_energy = 100;
  }
};

howlkraul.entity.Wizard.prototype.m_setAnimation = function () {
  // Cancel animation update if shootins 
  var now = Date.now();
  if (now < this.m_lastShot) return;

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

howlkraul.entity.Wizard.prototype.m_setSpellStartingPosition = function () {
  var cords = {
    x: 0,
    y: 0
  }
  console.log(this.facing)
  if (this.facing === "up") {
    cords.x = this.topLeft.x;
    cords.y = this.topLeft.y;
  } else if (this.facing.includes("down")) {
    cords.x = this.centerX - 12;
    cords.y = this.centerY;
  } else {
    cords.x = this.flippedX ? this.x - 12 : this.x + 12;
    cords.y = this.flippedX ? this.y + 5 : this.y + 10;
  }

  return cords;
}

/**
 * Change color of character.
 * Overide this method if you wanna implement color changing.
 * 
 * @abstract
 * @protected
 * @param {string} color - The color to make the character as a string. 
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.changeColor = function () {
  // LIGHTEST
  var originalC1 = new rune.color.Color24(178, 206, 219);
  var newC1 = null;

  // LIGHT
  var originalC2 = new rune.color.Color24(0, 152, 220);
  var newC2 = null;

  // MEDIUM
  var originalC3 = new rune.color.Color24(0, 105, 170);
  var newC3 = null;

  // MEDIUM DARK
  var originalC4 = new rune.color.Color24(0, 57, 109);
  var newC4 = null;

  // DARK
  var originalC5 = new rune.color.Color24(3, 25, 63);
  var newC5 = null;

  newC1 = new rune.color.Color24(194, 167, 138);
  newC2 = new rune.color.Color24(196, 118, 69);
  newC3 = new rune.color.Color24(181, 104, 60);
  newC4 = new rune.color.Color24(115, 55, 28);
  newC5 = new rune.color.Color24(46, 19, 5);

  this.texture.replaceColor(originalC1, newC1);
  this.texture.replaceColor(originalC2, newC2);
  this.texture.replaceColor(originalC3, newC3);
  this.texture.replaceColor(originalC4, newC4);
  this.texture.replaceColor(originalC5, newC5);
}