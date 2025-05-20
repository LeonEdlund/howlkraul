//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Abstract entity class.
 * 
 * @constructor
 * @extends rune.display.Sprite
 * 
 * @param {number} x  - Spawn point on X-axis.
 * @param {number} y  - Spawn point on Y-axis.
 * @param {number} height  - The sprites height.
 * @param {number} width  - The sprites width.
 * @param {string} texture  - the name of the resource.
 * 
 * @class
 * @classdesc
 * 
 * Abstract class reprecenting a entity.
 * Use this class to creating moving entity sprites.
 */
howlkraul.entity.Entity = function (x, y, height, width, texture) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.display.Sprite.call(this, x || 0, y || 0, height, width, texture);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
  * The default HP of the entity
  * 
  * @private
  * @type {number}
  */
  this.m_hp = 1;

  /**
  * The facing direction.
  * 
  * @private
  * @type {string}
  */
  this.m_facing = "down";

  /**
  * The m_acceleration of the entity.
  * 
  * @private
  * @type {number}
  */
  this.m_acceleration = 0.8;

  /**
  * The max speed of the entity.
  * 
  * @private
  * @type {number}
  */
  this.m_speed = 1;

  /**
  * the drag effecting the entity.
  * Works as de-acceleration.
  * 
  * @private
  * @type {number}
  */
  this.m_drag = 0.1;

  /**
  * If movement is allowed or not.
  * 
  * @private
  * @type {boolean}
  */
  this.m_movementAllowed = true;

  /**
  * array of different damage sounds.
  * 
  * @private
  * @type {array}
  */
  this.m_damageSounds = [];

  /**
  * array of different death sounds.
  * 
  * @private
  * @type {array}
  */
  this.m_deathSounds = [];
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.Entity.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.entity.Entity.prototype.constructor = howlkraul.entity.Entity;

//--------------------------------------------------------------------------
// Getter and Setters
//--------------------------------------------------------------------------

/**
 * The hp of the entity.
 * 
 * @member {string} facing
 * @memberof howlkraul.entity.Entity
 * @instance
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "hp", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_hp;
  },

  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  set: function (value) {
    this.m_hp = value;
  }
});

/**
 * The max hp of the entity. 
 * Useful when healing a entity. 
 * 
 * @member {string} facing
 * @memberof howlkraul.entity.Entity
 * @instance
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "maxHp", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_maxHp;
  },

  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  set: function (value) {
    this.m_maxHp = value;
  }
});

/**
 * The facing direction of the entity. The default value is "down".
 * 
 * @member {string} facing
 * @memberof howlkraul.entity.Entity
 * @instance
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "facing", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_facing;
  },

  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  set: function (value) {
    switch (value) {
      case "up":
      case "up-left":
      case "up-right":
      case "down":
      case "down-left":
      case "down-right":
      case "left":
      case "right":
      case "side":
        this.m_facing = value;
        break;
      default:
        throw new Error("Invalid facing direction");
    }
  }
});

/**
 * If movement is allowed or not. 
 * 
 * @member {boolean} movementAllowed
 * @memberof howlkraul.entity.Entity
 * @instance
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "movementAllowed", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_movementAllowed;
  },

  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  set: function (value) {
    this.m_movementAllowed = value;
  }
});

/**
 * The movement speed of the entity.
 * 
 * @member {number} speed
 * @memberof howlkraul.entity.Entity
 * @instance
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "speed", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_speed;
  },

  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  set: function (value) {
    this.m_speed = value;
    this.velocity.max.x = value;
    this.velocity.max.y = value;
  }
});

/**
 * The acceleration of the entity.
 * 
 * @member {number} acceleration
 * @memberof howlkraul.entity.Entity
 * @instance
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "acceleration", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_acceleration;
  },

  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  set: function (value) {
    this.m_acceleration = value;
  }
});

/**
 * The drag that effects the entity.
 * Works as de-acceleration.
 * 
 * @member {number} acceleration
 * @memberof howlkraul.entity.Entity
 * @instance
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "drag", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_drag;
  },

  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  set: function (value) {
    this.m_speed = value;
    this.velocity.drag.x = value;
    this.velocity.drag.y = value;
  }
});

/**
 * The array of damage sounds. 
 * Can be used to add sounds to the entity.
 * 
 * @member {array} damageSounds
 * @memberof howlkraul.entity.Entity
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "damageSounds", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_damageSounds;
  }
});

/**
 * Returns a random damage sound that can be used when a entity takes damage.
 * 
 * @member {rune.media.Sound} damageSound
 * @memberof howlkraul.entity.Entity
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "damageSound", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    var i = rune.util.Math.randomInt(0, (this.m_damageSounds.length - 1));
    return this.m_damageSounds[i] || null;
  }
});

/**
 * The array of death sounds. 
 * Can be used to add sounds to the entity.
 * 
 * @member {array} deathSounds
 * @memberof howlkraul.entity.Entity
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "deathSounds", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    return this.m_deathSounds;
  }
});

/**
 * Returns a random death sound that can be used when a entity dies.
 * 
 * @member {rune.media.Sound} deathSound
 * @memberof howlkraul.entity.Entity
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.entity.Entity.prototype, "deathSound", {
  /**
   * @this howlkraul.entity.Entity
   * @ignore
   */
  get: function () {
    var i = rune.util.Math.randomInt(0, (this.m_deathSounds.length - 1));
    console.log(this.m_deathSounds);
    return this.m_deathSounds[i] || null;
  }
});

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * Method is run once when an instance of the object is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.initAnimations();
  this.initStates();
  this.initSounds();
  this.m_initPhysics();
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Moves the entity right.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.moveRight = function () {
  if (!this.movementAllowed) return;
  this.flippedX = false;
  this.velocity.x += this.m_acceleration;
}

