/**
 * Represents a state where the big troll throws a bomb
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The BigTrollAttack state is to make the big troll throw.
 */
howlkraul.entity.BigTrollAttack = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "BigTrollAttack");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.BigTrollAttack.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.BigTrollAttack.prototype.constructor = howlkraul.entity.BigTrollAttack;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Runs when state is selected
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.entity.BigTrollAttack.prototype.onEnter = function () {
  this.owner.speed = 0;
  this.owner.animation.gotoAndPlay("throw", [0]);
};