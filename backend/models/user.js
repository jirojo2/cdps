var crypto = require('crypto');
var Video = require('./video');

var mongoose = require('mongoose');
var videoSchema = mongoose.model('Video').schema;

var userSchema = new mongoose.Schema({
	email: String,
	password: String, // hashed and salted password
	salt: String,     // random salt used to generate the salted password
	favourites: [ videoSchema ]
});

userSchema.methods.generateSaltedPassword = function(password) {
	var hasher = crypto.createHash('sha512');

	if (!this.salt) {
		this.salt = crypto.randomBytes(8).toString('hex');
	}

	hasher.update(this.salt);
	hasher.update(password);

	this.password = hasher.digest('hex');
	return this;
}

userSchema.methods.isValidPassword = function(password) {
	var hasher = crypto.createHash('sha512');

	hasher.update(this.salt);
	hasher.update(password);

	var hash = hasher.digest('hex');
	return (this.password === hash);
}

userSchema.methods.fav = function(video) {
	this.favourites.push(video._id);
}

userSchema.methods.unfav = function(video) {
	var idx = this.favourites.indexOf(video);
	if (idx != -1)
		this.favourites.splice(idx, 1);
}

var User = mongoose.model('User', userSchema);
module.exports = User;