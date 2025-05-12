howlkraul.entity.BigTroll = function (x, y) {
  howlkraul.entity.Troll.call(this, x, y);

  this.hp = 450;
  this.speed = 0.2;
  this.mass = 20;
  this.m_isThrowing = false;
  this.m_lastThrow = 0;
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
  howlkraul.entity.Troll.prototype.initAnimations.call(this);

  this.animation.create("throw", [28, 29, 30, 31, 32, 33, 34, 35, 35, 35], 5, false);
};

/**
 * @override
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


    //FIX LATER
    var directionX = this.flippedX ? -2 : 2;

    // STEP 2: Set maximum velocities to allow proper movement
    bomb.velocity.max.x = 4;
    bomb.velocity.max.y = 4;

    // STEP 3: Set initial velocity (strong upward component)
    bomb.velocity.x = directionX;
    bomb.velocity.y = -2;  // Strong initial upward force

    // STEP 4: Add gravity by setting acceleration
    bomb.velocity.acceleration.y = 0.01;  // Gravity pulls downward

    // STEP 5: Reduce drag to maintain horizontal movement
    bomb.velocity.drag.x = 0.01;  // Very little horizontal drag
    bomb.velocity.drag.y = 0.01;  // Very little vertical drag
  }, this);

};

/**
 * @override
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
howlkraul.entity.BigTroll.prototype.m_initClothes = function () {

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

  howlkraul.entity.Troll.prototype.setState.call(this);
};

/**
 * @inheritdoc
 */
howlkraul.entity.BigTroll.prototype.initStates = function () {
  this.states.load([
    new howlkraul.entity.FollowPlayerState(),
    new howlkraul.entity.Attack(),
    new howlkraul.entity.BigTrollAttack(),
    new howlkraul.entity.RoamState(),
  ]);
}