'use strict';

// Declare app level module which depends on views, and components
angular.module('cdps', [
    'ngRoute',
    'ui.bootstrap',
    'cdps.videos',
    'cdps.auth'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}])

.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

    });
}])

.controller('MainCtrl', ['$scope', '$location', 'Auth', 'Videos', function($scope, $location, Auth, Videos) {
    
    $scope.ctrlLoading = {};
    $scope.isAnyLoading = function() {
        
        // Comprobamos los ctrls
        for (var l in $scope.ctrlLoading) {
            if ($scope.ctrlLoading[l]) return true;
        }
        
        // Comprobamos los servicios
        if (Auth.isLoading()) return true;
        if (Videos.isLoading()) return true;
        
        return false;
    };
    
    $scope.isMenuActive = function(path) {
        if (path !== '/')
            return $location.path().indexOf(path.replace('#', '')) === 0;
        else
            return $location.path() === path;
    };
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isSuperUser = Auth.isSuperUser;
    $scope.showFilter = false;
    
    $scope.$on('$routeChangeStart', function (event) {
        $scope.filter = "";
        $scope.showFilter = false;
        $scope.isMenuCollapsed = true;
        $scope.actions = [];
        $scope.ctrl = null;
    });
    
    $scope.actionClick = function(code) {
        if (code)
            eval(code);
    };
    
    $scope.logout = function() {
        Auth.logout();
    };
    
}]);