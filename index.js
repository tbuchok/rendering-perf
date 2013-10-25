var http = require('http')
  , fs = require('fs')
  , Templater = require('./lib/templater')
  , Replacer = require('./lib/replacer')
  , PORT = process.env.PORT || 8000 
;

http.createServer(function(req, res) {
  if (/^\/template/.test(req.url))
    return new Templater().pipe(res);

  fs.createReadStream('./files/vast.xml')
    .pipe(new Replacer)
    .pipe(res)
  ;
  
}).listen(PORT);
console.log('Listening on %s', PORT);
