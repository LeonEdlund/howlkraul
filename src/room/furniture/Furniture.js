/**
 * Abstract class for furniture.
 *
 * @constructor
 * @extends rune.display.Sprite
 * @abstract
 * 
 * @param {number} [x=0] - X spawn position.
 * @param {number} [y=0] - Y spawn position.
 * @param {number} width - Width of the sprite.
 * @param {number} height - Height of the sprite.
 * @param {string} texture - The name of the texture.
 * 
 * @class
 * @classdesc
 *
 * Represents a abstract class for furniture.
 */
howlkraul.room.Furniture = function (x, y, width, height, texture) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, width, height, texture);

  //--------------------------------------------------------------------------
  // Protect properties
  //--------------------------------------------------------------------------

  /**
   * The health of the furniture.
   * Default: 5.
   * 
   * @protected
   * @type {number}
   */
  this.m_health = 5;

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * the last time the furniture was damaged
   * 
   * @private
   * @type {number}
   */
  this.m_lastDamageHit = 0;

  /**
   * the last time the furniture was damaged
   * 
   * @private
   * @type {number}
   */
  this.m_damageCoolDown = 500;

  /**
   * Array of sound id's for hits
   * 
   * @private
   * @type {Array<string>}
   */
  this.m_hitSounds = [];

  /**
   * Array of sound id's for break sounds
   * 
   * @private
   * @type {Array<string>}
   */
  this.m_breakSounds = [];
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.Furniture.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.room.Furniture.prototype.constructor = howlkraul.room.Furniture;

//--------------------------------------------------------------------------
// Getters and Setters
//--------------------------------------------------------------------------

/**
 * Flag for if furniture is destroyed or not
 *
 * @member {boolean} destroyed
 * @memberof howlkraul.room.Furniture
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.room.Furniture.prototype, "destroyed", {
  /**
   * @this howlkraul.room.Furniture
   * @ignore
   */
  get: function () {
    if (this.m_health > 0) {
      return false;
    } else {
      return true;
    }
  }
});

/**
 * Array of sound id's for hit.
 *
 * @member {Array<string>} hitSounds
 * @memberof howlkraul.room.Furniture
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.room.Furniture.prototype, "hitSounds", {
  /**
   * @this howlkraul.room.Furniture
   * @ignore
   */
  get: function () {
    return this.m_hitSounds;
  }
});

/**
 * A random hitsound.
 *
 * @member {rune.media.Sound} hitSound
 * @memberof howlkraul.room.Furniture
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.room.Furniture.prototype, "hitSound", {
  /**
   * @this howlkraul.room.Furniture
   * @ignore
   */
  get: function () {
    var i = rune.util.Math.randomInt(0, this.m_hitSounds.length - 1);
    return this.m_hitSounds[i];
  }
});

/**
 * Array of sound id's for break.
 *
 * @member {Array<string>} breakSounds
 * @memberof howlkraul.room.Furniture
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.room.Furniture.prototype, "breakSounds", {
  /**
   * @this howlkraul.room.Furniture
   * @ignore
   */
  get: function () {
    return this.m_breakSounds;
  }
});

/**
 * A random break sound.
 *
 * @member {rune.media.Sound} hitSound
 * @memberof howlkraul.room.Furniture
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.room.Furniture.prototype, "breakSound", {
  /**
   * @this howlkraul.room.Furniture
   * @ignore
   */
  get: function () {
    var i = rune.util.Math.randomInt(0, this.m_breakSounds.length - 1);
    return this.m_breakSounds[i];
  }
});

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * Is run once when an instance is created.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.room.Furniture.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
  this.initSounds();
  this.m_initVelocity();
}

/**
* This method is automatically executed once per "tick".
*
* @public
* @param {number} step Fixed time step.
* @returns {undefined}
*/
howlkraul.room.Furniture.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this);
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Give damage to furniture and change frame.
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.takeDamage = function () {
  this.m_health -= 1;
  this.m_changeFrame();


  if (this.destroyed) {
    if (this.breakSound) {
      this.application.sounds.sound.get(this.breakSound).play(true);
    }
  } else {
    if (this.hitSound) {
      this.application.sounds.sound.get(this.hitSound).play(true);
    }
  }

}

/**
 * Give damage to furniture from a enemy and change frame.
 * 
 * @public
 * @returns {undefined} 
*/
howlkraul.room.Furniture.prototype.takeDamageFromEnemy = function () {
  var now = Date.now();

  if (now > this.m_lastDamageHit) {
    this.takeDamage();
    this.m_lastDamageHit = now + this.m_damageCoolDown;
  }
}

/**
 * Randomly drop loot.
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.dropLoot = function () {
  this.m_dropCoins();

  if (rune.util.Math.chance(30)) {
    this.m_dropHpPotion();
  } else if (rune.util.Math.chance(60)) {
    this.m_dropBomb();
  }
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Drop hp potion
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.m_dropHpPotion = function () {
  this.application.scenes.selected.potions.addMember(new howlkraul.drops.HealthPotion(this.center.x, this.center.y));
}

/**
 * drop random amount of coins.
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.m_dropCoins = function () {
  for (var i = 0; i < rune.util.Math.randomInt(1, 6); i++) {
    var x = this.center.x + rune.util.Math.randomInt(-20, 20);
    var y = this.center.y + rune.util.Math.randomInt(-20, 20);
    this.application.scenes.selected.coins.addMember(new howlkraul.drops.Coin(x, y));
  }
}

/**
 * drops a bomb.
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.m_dropBomb = function () {
  this.application.scenes.selected.bombs.addMember(new howlkraul.drops.Bomb(this.center.x, this.center.y));
}

/**
 * Change animation frame on damage.
 * 
 * @protected
 * @returns {undefined}
 */
howlkraul.room.Furniture.prototype.m_changeFrame = function () {
  this.animation.gotoNextFrame();
}

/**
 * Init velocity.
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.m_initVelocity = function () {
  this.immovable = true;
}

//--------------------------------------------------------------------------
// Abstract Methods
//--------------------------------------------------------------------------

/**
 * Initializes animations.
 * 
 * @protected
 * @abstract
 * @returns {undefined}
 */
howlkraul.room.Furniture.prototype.m_initAnimations = function () {
  //OVERIDE IN SUB CLASS
}

/**
 * Initializes sounds.
 * 
 * @protected
 * @abstract
 * @returns {undefined}
 */
howlkraul.room.Furniture.prototype.initSounds = function () {
  //OVERIDE IN SUB CLASS
}

