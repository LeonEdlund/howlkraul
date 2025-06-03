/**
 * Represents a state where the main menu overlayes the character selection.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The menu over character selection. 
 */
howlkraul.scene.CSMenu = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "CSMenu");

  /**
   * Main Menu
   * 
   * @private
   * @type {howlkraul.ui.MainMenu}
   */
  this.m_menu = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.scene.CSMenu.prototype = Object.create(rune.state.State.prototype);
howlkraul.scene.CSMenu.prototype.constructor = howlkraul.scene.CSMenu;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Run once when object is instantiated.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.CSMenu.prototype.init = function () {
  this.m_menu = new howlkraul.ui.MainMenu();
  this.owner.stage.addChild(this.m_menu);
};

/**
 * Runs when state is deselected.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.scene.CSMenu.prototype.onExit = function () {
  this.owner.stage.removeChild(this.m_menu);
};