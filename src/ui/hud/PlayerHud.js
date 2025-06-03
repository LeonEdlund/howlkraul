howlkraul.ui.PlayerHud = function (x, y, character, flipped) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.DisplayObjectContainer.call(this, x, y, 69, 31);

  this.m_character = character;

  this.m_hearts = {};

  this.m_head = null;

  this.m_flipped = flipped || false;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.PlayerHud.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.PlayerHud.prototype.constructor = howlkraul.ui.PlayerHud;

/**
 * Is run once when an instance is created.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initBackground();
  this.m_initHearts();
  this.m_initHead();
  this.flippedX = this.m_flipped;
};

/**
 * Dispose and clean up resources.
 * 
 * @overide
 * @public
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.dispose = function () {
  this.removeChildren(true);
  this.m_character = null;
  this.m_hearts = null;
  this.m_head = null;

  rune.display.DisplayObjectContainer.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * Updates the hearts based on players health.
 * 
 * @public
 * @param {number} health - the players health. 
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.updateHealth = function (health) {
  switch (health) {
    case 6:
      this.m_hearts.heart2.setHeart(2);
      this.m_hearts.heart1.setHeart(2);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 5:
      this.m_hearts.heart2.setHeart(1);
      this.m_hearts.heart1.setHeart(2);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 4:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(2);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 3:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(1);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 2:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(0);
      this.m_hearts.heart0.setHeart(2);
      break;
    case 1:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(0);
      this.m_hearts.heart0.setHeart(1);
      break;
    case 0:
      this.m_hearts.heart2.setHeart(0);
      this.m_hearts.heart1.setHeart(0);
      this.m_hearts.heart0.setHeart(0);
      break;
    default:
      throw new Error('health needs to be between 0 - 6');
  }
};

/**
 * Change color of hud elements.
 * 
 * @public
 * @param {string} color - The color to make the character as a string. 
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.changeColor = function (color) {
  if (color === "blue") return;

  this.m_head.changeColor(color);
  this.m_background.changeColor(color)
}

//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

/**
 * Initalize background.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.m_initBackground = function () {
  this.m_background = new howlkraul.ui.HudBackground(0, 0)
  this.addChild(this.m_background);
};

/**
 * Initalize hearts.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.m_initHearts = function () {
  for (var i = 0; i < 3; i++) {
    this.m_hearts["heart" + i] = new howlkraul.ui.Heart(28 + (i * 12), 10, "heart" + i);
    this.addChild(this.m_hearts["heart" + i]);
  }
};

/**
 * Initalize head.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.PlayerHud.prototype.m_initHead = function () {
  this.m_head = new howlkraul.ui.Head(2, 3)
  this.addChild(this.m_head);
};

