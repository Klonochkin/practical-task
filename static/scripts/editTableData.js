import {globalData as num} from '/static/scripts/globalData.js';

import { validityInputUpdate } from '/static/scripts/validation.js';

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
    let defaultValue1 = row.cells[0].innerHTML;
	num.defaultValue2 = row.cells[1].innerHTML;
	let defaultValue3 = row.cells[2].innerHTML;
	let defaultValue4 = row.cells[3].innerHTML;
	let defaultValue5 = row.cells[4].innerHTML;
    row.cells[0].textContent="";
    const formTemplate = document.querySelector('#form-edit');
    const formClone = formTemplate.content.cloneNode(true);
    formClone.querySelector('form').textContent = `${defaultValue1}`;
    row.cells[0].append(formClone);

	const template = document.querySelector('#template__select-type');
	row.cells[1].textContent = '';
	const select = template.content.cloneNode(true);
    select.querySelector('select').setAttribute('form','edit');
    const elements = select.querySelectorAll('option');
	elements.forEach(element => {
		if(element.value===num.defaultValue2){
			element.selected = true;
		}
	});
	row.cells[1].append(select);
    row.cells[1].classList.add('table__input')
	const templateText1 = document.querySelector('#template__input-text');
	row.cells[2].textContent = '';
	const input1 = templateText1.content.cloneNode(true);
	input1.querySelector('input').id = "newValue1";
    input1.querySelector('input').setAttribute('form','edit');
	input1.querySelector('input').value = defaultValue3;
	row.cells[2].append(input1);
    row.cells[2].classList.add('table__input')

	row.cells[3].textContent = '';
	const input2 = templateText1.content.cloneNode(true);
	input2.querySelector('input').id = "newValue2";
    input2.querySelector('input').setAttribute('form','edit');
	input2.querySelector('input').value = defaultValue4;
	row.cells[3].append(input2);
    row.cells[3].classList.add('table__input')

	row.cells[4].textContent = '';
	const input3 = templateText1.content.cloneNode(true);
	input3.querySelector('input').id = "newValue3";
    input3.querySelector('input').setAttribute('form','edit');
	input3.querySelector('input').value = defaultValue5;
	row.cells[4].append(input3);
    row.cells[4].classList.add('table__input')

	const templateFile = document.querySelector('#template-select-img');
	const input4 = templateFile.content.cloneNode(true);
	input4.querySelector('input').id="newValue4";
	row.cells[5].append(input4);
    row.cells[5].classList.add('table__img')
	document.getElementById('newValue4').addEventListener('input',(event) => {
		let deleteName = row.cells[5].querySelector('img').src;
		let name = deleteName;
		const input = event.target;
		const fileSize = event.target.files[0].size;
		const maxSize = 10*1024*1024;
		if (fileSize > maxSize) {
			input.type = 'text';
			input.type = "file";
			row.cells[5].querySelector('img').src = name;
			return;
		}
		deleteName = deleteName.split('/', 6);
		num.lastFile1 = deleteName[5];
		row.cells[5].querySelector('img').src = URL.createObjectURL(event.target.files[0]);

	});
	const input5 = templateFile.content.cloneNode(true);
	input5.querySelector('input').id="newValue5";
	row.cells[6].append(input5);
    row.cells[6].classList.add('table__img')
	document.getElementById('newValue5').addEventListener('input',(event) => {
		let deleteName = row.cells[6].querySelector('img').src;
		let name = deleteName;
		const input = event.target;
		const fileSize = event.target.files[0].size;
		const maxSize = 10*1024*1024;
		if (fileSize > maxSize) {
			input.type = 'text';
			input.type = "file";
			row.cells[6].querySelector('img').src = name;
			return;
		}
		deleteName = deleteName.split('/', 6);
		num.lastFile2 = deleteName[5];
		row.cells[6].querySelector('img').src = URL.createObjectURL(event.target.files[0]);
	});

	const input6 = templateFile.content.cloneNode(true);
	input6.querySelector('input').id="newValue6";
	row.cells[7].append(input6);
    row.cells[7].classList.add('table__img')
	document.getElementById('newValue6').addEventListener('input',(event) =>{
		let deleteName = row.cells[7].querySelector('img').src;
		let name = deleteName;
		const input = event.target;
		const fileSize = event.target.files[0].size;
		const maxSize = 10*1024*1024;
		if (fileSize > maxSize) {
			input.type = 'text';
			input.type = "file";
			row.cells[7].querySelector('img').src = name;
			return;
		}
		deleteName = deleteName.split('/', 6);
		num.lastFile3 = deleteName[5];
		row.cells[7].querySelector('img').src = URL.createObjectURL(event.target.files[0]);
	});
    let forms = document.getElementById('edit').elements;
    console.log(forms)
    for (let i = 0; i < forms.length; i++) {
        const element = forms[i];
        let paragraph = element.parentNode.querySelector('p');
        if(element.type === "text" || element.type === "select-one"){
            element.addEventListener('blur', ()=>{
                validityInputUpdate(element,paragraph)
            });
        }
    }
}
