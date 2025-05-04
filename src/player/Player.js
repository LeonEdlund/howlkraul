howlkraul.player.Player = function (character, spawnX, spawnY, color) {
  this.characterChoice = character || "";
  this.m_color = color || null;
  this.characterInstance = null;
  this.m_lastHp = null;

  this.gamepads = null;
  this.keyboard = null;

  this.spawnX = spawnX;
  this.spawnY = spawnY;

  this.m_hud = null;

  this.init();
}

Object.defineProperty(howlkraul.player.Player.prototype, "character", {
  get: function () {
    if (this.characterInstance) {
      return this.characterInstance;
    }
  }
})

Object.defineProperty(howlkraul.player.Player.prototype, "hud", {
  get: function () {
    return this.m_hud;
  }
})

howlkraul.player.Player.prototype.init = function () {
  this.m_createCharacter();
  this.m_getControllers();
  this.m_initHud();
};

howlkraul.player.Player.prototype.update = function () {
  var input = this.m_getInput();

  if (this.characterInstance) {
    this.characterInstance.move(input);
  }

  if (this.characterInstance.hp !== this.m_lastHp) {
    this.m_hud.updateHealth();
    this.m_lastHp = this.characterInstance.hp;
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
    case "archer":
      this.characterInstance = new howlkraul.entity.Archer(this.spawnX, this.spawnY);
      break;
    case "wizard":
    default:
      this.characterInstance = new howlkraul.entity.Wizard(this.spawnX, this.spawnY, this.m_color);
      break;
  }

  this.m_lastHp = this.characterInstance.hp;
}

howlkraul.player.Player.prototype.m_getControllers = function () {
  if (this.characterInstance) {
    this.gamepads = this.characterInstance.application.scenes.selected.gamepads;
    this.keyboard = this.characterInstance.application.scenes.selected.keyboard;
  }
}

howlkraul.player.Player.prototype.m_initHud = function () {
  //OVERIDE IN CHILD CLASS
}
