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
howlkraul.scene.CSPlaying = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "CSPlaying");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.scene.CSPlaying.prototype = Object.create(rune.state.State.prototype);
howlkraul.scene.CSPlaying.prototype.constructor = howlkraul.scene.CSPlaying;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.scene.CSPlaying.prototype.update = function (step) {
  if (!this.owner.playerOne) {
    this.owner.m_moveP1Selector();
  }

  if (this.owner.twoPlayer && !this.owner.playerTwo) {
    this.owner.m_moveP2Selector();
  }

  if (this.owner.playerOne && !this.owner.twoPlayer || this.owner.playerOne && this.owner.playerTwo) {
    if (!this.owner.enviroment.gateOpen) {
      this.owner.m_sound.fade(0, 3000);
      this.owner.enviroment.openDoor();

    }
    this.owner.m_checkIfGameStarted();
  }

  this.owner.enviroment.borders.hitTestAndSeparateContentOf(this.owner.m_allActivePlayers, this);
};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.scene.CSPlaying.prototype.onEnter = function () {
  this.owner.initSelectors();
};

