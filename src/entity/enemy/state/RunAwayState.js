howlkraul.entity.RunAwayState = function () {
  rune.state.State.call(this, "RunAway");
}

howlkraul.entity.RunAwayState.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.RunAwayState.prototype.constructor = howlkraul.entity.RunAwayState;


/**
 * @override
*/
howlkraul.entity.RunAwayState.prototype.update = function () {
  rune.state.State.prototype.update.call(this);

  this.m_runAwayFromPlayer();
};

/**
 * @override
*/
howlkraul.entity.RunAwayState.prototype.onEnter = function () {
  this.owner.speed = this.owner.defaultSpeed + 0.5;
};

howlkraul.entity.RunAwayState.prototype.m_runAwayFromPlayer = function () {
  var tX = this.owner.centerX;
  var tY = this.owner.centerY;
  var pX = this.owner.closestPlayer.centerX;
  var pY = this.owner.closestPlayer.centerY;

  var distanceX = rune.util.Math.abs(tX - pX);
  var distanceY = rune.util.Math.abs(tY - pY);

  if (distanceX > distanceY) {

    if (tX < pX) {
      this.owner.moveLeft();
    } else if (tX > pX) {
      this.owner.moveRight();
    }

    this.owner.velocity.y = 0;

  } else if (distanceY > distanceX) {

    if (tY < pY) {
      this.owner.moveUp();
    } else if (tY > pY) {
      this.owner.moveDown();
    }

    this.owner.velocity.x = 0;
  }
};