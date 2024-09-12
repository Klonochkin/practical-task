
const num ={
  count_form: 1,
  isSave: false
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

function saveClick(){
  select_id = num.count_form;
  const form = document.getElementById(`form${select_id}`);
  const type_device = form.elements['type_device'].value;
  if(type_device==""){
    return;
  }
  const model_device = form.elements['model_device'].value;
  if(model_device==""){
    return;
  }
  const serial_number_device = form.elements['serial_number'].value;
  if(serial_number_device==""){
    return;
  }
  const ITAM_device = form.elements['ITAM_device'].value;
  if(ITAM_device==""){
    return;
  }
  const photo_device = form.elements['photo_device'].value;
  if(photo_device==""){
    return;
  }
  const photo_serial_number_device = form.elements['photo_serial_number_device'].value;
  if(photo_serial_number_device==""){
    return;
  }
  const photo_ITAM_device = form.elements['photo_ITAM_device'].value;
  if(photo_ITAM_device==""){
    return;
  }
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
  
  

  ceil2.textContent = num.count_form;
  ceil2.textContent = type_device;
  ceil3.textContent = model_device;
  ceil4.textContent = serial_number_device;
  ceil5.textContent = ITAM_device;
  // ceil6.textContent = photo_device;
  document.getElementById('img1').addEventListener('change',function(event){
    alert("ye");
    const file = event.target.files[0];
    if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      const imgEl = document.createElement('img');
      imgEl.scr = e.target.result;
      imgEl.alt = file.name;
      imgEl.style.maxWidth = '100%';
      ceil6.appendChild(imgEl);
      alert(imgEl);
    };
    reader.readAsDataURL(file);
  }
  else{
    alert("no");
  }
  });
  ceil6.content = photo_device;
  ceil7.textContent = photo_serial_number_device;
  ceil8.textContent = photo_ITAM_device;
  num.isSave=true;
}