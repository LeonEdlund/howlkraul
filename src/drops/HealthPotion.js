/**
 * Represents a HealthPotion. 
 * 
 * @class
 * @classdesc - Creates a instance of a HealthPotion.
 * @param {number} x - X position
 * @param {number} y - Y position
 */
howlkraul.drops.HealthPotion = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x || 0, y || 0, 10, 10);


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

Object.defineProperty(howlkraul.drops.HealthPotion.prototype, "healingPower", {
  /**
   * The potions worth
   * 
   * @returns {number}
   */
  get: function () {
    return this.m_healingPower;
  },

  /**
   * Set potions worth
   * 
   * @param {number} value
   * @returns {number}
   */
  set: function (value) {
    this.m_healingPower = value;
  }
});

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.drops.HealthPotion.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.backgroundColor = "red";
}