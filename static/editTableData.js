
import {globalData as num} from '/static/globalData.js';

import {saveFile} from '/static/saveFile.js';

import {deleteFile} from '/static/deleteFile.js';

export function editTableData(numId) {
	const name = document.getElementById(`add${numId}`);
	name.disabled = true;
	document.getElementById(`save${numId}`).classList.remove("visually-hidden")
	const table = document.getElementById('table_device');
	for (let i = 1; i < table.rows.length; i++) {
		document.getElementById(`delete${i}`).disabled = true;
		if (i !== numId) {
			document.getElementById(`add${i}`).disabled = true;
		}
	}
	const row = table.rows[numId];

	num.defaultValue2 = row.cells[1].innerHTML;
	let defaultValue3 = row.cells[2].innerHTML;
	let defaultValue4 = row.cells[3].innerHTML;
	let defaultValue5 = row.cells[4].innerHTML;


	const template = document.querySelector('#template__select-type');
	row.cells[1].textContent = '';
	const select = template.content.cloneNode(true);
	const elements = select.querySelectorAll('option');
	elements.forEach(element => {
		if(element.value===num.defaultValue2){
			element.selected = true;
		}
	});
	row.cells[1].append(select);

	const templateText1 = document.querySelector('#template__input-text');
	row.cells[2].textContent = '';
	const input1 = templateText1.content.cloneNode(true);
	input1.querySelector('input').id = "newValue1";
	input1.querySelector('input').value = defaultValue3;
	row.cells[2].append(input1);

	row.cells[3].textContent = '';
	const input2 = templateText1.content.cloneNode(true);
	input2.querySelector('input').id = "newValue2";
	input2.querySelector('input').value = defaultValue4;
	row.cells[3].append(input2);

	row.cells[4].textContent = '';
	const input3 = templateText1.content.cloneNode(true);
	input3.querySelector('input').id = "newValue3";
	input3.querySelector('input').value = defaultValue5;
	row.cells[4].append(input3);

	const templateFile = document.querySelector('#template-select-img');
	const input4 = templateFile.content.cloneNode(true);
	input4.querySelector('input').id="newValue4";
	row.cells[5].append(input4);
	document.getElementById('newValue4').addEventListener('input',(event) => saveFile(event,(data) => {
		num.lastFile1 = data;
		let deleteName = row.cells[5].querySelector('img').src;
		deleteName = deleteName.split('/', 6);
		deleteFile(deleteName[5]);
		row.cells[5].querySelector('img').src = `static/images/${data}`;
	}));

	const input5 = templateFile.content.cloneNode(true);
	input5.querySelector('input').id="newValue5";
	row.cells[6].append(input5);
	document.getElementById('newValue5').addEventListener('input',(event) => saveFile(event,(data) => {
		num.lastFile2 = data;
		let deleteName = row.cells[6].querySelector('img').src;
		deleteName = deleteName.split('/', 6);
		deleteFile(deleteName[5]);
		row.cells[6].querySelector('img').src = `static/images/${data}`;
	}));

	const input6 = templateFile.content.cloneNode(true);
	input6.querySelector('input').id="newValue6";
	row.cells[7].append(input6);
	document.getElementById('newValue6').addEventListener('input',(event) => saveFile(event,(data) => {
		num.lastFile3 = data;
		let deleteName = row.cells[7].querySelector('img').src;
		deleteName = deleteName.split('/', 6);
		deleteFile(deleteName[5]);
		row.cells[7].querySelector('img').src = `static/images/${data}`;
	}));

}
