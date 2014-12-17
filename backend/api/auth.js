var winston = require('winston');
var mongoose = require('mongoose');

var User = mongoose.model('User');

var auth = {};
module.exports = auth;

auth.require = {};
auth.require.user = function(req, res, next) {
	if (req.user) next();
	else res.json(403, { code: 1, msg: 'acceso denegado' });
}

auth.session = function(req, res) {
	if (!req.user) {
		return res.json({ code: 0, user: null });
	}

	User.findById(req.user.id).populate('favourites').exec(function(err, user) {
		if (err) return res.json({ code: 1, msg: 'error' });
		res.json({ code: 0, user: user });
	});
}

auth.login = function(req, res) {
	if (req.user) {
		res.json({ code: 0, user: req.user });
	}
	else {
		res.json({ code: 1, msg: 'credenciales incorrectas' });
	}
}

auth.logout = function(req, res) {
	req.logout();
	res.json({ code: 0 });
}

auth.signup = function(req, res) {

	var email = req.body.email || '';
	var password = req.body.password || '';

	if (!email || !password) {
		return res.json({ error: 1, msg: 'parámetros inválidos' })
	}

	// comprobamos que el usuario no existe aun
	User.findOne({ email: email }).populate('favourites').exec(function(err, user) {
		if (err) {
			winston.error('DB Error: %s', err);
			return res.json({ code: 1, msg: 'error' });
		}

		if (user) {
			winston.info('Registro: usuario repetido: %s', email);
			return res.json({ code: 2, msg: 'el email ya está registrado' });
		}

		new User({
			email: email
		}).generateSaltedPassword(password).save(function(err) {
			if (err) { 
				winston.error('DB Error: %s', err);
				return res.json({ code: 3, msg: 'error' });
			}
			res.json({ code: 0 });
		});
	});
}

auth.serialize = function(user, done) {
	done(null, user._id);
}

auth.deserialize = function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
}