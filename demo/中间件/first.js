var connect = require('connect'),
    serveStatic = require('serve-static'),
    serveQuery = require('connect-query'),
    connectLogger = require('connect-logger'),
    bodyParser  = require('body-parser'),
    time = require('./request-time.js');

var server = connect(connect.logger('dev'));

server.use(time({time: 1000}));

server.use('/karyn', serveStatic('./images'));

server.use(serveQuery());
server.use(connect.cookieParser());

server.use(function(req, res, next){
    if('/a' === req.url){
        res.writeHead(200,{
            'Content-Type': 'text/html'
        });
        res.end('<form action="/c" method="POST" enctype="multipart/form-data"><input type="file" /><button>send</button></form>');
    }else {
        next();
    }
})

server.use(function(req, res, next){
    if('/b' === req.url){
        setTimeout(function(){
            res.writeHead(200);
            res.end('Slow!');
        },1000)
    }else {
        next();
    }
})

server.use(function(req, res, next){
    if('/c' === req.url){
        console.log(req.body,req.param)
        res.end('success');
    }else {
        next();
    }
})

server.listen(2000)
