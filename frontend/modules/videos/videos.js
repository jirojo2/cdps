'use strict';

angular.module('cdps.videos', [
    'cdps.videos.list',
    'cdps.videos.upload'
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
        allocateVideo: function(cb) {
            $http.post('/api/video')
            .success(function(data) {
                cb(null, data.id);
            }).error(function(err){
                console.log(err);
                cb(err, null);
            });
        },
        upload: function(file, cb) {
            // TODO
        },
        isLoading: function() {
            return loading;
        }
    }
}])