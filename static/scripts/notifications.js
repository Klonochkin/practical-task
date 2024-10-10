const notificationContainer = document.getElementById('notification-container');


export function addNotification(title,type, text) {
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification', `notification__${type}`);
	newNotification.classList.remove('visually-hidden')

    const template = document.querySelector('#notification-strong');
	const templateClone = template.content.cloneNode(true);
	templateClone.querySelector('strong').textContent = `${title}: `
    templateClone.querySelector('p').textContent = ` ${text}`
	newNotification.append(templateClone);

    notificationContainer.appendChild(newNotification);

    return newNotification;
}

export function removeNotification(notification) {
	notification.classList.add('notification--hide');

	setTimeout(() => {
		notificationContainer.removeChild(notification);
	}, 500);
}
