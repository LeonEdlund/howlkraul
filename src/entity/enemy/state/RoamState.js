howlkraul.entity.RoamState = function () {
  rune.state.State.call(this, "Roam");

  this.m_endMoveTime = 0;
  this.m_moveTime = rune.util.Math.randomInt(1000, 3000);
  this.m_direction = null;
}

howlkraul.entity.RoamState.prototype = Object.create(rune.state.State.prototype);
howlkraul.entity.RoamState.prototype.constructor = howlkraul.entity.RoamState;


/**
 * @override
*/
howlkraul.entity.RoamState.prototype.init = function () {
  rune.state.State.prototype.init.call(this);
};

/**
 * @override
*/
howlkraul.entity.RoamState.prototype.update = function (step) {
  rune.state.State.prototype.update.call(this, step);
  this.m_roam();
};

howlkraul.entity.RoamState.prototype.onEnter = function () {
  rune.state.State.prototype.onEnter.call(this);
  this.owner.setVelocity(0.08, 0.5);
};


howlkraul.entity.RoamState.prototype.m_roam = function () {
  var now = Date.now();

  if (now >= this.m_endMoveTime) {
    this.m_getDirection();

    this.m_moveTime = rune.util.Math.randomInt(1000, 1500);
    this.m_endMoveTime = now + this.m_moveTime;
  }

  if (this.m_direction) {
    this.m_direction();
  }
};

howlkraul.entity.RoamState.prototype.m_getDirection = function () {
  var directions = [
    this.owner.moveUp.bind(this.owner),
    this.owner.moveDown.bind(this.owner),
    this.owner.moveLeft.bind(this.owner),
    this.owner.moveRight.bind(this.owner),
  ];

  var rIndex = rune.util.Math.randomInt(0, directions.length - 1);
  var direction = directions[rIndex];

  if (direction === this.m_direction) {
    this.m_getDirection();
  }

  this.m_direction = direction;

  if (this.m_direction) {
    this.m_direction();
  }
};