import {globalData as num} from './globalData.js';
import {updateTableData} from './updateTableData.js';
import { newValidityForm } from './validation.js';
import {addNotification,removeNotification} from './notifications.js';
import {checkResponse} from './response.js';
import {getData} from './getData.js';

const NOTIFICATION_TYPES = {
	WARNING: 'warning',
	SUCCESS: 'success',
    ERROR: 'error',
}


export function saveTableData(numId) {

    let forms = document.getElementById('form_dialog');

	const formData = new FormData(forms);
    formData.append("id", numId);
    if(!(forms.checkValidity())){
        const firstInvalidInputEl = forms.querySelector(':invalid');
        firstInvalidInputEl?.focus();
        newValidityForm(forms);
        return;
    }
	fetch('/data', {
		method: 'PUT',
		credentials: 'include',
		body: formData
	})
    .then((response) => {
        checkResponse(response);
        if(response.ok){
            setTimeout(() => {
                const warning = addNotification("Успешно",NOTIFICATION_TYPES.SUCCESS, 'Данные обновлены');
                setTimeout(() => {
                    removeNotification(warning);
                }, 4000);
            }, 1);
        }
    })
    .then(() => {
        let dialog = document.getElementById('edit_dialog');
        dialog.close();
        document.getElementById('dialog_content').textContent = '';
        getData();
    })
    .catch(() => {
        let dialog = document.getElementById('edit_dialog');
        dialog.close();
        document.getElementById('dialog_content').textContent = '';
        const warning = addNotification("Ошибка",NOTIFICATION_TYPES.ERROR, 'Попробуйте позже');
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    });
}
