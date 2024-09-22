
document.getElementById('form-register').addEventListener('submit', (event)=>{

	event.preventDefault();
	let valueEmail = document.getElementById('email-register').value;
	let valuePassword = document.getElementById('password-register').value;

	fetch('/signUp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: valueEmail,
			password: valuePassword
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		if(data["status"] === 403){
			document.getElementById('error-register').classList.remove("visually-hidden");
			document.getElementById('error-register').innerHTML="Аккаунт с таким адресом уже существует";
		}
		else if(data["status"] === 422){
			document.getElementById('error-register').classList.remove("visually-hidden");
			document.getElementById('error-register').innerHTML="Пароль должен быть не менее 8 символов";
		}
		else{
			document.getElementById('error-register').classList.add("visually-hidden");
			document.getElementById('error-register').innerHTML="";
			document.cookie = `email=${valueEmail}; max-age=3600`;
			window.location.href = '/';
		}
	})
	.catch((error) => console.log(error));
})


document.getElementById('toAuth').addEventListener('click', ()=>{
	window.location.href = '/auth';
})
