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

    _scope = $scope;
    
	function validateVideo (f) {
		//return f.type == "application/pdf";
        return true;
	}

    $scope.fileNameChanged = function() {
        console.log("...")

    	var file = document.getElementById('file').files[0];

    	if (validateVideo(file)) {
    		$scope.video = { allocating: true };
    		$scope.error = null;
			$scope.phase = 1;    		
    	} 
    	else {
    		$scope.error = "Archivo de vídeo incorrecto";
            console.log("error");
    	}
    }

    $scope.uploadVideo = function() {
        $scope.phase = 2;

        Videos.allocateVideo(file.name ,function(err, id) {
            if (err) {
                return $scope.error = "Error al subir el archivo de vídeo";
            }

            $scope.phase = 3;
            $scope.video.id = id;
            $scope.video.allocating = false;
            $scope.video.loading = true;

            Videos.upload(file, id, function(err) {
                $scope.phase = 4;
                $scope.video.loading = false;
                $scope.video.uploaded = true;

                console.log(err||'video subido correctamente ' + id);
            });
        });
    }

}]);