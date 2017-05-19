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

			var updateP =	 function(pData) {
                var link = '/promociones/';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };
            
            
            var disableP = function(pData) {
				var link = '/promociones/disable/';                  
				return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
					return pResp;
				},
				function(pResp){
					return pResp;
				});
			};
				

			var getPromotionById = function(pId) {
                var link = '/promociones/';
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var updateIInfoPromo =	 function(pData) {
                var link = '/promociones/importantInfo';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };

            var updateMKInfoPromo =	 function(pData) {
                var link = '/promociones/mustKnowInfo';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };
            var getIInfoPromoById = function(pId) {
             	var link = '/promociones/importantInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {//corregir como se envian los datos
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };
            var getMKInfoPromoById = function(pId) {
                var link = '/promociones/mustKnowInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {//corregir como se envian los datos
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };


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
				},
				updatePromotion: function(pData){
					return updateP(pData);
				},
				disablePromotion: function(pData){
					return disableP(pData);
				},
				getPromotion: function(pId){
					return getPromotionById(pId);
				},
				updateImportantInfoPromotion: function(pData){
					return updateIInfoPromo(pData);
				},
				updateMustKnowInfoPromotion: function(pData){
					return updateMKInfoPromo(pData);
				},
				getImportantInfoPromotion: function(pId){
					return getIInfoPromoById(pId);
				},
				getMustKnowInfoPromotion: function(pId){
					return getMKInfoPromoById(pId);
				}
				
			};
		}]);
})();