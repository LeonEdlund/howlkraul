//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new menu DisplayObjectContainer.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 * 
 * @class
 * @classdesc
 * 
 * Represents the games menu.
 */
howlkraul.ui.Menu = function () {

  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.DisplayObjectContainer.call(this, 30, 90, 200, 130);

  //--------------------------------------------------------------------------
  // Private Properties
  //--------------------------------------------------------------------------

  this.m_tweens = null;

  this.m_options = [];

  this.m_choice = 0;

  this.m_previousChoice = 0;
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

howlkraul.ui.Menu.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
howlkraul.ui.Menu.prototype.constructor = howlkraul.ui.Menu;

//--------------------------------------------------------------------------
// Getters and setters
//--------------------------------------------------------------------------

// Object.defineProperty(howlkraul.ui.ScoreCounter.prototype, "score", {
//   get: function () {
//     return this.m_score;
//   }
// })

//--------------------------------------------------------------------------
// Overide Rune Methods
//--------------------------------------------------------------------------

/**
 * Initializes all objects for the main menu.
 * Is run once when an instance is created.
 * 
 * @public
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.init = function () {
  rune.display.DisplayObjectContainer.prototype.init.call(this);

  this.m_initMenuOptions();
  this.m_initTweens();
};

/**
 * @inheritdoc
 */
howlkraul.ui.Menu.prototype.dispose = function () {
  rune.display.DisplayObjectContainer.prototype.dispose.call(this);

  this.removeChildren(true);
};

//--------------------------------------------------------------------------
// Public Methods
//--------------------------------------------------------------------------

howlkraul.ui.Menu.prototype.up = function () {
  this.m_previousChoice = this.m_choice;
  this.m_choice--;
  this.m_choice = rune.util.Math.wrap(this.m_choice, 0, this.m_options.length - 1);
  this.m_scaleChoice();
};

howlkraul.ui.Menu.prototype.down = function () {
  this.m_previousChoice = this.m_choice;
  this.m_choice++;
  this.m_choice = rune.util.Math.wrap(this.m_choice, 0, this.m_options.length - 1);
  this.m_scaleChoice();
};

howlkraul.ui.Menu.prototype.select = function () {
  return this.m_options[this.m_choice];
};



//--------------------------------------------------------------------------
// Private Methods
//--------------------------------------------------------------------------

howlkraul.ui.Menu.prototype.m_onSelect = function () {
  switch (this.m_options[this.m_choice]) {
    case "one player":
      this.application.scenes.selected.states.select("CSPlaying");
  }

  return this.m_options[this.m_choice].text.toLowerCase();
};

/**
 * Creates a new overlay and add it to display group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.m_initMenuOptions = function () {
  this.m_options.push(new rune.text.BitmapField("ONE PLAYER", "font_480x45"));
  this.m_options.push(new rune.text.BitmapField("TWO PLAYER", "font_480x45"));
  this.m_options.push(new rune.text.BitmapField("HOW TO", "font_480x45"));
  this.m_options.push(new rune.text.BitmapField("CREDIT", "font_480x45"));

  for (var i = 0; i < this.m_options.length; i++) {
    this.addChild(this.m_options[i]);
    this.m_options[i].autoSize = true;

    this.m_options[i].x = 15;
    this.m_options[i].y = 10 + (i * 30);

    // Scale up the first option (default selection)
    if (i === 0) {
      this.m_options[i].scaleX = 1.2;
      this.m_options[i].scaleY = 1.2;
    }
  }
};

/**
 * Creates a new overlay and add it to display group.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.m_initTweens = function () {
  if (!this.m_tweens) {
    this.m_tweens = new rune.tween.Tweens();
  }
};

/**
 * Scale up current coice and make previus smaller
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.ui.Menu.prototype.m_scaleChoice = function () {
  // Previus choice
  this.application.scenes.selected.tweens.create({
    target: this.m_options[this.m_previousChoice],
    scope: this,
    duration: 200,
    args: {
      scaleX: 1,
      scaleY: 1,
    }
  });

  // Current choice
  this.application.scenes.selected.tweens.create({
    target: this.m_options[this.m_choice],
    scope: this,
    duration: 200,
    args: {
      scaleX: 1.2,
      scaleY: 1.2,
    }
  });
};