/**
 * Moves the entity left.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.moveLeft = function () {
  if (!this.movementAllowed) return;
  this.flippedX = true;
  this.velocity.x -= this.m_acceleration;
}

/**
 * Moves the entity up.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.moveUp = function () {
  if (!this.movementAllowed) return;
  this.velocity.y -= this.m_acceleration;
}

/**
 * Moves the entity down.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.moveDown = function () {
  if (!this.movementAllowed) return;
  this.velocity.y += this.m_acceleration;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Inits default physics that effect the entity.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.m_initPhysics = function () {
  this.velocity.drag.x = 0.1;
  this.velocity.drag.y = 0.1;
}

//--------------------------------------------------------------------------
// Abstract Protected Methods
//--------------------------------------------------------------------------

/**
 * Override this method to add animations to entity.
 * Runs when a entity is instantiated. 
 * 
 * @abstract
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.initAnimations = function () {
  // OVERIDE
};

/**
 * Override to add states to entity.
 * Runs when a entity is instantiated. 
 * 
 * @abstract
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.initStates = function () {
  // OVERIDE
};

/**
 * Override to add sounds to entity.
 * Runs when a entity is instantiated. 
 * 
 * @abstract
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.initSounds = function () {
  // OVERIDE
};

/**
 * Override to pick.
 * Runs when a entity takes damage.
 * 
 * @abstract
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.playDeathSound = function () {
  if (this.deathSound) {
    var pan = this.getPaningValue();
    this.deathSound.pan = pan;
    this.deathSound.volume = 0.6;
    this.deathSound.play(true);
  }
};

/**
 * Override to pick.
 * Runs when a entity takes damage.
 * 
 * @abstract
 * @protected
 * @returns {undefined}
 */
howlkraul.entity.Entity.prototype.playDamageSound = function () {
  if (this.damageSound) {
    var pan = this.getPaningValue();
    this.damageSound.pan = pan;
    this.damageSound.volume = 0.6;
    this.damageSound.play(true);
  }
};

/**
 * Get´s a value between -1 and 1 based on the entitys position in relation to the screen.
 * Used for panning sounds.
 * 
 * @private
 * @returns {number}
 */
howlkraul.entity.Entity.prototype.getPaningValue = function () {
  return (this.centerX - this.application.screen.centerX) / this.application.screen.centerX;
};

