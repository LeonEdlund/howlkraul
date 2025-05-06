/**
 * Represents a state where the enemy follows the closest player on the scene. 
 * 
 * @class
 * @classdesc - Creates a instance of a Attack.
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
howlkraul.entity.Attack.prototype.init = function () {
  rune.state.State.prototype.init.call(this);
};

/**
 * @override
*/
howlkraul.entity.Attack.prototype.update = function () {
  rune.state.State.prototype.update.call(this);
  this.m_attack();
};

/**
 * @override
 */
howlkraul.entity.Attack.prototype.m_attack = function () {
  switch (this.owner.facing) {
    case "side":
      this.owner.animation.gotoAndPlay("s-side");
      break;
    case "up":
      this.owner.animation.gotoAndPlay("s-up");
      break;
    case "down":
      this.owner.animation.gotoAndPlay("s");
  }
};