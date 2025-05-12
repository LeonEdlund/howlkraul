/**
 * Creates a new Enemies Group.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rune.scene.Scene} scene - The scene where the group should be added.
 * 
 * @class
 * @classdesc
 *
 * Represents a group of Enemies.
 */
howlkraul.entity.Enemies = function (scene) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.DisplayGroup.call(this, scene.stage);

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
   * Emitter for blood.
   * 
   * @private
   * @type {rune.particle.Emitter}
   */
  this.m_bloodEmitter = null;

  /**
   * Emitter for table.
   * 
   * @private
   * @type {rune.particle.Emitter}
   */
  this.m_goblinBodypartEmitter = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.Enemies.prototype = Object.create(rune.display.DisplayGroup.prototype);
howlkraul.entity.Enemies.prototype.constructor = howlkraul.entity.Enemies;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.Enemies.prototype.init = function () {
  rune.display.DisplayGroup.prototype.init.call(this);

  this.m_initEmitters();
}

/**
 * @override
 */
howlkraul.entity.Enemies.prototype.update = function (step) {
  rune.display.DisplayGroup.prototype.update.call(this, step);

  this.hitTestAndSeparateGroup(this.m_scene.spells, this.m_handleDamage, this);
}

/**
 * @override
 */
howlkraul.entity.Enemies.prototype.dispose = function () {
  rune.display.DisplayGroup.prototype.dispose.call(this);

  this.m_scene.stage.removeChild(this.m_bloodEmitter, true);
  this.m_scene.stage.removeChild(this.m_goblinBodypartEmitter, true);

  this.m_scene = null;
  this.m_bloodEmitter = null;
  this.m_goblinBodypartEmitter = null;
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
howlkraul.entity.Enemies.prototype.m_initEmitters = function () {
  this.m_bloodEmitter = new rune.particle.Emitter(this.x, this.y, 15, 15, {
    particles: [howlkraul.particle.Blood],
    minLifespan: 1000,
    maxLifespan: 1200,
    minRotation: -2,
    maxRotation: 2,
    capacity: 50,
    accelerationY: 0.05,
    maxVelocityX: 1.25,
    minVelocityX: -1.25,
    maxVelocityY: -1.25,
    minVelocityY: -0.85,
  });

  this.m_goblinBodypartEmitter = new rune.particle.Emitter(this.x, this.y, 15, 15, {
    capacity: 4,
    accelerationY: 0.05,
    maxVelocityX: 1.25,
    minVelocityX: -1.25,
    maxVelocityY: -1.25,
    minVelocityY: -0.85,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 1000,
    maxLifespan: 1200,
    particles: [
      howlkraul.particle.GoblinHead,
      howlkraul.particle.GoblinChunk,
    ]
  });

  this.m_scene.stage.addChild(this.m_bloodEmitter);
  this.m_scene.stage.addChild(this.m_goblinBodypartEmitter);
}

/**
 * Callback function for hits.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Enemies.prototype.m_handleDamage = function (enemy, spell) {
  enemy.takeDamage(spell.castedBy.power);
  spell.castedBy.controller.vibrate(100, 0.3, 0.6);
  this.m_scene.cameras.getCameraAt(0).shake.start(300, 1, 1);
  this.m_scene.spells.removeMember(spell, true);
}

/**
 * Emitts debree based on furniture type.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Enemies.prototype.explode = function (enemy) {
  if (enemy instanceof howlkraul.entity.Slime || enemy instanceof howlkraul.entity.Troll) {
    this.m_bloodEmitter.moveTo(enemy.center.x, enemy.center.y);
    this.m_bloodEmitter.emit(50);
  } else if (enemy instanceof howlkraul.entity.Goblin) {
    this.m_bloodEmitter.moveTo(enemy.center.x, enemy.center.y);
    this.m_bloodEmitter.emit(50);
    this.m_goblinBodypartEmitter.moveTo(enemy.center.x, enemy.center.y);
    this.m_goblinBodypartEmitter.emit(1);
  }
}

/**
 * Emitts debree based on furniture type.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.Enemies.prototype.bleed = function (enemy) {
  this.m_bloodEmitter.moveTo(enemy.center.x, enemy.center.y);
  this.m_bloodEmitter.emit(5);
}