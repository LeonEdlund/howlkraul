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
howlkraul.room.Furniture.prototype.dropHpPotion = function () {
  if (rune.util.Math.chance(30)) {
    this.application.scenes.selected.potions.addMember(new howlkraul.drops.HealthPotion(this.center.x, this.center.y));
  }
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