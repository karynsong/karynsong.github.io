var net = require('net');

var count = 0,      // 用于统计加入聊天室的人数
    users = {};

function pushMessage(userName, message){
    for(var x in users){
        if(x !== userName){
            users[x].write(message);
        }
    }
}

var server = net.createServer(function(connet){
    var userName;

    connet.setEncoding('utf8');

    ++count;

    connet.write('\033[91m 欢迎来到karyn聊天室 \033[39m \n');
    connet.write('\033[91m 目前聊天室中有' + count + '人 \033[39m \n');
    connet.write('\033[91m 请输入你的名字： \033[39m');

    connet.on('data', function(data){
        data = data.replace('\r\n', '');

        if(!userName){
            if(users[data]) {
                connet.write('\033[91m 名字和聊天室中有重复，请重新命名 \033[39m \n');
                return;
            }else{
                userName = data;
                users[data] = connet;
                pushMessage(userName, '\033[91m 欢迎' + userName + '加入聊天室 \033[39m \n')
            }
        }else{
            pushMessage(userName, '\033[91m ' + userName + ' ： \033[39m' + data + '\n');
        }
    });

    connet.on('close', function(data){
        --count;
        delete users[userName]
    });

});

server.listen(2000, function(){
    console.log('\033[91m 正在监听2000端口 \033[39m');
})
