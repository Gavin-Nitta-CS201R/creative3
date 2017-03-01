angular.module('Creative3', ['ui.router', 'ngMaterial'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
    });
    $stateProvider.state('images', {
      url: '/images',
      templateUrl: 'views/imagesManager.html'
    });
    $urlRouterProvider.otherwise('home');
  }]);
