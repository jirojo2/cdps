'use strict';

angular.module('cdps.videos.watch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/video/:id', {
        templateUrl: '/frontend/modules/videos/watch.html',
        controller: 'VideoCtrl'
    });
}])

.controller('VideoCtrl', ['$scope', '$routeParams', 'Videos', 'Auth', function($scope, $routeParams, Videos, Auth) {
    
    $scope.video = null;

    $scope.favourites = [];
    $scope.loggedin = false;

    Videos.get($routeParams.id, function(err, video) {
        $scope.video = video;
    });

    $scope.getFavourites = function() {
	    if (Auth.isLoggedIn()) {
	    	$scope.loggedin = true;
	    	Videos.favourites(function(err, list) {
	    		$scope.favourites = list || [];
	    	});
	    } 
	}
	$scope.getFavourites();

    $scope.fav = function() {
    	Videos.fav($scope.video._id, function(err) {
    		$scope.getFavourites();
    	});
    }

    $scope.unfav = function() {
    	Videos.unfav($scope.video._id, function(err) {
    		$scope.getFavourites();
    	});
    }

    $scope.isFav = function() {
    	for (var i = $scope.favourites.length - 1; i >= 0; i--) {
    		if ($scope.favourites[i]._id === $scope.video._id)
    			return true;
    	}
    	return false;
    }

}]);