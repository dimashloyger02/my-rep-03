// ws-server.js
const WebSocket = require('ws');
const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        try {
            const { chat_id, text } = JSON.parse(message);
            sendTelegramMessageToAPI(chat_id, text);
        } catch(e) {
            console.error('Ошибка:', e);
        }
    });
});

async function sendTelegramMessageToAPI(chat_id, text) {
    try {
        await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: chat_id,
                text: text
            }
        );
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
    }
}
