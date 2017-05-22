(function(){
	'use strict';
	angular
		.module("webApp")
		.factory("HomeService", ["requestService", function(requestService) {

			var getC = function() {
				var link = "/home/cupones";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var getP = function() {
				var link = "/home/promociones";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var cuponTop5 = function() {
				var link = "/home/cupones/top5";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var promotionTop5 = function() {
				var link = "/home/promociones/top5";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var sendCuponInfo = function(pData) {
				var link = "/home/cupones/send";
				return requestService.postRequest({data: pData, params:""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var sendPromotionInfo = function(pData) {
				var link = "/home/promociones/send";
				return requestService.postRequest({data: pData, params:""}, {url: link}).then(function(result){
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
				},
				getPromotionTop5: function() {
					return promotionTop5();
				},
				getCuponTop5: function() {
					return cuponTop5();
				},
				sendCuponInfo: function(pData) {
					return sendCuponInfo(pData);
				},
				sendPromotionInfo: function(pData) {
					return sendPromotionInfo(pData);
				}
			};
		}]);
})();