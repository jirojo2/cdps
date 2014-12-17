var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
	title: String,
	desc: String,
	date: { type: Date, default: Date.now },
	meta: {
	    likes:  Number,
	    dislikes: Number
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

videoSchema.methods.download = function() {
	// find this._id in nas storage
}

var Video = mongoose.model('Video', videoSchema);
module.exports = Video;