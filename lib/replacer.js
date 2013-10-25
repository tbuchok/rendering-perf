var Readable = require('stream').Readable
  , util = require('util')
  , fs = require('fs')
  , xml = fs.readFileSync('./files/vast.xml').toString()
;

util.inherits(Replacer, Readable);
function Replacer() {
  Readable.call(this);
  this.push(xml.replace(/domain_CACHE_BUSTER/g, Date.now()));
  this.push(null);
}
Replacer.prototype._read = function(size) {}

module.exports = Replacer;