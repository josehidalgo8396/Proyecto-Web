var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    sessionController     = require('./controllers/sessionController.js')
    userController  =require('./controllers/userController.js'),
    contactController   =require('./controllers/contactController.js');
    homeController = require('./controllers/homeController.js');

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));
//send the main page
app.get('/promo', function(req, res) {
    res.sendfile(__dirname + '/common/views/promo.html');
});

app.post('/login', sessionController.login);

app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.addUser);
app.put('/users/:id', userController.updateUser);
app.put('/users/disable/:id',userController.disableUser);
app.put('/changePassword/:id', userController.changePassword);

app.post('/sendMail', contactController.sendMail);


app.get('./home',homeController.getAllCupons);
app.get('./home',homeController.getAllPromotions);



server.listen(8080, function(){
	console.log('Listening at port 8080...');
});