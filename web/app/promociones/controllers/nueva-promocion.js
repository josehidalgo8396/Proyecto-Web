(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('NuevaPromocionCtrl', ["$scope", "PromocionService", "messageHandlerService" , "shareSessionService","$state",
     function ($scope, promocionService, messageHandlerService, shareSessionService,$state) {
  
      $scope.user = {};

      $scope.promocion = {
        info : {
          title: '',
          image1: '',
          image2: '',
          price: 0,
          value: 0,
          discount: 0,
          save: 0,
          sold: 0
        },
        
        importantInfo: [],
        mustKnowInfo: []
      };

      $scope.inputPromocion = {
        importantInfo: {
            info: ""
        },
        mustKnowInfo: {
            info: ""
        }
      };


      $scope.addPromotion = function(pData){
        console.log(pData);
        promocionService.addPromotion(pData).then(function(result) {
          if(result.success) {
            messageHandlerService.notifySuccess(null, result.message);
            var i;
            for (i = 0; i < pData.importantInfo.length; i++) {  
              var data = {
                id: result.data,  
                params: pData.importantInfo[i] 
              };
              addImportantInfoPromotion(data);
            }
            for (i = 0; i < pData.mustKnowInfo.length; i++) {
              var data = {
                id: result.data,  
                params: pData.mustKnowInfo[i] 
              };
              addMustKnowInfoPromotion(data);
            }
            $state.go('gestionar-promociones');
          }
          else {
            messageHandlerService.notifyWarning(null, result.message);
          }
        });
      };
      

      var addImportantInfoPromotion = function(pData) {
          promocionService.addImportantInfoPromotion(pData).then(function(result) {
            if(!result.success) {
              messageHandlerService.notifyWarning(null, result.message);            
            }
          });
        };

      var addMustKnowInfoPromotion = function(pData) {
          promocionService.addMustKnowInfoPromotion(pData).then(function(result) {
            if(!result.success) {
              messageHandlerService.notifyWarning(null, result.message);            
            }
          });
        };  



        $scope.validImportantInfoForm = function(pIsValid, pData) {
          if(pIsValid && pData.grado != "") { 
            addImportantInfo(pData);
          }
          else {
            var message = 'Debe completar todos los campos de la información importante de manera correcta';
            messageHandlerService.notifyError(null, message);
          }
      };

      $scope.validMustKnowInfoForm = function(pIsValid, pData) {
        if(pIsValid) { 
          addMustKnowInfo(pData);
        }
        else {
          var message = 'Debe completar la información de manera correcta';
          messageHandlerService.notifyError(null, message);
        }
      };


      $scope.validatedPromotion = function(pIsValid, pData) {
          if(pIsValid) { 
            var result = completeAllPromotionData(pData);
            if(result.success) {
              $scope.addPromotion(pData);
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


      var addImportantInfo = function(pData) {
        var newImportantInfo = {
          info: pData.info
        };
        $scope.promocion.importantInfo.push(newImportantInfo);
        cleanImportantInfo();
      };  

      var cleanImportantInfo = function() {
        $scope.inputPromocion.importantInfo.info = '';
      };



      var addMustKnowInfo = function(pData) {
          var newMustKnowInfo = {
            info: pData.info
          };
          $scope.promocion.mustKnowInfo.push(newMustKnowInfo);
          cleanMustKnowInfo();
      };  

      var cleanMustKnowInfo = function() {
          $scope.inputPromocion.mustKnowInfo.info = '';
      };



      var completeAllPromotionData = function() {
          var status = {};
          var largoImportantInfo = $scope.promocion.importantInfo.length;
          var largoMustKnowInfo = $scope.promocion.mustKnowInfo.length;
          if((largoImportantInfo > 0) & (largoMustKnowInfo > 0)) {
            status.success = true;
          }
          else {
            status.success = false;
            status.message = 'Debe agregar todas las secciones de información';
          }
          return status;
      };

      $scope.getUser = function() {
          $scope.user = shareSessionService.getSession();
      };

      $scope.getUser();

  }]);
})();