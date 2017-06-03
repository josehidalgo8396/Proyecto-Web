
(function(){
	'use strict';
	angular
		.module('webApp')
	    .controller('LogoutCtrl', ['$scope', '$state', 'shareSessionService',
	    function($scope, $state, shareSessionService){
            
            var sendToLogin = function() {
            	$state.go('login');
            };

			var logout = function() {
				shareSessionService.deleteSession();
				sendToLogin();
			};

			logout();
			
		}]);	
})();