
// references
const userListConnected = document.querySelector('#userListConnected');

// functions

function renderUsers(users) {
	let htmlToRender = '';

	for(let i = 0; i < users.length; i++) {
		htmlToRender += `<li class="list-group-item" data-idOfUser="${users[i].id}">${users[i].name}</li>`;
	}

	userListConnected.innerHTML = htmlToRender;
}
