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
              .ok('Next')
              .cancel('Cancel');

            $mdDialog.show(confirm).then(function (name) {
              var obj = {
                uri: document.getElementById('pwCanvasMain').toDataURL(),
                name: name
              };

              var creatorPrompt = $mdDialog.prompt()
                .title('What is your name?')
                .placeholder('Your name')
                .ariaLabel('Your name')
                .initialValue('')
                .ok('Upload')
                .cancel('Cancel');
              $mdDialog.show(creatorPrompt).then(function (creator) {
                obj.creator = creator;
                $http.post('http://localhost:3000/image', obj)
                  .then(function () {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent('Successfully uploaded drawing!')
                        .position('bottom right')
                        .hideDelay(3000)
                    );
                    clearCanvas(true);
                  }, function () {
                    // Canceled at name
                  });

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
              clearCanvas(true);
            }, function () {
              // Did not clear canvas
            });
          };

          function clearCanvas(clear) {
            if (clear) $scope.imageSrc = '';
            $scope.version = 0;
            var canvas = document.getElementById('pwCanvasMain');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.background = '#FFF';
          }

          $scope.image = function () {
            clearCanvas(false);
            var canvas = document.getElementById('pwCanvasMain');
            var ctx = canvas.getContext('2d');
            var background = new Image();
            background.src = $scope.imageSrc;
            background.crossOrigin = 'anonymous';

            background.onload = function () {
              drawImageProp(ctx, background, 0, 0, 600, 500, 0.0, 0.0);
            };
          };

          function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

            if (arguments.length === 2) {
              x = y = 0;
              w = ctx.canvas.width;
              h = ctx.canvas.height;
            }

            // default offset is center
            offsetX = typeof offsetX === "number" ? offsetX : 0.5;
            offsetY = typeof offsetY === "number" ? offsetY : 0.5;

            // keep bounds [0.0, 1.0]
            if (offsetX < 0) offsetX = 0;
            if (offsetY < 0) offsetY = 0;
            if (offsetX > 1) offsetX = 1;
            if (offsetY > 1) offsetY = 1;

            var iw = img.width,
              ih = img.height,
              r = Math.min(w / iw, h / ih),
              nw = iw * r,   // new prop. width
              nh = ih * r,   // new prop. height
              cx, cy, cw, ch, ar = 1;

            // decide which gap to fill
            if (nw < w) ar = w / nw;
            if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
            nw *= ar;
            nh *= ar;

            // calc source rectangle
            cw = iw / (nw / w);
            ch = ih / (nh / h);

            cx = (iw - cw) * offsetX;
            cy = (ih - ch) * offsetY;

            // make sure source rectangle is valid
            if (cx < 0) cx = 0;
            if (cy < 0) cy = 0;
            if (cw > iw) cw = iw;
            if (ch > ih) ch = ih;

            // fill image in dest. rectangle
            ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
          }

        }
      };
    }]);

angular.module('Creative3').requires.push('Creative3.home');
