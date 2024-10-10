import {addNotification,removeNotification} from '/static/scripts/notifications.js';
import {checkResponse} from '/static/scripts/response.js';
import {getData} from '/static/scripts/getData.js';

const NOTIFICATION_TYPES = {
	WARNING: 'warning',
	SUCCESS: 'success',
    ERROR: 'error',
}

export function deleteTableData(numId) {
	fetch(`/data/${numId}`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((response) => {
        checkResponse(response);
        if(response.ok){
            const warning = addNotification("Успешно",NOTIFICATION_TYPES.SUCCESS, 'Данные удалены');
            setTimeout(() => {
                removeNotification(warning);
            }, 4000);
            getData();
        }
    })
	.catch(() => {
        const warning = addNotification("Ошибка",NOTIFICATION_TYPES.ERROR, 'Попробуйте позже');
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    });
}


