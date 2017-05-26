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

exports.disablePromotion= function(dRequest, dResponse) {
    var data = promotionService.disablePromotion(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.getPromotion= function(dRequest, dResponse) {
    var data = promotionService.getPromotion(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.getImportantInfo= function(dRequest, dResponse) {
    var data = promotionService.getImportantInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.getMustKnowInfo= function(dRequest, dResponse) {
    var data = promotionService.getMustKnowInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.updatePromotion= function(dRequest, dResponse) {
    var data = promotionService.updatePromotion(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.updateImportantInfo= function(dRequest, dResponse) {
    var data = promotionService.updateImportantInfo(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.updateMustKnowInfo= function(dRequest, dResponse) {
    var data = promotionService.updateMustKnowInfo(dRequest.body, function(data) {
        dResponse.send(data);
    });
};