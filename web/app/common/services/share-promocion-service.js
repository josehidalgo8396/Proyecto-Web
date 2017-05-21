(function(){
    'use strict';
    angular
        .module('webApp')
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
                setPromocionId: function(pId) {
                    return setId(pId);
                },
                getPromocionId: function() {
                    return getId();
                }
            };
        });
})();