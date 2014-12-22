'use strict';

angular.module('cdps.videos.watch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/video/:id', {
        templateUrl: '/frontend/modules/videos/watch.html',
        controller: 'VideoCtrl'
    });
}])

.controller('VideoCtrl', ['$scope', '$routeParams', 'Videos', function($scope, $routeParams, Videos) {
    
    $scope.video = null;

    Videos.get($routeParams.id, function(err, video) {
        $scope.video = video;
    });

}]);