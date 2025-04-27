howlkraul.entity.Wizard = function (x, y, color) {
  howlkraul.entity.PlayableCharacter.call(this, x, y, 27, 34, "Wizard_27x34", color);

  this.power = 50;
  this.energyCost = 20;
}

howlkraul.entity.Wizard.prototype = Object.create(howlkraul.entity.PlayableCharacter.prototype);
howlkraul.entity.Wizard.prototype.constructor = howlkraul.entity.Wizard;

//--------------------------------------------------------------------------
// Overiding Methods
//--------------------------------------------------------------------------

/**
 * @inheritdoc
 * @override
 */
howlkraul.entity.Wizard.prototype.init = function () {
  howlkraul.entity.PlayableCharacter.prototype.init.call(this);

  this.setVelocity(0.08, 1.2);

};

/**
 * @inheritdoc
 * @overide
*/
howlkraul.entity.Wizard.prototype.initAnimations = function () {
  // IDLE
  this.animation.create("idle-down", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 0, 0, 0, 17, 18, 17, 18, 17, 18, 0, 0, 0, 0], 13, true);
  this.animation.create("idle-sideways", [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43], 10, true);
  this.animation.create("idle-up", [62, 62, 62, 62, 62, 62, 62, 62, 62, 71, 72, 71, 72, 71], 10, true);
  this.animation.create("dead", [0], 0, false);

  // RUNNING
  this.animation.create("r-down", [19, 20, 21, 22, 23, 24], 10, true);
  this.animation.create("r-up", [63, 64, 65, 66, 67, 68, 69], 10, true);
  this.animation.create("r-up-side", [73, 74, 75, 76, 77, 78], 10, true);
  this.animation.create("r-down-side", [57, 58, 59, 60], 10, true);
  this.animation.create("r-sideways", [46, 47, 48, 49, 50, 51, 52], 10, true);

  // HIT
  this.animation.create("s-up", [71, 72], 8, true);
  this.animation.create("s-down", [26, 27], 8, true);
  this.animation.create("s-side", [54, 55], 8, true);
  this.animation.create("s-up-side", [82, 83], 8, true);
};

/**
 * @inheritdoc
 * @overide
*/
howlkraul.entity.Wizard.prototype.m_changeColor = function () {
  if (!this.m_color) return;

  switch (this.m_color) {
    case "green":
      this.texture.replaceColor(new rune.color.Color24(0, 152, 220), new rune.color.Color24(99, 152, 220))
  }
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

/**
 * @overide
 */
howlkraul.entity.Wizard.prototype.m_performAttack = function () {
  var scene = this.application.scenes.selected;
  var x = 0;
  var y = 0;

  if (this.facing === "up" || this.facing === "down") {
    x = this.topLeft.x;
    y = this.topLeft.y;
  } else {
    x = this.flippedX ? this.x - 12 : this.x + 12;
    y = this.flippedX ? this.y + 5 : this.y + 10;
  }

  this.takeEnergy();
  var spell = new howlkraul.projectile.Spell(x, y, this);
  spell.shootInDirection(this.facing, scene.spells);
}