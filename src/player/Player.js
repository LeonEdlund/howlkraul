howlkraul.player.Player = function (character) {
  this.characterChoice = "";
  this.characterInstance = null;
  this.controllers = controllers;

  // DEFAULT SPAWN VALUES - can be overritten
  this.spawnX = 50;
  this.spawnY = 50;

  this.init();
}

Object.defineProperty(howlkraul.player.Player, "character", {
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
    this.controllers = this.characterInstance.application.scene.selected.gamepads;
  }
}

