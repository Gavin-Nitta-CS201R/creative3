angular.module('Images', [])
	.controller('ImagesCtrl' [
		'$scope',
		function($scope, ){
			$scope.images = [
			];
			$scope.incrementUpVotes = function(post) {
				post.upvotes += 1;
			};
			$scope.addImage = function() {
				$scope.images.push({title:$scope.title,upvotes:0});
			}
		}
	]);