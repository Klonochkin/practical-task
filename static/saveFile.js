
export function saveFile(event,callback){
	const input = event.target;
	const file = input.files[0];
	if(file===undefined){
		input.nextElementSibling.classList.add("visually-hidden")
		return;
	}
	const fileSize = input.files[0].size;
	const maxSize = 10*1024*1024;
	if (fileSize > maxSize) {
		input.type = 'text';
		input.type = "file";
		callback("maxSize")
		input.nextElementSibling.classList.add("visually-hidden")
		return;
	}
	input.nextElementSibling.classList.remove("visually-hidden")
	const fileForm = new FormData();
	fileForm.append('file', file);


	fetch('/uploadFile', {
		method: 'POST',
		credentials: 'include',
		body: fileForm
	})
	.then(response => response.json())
	.then(data => {
		callback(data)
	})
	.catch(error => console.error(error));
}

