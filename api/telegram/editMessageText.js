// api/telegram/editMessageText.js

const TELEGRAM_BOT_TOKEN = 'ВАШ_ТОКЕН'; // Тот же токен, что и выше

export async function editMessageText(chatId, messageId, text) {
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
