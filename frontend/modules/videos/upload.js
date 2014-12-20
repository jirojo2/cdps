'use strict';

angular.module('cdps.videos.upload', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/upload', {
        templateUrl: '/frontend/modules/videos/upload.html',
        controller: 'UploadVideosCtrl'
    });
}])

.controller('UploadVideosCtrl', ['$scope', 'Videos', function($scope, Videos) {

	$scope.video = {};
	$scope.phase = 0;
    
	function validateVideo (f) {
		return f.type == "application/pdf";
	}

    $scope.fileNameChanged = function() {
    	var file = document.getElementById('file').files[0];

    	if (validateVideo(file)) {
    		$scope.video = { allocating: true };
    		$scope.error = null;
			$scope.phase = 1;

    		Videos.allocateVideo(function(err, id) {
    			if (err) {
    				return $scope.error = "Error al subir el archivo de vídeo";
    			}

				$scope.phase = 2;
    			$scope.video.id = id;
    			$scope.video.allocating = false;
    			$scope.video.loading = true;

    			Videos.upload(file);
    		});
    	} 
    	else {
    		$scope.error = "Archivo de vídeo incorrecto";
    	}
    }

}]);