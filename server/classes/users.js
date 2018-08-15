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
	addPerson(id, name) {
		let person = { id, name };

		this.people.push(person);

		return this.people;
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
	 * Get all persons by room
	 * @param {string} room Id of room
	 * @return {Array.<Object>} Array of objects with data of persons
	 */
	getPeopleByRoom(room) {
		// ...
	}

	/**
	 * Delete a person from people list
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
