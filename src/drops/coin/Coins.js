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
   * The scene that the group is part of.
   * 
   * @private
   * @type {rune.scene.Scene}
  */
  this.m_scene = scene;

  /**
   * Pool of coin sounds.
   * 
   * @private
   * @type {howlkraul.util.SoundPool}
   */
  this.m_sound = null;
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
 * @param {number} step - The current tick.
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
  this.m_sound = null;
  this.m_scene = null;

  rune.display.DisplayGroup.prototype.dispose.call(this);
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initializes sounds and adding them to the sound pool.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.m_initSounds = function () {
  this.m_sound = new howlkraul.utils.SoundPool(this.application, "sfx_coin", 10)
}

/**
 * Callback function when player walks over coin.
 * 
 * @private
 * @param {howlkraul.entity.Wizard} player - the player.
 * @param {howlkraul.drops.Coin} coin - the coin. 
 * @returns {undefined}
 */
howlkraul.drops.Coins.prototype.m_handlePickUp = function (player, coin) {
  this.m_sound.play(true);
  player.stats.addCoin();
  this.m_scene.moneyCounter.add(coin.worth);
  this.removeMember(coin, true);
}