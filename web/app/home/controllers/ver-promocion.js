
(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('VerPromocionCtrl', ["$scope", "$q", "HomeService", "messageHandlerService" , "shareSessionService","sharePromocionService",
     function ($scope, $q, homeService, messageHandlerService, shareSessionService,sharePromocionService) {
  
        $scope.user = {};
        $scope.promocion = {};


      $scope.getPromocion = function(pId) {
        homeService.getPromocion(pId).then(function(result) {
          if(result.success) {
            //console.log(result.data);
            $scope.promocion.info = result.data;
            $scope.getImportantInfoPromocion($scope.promocion.id); 
            $scope.getMustKnowInfoPromotion($scope.promocion.id); 
          }
          else {
            messageHandlerService.notifyWarning(null, result.message);
          }
        });
      };

      $scope.getImportantInfoPromocion = function(pId) {
        homeService.getImportantInfoPromotion(pId).then(function(result) {
          if(result.success) {
            $scope.promocion.importantInfo = result.data;
          }
          else {
            $scope.promocion.importantInfo = [];
          }
        });
      };

      $scope.getMustKnowInfoPromotion= function(pId) {
        homeService.getMustKnowInfoPromotion(pId).then(function(result) {
          if(result.success) {
            $scope.promocion.mustKnowInfo = result.data;
          }
          else {
            $scope.promocion.mustKnowInfo = [];
          }
        });
      };

      $scope.getPromocionId = function() {
        $scope.promocion.id = sharePromocionService.getPromocionId();
        console.log($scope.promocion.id);
      };


      $scope.sendPromotionInfo = function(data) {
        data.correo = $scope.user.usuario;
        homeService.sendPromotionInfo(data).then(function(result) {
          if(result.success){
            messageHandlerService.notifySuccess(null, result.message);
          }
          else{
            messageHandlerService.notifyWarning(null, result.message);
          }
        });
      };
        

      $scope.getUser = function() {
        var session = shareSessionService.getSession();
        $scope.user.usuario = session.usuario;
        $scope.user.rol = session.rol;
      };


      
      $scope.getPromocionId();
      $scope.getPromocion($scope.promocion.id);
      
  }]);
})();