
/**
 * @ngdoc Controller
 * @author Jose Hidalgo Bonilla
 * @name LoginCtrl
 * @description
 * #controller para login
 */
(function(){
	'use strict';
	angular
		.module('webApp')
	    .controller('LoginCtrl', ['$scope', '$state', 'LoginService', 'shareSessionService', 'messageHandlerService',
	    function($scope, $state, loginService, shareSessionService, messageHandlerService){
			$scope.userData = {
				userName: '',
				password: ''
			};

			var sendToHome = function() {
				$state.go('home');
			};

			var welcomeMessage = function() {
                var message = 'Bienvenido al Sistema de Apoyo Administrativo';
                messageHandlerService.notifySuccess(null, message);

            };

			$scope.login = function(pData) {
				loginService.logIn(pData).then(function(result) {
					if(result.success) {
						shareSessionService.setSession(pData.userName);
						welcomeMessage();
				        sendToHome();
					}
					else {
						messageHandlerService.notifyWarning(null, result.message);
					}
				});
			};

			$scope.fbLogin = function() {
				FB.login(function(response) {
					if (response.authResponse) {
						FB.api('/me', {fields: 'name, email'}, function(response) {
							console.log(response);
						});
					} 
					else {
						console.log('User cancelled login or did not fully authorize.');
					}
				});
			};
		}]);
})();
