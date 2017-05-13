(function(){
  'use strict';

  /**
   * @ngdoc Controller
   * @author Luis Javier Ramírez Torres
   * @name GestionUsuariosCtrl
   * @description
   * #  controller para los cupones y promociones
   */
  angular
    .module('webApp')
    .controller('GestionHomeCtrl', ["$scope", "HomeService", "messageHandlerService" , "shareSessionService",
     function ($scope, homeService, messageHandlerService, shareSessionService) {
  
      $scope.user = {};
      $scope.cuponList = [];
      $scope.promotionList = [];

      $scope.getCupons = function(){
        homeService.getCupons().then(function(result) {
          if (result.success){
            $scope.cuponList = result.data.split(",");
            console.log($scope.cuponList);
          }
          else{
            $scope.cuponList = [];
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

      $scope.getPromotions = function(){
        homeService.getPromotions().then(function(result) {
          if (result.success){
            $scope.promotionList = result.data.split(",");
            console.log($scope.promotionList);
          }
          else{
            $scope.promotionList = [];
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

      $scope.getUser = function() {
        $scope.user = shareSessionService.getSession();
      };

      $scope.getUser();
      $scope.getCupons();
      $scope.getPromotions();
  }]);
})();