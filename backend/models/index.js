var path = require('path');
var fs = require('fs');

fs.readdirSync(__dirname).forEach(function(file) {
	exports[path.basename(file, '.js')] = require(path.join(__dirname, file));
});
