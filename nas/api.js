var winston = require('winston');
var express = require('express');
var path = require('path');

var app = express();

// Initialize

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	winston.info('listening at port %s', port);

});

// https://github.com/rajkissu/binaryjs-upload-stream