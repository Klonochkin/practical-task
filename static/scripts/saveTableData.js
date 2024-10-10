import {globalData as num} from '/static/scripts/globalData.js';
import {updateTableData} from '/static/scripts/updateTableData.js';
import { newValidityForm } from '/static/scripts/validation.js';
import {addNotification,removeNotification} from '/static/scripts/notifications.js';
import {checkResponse} from '/static/scripts/response.js';
import {getData} from '/static/scripts/getData.js';

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
