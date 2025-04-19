howlkraul.player.Player = function (character, spawnX, spawnY) {
  this.characterChoice = character || "";
  this.characterInstance = null;
  this.gamepads = null;
  this.keyboard = null;

  this.spawnX = spawnX;
  this.spawnY = spawnY;
  this.init();
}

Object.defineProperty(howlkraul.player.Player.prototype, "character", {
  get: function () {
    if (this.characterInstance) {
      return this.characterInstance;
    }
  }
})

howlkraul.player.Player.prototype.init = function () {
  this.m_createCharacter();
  this.m_getControllers();
};

howlkraul.player.Player.prototype.update = function () {
  var input = this.m_getInput();

  if (this.character) {
    this.character.move(input);
  }
};

howlkraul.player.Player.prototype.dispose = function () {
  this.characterChoice = null;
  this.characterInstance = null;
  this.gamepads = null;
  this.keyboard = null;
  this.spawnX = null;
  this.spawnY = null;
};


howlkraul.player.Player.prototype.m_getInput = function () {
  // OVERIDE IN CHILD CLASS
}

howlkraul.player.Player.prototype.m_createCharacter = function () {
  switch (this.characterChoice) {
    case "wizard":
    default:
      this.characterInstance = new howlkraul.entity.Wizard(this.spawnX, this.spawnY);
      break;
  }
}

howlkraul.player.Player.prototype.m_getControllers = function () {
  if (this.characterInstance) {
    this.gamepads = this.characterInstance.application.scenes.selected.gamepads;
    this.keyboard = this.characterInstance.application.scenes.selected.keyboard;
  }
}

