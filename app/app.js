(function(){
  'use strict';
  angular
    .module('webApp', [
      'ui.router',
      'ui-notification',
      'ui.bootstrap',
      'ui.navbar',
      'toggle-switch'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

      //muestra esta vista por defecto
      //redirecciona en caso de nos reconocer la ruta ingresada
      $urlRouterProvider.otherwise('/home');

      $stateProvider
        //vista abstracta sobre la que se carga las demás vistas principales
        .state('base', {
          abstract: true,
          url: '',
          templateUrl: 'common/views/base.html'
        })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'login/views/login.html',
          controller: 'LoginCtrl'
        })
        .state('logout', {
          controller: 'LogoutCtrl'
        })
        .state('prom', {
          url: '',
          parent: 'base',
          templateUrl: 'common/views/promo.html'
        })
        .state('home', {
          url: '/home',
          parent: 'prom',
          templateUrl: 'home/views/home.html',
          controller: 'GestionHomeCtrl'
        })
        .state('gestionar-usuarios', {
          url: '/gestionar-usuarios',
          parent: 'prom',
          templateUrl: 'usuarios/views/gestionar-usuarios.html',
          controller: 'GestionUsuariosCtrl'
        })
        .state('cambiar-contrasena', {
          url: '/cambiar-contrasena',
          parent: 'prom',
          templateUrl: 'usuarios/views/cambiar-contrasena.html',
          controller: 'PasswordCtrl'
        })
        .state('contacto', {
          url: '/contacto',
          parent: 'prom',
          templateUrl: 'contacto/views/contacto.html',
          controller: 'ContactoCtrl'
        })
        .state('gestionar-cupones', {
          url: '/cupones',
          parent: 'prom',
          templateUrl: 'cupons/views/gestion-cupon.html',
          controller: 'GestionCuponCtrl'
        })
        .state('gestionar-promociones', {
          url: '/promociones',
          parent: 'prom',
          templateUrl: 'promociones/views/gestion-promocion.html',
          controller: 'GestionPromocionCtrl'
        })
        .state('nuevo-cupon', {
          url: '/nuevo-cupon',
          parent: 'prom',
          templateUrl: 'cupons/views/nuevo-cupon.html',
          controller: 'NuevoCuponCtrl'
        })
        .state('nueva-promocion', {
          url: '/nueva-promocion',
          parent: 'prom',
          templateUrl: 'promociones/views/nueva-promocion.html',
          controller: 'NuevaPromocionCtrl'
        })
        .state('editar-cupon', {
          url: '/editar-cupon',
          parent: 'prom',
          templateUrl: 'cupons/views/editar-cupon.html',
          controller: 'EditarCuponCtrl'
        })
        .state('editar-promocion', {
          url: '/editar-promocion',
          parent: 'prom',
          templateUrl: 'promociones/views/editar-promocion.html',
          controller: 'EditarPromocionCtrl'
        })
        .state('ver-cupon', {
          url: '/ver-cupon',
          parent: 'prom',
          templateUrl: 'home/views/ver-cupon.html',
          controller: 'VerCuponCtrl'
        })
        .state('ver-promocion', {
          url: '/ver-promocion',
          parent: 'prom',
          templateUrl: 'home/views/ver-promocion.html',
          controller: 'VerPromocionCtrl'
        })

    });
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '292548087852966',
        xfbml      : true,
        version    : 'v2.9'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
})();