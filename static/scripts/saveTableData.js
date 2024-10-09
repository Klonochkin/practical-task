import {globalData as num} from '/static/scripts/globalData.js';

import {updateTableData} from '/static/scripts/updateTableData.js';

import { newValidityForm } from '/static/scripts/validation.js';

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
		.then(() => {
        let dialog = document.getElementById('edit_dialog');
        dialog.close();
        document.getElementById('dialog_content').textContent = '';
		fetch('/data',{
			method: 'GET',
			credentials: 'include'
			})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			if (response.status === 403) {
				console.error('Аккаунт не найден');
				window.location.href = '/auth';
			}
				else {
				console.error('Error:', response.status);
				}
		})
		.then((data2) => {
			num.fetchData = data2;
			const table = document.getElementById('table_device');
			const n = table.rows.length;
			for (let i = 1; i < n; i++) {
				table.deleteRow(1);
			}
			let n2 = data2.length;
			for (let i = 0; i < n2; i++) {
				const number = data2[i].id;
				const type_device = data2[i].type_device;
				const model_device = data2[i].model_device;
				const serial_number = data2[i].serial_number;
				const ITAM_device = data2[i].ITAM_device;
				const photo_device = data2[i].photo_device;
				const photo_serial_number_device =
				data2[i].photo_serial_number_device;
				const photo_ITAM_device = data2[i].photo_ITAM_device;
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
