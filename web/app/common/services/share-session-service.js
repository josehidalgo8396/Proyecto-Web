
/**
 * @ngdoc Service
 * @author Luis Javier Ramírez Torres
 * @name shareSessionService
 * @description
 * #  service for share information between controllers
 */
(function(){
    'use strict';
    angular
        .module('webApp') 
        .service('shareSessionService', function() {

            var setCurrentSession = function(pData) {
                console.log(pData);
                localStorage.setItem('user', pData.username);
                localStorage.setItem('rol', pData.rol);
            };

            var getCurrentSession = function() {
                var user = localStorage.getItem('user');
                var rol = parseInt(localStorage.getItem('rol'));
                var dataSession = {usuario: user, rol: rol};
                return dataSession;
            };

            var deleteCurrentSession = function() {
                localStorage.removeItem('user');
                localStorage.removeItem('rol');
            };

            var getSessionStatus = function() {
                if(localStorage.getItem('user')) {
                    return true;
                }
                else {
                    return false;
                }
            };
       
            return {
                    setSession: function(pData) {
                        return setCurrentSession(pData);             
                    },
                    getSession: function() {
                        return getCurrentSession();
                    },
                    deleteSession: function() {
                        return deleteCurrentSession();
                    },
                    isStartSession: function() {
                        return getSessionStatus();
                    }
            };
        });
})();