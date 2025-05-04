howlkraul.room.FurnitureGroup = function (scene) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.display.DisplayGroup.call(this, scene);

  console.log(this.container)
  /**
   * The health.
   * 
   * @protected
   * @type {array <howlkraul.room.Furniture>}
   */
  this.m_furniture = [];
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.FurnitureGroup.prototype = Object.create(rune.display.DisplayGroup.prototype);
howlkraul.room.FurnitureGroup.prototype.constructor = howlkraul.room.FurnitureGroup;

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

howlkraul.room.FurnitureGroup.prototype.init = function () {
  rune.display.DisplayGroup.prototype.call(this);
}

howlkraul.room.FurnitureGroup.prototype.update = function (step) {
  rune.display.DisplayGroup.prototype.call(this, step);
  //this.m_handleProjectileHit();
}

howlkraul.room.FurnitureGroup.prototype.dispose = function () {
  rune.display.DisplayGroup.prototype.call(this);
  this.m_furniture = null;
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.room.FurnitureGroup.prototype.spawnRandomFurniture = function () {
  this.removeMembers(true);

  // @note Spawn tables
  for (var i = 0; i < 2; i++) {
    if (rune.util.Math.chance(40)) {
      this.m_furniture.push(new howlkraul.room.Table(
        rune.util.Math.randomInt(50, 350),
        rune.util.Math.randomInt(50, 200)));
    }
  }

  for (var j = 0; j < this.m_furniture.length; j++) {
    this.addMember(this.m_furniture[j]);
  }
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------


// howlkraul.room.FurnitureGroup.prototype.m_handleProjectileHit = function () {
//   if (this.game.players) { }
// }
