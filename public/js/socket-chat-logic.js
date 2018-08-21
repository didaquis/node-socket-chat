
// references
const userListConnected = document.querySelector('#userListConnected');
const formNewMessage = document.querySelector('#formNewMessage');

// functions
function renderUsers(users) {
	let htmlToRender = '';

	for(let i = 0; i < users.length; i++) {
		htmlToRender += `<li class="list-group-item" data-idofuser="${users[i].id}">${users[i].name}</li>`;
	}

	userListConnected.innerHTML = htmlToRender;
}



// listeners
userListConnected.addEventListener('click', (e) => {
	const elementOfUserListConnected = e.target;
	//console.log(e.target);

	if (elementOfUserListConnected.hasAttribute('data-idofuser')) {
		//elementOfUserListConnected.dataset.idofuser
	}

}, false);


formNewMessage.addEventListener('submit', (e) => {
	e.preventDefault();

	const rawMessage = e.target.message.value;
	const message = rawMessage.trim();
	if (message.length === 0) {
		return;
	}

	
}, false);
