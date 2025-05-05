howlkraul.room.FurnitureGroup = function (scene) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.display.DisplayGroup.call(this, scene);

  /**
   * The health.
   * 
   * @protected
   * @type {rune}
  */
  this.m_scene = scene;

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
  rune.display.DisplayGroup.prototype.init.call(this);
}

howlkraul.room.FurnitureGroup.prototype.update = function (step) {
  rune.display.DisplayGroup.prototype.update.call(this, step);
  this.m_handleProjectileHit();
}

howlkraul.room.FurnitureGroup.prototype.dispose = function () {
  rune.display.DisplayGroup.prototype.dispose.call(this);
  this.m_furniture = null;
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Spawns random furniture to the scene.
 * If furniture is already placed they are respawned.
 */
howlkraul.room.FurnitureGroup.prototype.spawnRandomFurniture = function () {
  this.removeMembers(true);
  this.m_furniture = [];

  this.m_generateFurniture(2, "table");
  this.m_generateFurniture(8, "vase");

  for (var j = 0; j < this.m_furniture.length; j++) {
    this.addMember(this.m_furniture[j]);
  }

}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * 
 * @param {number} maxAmount 
 * @param {string} type -  
 */
howlkraul.room.FurnitureGroup.prototype.m_generateFurniture = function (maxAmount, type) {
  var possibleFurniture = {
    table: howlkraul.room.Table,
    vase: howlkraul.room.Vase,
  }

  var lastTablePosition = new rune.geom.Point(0, 0);

  // @note Spawn tables
  for (var i = 0; i < maxAmount; i++) {
    if (!rune.util.Math.chance(20)) continue;

    randomPosition = new rune.geom.Point(rune.util.Math.randomInt(50, 300), rune.util.Math.randomInt(50, 180));

    if (rune.geom.Point.distance(randomPosition.x, randomPosition.y, lastTablePosition.x, lastTablePosition.y) > 80) {
      this.m_furniture.push(new possibleFurniture[type](randomPosition.x, randomPosition.y));
    }

    lastTablePosition.x = randomPosition.x;
    lastTablePosition.y = randomPosition.y;
  }
}

howlkraul.room.FurnitureGroup.prototype.m_handleProjectileHit = function () {
  var spells = this.application.scenes.selected.spells;

  this.hitTestGroup(spells, function (target, spell) {
    spells.removeMember(spell);

    target.takeDamage();

    if (target.destroyed) {
      target.dropHpPotion();
      this.removeMember(target, true);
    }
  }, this)
}
