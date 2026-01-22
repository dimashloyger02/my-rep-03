// utils.js
export function sendTelegramMessage(chat_id, text) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/sendMessage', true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(new Error('Ошибка сервера: ' + xhr.status));
                }
            }
        };

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`chat_id=${encodeURIComponent(chat_id)}&text=${encodeURIComponent(text)}`);
    });
}
