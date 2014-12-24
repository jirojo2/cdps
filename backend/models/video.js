var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
	title: String,
	desc: String,
	format: String, // mp4, ogg, webm
	date: { type: Date, default: Date.now },
	meta: {
	    likes: Number,
	    dislikes: Number
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

var Video = mongoose.model('Video', videoSchema);
module.exports = Video;