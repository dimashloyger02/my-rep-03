// api/telegram/editMessageText.js

const TELEGRAM_BOT_TOKEN = '8318160592:AAFW70-IjNWu2vv5rdqpF_DMRzyed4mva0E';

export async function editMessageText(chatId, messageId, text) {
    // Валидация входных параметров
    if (typeof chatId !== 'string' || chatId.trim() === '') {
        throw new Error('Неверный chat_id');
    }
    if (typeof messageId !== 'number' || messageId <= 0) {
        throw new Error('Неверный message_id');
    }
    if (typeof text !== 'string' || text.trim() === '') {
        throw new Error('Неверный текст сообщения');
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    message_id: messageId,
                    text: text
                })
            }
        );

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.ok) {
            throw new Error(data.description);
        }
        
        return data;
    } 
    catch (error) {
        console.error('Ошибка редактирования сообщения:', error);
        throw error;
    }
}
