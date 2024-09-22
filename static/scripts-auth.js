
document.getElementById('form-auth').addEventListener('submit', (event)=>{

	event.preventDefault();
	let valueEmail = document.getElementById('email-auth').value;
	let valuePassword = document.getElementById('password-auth').value;

	fetch('/signIn', {
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
		console.log(data);
		if(data["status"] === 403){
			document.getElementById('error-auth').classList.remove("visually-hidden");
			document.getElementById('error-auth').innerHTML="Аккаунт не найден. Повторите попытку или зарегистрируйтесь";
		}
		else{
			document.getElementById('error-auth').classList.add("visually-hidden");
			document.getElementById('error-auth').innerHTML="";
			document.cookie = `email=${valueEmail}; max-age=3600`;
			window.location.href = '/';
		}
	})
	.catch((error) => console.log(error));
})

document.getElementById('toRegister').addEventListener('click', ()=>{
	window.location.href = '/register';
})
