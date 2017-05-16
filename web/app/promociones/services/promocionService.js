(function(){
	'use strict';
	angular
		.module("webApp")
		.factory("PromocionService", ["requestService", function(requestService) {

			var getP = function() {
				var link = "/promociones";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};


			var addP = function(pData) {
				var link = "/promociones";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addIInfoPromo = function(pData) {
				var link = "/promociones/importantInfo";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addMKInfoPromo = function(pData) {
				var link = "/promociones/mustKnowInfo";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			/*var updateC = function(pData) {
                var link = '/cupons/';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };

            var disableC = function(pData) {
				var link = '/cupons/disable/';                  
				return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
					return pResp;
				},
				function(pResp){
					return pResp;
				});
			};

			var getCuponById = function(pId) {
                var link = '/cupons/';
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };*/


			return {
				getPromotions: function() {
					return getP();
				},
				addPromotion: function(pData){
					return addP(pData);
				},
				addImportantInfoPromotion: function(pData){
					return addIInfoPromo(pData);
				},
				addMustKnowInfoPromotion: function(pData){
					return addMKInfoPromo(pData);
				}

				/*
				,
				updateCupon: function(pData){
					return updateC(pData);
				},
				disableCupon: function(pData){
					return disableC(pData);
				},
				getCupon: function(pId){
					return getCuponById(pId);
				}
				*/
			};
		}]);
})();