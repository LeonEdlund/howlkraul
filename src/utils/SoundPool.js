/**
 * Creates a new SoundPool.
 *
 * @constructor
 * 
 * @param {howlkraul.media.SoundChannel} channel - Referense to the soundchannel
 * @param {string} soundID - The name of the sound resource.
 * @param {number} capacity - How many sounds that should be instansiated.
 * 
 * @class
 * @classdesc
 * 
 * Represents a object that stores multiple instanses of sounds so the can played at the same time.  
 */
howlkraul.utils.SoundPool = function (channel, soundID, capacity) {
  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * Reference to the soundchannel where the sounds should be added.
   * 
   * @private
   * @type {howlkraul.media.SoundChannel}  
   */
  this.m_channel = channel;

  /**
   * The id of the sound.
   * 
   * @private
   * @type {string}  
   */
  this.m_soundID = soundID;

  /**
   * How many sounds that should be instansiated.
   * 
   * @private
   * @type {number}  
   */
  this.m_capacity = capacity || 5;

  /**
   * All instansiated sounds.
   * 
   * @private
   * @type {array}  
   */
  this.m_soundPool = [];

  /**
   * The index of the current sound that should be played.
   * 
   * @private
   * @type {array}  
   */
  this.m_currentIndex = 0;

  //--------------------------------------------------------------------------
  // Init
  //--------------------------------------------------------------------------
  this.m_initSounds();
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Play a sound from the pool.
 * 
 * @public
 * @param {boolean} reStart - True if thea sound should restart, false if not. 
 * @returns {undefined}
 */
howlkraul.utils.SoundPool.prototype.play = function (reStart) {
  this.m_currentIndex++;
  this.m_currentIndex = rune.util.Math.wrap(this.m_currentIndex, 0, this.m_soundPool.length - 1);

  if (this.m_soundPool[this.m_currentIndex]) {
    this.m_soundPool[this.m_currentIndex].play(reStart);
  }
}

/**
 * Clean up resources.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.utils.SoundPool.prototype.dispose = function () {
  var m_this = this;

  this.m_soundPool.forEach(function (sound) {
    m_this.m_channel.remove(sound, true);
  });

  this.m_application = null;
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Instantiate sounds and ad them to the pool.
 * 
 * @public
 * @param {boolean} reStart - True if thea sound should restart, false if not. 
 * @returns {undefined}
 */
howlkraul.utils.SoundPool.prototype.m_initSounds = function () {
  for (var i = 0; i < this.m_capacity; i++) {
    var sound = this.m_channel.get(this.m_soundID, true);
    if (sound) {
      this.m_soundPool.push(sound);
    }
  }
}