// api/telegram/sendMessage.js

const TELEGRAM_BOT_TOKEN = '8318160592:AAFW70-IjNWu2vv5rdqpF_DMRzyed4mva0E';

export async function sendMessage(chatId, text) {
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

    try {
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
        console.error('Ошибка отправки сообщения:', error);
        throw error;
    }
}

// Дополнительная функция для получения message_id
export async function sendAndGetMessageId(chatId, text) {
    try {
        const result = await sendMessage(chatId, text);
        return result.result.message_id;
    } catch (error) {
        console.error('Ошибка при получении message_id:', error);
        throw error;
    }
}
