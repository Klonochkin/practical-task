const notificationContainer = document.getElementById('notification-container');


export function addNotification(title,type, text) {
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification', `notification-${type}`);
	newNotification.classList.remove('visually-hidden')

    const innerNotification = `
		<strong>${title}:</strong> ${text}
	`;

    newNotification.innerHTML = innerNotification;

    notificationContainer.appendChild(newNotification);

    return newNotification;
}

export function removeNotification(notification) {
	notification.classList.add('hide');

	setTimeout(() => {
		notificationContainer.removeChild(notification);
	}, 500);
}
