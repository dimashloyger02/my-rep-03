const TELEGRAM_BOT_TOKEN = '8318160592:AAFW70-IjNWu2vv5rdqpF_DMRzyed4mva0E';

function sendMessage(chatId, text) {
    return new Promise(async (resolve, reject) => {
        try {
            // Валидация входных параметров
            if (typeof chatId !== 'string' || chatId.trim() === '') {
                throw new Error('Неверный chat_id');
            }
            if (typeof text !== 'string' || text.trim() === '') {
                throw new Error('Неверный текст сообщения');
            }
            if (text.length > 4096) {
                throw new Error('Текст сообщения слишком длинный (максимум 4096 символов)');
            }

            const response = await fetch(
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
            );

            if (!response.ok) {
                throw new Error(`HTTP ошибка: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.ok) {
                throw new Error(data.description);
            }
            
            resolve(data);
        } 
        catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            reject(error);
        }
    });
}

window.sendMessage = sendMessage; // Делаем функцию доступной глобально
