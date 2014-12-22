'use strict';

angular.module('cdps.videos.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/frontend/modules/videos/list.html',
        controller: 'VideosCtrl'
    });
}])

.controller('VideosCtrl', ['$scope', '$location', 'Videos', function($scope, $location, Videos) {
    
    $scope.videos = [];

    Videos.list(function(err, list) {
        $scope.videos = list;
    });

    $scope.$parent.showFilter = true;

    $scope.watch = function(id) {
    	$location.path('/video/' + id);
    }
}]);