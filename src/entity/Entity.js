howlkraul.entity.Entity = function (x, y, height, width, texture) {
  rune.display.Sprite.call(this, x || 0, y || 0, height, width, texture);
}

howlkraul.entity.Entity.prototype = Object.create(rune.display.Sprite.prototype);
howlkraul.entity.Entity.prototype.constructor = howlkraul.entity.Entity;

howlkraul.entity.Entity.prototype.moveRight = function () {
  this.flippedX = false;
  this.velocity.x++;
}

howlkraul.entity.Entity.prototype.moveLeft = function () {
  this.flippedX = true;
  this.velocity.x--;
}

howlkraul.entity.Entity.prototype.moveUp = function () {
  this.velocity.y--;
}

howlkraul.entity.Entity.prototype.moveDown = function () {
  this.velocity.y++;
}

howlkraul.entity.Entity.prototype.setVelocity = function (drag, max) {
  this.velocity.drag.x = drag;
  this.velocity.drag.y = drag;
  this.velocity.max.x = max;
  this.velocity.max.y = max;
};

howlkraul.entity.Entity.prototype.showDebug = function () {
  this.hitbox.debug = true;
  this.debug = true;
};
