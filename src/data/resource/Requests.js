//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new Requests object.
 * 
 * @constructor
 * @extends rune.resource.Requests
 * 
 * @class
 * @classdesc
 * 
 * This class includes (bakes) resource files used by the application. A 
 * resource file is made available by reference (URI) or base64-encoded string. 
 * Tip: Use Rune-tools to easily bake resource files into this class.
 */
howlkraul.data.Requests = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.resource.Requests
     */
    rune.resource.Requests.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.data.Requests.prototype = Object.create(rune.resource.Requests.prototype);
howlkraul.data.Requests.prototype.constructor = howlkraul.data.Requests;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
howlkraul.data.Requests.prototype.m_construct = function() {
    rune.resource.Requests.prototype.m_construct.call(this);
    this.add("background", "./../asset/jpg/background.jpg");
	this.add("dwd", "./../asset/jpg/dwd.jpg");
	this.add("coin_11x26", "./../asset/png/coin_11x26.png");
	this.add("empty-heart_11x12", "./../asset/png/empty-heart_11x12.png");
	this.add("full-heart_11x12", "./../asset/png/full-heart_11x12.png");
	this.add("goblin_29x27", "./../asset/png/goblin_29x27.png");
	this.add("goblin_29x29", "./../asset/png/goblin_29x29.png");
	this.add("half-heart_11x12", "./../asset/png/half-heart_11x12.png");
	this.add("knight_walk", "./../asset/png/knight_walk.png");
	this.add("magic_27x27", "./../asset/png/magic_27x27.png");
	this.add("room_400x225", "./../asset/png/room_400x225.png");
	this.add("slime_19x19", "./../asset/png/slime_19x19.png");
	this.add("wizard_27x34", "./../asset/png/wizard_27x34.png");
};