
/**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name contactoCtrl
 * @description
 * # controller de contacto
 */

 (function(){
    'use strict';
    angular
        .module('webApp')
        .controller('ContactoCtrl',['$scope', 'ContactoService', 'messageHandlerService',  function ($scope, contactoService, messageHandlerService) {
            $scope.message = {};
            $scope.sendMessage = function(message) {
                contactoService.sendMail(message).then(function(result) {
                    if(result.success) {
                        messageHandlerService.notifySuccess(null, result.message);
                    }
                    else {
						messageHandlerService.notifyError(null, result.message);
                    }
                });
            };
        }]);    
})();

