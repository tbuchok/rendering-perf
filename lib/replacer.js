var Transform = require('stream').Transform
  , util = require('util')
;

util.inherits(Replacer, Transform);
function Replacer() {
  Transform.call(this);
}
Replacer.prototype._transform = function(chunk, enc, next) {
  var replaced = chunk.toString()
                      .replace(/domain_CACHE_BUSTER/g, Date.now());
  this.push(replaced);
  next();
}

module.exports = Replacer;