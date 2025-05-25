/**
 * Creates a new Coin Group.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rune.scene.Scene} scene - The scene where the group should be added.
 * 
 * @class
 * @classdesc
 *
 * Represents a group of Coins.
 */
howlkraul.drops.Coins = function (scene) {
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
   * Pool of coin sounds.
   * 
   * @private
   * @type {rune.particle.Emitter}
   */
  this.m_soundPool = [];

  /**
   * Current sound to play.
   * 
   * @private
   * @type {number}
   */
  this.m_currentSoundIndex = 0;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.drops.Coins.prototype = Object.create(rune.display.DisplayGroup.prototype);
howlkraul.drops.Coins.prototype.constructor = howlkraul.drops.Coins;

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * Runs when group is instansiated.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.init = function () {
  rune.display.DisplayGroup.prototype.init.call(this);

  this.m_initSounds();
}

/**
 * Runs every frame.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.update = function (step) {
  rune.display.DisplayGroup.prototype.update.call(this, step);

  if (this.numMembers > 0) {
    this.m_scene.players.hitTestGroup(this, this.m_handlePickUp, this);
  }
}

/**
 * Cleans up resources.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.dispose = function () {
  var m_this = this;
  // Remove sounds
  this.m_soundPool.forEach(function (sound) {
    m_this.application.sounds.sound.remove(sound, true);
  });

  this.m_scene = null;

  rune.display.DisplayGroup.prototype.dispose.call(this);
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initializes sounds and adding them to the sound pool
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.m_initSounds = function () {
  if (this.m_soundPool.length > 10) return;

  for (var i = 0; i < 10; i++) {
    var sound = this.application.sounds.sound.get("sfx_coin", true);
    this.m_soundPool.push(sound);
  }
}

/**
 * Handle damage and removes particle from scene.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.m_handlePickUp = function (player, coin) {
  this.m_playSound();
  player.stats.addCoin();
  this.m_scene.moneyCounter.add(coin.worth);
  this.removeMember(coin, true);
}

/**
 * Plays coin pick up sound.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.m_playSound = function () {
  this.m_currentSoundIndex++;
  this.m_currentSoundIndex = rune.util.Math.wrap(this.m_currentSoundIndex, 0, this.m_soundPool.length - 1);
  this.m_soundPool[this.m_currentSoundIndex].play(true);
}