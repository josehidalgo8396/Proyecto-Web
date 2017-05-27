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
app.get('/home/cupones/top5',homeController.getCuponTop5);
app.get('/home/promociones',homeController.getAllPromotions);
app.get('/home/promociones/top5',homeController.getPromotionTop5);
app.get('/home/cupones/:id',homeController.getCupon);
app.get('/home/cupones/additionalInfo/:id',homeController.getAdditionalInfo);
app.get('/home/cupones/restrictionInfo/:id',homeController.getRestrictionInfo);
app.get('/home/promociones/:id',homeController.getPromotion);
app.get('/home/promociones/importantInfo/:id',homeController.getImportantInfo);
app.get('/home/promociones/mustKnowInfo/:id',homeController.getMustKnowInfo);
app.post('/home/cupones/send', homeController.sendCuponInfo);
app.post('/home/promociones/send', homeController.sendPromotionInfo);
app.post('/home/cupon/comment', homeController.setCommentCupon);
app.post('/home/promocion/comment', homeController.setCommentPromotion);


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
app.get('/promociones/:id', promotionController.getPromotion);
app.get('/promociones/importantInfo/:id', promotionController.getImportantInfo);
app.get('/promociones/mustKnowInfo/:id', promotionController.getMustKnowInfo);
app.post('/promociones',promotionController.addPromotion);
app.post('/promociones/importantInfo',promotionController.addImportantInfoPromotion);
app.post('/promociones/mustKnowInfo',promotionController.addMustKnowInfoPromotion);
app.put('/promociones/:id', promotionController.updatePromotion);
app.put('/promociones/disable/:id',promotionController.disablePromotion);
app.put('/promociones/importantInfo', promotionController.updateImportantInfo);
app.put('/promociones/mustKnowInfo', promotionController.updateMustKnowInfo);

/*server.listen(8080, function(){
	console.log('Listening at port 8080...');
});*/

server.listen(process.env.PORT || 5000, function(){
    console.log('Listening at port 5000...');
});