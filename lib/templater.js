var Readable = require('stream').Readable
  , fs = require('fs')
  , util = require('util')
  , dust = require('dustjs-linkedin')
  , template = dust.compile(  fs.readFileSync('./files/vast.xml.dust').toString()
                            , "vast")
;
dust.loadSource(template);

util.inherits(Templater, Readable);

var iid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

var random = iid;

function Templater(){
  var self = this;
  Readable.call(self);

  var channelData = { 
      iid: iid()
    , random: random // Dust will execute this lambda!
    , anticache: Date.now()
    , analyticsUrl: 'http://staging.analytics.domain.com'
    , clickTag: 'http://click-tracking.com'
    , companionAd: 'bose/v4t/assets/Q3FY13_SL2_Launch_Static_300x250.jpg'
    , creativeId: 23
    , flightId: 34
    , placementId: 99
    , externalPlacementId: 'FOO_BAR_BAZ'
    , impressions: [
        'http://ad-system.net/ad/N5305.FooBarBaz/123456.10;sz=1x1;ord=',
        'http://ad-server.com?key=value',
      ]
    , mediaFile: 'bose/v4t/bin/InStream.swf'
    , staticsUrl: 'http://staging.assets.domain.com'
  };

  // Simulate async Dynode look-up with 50ms timeout:
  setTimeout(function() {
    dust.render('vast', channelData, function(err, data) {
      if (err)
        return self.emit('error', err);

      self.push(data);
      self.push(null);
    });
  }, 50);
}
Templater.prototype._read = function(size) {}


module.exports = Templater;