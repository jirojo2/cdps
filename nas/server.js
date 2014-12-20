var winston = require('winston');
var express = require('express');
var async = require('async');
var path = require('path');
var fs = require('fs');

var app = express();

var NAS_PATH = '/mnt/nas';

// Modules

app.use(require('body-parser').json());
app.use(require('connect-busboy')());

// Middleware

function validateLocalServer(req, res, next) {
	// TODO whitelist ip?
	next();
}

function allocateVideo(req, res) {
	var videoid = req.body.id;

	var videofile = path.join(NAS_PATH, videoid);
	var videofile_allocated =  videofile + '.allocated';

	async.series([
		function(cb) {
			// Comprobamos que el video no esté pendiente
			fs.exists(videofile_allocated, function(exists) {

				if (exists) {
					cb('el vídeo ya está siendo subido');
				}
				else {
					cb();
				}

			});
		},
		function(cb) {
			// Comprobamos que el video no existe ya
			fs.exists(videofile, function(exists) {

				if (exists) {
					cb('el vídeo ya existe');
				}
				else {
					cb();
				}

			});
		},
		function(cb) {
			// Comprobamos que el video no existe ya
			fs.writeFile(videofile_allocated, '', function(err) {

				if (err) {
					cb('error al escribir el fichero');
				}
				else {
					cb();
				}

			});
		}
	], function(err) {
		if (err) {
			res.json(500, { error: true, msg: err });
		}
		else {
			res.json({ error: false });
		}
	});
}

function validateAllocatedVideo(req, res, next) {
	var videoid = req.params.id;

	var videofile = path.join(NAS_PATH, videoid + '.allocated');
	fs.exists(videofile, function(exists) {
		if (exists) {
			next();
		}
		else {
			res.json(404, { error: true, videoid: videoid })
		}
	});
}

// http://stackoverflow.com/questions/23691194/node-express-file-upload
function uploadVideo(req, res) {
	var videoid = req.params.id;

	var videofile = path.join(NAS_PATH, videoid);
	var videofile_allocated =  videofile + '.allocated';

	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where video will be uploaded
        fstream = fs.createWriteStream(path.join(NAS_PATH, filename));
        file.pipe(fstream);
        fstream.on('close', function () {
        	fs.unlink(videofile_allocated, function(err) {
	            console.log("Upload Finished of " + filename);
	            res.json({ error: false });
	        });
        });
    });
}

function downloadVideo(req, res) {
	var videoid = req.params.id;

	res.sendFile(path.join(NAS_PATH, videoid));
}

// Router

app.post('/video/allocate', validateLocalServer, allocateVideo);
app.post('/video/:id', validateAllocatedVideo, uploadVideo);
app.get ('/video/:id', downloadVideo);

// Initialize

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	winston.info('listening at port %s', port);

});

// Revisar https://github.com/rajkissu/binaryjs-upload-stream