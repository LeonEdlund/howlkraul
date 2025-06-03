/**
 * Creates a new ScoreCounter.
 *
 * @constructor
 * 
 * @param {number} [x=0] - x position.
 * @param {number} [y=0] - y position.
 * 
 * @class
 * @classdesc
 * 
 * Represents a visual score counter that can be used to represent the current score 
 */
howlkraul.ui.ScoreCounter = function (x, y) {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------

  rune.display.DisplayObjectContainer.call(this, x || 0, y || 0, 80, 25);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * Reference to the coin graphic.
   * 
   * @private
   * @type {howlkraul.ui.CounterCoin} 
   */
  this.m_coin = null;

  /**
   * Reference to counter text object.
   * 
   * @private
   * @type {rune.text.BitmapField} 
   */
  this.m_counter = null;

  /**
   * The current score. 
   * 
   * @private
   * @type {number} 
   */
  this.m_score = 0;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.ScoreCounter.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.ScoreCounter.prototype.constructor = howlkraul.ui.ScoreCounter;

//--------------------------------------------------------------------------
// Getters and Setters
//--------------------------------------------------------------------------

/**
 * The current score.
 *
 * @member {number} score
 * @memberof howlkraul.utils.ScoreCounter
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.ui.ScoreCounter.prototype, "score", {
  /**
   * @this howlkraul.utils.ScoreCounter
   * @ignore
   */
  get: function () {
    return this.m_score;
  }
});

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Runs when object is instantiated.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.ScoreCounter.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initCounter();
  this.m_initCoin();
};

/**
 * Runs when object is removed, used to clean up resources.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.ScoreCounter.prototype.dispose = function () {
  this.removeChildren(true);

  rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Update counter by adding to it.
 * 
 * @public
 * @param {number} amount - how much that should be added. 
 * @returns {undefined}
 */
howlkraul.ui.ScoreCounter.prototype.add = function (amount) {
  this.m_score += amount;
  this.m_counter.text = this.m_score.toString();
  this.m_centerCounter();
  this.m_centerCoin();
  this.m_coin.spin();
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initialize the coin. 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.ScoreCounter.prototype.m_initCoin = function () {
  if (!this.m_coin) {
    this.m_coin = new howlkraul.ui.CounterCoin(0, 0);
    this.m_centerCoin();
    this.addChild(this.m_coin);
  }
};

/**
 * Initialize the counter. 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.ScoreCounter.prototype.m_initCounter = function () {
  if (!this.m_counter) {
    this.m_counter = new rune.text.BitmapField(this.m_score.toString(), "font_480x45");
    this.m_counter.autoSize = true;
    this.m_centerCounter();
    this.addChild(this.m_counter);
  }
};

/**
 * Center the counter.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.ScoreCounter.prototype.m_centerCounter = function () {
  this.m_counter.centerX = this.width / 2;
  this.m_counter.centerY = this.height / 2;
};

/**
 * Center the coin.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.ScoreCounter.prototype.m_centerCoin = function () {
  this.m_coin.centerX = this.m_counter.left - 8;
  this.m_coin.centerY = (this.height / 2) - 2;
};