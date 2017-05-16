(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('GestionPromocionCtrl', ["$scope", "PromocionService", "messageHandlerService" , "shareSessionService",
     function ($scope, promocionService, messageHandlerService, shareSessionService) {
  
      $scope.user = {};
      $scope.cuponList = [];
      $scope.promotionList = [];
      $scope.filteredCupons = [];
      $scope.currentPage = 0;
      $scope.numPerPage = 5;
      $scope.maxSize = 0;


      $scope.getPromotions = function(){
        promocionService.getPromotions().then(function(result) {
          if (result.success){
            $scope.promotionList = result.data;
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
      $scope.getPromotions();
  }]);
})();