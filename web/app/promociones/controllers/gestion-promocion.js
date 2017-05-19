(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('GestionPromocionCtrl', ["$scope", "PromocionService", "messageHandlerService" , "shareSessionService","$uibModal","confirmationModalService",
     function ($scope, promocionService, messageHandlerService, shareSessionService, $uibModal, confirmationModalService) {
  
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


    /*
      $scope.sendToUpdatePromotionView = function(pId) {
        sharePromocionService.setCuponId(pId);
        $state.go('editar-promocion');
      };*/


      $scope.disablePromotion = function(pId) {
        $scope.openConfirmationModal(function(response){
          if (!response.success){
            return;
          }
          var data = {id: pId};
          promocionService.disablePromotion(data).then(function(result) {
            if(result.success) {
              messageHandlerService.notifySuccess(null, result.message);
              $scope.promotionList = [];  
              $scope.getPromotions();
            }
            else {
              messageHandlerService.notifyWarning(null, result.message);
            }
          });
        });
      };

      var setModalContent = function(mTitle, mMessage){
        confirmationModalService.setModalContent(mTitle, mMessage);
      };

      $scope.openConfirmationModal = function (callback) {
        setModalContent('Deshabilitar Promoción', '¿Está seguro(a) de que desea deshabilitar la promoción?');
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'confirmationModalTemplate.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {}
        });

        modalInstance.result.then(
        function (confirmationResponse) {
          callback({
            success: confirmationResponse
          });
        }, function () {
          callback({
            success: false
          });
        });
      };



      $scope.getUser();
      $scope.getPromotions();
  }]);
})();