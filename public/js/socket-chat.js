const socket = io(); // eslint-disable-line no-undef

let params = new URLSearchParams(window.location.search);
if (!params.has('name') || params.get('name') === '' || !params.has('room') || params.get('room') === '') {
	window.location = 'index.html';
	throw new Error('Data provided in URL is invalid');
}

let dataFromURL = {
	name: params.get('name'),
	room: params.get('room')
};

socket.on('connect', () => {
	socket.emit('enterToChat', dataFromURL, (res) => {
		if (res.error) {
			console.error(res.message); // eslint-disable-line no-console
		} else {
			renderUsers(res);
		}
	});
});

// Detectar la finalización de un conexión
socket.on('disconnect', () => {
	console.info('Connection with server through Socket.io has been finished'); // eslint-disable-line no-console
});

// Enviar contenido al backend (server)
//socket.emit('messageFromClient', { message: 'Hi! This is a message from frontend'});
//socket.emit('messageFromClient', { message: message }, (result) => {
// 	if (result.ok) {
// 		console.error(result); // eslint-disable-line no-console
// 	} else {
// 		console.error(result.error); // eslint-disable-line no-console
// 	}
// });


// Escuchar al backend (server)
socket.on('messageFromServer', (data) => {
	console.info('Message from server: ', data); // eslint-disable-line no-console
});

socket.on('usersOnThisChat', (data) => {
	renderUsers(data);
});

// Escuchar al backend (server)
socket.on('messageFromUser', (data) => {
	renderPublicMessage(data.user, data.message, data.timestamp, false);
	const chatBox = document.querySelector('#chatBox');
	updateScrollOfElement(chatBox);
	//console.log('Message from user: ', data); // eslint-disable-line no-console
});

socket.on('privateMessageFromUser', (data) => {
	console.log('Private message from user: ', data); // eslint-disable-line no-console
});