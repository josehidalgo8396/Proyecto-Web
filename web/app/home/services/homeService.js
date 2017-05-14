(function(){
	'use strict';
	angular
		.module("webApp")
		.factory("HomeService", ["requestService", function(requestService) {

			var getC = function() {
				var link = "/home/cupons";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var getP = function() {
				var link = "/home/promotions";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};


			return {
				getCupons: function() {
					return getC();
				},
				getPromotions: function(){
					return getP();
				}
				
			};
		}]);
})();