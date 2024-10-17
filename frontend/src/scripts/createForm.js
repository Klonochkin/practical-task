import { globaldata as num } from './globalData.js';

import { validityInputUpdate, validityFileUpdate } from './validation.js';

export function createForm(isDialog = false) {
    let divWithForms;
    /** @type {number} */
    let number;
    /** @type {HTMLTemplateElement | null} */
    const templateWithForm = document.querySelector('#template-form');

    /** @typedef {Element | undefined | HTMLElement | null} TemplateNode */
    /** @type {TemplateNode} */

    let templateCloneNode;
    templateCloneNode = /** @type {TemplateNode} */ (
        templateWithForm?.content.cloneNode(true)
    );
    if (!isDialog) {
        divWithForms = document.getElementById('forms');

        templateCloneNode
            ?.querySelector('#cross')
            ?.classList.add('form__cross');
        number = num.countForm;
        num.countForm += 1;
    } else {
        divWithForms = document.getElementById('dialog_content');
        number = 152;
        document.querySelector('body')?.classList.add('body__scroll-lock');
        templateCloneNode
            ?.querySelector('#photo_device_select')
            ?.removeAttribute('required');
        templateCloneNode
            ?.querySelector('#photo_serial_number_device_select')
            ?.removeAttribute('required');
        templateCloneNode
            ?.querySelector('#photo_ITAM_device_select')
            ?.removeAttribute('required');
        templateCloneNode
            ?.querySelector('#cross')
            ?.classList.add('dialog__cross');
    }
    if (number === 1) {
        templateCloneNode = /** @type {HTMLElement | null} */ (
            document.getElementById('form1')
        );
        num.countForm += 1;
    } else if (number === 2) {
        templateCloneNode
            ?.querySelector('#dialog_cross')
            ?.classList.add('visually-hidden');
        templateCloneNode?.querySelector('#submit_dialog')?.remove();
        templateCloneNode?.querySelector('#cross')?.remove();
    } else if (number === 152) {
        templateCloneNode?.querySelector('form')?.classList.add('form__dialog');
        templateCloneNode?.querySelector('#dialog_cross')?.remove();
        templateCloneNode
            ?.querySelector('#submit_dialog')
            ?.classList.remove('visually-hidden');
        const formElement = templateCloneNode?.querySelector('form');
        if (formElement) {
            formElement.id = 'form_dialog';
        }
    } else {
        const formElement = templateCloneNode?.querySelector('form');
        if (formElement) {
            formElement.id = `form${number}`;
            templateCloneNode = /** @type {TemplateNode} */ (
                formElement.parentNode
            );
        }
        templateCloneNode
            ?.querySelector('#dialog_cross')
            ?.addEventListener('click', () => {
                document.getElementById(`form${number}`)?.remove();
            });
    }
    /** @type {HTMLElement | HTMLFormElement | undefined | null} */
    let field = templateCloneNode?.querySelector('select');
    let parentField = field?.parentNode;
    let parentForm = parentField?.parentNode;
    /** @type {HTMLParagraphElement[]} */
    let paragraph;
    if (parentForm) {
        paragraph = Array.from(parentForm.querySelectorAll('p'));
    }
    /** @type {HTMLParagraphElement[]} */
    let p;
    if (parentForm?.parentNode) {
        p = Array.from(parentForm.parentNode.querySelectorAll('p'));
    }
    /** @type {HTMLFormControlsCollection | null | undefined} */
    let element123 = null;

    let temp = /** @type {HTMLFormElement | null | undefined} */ (
        field?.parentNode?.parentNode?.parentNode
    );
    if (temp) {
        element123 = temp.elements;
    }

    /** @type {number | undefined | null} */
    let count = element123?.length;
    if (count && number !== 1 && number !== 2 && number !== 152) {
        count--;
    }
    if (count) {
        for (let i = 0; i < count; i++) {
            /** @type {HTMLElement | undefined} */
            let element;
            if (element123) {
                element = /** @type {HTMLInputElement | undefined} */ (
                    element123[i]
                );
            }
            if (element123 && number !== 1 && number !== 2 && number !== 152) {
                element = /** @type {HTMLInputElement | undefined} */ (
                    element123[i + 1]
                );
            } else if (element123) {
                element = /** @type {HTMLInputElement | undefined} */ (
                    element123[i]
                );
            }
            let type = element?.getAttribute('type');
            if (element && (type === 'text' || element.tagName === 'SELECT')) {
                element.addEventListener('blur', () => {
                    validityInputUpdate(element, paragraph[i]);
                });
            } else if (element && type === 'file') {
                element.addEventListener('input', () => {
                    validityFileUpdate(element);
                });
            }
        }
    }
    /** @type {HTMLImageElement[]} */
    let img;
    if (parentForm?.parentNode) {
        img = Array.from(parentForm.parentNode.querySelectorAll('img'));
    }

    templateCloneNode
        ?.querySelector('#photo_device_select')
        ?.addEventListener('input', (event) => {
            let input = /** @type {HTMLInputElement | null} */ (event.target);
            if (
                input?.files &&
                (input?.files[0] === undefined || input?.files[0] === null)
            ) {
                input?.nextElementSibling?.classList.add('visually-hidden');
                img[0].classList.add('visually-hidden');
                return;
            }
            /** @type {File | null | undefined} */
            const file = input?.files && input.files[0];
            const fileSize = file?.size;
            const maxSize = 10 * 1024 * 1024;
            if (fileSize && fileSize > maxSize) {
                if (input) {
                    input.type = 'text';
                }
                if (input) {
                    input.type = 'file';
                }
                input?.nextElementSibling?.classList.add('visually-hidden');
                p[4].classList.add('form__field-lable-error');
                input?.nextElementSibling?.classList.add('visually-hidden');
                img[0].classList.add('visually-hidden');
            } else {
                p[4].classList.remove('form__field-lable-error');
                input?.nextElementSibling?.classList.remove('visually-hidden');
                img[0].classList.remove('visually-hidden');
                if (file) {
                    img[0].src = URL.createObjectURL(file);
                }
            }
        });
    templateCloneNode
        ?.querySelector('#photo_serial_number_device_select')
        ?.addEventListener('input', (event) => {
            let input = /** @type {HTMLInputElement | null} */ (event.target);
            if (
                input?.files &&
                (input?.files[0] === undefined || input?.files[0] === null)
            ) {
                input?.nextElementSibling?.classList.add('visually-hidden');
                img[1].classList.add('visually-hidden');
                return;
            }
            /** @type {File | null | undefined} */
            const file = input?.files && input.files[0];
            const fileSize = file?.size;
            const maxSize = 10 * 1024 * 1024;
            if (fileSize && fileSize > maxSize) {
                if (input) {
                    input.type = 'text';
                }
                if (input) {
                    input.type = 'file';
                }
                input?.nextElementSibling?.classList.add('visually-hidden');
                p[5].classList.add('form__field-lable-error');
                input?.nextElementSibling?.classList.add('visually-hidden');
                img[1].classList.add('visually-hidden');
            } else {
                p[5].classList.remove('form__field-lable-error');
                input?.nextElementSibling?.classList.remove('visually-hidden');
                img[1].classList.remove('visually-hidden');
                if (file) {
                    img[1].src = URL.createObjectURL(file);
                }
            }
        });
    templateCloneNode
        ?.querySelector('#photo_ITAM_device_select')
        ?.addEventListener('input', (event) => {
            let input = /** @type {HTMLInputElement | null} */ (event.target);
            if (
                input?.files &&
                (input?.files[0] === undefined || input?.files[0] === null)
            ) {
                input?.nextElementSibling?.classList.add('visually-hidden');
                img[2].classList.add('visually-hidden');
                return;
            }
            /** @type {File | null | undefined} */
            const file = input?.files && input.files[0];
            const fileSize = file?.size;
            const maxSize = 10 * 1024 * 1024;
            if (fileSize && fileSize > maxSize) {
                if (input) {
                    input.type = 'text';
                }
                if (input) {
                    input.type = 'file';
                }
                input?.nextElementSibling?.classList.add('visually-hidden');
                p[6].classList.add('form__field-lable-error');
                input?.nextElementSibling?.classList.add('visually-hidden');
                img[2].classList.add('visually-hidden');
            } else {
                p[6].classList.remove('form__field-lable-error');
                input?.nextElementSibling?.classList.remove('visually-hidden');
                img[2].classList.remove('visually-hidden');
                if (file) {
                    img[2].src = URL.createObjectURL(file);
                }
            }
        });
    if (templateCloneNode) {
        divWithForms?.append(templateCloneNode);
    }
}
