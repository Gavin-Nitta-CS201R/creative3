'use strict';

angular.module('Creative3.images', [])
  .directive('imagesPage', ['$http',
    function ($http) {
      return {
        restrict: 'E',
        link: function ($scope) {
          $scope.images = [];
          $scope.votedImages = [];
          $scope.loaded = false;

          function init() {
            $http.get('http://cs201.nittakazoku.com:3000/image')
              .then(function (images) {
                $scope.loaded = true;
                $scope.images = images.data;
              }).catch(function (err) {
                $scope.loaded = true;
              });

            $scope.votedImages = JSON.parse(localStorage.getItem('votedImages')) || [];
          }

          $scope.vote = function (image) {
            $http.post('http://cs201.nittakazoku.com:3000/vote/' + image.id)
              .then(function (resp) {
                $scope.votedImages.push(image.id);
                localStorage.setItem('votedImages', JSON.stringify($scope.votedImages));
                image.votes = image.votes + 1;
              }).catch(function (err) {
                console.log(err);
              });
          };

          $scope.alreadyVoted = function (id) {
            return $scope.votedImages.includes(id);
          };

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
