/**
 * Creates a new BigTroll object
 * 
 * @constructor
 * @extends howlkraul.entity.Enemy
 * 
 * @param {number} x  - Spawn point on X-axis.
 * @param {number} y  - Spawn point on Y-axis.
 * 
 * @class
 * @classdesc
 * 
 * Creates an instance of a BigTroll enemy.
 */
howlkraul.entity.BigTroll = function (x, y) {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  howlkraul.entity.Troll.call(this, x, y);

  //--------------------------------------------------------------------------
  // Overide Protected Properties
  //--------------------------------------------------------------------------

  /**
   * @inheritdoc
   */
  this.hp = 400;

  /**
   * @inheritdoc
   */
  this.speed = 0.2;

  /**
   * @inheritdoc
   */
  this.defaultSpeed = 0.2;

  /**
   * @inheritdoc
   */
  this.mass = 20;

  /**
   * If the troll is throwing
   * 
   * @private
   * @type {boolean}
   */
  this.m_isThrowing = false;

  /**
   * Last time the troll threw in ms.
   * 
   * @private
   * @type {boolean}
   */
  this.m_lastThrow = Date.now() + 4000;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.entity.BigTroll.prototype = Object.create(howlkraul.entity.Troll.prototype);
howlkraul.entity.BigTroll.prototype.constructor = howlkraul.entity.BigTroll;

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.init = function () {
  howlkraul.entity.Troll.prototype.init.call(this);

  this.scaleX = 1.5;
  this.scaleY = 1.5;
};

//--------------------------------------------------------------------------
// Overide Troll Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.initAnimations = function () {
  howlkraul.entity.Troll.prototype.initAnimations.call(this);

  this.animation.create("throw", [28, 29, 30, 31, 32, 33, 34, 35, 35, 35], 5, false);
};

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.initAnimationScripts = function () {
  howlkraul.entity.Troll.prototype.initAnimationScripts.call(this);

  var animation = this.animation.find("throw");

  animation.scripts.add(9, function () {
    this.m_isThrowing = false
  }, this);

  animation.scripts.add(5, function () {
    var bomb = new howlkraul.drops.Bomb(this.centerX, this.centerY);
    this.application.scenes.selected.bombs.addMember(bomb);
    bomb.throw(this.flippedX);
  }, this);

};

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.dropCoin = function () {
  for (var i = 0; i < 3; i++) {
    var x = this.center.x + rune.util.Math.randomInt(-20, 20);
    var y = this.center.y + rune.util.Math.randomInt(-20, 20);
    this.application.scenes.selected.coins.addMember(new howlkraul.drops.Coin(x, y));
  }
};

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.setState = function () {
  if (this.m_isThrowing) return;

  var now = Date.now();

  if (now > this.m_lastThrow) {
    this.states.select("BigTrollAttack")
    this.m_isThrowing = true;
    this.m_lastThrow = now + 8000;
    return;
  }

  if (this.distanceToClosestPlayer < 12) {
    this.states.select("Attack");
  } else {
    this.states.select("FollowPlayer");
  }
};

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.initStates = function () {
  this.states.load([
    new howlkraul.entity.FollowPlayerState(),
    new howlkraul.entity.Attack(),
    new howlkraul.entity.BigTrollAttack(),
  ]);
}

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.initClothes = function () {
  // OVERIDE SO NO CLOTHES ARE ADDED
};