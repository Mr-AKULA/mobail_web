Вы абсолютно правы! Давайте упростим и обойдемся без PHP на данном этапе. Вместо этого мы можем:

1. **Эмулировать сохранение** с помощью localStorage (данные будут сохраняться в браузере пользователя)
2. **Имитировать работу с файлом** через JS
3. **Сосредоточиться на фронтенд-части**, как и требуется в основном задании

Вот обновленная структура проекта:

```
personal-site/
│
├── index.html          # Главная страница
├── resume.html         # Резюме
├── hobbies.html        # Хобби и увлечения
├── photos.html         # Фотографии
├── contact.html        # Контакты
├── guestbook.html      # Обращения (гостевая книга)
│
├── css/
│   └── style.css       # Основные стили
│
├── js/
│   ├── main.js         # Основной JS (меню, анимации)
│   ├── news.js         # Загрузка новостей из текстового файла
│   ├── slideshow.js    # Слайд-шоу для фото
│   └── guestbook.js    # Сохранение обращений в localStorage
│
├── images/             # Изображения для сайта
│   ├── photos/         # Ваши фотографии
│   └── ui/             # Элементы интерфейса
│
└── data/
    └── news.txt        # Файл с новостями (только чтение)
```

## Реализация guestbook.js (сохранение обращений):

```javascript
// guestbook.js - Сохранение обращений в localStorage

document.addEventListener('DOMContentLoaded', function() {
    const guestbookForm = document.getElementById('guestbookForm');
    const messagesContainer = document.getElementById('guestbookMessages');
    
    if (!guestbookForm) return;
    
    // Загружаем сохраненные сообщения
    loadMessages();
    
    // Обработка отправки формы
    guestbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('guestName');
        const messageInput = document.getElementById('guestMessage');
        
        if (!nameInput.value.trim() || !messageInput.value.trim()) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Создаем объект сообщения
        const message = {
            id: Date.now(),
            name: nameInput.value.trim(),
            message: messageInput.value.trim(),
            date: new Date().toLocaleString('ru-RU')
        };
        
        // Сохраняем сообщение
        saveMessage(message);
        
        // Очищаем форму
        nameInput.value = '';
        messageInput.value = '';
        
        // Показываем уведомление
        showNotification('Ваше сообщение сохранено!');
    });
    
    // Функция сохранения сообщения в localStorage
    function saveMessage(message) {
        let messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
        messages.unshift(message); // Добавляем в начало
        
        // Сохраняем только последние 50 сообщений
        if (messages.length > 50) {
            messages = messages.slice(0, 50);
        }
        
        localStorage.setItem('guestbookMessages', JSON.stringify(messages));
        
        // Обновляем отображение
        displayMessage(message);
    }
    
    // Функция загрузки всех сообщений
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
        
        if (messages.length === 0) {
            messagesContainer.innerHTML = '<p class="no-messages">Пока нет сообщений. Будьте первым!</p>';
            return;
        }
        
        // Очищаем контейнер
        messagesContainer.innerHTML = '';
        
        // Отображаем все сообщения
        messages.forEach(message => {
            displayMessage(message);
        });
    }
    
    // Функция отображения одного сообщения
    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-card';
        messageElement.innerHTML = `
            <div class="message-header">
                <strong>${escapeHTML(message.name)}</strong>
                <span class="message-date">${message.date}</span>
            </div>
            <div class="message-body">
                ${escapeHTML(message.message)}
            </div>
        `;
        
        // Если контейнер пустой, удаляем сообщение "нет сообщений"
        if (messagesContainer.querySelector('.no-messages')) {
            messagesContainer.innerHTML = '';
        }
        
        // Добавляем новое сообщение в начало
        messagesContainer.prepend(messageElement);
    }
    
    // Функция для безопасного отображения текста
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Функция показа уведомления
    function showNotification(text) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = text;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Добавляем стили для уведомления
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        .notification.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
});
```

## Реализация news.js (загрузка новостей из файла):

```javascript
// news.js - Загрузка новостей из текстового файла

document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('newsContainer');
    
    if (!newsContainer) return;
    
    // Загружаем новости из файла
    loadNews();
    
    async function loadNews() {
        try {
            const response = await fetch('data/news.txt');
            
            if (!response.ok) {
                throw new Error('Файл с новостями не найден');
            }
            
            const text = await response.text();
            displayNews(text);
        } catch (error) {
            console.error('Ошибка загрузки новостей:', error);
            displayFallbackNews();
        }
    }
    
    function displayNews(newsText) {
        // Разделяем текст на отдельные новости
        const newsItems = newsText.split('---').filter(item => item.trim());
        
        if (newsItems.length === 0) {
            displayFallbackNews();
            return;
        }
        
        // Очищаем контейнер
        newsContainer.innerHTML = '';
        
        // Создаем элементы для каждой новости
        newsItems.forEach((item, index) => {
            const lines = item.trim().split('\n').filter(line => line.trim());
            
            if (lines.length === 0) return;
            
            const newsElement = document.createElement('div');
            newsElement.className = 'news-item';
            
            // Первая строка - заголовок, остальные - содержание
            const title = lines[0];
            const content = lines.slice(1).join('<br>');
            
            newsElement.innerHTML = `
                <h3>${title}</h3>
                <div class="news-content">${content}</div>
                <div class="news-date">${getRandomDate()}</div>
            `;
            
            // Добавляем анимацию задержки
            newsElement.style.animationDelay = `${index * 0.1}s`;
            
            newsContainer.appendChild(newsElement);
        });
    }
    
    function displayFallbackNews() {
        newsContainer.innerHTML = `
            <div class="news-item">
                <h3>Добро пожаловать на мой сайт!</h3>
                <div class="news-content">
                    Я только что запустил свой персональный сайт. Здесь будут появляться новости о моих проектах и достижениях.
                </div>
                <div class="news-date">Сегодня</div>
            </div>
            <div class="news-item">
                <h3>Изучаю веб-разработку</h3>
                <div class="news-content">
                    В настоящее время активно изучаю HTML, CSS и JavaScript. Этот сайт - один из моих учебных проектов.
                </div>
                <div class="news-date">Недавно</div>
            </div>
        `;
    }
    
    function getRandomDate() {
        const dates = [
            'Сегодня',
            'Вчера',
            '2 дня назад',
            'Неделю назад',
            '10 дней назад',
            '2 недели назад'
        ];
        return dates[Math.floor(Math.random() * dates.length)];
    }
});
```

## Содержимое файла data/news.txt:

```
Новый проект: Портфолио сайт
Завершил работу над своим персональным сайтом-портфолио.
Использовал современные технологии веб-разработки.
---
Изучение JavaScript
Продолжаю углублять знания в JavaScript.
Освоил работу с DOM, событиями и анимациями.
---
Участие в хакатоне
Принял участие в студенческом хакатоне по веб-разработке.
Наша команда заняла 3 место с проектом "Умное расписание".
---
Освоил CSS Grid и Flexbox
Теперь могу создавать сложные адаптивные макеты.
Эти технологии значительно упростили верстку.
---
Планы на будущее
Планирую изучить React.js и Node.js.
Хочу создавать полноценные веб-приложения.
```

## Преимущества этого подхода:

1. **Не требует серверной части** - все работает в браузере
2. **Соответствует заданию** - новости загружаются из файла, обращения сохраняются
3. **Простота реализации** - не нужны настройки PHP или сервера
4. **Портативность** - сайт можно открыть прямо с компьютера

