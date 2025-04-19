//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new PlayableCharacter instance.
 *
 * @constructor
 * @extends howlkraul.entity.Entity
 *
 * @param {number} [x] The x position of the object.
 * @param {number} [y] The y position of the object.
 * 
 * @class
 * @classdesc
 * 
 * The PlayableCharacter class represents an animated PlayableCharacter sprite.
 */
howlkraul.entity.PlayableCharacter = function (x, y, height, width, texture) {
  howlkraul.entity.Entity.call(this, x || 0, y || 0, height, width, texture);

  this.hp = 6;
  this.m_hpbar = null;
  this.m_lastDamageHit = 0;
  this.m_damageHitCoolDown = 1000;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.entity.PlayableCharacter.prototype = Object.create(howlkraul.entity.Entity.prototype);
howlkraul.entity.PlayableCharacter.prototype.constructor = howlkraul.entity.PlayableCharacter;

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
howlkraul.entity.PlayableCharacter.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.setVelocity(0.08, 1.2);
  this.hitbox.set(0, (this.height - 10), this.width, 9);
  this.m_inithpbar();
};

/**
 * @override
 */
howlkraul.entity.PlayableCharacter.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  this.m_updateHpbar();

  if (this.hp === 0) {
    this.die();
  }
};

howlkraul.entity.PlayableCharacter.prototype.takeDamage = function () {
  var now = Date.now();

  if (now > this.m_lastDamageHit && this.hp > 0) {
    this.hp -= 1;
    this.flicker.start(this.m_damageHitCoolDown);
    this.m_lastDamageHit = now + this.m_damageHitCoolDown;
  }
};

howlkraul.entity.PlayableCharacter.prototype.die = function () {
  this.movementAllowed = false;
  this.rotation = -90;
};


howlkraul.entity.PlayableCharacter.prototype.m_inithpbar = function () {
  this.m_hpbar = new rune.ui.Progressbar(this.width, 2, "white", "red");
  this.m_hpbar.progress = (this.hp * 17 - 2) / 100;
  this.addChild(this.m_hpbar);
};

howlkraul.entity.PlayableCharacter.prototype.m_updateHpbar = function () {
  this.m_hpbar.progress = (this.hp * 17 - 2) / 100;
};