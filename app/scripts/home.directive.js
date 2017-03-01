'use strict';

angular.module('Creative3.home', ['pw.canvas-painter', 'color.picker'])
  .directive('homePage', ['$mdDialog', '$http', '$mdToast',
    function ($mdDialog, $http, $mdToast) {
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

          $scope.upload = function () {
            var confirm = $mdDialog.prompt()
              .title('What would you like to name your drawing?')
              .placeholder('Drawing name')
              .ariaLabel('Drawing name')
              .initialValue('')
              .ok('Upload')
              .cancel('Cancel');

            $mdDialog.show(confirm).then(function (name) {
              var obj = {
                uri: document.getElementById('pwCanvasMain').toDataURL(),
                name: name
              };

              $http.post('http://localhost:3000/image', obj)
                .then(function () {
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent('Successfully uploaded drawing!')
                      .position('bottom right')
                      .hideDelay(3000)
                  );
                  clearCanvas();
                }).catch(function (err) {
                  console.log(err);
                });
            }, function () {
              // Did not upload
            });
          };

          $scope.confirmClear = function () {
            var confirm = $mdDialog.confirm()
              .title('Clear your drawing?')
              .textContent('Do you really want to clear your drawing? This cannot be undone.')
              .ariaLabel('Clear Drawing')
              .ok('Yes')
              .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
              clearCanvas();
            }, function () {
              // Did not clear canvas
            });
          };

          function clearCanvas() {
            $scope.version = 0;
            $scope.imageSrc = '';
            var canvas = document.getElementById('pwCanvasMain');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.background = '#FFF';
          }

          $scope.image = function () {
            if ($scope.imageSrc === '') {
              clearCanvas();
            } else {
              var canvas = document.getElementById('pwCanvasMain');
              var ctx = canvas.getContext('2d');
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
