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