
// references
const userListConnected = document.querySelector('#userListConnected');
const formNewMessage = document.querySelector('#formNewMessage');
const chatBox = document.querySelector('#chatBox');

// functions
function renderUsersOnUserList(users) {
	let htmlToRender = '';

	for(let i = 0; i < users.length; i++) {
		htmlToRender += `<li class="list-group-item" data-idofuser="${users[i].id}">${users[i].name}</li>`;
	}

	userListConnected.innerHTML = htmlToRender;
}

function renderPublicMessage(fromUser, message, timestamp, myOwnMessage, cb) {

	if (typeof fromUser !== 'undefined' && typeof message !== 'undefined' && typeof timestamp !== 'undefined' && typeof myOwnMessage === 'boolean') {
		let htmlToRender = '';
		htmlToRender += '<div class="card mb-3">';
		if (myOwnMessage) {
			htmlToRender += '	<div class="card-header text-muted bg-dark">';
			htmlToRender += '		<div class="row text-white">';
		} else {
			htmlToRender += '	<div class="card-header text-muted bg-light">';
			htmlToRender += '		<div class="row text-dark">';
		}
		htmlToRender += '			<div class="col-sm-8">';
		htmlToRender += `				<small>Public message from: ${fromUser}</small>`;
		htmlToRender += '			</div>';
		htmlToRender += '			<div class="col-sm-4 text-right">';
		htmlToRender += `				<small>${timestamp}</small>`;
		htmlToRender += '			</div>';
		htmlToRender += '		</div>';
		htmlToRender += '	</div>';
		htmlToRender += '	<div class="card-body">';
		htmlToRender += `		<p class="card-text">${message}</p>`;
		htmlToRender += '	</div>';
		htmlToRender += '</div>';

		chatBox.innerHTML += htmlToRender;

		if (typeof cb === 'function') {
			cb();
		}
	}
}


function renderMessageFromServer(message, timestamp, cb) {

	if (typeof message !== 'undefined' && typeof timestamp !== 'undefined') {
		let htmlToRender = '';
		htmlToRender += '<p class="text-muted">';
		htmlToRender += `	<small>${timestamp} - ${message}</small>`;
		htmlToRender += '</p>';

		chatBox.innerHTML += htmlToRender;

		if (typeof cb === 'function') {
			cb();
		}
	}
}


function resetInputAndSetFocus(element) {
	element.value = '';
	element.focus();
}

function updateScrollOfElement(element = chatBox){
	element.scrollTop = element.scrollHeight;
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
		resetInputAndSetFocus(e.target.message);
		return;
	}

	// Enviar contenido al backend (server)
	socket.emit('messageFromClient', { message: message }, (result) => {
		if (result.ok) {
			resetInputAndSetFocus(e.target.message);
			renderPublicMessage(result.data.user, result.data.message, result.data.timestamp, true);
			updateScrollOfElement(chatBox);
		} else {
			console.error(result.error); // eslint-disable-line no-console
		}
	});

}, false);
