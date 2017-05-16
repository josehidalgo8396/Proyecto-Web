var promotionService   = require('../businessLogic/promotionService.js');

exports.getAllPromotions = function(dRequest, dResponse) {
    var data = promotionService.allPromotions(function(data){
        dResponse.send(data);
    });
};
exports.addPromotion= function(dRequest, dResponse) {
    var data = promotionService.createPromotion(dRequest.body, function(data) {
        dResponse.send(data);
    });
};
exports.addImportantInfoPromotion = function(dRequest, dResponse) {
    var data = promotionService.createImportantInfoPromotion(dRequest.body, function(data) {
        dResponse.send(data);
    });
};
exports.addMustKnowInfoPromotion= function(dRequest, dResponse) {
    var data = promotionService.createMustKnowInfoPromotion(dRequest.body, function(data) {
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