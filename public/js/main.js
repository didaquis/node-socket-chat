const socket = io(); // eslint-disable-line no-undef

// Detectar conexión con el servidor
socket.on('connect', () => {
	console.log('Connected with server through Socket.io'); // eslint-disable-line no-console
});

// Detectar la finalización de un conexión
socket.on('disconnect', () => {
	console.log('Connection with server through Socket.io has been finished'); // eslint-disable-line no-console
});


// Enviar contenido al backend (server)
socket.emit('firstMessage', {user: 'Anonymous', message: 'Hi!'}, (res) => {
	// Le mandamos como tercer parámetro un callback (opcional). Este será ejecutado desde el servidor (el server puede enviarnos datos, observa el argumento "res")
	console.log('Response received from server: ', res); // eslint-disable-line no-console
});

// Escuchar al backend (server)
socket.on('welcomeMessage', (data) => {
	console.log('welcomeMessage from server: ', data); // eslint-disable-line no-console
});