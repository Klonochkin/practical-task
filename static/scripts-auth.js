

document.getElementById('form-auth').addEventListener('submit', (event)=>{
	event.preventDefault();
	let email = document.getElementById('email').value;
	console.log(email);
	document.cookie = `email=${email}; max-age=3600`;
	window.location.href = '/';
})
