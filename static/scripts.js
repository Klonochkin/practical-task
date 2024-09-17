const num ={
  count_form: 1,
  isSave: false
}
fetch('/data/')
  .then(response => response.json())
  .then(data => {
    const n = data.length;
    for (let i = 0; i < n; i++) {
      const number = data[i].number;
      const type_device = data[i].type_device;
      const model_device = data[i].model_device;
      const serial_number = data[i].serial_number;
      const ITAM_device = data[i].ITAM_device;
      const photo_device = data[i].photo_device;
      const photo_serial_number_device = data[i].photo_serial_number_device;
      const photo_ITAM_device = data[i].photo_ITAM_device;
      saveClick(number,type_device,model_device,serial_number,ITAM_device,photo_device,photo_serial_number_device,photo_ITAM_device);
    }
  })
  .catch(error => console.error('Ошибка:', error));
function hello() {
  alert("hello");
}
function createClick(){
    // alert("click");
    if(num.isSave){
      num.isSave=false;
      num.count_form+=1;
      const form = document.createElement('form');
      form.innerHTML = `
      <div id=${num.count_form}> <!-- form -->
      <form id="form${num.count_form}">
          <div class="top_form_ui">
              <div class="top_form">Форма заполнения:</div>
              <div class="field_box_select">
                  <div class="field_select">
                      <label>Выберети тип оборудования:
                      <select class="field_select_type" name="type_device" id="type_device_select">
                          <option value=""></option>
                          <option value="1">оченьбольшойтекст</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </label>
                  </div>
                  <div class="field_select">
                      <label>Введите модель оборудования:
                      <input class="field_select_text" type="text" name="model_device" id="model_device_select" placeholder="Pantum P215">
                      </label>
                  </div>
                  <div class="field_select">
                      <label>Введите серийный номер:
                      <input class="field_select_text" type="text" name="serial_number" id="serial_number_device_select" placeholder="151810310001">
                      </label>
                  </div>
                  <div class="field_select">
                      <label>Введите инвентарный номер (ITAM):
                      <input class="field_select_text" type="text" name="ITAM_device" id="ITAM_device_select" placeholder="11111">
                      </label>
                  </div>
                  <div class="field_select">
                      <label>Фотография устройства:
                      <input class="field_select_text" type="file" name="photo_device" id="photo_device_select" accept=".png,.jpeg,.jpg">
                      </label>
                  </div>
                  <div class="field_select">
                      <label>Фотография серийного номера:
                      <input class="field_select_text" type="file" name="photo_serial_number_device" id="photo_serial_number_device_select" accept=".png,.jpeg,.jpg">
                      </label>
                  </div>
                  <div class="field_select">
                      <label>Фотография инвентарного номера (ITAM):
                      <input class="field_select_text" type="file" name="photo_ITAM_device" id="photo_ITAM_device_select" accept=".png,.jpeg,.jpg">
                      </label>
                  </div>
                  <div class="field_select">
                                <label>Сохранение:
                                    <input id="save1" class="field_select_text" type="button" name="save_form" value="Сохранить" onclick="saveClick()">
                                </label>
                            </div>
              </div>
          </div>                    
      </form>
    </div>
      `;
      document.body.appendChild(form);
    }
    
}
function deleteClick(){
  select_id = num.count_form;
  if(select_id==1){
    return;
  }
  num.count_form-=1;
  const id = document.getElementById(select_id);
  id.remove();
  num.isSave=true;
}
function saveClick(number,type_device,model_device,serial_number_device,ITAM_device,photo_device,photo_serial_number_device,photo_ITAM_device){
  select_id = num.count_form;
  const table = document.getElementById('table_device').getElementsByTagName('tbody')[0];
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
  ceil6.textContent = photo_device;
  ceil7.textContent = photo_serial_number_device;
  ceil8.textContent = photo_ITAM_device;
  ceil9.innerHTML += `<button id="add${number}" onclick="changeData('${number}')" style="line-height: 30px; width: 45px;">edit</button>`;
  ceil10.innerHTML += `<button id="save${number}" onclick="saveData('${number}')" style="display: none;line-height: 30px; width: 45px;">save</button>`;
  num.isSave=true;
}

function changeData(numId){
  var str= "add";
  str+=numId;
  const name = document.getElementById(`add${numId}`);
  name.disabled=true;
  document.getElementById(`save${numId}`).style.display = 'block';
  const table = document.getElementById('table_device');
  const row = table.rows[numId];
  
  defaultValue1 = row.cells[0].innerHTML;
  defaultValue2 = row.cells[1].innerHTML;
  defaultValue3 = row.cells[2].innerHTML;
  defaultValue4 = row.cells[3].innerHTML;
  defaultValue5 = row.cells[4].innerHTML;
  defaultValue6 = row.cells[5].innerHTML;
  defaultValue7 = row.cells[6].innerHTML;
  defaultValue8 = row.cells[7].innerHTML;

  row.cells[1].innerHTML = `<select class="field_select_type" name="type_device" id="newValue0" required>
                                    <option value="${row.cells[1].innerHTML}">${row.cells[1].innerHTML}</option>
                                    <option value="Компьютер">Компьютер</option>
                                    <option value="Принтер">Принтер</option>
                                    <option value="Сканер">Сканер</option>
                                    <option value="Ксерокс">Ксерокс</option>
                                    <option value="Телефон">Телефон</option>
                                    <option value="Шредер">Шредер</option>
                                  </select>`;
  
  row.cells[2].innerHTML = `<input size=8 class="field_select_text" type="text" name="model_device" id="newValue1" placeholder="Pantum P215" required autocomplete="off" value="${row.cells[2].innerHTML}">`
  row.cells[3].innerHTML = `<input size=8 class="field_select_text" type="text" name="model_device" id="newValue2" placeholder="Pantum P215" required autocomplete="off" value="${row.cells[3].innerHTML}">`
  row.cells[4].innerHTML = `<input size=8 class="field_select_text" type="text" name="model_device" id="newValue3" placeholder="Pantum P215" required autocomplete="off" value="${row.cells[4].innerHTML}">`
}
function saveData(numId){
  document.getElementById(`add${numId}`).name.disabled=false;
  document.getElementById(`save${numId}`).style.display = 'none';
  const newValue0 = document.getElementById('newValue0').value;
  const newValue1 = document.getElementById('newValue1').value;
  const newValue2 = document.getElementById('newValue2').value;
  const newValue3 = document.getElementById('newValue3').value;
  const data = {name: "13", age: 30};
  const formData = new FormData();
  formData.append('data', JSON.stringify({name:'qwerty',age: 13}));
  fetch('/changeData',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({numFilter: numId, value0:newValue0,value1:newValue1,value2: newValue2, value3: newValue3})
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
  const table = document.getElementById('table_device');
  table.deleteRow(numId)
  saveClick(defaultValue1,newValue0,newValue1,newValue2,newValue3,defaultValue6,defaultValue7,defaultValue8);
}