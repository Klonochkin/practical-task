const num = {
    defaultValue2: ""
};
fetch('/data/')
    .then((response) => response.json())
    .then((data) => {
        console.log('ПЕРЕХОД ПО DATA');
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
    ceil9.innerHTML += `<button id="delete${number}" onclick="deleteData('${number}')" class="table__button">Удалить</button>`;
    ceil10.innerHTML += `<button id="add${number}" onclick="changeData('${number}')" class="table__button">Изменить</button>`;
    ceil11.innerHTML += `<button id="save${number}" onclick="saveData('${number}')" class="table__button table__button--hidden">Сохранить</button>`;
}

function changeData(numId) {
    var str = 'add';
    str += numId;
    const name = document.getElementById(`add${numId}`);
    name.disabled = true;
    document.getElementById(`save${numId}`).style.display = 'block';
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
    console.log(`АГФЩЗАФАЭЦА ${num.defaultValue2}`);
    defaultValue3 = row.cells[2].innerHTML;
    defaultValue4 = row.cells[3].innerHTML;
    defaultValue5 = row.cells[4].innerHTML;
    defaultValue6 = row.cells[5].innerHTML;
    defaultValue7 = row.cells[6].innerHTML;
    defaultValue8 = row.cells[7].innerHTML;

    row.cells[1].innerHTML = `<select class="form__field-select-type" name="type_device" id="newValue0" required>
                                    <option disabled selected>${num.defaultValue2}</option>
                                    <option value=""></option>
                                    <option value="Компьютер">Компьютер</option>
                                    <option value="Принтер">Принтер</option>
                                    <option value="Сканер">Сканер</option>
                                    <option value="Ксерокс">Ксерокс</option>
                                    <option value="Телефон">Телефон</option>
                                    <option value="Шредер">Шредер</option>
                                  </select>`;

    row.cells[2].innerHTML = `<input size=8 class="form__field-select-text" type="text" name="model_device" id="newValue1" placeholder="Pantum P215" required autocomplete="off" value="${row.cells[2].innerHTML}">`;
    row.cells[3].innerHTML = `<input size=8 class="form__field-select-text" type="text" name="model_device" id="newValue2" placeholder="Pantum P215" required autocomplete="off" value="${row.cells[3].innerHTML}">`;
    row.cells[4].innerHTML = `<input size=8 class="form__field-select-text" type="text" name="model_device" id="newValue3" placeholder="Pantum P215" required autocomplete="off" value="${row.cells[4].innerHTML}">`;
}

function saveData(numId) {
    document.getElementById(`add${numId}`).name.disabled = false;
    document.getElementById(`save${numId}`).style.display = 'none';
    let newValue0 = document.getElementById('newValue0').value;
    if(document.getElementById('newValue0').value == ""){
        newValue0 = num.defaultValue2;
        console.log(num.defaultValue2);
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
            console.log(n);
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
    var a = table.rows.length;
    for (let i = 1; i < a; i++) {
        console.log('DROP TABLE');
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
