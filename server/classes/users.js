class Users {
	constructor() {
		this.people = [];
	}

	addPerson(id, name) {
		let person = { id, name };

		this.people.push(person);

		return this.people;
	}

	getPerson(id) {
		let person = this.people.filter( p => {
			return p.id === id;
		} )[0]; // Este "[0]" nos garantiza que person contendrá ún unico resultado si por algún motivo el filter nos devolviera más de un resultado.

		return person; // si no hay resultados, devolverá "undefined".
	}

	getPeople() {
		return this.people;
	}

	deletePerson(id) {

		let deletedPerson = this.getPerson(id);

		this.people = this.people.filter(p => {
			return p.id !== id;
		});

		return deletedPerson;
	}
}

module.exports = { Users };
