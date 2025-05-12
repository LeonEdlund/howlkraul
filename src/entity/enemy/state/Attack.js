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
howlkraul.entity.Attack = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "Attack");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.entity.Attack.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.Attack.prototype.constructor = howlkraul.entity.Attack;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * @override
*/
howlkraul.entity.Attack.prototype.onEnter = function () {
  switch (this.owner.facing) {
    case "up":
      this.owner.animation.gotoAndPlay("s-up");
      break;
    case "side":
      this.owner.animation.gotoAndPlay("s-side");
      break;
    case "down":
      this.owner.animation.gotoAndPlay("s");
      break;
  }
};