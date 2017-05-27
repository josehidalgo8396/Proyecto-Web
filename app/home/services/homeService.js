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

			var getCuponById = function(pId) {
                var link = '/home/cupones/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var getPromocionById = function(pId) {
                var link = '/home/promociones/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var getAInfoCuponById = function(pId) {
                var link = '/home/cupones/additionalInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var getRInfoCuponById = function(pId) {
                var link = '/home/cupones/restrictionInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var getIInfoPromoById = function(pId) {
             	var link = '/promociones/importantInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

            var getMKInfoPromoById = function(pId) {
                var link = '/promociones/mustKnowInfo/';
                
                return  requestService.getRequest({params: pId}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

			var commentCupon = function(pData) {
                var link = '/home/cupon/comment';
                
                return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
                    return pResp; 
                },  
                function(pResp){
                    return pResp;   
                });
            };

			var commentPromotion = function(pData) {
                var link = 'home/promocion/comment';
                
                return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp) {
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
				},
				getCupon: function(pId){
					return getCuponById(pId);
				},
				getPromocion: function(pId){
					return getPromocionById(pId);
				},
				getAdditionalInfoCupon: function(pId){
					return getAInfoCuponById(pId);
				},
				getRestrictionInfoCupon: function(pId){
					return getRInfoCuponById(pId);
				},
				getImportantInfoPromotion: function(pId){
					return getIInfoPromoById(pId);
				},
				getMustKnowInfoPromotion: function(pId){
					return getMKInfoPromoById(pId);
				},
				setCommentCupon: function(pData) {
					return commentCupon(pData);
				},
				setCommentPromotion: function(pData) {
					return commentPromotion(pData);
				}
			};
		}]);
})();