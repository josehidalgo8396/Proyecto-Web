/*
   * @ngdoc Controller
   * @author Luis Javier Ramírez Torres
   * @name GestionUsuariosCtrl
   * @description
   * #  controller para los cupones y promociones
*/

(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('GestionHomeCtrl', ["$scope", "$q", "HomeService", "messageHandlerService" , "shareSessionService",
     function ($scope, $q, homeService, messageHandlerService, shareSessionService) {
  
      $scope.user = {};
      $scope.cuponList = [];
      $scope.promotionList = [];
      $scope.filteredCupons = [];
      $scope.currentPage = 0;
      $scope.numPerPage = 5;
      $scope.maxSize = 0;

      $scope.getCupons = function(){
        homeService.getCupons().then(function(result) {
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

      $scope.getPromotions = function(){
        homeService.getPromotions().then(function(result) {
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

      $scope.$watch('currentPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
        $scope.filteredCupons = $scope.cuponList.slice(begin, end);
      });

      $scope.getUser = function() {
        $scope.user = shareSessionService.getSession();
      };

      $scope.lol = function() {
        $scope.p = false;
      }
      $scope.p = true;
      $scope.getUser();
      $scope.getCupons();
      $scope.getPromotions();
  }]);
})();