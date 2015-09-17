// node代码，引入包 websocket.io和express
var sio = require('socket.io'),
    express = require('express'),
    app = express();
// 对访问当前目录直接打到静态资源文件html中
app.use(express.static('html'));
// 监听2000端口
http = app.listen(2000);
// websocket 也监听http的端口
var server = sio.listen(http);
// 绑定事件，建立链接后的处理
var xx = 0,
    sockets = {};
server.on('connection', function(socket) {
    socket.on('sss', function(msg) {
        console.log(msg);
    });
    socket.on('close', function(msg) {
        console.log(msg);
    });

    setInterval(function() {
        socket.emit('karynsong', 'pang');
    }, 3000)
    setInterval(function() {
        console.log('pang2')
        socket.broadcast.emit('socketName2', 'pang2');
    }, 5000);
});
