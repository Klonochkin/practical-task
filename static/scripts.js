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

document.getElementById('photo_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName1.add(data);}));
document.getElementById('photo_serial_number_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName2.add(data);}));
document.getElementById('photo_ITAM_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName3.add(data);}));
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
	let number = num.numberForm;
	input1.querySelector('form').id= `button${number}` ;
	input1.getElementById('photo_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		num.fileName1.add(data);
	}));
	input1.getElementById('photo_serial_number_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		num.fileName2.add(data);
	}));
	input1.getElementById('photo_ITAM_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
		num.fileName3.add(data);
	}));
	templateForms.append(input1);
	num.countForm +=1;
	num.numberForm+=1;
	if(num.numberForm!=0){
		document.getElementById("form-delete").classList.remove("visually-hidden")
	}
})

document.getElementById("form-delete").addEventListener('click',()=>{
	if(num.numberForm!=0){
		let number = num.numberForm -1;
		let count1 = num.fileName1.size;
		let count2 = num.fileName2.size;
		let count3 = num.fileName3.size;
		document.getElementById(`button${number}`).remove();
		const path1 = Array.from(num.fileName1);
		num.fileName1.delete(path1[count1]);
		const path2 = Array.from(num.fileName2);
		num.fileName2.delete(path2[count2]);
		const path3 = Array.from(num.fileName3);
		num.fileName3.delete(path3[count3]);
		num.countForm -=1;
		num.numberForm -=1;
		if(num.numberForm==0){
			document.getElementById("form-delete").classList.add("visually-hidden")
		}
	}
})

document.getElementById("submit").addEventListener('click',()=>{
	let forms = document.querySelectorAll('form');
	console.log(num.fileName1.size)
	for(let i=0;i<forms.length;i++){
		let el = forms[i];
		console.log(el);
		const formData = new FormData(el);
		if(formData.get('type_device')===null){
			forms[i].querySelector('#error1').classList.add("form__error-submit")
			return;
		}
		else{
			forms[i].querySelector('#error1').classList.remove("form__error-submit")
		}
		if(formData.get('model_device')===""){
			forms[i].querySelector('#error2').classList.add("form__error-submit")
			return;
		}
		else{
			forms[i].querySelector('#error2').classList.remove("form__error-submit")
		}
		if(formData.get('serial_number')===""){
			forms[i].querySelector('#error3').classList.add("form__error-submit")
			return;
		}
		else{
			forms[i].querySelector('#error3').classList.remove("form__error-submit")
		}
		if(formData.get('ITAM_device')===""){
			forms[i].querySelector('#error4').classList.add("form__error-submit")
			return;
		}
		else{
			forms[i].querySelector('#error4').classList.remove("form__error-submit")
		}
		if(formData.get('photo_device').name===""){
			forms[i].querySelector('#error5').classList.add("form__error-submit")
			return;
		}
		else{
			forms[i].querySelector('#error5').classList.remove("form__error-submit")
		}
		if(formData.get('photo_serial_number_device').name===""){
			forms[i].querySelector('#error6').classList.add("form__error-submit")
			return;
		}
		else{
			forms[i].querySelector('#error6').classList.remove("form__error-submit")
		}
		if(formData.get('photo_ITAM_device').name===""){
			forms[i].querySelector('#error7').classList.add("form__error-submit")
			return;
		}
		else{
			forms[i].querySelector('#error7').classList.remove("form__error-submit")
		}
	}
	for(let i=0;i<forms.length;i++){
		let el = forms[i];
		console.log(el);
		const formData = new FormData(el);
		const path1 = Array.from(num.fileName1);
		const path2 = Array.from(num.fileName2);
		const path3 = Array.from(num.fileName3);
		formData.set('photo_device',path1[i]);
		formData.set('photo_serial_number_device',path2[i]);
		formData.set('photo_ITAM_device',path3[i]);
		fetch('/form', {
			method: 'POST',
			credentials: 'include',
			body: formData
		})
		.then(response => response.json())
		.then(getData)
		.catch(error => console.error(error));
		el.reset();
		document.getElementById('check1').classList.add("visually-hidden");
		document.getElementById('check2').classList.add("visually-hidden");
		document.getElementById('check3').classList.add("visually-hidden");
	}
	document.getElementById("forms").textContent = '';
})
