'use strict';

angular.module('cdps.auth', [
    'cdps.auth.signup',
    'cdps.auth.login'
])

.factory('Auth', ['$http', '$location', function($http, $location) {
    
    var user = null;
    var loading = true;
        
    $http.get('/api/auth')
    .success(function(data) {
        if (data.user) {
            user = data.user;
        } else {
            $location.path('/');
        }
        loading = false;
    });

    return {
        login: function (email, password, cb) {
            $http.post('api/auth/login', {
                email: email,
                password: password
            })
            .success(function(data) {
                if (data.code) {
                    cb(data.msg, false);
                }
                else {
                    user = data.user;
                    $location.path('/');
                    cb(null, true);
                }
            })
            .error(function(err) {
                cb(err, false);
            });
        },
        signup: function (email, password, cb) {
            $http.post('api/auth/signup', {
                email: email,
                password: password
            })
            .success(function(data) {
                if (data.code) {
                    cb(data.msg, false);
                }
                else {
                    cb(null, true);
                }
            })
            .error(function(err) {
                cb(err, false);
            });
        },
        logout: function () {
            $http.post('/api/auth/logout')
            .success(function() {
                user = null;
                $location.path('/');
            });
        },
        isLoading: function () {
            return loading;
        },
        isLoggedIn: function () {
            return (user) ? true : false;
        },
        getUser: function() {
            return user;
        }
    }
}])