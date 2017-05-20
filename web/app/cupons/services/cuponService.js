(function(){
	'use strict';
	angular
		.module("webApp")
		.factory("CuponService", ["requestService", function(requestService) {

			var getC = function() {
				var link = "/cupones";
				return requestService.getRequest({params: ""}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};


			var addC = function(pData) {
				var link = "/cupones";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addAInfoCupon = function(pData) {
				var link = "/cupones/additionalInfo";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};

			var addRInfoCupon = function(pData) {
				var link = "/cupones/restrictionInfo";
				return requestService.postRequest({params: "", data: pData}, {url: link}).then(function(result){
	  				return result;
	  			},
	  			function(result){
	  				return result;
	  			});
			};


			var updateC = function(pData) {
                var link = '/cupones/';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };
            
            
            var disableC = function(pData) {
				var link = '/cupones/disable/';                  
				return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
					return pResp;
				},
				function(pResp){
					return pResp;
				});
			};
				

			var getCuponById = function(pId) {
                var link = '/cupones/';
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var updateAInfoCupon =	 function(pData) {
                var link = '/cupones/additionalInfo/';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };

            var updateRInfoCupon =	 function(pData) {
                var link = '/cupones/restrictionInfo/';                  
                return  requestService.putRequest({data: pData, params: pData.id}, {url: link}).then(function(pResp) {
                    return pResp;
                },
                function(pResp){
                    return pResp;
                });
            };
            var getAInfoCuponById = function(pId) {
             	var link = '/cupones/additionalInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {//corregir como se envian los datos
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };
            var getRInfoCuponById = function(pId) {
                var link = '/cupones/restrictionInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {//corregir como se envian los datos
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };


			return {
				getCupons: function() {
					return getC();
				},
				addCupon: function(pData){
					return addC(pData);
				},
				addAdditionalInfoCupon: function(pData){
					return addAInfoCupon(pData);
				},
				addRestrictionInfoCupon: function(pData){
					return addRInfoCupon(pData);
				},
				updateCupon: function(pData){
					return updateC(pData);
				},
				disableCupon: function(pData){
					return disableC(pData);
				},
				getCupon: function(pId){
					return getCuponById(pId);
				},
				updateAdditionalInfoCupon: function(pData){
					return updateAInfoCupon(pData);
				},
				updateRestrictionInfoCupon: function(pData){
					return updateRInfoCupon(pData);
				},
				getAdditionalInfoCupon: function(pId){
					return getAInfoCuponById(pId);
				},
				getRestrictionInfoCupon: function(pId){
					return getRInfoCuponById(pId);
				}
			};
		}]);
})();