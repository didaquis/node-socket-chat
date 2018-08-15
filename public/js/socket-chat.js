const socket = io(); // eslint-disable-line no-undef


let params = new URLSearchParams(window.location.search);

if (!params.has('name') || params.get('name') === '') {
	window.location = 'index.html';
	throw new Error('Name of user is required');
}

let usernameFromURL = {
	name: params.get('name')
};


// Detectar conexión con el servidor
socket.on('connect', () => {
	socket.emit('enterToChat', usernameFromURL, (res) => {
		if (!res.error) {
			console.info('Users connected:', res); // eslint-disable-line no-console
		} else {
			console.error(res.message); // eslint-disable-line no-console
		}
	});
});

// Detectar la finalización de un conexión
socket.on('disconnect', () => {
	console.info('Connection with server through Socket.io has been finished'); // eslint-disable-line no-console
});


// Enviar contenido al backend (server)
socket.emit('messageFromClient', { message: 'Hi! This is a message from frontend'});

// Escuchar al backend (server)
socket.on('messageFromServer', (data) => {
	console.log('Message from server: ', data); // eslint-disable-line no-console
});