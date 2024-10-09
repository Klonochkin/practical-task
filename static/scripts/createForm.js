import {globalData as num} from '/static/scripts/globalData.js';

import { validityInputUpdate,validityFileUpdate } from '/static/scripts/validation.js';

export function createForm(isDialog = false){
    let templateForms;
    let number;
    const templateText = document.querySelector('#template-form');
	let input1 = templateText.content.cloneNode(true);
    if(!isDialog){
        templateForms = document.getElementById("forms");
        number = num.countForm;
        num.countForm+=1;
    }
    else{
        templateForms = document.getElementById('edit_dialog')
        number = 152;
        input1.querySelector("#photo_device_select").removeAttribute('required')
        input1.querySelector("#photo_serial_number_device_select").removeAttribute('required')
        input1.querySelector("#photo_ITAM_device_select").removeAttribute('required')
    }
    if(number===1){
        input1 = document.getElementById("form1");
        num.countForm+=1;
    }
    else if(number===2){
        input1.getElementById('form-delete').classList.add("visually-hidden");
        input1.getElementById('form-delete').remove();
    }
    else if(number===152){
        input1.getElementById('form-delete').classList.add("visually-hidden");
        input1.getElementById('form-delete').remove();
        input1.getElementById('submit_dialog').classList.remove("visually-hidden");
        input1.getElementById('delete_dialog').classList.remove("visually-hidden");
        input1.querySelector('form').id= `form_dialog` ;
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
        if(element.type === "text" || element.type === "select-one"){
            element.addEventListener('blur', ()=>{
                validityInputUpdate(element,paragraph[i])
            });
        }
        else if(element.type === "file"){
            element.addEventListener('input', ()=>{
                validityFileUpdate(element)
            });
        }
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
}
