var Bagpipe = require('bagpipe'),
    fs = require('fs');

// 设定最大并发数为1
var bagpipe = new Bagpipe(2);
bagpipe.on('full', function (length) {
    console.warn('底层系统处理不能及时完成，队列拥堵，目前队列长度为:' + length);
});
fs.readdirSync('.').forEach(function(file){
    bagpipe.push(fs.readFile, file, 'utf-8', function(err, data) {
        console.log(data)
    });
})
