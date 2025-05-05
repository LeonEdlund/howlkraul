howlkraul.room.Furniture = function (x, y, width, height, texture, health) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.display.Sprite.call(this, x || 0, y || 0, width, height, texture);

  /**
   * The health of the furniture.
   * 
   * @protected
   * @type {number}
   */
  this.m_health = health;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.Furniture.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.room.Furniture.prototype.constructor = howlkraul.room.Furniture;

//--------------------------------------------------------------------------
// Getters and Setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.room.Furniture.prototype, "destroyed", {
  get: function () {
    if (this.m_health > 0) {
      return false;
    } else {
      return true;
    }
  }
});

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
*/
howlkraul.room.Furniture.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
  this.m_initVelocity();
}

/**
 * @inheritdoc
*/
howlkraul.room.Furniture.prototype.update = function () {
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
}

/**
 * Randomly drop health Potion.
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.dropLoot = function () {
  this.m_dropCoins();

  if (rune.util.Math.chance(30)) {
    this.m_dropHpPotion();
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
 * Init velocity.
 * 
 * @public
 * @returns {undefined} 
 */
howlkraul.room.Furniture.prototype.m_initVelocity = function () {
  this.immovable = true;
  // this.mass = 5;
  // this.velocity.max.x = 0.5;
  // this.velocity.max.y = 0.5;
  // this.velocity.drag.x = 0.9;
  // this.velocity.drag.y = 0.9;
  // this.acceleration = 0.05;
}

//--------------------------------------------------------------------------
// Abstract Methods
//--------------------------------------------------------------------------

howlkraul.room.Furniture.prototype.m_initAnimations = function () {
  //OVERIDE IN SUB CLASS
}

howlkraul.room.Furniture.prototype.m_changeFrame = function () {
  //OVERIDE IN SUB CLASS
}