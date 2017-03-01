'use strict';

angular.module('Creative3.header', [])
  .directive('creativeHeader', [function () {
    return {
      restrict: 'E',
      templateUrl: 'views/header.html',
      link: function ($scope) {
        console.log('header dir');
      }
    }
  }]);

angular.module('Creative3').requires.push('Creative3.header');
