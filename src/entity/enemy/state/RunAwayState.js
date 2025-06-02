/**
 * Represents a state where the enemy runs away from the closest player on the scene. 
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The RunAway State is used to make enemies run away from the closest player.
 */
howlkraul.entity.RunAwayState = function () {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.state.State.call(this, "RunAway");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.RunAwayState.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.RunAwayState.prototype.constructor = howlkraul.entity.RunAwayState;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Updates the state on each frame.
 * 
 * @override
 * @public
 * @param {number} step - Current time step.
 * @returns {undefined}
*/
howlkraul.entity.RunAwayState.prototype.update = function () {
  this.m_runAwayFromPlayer();
};

/**
 * Runs when state is selected
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.entity.RunAwayState.prototype.onEnter = function () {
  this.owner.speed = this.owner.defaultSpeed + 0.5;
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * The enemy runs away from the closest player.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.RunAwayState.prototype.m_runAwayFromPlayer = function () {
  var tX = this.owner.centerX;
  var tY = this.owner.centerY;
  var pX = this.owner.closestPlayer.centerX;
  var pY = this.owner.closestPlayer.centerY;

  var distanceX = rune.util.Math.abs(tX - pX);
  var distanceY = rune.util.Math.abs(tY - pY);

  if (distanceX > distanceY) {

    if (tX < pX) {
      this.owner.moveLeft();
    } else if (tX > pX) {
      this.owner.moveRight();
    }

    this.owner.velocity.y = 0;

  } else if (distanceY > distanceX) {

    if (tY < pY) {
      this.owner.moveUp();
    } else if (tY > pY) {
      this.owner.moveDown();
    }

    this.owner.velocity.x = 0;
  }
};