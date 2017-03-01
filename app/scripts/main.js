angular.module('Creative3', ['ui.router', 'ngMaterial'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('images', {
        url: '/images',
        templateUrl: 'views/images.html'
      });
    $urlRouterProvider.otherwise('home');
  }]);
