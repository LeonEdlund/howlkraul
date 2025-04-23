howlkraul.entity.RunAwayState = function () {
  rune.state.State.call(this, "RunAway");
}

howlkraul.entity.RunAwayState.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.RunAwayState.prototype.constructor = howlkraul.entity.FollowPlayerState;


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
  rune.state.State.prototype.onEnter.call(this);
  this.owner.setVelocity(0.08, 1.02);
};

howlkraul.entity.RunAwayState.prototype.m_runAwayFromPlayer = function () {
  var players = this.owner.application.scenes.selected.players;
  var closestPlayer = this.owner.getClosestPlayer(players);
  if (!closestPlayer) return;

  var tX = this.owner.centerX;
  var tY = this.owner.centerY;
  var pX = closestPlayer.centerX;
  var pY = closestPlayer.centerY;

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