module.exports = function(opts){
    var time = opts.time || 1000;
    return function (req, res, next){
        var timer = setTimeout(function(){
            console.log('\033[91m 请求超时 \033[39m \n', req.method, req.url);
        }, time);

        var end = res.end;
        res.end = function(chunk, enconding){
            res.end = end;
            res.end(chunk, enconding);
            clearTimeout(timer);
        }
        next();
    }
}
