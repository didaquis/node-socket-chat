const { io } = require('../server');

const { timeStamp, sortArrayOfObjectsByValueOfProperty } = require('../utils/utils');

const { Users } = require('../classes/users');
const users = new Users();

// Crear una conexión con un cliente
io.on('connection', (client) => {
	client.on('disconnect', () => {
		let disconnectedPerson = users.deletePerson(client.id);
		if(disconnectedPerson) {
			client.broadcast.to(disconnectedPerson.room).emit('messageFromServer', { message: `${disconnectedPerson.name} has been disconnected.`, timestamp: timeStamp() });
		}
	});

	client.on('enterToChat', (data, cb) => {
		if (!data.name || data.name === '' || !data.room || data.room === '') {
			return cb({
				error: true,
				message: 'Name and room chat are required'
			});
		}

		client.join(data.room); // Unimos el usuario a una sala
		users.addPerson(client.id, data.name, data.room);
		let allUsersOnRoom = users.getPeopleByRoom(data.room);

		client.broadcast.to(data.room).emit('messageFromServer', { message: `${users.getPerson(client.id).name} has connected.`, timestamp: timeStamp() });

		client.broadcast.to(data.room).emit('messageFromServer', { message: `Users on chat: ${users.getNameOfPersonsConnectedByRoom(data.room).join(', ')}.`, timestamp: timeStamp() });

		sortArrayOfObjectsByValueOfProperty(allUsersOnRoom, 'name');
		client.broadcast.to(data.room).emit('usersOnThisChat', allUsersOnRoom);

		cb(allUsersOnRoom);
	});

	// Escuchando al frontend (cliente). Mensajes públicos de un usuario a todos los demás usuarios
	client.on('messageFromClient', (data, cb) => {
		let person = users.getPerson(client.id);

		if (person.name && data.message) {
			client.broadcast.to(person.room).emit('messageFromUser', { user:person.name, message: data.message, timestamp: timeStamp() } );
			cb({ ok: true, data: { user:person.name, message: data.message, timestamp: timeStamp() } });
		} else {
			cb({ ok: false, error: 'Error in communication' });
		}

	});

});
