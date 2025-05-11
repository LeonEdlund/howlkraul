/**
 * Creates a new Bomb Group.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rune.scene.Scene} scene - The scene where the group should be added.
 * 
 * @class
 * @classdesc
 *
 * Represents a group of Bombs.
 */
howlkraul.drops.Bombs = function (scene) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.DisplayGroup.call(this, scene.stage);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * The scene.
   * 
   * @protected
   * @type {rune}
  */
  this.m_scene = scene;

  /**
   * Emitter for bomb fragments.
   * 
   * @private
   * @type {rune.particle.Emitter}
   */
  this.m_emitter = null;

  /**
 * Emitter for bomb fragments.
 * 
 * @private
 * @type {rune.particle.Emitter}
 */
  this.m_smokeEmitter = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.drops.Bombs.prototype = Object.create(rune.display.DisplayGroup.prototype);
howlkraul.drops.Bombs.prototype.constructor = howlkraul.drops.Bombs;

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Emitt bombfragments.
 * 
 * @private
 * @param {rune.geom.Vector2D} cordinates - from where the emitter should explode.
 * @returns {undefined}
 */
howlkraul.drops.Bombs.prototype.explode = function (cordinates) {
  this.m_emitter.moveTo(cordinates.x, cordinates.y);
  this.m_smokeEmitter.moveTo(cordinates.x, cordinates.y);
  this.m_cloudEmitter.moveTo(cordinates.x, cordinates.y);

  this.m_emitter.emit(30);
  this.m_smokeEmitter.emit(30);
  this.m_cloudEmitter.emit(10);

  this.application.scenes.selected.cameras.getCameraAt(0).shake.start(200);
}

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.drops.Bombs.prototype.init = function () {
  rune.display.DisplayGroup.prototype.init.call(this);

  this.m_initEmitter();
}

/**
 * @override
 */
howlkraul.drops.Bombs.prototype.update = function (step) {
  rune.display.DisplayGroup.prototype.update.call(this, step);

  if (this.m_emitter.numParticles) {
    var particles = this.m_emitter.getParticles(true)
    this.m_scene.enemies.hitTestContentOf(particles, this.m_handleDamage, this);
    this.m_scene.players.hitTestContentOf(particles, this.m_handleDamage, this);
  }
}

/**
 * @override
 */
howlkraul.drops.Bombs.prototype.dispose = function () {
  rune.display.DisplayGroup.prototype.dispose.call(this);

  this.m_scene.stage.removeChild(this.m_emitter, true);
  this.m_scene.stage.removeChild(this.m_smokeEmitter, true);
  this.m_scene.stage.removeChild(this.m_cloudEmitter, true);
  this.m_scene = null;
  this.m_emitter = null;
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
howlkraul.drops.Bombs.prototype.m_initEmitter = function () {
  this.m_emitter = new rune.particle.Emitter(this.x, this.y, 10, 10, {
    capacity: 30,
    accelerationY: 0,
    maxVelocityX: 3,
    minVelocityX: -3,
    maxVelocityY: 3,
    minVelocityY: -3,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 700,
    maxLifespan: 700,
    particles: [howlkraul.particle.BombFragment]
  });

  this.m_smokeEmitter = new rune.particle.Emitter(this.x, this.y, 10, 10, {
    capacity: 30,
    accelerationY: 0,
    maxVelocityX: 1,
    minVelocityX: -1,
    maxVelocityY: 0.5,
    minVelocityY: -0.5,
    minRotation: -2,
    maxRotation: 2,
    minLifespan: 500,
    maxLifespan: 800,
    particles: [howlkraul.particle.Smoke]
  });

  this.m_cloudEmitter = new rune.particle.Emitter(this.x, this.y, 20, 20, {
    capacity: 10,
    maxVelocityX: 0.1,
    minVelocityX: -0.1,
    maxVelocityY: 0.1,
    minVelocityY: -0.1,
    minRotation: -0.1,
    maxRotation: 0.2,
    minLifespan: 700,
    maxLifespan: 1000,
    particles: [howlkraul.particle.Smoke]
  });

  this.m_scene.stage.addChild(this.m_emitter);
  this.m_scene.stage.addChild(this.m_smokeEmitter);
  this.m_scene.stage.addChild(this.m_cloudEmitter);
}

/**
 * Handle damage and removes particle from scene.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Bombs.prototype.m_handleDamage = function (target, fragment) {
  if (target instanceof howlkraul.entity.Enemy) {
    target.takeDamage(50);
  } else if (target instanceof howlkraul.entity.Wizard) {
    target.takeDamage();
  }

  this.m_emitter.parent.removeChild(fragment);
}