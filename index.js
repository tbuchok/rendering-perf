require('newrelic');

var http = require('http')
  , fs = require('fs')
  , Templater = require('./lib/templater')
  , Replacer = require('./lib/replacer')
  , PORT = process.env.PORT || 8080 
;

http.createServer(function(req, res) {

  if (/^\/loaderio-467f2a1d42287faa43fbc4853e9a3965/.test(req.url))
    return res.end('loaderio-467f2a1d42287faa43fbc4853e9a3965');

  res.setHeader('content-type', 'text/xml');
  if (/^\/template/.test(req.url))
    return new Templater().pipe(res);

  fs.createReadStream('./files/vast.xml')
    .pipe(new Replacer)
    .pipe(res)
  ;
  
}).listen(PORT);
console.log('Listening on %s', PORT);
