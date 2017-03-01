'use strict';

angular.module('Creative3.images', [])
  .directive('imagesPage', ['$http',
    function ($http) {
      return {
        restrict: 'E',
        link: function ($scope) {
          $scope.images = [];
          $scope.loaded = false;

          function init() {
            $http.get('http://localhost:3000/image')
              .then(function (images) {
                $scope.loaded = true;
                $scope.images = images.data;
              }).catch(function (err) {
                $scope.loaded = true;
              });
          }

          $scope.download = function (image) {
            var anchor = document.createElement('a');
            anchor.href = image.uri;
            anchor.download = image.name;
            anchor.click();
          };

          init();
        }
      }
    }]);

angular.module('Creative3').requires.push('Creative3.images');
