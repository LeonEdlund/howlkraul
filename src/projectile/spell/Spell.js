/**
 * Creates a new instance of Spell.
 *
 * @constructor
 * @extends howlkraul.projectile.Projectile
 * 
 * @param {number} [x=0] - X spawn position.
 * @param {number} [y=0] - Y spawn position.
 * @param {howlkraul.entity.Wizard} castedBy - The name of the texture.
 * 
 * @class
 * @classdesc
 *
 * Represents a spell casted by the wizard.
 */
howlkraul.projectile.Spell = function (x, y, castedBy) {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x, y, 27, 32, "magic_27x27");

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * Who casted the spell.
   * 
   * @private
   * @type {howlkraul.entity.Wizard}
   */
  this.m_castedBy = castedBy;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.projectile.Spell.prototype = Object.create(howlkraul.projectile.Projectile.prototype);
howlkraul.projectile.Spell.prototype.constructor = howlkraul.projectile.Spell;

//--------------------------------------------------------------------------
// Getters And Setters
//--------------------------------------------------------------------------

/**
 * Who casted the spell
 *
 * @member {boolean} castedBy
 * @memberof howlkraul.projectile.Spell
 * @instance
 * @readonly
 */
Object.defineProperty(howlkraul.projectile.Spell.prototype, "castedBy", {
  /**
   * @this howlkraul.projectile.Spell
   * @ignore
   */
  get: function () {
    return this.m_castedBy;
  }
});

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 */
howlkraul.projectile.Spell.prototype.dispose = function () {
  this.castedBy = null;

  howlkraul.projectile.Projectile.prototype.dispose.call(this);
};

/**
 * @inheritdoc
 */
howlkraul.projectile.Spell.prototype.m_initAnimation = function () {
  this.animation.create("spell", [0, 1, 2, 3, 4, 5, 6, 7], 20, true);
};

/**
 * @inheritdoc
 */
howlkraul.projectile.Spell.prototype.m_initHitbox = function () {
  this.hitbox.set(10, 10, 10, 10);
};