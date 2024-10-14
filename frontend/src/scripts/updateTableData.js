
import {editTableData} from './editTableData.js';

import {saveTableData} from './saveTableData.js';

import {deleteTableData} from './deleteTableData.js';

export function updateTableData(
	number,
	type_device,
	model_device,
	serial_number_device,
	ITAM_device,
	photo_device,
	photo_serial_number_device,
	photo_ITAM_device
) {
	const table = document
	.getElementById('table_device')
	.getElementsByTagName('tbody')[0];
	const newRow = table.insertRow();
	const ceil1 = newRow.insertCell(0);
	const ceil2 = newRow.insertCell(1);
	const ceil3 = newRow.insertCell(2);
	const ceil4 = newRow.insertCell(3);
	const ceil5 = newRow.insertCell(4);
	const ceil6 = newRow.insertCell(5);
	const ceil7 = newRow.insertCell(6);
	const ceil8 = newRow.insertCell(7);
	const ceil9 = newRow.insertCell(8);
	const ceil10 = newRow.insertCell(9);
	ceil1.textContent = number;
	ceil2.textContent = type_device;
	ceil3.textContent = model_device;
	ceil4.textContent = serial_number_device;
	ceil5.textContent = ITAM_device;



	const templateText = document.querySelector('#template-img');
	ceil6.textContent = '';
	const input1 = templateText.content.cloneNode(true);
	input1.querySelector('img').src = `api/${photo_device}/150`;
    input1.querySelector('img').cache = "max-age=31536000";
    input1.querySelector('img').alt = "";
	ceil6.append(input1);

	ceil7.textContent = '';
	const input2 = templateText.content.cloneNode(true);
	input2.querySelector('img').src = `api/${photo_serial_number_device}/150`;
    input2.querySelector('img').cache = "max-age=31536000";
    input2.querySelector('img').alt = "";
	ceil7.append(input2);

	ceil8.textContent = '';
	const input3 = templateText.content.cloneNode(true);
	input3.querySelector('img').src = `api/${photo_ITAM_device}/150`;
    input3.querySelector('img').cache = "max-age=31536000";
    input3.querySelector('img').alt = "";
	ceil8.append(input3);


	const template = document.querySelector('#template__table-button');

	ceil9.textContent = '';
	const buttonDelete = template.content.cloneNode(true);
	buttonDelete.querySelector('button').id = `delete${number}`;

	buttonDelete.querySelector('button').addEventListener("click", () => {
		deleteTableData(number);
	});

	buttonDelete.querySelector('button').value = "Удалить";
	buttonDelete.querySelector('button').textContent = "Удалить";
	ceil9.append(buttonDelete);

	ceil10.textContent = '';
	const buttonEdit = template.content.cloneNode(true);
	buttonEdit.querySelector('button').id = `add${number}`;
	buttonEdit.querySelector('button').addEventListener("click", () => {
        editTableData(number)
        let dialog = document.getElementById('edit_dialog');

        dialog.addEventListener('close', () => {
            document.getElementById('dialog_content').textContent='';
            document.querySelector('body').classList.remove('body__open-dialog');
        });

        dialog.addEventListener("click", closeOnBackDropClick)

        function closeOnBackDropClick({ currentTarget, target }) {
        const dialogElement = currentTarget
        const isClickedOnBackDrop = target === dialogElement
        if (isClickedOnBackDrop) {
            dialogElement.close()
        }
        }
	});
	buttonEdit.querySelector('button').value = "Изменить";
	buttonEdit.querySelector('button').textContent = "Изменить";
	ceil10.append(buttonEdit);
}
