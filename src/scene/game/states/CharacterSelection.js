/**
 * Represents a state where the enemy attacks the closest player on the scene. 
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 *
 * The Attack state is used to make enemies go in to attack mode. 
 */
howlkraul.scene.CharacterSelection = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.state.State.call(this, "CharacterSelection");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.scene.CharacterSelection.prototype = Object.create(rune.state.State.prototype);
howlkraul.scene.CharacterSelection.prototype.constructor = howlkraul.scene.CharacterSelection;

//--------------------------------------------------------------------------
// Overide rune methods
//--------------------------------------------------------------------------

/**
 * @override
*/
howlkraul.scene.CharacterSelection.prototype.init = function () {
    rune.state.State.prototype.init.call(this);

    console.log("CharacterSelection init");
};

/**
 * @override
*/
howlkraul.scene.CharacterSelection.prototype.update = function (step) {
    rune.state.State.prototype.update.call(this, step);

    this.m_collisionHandler.update();
};

/**
 * @override
*/
howlkraul.scene.CharacterSelection.prototype.onEnter = function () {

    console.log("character selection");
};