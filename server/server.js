// Comments of package.json file as we can't add comments in package.json file
// we have added start in script object => here we are informing heroku that server 
// should be started using following command
// we have added engines object and given node key in it => here we are informing heroku 
// that which version of node should be used


// inbuild library
const path = require('path');
// external library
const express = require('express'); 
// external library
const socketIO = require("socket.io");
// inbuild library
const http = require("http");
const {generateMessage} = require('./utils/message');

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

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat Application' ));

	socket.broadcast.emit('newMessage', generateMessage ( 'Admin', 'New user joined' ));

	// custome event
	// socket.emit('newEmail', {
	// 	from : 'mike@example.com',
	// 	text : 'whats up?',
	// 	createdAt : new Date().getTime()
	// });

	// custome event
	// this emits the event to current user connected with this socket
	// socket.emit('newMessage', {
	// 	from : 'John',
	// 	text : 'See you then',
	// 	createdAt : new Date().getTime()
	// });

	// // custome event
	// socket.on('createEmail', (email)=>{
	// 	console.log('Create Email', email);
	// });

	// custome event for creating message in chat app
	socket.on('createMessage', (message) => {
		console.log('Create Message', message);

		// it emits the message to all connected users including current user
		// connected with this socket
		// io.emit('newMessage', {
		// 	from : message.from,
		// 	text : message.text,
		// 	createdAt : new Date().getTime()
		// });

		socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));

	});

	// user disconnected event handler
	socket.on('disconnect', ()=>{
		console.log('User was disconnected');
	});

});

// listening to particular port stored in port variable
server.listen(port, ()=>{
	console.log(`server is running on port ${port}`);
});