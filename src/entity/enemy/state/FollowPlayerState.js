/**
 * Represents a state where the enemy follows the closest player on the scene. 
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The Attack state is used to make enemies follow the closest player. 
 */
howlkraul.entity.FollowPlayerState = function () {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  rune.state.State.call(this, "FollowPlayer");

}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.FollowPlayerState.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.FollowPlayerState.prototype.constructor = howlkraul.entity.FollowPlayerState;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Runs every frame.
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.entity.FollowPlayerState.prototype.update = function () {
  this.m_followPlayer();
};

/**
 * Runs when state is selected
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.entity.FollowPlayerState.prototype.onEnter = function () {
  this.owner.speed = this.owner.defaultSpeed;
  if (this.owner instanceof howlkraul.entity.Goblin) {
    this.owner.speed += 0.3;
  }
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * The enemy follows the closest player.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.FollowPlayerState.prototype.m_followPlayer = function () {
  var tX = this.owner.centerX;
  var tY = this.owner.centerY;
  var pX = this.owner.closestPlayer.centerX;
  var pY = this.owner.closestPlayer.centerY;

  var distanceX = rune.util.Math.abs(tX - pX);
  var distanceY = rune.util.Math.abs(tY - pY);

  if (distanceX > distanceY * 2) {

    if (tX > pX) {
      this.owner.moveLeft();
    } else if (tX < pX) {
      this.owner.moveRight();
    }

    this.owner.velocity.y = 0;

  } else if (distanceY > distanceX * 2) {

    if (tY > pY) {
      this.owner.moveUp();
    } else if (tY < pY) {
      this.owner.moveDown();
    }

    this.owner.velocity.x = 0;
  } else {

    if (tX > pX) {
      this.owner.moveLeft();
    } else if (tX < pX) {
      this.owner.moveRight();
    }

    if (tY > pY) {
      this.owner.moveUp();
    } else if (tY < pY) {
      this.owner.moveDown();
    }
  }
};