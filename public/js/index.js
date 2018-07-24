
var socket = io();
// console.log("entered in js file");
// client connected event handler
// removing ES6 arrow function as it might crash in some other verions of browsers
socket.on('connect', function () {
	console.log('Connected to server');

	// we are emitting event in here because we don't have to emit 
	// event unless we are connected to server
	// socket.emit('createEmail', {
	// 	to : 'jet@example.com',
	// 	text : 'Hey, handsome'
	// });

	// custom event for creating message for chat app
	// socket.emit('createMessage', {
	// 	from : 'Jack',
	// 	text : 'Hi that works for me'
	// }, function (data) {
	// 	console.log('Received acknowledgement from server : ', data);
	// });

});

// event handlers that are ment for receiving data from server
// should be outside of "socket.on('connect'," 

// client disconencted event handler
// removing ES6 arrow function as it might crash in some other verions of browsers
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

// custom event
// socket.on('newEmail', function (email){
// 	console.log('New Email ', email);
// });

socket.on('newMessage', function (message) {
	console.log('New Message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from} : ${message.text}`);
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e){
	e.preventDefault();
	socket.emit('createMessage', {
		from : 'User',
		text : jQuery('[name=messages]').val()
	}, function(){
		console.log('acknowledgement received');
	});
});
