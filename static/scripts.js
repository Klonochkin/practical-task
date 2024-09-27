import { updateTableData } from '/static/updateTableData.js';
import { globalData as num } from '/static/globalData.js';
import {saveFile} from '/static/saveFile.js';

function getData(){
	fetch('/data',{
		method: 'GET',
		credentials: 'include',
		})
	.then((response) => {
		if (response.ok) {
			return response.json();
		  } else if (response.status === 403) {
			console.error('Аккаунт не найден');
			window.location.href = '/auth';
		  } else {
			console.error('Error:', response.status);
		  }
	})
	.then((data) => {
		num.fetchData = data;
		const table = document.getElementById('table_device');
		const n = table.rows.length;
		for (let i = 1; i < n; i++) {
			table.deleteRow(1);
		}
		let n2 = data.length;
		for (let i = 0; i < n2; i++) {
			const id = data[i].id;
			const type_device = data[i].type_device;
			const model_device = data[i].model_device;
			const serial_number = data[i].serial_number;
			const ITAM_device = data[i].ITAM_device;
			const photo_device = data[i].photo_device;
			const photo_serial_number_device =
			data[i].photo_serial_number_device;
			const photo_ITAM_device = data[i].photo_ITAM_device;
			updateTableData(
				id,
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
}

getData();

document.getElementById('form1').addEventListener('submit', (e) => {
	e.preventDefault();
	const form = document.getElementById('form1');
	const formData = new FormData(form);
	formData.set('photo_device',num.fileName1);
	formData.set('photo_serial_number_device',num.fileName2);
	formData.set('photo_ITAM_device',num.fileName3);
	fetch('/form', {
		method: 'POST',
		credentials: 'include',
		body: formData
	})
	.then(response => response.json())
	.then(getData)
	.catch(error => console.error(error));
	form.reset();
	document.getElementById('check1').classList.add("visually-hidden");
	document.getElementById('check2').classList.add("visually-hidden");
	document.getElementById('check3').classList.add("visually-hidden");
})

document.getElementById('photo_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName1 = data;}));
document.getElementById('photo_serial_number_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName2 = data;}));
document.getElementById('photo_ITAM_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName3 = data;}));
document.getElementById('exit').addEventListener('click',() => {
	fetch('/exit', {
		method: 'POST',
		credentials: 'include'
	})
	.then(response => response.json())
	.then(()=>{
		window.location.href = '/';
	})
	.catch(error => console.error(error));
});


