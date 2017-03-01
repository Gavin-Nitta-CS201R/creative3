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

        $scope.download = function () {
          var h = document.getElementById('pwCanvasMain');
          window.open(h.toDataURL())
        }

        $scope.image = function () {
          var canvas = document.getElementById("pwCanvasMain");
          var ctx = canvas.getContext("2d");

          if ($scope.imageSrc === '') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.background = '#FFF';
          } else {
            var background = new Image();
            background.src = $scope.imageSrc;
            background.crossOrigin = 'anonymous';

            background.onload = function () {
              ctx.drawImage(background, 0, 0);
            };
          }
        };

      }
    };
  }]);

angular.module('Creative3').requires.push('Creative3.home');
