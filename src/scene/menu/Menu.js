//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Menu scene.
 */
howlkraul.scene.Menu = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * The menu. 
     * 
     * @private
     * @type {rune.ui.VTMenu}
     */

    this.m_menu = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
howlkraul.scene.Menu.prototype.constructor = howlkraul.scene.Menu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
howlkraul.scene.Menu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_initMenu();


};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
howlkraul.scene.Menu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    this.m_handleInput();
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
howlkraul.scene.Menu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
    this.m_menu = null;
};

/**
 * Initializing menu with options and adds it to stage.
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Menu.prototype.m_initMenu = function () {
    this.m_menu = new rune.ui.VTMenu();
    this.m_menu.onSelect(this.m_onMenuSelect, this);
    this.m_menu.add("1 Player");
    this.m_menu.add("2 Player");
    // this.m_menu.add("3 Player");
    // this.m_menu.add("4 Player");
    this.m_menu.center = this.application.screen.center;
    this.stage.addChild(this.m_menu);
};

/**
 * Handle menu selection input. 
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Menu.prototype.m_handleInput = function () {
    if (!this.m_menu) return;

    var input = {}

    for (var i = 0; i < this.gamepads.numGamepads; i++) {
        input = {
            up: this.gamepads.get(i).stickLeftJustUp,
            down: this.gamepads.get(i).stickLeftJustDown,
            select: this.gamepads.get(i).justPressed(0),
        }
    }

    if (this.keyboard.justPressed("down") || input.down) {
        this.m_menu.down();
    }

    if (this.keyboard.justPressed("up") || input.up) {
        this.m_menu.up();
    }

    if (this.keyboard.justPressed("enter") || input.select) {
        this.m_menu.select();
    }
};

/**
 * Callback function on menu selection
 * 
 * @private
 * @returns {undefined}
 */
howlkraul.scene.Menu.prototype.m_onMenuSelect = function (menuOption) {
    switch (menuOption.text) {
        case "1 Player":
            this.application.scenes.load([new howlkraul.scene.Game(1)]);
            break;
        case "2 Player":
            this.application.scenes.load([new howlkraul.scene.Game(2)]);
            break;
        case "3 Player":
            this.application.scenes.load([new howlkraul.scene.Game(3)]);
            break;
        case "4 Player":
            this.application.scenes.load([new howlkraul.scene.Game(4)]);
            break;
    }
};