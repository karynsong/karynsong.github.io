var request = require('superagent'),
    assert = require('assert');

request.get('http://localhost:2000/index.htm')
    .end(function(err, res){
        if(!res){
            return
        }
        assert.ok(200 === res.status);
        assert.ok(~res.text.indexOf('io.connect'))
    })
