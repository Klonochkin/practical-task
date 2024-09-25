const num = {
    defaultValue2: "",
    fileName1: '',
    fileName2: '',
    fileName3: '',
	lastFile1: '',
	lastFile2: '',
	lastFile3: '',
};

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

fetch('/data',{
	method: 'GET',
	headers: {
		'Cookie': `session=${getCookie("session")}`
	}
	})
	.then((response) => {
		if (response.ok) {
			return response.json();
		  } else if (response.status === 403) {
			console.error('Аккаунт не найден');
			window.location.href = '/auth';
		  } else {
			console.error('Error:', response.status);
		  }
	})
	.then((data) => {
		console.log(`ДАННЫЕ ${data}`)
		const n = data.length;
		for (let i = 0; i < n; i++) {
			const number = data[i].number;
			const type_device = data[i].type_device;
			const model_device = data[i].model_device;
			const serial_number = data[i].serial_number;
			const ITAM_device = data[i].ITAM_device;
			const photo_device = data[i].photo_device;
			const photo_serial_number_device =
				data[i].photo_serial_number_device;
			const photo_ITAM_device = data[i].photo_ITAM_device;
			saveClick(
				number,
				type_device,
				model_device,
				serial_number,
				ITAM_device,
				photo_device,
				photo_serial_number_device,
				photo_ITAM_device
			);
		}
	})

function saveClick(
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
	const ceil11 = newRow.insertCell(10);
	ceil1.textContent = number;
	ceil2.textContent = type_device;
	ceil3.textContent = model_device;
	ceil4.textContent = serial_number_device;
	ceil5.textContent = ITAM_device;



	const templateText = document.querySelector('#template-img');
	ceil6.textContent = '';
	const input1 = templateText.content.cloneNode(true);
	input1.querySelector('img').src = `static/images/${photo_device}`;
	ceil6.append(input1);

	ceil7.textContent = '';
	const input2 = templateText.content.cloneNode(true);
	input2.querySelector('img').src = `static/images/${photo_serial_number_device}`;
	ceil7.append(input2);

	ceil8.textContent = '';
	const input3 = templateText.content.cloneNode(true);
	input3.querySelector('img').src = `static/images/${photo_ITAM_device}`;
	ceil8.append(input3);


	const template = document.querySelector('#template__table-button');

	ceil9.textContent = '';
	const buttonDelete = template.content.cloneNode(true);
	buttonDelete.querySelector('button').id = `delete${number}`;

	buttonDelete.querySelector('button').addEventListener("click", () => {
		deleteData(number);
	});

	buttonDelete.querySelector('button').value = "Удалить";
	buttonDelete.querySelector('button').textContent = "Удалить";
	ceil9.append(buttonDelete);

	ceil10.textContent = '';
	const buttonEdit = template.content.cloneNode(true);
	buttonEdit.querySelector('button').id = `add${number}`;
	buttonEdit.querySelector('button').addEventListener("click", () => {
		changeData(number);
	});
	buttonEdit.querySelector('button').value = "Изменить";
	buttonEdit.querySelector('button').textContent = "Изменить";
	ceil10.append(buttonEdit);

	ceil11.textContent = '';
	const buttonSave = template.content.cloneNode(true);
	buttonSave.querySelector('button').id = `save${number}`;
	buttonSave.querySelector('button').addEventListener("click", () => {
		saveData(number);
	});

	buttonSave.querySelector('button').classList.add("visually-hidden")
	buttonSave.querySelector('button').value = "Сохранить";
	buttonSave.querySelector('button').textContent = "Сохранить";
	ceil11.append(buttonSave);
}

