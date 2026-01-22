// api/telegram/sendMessage.js
const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

module.exports = async (req, res) => {
    try {
        const { chat_id, text } = req.query;
        
        // Валидация параметров
        if (!chat_id || !text) {
            return res.status(400).json({ error: 'Неверные параметры' });
        }

        // Отправка запроса через прокси
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: chat_id,
                text: text
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        res.status(500).json({ error: 'Произошла ошибка' });
    }
};
