'use strict';

angular.module('cdps.videos', [
    'cdps.videos.list',
    'cdps.videos.watch',
    'cdps.videos.upload'
])

.factory('Videos', ['$http', '$location', function($http, $location) {
    
    var loading = false;

    return {
        get: function(id, cb) {            
            loading = true;
            $http.get('/api/video/'+id)
            .success(function(data) {
                if (data.code) {
                    console.log("ERROR: " + data.msg);
                    return cb(data);
                }
                loading = false;
                cb(null, data.video);
            });
        },
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
        allocateVideo: function(video_data, cb) {
            $http.post('/api/video', video_data)
            .success(function(data) {
                cb(null, data.id);
            }).error(function(err){
                console.log(err);
                cb(err, null);
            });
        },
        upload: function(file, id, cb) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post('http://videos.mitubo.es/'+id, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
                cb(null)
            })
            .error(function(err){
                cb(err);
            });
        },
        isLoading: function() {
            return loading;
        },
        favourites : function(cb) {
            $http.get('/api/favourites')
            .success(function(data) {
                cb(null, data.list);
            })
            .error(function(err) {
                cb(err);
            })
        },
        fav: function(videoid, cb) {
            $http.post('/api/favourite/'+videoid, { })
            .success(function(data) {
                cb(data.code != 0 ? data.msg : null);
            })
            .error(function(err) {
                cb(err);
            })
        },
        unfav: function(videoid, cb) {
            $http.delete('/api/favourite/'+videoid)
            .success(function(data) {
                cb(data.code != 0 ? data.msg : null);
            })
            .error(function(err) {
                cb(err);
            })
        }
    }
}])