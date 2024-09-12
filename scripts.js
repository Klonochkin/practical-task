function createClick(){
    alert("click");
    const form = document.createElement('form');
  form.innerHTML = `
  <div> <!-- form -->
  <form>
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
          </div>
      </div>                    
  </form>
</div>
  `;
  document.body.appendChild(form);
}