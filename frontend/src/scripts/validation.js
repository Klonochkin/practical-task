/**
 * @param {Element} el
 * @param {HTMLParagraphElement} paragraph
 */
export function validityInputUpdate(el, paragraph) {
    let formEl = /** @type {HTMLFormElement} */ (el);
    let tempEl = /** @type {HTMLFormElement} */ (el);
    const isInputValid = formEl.checkValidity();
    el.classList.toggle('is-invalid', !isInputValid);
    paragraph.classList.toggle('visually-hidden', isInputValid);
    if (paragraph && el) {
        /** @type {string | undefined | null} */
        let temp = getValidationMessageForInput(tempEl);
        paragraph.textContent = temp ?? null;
    }
}
/**
 * @param {Element} el
 */
export function validityFileUpdate(el) {
    let formEl = /** @type {HTMLFormElement} */ (el);
    const isInputValid = formEl.checkValidity();
    let message = /** @type {HTMLElement} */ (el?.parentNode?.parentNode);
    message?.classList.toggle('form__field-lable-error', !isInputValid);
}
/**
 * @param {HTMLFormElement} form
 */
export function newValidityForm(form) {
    const elements = form.elements;
    let parentField = elements[0].parentNode;
    let parentForm = parentField?.parentNode;
    /** @type {HTMLParagraphElement[]} */
    let paragraph;
    if (parentForm) paragraph = Array.from(parentForm.querySelectorAll('p'));
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let formEl = /** @type {HTMLFormElement} */ (element);
        const isInputValid = formEl.checkValidity();
        element.classList.toggle('is-invalid', !isInputValid);

        let type = element?.getAttribute('type');
        if (element && (type === 'text' || element.tagName === 'SELECT')) {
            element?.addEventListener('input', () => {
                validityInputUpdate(element, paragraph[i]);
            });
        } else if (element && type === 'file') {
            element?.addEventListener('input', () => {
                validityFileUpdate(element);
            });
        }
    }
}
/**
 * @param {HTMLFormElement} el
 */
function getValidationMessageForInput(el) {
    if (el.validity.valid) return '';
    else if (el.validity.valueMissing) {
        return `Пожалуйста, введите значение (Это поле обязательно для заполнения)`;
    } else if (el.validity.typeMismatch) {
        return 'Пожалуйста, введите действительный адрес электронной почты';
    } else if (el.validity.patternMismatch) {
        return `Пожалуйста, введите значение по соответственному шаблону`;
    } else if (el.validity.tooLong) {
        return `Введенное значение слишком длинное. Максимальная длина: ${el.maxLength}`;
    } else if (el.validity.tooShort) {
        return `Введенное значение слишком короткое. Минимальная длина: ${el.minLength}`;
    } else {
        return 'Ошибка при вводе';
    }
}
