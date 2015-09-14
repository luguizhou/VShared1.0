var redis = require('redis'),
    coRedis = require('co-redis');

module.exports = exports = function* redisy(next) {
  var ctx = this;
  this.redis = coRedis(redis.createClient());
  this.redis.onBase = function onBase(baseName) { ctx.redis.select(baseName); return ctx.redis; }
  yield next;
}
