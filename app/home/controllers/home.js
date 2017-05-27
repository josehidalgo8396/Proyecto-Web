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
    .controller('GestionHomeCtrl', ["$scope","$state" ,"$q", "HomeService", "messageHandlerService" , "shareSessionService","shareCuponService","sharePromocionService",
     function ($scope,$state,$q, homeService, messageHandlerService, shareSessionService,shareCuponService,sharePromocionService) {
  
        $scope.user = {};
        $scope.hiddenCommentView = [];
        $scope.cuponList = [];
        $scope.promotionList = [];
        $scope.cuponTop5 = [];
        $scope.promotionTop5 = [];
        $scope.filteredCupons = [];
        $scope.filteredPromotions = [];
        $scope.currentCuponPage = 0;
        $scope.currentPromotionPage = 0;
        $scope.numPerPage = 12;
        $scope.maxCuponSize = 0;
        $scope.maxPromotionSize = 0;
        $scope.tab = true;
        $scope.index = 0;
        $scope.writeComment = [];

        $scope.getCupons = function(){
          homeService.getCupons().then(function(result) {
            if (result.success){
              $scope.cuponList = result.data;
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
              $scope.currentPromotionPage = 1;
              $scope.maxPromotionSize = $scope.promotionList.length;
            }
            else{
              $scope.promotionList = [];
              messageHandlerService.notifyWarning(null, result.message);
            }
          }); 
        };

        $scope.getCuponTop5 = function() {
          homeService.getCuponTop5().then(function(result) {
            if(result.success){
              $scope.cuponTop5 = result.data;
            }
            else{
              messageHandlerService.notifyWarning(null, result.message);
            }
          });
        };

        $scope.getPromotionTop5 = function() {
          homeService.getPromotionTop5().then(function(result) {
            if(result.success) {
              $scope.promotionTop5 = result.data;
            }
            else{
              messageHandlerService.notifyWarning(null, result.message);
            }
          });
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

        $scope.sendToCuponView = function(pId) {
          shareCuponService.setCuponId(pId);
          $state.go('ver-cupon');
        };
        
        $scope.sendToPromocionView = function(pId) {
          sharePromocionService.setPromocionId(pId);
          $state.go('ver-promocion');
        };
       
        $scope.setCommentView = function($index){
          $scope.hiddenCommentView[$index] = !$scope.hiddenCommentView[$index];
        };

        $scope.setCommentCupon = function(comment, id, index) {
          if(comment != "") {
            var data = {idCupon: id, comment: comment, usuario: $scope.user.usuario};
            homeService.setCommentCupon(data).then(function(result) {
              if(result.success) {
                $scope.writeComment[index] = "";
                messageHandlerService.notifySuccess(null, result.message);
              }
              else{
                messageHandlerService.notifyWarning(null, result.message);
              }
            });
          }
        };

        $scope.setCommentPromotion = function(comment, id, index) {
          if(comment != "") {
            var data = {idPromotion: id, comment: comment, usuario: $scope.user.usuario};
            homeService.setCommentPromotion(data).then(function(result) {
              if(result.success) {
                $scope.writeComment[index] = "";
                messageHandlerService.notifySuccess(null, result.message);
              }
              else{
                messageHandlerService.notifyWarning(null, result.message);
              }
            });
          }
        };

        $scope.getUser();
        $scope.getCuponTop5();
        $scope.getPromotionTop5();
        $scope.getCupons();
        $scope.getPromotions();
  }]);
})();