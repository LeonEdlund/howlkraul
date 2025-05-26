/**
 * Creates a new Wizard instance.
 *
 * @constructor
 * @extends howlkraul.entity.Entity
 *
 * @param {number} [x=30] - The x position of the object.
 * @param {number} [y=50] - The y position of the object.
 * @param {string} [color="blue"] - The color of the wizard. Options: red, brown, green, blue. Default: "blue".
 * @param {howlkraul.handler.InputHandler} [input=null] - An instance of an InputHandler. Optional but the wizard can't move without it.
 * @param {howlkraul.ui.PlayerHud} [hud=null] - An instance of PlayerHud. Optional.
 *
 * @class
 * @classdesc
 *
 * The Wizard class represents an animated Wizard sprite. 
 * The wizard is the game's playable character and can therefore be controlled.
 */
howlkraul.entity.Wizard = function (x, y, color, input, hud) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  howlkraul.entity.Entity.call(this, x || 30, y || 50, 27, 34, "Wizard_27x34");

  //--------------------------------------------------------------------------
  // Overide Properties (BASIC STATS)
  //--------------------------------------------------------------------------

  /**
   * @inheritdoc
   */
  this.hp = 6;

  /**
   * @inheritdoc
   */
  this.maxHp = 6;

  /**
   * @inheritdoc
   */
  this.speed = 1.2;

  //--------------------------------------------------------------------------
  // Private Properties (BASIC STATS)
  //--------------------------------------------------------------------------

  /**
   * The wizards shoot power.
   * 
   * @private
   * @type {number}
   */
  this.m_power = 50;

  /**
   * The wizards mana.
   * 
   * @private
   * @type {number}
   */
  this.m_mana = 100;

  /**
   * How much mana that is added every tick.
   * 
   * @private
   * @type {number}
   */
  this.m_manaRegenSpeed = 0.7;

  /**
   * How much each spell costs in mana. 
   * 
   * @private
   * @type {number}
   */
  this.m_spellCost = 20;

  /**
   * The color of the wizard. 
   * Default: "blue".
   * 
   * @private
   * @type {number}
   */
  this.m_color = color || "blue";

  //--------------------------------------------------------------------------
  // Private Properties (TIMES)
  //--------------------------------------------------------------------------

  /**
   * Last time the wizard took damage in ms.
   * 
   * @private
   * @type {number}
   */
  this.m_lastDamageHit = 0;

  /**
   * How many ms the wizard is hurt and cant take damage.
   * 
   * @private
   * @type {number}
   */
  this.m_damageHitCoolDown = 1000;

  //--------------------------------------------------------------------------
  // Private Properties (FLAGS)
  //--------------------------------------------------------------------------

  /**
   * If the player is dead (0 hp) or not.
   * 
   * @private
   * @type {boolean}
   */
  this.m_isDead = false;

  /**
   * If mana is currently empty.
   * 
   * @private
   * @type {boolean}
   */
  this.m_energyEmpty = false;

  /**
   * If the wizard is reviving. 
   * 
   * @private
   * @type {boolean}
   */
  this.m_isReviving = false;

  //--------------------------------------------------------------------------
  // Private Properties (OTHER OBJECTS)
  //--------------------------------------------------------------------------

  /**
   * Reference to the input handler, used to bind gamepad and keyboard with wizard.
   * 
   * @private
   * @type {howlkraul.handler.InputHandler}
   */
  this.m_input = input;

  /**
   * Reference to the player HUD connected to the player.
   * 
   * @private
   * @type {howlkraul.ui.PlayerHud}
   */
  this.m_hud = hud;

  /**
   * Reference to the manabar object. 
   * 
   * @private
   * @type {howlkraul.ui.Manabar}
   */
  this.m_manabar = null;

  /**
   * Reference to the manabar object. 
   * 
   * @private
   * @type {howlkraul.utils.StatCounter}
   */
  this.m_statCounter = null;

  /**
   * Pool of spell sounds.
   * 
   * @private
   * @type {howlkraul.util.SoundPool}
   */
  this.m_spellSound = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.entity.Wizard.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.Wizard.prototype.constructor = howlkraul.entity.Wizard;

//------------------------------------------------------------------------------
// Getters and Setters
//------------------------------------------------------------------------------

