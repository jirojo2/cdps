var winston = require('winston');
var express = require('express');
var path = require('path');

var mongoose = require('mongoose');
var models = require('./models');
var api = require('./api');

var User = mongoose.model('User');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// Modules

// Setting up passport.js auth
passport.use(new LocalStrategy( {
		usernameField: 'email',
		passwordFiled: 'password'
	},
	function(email, password, done) {
		User.findOne({ email: email }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect email.' });
			}
			if (!user.isValidPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));

passport.serializeUser(api.auth.serialize);
passport.deserializeUser(api.auth.deserialize);

app.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));
app.use(require('body-parser').json());
app.use(require('express-session')({ 
	secret: 'tbiurjyrb6r7b6r76r7i6r76',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Router

// /
// /login
// /singup
// /video/:id
// /user/:id

// /api/version
// /api/user
// /api/video

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get ('/api/auth', api.auth.session);
app.post('/api/auth/login', passport.authenticate('local'), api.auth.login);
app.post('/api/auth/logout', api.auth.logout);
app.post('/api/auth/signup', api.auth.signup);

app.get ('/api/videos', api.videos.list);
app.post('/api/video', api.auth.require.user, api.videos.create);

app.delete('/api/video/:id', api.videos.require.author, api.videos.delete);
app.put('/api/video/:id', api.videos.require.author, api.videos.update);
app.get('/api/video/:id', api.videos.download);

// Initialize

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	winston.info('listening at port %s', port);

	mongoose.connect('mongodb://localhost/cdps');
	
	var db = mongoose.connection;
	db.on('error', winston.error.bind(winston, 'mongodb connection error'));

});