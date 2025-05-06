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

howlkraul.room.FurnitureGroup.prototype.init = function () {
  rune.display.DisplayGroup.prototype.init.call(this);

  this.m_initEmmiters();
}

howlkraul.room.FurnitureGroup.prototype.update = function (step) {
  rune.display.DisplayGroup.prototype.update.call(this, step);

  this.m_handleProjectileHit();
  this.m_handleCollisonHit();
}

howlkraul.room.FurnitureGroup.prototype.dispose = function () {
  rune.display.DisplayGroup.prototype.dispose.call(this);

  this.application.scenes.selected.stage.removeChild(this.m_vaseEmitter);
  this.application.scenes.selected.stage.removeChild(this.m_tableEmitter);

  this.m_scene = null;
  this.m_furniture = null;
  this.m_vaseEmitter = null;
  this.m_tableEmitter = null;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

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
    particles: [howlkraul.particle.TablePiece]
  });

  this.application.scenes.selected.stage.addChild(this.m_vaseEmitter);
  this.application.scenes.selected.stage.addChild(this.m_tableEmitter);
}

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

/**
 * Checks for collisions between spells/arrows and funiture in the group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.m_handleProjectileHit = function () {
  var spells = this.application.scenes.selected.spells;
  var enemyProjectile = this.application.scenes.selected.enemyProjectiles;

  this.hitTestAndSeparateGroup(spells, this.m_handleDamage, this);
  this.hitTestAndSeparateGroup(enemyProjectile, this.m_handleDamage, this);
}

/**
 * Callback function for hits.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.m_handleDamage = function (target, projectile) {
  var spells = this.application.scenes.selected.spells;
  var enemyProjectile = this.application.scenes.selected.enemyProjectiles;

  if (projectile instanceof howlkraul.projectile.Spell) {
    spells.removeMember(projectile);
  } else if (projectile instanceof howlkraul.projectile.Arrow) {
    enemyProjectile.removeMember(projectile)
  }

  target.takeDamage();

  if (target.destroyed) {
    this.m_emitDebre(target)
    target.dropLoot();
    this.removeMember(target, true);
  }
}

/**
 * Handles coillision between player/enemy and furniture in the group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.m_handleCollisonHit = function () {
  var players = this.application.scenes.selected.players;
  var enemies = this.application.scenes.selected.enemies;

  this.hitTestAndSeparateGroup(players);
  this.hitTestAndSeparateGroup(enemies);
}

/**
 * Emmits debree based on furniture type.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.room.FurnitureGroup.prototype.m_emitDebre = function (furniture) {

  if (furniture instanceof howlkraul.room.Table) {
    this.m_tableEmitter.moveTo(furniture.center.x, furniture.center.y);
    this.m_tableEmitter.emit(5);
  } else if (furniture instanceof howlkraul.room.Vase) {
    this.m_vaseEmitter.moveTo(furniture.center.x, furniture.center.y);
    this.m_vaseEmitter.emit(5);
  }
}
