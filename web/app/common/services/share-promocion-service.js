(function(){
    'use strict';
    angular
        .module('saaApp')
        .service('sharePromocionService', function() {

            var promocionData = {
                currentPromocionId: -1
            };

            var setId = function(pId) {
                promocionData.currentPromocionId = pId;
            };

            var getId = function() {
                return  promocionData.currentPromocionId;
            };

            return  {
                setCuponId: function(pId) {
                    return setId(pId);
                },
                getCuponId: function() {
                    return getId();
                }
            };
        });
})();