// api/telegram/sendMessage.js

const TELEGRAM_BOT_TOKEN = 'ВАШ_ТОКЕН'; // Не забудьте заменить на реальный токен

export async function sendMessage(chatId, text) {
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
