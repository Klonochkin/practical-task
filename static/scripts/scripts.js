import { updateTableData } from '/static/scripts/updateTableData.js';
import { globalData as num } from '/static/scripts/globalData.js';

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
	let input1 = templateText.content.cloneNode(true);
    let number = num.countForm;
    if(number===1){
        input1 = document.getElementById("form1");
        num.countForm+=1;
    }
    else if(number===2){
        input1.getElementById('form-delete').classList.add("visually-hidden");
        input1.getElementById('form-delete').remove();
    }
    else{
        input1.querySelector('form').id= `form${number}` ;
        input1.getElementById('form-delete').addEventListener('click',()=>{
            document.getElementById(`form${number}`).remove();

        })
    }
	let field = input1.querySelector("select");
	let parentField = field.parentNode;
	let parentForm = parentField.parentNode;
	let paragraph = Array.from(parentForm.querySelectorAll("p"));
    let p = Array.from(parentForm.parentNode.querySelectorAll("p"))
    let elements = field.parentNode.parentNode.parentNode.elements
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.addEventListener('blur', ()=>{
            validityField(element,paragraph[i])
        });
    }

	const img = Array.from(parentForm.parentNode.querySelectorAll("img"));
	input1.querySelector('#photo_device_select').addEventListener('input',(event) => {
        let input = event.target;
		if(event.target.files[0]===undefined){
			input.nextElementSibling.classList.add("visually-hidden")
			img[0].classList.add("visually-hidden")
			return;
		}
		const fileSize = event.target.files[0].size;
		const maxSize = 10*1024*1024;
		if (fileSize > maxSize) {

			input.type = 'text';
			input.type = "file";
			input.nextElementSibling.classList.add("visually-hidden")
			p[4].classList.add("form__field-lable-error")
			input.nextElementSibling.classList.add("visually-hidden")
			img[0].classList.add("visually-hidden")
		}
		else{
			p[4].classList.remove("form__field-lable-error")
			input.nextElementSibling.classList.remove("visually-hidden")
			img[0].classList.remove("visually-hidden")
			img[0].src = URL.createObjectURL(event.target.files[0]);
		}
	});
	input1.querySelector('#photo_serial_number_device_select').addEventListener('input',(event) =>{
		const input = event.target;
		if(event.target.files[0]===undefined){
			input.nextElementSibling.classList.add("visually-hidden")
			img[1].classList.add("visually-hidden")
			return;
		}
		const fileSize = event.target.files[0].size;
		const maxSize = 10*1024*1024;
		if (fileSize > maxSize) {
			input.type = 'text';
			input.type = "file";
			input.nextElementSibling.classList.add("visually-hidden")
			p[5].classList.add("form__field-lable-error")
			input.nextElementSibling.classList.add("visually-hidden")
			img[1].classList.add("visually-hidden")
		}
		else{
			p[5].classList.remove("form__field-lable-error")
			input.nextElementSibling.classList.remove("visually-hidden")
			img[1].classList.remove("visually-hidden")
			img[1].src = URL.createObjectURL(event.target.files[0]);
		}
	});
	input1.querySelector('#photo_ITAM_device_select').addEventListener('input',(event) => {
		const input = event.target;
		if(event.target.files[0]===undefined){
			input.nextElementSibling.classList.add("visually-hidden")
			img[2].classList.add("visually-hidden")
			return;
		}

		const fileSize = event.target.files[0].size;
		const maxSize = 10*1024*1024;
		if (fileSize > maxSize) {
			input.type = 'text';
			input.type = "file";
			input.nextElementSibling.classList.add("visually-hidden")
			p[6].classList.add("form__field-lable-error")
			input.nextElementSibling.classList.add("visually-hidden")
			img[2].classList.add("visually-hidden")
		}
		else{
			p[6].classList.remove("form__field-lable-error")
			input.nextElementSibling.classList.remove("visually-hidden")
			img[2].classList.remove("visually-hidden")
			img[2].src = URL.createObjectURL(event.target.files[0]);
		}
	});

	templateForms.append(input1);
	num.countForm +=1;
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
                const invalidFields = form.querySelectorAll(':invalid');
                invalidFields[0].focus();
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

        element.addEventListener('input', validityField(element,paragraph[i]));

      }
}

function validityField(el,paragraph){
    const isInputValid = el.checkValidity();
    if(el.type === "text" || el.type === "select-one"){
        el.classList.toggle('is-invalid', !isInputValid);
        paragraph.classList.toggle('visually-hidden', isInputValid);
        paragraph.textContent = getValidationMessageForInput(el);
    }
    else if(el.type === "file"){
        el.addEventListener('input', ()=>{
            let message = el.parentNode.parentNode;
            message.classList.toggle('form__field-lable-error', isInputValid);
        });
    }
}
function getValidationMessageForInput(el){

    if (el.validity.valid) return '';

    if (el.validity.valueMissing) {
        return `Пожалуйста, введите ${el.name} (Это поле обязательно для заполнения)`;
    }
    if (el.validity.typeMismatch) {
        return 'Пожалуйста, введите действительный адрес электронной почты';
    }
    if(el.validity.patternMismatch){
        return `Пожалуйста, введите значение по соответственному шаблону: ${el.pattern}`
    }
    if(el.validity.tooLong){
        return `Введенное значение слишком длинное. Максимальная длина: ${el.maxLength}`
    }
    if(el.validity.tooShort){
        return `Введенное значение слишком короткое. Минимальная длина: ${el.minLength}`
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
