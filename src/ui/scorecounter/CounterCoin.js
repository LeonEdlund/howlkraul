howlkraul.ui.CounterCoin = function (x, y) {
  //--------------------------------------------------------------------------
  // Super Call
  //--------------------------------------------------------------------------
  rune.display.Sprite.call(this, x, y, 22, 25, "face_hud_22x25");
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
howlkraul.ui.Head.prototype = Object.create(rune.display.Graphic.prototype);
howlkraul.ui.Head.prototype.constructor = howlkraul.ui.CounterCoin;

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Set Head state.
 * 
 * @public
 * @param {number} state - 0: empty, 1: half, 2: full.
 * @returns {undefined}
 */
howlkraul.ui.Head.prototype.replaceColor = function (state) {

};