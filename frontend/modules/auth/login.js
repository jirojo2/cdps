'use strict';

angular.module('cdps.auth.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '/frontend/modules/auth/login.html',
        controller: 'LoginCtrl'
    });
}])

.controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
    
    $scope.error = null;
    
    $scope.login = function() {
        Auth.login($scope.email, $scope.password, function(err, ok) {
            if (!ok) {
                // Login fail
                $scope.error = err;
                $scope.password = "";
            } else {
                $scope.error = null;
            }
        });
    };

}]);