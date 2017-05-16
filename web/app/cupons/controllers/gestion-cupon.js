(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('GestionCuponCtrl', ["$scope", "CuponService", "messageHandlerService" , "shareSessionService",
     function ($scope, cuponService, messageHandlerService, shareSessionService) {
  
      $scope.user = {};
      $scope.cuponList = [];
      $scope.promotionList = [];
      $scope.filteredCupons = [];
      $scope.currentPage = 0;
      $scope.numPerPage = 5;
      $scope.maxSize = 0;

      $scope.getCupons = function(){
        cuponService.getCupons().then(function(result) {
          if (result.success){
            $scope.cuponList = result.data;
            console.log($scope.cuponList);
            $scope.currentPage = 1;
            $scope.maxSize = $scope.cuponList.length;
          }
          else{
            $scope.cuponList = [];
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

      $scope.getUser = function() {
        $scope.user = shareSessionService.getSession();
      };

      $scope.getUser();
      $scope.getCupons();

  }]);
})();