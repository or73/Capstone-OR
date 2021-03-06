require('./config/db.js');

// modules =========================================
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./app/routes');
var port = process.env.PORT || 3000;

// configuration ===================================
// Define the port to run on
app.set('port',
				port);

// Add middleware to console log every request
app.use(function(req, res, next)
				{
				  console.log(req.method, req.url);
				  next();
				});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/fonts', express.static(__dirname + 'fonts'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Add some routing
app.use('/app',
				routes);


// start app =======================================
// Listen for requests
var server = app.listen(app.get('port'),
												function()
												{
												  var port = server.address().port;
												  console.log('Server running on port: ' + port);
												});
