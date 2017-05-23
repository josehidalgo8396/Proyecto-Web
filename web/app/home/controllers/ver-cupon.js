
(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('VerCuponCtrl', ["$scope", "$q", "HomeService", "messageHandlerService" , "shareSessionService","shareCuponService",
     function ($scope, $q, homeService, messageHandlerService, shareSessionService,shareCuponService) {
  
        $scope.user = {};
        $scope.cupon = {};


      $scope.getCupon = function(pId) {
        homeService.getCupon(pId).then(function(result) {
          if(result.success) {
            //console.log(result.data);
            $scope.cupon.info = result.data;
            $scope.getAdditionalInfoCupon($scope.cupon.id); 
            $scope.getRestrictionInfoCupon($scope.cupon.id); 
          }
          else {
            messageHandlerService.notifyWarning(null, result.message);
          }
        });
      };

      $scope.getAdditionalInfoCupon = function(pId) {
        homeService.getAdditionalInfoCupon(pId).then(function(result) {
          if(result.success) {
            $scope.cupon.additionalInfo = result.data;
          }
          else {
            $scope.cupon.additionalInfo = [];
          }
        });
      };

      $scope.getRestrictionInfoCupon = function(pId) {
        homeService.getRestrictionInfoCupon(pId).then(function(result) {
          if(result.success) {
            $scope.cupon.restrictionInfo = result.data;
          }
          else {
            $scope.cupon.restrictionInfo = [];
          }
        });
      };

      $scope.getCuponId = function() {
        $scope.cupon.id = shareCuponService.getCuponId();
        console.log($scope.cupon.id);
      };


      $scope.sendCuponInfo = function(data) {
        data.correo = $scope.user.usuario;
        homeService.sendCuponInfo(data).then(function(result) {
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


      
      $scope.getCuponId();
      $scope.getCupon($scope.cupon.id);
      
  }]);
})();