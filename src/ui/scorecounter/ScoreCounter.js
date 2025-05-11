howlkraul.ui.ScoreCounter = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.DisplayObjectContainer.call(this, x, y, 80, 25);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------
  this.m_coin = null;

  this.m_counter = null;

  this.m_score = 0;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.ScoreCounter.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.ScoreCounter.prototype.constructor = howlkraul.ui.ScoreCounter;

Object.defineProperty(howlkraul.ui.ScoreCounter.prototype, "score", {
  get: function () {
    return this.m_score;
  }
})

/**
 * @inheritdoc
 */
howlkraul.ui.ScoreCounter.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initCounter();
  this.m_initCoin();
};

/**
 * @inheritdoc
 */
howlkraul.ui.ScoreCounter.prototype.dispose = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.removeChildren(true);
  // this.m_character = null;
  // this.m_hearts = null;
  // this.m_head = null;
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.ui.ScoreCounter.prototype.updateCounter = function (amount) {
  this.m_score += amount;
  this.m_counter.text = this.m_score.toString();
  this.m_centerCounter();
  this.m_centerCoin();
  this.m_coin.spin();
};

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------


howlkraul.ui.ScoreCounter.prototype.m_initCoin = function () {
  this.m_coin = new howlkraul.ui.CounterCoin(0, 0);
  this.m_centerCoin();
  this.addChild(this.m_coin);
};

howlkraul.ui.ScoreCounter.prototype.m_initCounter = function () {
  this.m_counter = new rune.text.BitmapField(this.m_score.toString(), "font_480x45");
  this.m_counter.autoSize = true;
  this.m_centerCounter();
  this.addChild(this.m_counter);
};

howlkraul.ui.ScoreCounter.prototype.m_centerCounter = function () {
  this.m_counter.centerX = this.width / 2;
  this.m_counter.centerY = this.height / 2;
};

howlkraul.ui.ScoreCounter.prototype.m_centerCoin = function () {
  this.m_coin.centerX = this.m_counter.left - 8;
  this.m_coin.centerY = (this.height / 2) - 2;
};