/**
 * If the wizard is dead or not.
 *
 * @member {boolean} isDead
 * @memberof howlkraul.entity.Wizard
 * @instance
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "isDead", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_isDead;
  },

  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  set: function (value) {
    return this.m_isDead = value;
  }

})

/**
 * If the wizard is in the process of reviving.
 *
 * @member {boolean} isReviving
 * @memberof howlkraul.entity.Wizard
 * @instance
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "isReviving", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_isReviving;
  },

  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  set: function (value) {
    return this.m_isReviving = value;
  }

})

/**
 * The wizards mana.
 *
 * @member {number} mana
 * @memberof howlkraul.entity.Wizard
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "mana", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_mana;
  }
});


/**
 * The wizards power/shoot damage.
 *
 * @member {number} power
 * @memberof howlkraul.entity.Wizard
 * @instance
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "power", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_power;
  },

  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  set: function (value) {
    this.m_power = value;
  }
});

/**
 * The gontroller/gamepad connected to the wizard.
 * Useful for haptic feedback.
 *
 * @member {howlkraul.handler.InputHandler} controller
 * @memberof howlkraul.entity.Wizard
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "controller", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_input.controller;
  }
});

/**
 * The PlayerHud object assosiated with the wizard.
 *
 * @member {howkraul.ui.PlayerHud} HUD
 * @memberof howlkraul.entity.Wizard
 * @instance
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "HUD", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_hud;
  }
});

/**
 * The color of the wizard. 
 *
 * @member {string} color
 * @memberof howlkraul.entity.Wizard
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "color", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_color;
  }
});

/**
 * The ManaBar object asosiated with the wizard.
 * Usefull for hiding and showing it.
 *
 * @member {howlkraul.ui.Manabar} manabar
 * @memberof howlkraul.entity.Wizard
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "manabar", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_manabar;
  }
});

/**
 * Reference to the statcounter. 
 * Used to update the stas for the player during a game.
 *
 * @member {howlkraul.utils.StatCounter} stats
 * @memberof howlkraul.entity.Wizard
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Wizard.prototype, "stats", {
  /**
   * @this howlkraul.entity.Wizard
   * @ignore
   */
  get: function () {
    return this.m_statCounter;
  }
});

//--------------------------------------------------------------------------
// Override Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.Wizard.prototype.init = function () {
  howlkraul.entity.Entity.prototype.init.call(this);

  this.hitbox.set(5, 24, 17, 9);
  this.m_initStatCounter();
  this.m_initSpellSounds();
  this.m_changeColor();
  this.m_initManabar();

};

/**
 * @inheritdoc
 */
howlkraul.entity.Wizard.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);

  this.m_handleInput();
  this.m_regenEnergy();
};

/**
 * @inheritdoc
 */
howlkraul.entity.Wizard.prototype.dispose = function () {
  this.m_disposeStatCounter();
  this.m_disposeInputHandler();
  this.m_disposeHUD();
  this.m_disposeManabar();

  howlkraul.entity.Entity.prototype.update.call(this);
};

//--------------------------------------------------------------------------
// Overide Entity Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
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

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Shoots a magic spell in the direction the wizard is facing.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.shoot = function () {
  if (this.m_energyEmpty || this.m_isDead) return;

  var cordinates = this.m_setSpellStartingPosition();
  this.m_setShootingAnimation();
  this.m_takeEnergy();
  var spell = new howlkraul.projectile.Spell(cordinates.x, cordinates.y, this);
  spell.shootInDirection(this.facing, 0.9, this.application.scenes.selected.spells);
  this.m_spellSound.play(true);
}

