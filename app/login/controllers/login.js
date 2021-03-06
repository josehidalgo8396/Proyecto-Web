
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
				username: '',
				password: ''
			};

			var sendToHome = function() {
				$state.go('home');
			};

			var welcomeMessage = function(name) {
                var message = 'Bienvenido '+name;
                messageHandlerService.notifySuccess(null, message);
            };

			$scope.login = function(pData) {
				loginService.logIn(pData).then(function(result) {
					if(result.success) {
						var session = {username: pData.username, rol: result.data};
						shareSessionService.setSession(session);
						welcomeMessage(pData.username);
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
							var data = {type: "facebook", rol:0, name: response.name, password:response.email, username: response.email};
							loginService.logIn(data).then(function(result) {
								if(result.success) {
									var session = {username: data.username, rol: 0};
									shareSessionService.setSession(session);
									welcomeMessage(data.name);
				        			sendToHome();
								}
								else{
									messageHandlerService.notifyWarning(null, result.message);
								}
							})
						});
					} 
					else {
						console.log('User cancelled login or did not fully authorize.');
					}
				});
			};
		}]);
})();
