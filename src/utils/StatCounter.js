//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new StatCounter.
 *
 * @constructor
 * 
 * @param {string} wizColor - the color of the connected wizard.
 * 
 * @class
 * @classdesc
 * 
 * Represents a class that works as a counter. Its used to keep track of a players stats during a game.
 */
howlkraul.utils.StatCounter = function (wizColor) {

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * The color of the associated wizard.
   * 
   * @type {string}
   */
  this.m_wizColor = wizColor || "blue";

  /**
   * Number of kills.
   * 
   * @type {number}
   */
  this.m_kills = 0;

  /**
   * Number of coins picked up.
   * 
   * @type {number}
   */
  this.m_coins = 0;

  /**
   * Number of hits taken.
   * 
   * @type {number}
   */
  this.m_hits = 0;

  /**
  * Killed by.
  * 
  * @type {string}
  */
  this.m_killedBy = "";
}

//--------------------------------------------------------------------------
// Getters and Setters
//--------------------------------------------------------------------------

/**
 * The color of the wizard the counter is connected to.
 *
 * @member {string} wizColor
 * @memberof howlkraul.utils.StatCounter
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.utils.StatCounter.prototype, "wizColor", {
  /**
   * @this howlkraul.utils.StatCounter
   * @ignore
   */
  get: function () {
    return this.m_wizColor;
  }
});

/**
 * The number of kills.
 *
 * @member {number} kills
 * @memberof howlkraul.utils.StatCounter
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.utils.StatCounter.prototype, "kills", {
  /**
   * @this howlkraul.utils.StatCounter
   * @ignore
   */
  get: function () {
    return this.m_kills;
  }
});

/**
 * The number of coins picked up.
 *
 * @member {number} coins
 * @memberof howlkraul.utils.StatCounter
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.utils.StatCounter.prototype, "coins", {
  /**
   * @this howlkraul.utils.StatCounter
   * @ignore
   */
  get: function () {
    return this.m_coins;
  }
});

/**
 * The number of hits taken.
 *
 * @member {number} hits
 * @memberof howlkraul.utils.StatCounter
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.utils.StatCounter.prototype, "hits", {
  /**
   * @this howlkraul.utils.StatCounter
   * @ignore
   */
  get: function () {
    return this.m_hits;
  }
});


//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Add 1 to kills
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.utils.StatCounter.prototype.addKill = function () {
  this.m_kills++;
  console.log("kills" + this.m_kills);
};

/**
 * Add 1 to coins
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.utils.StatCounter.prototype.addCoin = function () {
  this.m_coins++;
};

/**
 * Add 1 to Hits
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.utils.StatCounter.prototype.addHit = function () {
  this.m_hits++;
  console.log("hits" + this.m_hits);
};

/**
 * Adds 
 * 
 * @public
 * @param {howlkraul.entity.Enemy}
 * @returns {undefined}
 */
howlkraul.utils.StatCounter.prototype.addKilledBy = function (enemy) {
  console.log(enemy, "To Be implemented")
};