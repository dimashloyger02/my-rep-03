// sendMessage.js
const TELEGRAM_BOT_TOKEN = '8318160592:AAFW70-IjNWu2vv5rdqpF_DMRzyed4mva0E';

function sendMessage(chatId, text) {
    return new Promise((resolve, reject) => {
        // Валидация входных параметров
        if (typeof chatId !== 'string' || chatId.trim() === '') {
            reject(new Error('Неверный chat_id'));
            return;
        }
        if (typeof text !== 'string' || text.trim() === '') {
            reject(new Error('Неверный текст сообщения'));
            return;
        }
        if (text.length > 4096) {
            reject(new Error('Текст сообщения слишком длинный (максимум 4096 символов)'));
            return;
        }

        fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text
                })
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ошибка: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.ok) {
                throw new Error(data.description);
            }
            resolve(data);
        })
        .catch(error => {
            console.error('Ошибка отправки сообщения:', error);
            reject(error);
        });
    });
}

window.sendMessage = sendMessage;
