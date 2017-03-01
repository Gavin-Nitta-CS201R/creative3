angular.module('Creative3', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
    });
    $urlRouterProvider.otherwise('home');
  }]);
