
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
                var sessionData = JSON.stringify(pData);
                localStorage.setItem('user', sessionData);
            };

            var getCurrentSession = function() {
                var dataSession = JSON.parse(localStorage.getItem('user'));
                return dataSession;
            };

            var deleteCurrentSession = function() {
                localStorage.removeItem('user');
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