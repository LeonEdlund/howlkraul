howlkraul.entity.Players = function () {

  rune.display.DisplayGroup.call(this, );


}

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

howlkraul.entity.Players.prototype = Object.create(rune.display.DisplayGroup.prototype);
howlkraul.entity.Players.prototype.constructor = howlkraul.entity.Player;