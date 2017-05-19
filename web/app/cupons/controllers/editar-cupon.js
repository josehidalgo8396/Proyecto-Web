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
                    info: ""
                },
                restrictionInfo: {
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
                console.log(pData);
                cuponService.addCupon(pData).then(function(result) {
                if(result.success) {
                    messageHandlerService.notifySuccess(null, result.message);
                    var i;
                    for (i = 0; i < pData.additionalInfo.length; i++) {  
                        var data = {
                            id: result.data,  
                            params: pData.additionalInfo[i] 
                        };
                        addAdditionalInfoCupon(data);
                    }
                    for (i = 0; i < pData.restrictionInfo.length; i++) {
                        var data = {
                            id: result.data,  
                            params: pData.restrictionInfo[i] 
                        };
                        addRestrictionInfoCupon(data);
                    }
                    $state.go('gestionar-cupones');
                }
                else {
                    messageHandlerService.notifyWarning(null, result.message);
                }
                });
            };
            

            var addAdditionalInfoCupon = function(pData) {
                cuponService.addAdditionalInfoCupon(pData).then(function(result) {
                    if(!result.success) {
                        messageHandlerService.notifyWarning(null, result.message);            
                    }
                });
            };

            var addRestrictionInfoCupon = function(pData) {
                cuponService.addRestrictionInfoCupon(pData).then(function(result) {
                    if(!result.success) {
                        messageHandlerService.notifyWarning(null, result.message);            
                    }
                });
            };  


            $scope.validAdditionalInfoForm = function(pIsValid, pData) {
                if(pIsValid && pData.grado != "") { 
                    addAdditionalInfo(pData);
                }
                else {
                    var message = 'Debe completar todos los campos de la información adicional de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };

            $scope.validRestrictionInfoForm = function(pIsValid, pData) {
                if(pIsValid) { 
                    addRestrictionInfo(pData);
                }
                else {
                    var message = 'Debe completar la información de restricciones de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };


            $scope.validatedCupon = function(pIsValid, pData) {
                if(pIsValid) { 
                    var result = completeAllCuponData(pData);
                    if(result.success) {
                        $scope.editCupon(pData);
                    }
                    else {
                        messageHandlerService.notifyWarning(null, result.message);
                    }
                }
                else {
                    var message = 'Debe completar la información de manera correcta';
                    messageHandlerService.notifyError(null, message);
                }
            };

            var addAdditionalInfo = function(pData) {
                var newAdditionalInfo = {
                    info: pData.info
                };
                $scope.cupon.additionalInfo.push(newAdditionalInfo);
                cleanAdditionalInfo();
            };  

            var cleanAdditionalInfo = function() {
                $scope.inputCupon.additionalInfo.info = '';
            };

            var addRestrictionInfo = function(pData) {
                var newRestrictionInfo = {
                    info: pData.info
                };
                $scope.cupon.restrictionInfo.push(newRestrictionInfo);
                cleanRestrictionInfo();
            };  

            var cleanRestrictionInfo = function() {
                $scope.cupon.restrictionInfo.info = '';
            };

            var completeAllCuponData = function() {
                var status = {};
                var largoAdditionalInfo = $scope.cupon.additionalInfo.length;
                var largoRestrictionInfo = $scope.cupon.restrictionInfo.length;
                if((largoAdditionalInfo > 0) & (largoRestrictionInfo > 0)) {
                    status.success = true;
                }
                else {
                    status.success = false;
                    status.message = 'Debe agregar todas las secciones de información';
                }
                return status;
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