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

function createForm(){
	let templateForms = document.getElementById("forms");
	const templateText = document.querySelector('#template-form');
	const input1 = templateText.content.cloneNode(true);
	let number = num.countForm;
	num.fileName1.push("");
	num.fileName2.push("");
	num.fileName3.push("");
	if(number===1){
		input1.getElementById('form-delete').classList.add("visually-hidden");
	}
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
		if(num.fileName1[number]!=""){
			deleteFile(num.fileName1[number]);
		}
		if(num.fileName2[number]!=""){
			deleteFile(num.fileName2[number]);
		}
		if(num.fileName3[number]!=""){
			deleteFile(num.fileName3[number]);
		}
		num.fileName1[number]=null;
		num.fileName2[number]=null;
		num.fileName3[number]=null;
		document.getElementById(`form${number}`).remove();

	})
	let field = input1.querySelector("select");
	let parentField = field.parentNode;
	let parentForm = parentField.parentNode;
	let paragraph = Array.from(parentForm.querySelectorAll("p"));
	console.log(paragraph);
	field.addEventListener('blur', ()=>{
		validitySelect(field,paragraph[0]);
	})
	field.addEventListener('focus',()=>{
		field.classList.remove("form__field-input-error");
		parentField.classList.remove("form__field-lable-error");
	})
	let fieldInput = Array.from(input1.querySelectorAll("input"));
	for(let i=0;i<fieldInput.length;i++){
		if(fieldInput[i].type==="text"){
			let fieldInputValue = fieldInput[i];
			let parentField = fieldInputValue.parentNode;
			fieldInputValue.addEventListener('blur', ()=>{
				validitySelect(fieldInputValue,paragraph[i+1])
			})
			fieldInputValue.addEventListener('focus',()=>{
				fieldInputValue.classList.remove("form__field-input-error");
				parentField.classList.remove("form__field-lable-error");
			})
		}
		if(fieldInput[i].type==="file"){
			let input = fieldInput[i]
			input.addEventListener('input', ()=>{
				let parentField = input.parentNode.parentNode;
				if(!input.value){
					parentField.classList.add("form__field-lable-error");
					input.classList.add("form__field-input-error");
					input.addEventListener('input', ()=>{
						parentField.classList.remove("form__field-lable-error");
					})
				}else{
					parentField.classList.remove("form__field-lable-error");
				}
			})
		}
	}
	templateForms.append(input1);
	num.countForm +=1;
	num.numberForm+=1;
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

	for(let i=0;i<num.fileName1.length-1;i++){
		if(num.fileName1[i+1]!==null){
			let form = document.getElementById(`form${i+1}`);
			validityForm(form)

			if(!(form.checkValidity())){
				return;
			}
		}
	}

	for(let i=0;i<num.fileName1.length-1;i++){
		if(num.fileName1[i+1]!==null){
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

	num.fileName1.length=1;
	num.fileName2.length=1;
	num.fileName3.length=1;

	num.countForm=1;

	document.getElementById("forms").textContent = '';

	createForm();
})

function validityForm(form){

	let fieldSelect = form.querySelector("select");
	let parentField = fieldSelect.parentNode;
	let parentForm = parentField.parentNode;
	let paragraph = Array.from(parentForm.querySelectorAll("p"));
	if(!fieldSelect.value){
		validitySelect(fieldSelect,paragraph[0])
	}
	let fieldInput = Array.from(form.querySelectorAll("input"));
	for(let i=0;i<fieldInput.length;i++){
		if(fieldInput[i].type==="text"){
			validitySelect(fieldInput[i],paragraph[i+1])
		}
		if(fieldInput[i].type==="file"){
			validityFile(fieldInput[i])
		}
	}
}

function validitySelect(field,paragraph){
	let parentField = field.parentNode;

	console.log(paragraph)
	if(!field.value){
		field.classList.add("form__field-input-error");
		parentField.classList.add("form__field-lable-error");
		paragraph.classList.remove("visually-hidden")
		field.addEventListener('input', ()=>{
			parentField.classList.remove("form__field-lable-error");
			field.classList.remove("form__field-input-error");
			paragraph.classList.add("visually-hidden")
		})
	}else{
		field.classList.remove("form__field-input-error");
		parentField.classList.remove("form__field-lable-error");
		paragraph.classList.add("visually-hidden")
	}
}
function validityFile(input){
	let parentField = input.parentNode.parentNode;
	if(!input.value){
		parentField.classList.add("form__field-lable-error");
		input.classList.add("form__field-input-error");
		input.addEventListener('input', ()=>{
			parentField.classList.remove("form__field-lable-error");
		})
	}else{
		parentField.classList.remove("form__field-lable-error");
	}
}

