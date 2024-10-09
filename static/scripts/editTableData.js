import {globalData as num} from '/static/scripts/globalData.js';

import { createForm } from '/static/scripts/createForm.js';

import {saveTableData} from '/static/scripts/saveTableData.js';

export function editTableData(numId) {

    let dialog = document.getElementById('edit_dialog');
    createForm(true);
    const table = document.getElementById('table_device');
	const row = table.rows[numId];
    num.defaultValue2 = row.cells[1].innerHTML;
	let defaultValue3 = row.cells[2].innerHTML;
	let defaultValue4 = row.cells[3].innerHTML;
	let defaultValue5 = row.cells[4].innerHTML;
    let defaultValue6 = row.cells[5].innerHTML;
    const elements = dialog.querySelector('select').querySelectorAll('option');
	elements.forEach(element => {
		if(element.value===num.defaultValue2){
			element.selected = true;
		}
	});
    dialog.querySelector('#model_device_select').value = defaultValue3;
    dialog.querySelector('#serial_number_device_select').value = defaultValue4;
    dialog.querySelector('#ITAM_device_select').value = defaultValue5;

    let photo_device = dialog.querySelector('#img_photo_device');
    let photo_serial = dialog.querySelector('#img_photo_serial');
    let photo_ITAM = dialog.querySelector('#img_photo_ITAM');

    photo_device.classList.remove("visually-hidden")
    photo_device.setAttribute('src',row.cells[5].querySelector('img').getAttribute('src'))
    photo_serial.classList.remove("visually-hidden")
    photo_serial.setAttribute('src',row.cells[6].querySelector('img').getAttribute('src'))
    photo_ITAM.classList.remove("visually-hidden")
    photo_ITAM.setAttribute('src',row.cells[7].querySelector('img').getAttribute('src'))

    document.getElementById("submit_dialog").addEventListener('click',()=>{
        saveTableData(numId)
    })
    dialog.showModal();

    document.getElementById("delete_dialog").addEventListener('click',()=>{
        let dialog = document.getElementById('edit_dialog');
        dialog.close();
        dialog.textContent = '';
    })

}
