howlkraul.utils.SoundPool = function (application, soundID, capacity) {
  this.m_application = application;
  this.m_soundID = soundID;
  this.m_capacity = capacity || 5;
  this.m_soundPool = [];
  this.m_currentIndex = 0;

  this.m_init();
}

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.utils.SoundPool.prototype.play = function (reStart) {
  this.m_currentIndex++;
  this.m_currentIndex = rune.util.Math.wrap(this.m_currentIndex, 0, this.m_soundPool.length - 1);

  if (this.m_soundPool[this.m_currentIndex]) {
    this.m_soundPool[this.m_currentIndex].play(reStart);
  }
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.utils.SoundPool.prototype.m_init = function () {
  this.m_initSounds();
}

howlkraul.utils.SoundPool.prototype.m_initSounds = function () {
  for (var i = 0; i < this.m_capacity; i++) {
    var sound = this.m_application.sounds.sound.get(this.m_soundID, true);

    if (sound) {
      this.m_soundPool.push(sound);
    }
  }
}
