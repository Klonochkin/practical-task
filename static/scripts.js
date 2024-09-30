import { updateTableData } from '/static/updateTableData.js';
import { globalData as num } from '/static/globalData.js';
import {saveFile} from '/static/saveFile.js';
import {deleteFile} from '/static/deleteFile.js';


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

function createFirstForm(){
	let templateForms = document.getElementById("forms");
	const templateText = document.querySelector('#template-form');
	const input1 = templateText.content.cloneNode(true);
	input1.querySelector('form').id= `form1` ;
	input1.getElementById('form-delete').classList.add("visually-hidden");
	templateForms.append(input1);
	document.getElementById('photo_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		if(num.fileName1[1]!=""){
			deleteFile(num.fileName1[1]);
		}
		num.fileName1[1]=data;
	}));
	document.getElementById('photo_serial_number_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		if(num.fileName2[1]!=""){
			deleteFile(num.fileName2[1]);
		}
		num.fileName2[1]=data;
	}));
	document.getElementById('photo_ITAM_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		if(num.fileName3[1]!=""){
			deleteFile(num.fileName3[1]);
		}
		num.fileName3[1]=data;
	}));
}

createFirstForm();

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
	let templateForms = document.getElementById("forms");
	const templateText = document.querySelector('#template-form');
	const input1 = templateText.content.cloneNode(true);
	let number = num.countForm;
	num.fileName1.push("");
	num.fileName2.push("");
	num.fileName3.push("");
	input1.querySelector('form').id= `form${number}` ;
	input1.getElementById('photo_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		if(num.fileName1[number]!=""){
			deleteFile(num.fileName1[number]);
		}
		num.fileName1[number]=data;
	}));
	input1.getElementById('photo_serial_number_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		if(num.fileName2[number]!=""){
			deleteFile(num.fileName2[number]);
		}
		num.fileName2[number]=data;
	}));
	input1.getElementById('photo_ITAM_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		if(num.fileName3[number]!=""){
			deleteFile(num.fileName3[number]);
		}
		num.fileName3[number]=data;
	}));

	input1.getElementById('form-delete').addEventListener('click',()=>{

		num.fileName1[number]="none";
		num.fileName2[number]="none";
		num.fileName3[number]="none";
		document.getElementById(`form${number}`).remove();

	})

	templateForms.append(input1);
	num.countForm +=1;
	num.numberForm+=1;

})

document.getElementById("submit").addEventListener('click',()=>{

	for(let i=0;i<num.fileName1.length-1;i++){
		if(num.fileName1[i+1]!="none"){
			let form = document.getElementById(`form${i+1}`);
			if (!(form.checkValidity())) {
				alert("Не все поля формы заполнены")
				return;
			}
		}
	}

	for(let i=0;i<num.fileName1.length-1;i++){
		if(num.fileName1[i+1]!="none"){
			let form = document.getElementById(`form${i+1}`);
			if (form.checkValidity()) {

				const formData = new FormData(form);

				formData.set('photo_device',num.fileName1[i+1]);
				formData.set('photo_serial_number_device',num.fileName2[i+1]);
				formData.set('photo_ITAM_device',num.fileName3[i+1]);

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
	}

	num.fileName1.length=2;
	num.fileName2.length=2;
	num.fileName3.length=2;

	num.fileName1[1]="";
	num.fileName2[1]="";
	num.fileName3[1]="";

	num.countForm=2;

	document.getElementById("forms").textContent = '';

	createFirstForm();
})
