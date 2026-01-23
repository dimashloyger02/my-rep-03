// editMessageText.js
function editMessageText(chatId, messageId, text) {
    return new Promise((resolve, reject) => {
        fetch(
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
            console.error('Ошибка редактирования сообщения:', error);
            reject(error);
        });
    });
}

window.editMessageText = editMessageText;
