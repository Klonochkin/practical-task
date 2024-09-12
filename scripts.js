function createClick(){
    alert("click");
    const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" name="name" placeholder="Name">
    <input type="submit" value="Submit">
  `;
  document.body.appendChild(form);
}