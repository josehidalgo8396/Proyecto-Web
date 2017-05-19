(function(){
    'use strict';
    angular
        .module('webApp')
        .service('shareCuponService', function() {

            var cuponData = {
                currentCuponId: -1
            };

            var setId = function(pId) {
                cuponData.currentCuponId = pId;
            };

            var getId = function() {
                return  cuponData.currentCuponId;
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