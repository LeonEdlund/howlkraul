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
    this.add("goblin_29x29", "./../asset/img/actors/enemies/goblin_29x29.png");
	this.add("slime_19x19", "./../asset/img/actors/enemies/slime_19x19.png");
	this.add("helmet1_29x29", "./../asset/img/actors/enemies/troll/helmet1_29x29.png");
	this.add("troll_29x29", "./../asset/img/actors/enemies/troll/troll_29x29.png");
	this.add("archer_27x34", "./../asset/img/actors/heros/archer_27x34.png");
	this.add("wizard_27x34", "./../asset/img/actors/heros/wizard_27x34.png");
	this.add("coin_11x26", "./../asset/img/drops/coin_11x26.png");
	this.add("blood1", "./../asset/img/gore/blood1.png");
	this.add("blood2", "./../asset/img/gore/blood2.png");
	this.add("blood3", "./../asset/img/gore/blood3.png");
	this.add("blood4", "./../asset/img/gore/blood4.png");
	this.add("blood5", "./../asset/img/gore/blood5.png");
	this.add("blood6", "./../asset/img/gore/blood6.png");
	this.add("blood7", "./../asset/img/gore/blood7.png");
	this.add("goblin_gore_0_5x7", "./../asset/img/gore/goblin_gore_0_5x7.png");
	this.add("goblin_gore_1_9x9", "./../asset/img/gore/goblin_gore_1_9x9.png");
	this.add("goblin_gore_2_25x16", "./../asset/img/gore/goblin_gore_2_25x16.png");
	this.add("goblin_gore_3_8x13", "./../asset/img/gore/goblin_gore_3_8x13.png");
	this.add("goblin_gore_4_16x16", "./../asset/img/gore/goblin_gore_4_16x16.png");
	this.add("empty-heart_11x12", "./../asset/img/hud/hearts/empty-heart_11x12.png");
	this.add("full-heart_11x12", "./../asset/img/hud/hearts/full-heart_11x12.png");
	this.add("half-heart_11x12", "./../asset/img/hud/hearts/half-heart_11x12.png");
	this.add("goblin_29x27", "./../asset/img/not_in_use/goblin_29x27.png");
	this.add("knight_walk", "./../asset/img/not_in_use/knight_walk.png");
	this.add("arrow_19x5", "./../asset/img/projectiles/arrow_19x5.png");
	this.add("magic_27x27", "./../asset/img/projectiles/magic_27x27.png");
	this.add("table_47x35", "./../asset/img/room/furniture/table_47x35.png");
	this.add("vase_19x27", "./../asset/img/room/furniture/vase_19x27.png");
	this.add("room_400x225", "./../asset/img/room/room_400x225.png");
};