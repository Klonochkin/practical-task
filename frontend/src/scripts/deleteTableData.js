import {addNotification,removeNotification} from './notifications.js';
import {checkResponse} from './response.js';
import {getData} from './getData.js';

const notification_types = {
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
};
/**
 * @param {number} numId
 */
export function deleteTableData(numId) {
	fetch(`/api/data/${numId}`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((response) => {
        checkResponse(response);
            if (response.ok) {
                const warning = addNotification(
                    'Успешно',
                    notification_types.SUCCESS,
                    'Данные удалены',
                );
            setTimeout(() => {
                removeNotification(warning);
            }, 4000);
            getData();
        }
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
}


