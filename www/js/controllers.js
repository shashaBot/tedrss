var app = angular.module('tedrssapp.controllers', []);

app.controller('FeedCtrl', function ($scope, FeedService, $ionicLoading) {
	console.log("Loading FeedCtrl");
  $ionicLoading.show({template: 'Loading feed...'});
	$scope.feed = FeedService;
	$scope.feed.loadFeed().then(function(){
	  $ionicLoading.hide();
	});



	$scope.doRefresh = function () {
		$scope.feed.loadFeed().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
});

app.controller('PostCtrl', function ($scope, $cordovaSocialSharing, FeedService, $window, $stateParams) {
	console.log("Loading PostCtrl");
  $scope.postId = $stateParams.id;
  $scope.post = FeedService.getEntry($scope.postId);
  console.log($scope.post);

	$scope.share = function () {
		console.debug("Sharing post");
		$cordovaSocialSharing.share($scope.post.content_snippet, $scope.title, $scope.post.thumbnail, $scope.post.link)
	};

	$scope.readMore = function () {
		console.debug("Read more post");

		$window.open($scope.post.link, "_system", "location=yes")
	};

});
