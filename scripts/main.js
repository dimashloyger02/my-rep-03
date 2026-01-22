// Константы
const STARS_TO_TON_RATE = 0.00936;
let currentFormat = true; // Формат отображения цен
let nftData = []; // Массив данных NFT

// URL для API
const API_URL = 'https://gist.githubusercontent.com/dimashloyger02/8b284087c457766cde58c64507cc9af3/raw/d0d42f9b7dee5e0d99b35174c673ce9998f3b978/nft-data.json';

// Модифицированная функция загрузки с индикатором
function loadData() {
    console.log('Загрузка данных...');
    
    const loadingIndicator = document.querySelector('.loading-indicator');
    loadingIndicator.style.display = 'block';
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);
    xhr.timeout = 12000; // Таймаут 12 секунд
    
    xhr.onreadystatechange = function() {
        loadingIndicator.style.display = 'none'; // Скрываем индикатор после загрузки
        
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    nftData = JSON.parse(this.responseText);
                    renderCards(nftData);
                } catch (error) {
                    console.error('Ошибка парсинга JSON:', error);
                }
            } else {
                console.error('Ошибка загрузки данных:', this.status, this.statusText);
            }
        }
    };
    
    xhr.onerror = function() {
        console.error('Произошла ошибка сети');
        loadingIndicator.style.display = 'none';
    };
    
    xhr.ontimeout = function() {
        console.error('Превышено время ожидания');
        loadingIndicator.style.display = 'none';
    };
    
    xhr.send();
}

// Сохранение данных
function saveData() {
    console.log('Сохранение данных...');
    localStorage.setItem('nftData', JSON.stringify(nftData));
}

// Создание карточки NFT
function createNFTCard(data) {
    const card = document.createElement('div');
    card.classList.add('nft-card');
    
    let priceText;
    if (currentFormat) {
        priceText = `Цена: ${data.price} Stars`;
    } else {
        const priceInTON = data.price * STARS_TO_TON_RATE;
        priceText = `Цена: ${priceInTON.toFixed(4)} TON`;
    }
    
    card.innerHTML = `
        <div class="nft-image">
            <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="nft-info">
            <div class="nft-title">
                <b>
                    <a class="nft-link" href="${data.linknft}" target="_blank">${data.title}</a>
                </b>
            </div>
            <div class="nft-id">ID: #${data.id}</div>
            <div class="nft-price">${priceText}</div>
            <div class="nft-owner">
                Владелец: 
                <a href="${data.ownerlink}" target="_blank">
                    ${data.nameowner}
                </a>
            </div>
        </div>
        <div class="nft-actions">
            <button class="btn-sell">Продать</button>
            <button class="btn-details">Подробнее</button>
        </div>
    `;
    
    return card;
}

// Отрисовка всех карточек
function renderCards(data) {
    console.log('Отрисовка карточек...');
    const container = document.querySelector('.nft-container');
    container.innerHTML = '';
    
    data.forEach(item => {
        const card = createNFTCard(item);
        container.appendChild(card);
    });
}

// Переключение формата цен
function togglePriceFormat(format) {
    console.log('Переключение формата...');
    currentFormat = format;
    renderCards(nftData);
}

// Обработка продажи
function handleSell(nft) {
    // Проверяем статус еще раз перед продажей
    if (nft.status === 'active') {
        // Меняем статус на "sold"
        nft.status = 'sold';
        
        // Обновляем отображение карточек
        renderCards(nftData);
        
        // Показываем уведомление
        alert('NFT успешно продан!');
        
        // Здесь можно добавить:
        // - отправку данных на сервер
        // - обновление баланса
        // - запись в историю транзакций
    } else {
        console.error('Невозможно продать NFT с текущим статусом');
    }
}

// Отображение деталей
function showDetails(nftId) {
    const nft = nftData.find(item => item.id === parseInt(nftId));
    if (nft) {
        alert(`Детали NFT:\n\nНазвание: ${nft.title}\nЦена: ${nft.price} Stars\nВладелец: ${nft.nameowner}\nСсылка: ${nft.linknft}`);
    }
}

// Сортировка данных
function sortData(data, sortType) {
    console.log('Сортировка данных...');
    switch(sortType) {
        case 'price-asc':
            return data.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return data.sort((a, b) => b.price - a.price);
        case 'id-asc':
            return data.sort((a, b) => a.id - b.id);
        case 'id-desc':
            return data.sort((a, b) => b.id - a.id);
        default:
            return data;
    }
}

// Инициализация событий
function initEvents() {
    console.log('Инициализация событий...');
    
    // Обработчик для формата цен
    const priceControls = document.querySelector('.price-format-controls');
    if (priceControls) {
        priceControls.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const showStars = e.target.textContent.includes('Stars');
                togglePriceFormat(showStars);
            }
        });
    }
    
    // Обработчик для сортировки
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortedData = sortData(nftData, sortSelect.value);
            renderCards(sortedData);
        });
    }
    
    // Обработчик для карточек
    document.addEventListener('click', handleClicks);
}

// Обработка кликов
function handleClicks(event) {
    console.log('Обработка клика...');
    
    // Продажа NFT
    if (event.target.classList.contains('btn-sell')) {
        const card = event.target.closest('.nft-card');
        if (card) {
            const nftId = card.querySelector('.nft-id').innerText.split('#')[1];
            showSellModal(nftId);
        }
    }
    
    // Детали NFT
    if (event.target.classList.contains('btn-details')) {
        const card = event.target.closest('.nft-card');
        if (card) {
            const nftId = card.querySelector('.nft-id').innerText.split('#')[1];
            showDetails(nftId);
        }
    }
}

// Модальное окно продажи
function showSellModal(nftId) {
    console.log('Открытие окна продажи...');
    const nft = nftData.find(item => item.id === parseInt(nftId));
    
    if (!nft) {
        console.error('NFT не найден');
        return;
    }
    
    if (nft.status !== 'active') {
        alert('Этот NFT нельзя продать');
        return;
    }
    
    const result = confirm(`Вы хотите продать:\n\nНазвание: ${nft.title}\nЦена: ${nft.price} Stars\nID: #${nft.id}`);
    if (result) {
        handleSell(nft);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadData(); // Загружаем данные
    initEvents(); // Инициализируем события
});

// Подключение необходимых модулей
import { initWebSocket } from './utils';
import { sendTelegramMessage } from './utils';

// Инициализация WebSocket при загрузке приложения
window.addEventListener('DOMContentLoaded', () => {
    initWebSocket();
});

// Пример использования отправки сообщения
// Этот код можно поместить в обработчик события (например, клик на кнопку)
document.addEventListener('DOMContentLoaded', () => {
    const sellButton = document.querySelector('.sell-button');
    
    if (sellButton) {
        sellButton.addEventListener('click', () => {
            try {
                // Здесь указываете реальный chat_id и текст сообщения
                sendTelegramMessage('ВАШ_ID_ЧАТА', 'NFT выставлен на продажу!');
            } catch (error) {
                console.error('Ошибка при отправке сообщения:', error);
            }
        });
    }
});
