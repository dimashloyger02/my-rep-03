const TELEGRAM_BOT_TOKEN = '8318160592:AAFW70-IjNWu2vv5rdqpF_DMRzyed4mva0E';

function editMessageText(chatId, messageId, text) {
    return new Promise(async (resolve, reject) => {
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
            
            resolve(data);
        } 
        catch (error) {
            console.error('Ошибка редактирования сообщения:', error);
            reject(error);
        }
    });
}

window.editMessageText = editMessageText; // Делаем функцию доступной глобально
