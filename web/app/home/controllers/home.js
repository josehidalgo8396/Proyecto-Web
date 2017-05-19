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
      $scope.filteredPromotions = [];
      $scope.currentCuponPage = 0;
      $scope.currentPromotionPage = 0;
      $scope.numPerPage = 5;
      $scope.maxCuponSize = 0;
      $scope.maxPromotionSize = 0;
      $scope.tab = true;

      $scope.getCupons = function(){
        homeService.getCupons().then(function(result) {
          if (result.success){
            $scope.cuponList = result.data;
            console.log($scope.cuponList);
            $scope.currentCuponPage = 1;
            $scope.maxCuponSize = $scope.cuponList.length;
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
            $scope.currentPromotionPage = 1;
            $scope.maxPromotionSize = $scope.promotionList.length;
          }
          else{
            $scope.promotionList = [];
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

      $scope.$watch('currentCuponPage', function() {
        var begin = (($scope.currentCuponPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
        $scope.filteredCupons = $scope.cuponList.slice(begin, end);
      });

      $scope.$watch('currentPromotionPage', function() {
        var begin = (($scope.currentPromotionPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
        $scope.filteredPromotions = $scope.promotionList.slice(begin, end);
      });

      $scope.getUser = function() {
        var session = shareSessionService.getSession();
        $scope.user.usuario = session.usuario;
        $scope.user.rol = session.rol;
      };

      $scope.setTab = function() {
        $scope.tab = !$scope.tab;
      };

      $scope.getUser();
      $scope.getCupons();
      $scope.getPromotions();
  }]);
})();