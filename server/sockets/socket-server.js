const { io } = require('../server');

//const { createMessage } = require('../utils/utils');

const { Users } = require('../classes/users');
const users = new Users();

// Crear una conexión con un cliente
io.on('connection', (client) => {

	client.on('disconnect', () => {
		let disconnnectedPerson = users.deletePerson(client.id);
		if(disconnnectedPerson) {
			client.broadcast.emit('messageFromServer', { message: `${disconnnectedPerson.name} has been disconnected.` });
			client.broadcast.emit('messageFromServer', { message: `Users on chat: ${users.getNameOfPersonsConnected().join(', ')}.` });
		}
	});

	client.on('enterToChat', (data, cb) => {
		if (!data.name || data.name === '') {
			return cb({
				error: true,
				message: 'Name is required'
			});
		}

		users.addPerson(client.id, data.name);

		client.broadcast.emit('messageFromServer', { message: `${users.getPerson(client.id).name} has connected.` });
		client.broadcast.emit('messageFromServer', { message: `Users on chat: ${users.getNameOfPersonsConnected().join(', ')}.` });
	});

	// Escuchando al frontend (cliente)
	client.on('messageFromClient', (data) =>{
		let person = users.getPerson(client.id);

		if (person.name && data.message) {
			client.broadcast.emit('messageFromUser', { user:person.name, message: data.message } );
		}
	});

});
