howlkraul.entity.BigTroll = function (x, y) {
  howlkraul.entity.Troll.call(this, x, y);
  this.hp = 250;
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
  this.hitbox.set(10, (this.height - 15), (this.width - 20), 14);
  this.debug = true;
  this.hitbox.debug = true;
};

//--------------------------------------------------------------------------
// Overide Methods
//--------------------------------------------------------------------------

