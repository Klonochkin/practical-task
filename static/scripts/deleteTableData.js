
import {globalData as num} from '/static/scripts/globalData.js';

import {updateTableData} from '/static/scripts/updateTableData.js';

import {addNotification,removeNotification} from '/static/scripts/notifications.js';

const NOTIFICATION_TYPES = {
	WARNING: 'warning',
	SUCCESS: 'success',
}

export function deleteTableData(numId) {
	const table = document.getElementById('table_device');
	let a = table.rows.length;
	for (let i = 1; i < a; i++) {
		table.deleteRow(1);
	}
	fetch(`/data/${numId}`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then(() => {
			fetch('/data',{
				method: 'GET',
				credentials: 'include',
				})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				if (response.status === 403) {
					console.error('Аккаунт не найден');
					window.location.href = '/auth';
				}
				else if(response.status === 404){
					console.error('Запись не найдена');
				}
				else {
					console.error('Error:', response.status);
				  }
			})
			.then((data) => {
            setTimeout(() => {
                const warning = addNotification("Успешно",NOTIFICATION_TYPES.SUCCESS, 'Данные удалены');
                setTimeout(() => {
                    removeNotification(warning);
                }, 2000);
            }, 1);
			num.fetchData = data;
			const n = data.length;
			for (let i = 0; i < n; i++) {
				const number = data[i].id;
				const type_device = data[i].type_device;
				const model_device = data[i].model_device;
				const serial_number = data[i].serial_number;
				const ITAM_device = data[i].ITAM_device;
				const photo_device = data[i].photo_device;
				const photo_serial_number_device =
					data[i].photo_serial_number_device;
				const photo_ITAM_device = data[i].photo_ITAM_device;
				updateTableData(
					number,
					type_device,
					model_device,
					serial_number,
					ITAM_device,
					photo_device,
					photo_serial_number_device,
					photo_ITAM_device
				);
			}
		})
		.catch((error) => console.error('Ошибка:', error));
		})
		.catch((error) => console.error('Ошибка:', error));
}

