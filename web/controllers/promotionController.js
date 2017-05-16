var promotionService   = require('../businessLogic/promotionService.js');

exports.getAllPromotions = function(dRequest, dResponse) {
    var data = promotionService.allPromotions(function(data){
        dResponse.send(data);
    });
};
/*exports.addCupon= function(dRequest, dResponse) {
    var data = cuponService.addCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};
*/

/*
exports.updateCupon= function(dRequest, dResponse) {
    var data = cuponService.updateCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.disableCupon= function(dRequest, dResponse) {
    var data = cuponService.disableCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};*/