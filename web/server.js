var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    sessionController     = require('./controllers/sessionController.js');

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));
//send the main page
app.get('/promo', function(req, res) {
    res.sendfile(__dirname + '/common/views/promo.html');
});
var pg = require("pg");
app.post('/login', sessionController.login);

server.listen(8080, function(){
	console.log('Listening at port 8080...');
});