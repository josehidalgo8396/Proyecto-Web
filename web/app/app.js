(function(){
  'use strict';
  angular
    .module('webApp', [
      'ui.router',
      'ui-notification',
      'ui.bootstrap',
      'ui.navbar'
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
        .state('home', {
          url: '/home',
          parent: 'base',
          //templateUrl: 'common/views/promo.html',
          templateUrl: 'home/views/home.html',
          controller: 'GestionHomeCtrl'
        })
        .state('gestionar-usuarios', {
          url: '/gestionar-usuarios',
          parent: 'home',
          templateUrl: 'usuarios/views/gestionar-usuarios.html',
          controller: 'GestionUsuariosCtrl'
        })
        .state('cambiar-contrasena', {
          url: '/cambiar-contrasena',
          parent: 'home',
          templateUrl: 'usuarios/views/cambiar-contrasena.html',
          controller: 'PasswordCtrl'
        })
        .state('contacto', {
          url: '/contacto',
          parent: 'home',
          templateUrl: 'contacto/views/contacto.html',
          controller: 'ContactoCtrl'
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