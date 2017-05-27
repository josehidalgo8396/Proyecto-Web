
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

exports.getCupon= function(dRequest, dResponse) {
    var data = homeService.getCupon(dRequest.params, function(data) {
        dResponse.send(data);
    });
};
exports.getAdditionalInfo = function(dRequest, dResponse) {
    var data = homeService.getAdditionalInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.getRestrictionInfo = function(dRequest, dResponse) {
    var data = homeService.getRestrictionInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};
exports.getPromotion= function(dRequest, dResponse) {
    var data = homeService.getPromotion(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.getImportantInfo= function(dRequest, dResponse) {
    var data = homeService.getImportantInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.getMustKnowInfo= function(dRequest, dResponse) {
    var data = homeService.getMustKnowInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.setCommentCupon= function(dRequest, dResponse) {
    var data = homeService.setCommentCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.setCommentPromotion= function(dRequest, dResponse) {
    var data = homeService.setCommentPromotion(dRequest.body, function(data) {
        dResponse.send(data);
    });
};