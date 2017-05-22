(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('EditarPromocionCtrl', ["$scope", "PromocionService", "messageHandlerService" , "shareSessionService","$state", "sharePromocionService",
     function ($scope, promocionService, messageHandlerService, shareSessionService,$state, sharePromocionService) {
  
        $scope.user = {};

        $scope.promocion = {
            info : {
                id: 0,
                title: '',
                image1: '',
                image2: '',
                price: '',
                value: '',
                discount: 0,
                save: '',
                sold: 0
            },
            
            importantInfo: [],
            mustKnowInfo: []
        };

        $scope.inputPromocion = {
            importantInfo: {
                id: 0,
                info: ""
            },
            mustKnowInfo: {
                id: 0,
                info: ""
            }
        };

        $scope.getPromocion = function(id) {
            promocionService.getPromotion(id).then(function(result) {
                if(result.success) {
                    $scope.promocion.info = result.data;
                    $scope.getImportantInfo($scope.promocion.info.id);
                    $scope.getMustKnowInfo($scope.promocion.info.id);
                }
                else {
                    messageHandlerService.notifyWarning(null, result.message);
                }
            });
        };

        $scope.getImportantInfo = function(id) {
            promocionService.getImportantInfoPromotion(id).then(function(result) {
                if(result.success) {
                    $scope.promocion.importantInfo = result.data;
                }
                else{
                    messageHandlerService.notifyWarning(null, result.message);
                }
            });
        };

        $scope.getMustKnowInfo = function(id) {
            promocionService.getMustKnowInfoPromotion(id).then(function(result) {
                if(result.success) {
                    $scope.promocion.mustKnowInfo = result.data;
                }
                else{
                    messageHandlerService.notifyWarning(null, result.message);
                }
            })
        };

        $scope.editPromotion = function(pData) {
            promocionService.updatePromotion(pData).then(function(result) {
                if(result.success) {
                    messageHandlerService.notifySuccess(null, result.message);
                }
                else{
                    messageHandlerService.notifyWarning(null, result.message);
                }
            });
        };

        $scope.editarImportantInfo = function(info) {
            $scope.inputPromocion.importantInfo.id = info.id;
            $scope.inputPromocion.importantInfo.info = info.info;
        };

        $scope.editarMustKnowInfo = function(info) {
            $scope.inputPromocion.mustKnowInfo.id = info.id;
            $scope.inputPromocion.mustKnowInfo.info = info.info;
        };

        $scope.updateImportantInfo = function(pIsValid, pData) {
            if(pIsValid){
                promocionService.updateImportantInfoPromotion(pData).then(function(result) {
                    if(result.success) {
                        messageHandlerService.notifySuccess(null, result.message);
                        $scope.promocion.importantInfo.forEach(function(value) {
                            if(value.id == pData.id){
                                value.info = pData.info;
                                return;
                            }
                        });
                        cleanImportantInfo();
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

        $scope.updateMustKnowInfo = function(pIsValid, pData) {
            if(pIsValid){
                promocionService.updateMustKnowInfoPromotion(pData).then(function(result) {
                    if(result.success) {
                        messageHandlerService.notifySuccess(null, result.message);
                        $scope.promocion.mustKnowInfo.forEach(function(value) {
                            if(value.id == pData.id){
                                value.info = pData.info;
                                return;
                            }
                        });
                        cleanMustKnowInfo();
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
        

        var addImportantInfoPromotion = function(pData) {
            promocionService.addImportantInfoPromotion(pData).then(function(result) {
                if(!result.success) {
                    messageHandlerService.notifyWarning(null, result.message);            
                }
                else{
                    messageHandlerService.notifySuccess(null, result.message);
                    var data = {id: $scope.promocion.importantInfo.length+1, info: pData.params.info};  
                    addImportantInfo(data);
                }
            });
        };

        var addMustKnowInfoPromotion = function(pData) {
            promocionService.addMustKnowInfoPromotion(pData).then(function(result) {
                if(!result.success) {
                    messageHandlerService.notifyWarning(null, result.message);            
                }
                else{
                    messageHandlerService.notifySuccess(null, result.message);
                    var data = {id: $scope.promocion.mustKnowInfo.length+1, info: pData.params.info};
                    addMustKnowInfo(data);
                }
            });
        };  

        $scope.validImportantInfoForm = function(pIsValid, pData) {
            if(pIsValid) { 
                var newImportantInfo = {
                    id: $scope.promocion.info.id,
                    params: pData
                };
                addImportantInfoPromotion(newImportantInfo);
            }
            else {
                var message = 'Debe completar todos los campos de la información importante de manera correcta';
                messageHandlerService.notifyError(null, message);
            }
        };

        $scope.validMustKnowInfoForm = function(pIsValid, pData) {
            if(pIsValid) { 
                var newMustKnowInfo = {
                    id: $scope.promocion.info.id,
                    params: pData
                };
                addMustKnowInfoPromotion(newMustKnowInfo);
            }
            else {
                var message = 'Debe completar la información de manera correcta';
                messageHandlerService.notifyError(null, message);
            }
        };


        $scope.validatedPromotion = function(pIsValid, pData) {
            if(pIsValid) { 
                $scope.editPromotion(pData);
            }
            else {
                var message = 'Debe completar la información de manera correcta';
                messageHandlerService.notifyError(null, message);
            }
        };


        var addImportantInfo = function(pData) {
            $scope.promocion.importantInfo.push(pData);
            cleanImportantInfo();
        };  

        var cleanImportantInfo = function() {
            $scope.inputPromocion.importantInfo.info = '';
        };

        var addMustKnowInfo = function(pData) {
            $scope.promocion.mustKnowInfo.push(pData);
            cleanMustKnowInfo();
        };  

        var cleanMustKnowInfo = function() {
            $scope.inputPromocion.mustKnowInfo.info = '';
        };


        $scope.getPromocionId = function() {
            $scope.promocion.info.id = sharePromocionService.getPromocionId();
        };

        $scope.getUser = function() {
            var session = shareSessionService.getSession();
            $scope.user.usuario = session.usuario;
            $scope.user.rol = session.rol;
        };

        $scope.getUser();
        $scope.getPromocionId();
        console.log($scope.promocion.info.id);
        $scope.getPromocion($scope.promocion.info.id);

  }]);
})();