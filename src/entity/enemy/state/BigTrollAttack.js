/**
 * Represents a state where the enemy attacks the closest player on the scene. 
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The Attack state is used to make enemies go in to attack mode. 
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
 * @override
*/
howlkraul.entity.BigTrollAttack.prototype.onEnter = function () {
  console.log("throw")
  this.owner.speed = 0;
  this.owner.animation.gotoAndPlay("throw", [0]);
};