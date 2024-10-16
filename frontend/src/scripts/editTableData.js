import { globaldata as num } from './globalData.js';
import { createForm } from './createForm.js';
import { saveTableData } from './saveTableData.js';
/**
 * @param {number} numId
 */
export function editTableData(numId) {

    let dialog = document.getElementById('dialog_content');
    createForm(true);
    /** @type {HTMLTableElement | null} */
    const table = document.querySelector('#table_device');
    /** @type {HTMLTableRowElement | null | undefined} */
    const row = table?.rows[numId];
    /** @type {string | undefined} */
    let defaultValue3;
    /** @type {string | undefined} */
    let defaultValue4;
    /** @type {string | undefined} */
    let defaultValue5;
    if (row) num.defaultValue2 = row.cells[1].innerHTML;
    if (row) defaultValue3 = row.cells[2].innerHTML;
    if (row) defaultValue4 = row.cells[3].innerHTML;
    if (row) defaultValue5 = row.cells[4].innerHTML;
    const elements = dialog
        ?.querySelector('select')
        ?.querySelectorAll('option');
    elements?.forEach((element) => {
        if (element.value === num.defaultValue2) {
            element.selected = true;
		}
	});
    /** @type {HTMLInputElement | null | undefined} */
    let asd = dialog?.querySelector('#model_device_select');
    if (asd && defaultValue3) asd.value = defaultValue3;

    /** @type {HTMLInputElement | null | undefined} */
    let asd2 = dialog?.querySelector('#serial_number_device_select');
    if (asd2 && defaultValue4) asd2.value = defaultValue4;

    /** @type {HTMLInputElement | null | undefined} */
    let asd3 = dialog?.querySelector('#ITAM_device_select');
    if (asd3 && defaultValue5) asd3.value = defaultValue5;
    let photo_device = dialog?.querySelector('#img_photo_device');
    let photo_serial = dialog?.querySelector('#img_photo_serial');
    let photo_ITAM = dialog?.querySelector('#img_photo_ITAM');

    photo_device?.classList.remove('visually-hidden');
    if (row?.cells[5]?.querySelector('img')) {
        /** @type {string | null | undefined} */
        let pathToImage = row.cells[5]
            .querySelector('img')
            ?.getAttribute('src');
        if (pathToImage) {
            photo_device?.setAttribute('src', pathToImage);
        }
    }
    photo_serial?.classList.remove('visually-hidden');
    if (row?.cells[6]?.querySelector('img')) {
        /** @type {string | null | undefined} */
        let pathToImage = row.cells[6]
            .querySelector('img')
            ?.getAttribute('src');
        if (pathToImage) {
            photo_serial?.setAttribute('src', pathToImage);
        }
    }
    photo_ITAM?.classList.remove('visually-hidden');
    if (row?.cells[7]?.querySelector('img')) {
        /** @type {string | null | undefined} */
        let pathToImage = row.cells[7]
            .querySelector('img')
            ?.getAttribute('src');
        if (pathToImage) {
            photo_ITAM?.setAttribute('src', pathToImage);
        }
    }

    /** @type {HTMLFormElement | null} */
    let editDialog = document.querySelector('#edit_dialog');
    editDialog?.showModal();
    dialog?.querySelector('#submit_dialog')?.addEventListener('click', () => {
        saveTableData(numId);
    });
    let buttons = document.querySelectorAll('#dialog_cross');
    buttons[buttons.length - 1].addEventListener('click', () => {
        editDialog?.close();
    });
}
