export function validityInputUpdate(el,paragraph){
    const isInputValid = el.checkValidity();
    el.classList.toggle('is-invalid', !isInputValid);
    paragraph.classList.toggle('visually-hidden', isInputValid);
    paragraph.textContent = getValidationMessageForInput(el);
}
export function validityFileUpdate(el){
    const isInputValid = el.checkValidity();
    let message = el.parentNode.parentNode;
    message.classList.toggle('form__field-lable-error', !isInputValid);
}
export function newValidityForm(form){
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
function getValidationMessageForInput(el){

    if (el.validity.valid) return '';

    if (el.validity.valueMissing) {
        return `Пожалуйста, введите значение (Это поле обязательно для заполнения)`;
    }
    if (el.validity.typeMismatch) {
        return 'Пожалуйста, введите действительный адрес электронной почты';
    }
    if(el.validity.patternMismatch){
        return `Пожалуйста, введите значение по соответственному шаблону`
    }
    if(el.validity.tooLong){
        return `Введенное значение слишком длинное. Максимальная длина: ${el.maxLength}`
    }
    if(el.validity.tooShort){
        return `Введенное значение слишком короткое. Минимальная длина: ${el.minLength}`
    }
}


