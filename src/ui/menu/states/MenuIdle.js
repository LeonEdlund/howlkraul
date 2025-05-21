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
howlkraul.ui.MenuIdle = function () {

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.state.State.call(this, "MenuIdle");

  /**
   * Main Menu
   * 
   * @private
   * @type {howlkraul.ui.MainMenu}
   */
  this.m_menu = null;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.MenuIdle.prototype = Object.create(rune.state.State.prototype);
howlkraul.ui.MenuIdle.prototype.constructor = howlkraul.ui.MenuIdle;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuIdle.prototype.init = function () {
  rune.state.State.prototype.init.call(this);

};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuIdle.prototype.onExit = function () {

};

/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuIdle.prototype.update = function () {
  var keyboard = this.owner.keyboard;
  var gamepad1 = this.owner.gamepads.get(0);
  var gamepad2 = this.owner.gamepads.get(1);

  if (keyboard.justPressed("w") || gamepad1.stickLeftJustUp || gamepad2.stickLeftJustUp) {
    this.owner.m_menu.up();
    this.m_updateHighscoreForCurrentItem();
  }

  if (keyboard.justPressed("s") || gamepad1.stickLeftJustDown || gamepad2.stickLeftJustDown) {
    this.owner.m_menu.down();
    this.m_updateHighscoreForCurrentItem();
  }

  if (keyboard.justPressed("enter") || gamepad1.justPressed(0) || gamepad2.justPressed(0)) {
    var selectedOption = this.owner.m_menu.select();
    this.m_onSelect(selectedOption);
  };
};


/**
 * ... 
 * 
 * @returns {undefined}
*/
howlkraul.ui.MenuIdle.prototype.m_onSelect = function (choice) {
  var scene = this.owner.application.scenes.selected;
  var text = choice.text.toLowerCase();

  choice.flicker.start(500, 100, function () {
    switch (text) {
      case "one player":
      case "two player":
        this.owner.application.scenes.selected.tweens.create({
          target: this.owner,
          scope: this,
          duration: 2000,
          onDispose: function (obj) {
            if (text === "two player") scene.twoPlayer = true;
            scene.states.select("CSPlaying");
          },
          args: {
            alpha: 0,
          }
        })
        break;
      case "how to":

        break;
      case "credit":

    }
  }, this);
};

/**
 * Updates the highscore list based on current menu selection
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.MenuIdle.prototype.m_updateHighscoreForCurrentItem = function () {
  var currentItem = this.owner.m_menu.hoveredItem;

  // Update highscore based on current selection
  if (currentItem === "one player") {
    this.owner.m_highscore.updateList(1);
  } else if (currentItem === "two player") {
    this.owner.m_highscore.updateList(2);
  }
};