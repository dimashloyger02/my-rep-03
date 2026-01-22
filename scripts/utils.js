// utils.js

export function sendTelegramMessage(chat_id, text) {
    try {
        const apiToken = 'ВАШ_API_ТОКЕН'; // Замените на реальный токен
        const url = `https://api.telegram.org/bot${apiToken}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: text
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.ok) {
                throw new Error(data.description);
            }
            console.log('Сообщение отправлено успешно');
        })
        .catch(error => {
            console.error('Ошибка отправки сообщения:', error);
        });
    } catch (error) {
        console.error('Ошибка в sendTelegramMessage:', error);
    }
}
