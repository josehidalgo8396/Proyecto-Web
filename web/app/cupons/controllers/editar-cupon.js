(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('EditarCuponCtrl', ["$scope", "$state", "CuponService", "messageHandlerService", "shareSessionService", "shareCuponService",
        function ($scope, $state, cuponService, messageHandlerService, shareSessionService, shareCuponService) {
            $scope.user = {};

            $scope.cupon = {
                info : {
                    id: 0,
                    title: '',
                    subtitle: '',
                    image: '',
                    maxprice: 0,
                    normalprice: 0,
                    save: 0,
                    sold: 0,
                    days: 0
                },
                additionalInfo: [],
                restrictionInfo: []
            };

            $scope.inputCupon = {
                additionalInfo: {
                    id: 0,
                    info: ""
                },
                restrictionInfo: {
                    id: 0,
                    info: ""
                }
            };

            $scope.getCupon = function(id) {
                cuponService.getCupon(id).then(function(result) {
                    if(result.success) {
                        $scope.cupon.info = result.data;
                        $scope.getAdditionalInfo($scope.cupon.info.id);
                        $scope.getRestrictionInfo($scope.cupon.info.id);
                    }
                    else {
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                });
            };

            $scope.getRestrictionInfo = function(id) {
                cuponService.getRestrictionInfoCupon(id).then(function(result) {
                    if(result.success) {
                        $scope.cupon.restrictionInfo = result.data;
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                });
            };

            $scope.getAdditionalInfo = function(id) {
                cuponService.getAdditionalInfoCupon(id).then(function(result) {
                    if(result.success) {
                        $scope.cupon.additionalInfo = result.data;
                    }
                    else{
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                })
            };

            $scope.editCupon = function(pData){
                cuponService.updateCupon(pData).then(function(result) {
                    if(result.success) {
                        messageHandlerService.notifySuccess(null, result.message);
                    }
                    else {
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                });
            };
            
            $scope.editarAdditionalInfo = function(infoA) {
                $scope.inputCupon.additionalInfo.id = infoA.id;
                $scope.inputCupon.additionalInfo.info = infoA.info;
            };

            $scope.editarRestrictionInfo = function(infoR) {
                $scope.inputCupon.restrictionInfo.id = infoR.id;
                $scope.inputCupon.restrictionInfo.info = infoR.info;
            };

            var addAdditionalInfoCupon = function(pData) {
                cuponService.addAdditionalInfoCupon(pData).then(function(result) {
                    if(!result.success) {
                        messageHandlerService.notifyWarning(null, result.message);            
                    }
                    else{
                        messageHandlerService.notifySuccess(null, result.message);
                        var data = {id: $scope.cupon.additionalInfo.length+1, info: pData.params.info};            
                        addAdditionalInfo(data);
                    }
                });
            };

            var addRestrictionInfoCupon = function(pData) {
                cuponService.addRestrictionInfoCupon(pData).then(function(result) {
                    if(!result.success) {
                        messageHandlerService.notifyWarning(null, result.message);            
                    }
                    else{
                        messageHandlerService.notifySuccess(null, result.message);
                        var data = {id: $scope.cupon.restrictionInfo.length+1, info: pData.params.info};  
                        addRestrictionInfo(data);
                    }
                });
            };  

            $scope.validAdditionalInfoForm = function(pIsValid, pData) {
                if(pIsValid) { 
                    var newAdditionalInfo = {
                        id: $scope.cupon.info.id,
                        params: pData
                    };
                    addAdditionalInfoCupon(newAdditionalInfo);
                }
                else {
                    var message = 'Debe completar todos los campos de la información adicional de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };

            $scope.validRestrictionInfoForm = function(pIsValid, pData) {
                if(pIsValid) { 
                    var newRestrictionInfo = {
                        id: $scope.cupon.info.id,
                        params: pData
                    };
                    addRestrictionInfoCupon(newRestrictionInfo);
                }
                else {
                    var message = 'Debe completar la información de restricciones de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };


            $scope.validatedCupon = function(pIsValid, pData) {
                if(pIsValid) { 
                    $scope.editCupon(pData);
                }
                else {
                    var message = 'Debe completar la información de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };

            $scope.updateAdditionalInfo = function(pIsValid, pData) {
                if(pIsValid){
                    cuponService.updateAdditionalInfoCupon(pData).then(function(result) {
                        if(result.success) {
                            messageHandlerService.notifySuccess(null, result.message);
                            $scope.cupon.additionalInfo.forEach(function(value) {
                                if(value.id == pData.id){
                                    value.info = pData.info;
                                    return;
                                }
                            });
                            cleanAdditionalInfo();
                        }
                        else{
                            messageHandlerService.notifyWarning(null, result.message);
                        }
                    });
                }
                else {
                    var message = 'Debe completar la información de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };

            $scope.updateRestrictionInfo = function(pIsValid, pData) {
                if(pIsValid){
                    cuponService.updateRestrictionInfoCupon(pData).then(function(result) {
                        if(result.success) {
                            messageHandlerService.notifySuccess(null, result.message);
                            $scope.cupon.restrictionInfo.forEach(function(value) {
                                if(value.id == pData.id){
                                    value.info = pData.info;
                                    return;
                                }
                            });
                            cleanRestrictionInfo();
                        }
                        else{
                            messageHandlerService.notifyWarning(null, result.message);
                        }
                    });
                }
                else {
                    var message = 'Debe completar la información de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };

            var addAdditionalInfo = function(pData) {
                $scope.cupon.additionalInfo.push(pData);
                cleanAdditionalInfo();
            };  

            var cleanAdditionalInfo = function() {
                $scope.inputCupon.additionalInfo.info = '';
            };

            var addRestrictionInfo = function(pData) {
                $scope.cupon.restrictionInfo.push(pData);
                cleanRestrictionInfo();
            };  

            var cleanRestrictionInfo = function() {
                $scope.inputCupon.restrictionInfo.info = '';
            };

            $scope.getUser = function() {
                var session = shareSessionService.getSession();
                $scope.user.usuario = session.usuario;
                $scope.user.rol = session.rol;
            };

            $scope.getCuponId = function(){
                $scope.cupon.info.id = shareCuponService.getCuponId();
            };

            $scope.getCuponId();
            $scope.getCupon($scope.cupon.info.id);
            $scope.getUser();
    }]);
})();