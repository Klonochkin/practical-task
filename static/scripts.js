const num = {
    defaultValue2: ""
};
fetch('/data/')
    .then((response) => response.json())
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
    ceil6.textContent = photo_device;
    ceil7.textContent = photo_serial_number_device;
    ceil8.textContent = photo_ITAM_device;

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

    buttonSave.querySelector('button').classList.add("table__button--hidden")
    buttonSave.querySelector('button').value = "Сохранить";
    buttonSave.querySelector('button').textContent = "Сохранить";
    ceil11.append(buttonSave);
}
function changeData(numId) {
    const name = document.getElementById(`add${numId}`);
    name.disabled = true;
    document.getElementById(`save${numId}`).classList.remove("table__button--hidden")
    const table = document.getElementById('table_device');
    for (let i = 1; i < table.rows.length; i++) {
        document.getElementById(`delete${i}`).disabled = true;
        if (i != numId) {
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
    select.querySelector('#template__select-type-default').value = num.defaultValue2;
    select.querySelector('#template__select-type-default').textContent = num.defaultValue2;
    row.cells[1].append(select);

    row.cells[2].textContent = '';
    const templateText1 = document.querySelector('#template__input-text');
    const input1 = templateText1.content.cloneNode(true);
    input1.querySelector('input').id = "newValue1";
    input1.querySelector('input').value = defaultValue3;
    row.cells[2].append(input1);

    row.cells[3].textContent = '';
    const templateText2 = document.querySelector('#template__input-text');
    const input2 = templateText2.content.cloneNode(true);
    input2.querySelector('input').id = "newValue2";
    input2.querySelector('input').value = defaultValue4;
    row.cells[3].append(input2);

    row.cells[4].textContent = '';
    const templateText3 = document.querySelector('#template__input-text');
    const input3 = templateText3.content.cloneNode(true);
    input3.querySelector('input').id = "newValue3";
    input3.querySelector('input').value = defaultValue5;
    row.cells[4].append(input3);

}

function saveData(numId) {
    document.getElementById(`add${numId}`).name.disabled = false;
    document.getElementById(`save${numId}`).style.display = 'none';
    let newValue0 = document.getElementById('newValue0').value;
    if(document.getElementById('newValue0').value == ""){
        newValue0 = num.defaultValue2;
    }
    let newValue1 = document.getElementById('newValue1').value;
    let newValue2 = document.getElementById('newValue2').value;
    let newValue3 = document.getElementById('newValue3').value;
    fetch('/changeData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numFilter: numId,
            value0: newValue0,
            value1: newValue1,
            value2: newValue2,
            value3: newValue3,
        }),
    })
        .then((response) => response.json())
        .then((data1) => {
            fetch('/data/')
        .then((response) => response.json())
        .then((data2) => {
            const table = document.getElementById('table_device');
            const n = data2.length;
            for (let i = 1; i <= n; i++) {
                table.deleteRow(1);
            }
            for (let i = 0; i < n; i++) {
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
}

function deleteData(numId) {
    const table = document.getElementById('table_device');
    let a = table.rows.length;
    for (let i = 1; i < a; i++) {
        table.deleteRow(1);
    }
    fetch('/deleteData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numDelete: numId }),
    })
        .then((response) => response.json())
        .then((data) => {
            fetch('/data/')
        .then((response) => response.json())
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
