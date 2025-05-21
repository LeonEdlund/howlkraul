//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Menu object.
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
     * Refers to the menu with different options. 
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
 * Initializes all objects for the scene.
 * Is run once when an instance is created.
 * 
 * @public
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
 * @public
 * @param {number} step - Fixed time step.
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
 * @public
 * @returns {undefined}
 */
howlkraul.scene.Menu.prototype.dispose = function () {
    this.stage.removeChild(this.m_menu, true);
    this.m_menu = null;

    rune.scene.Scene.prototype.dispose.call(this);
};

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------

/**
 * Method that initializes the menu object with options and adds it to the stage.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Menu.prototype.m_initMenu = function () {
    this.m_menu = new rune.ui.VTMenu();
    this.m_menu.onSelect(this.m_onMenuSelect, this);
    this.m_menu.add("1 Player");
    this.m_menu.add("2 Player");
    this.m_menu.center = this.application.screen.center;

    this.stage.addChild(this.m_menu);
};

/**
 * Method that is run every update tick and handles controller input for menu selections.
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Menu.prototype.m_handleInput = function () {
    if (!this.m_menu) return;

    var p1 = this.gamepads.get(0);
    var p2 = this.gamepads.get(1);

    input = {
        up: p1.stickLeftJustUp || p2.stickLeftJustUp,
        down: p1.stickLeftJustDown || p2.stickLeftJustDown,
        select: p1.justPressed(0) || p2.justPressed(0),
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
 * Callback function on menu option selection
 * 
 * @private
 * @returns {undefined}
 * @ignore
 */
howlkraul.scene.Menu.prototype.m_onMenuSelect = function (menuOption) {
    switch (menuOption.text) {
        case "1 Player":
            this.application.scenes.load([new howlkraul.scene.CharacterSelection()]);
            break;
        case "2 Player":
            this.application.scenes.load([new howlkraul.scene.CharacterSelection(true)]);
            break;
    }
};