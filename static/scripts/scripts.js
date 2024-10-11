import { globalData as num } from '/static/scripts/globalData.js';
import { createForm } from '/static/scripts/createForm.js';
import { validityInputUpdate,validityFileUpdate } from '/static/scripts/validation.js';
import {addNotification,removeNotification} from '/static/scripts/notifications.js';
import {checkResponse} from '/static/scripts/response.js';
import {getData} from '/static/scripts/getData.js';
const NOTIFICATION_TYPES = {
	WARNING: 'warning',
	SUCCESS: 'success',
    ERROR: 'error',
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

    let isConnectionLoss = false;
    let promise = []
	for(let i=0;i<forms.length;i++){
		let form = forms[i];
        if (form.checkValidity()) {

            const formData = new FormData(form);
            promise.push(fetch('/form', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            .then(response => {
                checkResponse(response);
                if(response.ok){
                    const warning = addNotification("Успешно",NOTIFICATION_TYPES.SUCCESS, 'Данные сохранены');
                    setTimeout(() => {
                        removeNotification(warning);
                    }, 4000);
                }
            })
            .catch(() => {
                isConnectionLoss = true;
                const warning = addNotification("Ошибка",NOTIFICATION_TYPES.ERROR, 'Попробуйте позже');
                setTimeout(() => {
                    removeNotification(warning);
                }, 4000);
            }));
        }
	}
    Promise.all(promise)
    .then(()=>{
        if(!isConnectionLoss){
            getData();
            num.countForm=2;
            document.getElementById("forms").textContent = '';
            createForm();
        }
    })
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

