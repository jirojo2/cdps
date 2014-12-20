var winston = require('winston');
var mongoose = require('mongoose');

var RestClient = require('node-rest-client').Client;

var User = mongoose.model('User');
var Video = mongoose.model('Video');

var nas = new RestClient();

var videos = {};
module.exports = videos;

videos.require = {};

videos.require.author = function(req, res, next) {
	// require un id de video como parámetro
	// el autor del video debe coincidir con el usuario

	var videoid = Number(req.params.id);

	if (!videoid) {
		return res.json(404, { code: 1, msg: 'vídeo no encontrado' });
	}

	if (!req.user) {
		return res.json(403, { code: 2, msg: 'acceso denegado' });
	}

	Video.findOneById(videoid).populate('author').exec(function(err, video) {
		if (video.author._id === req.user._id) next();
		else res.json(404, { code: 3, msg: 'vídeo no encontrado' });
	})
}

videos.list = function(req, res) {
	Video.find({}).exec(function(err, list) {
		res.json({ code: 0, list: list });
	});
}

videos.create = function(req, res) {
	// gestionar la subida de un nuevo video
	// creamos entrada en la base de datos y enviamos una petición a la api de videos
	// al crear una entrada en la base de datos, obtendremos un ID para este nuevo video
	// el backend de videos creará un fichero temporal con ese id, permitiendo así la subida directa
	// desde el frontend usando dicho ID

	var video_name = req.body.name || '';

	// parseamos el nombre del fichero para obtener el formato
	// video/<formato>, aceptando: mp4, ogg, webm

	var format = path.extname(video_name).substr(1);

	if(['mp4', 'ogg', 'webm'].indexOf(format) === -1) {
		return res.json({ code: 2, msg: 'formato no soportado' });
	}

	var video = new Video({ format: format });
	video.save(function(err) {
		if (err) {
			return res.json({ code: 1, msg: 'error' });
		}

		// Allocate the video ID in the nas server
		// just creating a .tmp file with the ID as name <ID>.tmp

		nas.post('http://videos.mitubo.es/allocate', {
			data: { id: video._id },
			headers: {"Content-Type": "application/json"} 
		}, function(data, response) {
			data = JSON.parse(data);

			if (data.error) {
				res.json({ code: 1, msg: data.msg });
			}
			else {
				res.json({ code: 0, id: video._id });
			}
		});		
	});
}

videos.delete = function(req, res) {
	// gestionar el borrado del vídeo
}

videos.update = function(req, res) {
	// Actualizamos sólo la descripción del vídeo, no el vídeo en sí
}

videos.favourite = function(req, res) {
	// Añadir al listado de favoritos del usuario
}