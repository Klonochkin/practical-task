import { editTableData } from './editTableData.js';

import { deleteTableData } from './deleteTableData.js';
/**
 * @param {number} number
 * @param {string} type_device
 * @param {string} model_device
 * @param {string} serial_number_device
 * @param {string} ITAM_device
 * @param {File} photo_device
 * @param {File} photo_serial_number_device
 * @param {File} photo_ITAM_device
 */
export function updateTableData(
    number,
    type_device,
    model_device,
    serial_number_device,
    ITAM_device,
    photo_device,
    photo_serial_number_device,
    photo_ITAM_device,
) {
    const table = document
        .getElementById('table_device')
        ?.getElementsByTagName('tbody')[0];
    const newRow = table?.insertRow();
    const ceil1 = newRow?.insertCell(0);
    const ceil2 = newRow?.insertCell(1);
    const ceil3 = newRow?.insertCell(2);
    const ceil4 = newRow?.insertCell(3);
    const ceil5 = newRow?.insertCell(4);
    const ceil6 = newRow?.insertCell(5);
    const ceil7 = newRow?.insertCell(6);
    const ceil8 = newRow?.insertCell(7);
    const ceil9 = newRow?.insertCell(8);
    const ceil10 = newRow?.insertCell(9);
    if (ceil1) ceil1.textContent = number.toString();
    if (ceil2) ceil2.textContent = type_device;
    if (ceil3) ceil3.textContent = model_device;
    if (ceil4) ceil4.textContent = serial_number_device;
    if (ceil5) ceil5.textContent = ITAM_device;
    /** @type {HTMLTemplateElement | null} */
    const templateText = document.querySelector('#template-img');

    if (ceil6) ceil6.textContent = '';
    let input1 = /** @type {HTMLImageElement | null | undefined} */ (
        templateText?.content.cloneNode(true)
    );

    let Image1 = /** @type {HTMLImageElement | null | undefined} */ (
        input1?.querySelector('img')
    );
    if (Image1) {
        Image1.src = `api/${photo_device}/150`;
        Image1.alt = '';
        input1 = /** @type {HTMLImageElement | null | undefined} */ (
            Image1?.parentNode
        );
    }
    if (ceil6 && input1) ceil6.append(input1);

    if (ceil7) ceil7.textContent = '';
    let input2 = /** @type {HTMLImageElement | null | undefined} */ (
        templateText?.content.cloneNode(true)
    );

    let Image2 = /** @type {HTMLImageElement | null | undefined} */ (
        input2?.querySelector('img')
    );
    if (Image2) {
        Image2.src = `api/${photo_serial_number_device}/150`;
        Image2.alt = '';
        input2 = /** @type {HTMLImageElement | null | undefined} */ (
            Image2?.parentNode
        );
    }
    if (ceil7 && input2) ceil7.append(input2);

    //

    if (ceil8) ceil8.textContent = '';

    if (ceil8) ceil8.textContent = '';
    let input3 = /** @type {HTMLImageElement | null | undefined} */ (
        templateText?.content.cloneNode(true)
    );

    let Image3 = /** @type {HTMLImageElement | null | undefined} */ (
        input3?.querySelector('img')
    );
    if (Image3) {
        Image3.src = `api/${photo_ITAM_device}/150`;
        Image3.alt = '';
        input2 = /** @type {HTMLImageElement | null | undefined} */ (
            Image3?.parentNode
        );
    }
    if (ceil8 && input3) ceil8.append(input3);

    //

    /** @type {HTMLTemplateElement | null} */
    const template = document.querySelector('#template__table-button');

    if (ceil9) {
        ceil9.textContent = '';
    }
    let buttonDelete = /** @type {Element | null | undefined} */ (
        template?.content.cloneNode(true)
    );

    const deleteCloneNode = buttonDelete?.querySelector('button');
    if (deleteCloneNode) {
        deleteCloneNode.id = `delete${number}`;
        deleteCloneNode.value = 'Удалить';
        deleteCloneNode.textContent = 'Удалить';
        buttonDelete = /** @type {Element | null | undefined} */ (
            deleteCloneNode.parentNode
        );
    }

    buttonDelete?.querySelector('button')?.addEventListener('click', () => {
        deleteTableData(number);
    });

    if (ceil9 && buttonDelete) ceil9.append(buttonDelete);

    if (ceil10) ceil10.textContent = '';
    let buttonEdit = /** @type {Element | null | undefined} */ (
        template?.content.cloneNode(true)
    );
    const addCloneNode = buttonEdit?.querySelector('button');
    if (addCloneNode) {
        addCloneNode.id = `add${number}`;
        addCloneNode.value = 'Изменить';
        addCloneNode.textContent = 'Изменить';
        addCloneNode.addEventListener('click', () => {
            editTableData(number);
            let dialog = document.getElementById('edit_dialog');

            dialog?.addEventListener('close', () => {
                let f;
                if (document.getElementById('dialog_content'))
                    f = document.getElementById('dialog_content');
                if (f) {
                    f.textContent = '';
                    f.textContent = 'Изменить';
                    // buttonEdit.querySelector('button').value = 'Изменить';
                }
                document
                    ?.querySelector('body')
                    ?.classList.remove('body__scroll-lock');
            });

            dialog?.addEventListener('click', closeOnBackDropClick);
        });
    }
    buttonEdit = /** @type {Element | null | undefined} */ (
        addCloneNode?.parentNode
    );
    if (ceil10 && buttonEdit) ceil10.append(buttonEdit);
}
/**
 * @param {Event} currentTarget
 */
function closeOnBackDropClick({ currentTarget, target }) {
    const dialogElement = currentTarget;
    const isClickedOnBackDrop = target === dialogElement;
    if (isClickedOnBackDrop && dialogElement instanceof HTMLDialogElement) {
        dialogElement?.close();
    }
}
