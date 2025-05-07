/**
 * Creates a new FurnitureGroup object.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rune.scene.Scene} scene - The scene where the group should be added.
 * 
 * @class
 * @classdesc
 *
 * Represents a group of furniture.
 */
howlkraul.room.FurnitureGroup = function (scene) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.DisplayGroup.call(this, scene);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

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

  /**
   * Emitter for vase.
   * 
   * @private
   * @type {rune.particle.Emitter}
   */
  this.m_vaseEmitter = null;

  /**
   * Emitter for table.
   * 
   * @private
   * @type {rune.particle.Emitter}
   */
  this.m_tableEmitter = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.room.FurnitureGroup.prototype = Object.create(rune.display.DisplayGroup.prototype);
howlkraul.room.FurnitureGroup.prototype.constructor = howlkraul.room.FurnitureGroup;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Spawns random furniture to the scene.
 * If furniture is already placed they are respawned.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.spawnRandomFurniture = function () {
  this.removeMembers(true);
  this.m_furniture = [];

  this.m_generateFurniture(1, "table");
  this.m_generateFurniture(5, "vase");

  for (var j = 0; j < this.m_furniture.length; j++) {
    this.addMember(this.m_furniture[j]);
  }
}

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.room.FurnitureGroup.prototype.init = function () {
  rune.display.DisplayGroup.prototype.init.call(this);

  this.m_initEmmiters();
}

/**
 * @override
 */
howlkraul.room.FurnitureGroup.prototype.update = function (step) {
  rune.display.DisplayGroup.prototype.update.call(this, step);

  this.m_handleCollisonHit();
}

/**
 * @override
 */
howlkraul.room.FurnitureGroup.prototype.dispose = function () {
  rune.display.DisplayGroup.prototype.dispose.call(this);

  this.application.scenes.selected.stage.removeChild(this.m_vaseEmitter, true);
  this.application.scenes.selected.stage.removeChild(this.m_tableEmitter, true);

  this.m_scene = null;
  this.m_furniture = null;
  this.m_vaseEmitter = null;
  this.m_tableEmitter = null;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initializes emitters.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.m_initEmmiters = function () {
  this.m_vaseEmitter = new rune.particle.Emitter(0, 0, 19, 29, {
    capacity: 5,
    accelerationY: 0.05,
    maxVelocityX: 1.25,
    minVelocityX: -1.25,
    maxVelocityY: -1.25,
    minVelocityY: -0.85,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 1000,
    maxLifespan: 1200,
    particles: [howlkraul.particle.VasePiece]
  });

  this.m_tableEmitter = new rune.particle.Emitter(0, 0, 47, 35, {
    capacity: 7,
    accelerationY: 0.05,
    maxVelocityX: 1.25,
    minVelocityX: -1.25,
    maxVelocityY: -1.25,
    minVelocityY: -0.85,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 1000,
    maxLifespan: 1200,
    particles: [howlkraul.particle.TablePiece]
  });

  this.application.scenes.selected.stage.addChild(this.m_vaseEmitter);
  this.application.scenes.selected.stage.addChild(this.m_tableEmitter);
}

/**
 * Generates furniture.
 * 
 * @param {number} maxAmount - Max number of furniture.
 * @param {string} type - Type of furniture: "table", "vase".
 */
howlkraul.room.FurnitureGroup.prototype.m_generateFurniture = function (maxAmount, type) {
  var possibleFurniture = {
    table: howlkraul.room.Table,
    vase: howlkraul.room.Vase,
  }

  var lastPosition = new rune.geom.Point(0, 0);

  for (var i = 0; i < maxAmount; i++) {
    if (rune.util.Math.chance(20)) {
      rPosition = new rune.geom.Point(rune.util.Math.randomInt(50, 300), rune.util.Math.randomInt(50, 180));

      var farEnoughAway = rune.geom.Point.distance(rPosition.x, rPosition.y, lastPosition.x, lastPosition.y) > 80

      if (farEnoughAway) {
        this.m_furniture.push(new possibleFurniture[type](rPosition.x, rPosition.y));
      }

      // Save last position
      lastPosition.x = rPosition.x;
      lastPosition.y = rPosition.y;
    }
  }
}

/**
 * Handles coillision on furniture.
 * 
 * @private
 * @returns {undefined}
*/
howlkraul.room.FurnitureGroup.prototype.m_handleCollisonHit = function () {
  var players = this.application.scenes.selected.players;
  var enemies = this.application.scenes.selected.enemies;
  var spells = this.application.scenes.selected.spells;
  var enemyProjectile = this.application.scenes.selected.enemyProjectiles;

  // PLAYERS
  this.hitTestAndSeparateGroup(players);
  this.hitTestAndSeparateGroup(enemies, this.m_handleDamage, this);

  // PROJECTILES
  this.hitTestGroup(spells, this.m_handleDamage, this);
  this.hitTestGroup(enemyProjectile, this.m_handleDamage, this);
}

/**
 * Callback function for hits.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.m_handleDamage = function (target, attacker) {
  var spells = this.application.scenes.selected.spells;
  var enemyProjectile = this.application.scenes.selected.enemyProjectiles;

  if (attacker instanceof howlkraul.projectile.Spell) {
    spells.removeMember(attacker, true);
  } else if (attacker instanceof howlkraul.projectile.Arrow) {
    enemyProjectile.removeMember(attacker, true)
  }

  if (attacker instanceof howlkraul.entity.Enemy) {
    target.takeDamageFromEnemy();
    attacker.attack();
  } else {
    target.takeDamage();
  }

  if (target.destroyed) {
    this.m_emitDebre(target)
    target.dropLoot();
    this.removeMember(target, true);
  }
}


/**
 * Emmits debree based on furniture type.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.m_emitDebre = function (furniture) {
  var emitter = null;

  if (furniture instanceof howlkraul.room.Table) {
    emitter = this.m_tableEmitter;
  } else if (furniture instanceof howlkraul.room.Vase) {
    emitter = this.m_vaseEmitter;
  }

  emitter.moveTo(furniture.center.x, furniture.center.y);
  emitter.emit(5);
}