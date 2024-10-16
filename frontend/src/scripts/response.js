import { addNotification, removeNotification } from './notifications.js';

const notification_types = {
    SUCCESS: 'success',
    WARNING: 'warning',
};
/**
 * @param {Response} response
 */
export function checkResponse(response) {
    if (response.ok) {
        return;
    } else if (response.status === 401) {
        console.error('Вы не вошли');
        window.location.href = '/auth';
    } else if (response.status === 404) {
        console.error('Запись не найдена');
        const warning = addNotification(
            'Ошибка',
            notification_types.WARNING,
            'Запись не найдена',
        );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    } else if (response.status === 405) {
        console.error('Неправильный метод запроса');
        const warning = addNotification(
            'Ошибка',
            notification_types.WARNING,
            'Неправильный метод запроса',
        );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    } else if (response.status === 408) {
        console.error('Превышено время ожидания ответа');
        const warning = addNotification(
            'Ошибка',
            notification_types.WARNING,
            'Превышено время ожидания ответа',
        );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    } else if (response.status === 409) {
        console.error('Аккаунт с таким email уже существует');
        const warning = addNotification(
            'Ошибка',
            notification_types.WARNING,
            'Аккаунт с таким email уже существует',
        );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    } else if (response.status === 422) {
        console.error('Запрос имеет не обработанный элемент');
        const warning = addNotification(
            'Ошибка',
            notification_types.WARNING,
            'Запрос имеет не обработанный элемент',
        );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    } else if (response.status === 429) {
        console.error('Превышено количество запросов');
        const warning = addNotification(
            'Ошибка',
            notification_types.WARNING,
            'Превышено количество запросов',
        );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    } else if (response.status === 500) {
        console.error('Сервер не отвечает');
        const warning = addNotification(
            'Ошибка',
            notification_types.WARNING,
            'Сервер не отвечает',
        );
        setTimeout(() => {
            removeNotification(warning);
        }, 4000);
    } else {
        console.error('Error:', response.status);
    }
}
