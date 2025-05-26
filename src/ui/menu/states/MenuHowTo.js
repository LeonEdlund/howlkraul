/**
 * Represents a state where the main menu overlayes the character selection.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The menu over character selection. 
 */
howlkraul.ui.MenuHowTo = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "MenuHowTo");

  /**
   * The text grapic
   * 
   * @private
   * @type {rune.display.Graphic}
   */
  this.m_text = null;

  /**
   * The controller grapic
   * 
   * @private
   * @type {rune.display.Graphic}
   */
  this.m_controlls = false;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.MenuHowTo.prototype = Object.create(rune.state.State.prototype);
howlkraul.ui.MenuHowTo.prototype.constructor = howlkraul.ui.MenuHowTo;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuHowTo.prototype.init = function () {
  rune.state.State.prototype.init.call(this);
  this.m_initContent();
};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuHowTo.prototype.onEnter = function () {
  this.m_animateContent();
};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuHowTo.prototype.onExit = function () {
  this.m_animateContent(true);
};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuHowTo.prototype.update = function () {
  if (this.m_itemSelected) return;

  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("enter") || gamepad1.justPressed(1) || gamepad2.justPressed(1)) {
    this.owner.states.select("MenuIdle");
  }
};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuHowTo.prototype.m_initContent = function () {
  this.m_text = new rune.display.Graphic(-120, 20, 114, 61, "tutorial_text_114x61");
  this.m_controlls = new rune.display.Graphic(500, 100, 242, 89, "controller_242x89");

  this.m_backBtn = new rune.display.Sprite(350, 195, 24, 24, "continue_24x24");
  this.m_backBtn.animation.create("blink", [0, 1], 2, true)
  this.m_backBtn.rotation = -90;
  this.m_backBtn.alpha = 0;

  this.owner.addChild(this.m_text);
  this.owner.addChild(this.m_controlls);
  this.owner.addChild(this.m_backBtn);
};

/**
 * Animate content.
 * 
 * @private
 * @param {boolean} reversed
 * @returns {undefined}
 */
howlkraul.ui.MenuHowTo.prototype.m_animateContent = function (reversed) {

  this.owner.application.scenes.selected.tweens.create({
    target: this.owner.logo,
    scope: this,
    duration: 1000,
    args: {
      centerX: reversed ? this.owner.centerX : 280,
      y: reversed ? 1 : 18,
      scaleX: reversed ? 1 : 0.7,
      scaleY: reversed ? 1 : 0.7,
    }
  });

  this.owner.application.scenes.selected.tweens.create({
    target: this.m_text,
    scope: this,
    duration: 1000,
    args: {
      centerX: reversed ? -100 : 100,
    }
  });

  this.owner.application.scenes.selected.tweens.create({
    target: this.m_controlls,
    scope: this,
    duration: 1000,
    args: {
      centerX: reversed ? 600 : this.owner.application.screen.centerX + 20
    }
  });

  if (!reversed) {
    this.m_backBtn.visible = true;
    this.owner.application.scenes.selected.timers.create({
      duration: 1000,
      scope: this,
      onComplete: function () {
        this.owner.application.scenes.selected.tweens.create({
          target: this.m_backBtn,
          scope: this,
          duration: 3000,
          args: {
            alpha: 1
          }
        });
      }
    });
  } else {
    this.m_backBtn.alpha = 0;
    this.m_backBtn.visible = false;
  }
};