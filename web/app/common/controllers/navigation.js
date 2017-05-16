
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

            /*$scope.menu = [
                {
                    name: "Home",
                    link: "home"
                },
                {
                    name: "Promociones",
                    link: "gestionar-promociones"
                },
                {
                    name: "Cupones",
                    link: "gestionar-cupones"
                },
                {
                    name: "Contacto",
                    link: "contacto"
                }
            ];*/

            

            $scope.administracion = [
                {
                    name: "Gestion de Usuarios",
                    link: "gestionar-usuarios"
                }
            ];

            $scope.cupones = [
                {
                    name: "Agregar Cupón",
                    link: "nuevo-cupon"
                },
                {
                    name: "Gestionar Cupones",
                    link: "gestionar-cupones"
                }
            ];

            $scope.promociones = [
                {
                    name: "Agregar Promoción",
                    link: "nueva-promocion"
                },
                {
                    name: "Gestionar Promociones",
                    link: "gestionar-promociones"
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

