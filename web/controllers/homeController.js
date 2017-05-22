
var homeService   = require('../businessLogic/homeService.js');

exports.getAllCupons = function(dRequest, dResponse) {
    var data = homeService.allCupons(function(data){
        dResponse.send(data);
    });
};

exports.getAllPromotions = function(dRequest, dResponse) {
    var data = homeService.allPromotions(function(data){
        dResponse.send(data);
    });
};

exports.getCuponTop5 = function(dRequest, dResponse) {
    var data = homeService.getCuponTop5(function(data){
        dResponse.send(data);
    });
};

exports.getPromotionTop5 = function(dRequest, dResponse) {
    var data = homeService.getPromotionTop5(function(data){
        dResponse.send(data);
    });
};

exports.sendCuponInfo = function(dRequest, dResponse) {
    var data = homeService.sendCuponInfo(dRequest.body, function(data){
        dResponse.send(data);
    });
};

exports.sendPromotionInfo = function(dRequest, dResponse) {
    var data = homeService.sendPromotionInfo(dRequest.body, function(data){
        dResponse.send(data);
    });
};