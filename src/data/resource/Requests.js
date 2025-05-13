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
howlkraul.data.Requests = function () {

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
	this.add("clothing_29x29", "./../asset/img/actors/enemies/troll/clothing_29x29.png");
	this.add("helmet1_29x29", "./../asset/img/actors/enemies/troll/helmet1_29x29.png");
	this.add("helmet2_29x29", "./../asset/img/actors/enemies/troll/helmet2_29x29.png");
	this.add("troll_29x29", "./../asset/img/actors/enemies/troll/troll_29x29.png");
	this.add("archer_27x34", "./../asset/img/actors/heros/archer_27x34.png");
	this.add("wizard_27x34", "./../asset/img/actors/heros/wizard_27x34.png");
	this.add("bomb_19x22", "./../asset/img/drops/bomb_19x22.png");
	this.add("coin_11x26", "./../asset/img/drops/coin_11x26.png");
	this.add("health_potion_14x20", "./../asset/img/drops/health_potion_14x20.png");
	this.add("font_480x45", "./../asset/img/fonts/font_480x45.png");
	this.add("blood1", "./../asset/img/gore/blood1.png");
	this.add("blood2", "./../asset/img/gore/blood2.png");
	this.add("blood3", "./../asset/img/gore/blood3.png");
	this.add("blood4", "./../asset/img/gore/blood4.png");
	this.add("blood5", "./../asset/img/gore/blood5.png");
	this.add("blood6", "./../asset/img/gore/blood6.png");
	this.add("blood7", "./../asset/img/gore/blood7.png");
	this.add("goblin_gore1_25x16", "./../asset/img/gore/goblin/goblin_gore1_25x16.png");
	this.add("goblin_gore2_25x16", "./../asset/img/gore/goblin/goblin_gore2_25x16.png");
	this.add("goblin_gore3_25x16", "./../asset/img/gore/goblin/goblin_gore3_25x16.png");
	this.add("goblin_gore4_25x16", "./../asset/img/gore/goblin/goblin_gore4_25x16.png");
	this.add("goblin_gore5_25x16", "./../asset/img/gore/goblin/goblin_gore5_25x16.png");
	this.add("goblin_gore_0_5x7", "./../asset/img/gore/goblin_gore_0_5x7.png");
	this.add("goblin_gore_1_9x9", "./../asset/img/gore/goblin_gore_1_9x9.png");
	this.add("goblin_gore_2_25x16", "./../asset/img/gore/goblin_gore_2_25x16.png");
	this.add("goblin_gore_3_8x13", "./../asset/img/gore/goblin_gore_3_8x13.png");
	this.add("goblin_gore_4_16x16", "./../asset/img/gore/goblin_gore_4_16x16.png");
	this.add("troll_gore1_19x18", "./../asset/img/gore/troll/troll_gore1_19x18.png");
	this.add("troll_gore2_19x18", "./../asset/img/gore/troll/troll_gore2_19x18.png");
	this.add("troll_gore3_19x18", "./../asset/img/gore/troll/troll_gore3_19x18.png");
	this.add("troll_gore4_19x18", "./../asset/img/gore/troll/troll_gore4_19x18.png");
	this.add("troll_gore5_19x18", "./../asset/img/gore/troll/troll_gore5_19x18.png");
	this.add("hearts_11x12", "./../asset/img/hud/hearts/hearts_11x12.png");
	this.add("face_hud_22x25", "./../asset/img/hud/hud characters/face_hud_22x25.png");
	this.add("Player_hud_69x31", "./../asset/img/hud/hud components/Player_hud_69x31.png");
	this.add("coin_hud_12x18", "./../asset/img/hud/hud components/coin_hud_12x18.png");
	this.add("xfragmentation1_6x8", "./../asset/img/not_in_use/bomb/xfragmentation1_6x8.png");
	this.add("xfragmentation2_6x8", "./../asset/img/not_in_use/bomb/xfragmentation2_6x8.png");
	this.add("xfragmentation3_6x8", "./../asset/img/not_in_use/bomb/xfragmentation3_6x8.png");
	this.add("xfragmentation4_6x8", "./../asset/img/not_in_use/bomb/xfragmentation4_6x8.png");
	this.add("empty-heart_11x12", "./../asset/img/not_in_use/empty-heart_11x12.png");
	this.add("full-heart_11x12", "./../asset/img/not_in_use/full-heart_11x12.png");
	this.add("goblin_29x27", "./../asset/img/not_in_use/goblin_29x27.png");
	this.add("half-heart_11x12", "./../asset/img/not_in_use/half-heart_11x12.png");
	this.add("knight_walk", "./../asset/img/not_in_use/knight_walk.png");
	this.add("player_hud_72x35", "./../asset/img/not_in_use/player_hud_72x35.png");
	this.add("vase_19x27", "./../asset/img/not_in_use/vase_19x27.png");
	this.add("arrow_19x5", "./../asset/img/projectiles/arrow_19x5.png");
	this.add("fragmentation1_6x8", "./../asset/img/projectiles/bomb/fragmentation1_6x8.png");
	this.add("fragmentation2_6x8", "./../asset/img/projectiles/bomb/fragmentation2_6x8.png");
	this.add("fragmentation3_6x8", "./../asset/img/projectiles/bomb/fragmentation3_6x8.png");
	this.add("fragmentation4_6x8", "./../asset/img/projectiles/bomb/fragmentation4_6x8.png");
	this.add("cloud1_6x6", "./../asset/img/projectiles/bomb/smoke/cloud1_6x6.png");
	this.add("cloud2_6x6", "./../asset/img/projectiles/bomb/smoke/cloud2_6x6.png");
	this.add("cloud3_6x6", "./../asset/img/projectiles/bomb/smoke/cloud3_6x6.png");
	this.add("cloud4_6x6", "./../asset/img/projectiles/bomb/smoke/cloud4_6x6.png");
	this.add("cloud5_6x6", "./../asset/img/projectiles/bomb/smoke/cloud5_6x6.png");
	this.add("smoke1_6x6", "./../asset/img/projectiles/bomb/smoke/smoke1_6x6.png");
	this.add("smoke2_6x6", "./../asset/img/projectiles/bomb/smoke/smoke2_6x6.png");
	this.add("smoke3_6x6", "./../asset/img/projectiles/bomb/smoke/smoke3_6x6.png");
	this.add("smoke4_6x6", "./../asset/img/projectiles/bomb/smoke/smoke4_6x6.png");
	this.add("smoke5_6x6", "./../asset/img/projectiles/bomb/smoke/smoke5_6x6.png");
	this.add("magic_27x27", "./../asset/img/projectiles/magic_27x27.png");
	this.add("slime_shot_6x6", "./../asset/img/projectiles/slime_shot_6x6.png");
	this.add("table_part1_18x18", "./../asset/img/room/furniture/furniture parts/table/table_part1_18x18.png");
	this.add("table_part2_18x18", "./../asset/img/room/furniture/furniture parts/table/table_part2_18x18.png");
	this.add("table_part3_18x18", "./../asset/img/room/furniture/furniture parts/table/table_part3_18x18.png");
	this.add("table_part4_18x18", "./../asset/img/room/furniture/furniture parts/table/table_part4_18x18.png");
	this.add("table_part5_18x18", "./../asset/img/room/furniture/furniture parts/table/table_part5_18x18.png");
	this.add("table_part6_18x18", "./../asset/img/room/furniture/furniture parts/table/table_part6_18x18.png");
	this.add("vase_part1_18x18", "./../asset/img/room/furniture/furniture parts/vase/vase_part1_18x18.png");
	this.add("vase_part2_18x18", "./../asset/img/room/furniture/furniture parts/vase/vase_part2_18x18.png");
	this.add("vase_part3_18x18", "./../asset/img/room/furniture/furniture parts/vase/vase_part3_18x18.png");
	this.add("vase_part4_18x18", "./../asset/img/room/furniture/furniture parts/vase/vase_part4_18x18.png");
	this.add("vase_part5_18x18", "./../asset/img/room/furniture/furniture parts/vase/vase_part5_18x18.png");
	this.add("table_47x35", "./../asset/img/room/furniture/table_47x35.png");
	this.add("vase_19x29", "./../asset/img/room/furniture/vase_19x29.png");
	this.add("entrance_400x225", "./../asset/img/room/outside/entrance_400x225.png");
	this.add("outside_400x225", "./../asset/img/room/outside/outside_400x225.png");
	this.add("shadow_400x225", "./../asset/img/room/outside/shadow_400x225.png");
	this.add("room_400x225", "./../asset/img/room/room_400x225.png");
};