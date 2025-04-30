howlkraul.room.Furniture = function (x, y, width, height, texture) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.display.Sprite.call(this, x || 0, y || 0, width, height, texture);

  /**
   * The health.
   * 
   * @protected
   * @type {number}
   */
  this.m_health = 8;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.Furniture.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.room.Furniture.prototype.constructor = howlkraul.room.Furniture;

//--------------------------------------------------------------------------
// Getters and Setters
//--------------------------------------------------------------------------

Object.defineProperty(howlkraul.room.Furniture.prototype, "health", {
  get: function () {
    return this.m_health;
  }
});

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

howlkraul.room.Furniture.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimations();
}

howlkraul.room.Furniture.prototype.update = function () {
  rune.display.Sprite.prototype.update.call(this);
  this.m_checkDamage()
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.room.Furniture.prototype.takeDamage = function () {
  this.m_health -= 1;
  this.m_changeFrame();
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.room.Furniture.prototype.m_checkDamage = function () {
  if (this.m_health <= 0) {
    //this.group.removeMember(true);
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