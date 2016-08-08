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

app.controller('PostCtrl', function ($scope, FeedService, $stateParams) {
	console.log("Loading PostCtrl");
  console.log($stateParams);
  $scope.post = FeedService.getEntry($scope.postId);

	$scope.share = function () {
		console.debug("Sharing post");
	};

	$scope.readMore = function () {
		console.debug("Read more post");
	};

});
