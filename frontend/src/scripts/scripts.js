import { globaldata as num } from './globalData.js';
import { createForm } from './createForm.js';
import { validityInputUpdate, validityFileUpdate } from './validation.js';
import { addNotification, removeNotification } from './notifications.js';
import { checkResponse } from './response.js';
import { getData } from './getData.js';

const notification_types = {
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
};

createForm();

getData();

document.getElementById('exit')?.addEventListener('click', () => {
	fetch('/api/exit', {
		method: 'POST',
		credentials: 'include'
	})
        .then((response) => response.json())
        .then(() => {
            window.location.href = '/auth';
	})
	.catch(() => {
            const warning = addNotification(
                'Ошибка',
                notification_types.ERROR,
                'Попробуйте позже',
            );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    });
});

document.getElementById('form-add')?.addEventListener('click', () => {
	createForm();
})

document.getElementById('submit')?.addEventListener('click', () => {
    let forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
        let form = forms[i];
        newValidityForm(form);
        if (!form?.checkValidity()) {
            /** @type { HTMLElement | null} */
            const firstInvalidInputEl = form?.querySelector(':invalid');
            firstInvalidInputEl?.focus();
            return;
        }
	}

    let isConnectionLoss = false;
    let promise = []
	for(let i=0;i<forms.length;i++){
		let form = forms[i];
        if (form.checkValidity()) {

            const formData = new FormData(form);
            promise.push(fetch('/api/form', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            .then(response => {
                checkResponse(response);
                        if (response.ok) {
                            const warning = addNotification(
                                'Успешно',
                                notification_types.SUCCESS,
                                'Данные сохранены',
                            );
                    setTimeout(() => {
                        removeNotification(warning);
                    }, 4000);
                }
            })
            .catch(() => {
                isConnectionLoss = true;
                        const warning = addNotification(
                            'Ошибка',
                            notification_types.ERROR,
                            'Попробуйте позже',
                        );
                setTimeout(() => {
                    removeNotification(warning);
                }, 4000);
            }));
        }
	}
    Promise.all(promise)
    .then(()=>{
        if(!isConnectionLoss){
            getData();
            num.countForm = 2;
            let qew = document.getElementById('forms');
            if (qew) {
                qew.textContent = '';
            }
            createForm();
        }
    });
});
/** @param { HTMLFormElement } form*/
function newValidityForm(form) {
    const elements = form.elements;
    let parentField = elements[0].parentNode;
    let parentForm = parentField?.parentNode;
    /** @type {HTMLParagraphElement[]} */
    let paragraph = [];
    if (parentForm) {
        paragraph = Array.from(parentForm.querySelectorAll('p'));
    }

    for (let i = 0; i < elements.length; i++) {
        const element = /** @type {HTMLFormElement} */ (elements[i]);

        const isInputValid = element?.checkValidity();
        element.classList.toggle('is-invalid', !isInputValid);
        paragraph[i]?.classList.toggle('visually-hidden', isInputValid);

        let type = element?.getAttribute('type');
        if (element && (type === 'text' || element.tagName === 'SELECT')) {
            element?.addEventListener('input', () => {
                validityInputUpdate(element, paragraph[i]);
            });
        } else if (element && type === 'file') {
            let message = /** @type {HTMLElement} */ (
                element?.parentNode?.parentNode
            );
            message?.classList.toggle('form__field-lable-error', !isInputValid);
            element?.parentNode?.addEventListener('input', () => {
                validityFileUpdate(element);
            });
        }

      }
}

document.getElementById('export')?.addEventListener('click', () => {
    fetch('/api/export', {
        method: 'POST',
        credentials: 'include',
        })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Table Device.zip';
        a.click();
    })
        .catch(() => {
            const warning = addNotification(
                'Ошибка',
                notification_types.ERROR,
                'Попробуйте позже',
            );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    });
})

