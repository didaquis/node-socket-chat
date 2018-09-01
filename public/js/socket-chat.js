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
			renderUsersOnUserList(res); // eslint-disable-line no-undef
		}
	});
});

// Detectar la finalización de un conexión
socket.on('disconnect', () => {
	console.info('Connection with server through Socket.io has been finished'); // eslint-disable-line no-console
});

// Escuchar al backend (server)
socket.on('messageFromServer', (data) => {
	renderMessageFromServer(data.message, data.timestamp, updateScrollOfElement); // eslint-disable-line no-undef
});

socket.on('usersOnThisChat', (data) => {
	renderUsersOnUserList(data); // eslint-disable-line no-undef
});

// Escuchar al backend (server)
socket.on('messageFromUser', (data) => {
	renderPublicMessage(data.user, data.message, data.timestamp, false, updateScrollOfElement); // eslint-disable-line no-undef
});
