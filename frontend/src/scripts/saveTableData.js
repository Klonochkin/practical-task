import { newValidityForm } from './validation.js';
import { addNotification, removeNotification } from './notifications.js';
import { checkResponse } from './response.js';
import { getData } from './getData.js';

const notification_types = {
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
};
/**
 * @param {number} numId
 */
export function saveTableData(numId) {
    let forms = /** @type { HTMLFormElement | null | undefined } */ (
        document.getElementById('form_dialog')
    );
    let formData;
    if (forms) formData = new FormData(forms);
    formData?.append('id', numId.toString());
    if (!forms?.checkValidity()) {
        /** @type { HTMLFormElement | null | undefined } */
        const firstInvalidInputEl = forms?.querySelector(':invalid');
        firstInvalidInputEl?.focus();
        if (forms) newValidityForm(forms);
        return;
    }
    fetch('/api/data', {
        method: 'PUT',
        credentials: 'include',
        body: formData,
    })
        .then((response) => {
            checkResponse(response);
            if (response.ok) {
                setTimeout(() => {
                    const warning = addNotification(
                        'Успешно',
                        notification_types.SUCCESS,
                        'Данные обновлены',
                    );
                    setTimeout(() => {
                        removeNotification(warning);
                    }, 4000);
                }, 1);
            }
        })
        .then(() => {
            /** @type {HTMLFormElement | null} */
            let edit_dialog123 = document.querySelector('#edit_dialog');
            edit_dialog123?.close();
            let apfjaf = document.getElementById('dialog_content');
            if (apfjaf) apfjaf.textContent = '';
            getData();
        })
        .catch(() => {
            /** @type {HTMLFormElement | null} */
            let edit_dialog123 = document.querySelector('#edit_dialog');
            edit_dialog123?.close();
            const warning = addNotification(
                'Ошибка',
                notification_types.ERROR,
                'Попробуйте позже',
            );
            setTimeout(() => {
                removeNotification(warning);
            }, 4000);
        });
}
