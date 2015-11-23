/*
	Server - the lazy foreman

	The server doesn't do any drawing itself.  It just relays drawing messages
	between all the connected clients.
*/
// Set up Express
var express = require("express");
var app = express();

// Serve public folder
var path = require("path");
var publicPath = path.join(__dirname, "public");
var staticServer = express.static(publicPath);
app.use(staticServer);

// Start server
// Piggyback the socket.io connection over the same server
var envPort = process.env.PORT || 8080;
var server = app.listen(envPort);

// the server needs to maintain a *global* array that contains the draw information for every line drawn.  



