howlkraul.entity.FollowPlayerState = function () {
  rune.state.State.call(this, "FollowPlayer");
  this.m_defaultMaxVelocityX = 0;
  this.m_defaultMaxVelocityY = 0;

  this.m_maxDiagonalVelocityX = 0;
  this.m_maxDiagonalVelocityY = 0;
}

howlkraul.entity.FollowPlayerState.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.FollowPlayerState.prototype.constructor = howlkraul.entity.FollowPlayerState;

/**
 * @override
*/
howlkraul.entity.FollowPlayerState.prototype.init = function () {
  rune.state.State.prototype.init.call(this);

  this.m_defaultMaxVelocityX = this.owner.velocity.max.x;
  this.m_defaultMaxVelocityY = this.owner.velocity.max.y;

  this.m_maxDiagonalVelocityX = this.m_defaultMaxVelocityX * 0.8;
  this.m_maxDiagonalVelocityY = this.m_defaultMaxVelocityY * 0.8;
};

/**
 * @override
*/
howlkraul.entity.FollowPlayerState.prototype.update = function () {
  rune.state.State.prototype.update.call(this);
  this.m_followPlayer();
};

/**
 * @override
 */
howlkraul.entity.FollowPlayerState.prototype.m_followPlayer = function () {
  var players = this.owner.application.scenes.selected.players;
  var closestPlayer = this.owner.getClosestPlayer(players);
  if (!closestPlayer) return;

  var tX = this.owner.centerX;
  var tY = this.owner.centerY;
  var pX = closestPlayer.centerX;
  var pY = closestPlayer.centerY;
  var distance = this.owner.distance(closestPlayer.center);

  var distanceX = rune.util.Math.abs(tX - pX);
  var distanceY = rune.util.Math.abs(tY - pY);

  this.owner.velocity.max.x = this.m_defaultMaxVelocityX;
  this.owner.velocity.max.y = this.m_defaultMaxVelocityY;
  // if (distance < 20) {
  //   this.owner.allowMovement = false;
  //   return;
  // } else {
  //   this.owner.allowMovement = true;
  // }

  if (distanceX > distanceY * 2) {

    if (tX > pX) {
      this.owner.moveLeft();
    } else if (tX < pX) {
      this.owner.moveRight();
    }

    this.owner.velocity.y = 0;

  } else if (distanceY > distanceX * 2) {

    if (tY > pY) {
      this.owner.moveUp();
    } else if (tY < pY) {
      this.owner.moveDown();
    }

    this.owner.velocity.x = 0;
  } else {
    // DIAGONAL
    this.owner.velocity.max.x = this.m_maxDiagonalVelocityX;
    this.owner.velocity.max.y = this.m_maxDiagonalVelocityY;

    if (tX > pX) {
      this.owner.moveLeft();
    } else if (tX < pX) {
      this.owner.moveRight();
    }

    if (tY > pY) {
      this.owner.moveUp();
    } else if (tY < pY) {
      this.owner.moveDown();
    }
  }
};