/**
 * Take damage and looses 1 hp if the call is done after the last hit + the damage cooldown.
 * Die method is called if player has less then 0 hp.
 * 
 * @public
 * @param {howlkraul.entity.Enemy || howlkraul.projectile.Projectile || howlkraul.particle.BombFragment} damageBy 
 * - Who delt the damage.
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.takeDamage = function (damageBy) {
  var now = Date.now();

  if (now > this.m_lastDamageHit && this.hp > 0) {
    this.m_statCounter.addHit();
    this.hp -= 1;
    this.m_lastDamageHit = now + this.m_damageHitCoolDown;

    this.flicker.start(this.m_damageHitCoolDown);
    this.m_input.controller.vibrate(500);
    if (this.m_hud) this.m_hud.updateHealth(this.hp);
  }

  if (this.hp <= 0) this.die(damageBy);
};

/**
 * Switches to death animation and stops movement.
 * 
 * @public
 * @param {howlkraul.entity.Enemy || howlkraul.projectile.Projectile || howlkraul.particle.BombFragment} killedBy 
 * - who killed the wizard.  
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.die = function (killedBy) {
  if (this.m_isDead) return;

  this.m_isDead = true;
  this.m_statCounter.addKilledBy(killedBy);
  this.animation.gotoAndPlay("dead");
  this.movementAllowed = false;
  this.m_manabar.visible = false;
};

/**
 * Raises the wizard from dead by regenerating 2 hp. 
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.raiseFromDead = function () {
  if (this.hp !== 0 || this.hp === this.maxHp) return;

  this.m_isDead = false;
  this.movementAllowed = true;
  this.hp = 2;
  this.m_manabar.visible = true;
  if (this.m_hud) this.m_hud.updateHealth(this.hp);
}

/**
 * Raises the hp by the provided amount. 
 * But not over the max hp.
 * 
 * @public
 * @param {number} amount - how much hp that should be added. 
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.regenHealth = function (amount) {
  if (this.hp === this.maxHp) return;

  this.hp += amount;
  this.hp = rune.util.Math.clamp(this.hp, 0, this.maxHp);

  if (this.m_hud) {
    this.m_hud.updateHealth(this.hp);
  }
}

/**
 * Binds a PlayerHud to Wizard.
 * 
 * @public
 * @param {howlkraul.ui.PlayerHud} hud - The hud that should be assosiated with the wizard
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.bindHUD = function (hud) {
  this.m_disposeHUD();
  this.m_hud = hud;
}

/**
 * Binds a input handler with wizard.
 * 
 * @public
 * @param {howlkraul.handler.InputHandler} controlls - The Inputhandler that should be assosiated with the wizard.
 * @returns {undefined}
*/
howlkraul.entity.Wizard.prototype.bindControlls = function (controlls) {
  this.m_disposeInputHandler();
  this.m_input = controlls;
}

//--------------------------------------------------------------------------
// Private Methods (LOGIC)
//--------------------------------------------------------------------------

/**
 * Checks and handles user input.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_handleInput = function () {
  if (this.m_isDead || !this.m_input) return;

  this.m_isReviving = false;  // @note reset Reviving flag every step. FIX LATER.

  var input = this.m_input.currentInput();

  this.m_setFacingDirection(input);
  this.m_setRunningAnimation(input);

  if (input.up) this.moveUp();
  if (input.down) this.moveDown();
  if (input.left) this.moveLeft();
  if (input.right) this.moveRight();
  if (input.shoot) this.shoot();

  if (input.hold) {
    this.m_isReviving = true;
    this.velocity.x = 0;
    this.velocity.y = 0;
    return;
  }
};

/**
 * Take energy 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.m_takeEnergy = function () {
  if (this.m_energyEmpty) return;

  this.m_mana -= this.m_spellCost;
  this.m_manabar.progress = this.m_mana / 100;

  if (this.m_mana <= 0) {
    this.m_energyEmpty = true;
    this.m_mana = 0;
  }
}

/**
 * Method is run every update tick and regens the mana based on the mana regenSpeed.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.m_regenEnergy = function () {
  if (this.m_mana < 100) {
    this.m_mana = Math.round(this.m_mana + this.m_manaRegenSpeed);
  }

  if (this.m_mana >= 100) {
    this.m_energyEmpty = false;
    this.m_mana = 100;
  }
};

/**
 * Adjust from where the spell should spawn in reletion to the wizards position.
 * 
 * @private
 * @returns {object}
 */
