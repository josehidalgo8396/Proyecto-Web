 /**
 * @ngdoc Service
 * @author Jose Hidalgo Bonilla
 * @name userService
 * @description
 * #  service para el contacto
 */
(function(){
    'use strict';
    angular
        .module('webApp') 
        .factory('ContactoService', ['requestService', function(requestService) {
            var send = function(pData){
                var link = '/sendMail';                
                return  requestService.postRequest({data: pData, params: ""}, {url: link}).then(function(pResp){
                        return pResp; 
                    },  
                    function(pResp){
                        return pResp;   
                    });
            };
       
            return {
                sendMail: function(pData){
                    return send(pData);             
                }
            };
        }]);
})();