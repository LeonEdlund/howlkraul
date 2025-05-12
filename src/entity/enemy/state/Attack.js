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
  rune.state.State.prototype.onEnter.call(this);

  var animation = "";

  switch (this.owner.facing) {
    case "up":
      animation = "s-up";
      break;
    case "side":
      animation = "s-side";
      break;
    case "down":
      animation = "s";
      break;
  }

  this.owner.animation.gotoAndPlay(animation);

  if (this.owner.m_clothes) {
    this.owner.m_clothes.setAnimation(animation);
  }
};