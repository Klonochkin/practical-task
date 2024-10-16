document
    .getElementById('form-register')
    ?.addEventListener('submit', (event) => {
        event.preventDefault();
        /** @type {HTMLInputElement | null | undefined} */
        let qwefa = document
            .getElementById('email-register')
            ?.parentElement?.querySelector('input');
        let valueEmail;
        if (qwefa) {
            valueEmail = qwefa.value;
        }
        /** @type {HTMLInputElement | null | undefined} */
        let qwefa2 = document
            .getElementById('password-register')
            ?.parentElement?.querySelector('input');
        let valuePassword;
        if (qwefa2) {
            valuePassword = qwefa2.value;
        }

        fetch('/api/signUp', {
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
                    window.location.href = '/auth';
                    return response.json();
                } else if (response.status === 401) {
                    document
                        ?.getElementById('error-register')
                        ?.classList.remove('visually-hidden');
                    let lolcheck = document.getElementById('error-register');
                    if (lolcheck) {
                        lolcheck.innerHTML =
                            'Аккаунт с таким адресом уже существует';
                    }
                } else if (response.status === 422) {
                    document
                        ?.getElementById('error-register')
                        ?.classList.remove('visually-hidden');
                    let lolcheck = document.getElementById('error-register');
                    if (lolcheck) {
                        lolcheck.innerHTML =
                            'Пароль должен быть не менее 8 символов';
                    }
                } else {
                    window.location.href = '/auth';
                }
                return;
            })
            .catch((error) => console.log(error));
    });
