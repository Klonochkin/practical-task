const notificationContainer = document.getElementById('notification-container');
/**
 * @param {string} title
 * @param {string} type
 * @param {string} text
 */
export function addNotification(title, type, text) {
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification', `notification__${type}`);
    newNotification.classList.remove('visually-hidden');
    /** @type {HTMLTemplateElement | null} */
    const template = document.querySelector('#notification-strong') ?? null;
    let templateClone = /** @type {Element | null | undefined} */ (
        template?.content.cloneNode(true)
    );
    let aboba = /** @type {Element | null | undefined} */ (
        templateClone?.querySelector('strong')
    );
    if (aboba) aboba.textContent = `${title}`;
    aboba = aboba?.parentNode?.querySelector('p');
    if (aboba) aboba.textContent = `${text}`;

    templateClone = /** @type {Element | null | undefined} */ (
        aboba?.parentNode
    );

    if (templateClone) newNotification.append(templateClone);

    notificationContainer?.appendChild(newNotification);

    return newNotification;
}
/** @param {HTMLDivElement} notification */
export function removeNotification(notification) {
    notification.classList.add('notification--hide');

    setTimeout(() => {
        notificationContainer?.removeChild(notification);
    }, 500);
}
