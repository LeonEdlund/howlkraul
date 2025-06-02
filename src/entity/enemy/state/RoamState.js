/**
 * Represents a state where the enemy roams the map. 
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The state is used to make enemies roam the map.
 */
howlkraul.entity.RoamState = function () {
  //--------------------------------------------------------------------------
  // Super Call 
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "Roam");

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * When the next movement should happen. 
   * 
   * @private
   * @type {number}
   */
  this.m_endMoveTime = 0;

  /**
   * The function of the movement in the correct direction.
   * 
   * @private
   * @type {Function}
   */
  this.m_direction = null;

  /**
   * The index of the last direction.
   * 
   * @private
   * @type {number} 
   */
  this.m_directionIndex = 0;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.RoamState.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.RoamState.prototype.constructor = howlkraul.entity.RoamState;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Updates the state on each frame.
 * 
 * @override
 * @public
 * @param {number} step - Current time step.
 * @returns {undefined}
*/
howlkraul.entity.RoamState.prototype.update = function (step) {
  rune.state.State.prototype.update.call(this, step);

  if (!this.m_isStuck()) {
    this.m_roam();
  }
};

/**
 * Initializes the state when it becomes active.
 * 
 * @override
 * @public
 * @returns {undefined}
 */
howlkraul.entity.RoamState.prototype.onEnter = function () {
  this.owner.speed = this.owner.defaultSpeed;
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Makes the enemy roam around randomly.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.RoamState.prototype.m_roam = function () {
  var now = Date.now();

  if (now >= this.m_endMoveTime) {
    this.m_setDirection();
    this.m_endMoveTime = now + rune.util.Math.randomInt(1000, 5000);
  }

  if (this.m_direction) {
    this.m_direction();
  }
};

/**
 * Randomly selects a new direction for the enemy to move.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.entity.RoamState.prototype.m_setDirection = function () {
  var directions = [
    this.owner.moveUp.bind(this.owner),
    this.owner.moveDown.bind(this.owner),
    this.owner.moveLeft.bind(this.owner),
    this.owner.moveRight.bind(this.owner),
  ];

  var rIndex = rune.util.Math.randomInt(0, directions.length - 1);

  var attemps = 0;
  while (rIndex === this.m_directionIndex && attemps < 10) {
    rIndex = rune.util.Math.randomInt(0, directions.length - 1);
    attemps++;
  }

  this.m_directionIndex = rIndex;
  this.m_direction = directions[rIndex];
};

/**
 * Checks if the enemy is stuck and unable to move.
 * 
 * @private
 * @returns {boolean} True if the enemy is stuck, false otherwise.
 */
howlkraul.entity.RoamState.prototype.m_isStuck = function () {
  var isStuck = Math.abs(this.owner.velocity.x) < 0.01 && Math.abs(this.owner.velocity.y) < 0.01;

  if (isStuck) {
    this.m_setDirection();
    this.m_direction();
    return true;
  }

  return false;
};