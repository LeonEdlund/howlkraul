howlkraul.ui.Manabar = function (character) {
  this.m_character = character;

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.ui.Progressbar.call(this, this.m_character.width || 20, 2, "#cad4de", "#6697c4");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.Manabar.prototype = Object.create(rune.ui.Progressbar.prototype);
howlkraul.ui.Manabar.prototype.constructor = howlkraul.ui.Manabar;

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Set Manabar state.
 * 
 * @public
 * @param {number} state - 0: empty, 1: half, 2: full.
 * @returns {undefined}
 */
howlkraul.ui.Manabar.prototype.setHeart = function (state) {

};

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.ui.Manabar.prototype.init = function () {
  rune.ui.Progressbar.prototype.init.call(this);

  this.progress = this.m_character.mana / 100;
};

/**
 * @inheritdoc
 */
howlkraul.ui.Manabar.prototype.update = function (step) {
  rune.ui.Progressbar.prototype.init.call(this, step);

  this.m_followPlayer();
  this.m_handleEmptyMana();
  this.m_regenBar()
};

/**
 * @inheritdoc
 */
howlkraul.ui.Manabar.prototype.dispose = function () {
  rune.ui.Progressbar.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------


/**
 * @inheritdoc
 */
howlkraul.ui.Manabar.prototype.m_followPlayer = function () {
  if (this.m_character) {
    this.moveTo(this.m_character.bottomLeft.x, this.m_character.bottomLeft.y + 2);
  }
};

howlkraul.ui.Manabar.prototype.m_handleEmptyMana = function () {
  if (this.m_character && this.m_character.mana <= 1) {
    this.forgroundColor = "red";
  }
}

howlkraul.ui.Manabar.prototype.m_regenBar = function () {
  if (this.m_character) {
    this.progress = this.m_character.mana / 100;

    if (this.m_character.mana >= 100) {
      if (this.forgroundColor !== "#6697c4") {
        this.forgroundColor = "#6697c4";
      }
    }
  }
}