howlkraul.entity.Wizard.prototype.m_setSpellStartingPosition = function () {
  var cords = {
    x: 0,
    y: 0
  }

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

//--------------------------------------------------------------------------
// Private Methods (ANIMATIONS)
//--------------------------------------------------------------------------

/**
 * Sets the facing direction based on user input.
 * 
 * @private
 * @returns {undefined}
 */
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

/**
 * Sets the correct running animation based on facing direction.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.m_setRunningAnimation = function () {
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

/**
 * Sets the correct idle animation based on facing direction.
 * 
 * @private
 * @returns {undefined}
 */
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

/**
 * Sets the correct shooting animotion based on facing direction.
 * 
 * @private
 * @returns {undefined}
 */
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

//--------------------------------------------------------------------------
// Private Methods (INIT)
//--------------------------------------------------------------------------

/**
 * Initalizes the statCounter for the wizard.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_initStatCounter = function () {
  this.m_disposeStatCounter();

  if (!this.m_statCounter) {
    this.m_statCounter = new howlkraul.utils.StatCounter(this.m_color);
  }
};

/**
 * Initalizes spell sounds.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_initSpellSounds = function () {
  this.m_spellSound = new howlkraul.utils.SoundPool(this.application, "sfx_spell", 10);
};

/**
 * Change color of character.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Wizard.prototype.m_changeColor = function () {
  if (this.m_color === "blue") return;

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

  // Shadows
  var originalC6 = new rune.color.Color24(32, 51, 84);
  var newC6 = null;

  var originalC7 = new rune.color.Color24(11, 35, 77);
  var newC7 = null;

  var originalC8 = new rune.color.Color24(31, 45, 73);
  var newC8 = null;

  var originalC9 = new rune.color.Color24(37, 56, 89);
  var newC9 = null;

  switch (this.m_color) {
    case "brown":
      newC1 = new rune.color.Color24(196, 176, 158);
      newC2 = new rune.color.Color24(150, 110, 90);
      newC3 = new rune.color.Color24(110, 70, 50);
      newC4 = new rune.color.Color24(80, 50, 30);
      newC5 = new rune.color.Color24(40, 20, 10);
      newC6 = new rune.color.Color24(50, 40, 30);
      newC7 = new rune.color.Color24(35, 25, 20);
      newC8 = new rune.color.Color24(45, 35, 25);
      newC9 = new rune.color.Color24(60, 50, 35);
      break;
    case "green":
      newC1 = new rune.color.Color24(188, 219, 178);
      newC2 = new rune.color.Color24(0, 180, 100);
      newC3 = new rune.color.Color24(0, 140, 80);
      newC4 = new rune.color.Color24(0, 85, 50);
      newC5 = new rune.color.Color24(10, 50, 20);
      newC6 = new rune.color.Color24(30, 60, 40);
      newC7 = new rune.color.Color24(15, 45, 30);
      newC8 = new rune.color.Color24(25, 55, 35);
      newC9 = new rune.color.Color24(40, 70, 45);
      break;
    case "red":
      newC1 = new rune.color.Color24(200, 160, 160);
      newC2 = new rune.color.Color24(180, 60, 60);
      newC3 = new rune.color.Color24(140, 40, 40);
      newC4 = new rune.color.Color24(90, 25, 25);
      newC5 = new rune.color.Color24(50, 10, 10);
      newC6 = new rune.color.Color24(60, 30, 30);
      newC7 = new rune.color.Color24(45, 20, 20);
      newC8 = new rune.color.Color24(55, 25, 25);
      newC9 = new rune.color.Color24(70, 35, 35);
      break;
    default:
      return
  }

  this.texture.replaceColor(originalC1, newC1);
  this.texture.replaceColor(originalC2, newC2);
  this.texture.replaceColor(originalC3, newC3);
  this.texture.replaceColor(originalC4, newC4);
  this.texture.replaceColor(originalC5, newC5);
  this.texture.replaceColor(originalC6, newC6);
  this.texture.replaceColor(originalC7, newC7);
  this.texture.replaceColor(originalC8, newC8);
  this.texture.replaceColor(originalC9, newC9);
}

/**
 * Initalizes manabar and adds it to stage.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_initManabar = function () {
  this.m_disposeManabar();

  if (!this.m_manabar) {
    this.m_manabar = new howlkraul.ui.Manabar(this);
    this.stage.addChild(this.m_manabar);
  }
};

//--------------------------------------------------------------------------
// Private Methods (DISPOSE)
//--------------------------------------------------------------------------

/**
 * Dispose StatCounter
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_disposeStatCounter = function () {
  if (this.m_statCounter) {
    this.m_statCounter = null;
  }
};

/**
 * Dispose manabar and removes it to stage.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_disposeManabar = function () {
  if (this.m_manabar) {
    if (this.stage && this.stage.hasChild(this.m_manabar)) {
      this.stage.removeChild(this.m_manabar, true);
    }
    this.m_manabar = null;
  }
};

/**
 * Dispose input handler.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_disposeInputHandler = function () {
  if (this.m_input) {
    this.m_input.dispose();
    this.m_input = null;
  }
};

/**
 * Dispose hud.
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.Wizard.prototype.m_disposeHUD = function () {
  if (this.m_hud) {
    this.m_hud.dispose();
    this.m_hud = null;
  }
};