'use strict';

angular.module('Creative3.home', [])
  .directive('homePage', [function () {
    return {
      restrict: 'E',
      link: function ($scope) {
        $scope.homeMessage = 'This is the home directive';
      }
    }
  }]);

angular.module('Creative3').requires.push('Creative3.home');
