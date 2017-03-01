'use strict';

angular.module('Creative3.home', ['pw.canvas-painter', 'color.picker'])
  .directive('homePage', [function () {
    return {
      restrict: 'E',
      link: function ($scope) {
        $scope.imageSrc = '';
        $scope.version = 0;
        $scope.lineWidth = 1;
        $scope.selectedColor = '#FFA500';

        $scope.undo = function () {
          $scope.version = $scope.version - 1;
        };

      }
    };
  }]);

angular.module('Creative3').requires.push('Creative3.home');
