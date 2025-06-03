/**
 * Creates a new instance of MenuCredits.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * This state represents the credits part of the menu.
 */
howlkraul.ui.MenuCredits = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "MenuCredits");

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  /**
   * Made by graphic.
   * 
   * @private
   * @type {rune.text.BitmapField}
   */
  this.m_madeBy = null;

  /**
   * Leon by graphic.
   * 
   * @private
   * @type {rune.text.BitmapField}
   */
  this.m_leon = null;

  /**
   * Theo by graphic.
   * 
   * @private
   * @type {rune.text.BitmapField}
   */
  this.m_theo = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.MenuCredits.prototype = Object.create(rune.state.State.prototype);
howlkraul.ui.MenuCredits.prototype.constructor = howlkraul.ui.MenuCredits;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * Is run once when an instance is created.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.MenuCredits.prototype.init = function () {
  this.m_initContent();
};

/**
 * Runs when state is selected. 
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.ui.MenuCredits.prototype.onEnter = function () {
  this.m_animateContent();
};

/**
 * Runs when state is deselected. 
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.ui.MenuCredits.prototype.onExit = function () {
  this.m_animateContent(true);
};

/**
 * Runs every frame. 
 * 
 * @override
 * @public
 * @returns {undefined}
*/
howlkraul.ui.MenuCredits.prototype.update = function () {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("enter") || gamepad1.justPressed(1) || gamepad2.justPressed(1)) {
    this.owner.states.select("MenuIdle");
  }
};

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------

/**
 * Initalize content. 
 * 
 * @private
 * @returns {undefined}
*/
howlkraul.ui.MenuCredits.prototype.m_initContent = function () {
  this.m_madeBy = new rune.display.Graphic(0, -10, 94, 14, "made_by_94x14");
  this.m_madeBy.centerX = this.owner.centerX;
  this.m_madeBy.alpha = 0;

  this.m_leon = new rune.display.Graphic(-200, 100, 165, 50, "leon_165x50");
  this.m_leon.alpha = 0;

  this.m_theo = new rune.display.Graphic(500, 99, 186, 51, "theo_186x51");
  this.m_theo.alpha = 0;

  this.owner.addChild(this.m_madeBy);
  this.owner.addChild(this.m_leon);
  this.owner.addChild(this.m_theo);
};

/**
 * Animate content.
 * 
 * @private
 * @param {boolean} reversed - true if reversed, False if not. 
 * @returns {undefined}
 */
howlkraul.ui.MenuCredits.prototype.m_animateContent = function (reversed) {
  // LOGO
  this.owner.application.scenes.selected.tweens.create({
    target: this.owner.logo,
    scope: this,
    duration: 1000,
    args: {
      y: reversed ? 1 : -this.owner.logo.height - 10,
      alpha: reversed ? 1 : 0,
    }
  });

  // MADE BY
  this.owner.application.scenes.selected.tweens.create({
    target: this.m_madeBy,
    scope: this,
    duration: 1000,
    args: {
      centerY: reversed ? -10 : 70,
      alpha: reversed ? 0 : 1,
    }
  });

  this.owner.application.scenes.selected.tweens.create({
    target: this.m_leon,
    scope: this,
    duration: 1000,
    args: {
      x: reversed ? -this.m_leon.width - 10 : 15,
      alpha: reversed ? 0 : 1,
    }
  });

  this.owner.application.scenes.selected.tweens.create({
    target: this.m_theo,
    scope: this,
    duration: 1000,
    args: {
      x: reversed ? this.owner.width + 10 : 200,
      alpha: reversed ? 0 : 1,
    }
  });
}