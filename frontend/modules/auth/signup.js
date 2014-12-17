'use strict';

angular.module('cdps.auth.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: '/frontend/modules/auth/signup.html',
        controller: 'SignupCtrl'
    });
}])

.controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
    
    $scope.error = null;
    
    $scope.signup = function() {

        if (!$scope.email || !$scope.password) {
            return $scope.error = "Rellene todos los campos";
        }

        if ($scope.password !== $scope.password2) {
            return $scope.error = "Las contraseñas no coinciden";
        }

        Auth.signup($scope.email, $scope.password, function(err, ok) {
            if (!ok) {
                // Signup fail
                $scope.error = err;
                $scope.password  = "";
                $scope.password2 = "";
            } else {
                $scope.error = null;
                Auth.login($scope.email, $scope.password, function(err, ok) {
                    // ?
                });
            }
        });
    };

}]);