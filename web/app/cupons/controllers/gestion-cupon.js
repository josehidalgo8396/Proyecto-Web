(function(){
  'use strict';
  angular
    .module('webApp')
    .controller('GestionCuponCtrl', ["$scope", "$state", "CuponService", "messageHandlerService" , "shareSessionService","$uibModal","confirmationModalService", "shareCuponService", 
     function ($scope, $state, cuponService, messageHandlerService, shareSessionService, $uibModal,confirmationModalService, shareCuponService) {
  
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
          var session = shareSessionService.getSession();
          $scope.user.usuario = session.usuario;
          $scope.user.rol = session.rol;
      };

    
      $scope.sendToUpdateCuponView = function(pId) {
        shareCuponService.setCuponId(pId);
        $state.go('editar-cupon');
      };

      $scope.disableCupon = function(pId) {
        $scope.openConfirmationModal(function(response){
          if (!response.success){
            return;
          }
          var data = {id: pId};
          cuponService.disableCupon(data).then(function(result) {
            if(result.success) {
              messageHandlerService.notifySuccess(null, result.message);
              $scope.cuponList = [];  
              $scope.getCupons();
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
        setModalContent('Deshabilitar Cupón', '¿Está seguro(a) de que desea deshabilitar el cupón?');
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
      $scope.getCupons();

  }]);
})();