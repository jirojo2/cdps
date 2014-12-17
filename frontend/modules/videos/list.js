'use strict';

angular.module('cdps.videos.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/frontend/modules/videos/list.html',
        controller: 'VideosCtrl'
    });
}])

.controller('VideosCtrl', ['$scope', 'Videos', function($scope, Videos) {
    
    $scope.videos = [];

    Videos.list(function(err, list) {
        $scope.videos = list;
    });

}]);