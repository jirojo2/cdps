'use strict';

angular.module('cdps.videos', [
    'cdps.videos.list'
])

.factory('Videos', ['$http', '$location', function($http, $location) {
    
    var loading = false;

    return {
        list: function(cb) {
            loading = true;
            $http.get('/api/videos')
            .success(function(data) {
                if (data.code) {
                    console.log("ERROR: " + data.msg);
                    return cb(data, []);
                }
                loading = false;
                cb(null, data.list || []);
            });
        },
        isLoading: function() {
            return loading;
        }
    }
}])