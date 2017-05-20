var cuponService   = require('../businessLogic/cuponService.js');

exports.getAllCupons = function(dRequest, dResponse) {
    var data = cuponService.allCupons(function(data){
        dResponse.send(data);
    });
};

exports.addCupon= function(dRequest, dResponse) {
    var data = cuponService.createCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.addAdditionalInfoCupon= function(dRequest, dResponse) {
    var data = cuponService.createAdditionalInfoCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};
exports.addRestrictionInfoCupon= function(dRequest, dResponse) {
    var data = cuponService.createRestrictionInfoCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.updateCupon= function(dRequest, dResponse) {
    var data = cuponService.updateCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.getCupon= function(dRequest, dResponse) {
    var data = cuponService.getCupon(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.disableCupon= function(dRequest, dResponse) {
    var data = cuponService.disableCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.getAdditionalInfo = function(dRequest, dResponse) {
    var data = cuponService.getAdditionalInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.getRestrictionInfo = function(dRequest, dResponse) {
    var data = cuponService.getRestrictionInfo(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.updateCupon = function(dRequest, dResponse) {
    var data = cuponService.updateCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.updateAdditionalInfoCupon = function(dRequest, dResponse) {
    var data = cuponService.updateAdditionalInfoCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.updateRestrictionInfoCupon = function(dRequest, dResponse) {
    var data = cuponService.updateRestrictionInfoCupon(dRequest.body, function(data) {
        dResponse.send(data);
    });
};