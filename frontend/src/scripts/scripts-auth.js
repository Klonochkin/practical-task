document.getElementById('form-auth')?.addEventListener('submit', (event) => {
    event.preventDefault();
    /** @type {HTMLInputElement | null | undefined} */
    let qwefa = document
        .getElementById('email-auth')
        ?.parentElement?.querySelector('input');
    let valueEmail;
    if (qwefa) {
        valueEmail = qwefa.value;
    }
    /** @type {HTMLInputElement | null | undefined} */
    let qwefa2 = document
        .getElementById('password-auth')
        ?.parentElement?.querySelector('input');
    let valuePassword;
    if (qwefa2) {
        valuePassword = qwefa2.value;
    }
    fetch('/api/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: valueEmail,
            password: valuePassword,
        }),
    })
        .then((response) => {
            if (response.ok) {
                window.location.href = '/';
                return response.json();
            } else if (response.status === 401) {
                document
                    ?.getElementById('error-auth')
                    ?.classList.remove('visually-hidden');
                let lolcheck = document.getElementById('error-auth');
                if (lolcheck) {
                    lolcheck.innerHTML = 'Аккаунта не существует';
                }
            } else if (response.status === 422) {
                document
                    ?.getElementById('error-auth')
                    ?.classList.remove('visually-hidden');
                let lolcheck = document.getElementById('error-auth');
                if (lolcheck) {
                    lolcheck.innerHTML = 'Введён не правильный пароль';
                }
            } else {
                window.location.href = '/auth';
            }
            return;
        })
        .catch((error) => console.log(error));
});
