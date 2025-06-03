/**
 * Creates a new Manabar instanse
 *
 * @constructor
 * @extends rune.ui.Progressbar
 * 
 * @param {howlkraul.entity.Wizard} character - The wizard the manabar should be connected to.
 * 
 * @class
 * @classdesc
 * 
 * Represents a manabar that is tied to a wizard and updates based on wizards mana-level.
 */
howlkraul.ui.Manabar = function (character) {

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * The wizard the manabar is tied to.
   * 
   * @type {howlkraul.entity.Wizard} 
   */
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
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Is run once when an instance is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Manabar.prototype.init = function () {
  rune.ui.Progressbar.prototype.init.call(this);

  this.progress = this.m_character.mana / 100;
};

/**
 * Runs every frame. 
 * 
 * @public
 * @param {number} step
 * @returns {undefined}
*/
howlkraul.ui.Manabar.prototype.update = function (step) {
  rune.ui.Progressbar.prototype.init.call(this, step);

  this.m_followPlayer();
  this.m_handleEmptyMana();
  this.m_regenBar()
};

/**
 * Dispose and clean up resources.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Manabar.prototype.dispose = function () {
  rune.ui.Progressbar.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------

/**
 * Make manabar folow with player.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Manabar.prototype.m_followPlayer = function () {
  if (this.m_character) {
    this.moveTo(this.m_character.bottomLeft.x, this.m_character.bottomLeft.y + 2);
  }
};

/**
 * Make manabar red if characters mana is 0.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Manabar.prototype.m_handleEmptyMana = function () {
  if (this.m_character && this.m_character.mana <= 1) {
    this.forgroundColor = "red";
  }
}

/**
 * Regenerate bar based of wizards mana every frame.
 * 
 * @private
 * @returns {undefined}
 */
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