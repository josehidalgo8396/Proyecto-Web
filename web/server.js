var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    sessionController     = require('./controllers/sessionController.js')
    userController  =require('./controllers/userController.js'),
    contactController   =require('./controllers/contactController.js');
    homeController = require('./controllers/homeController.js');
    cuponController = require('./controllers/cuponController.js');
    promotionController = require('./controllers/promotionController.js');


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));
//send the main page
app.get('/', function(req, res) {
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

app.get('/home/cupones',homeController.getAllCupons);
app.get('/home/promociones',homeController.getAllPromotions);

app.get('/cupones',cuponController.getAllCupons);
app.get('/cupones/:id', cuponController.getCupon);
app.get('/cupones/restrictionInfo/:id', cuponController.getRestrictionInfo);
app.get('/cupones/additionalInfo/:id', cuponController.getAdditionalInfo);
app.post('/cupones',cuponController.addCupon);
app.post('/cupones/additionalInfo',cuponController.addAdditionalInfoCupon);
app.post('/cupones/restrictionInfo',cuponController.addRestrictionInfoCupon);
app.put('/cupones/:id', cuponController.updateCupon);
app.put('/cupones/disable/:id',cuponController.disableCupon);
app.put('/cupones/additionalInfo/:id',cuponController.updateAdditionalInfoCupon);
app.put('/cupones/restrictionInfo/:id',cuponController.updateRestrictionInfoCupon);

app.get('/promociones',promotionController.getAllPromotions);
app.post('/promociones',promotionController.addPromotion);
app.post('/promociones/importantInfo',promotionController.addImportantInfoPromotion);
app.post('/promociones/mustKnowInfo',promotionController.addMustKnowInfoPromotion);
app.put('/promociones/disable/:id',promotionController.disablePromotion);

server.listen(8080, function(){
	console.log('Listening at port 8080...');
});