
/**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name navigationCtrl
 * @description
 * # controller de navegacion
 */

 (function(){
    'use strict';
    angular
        .module('webApp')
        .controller('NavegacionCtrl',['$scope','shareSessionService', 'messageHandlerService', '$state',  
        function ($scope, shareSessionService, messageHandlerService, $state) {
            $scope.username = '';   
            $scope.sesion = [
                {
                    name: "Cerrar Sesión",
                    link: "logout"
                },
                {
                    name: "Cambiar Contraseña",
                    link: "cambiar-contrasena"
                }
            ];

            $scope.menu = [
                {
                    name: "Home",
                    link: "home"
                },
                {
                    name: "Promociones",
                    link: "promociones"
                },
                {
                    name: "Cupones",
                    link: "cupones"
                },
                {
                    name: "Contacto",
                    link: "contacto"
                }
            ];

            $scope.administracion = [
                {
                    name: "Gestión de Usuarios",
                    link: "gestionar-usuarios"
                }
            ];

            $scope.getUserName = function() {
                if(shareSessionService.isStartSession()) {
                    var session = shareSessionService.getSession();
                    $scope.username = session.usuario;
                }
                else{
                    $state.go("login");
                }  
            };

            $scope.getUserName();
         
        }]);    
})();