function changeData(numId) {
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

	defaultValue1 = row.cells[0].innerHTML;
	num.defaultValue2 = row.cells[1].innerHTML;
	defaultValue3 = row.cells[2].innerHTML;
	defaultValue4 = row.cells[3].innerHTML;
	defaultValue5 = row.cells[4].innerHTML;
	defaultValue6 = row.cells[5].innerHTML;
	defaultValue7 = row.cells[6].innerHTML;
	defaultValue8 = row.cells[7].innerHTML;


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

function saveData(numId) {
	document.getElementById(`add${numId}`).name.disabled = false;
	document.getElementById(`save${numId}`).classList.remove("visually-hidden")
	let newValue0 = document.getElementById('newValue0').value;
	if(document.getElementById('newValue0').value === ""){
		newValue0 = num.defaultValue2;
	}
	let newValue1 = document.getElementById('newValue1').value;
	let newValue2 = document.getElementById('newValue2').value;
	let newValue3 = document.getElementById('newValue3').value;
	let newValue4 = num.lastFile1;
	let newValue5 = num.lastFile2;
	let newValue6 = num.lastFile3;

	fetch('/data',{
		method: 'GET',
		headers: {
			'Cookie': `session=${getCookie("session")}`
		}
		})
	.then((response) => {
		if (response.ok) {
			return response.json();
		  } else if (response.status === 403) {
			console.error('Аккаунт не найден');
			window.location.href = '/auth';
		  } else {
			console.error('Error:', response.status);
		  }
	})
	.then((data) => {
		const photo_device = data[numId-1].photo_device;
		const photo_serial_number_device =
			data[numId-1].photo_serial_number_device;
		const photo_ITAM_device = data[numId-1].photo_ITAM_device;
		if(newValue4===""){
			newValue4=photo_device;
		}
		if(newValue5===""){
			newValue5=photo_serial_number_device;
		}
		if(newValue6===""){
			newValue6=photo_ITAM_device;
		}
		let email = getCookie("session");
		fetch('/data', {
			method: 'PUT',
			headers: {
				'Cookie': `session=${getCookie("session")}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				numFilter: numId,
				value0: newValue0,
				value1: newValue1,
				value2: newValue2,
				value3: newValue3,
				value4: newValue4,
				value5: newValue5,
				value6: newValue6
			}),
		})
			.then((response) => response.json())
			.then(() => {
			fetch('/data',{
				method: 'GET',
				headers: {
					'Cookie': `session=${getCookie("session")}`
				}
				})
			.then((response) => {
				if (response.ok) {
					return response.json();
				  } else if (response.status === 403) {
					console.error('Аккаунт не найден');
					window.location.href = '/auth';
				  } else {
					console.error('Error:', response.status);
				  }
			})
			.then((data2) => {
				const table = document.getElementById('table_device');
				const n = table.rows.length;
				for (let i = 1; i < n; i++) {
					table.deleteRow(1);
				}
				let n2 = data2.length;
				for (let i = 0; i < n2; i++) {
					const number = data2[i].number;
					const type_device = data2[i].type_device;
					const model_device = data2[i].model_device;
					const serial_number = data2[i].serial_number;
					const ITAM_device = data2[i].ITAM_device;
					const photo_device = data2[i].photo_device;
					const photo_serial_number_device =
					data2[i].photo_serial_number_device;
					const photo_ITAM_device = data2[i].photo_ITAM_device;
					saveClick(
						number,
						type_device,
						model_device,
						serial_number,
						ITAM_device,
						photo_device,
						photo_serial_number_device,
						photo_ITAM_device
					);
				}
			})
			.catch((error) => console.error('Ошибка:', error));
			})
			.catch((error) => console.error('Ошибка:', error));
	})
	.catch((error) => console.error('Ошибка:', error));


}

function deleteData(numId) {
	const table = document.getElementById('table_device');
	let a = table.rows.length;
	for (let i = 1; i < a; i++) {
		table.deleteRow(1);
	}
	let email = getCookie("session");
	fetch(`/data/${numId}`, {
		method: 'DELETE',
		headers: {
			'Cookie': `session=${getCookie("session")}`,
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then(() => {
			fetch('/data',{
				method: 'GET',
				headers: {
					'Cookie': `session=${getCookie("session")}`
				}
				})
			.then((response) => {
				if (response.ok) {
					return response.json();
				  } else if (response.status === 403) {
					console.error('Аккаунт не найден');
					window.location.href = '/auth';
				  } else {
					console.error('Error:', response.status);
				  }
			})
			.then((data) => {
			const n = data.length;
			for (let i = 0; i < n; i++) {
				const number = data[i].number;
				const type_device = data[i].type_device;
				const model_device = data[i].model_device;
				const serial_number = data[i].serial_number;
				const ITAM_device = data[i].ITAM_device;
				const photo_device = data[i].photo_device;
				const photo_serial_number_device =
					data[i].photo_serial_number_device;
				const photo_ITAM_device = data[i].photo_ITAM_device;
				saveClick(
					number,
					type_device,
					model_device,
					serial_number,
					ITAM_device,
					photo_device,
					photo_serial_number_device,
					photo_ITAM_device
				);
			}
		})
		.catch((error) => console.error('Ошибка:', error));
		})
		.catch((error) => console.error('Ошибка:', error));
}

document.getElementById('form1').addEventListener('submit', (e) => {
	e.preventDefault();
	const form = document.getElementById('form1');
	const formData = new FormData(form);
	var email = getCookie("session");
	formData.append('email', email);
	formData.set('photo_device',num.fileName1);
	formData.set('photo_serial_number_device',num.fileName2);
	formData.set('photo_ITAM_device',num.fileName3);

	fetch('/form', {
		method: 'POST',
		headers: {
			'Cookie': `session=${getCookie("session")}`
			},
		body: formData
	})
	.then(response => response.json())
	.then(() => {
		fetch('/data',{
			method: 'GET',
			headers: {
				'Cookie': `session=${getCookie("session")}`
			}
			})
		.then((response) => {
			if (response.ok) {
				return response.json();
			  } else if (response.status === 403) {
				console.error('Аккаунт не найден');
				window.location.href = '/auth';
			  } else {
				console.error('Error:', response.status);
			  }
		})
		.then((data2) => {
			const table = document.getElementById('table_device');
			const n = table.rows.length;
			for (let i = 1; i < n; i++) {
				table.deleteRow(1);
			}
			let n2 = data2.length;
			for (let i = 0; i < n2; i++) {
				const number = data2[i].number;
				const type_device = data2[i].type_device;
				const model_device = data2[i].model_device;
				const serial_number = data2[i].serial_number;
				const ITAM_device = data2[i].ITAM_device;
				const photo_device = data2[i].photo_device;
				const photo_serial_number_device =
				data2[i].photo_serial_number_device;
				const photo_ITAM_device = data2[i].photo_ITAM_device;
				saveClick(
					number,
					type_device,
					model_device,
					serial_number,
					ITAM_device,
					photo_device,
					photo_serial_number_device,
					photo_ITAM_device
				);
			}
		})
		.catch((error) => console.error('Ошибка:', error));
	})
	.catch(error => console.error(error));
	form.reset();
	document.getElementById('check1').classList.add("visually-hidden");
	document.getElementById('check2').classList.add("visually-hidden");
	document.getElementById('check3').classList.add("visually-hidden");
})

function saveFile(event,callback){
	const input = event.target;
	const file = input.files[0];
	const fileSize = input.files[0].size;
	const maxSize = 10*1024*1024;
	if (fileSize > maxSize) {
		alert(`Размер файла превышает максимально допустимый размер ${maxSize} байт`);
		input.files[0].value = '';
		return;
	}
	input.nextElementSibling.classList.remove("visually-hidden")
	const fileForm = new FormData();
	fileForm.append('file', file);


	fetch('/uploadFile', {
		method: 'POST',
		headers: {
			'Cookie': `session=${getCookie("session")}`
		},
		body: fileForm
	})
	.then(response => response.json())
	.then(data => {
		callback(data)
	})
	.catch(error => console.error(error));
}
document.getElementById('photo_device_select').addEventListener('input',(event) => saveFile(event,(data) => {
	num.fileName1 = data;
}));

document.getElementById('photo_serial_number_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName2 = data;}));

document.getElementById('photo_ITAM_device_select').addEventListener('input',(event) => saveFile(event,(data) => {num.fileName3 = data;}));

document.getElementById('exit').addEventListener('click',() => {
	fetch('/exit', {
		method: 'POST',
		headers: {
			'Cookie': `session=${getCookie("session")}`
		},
	})
	.then(response => response.json())
	.then(()=>{
		window.location.href = '/';
	})
	.catch(error => console.error(error));
});

function deleteFile(name){
	fetch(`/file/${name}`, {
		method: 'DELETE',
		headers: {
			'Cookie': `session=${getCookie("session")}`,
			'Content-Type': 'text/plain',
		},
		body: name
	})
	.then((response) => response.json())
	.catch((error) => console.error('Ошибка:', error));
}
