import { updateTableData } from '/static/scripts/updateTableData.js';
import { globalData as num } from '/static/scripts/globalData.js';
import { createForm } from '/static/scripts/createForm.js';
import { validityInputUpdate,validityFileUpdate } from '/static/scripts/validation.js';

import {addNotification,removeNotification} from '/static/scripts/notifications.js';

const NOTIFICATION_TYPES = {
	WARNING: 'warning',
	SUCCESS: 'success',
}



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
			const photo_serial_number_device = data[i].photo_serial_number_device;
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

createForm();

getData();

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


document.getElementById("form-add").addEventListener('click',()=>{
	createForm();
})

document.getElementById("submit").addEventListener('click',()=>{
    let forms = document.querySelectorAll("form");
	for(let i=0;i<forms.length;i++){
		let form = forms[i]
            newValidityForm(form)
			if(!(form.checkValidity())){
                const firstInvalidInputEl = form.querySelector(':invalid');
                firstInvalidInputEl?.focus();
				return;
			}
	}

	for(let i=0;i<forms.length;i++){
		let form = forms[i]

			if (form.checkValidity()) {

				const formData = new FormData(form);
				fetch('/form', {
					method: 'POST',
					credentials: 'include',
					body: formData
				})
				.then(response => response.json())
				.then(getData)
				.catch(error => console.error(error));
			}
	}

    setTimeout(() => {
        const warning = addNotification("Успешно",NOTIFICATION_TYPES.SUCCESS, 'Данные сохранены');
        setTimeout(() => {
            removeNotification(warning);
        }, 2000);
    }, 1);

	num.countForm=2;

	document.getElementById("forms").textContent = '';

	createForm();
})

function newValidityForm(form){
    const elements = form.elements;
    let parentField = elements[0].parentNode;
    let parentForm = parentField.parentNode;
    let paragraph = Array.from(parentForm.querySelectorAll("p"));
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        const isInputValid = element.checkValidity();
        element.classList.toggle('is-invalid', !isInputValid);

        if(element.type === "text" || element.type === "select-one"){
            element.addEventListener('input', validityInputUpdate(element,paragraph[i]));
        }
        else if(element.type === "file"){
            element.addEventListener('input', validityFileUpdate(element));
        }

      }
}

document.getElementById("export").addEventListener('click',()=>{
    fetch('/export',{
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
      });

})
