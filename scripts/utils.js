// utils.js
let socket;

export function initWebSocket() {
    // Для Vercel лучше использовать относительный путь
    socket = new WebSocket('/ws');
    
    socket.onopen = () => {
        console.log('WebSocket connected');
    };
    
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    
    socket.onclose = () => {
        console.log('WebSocket closed');
        // Можно добавить автоматическую переподключение
    };
}

export function sendTelegramMessage(chat_id, text) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket не подключен');
    }
    
    socket.send(JSON.stringify({
        chat_id: chat_id,
        text: text
    }));
}
