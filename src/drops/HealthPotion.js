/**
 * Creates a new HealthPotion object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number} x - X position
 * @param {number} y - Y position
 * 
 * @class
 * @classdesc
 *
 * Creates an instance of a HealthPotion that can be placed on the stage.
 */
howlkraul.drops.HealthPotion = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 14, 20, "health_potion_14x20");


  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * The potions healing power.
   * 
   * @private
   * @type {number}
   */
  this.m_healingPower = 2;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.drops.HealthPotion.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.drops.HealthPotion.prototype.constructor = howlkraul.drops.HealthPotion;

//--------------------------------------------------------------------------
// Getters And Setters
//--------------------------------------------------------------------------

/**
 * The potions healing power.
 *
 * @member {number} healingPower
 * @memberof howlkraul.drops.HealthPotion
 * @instance
 */
Object.defineProperty(howlkraul.drops.HealthPotion.prototype, "healingPower", {
  /**
   * @this howlkraul.drops.HealthPotion
   * @ignore
   */
  get: function () {
    return this.m_healingPower;
  },

  /**
   * @this howlkraul.drops.HealthPotion
   * @ignore
   */
  set: function (value) {
    this.m_healingPower = value;
  }
});

/**
 * Play drinking sound.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.drops.HealthPotion.prototype.playSound = function () {
  var sounds = ["sfx_hp_drink", "sfx_hp_drink2"];
  var i = rune.util.Math.randomInt(0, sounds.length - 1);
  this.application.sounds.sound.get(sounds[i]).play(true);
}

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Runs when the object is instantiated.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.drops.HealthPotion.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.m_initAnimations();
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initializes animations.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.HealthPotion.prototype.m_initAnimations = function () {
  this.animation.create("idle", [0, 1], 5, true);
}