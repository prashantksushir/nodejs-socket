// inbuild library
const path = require('path');
// external library
const express = require('express'); 
// external library
const socketIO = require("socket.io");
// inbuild library
const http = require("http");


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
// we need to create server using http and feed it to socketio
var server = http.createServer(app);
var io = socketIO(server);


// creating public directory as static
app.use(express.static(publicPath));


// user connected event handler
io.on('connection', (socket)=>{
	console.log('New user connected');

	// user disconnected event handler
	socket.on('disconnect', ()=>{
		console.log('User was disconnected');
	});

});

// listening to particular port stored in port variable
server.listen(port, ()=>{
	console.log(`server is running on port ${port}`);
});