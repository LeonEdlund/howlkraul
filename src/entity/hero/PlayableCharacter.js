//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new PlayableCharacter instance.
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
 * The PlayableCharacter class represents an animated PlayableCharacter sprite.
 */
howlkraul.entity.PlayableCharacter = function (x, y, height, width, texture, color) {
  howlkraul.entity.Entity.call(this, x || 0, y || 0, height, width, texture);

  // Default Stats
  this.m_hp = 6;
  this.maxHp = 6;
  this.power = 50;
  this.energy = 100;
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

  // COLOR
  this.m_color = color || null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.entity.PlayableCharacter.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.PlayableCharacter.prototype.constructor = howlkraul.entity.PlayableCharacter;

//------------------------------------------------------------------------------
// Getters and Setters
//------------------------------------------------------------------------------

Object.defineProperty(howlkraul.entity.PlayableCharacter.prototype, "isAlive", {
  /**
   * Check if charecter is alive.
   * 
   * @returns {boolean}
   */
  get: function () {
    return !this.m_isAlive;
  }
})

Object.defineProperty(howlkraul.entity.PlayableCharacter.prototype, "hp", {
  /**
   * gets players hp
   * 
   * @returns {boolean}
   */
  get: function () {
    return this.m_hp;
  },

  /**
   * sets players health
   * 
   * @param {number} value
   * @returns {boolean}
   */
  set: function (value) {
    if (this.m_hp === this.maxHp) return;

    if (this.m_hp === this.maxHp - 1) {
      this.m_hp = this.maxHp;
    } else {
      this.m_hp = value;
    }

  }
})

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.PlayableCharacter.prototype.init = function () {
  howlkraul.entity.Entity.prototype.init.call(this);

  this.hitbox.set(5, (this.height - 10), (this.width - 10), 9);
  this.m_initEnergybar();
  this.m_changeColor();
};

/**
 * @override
 */
howlkraul.entity.PlayableCharacter.prototype.update = function (step) {
  howlkraul.entity.Entity.prototype.update.call(this, step);
  this.m_energybarFollow();
  this.m_regenEnergy();
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.entity.PlayableCharacter.prototype.move = function (input) {
  if (this.m_isDead) return;

  this.m_setFacingDirection(input);
  this.m_setAnimation(input);

  if (input.up) { this.moveUp(); };
  if (input.down) { this.moveDown(); };
  if (input.left) { this.moveLeft(); };
  if (input.right) { this.moveRight(); };
  if (input.shoot) { this.attack() };
  if (input.hold) {
    this.velocity.x = 0;
    this.velocity.y = 0;
    return;
  }
};

howlkraul.entity.PlayableCharacter.prototype.attack = function () {
  if (this.m_isDead) return;

  this.m_handleEmptyEnergy();

  if (!this.m_energyEmpty) {
    this.m_setShootingAnimation();
    this.m_performAttack(); // Sub class method
  };
}

howlkraul.entity.PlayableCharacter.prototype.takeDamage = function () {
  var now = Date.now();

  if (now > this.m_lastDamageHit && this.m_hp > 0) {
    this.m_hp -= 1;
    this.flicker.start(this.m_damageHitCoolDown);
    this.m_lastDamageHit = now + this.m_damageHitCoolDown;
  }

  if (this.m_hp <= 0) this.die();
};

howlkraul.entity.PlayableCharacter.prototype.die = function () {
  this.m_isDead = true;
  this.animation.gotoAndPlay("dead");
  this.movementAllowed = false;
  this.rotation = -90;
  this.m_energybar.visible = false;
};

howlkraul.entity.PlayableCharacter.prototype.takeEnergy = function () {
  this.energy -= this.energyCost;
  this.m_energybar.progress = this.energy / 100;
}

howlkraul.entity.PlayableCharacter.prototype.raiseFromDead = function () {
  if (this.m_hp !== 0 || this.m_hp === this.maxHp) return;

  this.m_isDead = false;
  this.movementAllowed = true;
  this.m_hp = 2;
  this.rotation = 0;
  this.m_energybar.visible = true;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Init manabar
 * 
 * @returns {undefined}
 * @private
*/
howlkraul.entity.PlayableCharacter.prototype.m_initEnergybar = function () {
  this.m_energybar = new rune.ui.Progressbar(this.width, 2, "#cad4de", "#6697c4");
  this.m_energybar.progress = this.energy / 100;
  this.stage.addChild(this.m_energybar);
};

howlkraul.entity.PlayableCharacter.prototype.m_energybarFollow = function () {
  this.m_energybar.moveTo(this.bottomLeft.x, this.bottomLeft.y + 2);
}

howlkraul.entity.PlayableCharacter.prototype.m_handleEmptyEnergy = function () {
  if (this.energy <= 0) {
    this.m_energyEmpty = true;
    this.m_energybar.forgroundColor = "red";
  }
}

howlkraul.entity.PlayableCharacter.prototype.m_regenEnergy = function () {
  this.m_energybar.progress = this.energy / 100;

  if (this.energy >= 100) {
    this.m_energyEmpty = false;

    if (this.m_energybar.forgroundColor !== "#6697c4") {
      this.m_energybar.forgroundColor = "#6697c4";
    }

    return;
  }

  this.energy += this.energyRegenSpeed;

  if (this.energy > 100) {
    this.energy = 100;
  }
};

//--------------------------------------------------------------------------
// Animations
//--------------------------------------------------------------------------

howlkraul.entity.PlayableCharacter.prototype.m_setAnimation = function () {
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

howlkraul.entity.PlayableCharacter.prototype.m_setIdleAnimation = function () {
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

howlkraul.entity.PlayableCharacter.prototype.m_setFacingDirection = function (input) {
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

howlkraul.entity.PlayableCharacter.prototype.m_setShootingAnimation = function () {
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
// Abstract Methods
//--------------------------------------------------------------------------

/**
 * Change color of character.
 * Overide this method if you wanna implement color changing.
 * 
 * @abstract
 * @protected
 * @param {string} color - The color to make the character as a string. 
 * @returns {undefined}
 */
howlkraul.entity.PlayableCharacter.prototype.m_changeColor = function (color) {
  //OVERIDE IN SUBCLASS

}