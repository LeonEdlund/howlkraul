howlkraul.entity.BigTroll = function (x, y) {
  howlkraul.entity.Troll.call(this, x, y);

  this.hp = 450;
  this.speed = 0.2;
  this.mass = 20;
  this.m_isThrowing = false;
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
 * @override
 */
howlkraul.entity.BigTroll.prototype.init = function () {
  howlkraul.entity.Troll.prototype.init.call(this);
  this.scaleX = 1.5;
  this.scaleY = 1.5;
};

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.BigTroll.prototype.initAnimations = function () {
  // IDLE
  this.animation.create("idle", [0], 0, false);

  // RUNNING
  this.animation.create("r", [1, 2, 3, 4, 5, 6], 5, true);
  this.animation.create("r-side", [9, 10, 11, 12, 13, 14, 15, 16], 5, true);
  this.animation.create("r-up", [20, 21, 22, 23, 24, 25], 5, true);

  // ATTACKING
  this.animation.create("s", [7, 8, 6, 6, 6, 6], 5, true);
  this.animation.create("s-side", [17, 18, 9, 9], 8, true);
  this.animation.create("s-up", [26, 27], 5, true);

  // TROW
  this.animation.create("throw", [28, 29, 30, 31, 32, 33, 34, 35], 5, false);

  this.m_initAnimationScripts();
};

/**
 * @override
 */
howlkraul.entity.BigTroll.prototype.m_initAnimationScripts = function () {
  // var animation = this.animation.find("throw");
  // animation.scripts.add(5, function () { this.m_isThrowing = false }, true);
};

/**
 * @override
 */
howlkraul.entity.BigTroll.prototype.dropCoin = function () {
  for (var i = 0; i < 4; i++) {
    var x = this.center.x + rune.util.Math.randomInt(-20, 20);
    var y = this.center.y + rune.util.Math.randomInt(-20, 20);
    this.application.scenes.selected.coins.addMember(new howlkraul.drops.Coin(x, y));
  }
};

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.m_initClothes = function () {

};