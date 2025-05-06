//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
howlkraul.system.Main = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "se.lnu",
        app: "howlkraul",
        build: "0.0.0",
        scene: howlkraul.scene.Game,
        resources: howlkraul.data.Requests,
        useGamepads: true,
        useKeyboard: true,
        framerate: 60,
        debug: true
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.system.Main.prototype = Object.create(rune.system.Application.prototype);
howlkraul.system.Main.prototype.constructor = howlkraul.system.Main;