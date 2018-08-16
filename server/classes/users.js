/** Class representing an user */
class Users {
	/**
     * Constructor method
     */
	constructor() {
		this.people = [];
	}

	/**
     * Add an user
     * @param {string} id 	Id of user
     * @param {string} name Name of user
     */
	addPerson(id, name, room) {
		if(!id || !name | !room) {
			throw new Error('Data is required');
		}

		let person = { id, name, room };

		this.people.push(person);

		return person;
	}

	/**
	 * Get a person by id
	 * @param  {string} id Id of user
	 * @return {object}    Object with user data
	 */
	getPerson(id) {
		let person = this.people.filter( p => {
			return p.id === id;
		} )[0]; // Este "[0]" nos garantiza que person contendrá ún unico resultado si por algún motivo el filter nos devolviera más de un resultado.

		return person; // si no hay resultados, devolverá "undefined".
	}

	/**
	 * Get all persons
	 * @return {Array.<Object>} Array of objects with data of persons
	 */
	getPeople() {
		return this.people;
	}


	/**
	 * Get name of all persons connected
	 * @return {Array.<Object>} Array of objects with name of persons
	 */
	getNameOfPersonsConnected() {
		let names = [];
		this.people.forEach( p => {
			names.push(p['name']);
		});
		return names;
	}

	/**
	 * Get all persons by room
	 * @param {string} room Id of room
	 * @return {Array.<Object>} Array of objects with data of persons
	 */
	getPeopleByRoom(room) {
		// ...
	}

	/**
	 * Delete a person from list of connected users
	 * @param  {string} id Id of user
	 * @return {object}    Object with deleted user data
	 */
	deletePerson(id) {
		let deletedPerson = this.getPerson(id);

		this.people = this.people.filter(p => {
			return p.id !== id;
		});

		return deletedPerson;
	}
}

/**
 * Users class.
 * @module Users
 * @class
 */
module.exports = { Users };
