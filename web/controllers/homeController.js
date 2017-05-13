
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