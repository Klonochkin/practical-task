const notificationContainer = document.getElementById('notification-container');
/** @type {number} */
let num = 0;
/** @type {HTMLDivElement} */

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
    if (aboba) {
        aboba.textContent = `${title}`;
        aboba.id = `not${num}`;
    }
    aboba = aboba?.parentNode?.querySelector('p');
    if (aboba) aboba.textContent = `${text}`;

    templateClone = /** @type {Element | null | undefined} */ (
        aboba?.parentNode
    );

    if (templateClone) newNotification.append(templateClone);
    newNotification?.addEventListener('touchstart', (event)=>{
        touchStart(event);
    });
    newNotification?.addEventListener('touchmove', (event)=>{
        touchMove(event,newNotification);
    });
    newNotification?.addEventListener('touchend', ()=>{
        touchEnd(newNotification);
    });
    notificationContainer?.appendChild(newNotification);

    setTimeout(() => {
        newNotification?.removeEventListener('touchstart', touchStart);
        newNotification?.removeEventListener('touchmove', (event)=>{
            touchMove(event,newNotification);
        });
        newNotification?.removeEventListener('touchend', ()=>{
            touchEnd(newNotification);
        });
    }, 2000);

    return newNotification;
}
/** @param {HTMLDivElement} notification */
export function removeNotification(notification) {
    notification.classList.add('notification--hide');
    /** @type {string | undefined} */
    let notId = notification?.querySelector('strong')?.id;
    if(notId && document.getElementById(notId)){
        setTimeout(() => {
            if(notification)
                notificationContainer?.removeChild(notification);
        }, 500);
    }
}

/** @type {number} */
let touchStartX;
/** @type {number} */
let touchMoveX;
/**
 * @param { TouchEvent } event
*/
function touchStart(event) {
    touchStartX = event.touches[0].clientX;
    document.querySelector('body')?.classList.add('body__scroll-lock');
}

/**
 * @param { TouchEvent } event
 * @param { HTMLElement } el
*/
function touchMove(event,el) {
    touchMoveX = event.touches[0].clientX;
    const deltaX = touchMoveX - touchStartX;
    if(el)
        el.style.transform = `translate(${deltaX}px)`;
}
/**
 * @param { HTMLElement } el
*/
function touchEnd(el) {
    document.querySelector('body')?.classList.remove('body__scroll-lock');
    const deltaX = touchMoveX - touchStartX;
    const swipeThreshold = 100;
    if (deltaX > swipeThreshold) {
        el.style.transition = 'transform 0.3s ease-out';
        el.style.transform = 'translateX(100vw)';
        setTimeout(() => {
            el.remove();
        }, 300);
    } else {
        el.style.transition = 'transform 0.3s ease-out';
        el.style.transform = 'translate(0, 0)';
    }
}
