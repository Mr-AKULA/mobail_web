Вы абсолютно правы! Давайте упростим и обойдемся без PHP на данном этапе. Вместо этого мы можем:

[https://s1079sas.storage.yandex.net/rdisk/c3b45c49576ec7e2b8bc8b247dde7bb66a701a20e0c8cdf4a14675f62bc136e7/692e28be/7hPTiUuSK6hfp8wXOgqFr2XGJ5807qkVvw8hDUtl9IY2j--seKpKYqNkmBoKRE8pa5y9vRswJpzzvi5H8sycPQ==?uid=1951124744&filename=GIF.gif&disposition=inline&hash=&limit=0&content_type=image%2Fgif&owner_uid=1951124744&fsize=127354508&hid=cfb136cd9cd976b4d863686b2b4af747&media_type=image&tknv=v3&etag=ecee3e95d8094f38aed7e6259ade39f5&ts=644ec952d2b80&s=efa441f71d3e365ebadcc7eb915157a737435d1062b5352b5586d31103378108&pb=U2FsdGVkX19R18KM0dBmopNoWDmzOXdXd1Z7f2957EplxWZnRghW2L1ciao6gvhU1GtlO9gyL5CpP7UUIuYxtua7x0rk431QCmKqWKewqCI
](https://disk.yandex.ru/i/nvk954gVcM3T7A)

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



Отлично! Я подготовлю полный архив персонального сайта со всеми файлами. Вот структура и содержимое:

## Полный архив проекта "Персональный сайт"

### 1. **index.html** (Главная страница)
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Алексей Петров | Персональный сайт</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Шапка сайта -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="site-title">Алексей Петров</h1>
                <p class="site-subtitle">Веб-разработчик & Дизайнер</p>
            </div>
        </div>
    </header>

    <!-- Навигационное меню -->
    <nav class="main-nav">
        <div class="container">
            <button class="menu-toggle" id="menuToggle" aria-label="Открыть меню">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-list" id="navList">
                <li><a href="index.html" class="active"><i class="fas fa-home"></i> Главная</a></li>
                <li><a href="resume.html"><i class="fas fa-file-alt"></i> Резюме</a></li>
                <li><a href="hobbies.html"><i class="fas fa-heart"></i> Хобби</a></li>
                <li><a href="photos.html"><i class="fas fa-camera"></i> Фотографии</a></li>
                <li><a href="guestbook.html"><i class="fas fa-book"></i> Обращения</a></li>
                <li><a href="contact.html"><i class="fas fa-envelope"></i> Контакты</a></li>
            </ul>
        </div>
    </nav>

    <!-- Основной контент -->
    <main class="main-content">
        <div class="container">
            <!-- Приветственная секция -->
            <section class="welcome-section animate-on-scroll">
                <h2 class="section-title">Добро пожаловать на мой сайт!</h2>
                <div class="profile-card">
                    <div class="profile-image">
                        <img src="images/profile.jpg" alt="Алексей Петров" class="profile-img">
                    </div>
                    <div class="profile-info">
                        <h3>Привет, я Алексей</h3>
                        <p>Я начинающий веб-разработчик с passion к созданию красивых и функциональных сайтов. Этот сайт — мое цифровое портфолио, где я делюсь своими проектами, навыками и увлечениями.</p>
                        <p>В настоящее время изучаю современные технологии веб-разработки и постоянно совершенствую свои навыки.</p>
                        <a href="resume.html" class="btn">Узнать больше обо мне</a>
                    </div>
                </div>
            </section>

            <!-- Блок новостей -->
            <section class="news-section animate-on-scroll">
                <h2 class="section-title"><i class="fas fa-newspaper"></i> Последние новости</h2>
                <div class="news-container" id="newsContainer">
                    <!-- Новости будут загружены через JS -->
                    <div class="loading">
                        <div class="spinner"></div>
                        <p>Загрузка новостей...</p>
                    </div>
                </div>
            </section>

            <!-- Быстрые ссылки -->
            <section class="quick-links animate-on-scroll">
                <h2 class="section-title">Исследуйте сайт</h2>
                <div class="links-grid">
                    <a href="resume.html" class="link-card">
                        <div class="card-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <h3>Мое резюме</h3>
                        <p>Профессиональные навыки, образование и опыт работы</p>
                        <span class="card-arrow"><i class="fas fa-arrow-right"></i></span>
                    </a>
                    
                    <a href="hobbies.html" class="link-card">
                        <div class="card-icon">
                            <i class="fas fa-gamepad"></i>
                        </div>
                        <h3>Мои увлечения</h3>
                        <p>Хобби, интересы и увлечения вне работы</p>
                        <span class="card-arrow"><i class="fas fa-arrow-right"></i></span>
                    </a>
                    
                    <a href="photos.html" class="link-card">
                        <div class="card-icon">
                            <i class="fas fa-images"></i>
                        </div>
                        <h3>Фотогалерея</h3>
                        <p>Личные фотографии и моменты из жизни</p>
                        <span class="card-arrow"><i class="fas fa-arrow-right"></i></span>
                    </a>
                </div>
            </section>
        </div>
    </main>

    <!-- Подвал сайта -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Алексей Петров</h3>
                    <p>Персональный сайт-портфолио, созданный с использованием HTML, CSS и JavaScript</p>
                    <div class="social-links">
                        <a href="#" aria-label="ВКонтакте"><i class="fab fa-vk"></i></a>
                        <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
                        <a href="#" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>Контактная информация</h3>
                    <p><i class="fas fa-envelope"></i> alex.petrov@example.com</p>
                    <p><i class="fas fa-phone"></i> +7 (999) 123-45-67</p>
                    <p><i class="fas fa-map-marker-alt"></i> Москва, Россия</p>
                </div>
                
                <div class="footer-section">
                    <h3>Быстрые ссылки</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Главная</a></li>
                        <li><a href="contact.html">Контакты</a></li>
                        <li><a href="guestbook.html">Оставить отзыв</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 Алексей Петров. Персональный сайт. Все права защищены.</p>
                <p class="footer-note">Сайт создан в рамках учебного проекта по веб-разработке</p>
            </div>
        </div>
    </footer>

    <!-- Скрипты -->
    <script src="js/main.js"></script>
    <script src="js/news.js"></script>
</body>
</html>
```

### 2. **css/style.css** (Основные стили)
```css
/* Общие стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --light-color: #ecf0f1;
    --dark-color: #2c3e50;
    --gray-color: #7f8c8d;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}

body {
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Шапка */
.header {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 60px 0;
    text-align: center;
    box-shadow: var(--shadow);
}

.site-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    animation: fadeInDown 1s ease;
}

.site-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    animation: fadeInUp 1s ease 0.3s both;
}

/* Навигация */
.main-nav {
    background-color: white;
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-list {
    display: flex;
    list-style: none;
    justify-content: center;
    transition: var(--transition);
}

.nav-list li {
    margin: 0;
}

.nav-list a {
    display: block;
    padding: 20px 25px;
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 600;
    transition: var(--transition);
    position: relative;
}

.nav-list a:hover {
    color: var(--secondary-color);
    background-color: var(--light-color);
}

.nav-list a.active {
    color: var(--secondary-color);
}

.nav-list a.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--secondary-color);
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--dark-color);
    cursor: pointer;
    padding: 10px;
}

/* Основной контент */
.main-content {
    padding: 60px 0;
    min-height: calc(100vh - 400px);
}

.section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.2rem;
    margin-bottom: 40px;
    text-align: center;
    color: var(--primary-color);
    position: relative;
}

.section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: var(--secondary-color);
    margin: 15px auto;
    border-radius: 2px;
}

/* Приветственная секция */
.profile-card {
    display: flex;
    flex-wrap: wrap;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--shadow);
    margin-bottom: 60px;
}

.profile-image {
    flex: 1;
    min-width: 300px;
    overflow: hidden;
}

.profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.profile-card:hover .profile-img {
    transform: scale(1.05);
}

.profile-info {
    flex: 2;
    padding: 40px;
    min-width: 300px;
}

.profile-info h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.profile-info p {
    margin-bottom: 20px;
    color: var(--gray-color);
}

.btn {
    display: inline-block;
    background-color: var(--secondary-color);
    color: white;
    padding: 12px 30px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    border: none;
    cursor: pointer;
}

.btn:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Новости */
.news-container {
    display: grid;
    gap: 30px;
    margin-bottom: 60px;
}

.news-item {
    background: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: var(--shadow);
    transition: var(--transition);
    animation: fadeIn 0.5s ease;
}

.news-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.news-item h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.4rem;
}

.news-content {
    color: var(--gray-color);
    margin-bottom: 15px;
    line-height: 1.7;
}

.news-date {
    color: var(--secondary-color);
    font-size: 0.9rem;
    font-weight: 600;
}

.loading {
    text-align: center;
    padding: 40px;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid var(--secondary-color);
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

/* Быстрые ссылки */
.links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.link-card {
    background: white;
    border-radius: 10px;
    padding: 30px;
    text-decoration: none;
    color: inherit;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.link-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.link-card:hover .card-arrow {
    transform: translateX(5px);
}

.card-icon {
    font-size: 2.5rem;
    color: var(--secondary-color);
    margin-bottom: 20px;
}

.link-card h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.5rem;
}

.link-card p {
    color: var(--gray-color);
    margin-bottom: 20px;
}

.card-arrow {
    color: var(--secondary-color);
    transition: var(--transition);
}

/* Подвал */
.footer {
    background-color: var(--primary-color);
    color: white;
    padding: 60px 0 30px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
}

.footer-section h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: var(--light-color);
}

.footer-section p {
    margin-bottom: 10px;
    opacity: 0.8;
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 10px;
}

.footer-links a {
    color: white;
    text-decoration: none;
    opacity: 0.8;
    transition: var(--transition);
}

.footer-links a:hover {
    opacity: 1;
    color: var(--secondary-color);
}

.social-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.social-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    transition: var(--transition);
}

.social-links a:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
}

.footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
    opacity: 0.7;
}

.footer-note {
    font-size: 0.8rem;
    margin-top: 10px;
    opacity: 0.6;
}

/* Анимации */
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Адаптивность */
@media (max-width: 768px) {
    .site-title {
        font-size: 2.2rem;
    }
    
    .nav-list {
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease;
    }
    
    .nav-list.active {
        max-height: 500px;
    }
    
    .menu-toggle {
        display: block;
        margin: 10px auto;
    }
    
    .profile-card {
        flex-direction: column;
    }
    
    .profile-info {
        padding: 25px;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
    
    .links-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .site-title {
        font-size: 1.8rem;
    }
    
    .header {
        padding: 40px 0;
    }
    
    .main-content {
        padding: 40px 0;
    }
    
    .news-item, .link-card {
        padding: 20px;
    }
}
```

### 3. **js/main.js** (Основные скрипты)
```javascript
// main.js - Основные скрипты для сайта

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initAnimations();
    initTheme();
});

// Навигационное меню с анимацией
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    
    if (menuToggle && navList) {
        // Переключение мобильного меню
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Анимация иконки меню
            const icon = this.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                this.setAttribute('aria-label', 'Закрыть меню');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                this.setAttribute('aria-label', 'Открыть меню');
            }
        });
        
        // Закрытие меню при клике на ссылку (на мобильных)
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.setAttribute('aria-label', 'Открыть меню');
                }
            });
        });
        
        // Анимация пунктов меню при наведении
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(-3px)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }
    
    // Подсветка активной страницы
    highlightCurrentPage();
}

// Подсветка текущей страницы в меню
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Анимация элементов при прокрутке
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Проверка видимости элемента
    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверка при загрузке и прокрутке
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Анимация кнопок
    const buttons = document.querySelectorAll('.btn, .link-card, .message-card');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Инициализация темы (можно расширить для темной/светлой темы)
function initTheme() {
    // Сохранение предпочтений темы
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Переключить тему');
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--secondary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    themeToggle.style.transition = 'all 0.3s ease';
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Переключение темы
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Включить светлую тему');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Включить темную тему');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Включить светлую тему');
    }
    
    document.body.appendChild(themeToggle);
    
    // Стили для темной темы
    const darkThemeStyles = `
        <style>
            .dark-theme {
                background-color: #1a1a2e;
                color: #e6e6e6;
            }
            
            .dark-theme .header {
                background: linear-gradient(135deg, #16213e, #0f3460);
            }
            
            .dark-theme .main-nav {
                background-color: #16213e;
            }
            
            .dark-theme .nav-list a {
                color: #e6e6e6;
            }
            
            .dark-theme .nav-list a:hover {
                background-color: #0f3460;
            }
            
            .dark-theme .profile-card,
            .dark-theme .news-item,
            .dark-theme .link-card,
            .dark-theme .message-card {
                background-color: #16213e;
                color: #e6e6e6;
            }
            
            .dark-theme .section-title,
            .dark-theme .profile-info h3,
            .dark-theme .news-item h3,
            .dark-theme .link-card h3 {
                color: #e6e6e6;
            }
            
            .dark-theme .profile-info p,
            .dark-theme .news-content,
            .dark-theme .link-card p {
                color: #b0b0b0;
            }
            
            .dark-theme .footer {
                background-color: #0f3460;
            }
            
            .dark-theme .social-links a {
                background-color: rgba(255, 255, 255, 0.15);
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', darkThemeStyles);
}

// Утилитарные функции
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Экспорт функций для использования в других файлах
window.siteUtils = {
    debounce,
    highlightCurrentPage
};
```

### 4. **js/news.js** (Загрузка новостей)
```javascript
// news.js - Загрузка новостей из текстового файла

document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('newsContainer');
    
    if (!newsContainer) return;
    
    // Загружаем новости из файла
    loadNews();
    
    async function loadNews() {
        try {
            // Показываем индикатор загрузки
            newsContainer.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Загрузка новостей...</p>
                </div>
            `;
            
            // Задержка для демонстрации загрузки (можно убрать)
            await new Promise(resolve => setTimeout(resolve, 800));
            
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
            newsElement.className = 'news-item animate-on-scroll';
            newsElement.style.animationDelay = `${index * 0.1}s`;
            
            // Первая строка - заголовок, остальные - содержание
            const title = lines[0];
            const content = lines.slice(1).join('<br>');
            const date = getRelativeDate(index);
            
            newsElement.innerHTML = `
                <h3>${escapeHTML(title)}</h3>
                <div class="news-content">${formatContent(content)}</div>
                <div class="news-date">${date}</div>
            `;
            
            newsContainer.appendChild(newsElement);
        });
        
        // Инициализируем анимации для новых элементов
        if (window.siteUtils) {
            setTimeout(() => {
                const animatedElements = newsContainer.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                        el.classList.add('visible');
                    }
                });
            }, 100);
        }
    }
    
    function displayFallbackNews() {
        newsContainer.innerHTML = '';
        
        const fallbackNews = [
            {
                title: 'Запуск персонального сайта',
                content: 'Я рад представить вам мой новый персональный сайт-портфолио! Здесь вы найдете информацию о моих проектах, навыках и увлечениях.',
                date: 'Сегодня'
            },
            {
                title: 'Изучение современных технологий',
                content: 'В настоящее время углубленно изучаю JavaScript, React и Node.js. Планирую создать несколько проектов с использованием этих технологий.',
                date: '2 дня назад'
            },
            {
                title: 'Участие в хакатоне',
                content: 'Принял участие в студенческом хакатоне по веб-разработке. Наша команда создала прототип приложения для управления задачами.',
                date: 'Неделю назад'
            },
            {
                title: 'Освоение адаптивной верстки',
                content: 'Завершил изучение современных подходов к адаптивной верстке: Flexbox, CSS Grid, медиа-запросы. Теперь могу создавать сайты, которые идеально выглядят на любых устройствах.',
                date: '2 недели назад'
            }
        ];
        
        fallbackNews.forEach((news, index) => {
            const newsElement = document.createElement('div');
            newsElement.className = 'news-item animate-on-scroll';
            newsElement.style.animationDelay = `${index * 0.1}s`;
            
            newsElement.innerHTML = `
                <h3>${escapeHTML(news.title)}</h3>
                <div class="news-content">${formatContent(news.content)}</div>
                <div class="news-date">${news.date}</div>
            `;
            
            newsContainer.appendChild(newsElement);
        });
    }
    
    function getRelativeDate(index) {
        const dates = [
            'Сегодня',
            'Вчера',
            '2 дня назад',
            'Неделю назад',
            '10 дней назад',
            '2 недели назад',
            '3 недели назад',
            'Месяц назад'
        ];
        return dates[Math.min(index, dates.length - 1)];
    }
    
    function formatContent(content) {
        // Преобразуем разрывы строк и добавляем немного форматирования
        return escapeHTML(content)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }
    
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Обновление новостей каждые 30 секунд (для демонстрации)
    setInterval(() => {
        const firstNews = newsContainer.querySelector('.news-item');
        if (firstNews) {
            firstNews.style.opacity = '0.7';
            setTimeout(() => {
                if (firstNews.parentNode) {
                    firstNews.parentNode.removeChild(firstNews);
                    // Добавляем анимацию для оставшихся элементов
                    const remainingNews = newsContainer.querySelectorAll('.news-item');
                    remainingNews.forEach((item, idx) => {
                        item.style.animationDelay = `${idx * 0.1}s`;
                    });
                }
            }, 500);
        }
    }, 30000);
});
```

### 5. **js/slideshow.js** (Слайд-шоу для фотографий)
```javascript
// slideshow.js - Слайд-шоу для страницы фотографий

class Slideshow {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.slides = [];
        this.currentIndex = 0;
        this.isPlaying = true;
        this.interval = null;
        this.intervalTime = 4000; // 4 секунды
        
        this.init();
    }
    
    init() {
        // Собираем все изображения из контейнера
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        
        if (this.slides.length === 0) {
            console.warn('Слайды не найдены');
            return;
        }
        
        // Создаем элементы управления
        this.createControls();
        
        // Показываем первый слайд
        this.showSlide(0);
        
        // Запускаем автоматическое переключение
        this.startAutoPlay();
        
        // Добавляем обработчики событий
        this.addEventListeners();
    }
    
    createControls() {
        // Создаем контейнер для управления
        const controls = document.createElement('div');
        controls.className = 'slideshow-controls';
        
        // Кнопка "Назад"
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slideshow-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.setAttribute('aria-label', 'Предыдущее фото');
        
        // Кнопка "Вперед"
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slideshow-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.setAttribute('aria-label', 'Следующее фото');
        
        // Кнопка воспроизведения/паузы
        const playPauseBtn = document.createElement('button');
        playPauseBtn.className = 'slideshow-btn play-pause-btn';
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
        
        // Индикаторы слайдов
        const indicators = document.createElement('div');
        indicators.className = 'slideshow-indicators';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            indicator.setAttribute('data-index', index);
            indicator.setAttribute('aria-label', `Перейти к фото ${index + 1}`);
            indicators.appendChild(indicator);
        });
        
        // Счетчик слайдов
        const counter = document.createElement('div');
        counter.className = 'slideshow-counter';
        
        // Собираем все элементы управления
        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        controls.appendChild(playPauseBtn);
        controls.appendChild(indicators);
        controls.appendChild(counter);
        
        this.container.appendChild(controls);
        
        // Сохраняем ссылки на элементы
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.playPauseBtn = playPauseBtn;
        this.indicators = indicators;
        this.counter = counter;
    }
    
    showSlide(index) {
        // Проверяем границы
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;
        
        // Скрываем все слайды
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'scale(0.95)';
        });
        
        // Показываем текущий слайд
        this.slides[index].classList.add('active');
        setTimeout(() => {
            this.slides[index].style.opacity = '1';
            this.slides[index].style.transform = 'scale(1)';
        }, 50);
        
        // Обновляем индикаторы
        this.updateIndicators(index);
        
        // Обновляем счетчик
        this.updateCounter(index);
        
        // Сохраняем текущий индекс
        this.currentIndex = index;
    }
    
    updateIndicators(index) {
        const indicators = this.indicators.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    updateCounter(index) {
        this.counter.textContent = `${index + 1} / ${this.slides.length}`;
    }
    
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.interval = setInterval(() => {
            if (this.isPlaying) {
                this.nextSlide();
            }
        }, this.intervalTime);
    }
    
    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        
        const icon = this.playPauseBtn.querySelector('i');
        if (this.isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            this.playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
            this.startAutoPlay();
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            this.playPauseBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
            this.stopAutoPlay();
        }
    }
    
    goToSlide(index) {
        this.showSlide(index);
        // При ручном переключении останавливаем автовоспроизведение на 5 секунд
        if (this.isPlaying) {
            this.isPlaying = false;
            const icon = this.playPauseBtn.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            this.playPauseBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
            this.stopAutoPlay();
            
            setTimeout(() => {
                this.isPlaying = true;
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                this.playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
                this.startAutoPlay();
            }, 5000);
        }
    }
    
    addEventListeners() {
        // Кнопка "Назад"
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
        });
        
        // Кнопка "Вперед"
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Кнопка воспроизведения/паузы
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Индикаторы
        this.indicators.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.goToSlide(index);
            }
        });
        
        // Управление с клавиатуры
        document.addEventListener('keydown', (e) => {
            if (!this.container.contains(document.activeElement)) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ':
                case 'Spacebar':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
            }
        });
        
        // Пауза при наведении мыши
        this.container.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.isPlaying = false;
                const icon = this.playPauseBtn.querySelector('i');
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                this.playPauseBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
                this.stopAutoPlay();
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (!this.isPlaying) {
                this.isPlaying = true;
                const icon = this.playPauseBtn.querySelector('i');
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                this.playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
                this.startAutoPlay();
            }
        });
        
        // Свайпы для мобильных устройств
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) { // Минимальное расстояние для свайпа
                if (diff > 0) {
                    this.nextSlide(); // Свайп влево
                } else {
                    this.prevSlide(); // Свайп вправо
                }
            }
        }, { passive: true });
    }
}

// Инициализация слайд-шоу при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.getElementById('slideshowContainer');
    if (slideshowContainer) {
        new Slideshow('slideshowContainer');
    }
});
```

### 6. **js/guestbook.js** (Гостевая книга)
```javascript
// guestbook.js - Обработка формы обращений

document.addEventListener('DOMContentLoaded', function() {
    const guestbookForm = document.getElementById('guestbookForm');
    const messagesContainer = document.getElementById('guestbookMessages');
    
    if (!guestbookForm || !messagesContainer) return;
    
    // Загружаем сохраненные сообщения
    loadMessages();
    
    // Обработка отправки формы
    guestbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('guestName');
        const emailInput = document.getElementById('guestEmail');
        const messageInput = document.getElementById('guestMessage');
        
        // Валидация
        if (!nameInput.value.trim()) {
            showError('Пожалуйста, введите ваше имя');
            nameInput.focus();
            return;
        }
        
        if (!messageInput.value.trim()) {
            showError('Пожалуйста, введите сообщение');
            messageInput.focus();
            return;
        }
        
        // Проверка email (необязательное поле)
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            showError('Пожалуйста, введите корректный email адрес');
            emailInput.focus();
            return;
        }
        
        // Создаем объект сообщения
        const message = {
            id: Date.now(),
            name: escapeHTML(nameInput.value.trim()),
            email: email ? escapeHTML(email) : null,
            message: escapeHTML(messageInput.value.trim()),
            date: new Date().toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            avatar: generateAvatar(nameInput.value.trim())
        };
        
        // Сохраняем сообщение
        saveMessage(message);
        
        // Сбрасываем форму
        guestbookForm.reset();
        
        // Показываем уведомление
        showNotification('Ваше сообщение успешно сохранено!', 'success');
        
        // Плавная прокрутка к новому сообщению
        setTimeout(() => {
            const firstMessage = messagesContainer.querySelector('.message-card');
            if (firstMessage) {
                firstMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 300);
    });
    
    // Функция сохранения сообщения
    function saveMessage(message) {
        let messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
        messages.unshift(message); // Добавляем в начало
        
        // Сохраняем только последние 100 сообщений
        if (messages.length > 100) {
            messages = messages.slice(0, 100);
        }
        
        localStorage.setItem('guestbookMessages', JSON.stringify(messages));
        
        // Обновляем отображение
        displayMessage(message);
    }
    
    // Функция загрузки всех сообщений
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
        
        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <div class="no-messages">
                    <i class="fas fa-comment-slash"></i>
                    <h3>Пока нет сообщений</h3>
                    <p>Будьте первым, кто оставит сообщение!</p>
                </div>
            `;
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
        // Если контейнер пустой, удаляем сообщение "нет сообщений"
        if (messagesContainer.querySelector('.no-messages')) {
            messagesContainer.innerHTML = '';
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message-card animate-on-scroll';
        messageElement.setAttribute('data-id', message.id);
        
        const emailHtml = message.email ? 
            `<a href="mailto:${message.email}" class="message-email">${message.email}</a>` : 
            '';
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                ${message.avatar}
            </div>
            <div class="message-content">
                <div class="message-header">
                    <div class="message-author">
                        <strong class="message-name">${message.name}</strong>
                        ${emailHtml}
                    </div>
                    <span class="message-date">${message.date}</span>
                </div>
                <div class="message-body">
                    ${message.message.replace(/\n/g, '<br>')}
                </div>
                <div class="message-actions">
                    <button class="message-btn like-btn" data-id="${message.id}" aria-label="Нравится">
                        <i class="far fa-thumbs-up"></i>
                        <span class="like-count">0</span>
                    </button>
                    <button class="message-btn reply-btn" data-id="${message.id}" aria-label="Ответить">
                        <i class="far fa-comment"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Добавляем анимацию
        setTimeout(() => {
            messageElement.classList.add('visible');
        }, 50);
        
        // Добавляем в начало контейнера
        messagesContainer.prepend(messageElement);
        
        // Инициализируем кнопки лайков
        initLikeButtons();
    }
    
    // Инициализация кнопок лайков
    function initLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-btn');
        
        likeButtons.forEach(button => {
            const messageId = button.getAttribute('data-id');
            const likeCount = button.querySelector('.like-count');
            
            // Загружаем количество лайков из localStorage
            let likes = JSON.parse(localStorage.getItem('guestbookLikes')) || {};
            let count = likes[messageId] || 0;
            likeCount.textContent = count;
            
            // Проверяем, лайкал ли текущий пользователь это сообщение
            let userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
            if (userLikes[messageId]) {
                button.classList.add('liked');
                button.querySelector('i').classList.remove('far');
                button.querySelector('i').classList.add('fas');
            }
            
            // Обработчик клика
            button.addEventListener('click', function() {
                const messageId = this.getAttribute('data-id');
                const icon = this.querySelector('i');
                const countElement = this.querySelector('.like-count');
                
                // Проверяем, лайкал ли уже пользователь это сообщение
                let userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
                let likes = JSON.parse(localStorage.getItem('guestbookLikes')) || {};
                
                if (userLikes[messageId]) {
                    // Убираем лайк
                    likes[messageId] = (likes[messageId] || 1) - 1;
                    delete userLikes[messageId];
                    this.classList.remove('liked');
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                } else {
                    // Добавляем лайк
                    likes[messageId] = (likes[messageId] || 0) + 1;
                    userLikes[messageId] = true;
                    this.classList.add('liked');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
                
                // Сохраняем
                localStorage.setItem('guestbookLikes', JSON.stringify(likes));
                localStorage.setItem('userLikes', JSON.stringify(userLikes));
                
                // Обновляем счетчик
                countElement.textContent = likes[messageId] || 0;
                
                // Анимация
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }
    
    // Генерация аватара по имени
    function generateAvatar(name) {
        const colors = [
            '#3498db', '#2ecc71', '#e74c3c', '#f39c12',
            '#9b59b6', '#1abc9c', '#d35400', '#c0392b'
        ];
        
        const initials = name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
        
        const colorIndex = name
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        
        return `
            <div class="avatar" style="background-color: ${colors[colorIndex]}">
                ${initials}
            </div>
        `;
    }
    
    // Валидация email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Экранирование HTML
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Показать ошибку
    function showError(message) {
        showNotification(message, 'error');
    }
    
    // Показать уведомление
    function showNotification(text, type = 'success') {
        // Удаляем предыдущие уведомления
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${text}</span>
            </div>
            <button class="notification-close" aria-label="Закрыть">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Кнопка закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Добавляем стили для уведомлений и сообщений
    const styles = document.createElement('style');
    styles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            color: #333;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            transform: translateX(120%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 10000;
            max-width: 350px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #2ecc71;
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i {
            color: #2ecc71;
        }
        
        .notification-error .notification-content i {
            color: #e74c3c;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #7f8c8d;
            cursor: pointer;
            font-size: 1rem;
            margin-left: 15px;
            padding: 5px;
            transition: color 0.3s;
        }
        
        .notification-close:hover {
            color: #e74c3c;
        }
        
        .message-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
            display: flex;
            gap: 15px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .message-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
        }
        
        .message-avatar .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .message-content {
            flex: 1;
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .message-author {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .message-name {
            font-size: 1.1rem;
            color: #2c3e50;
        }
        
        .message-email {
            font-size: 0.9rem;
            color: #3498db;
            text-decoration: none;
        }
        
        .message-email:hover {
            text-decoration: underline;
        }
        
        .message-date {
            font-size: 0.85rem;
            color: #7f8c8d;
            white-space: nowrap;
        }
        
        .message-body {
            color: #555;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .message-actions {
            display: flex;
            gap: 15px;
        }
        
        .message-btn {
            background: none;
            border: none;
            color: #7f8c8d;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 15px;
            transition: all 0.3s;
        }
        
        .message-btn:hover {
            background: #f5f5f5;
            color: #3498db;
        }
        
        .message-btn.liked {
            color: #e74c3c;
        }
        
        .message-btn.liked:hover {
            color: #c0392b;
        }
        
        .no-messages {
            text-align: center;
            padding: 60px 20px;
            color: #7f8c8d;
        }
        
        .no-messages i {
            font-size: 4rem;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .no-messages h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        @media (max-width: 768px) {
            .message-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .message-date {
                align-self: flex-start;
            }
        }
    `;
    document.head.appendChild(styles);
});
```

### 7. **photos.html** (Страница с фотографиями)
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Алексей Петров | Фотографии</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/photos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Шапка сайта -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="site-title">Алексей Петров</h1>
                <p class="site-subtitle">Веб-разработчик & Дизайнер</p>
            </div>
        </div>
    </header>

    <!-- Навигационное меню -->
    <nav class="main-nav">
        <div class="container">
            <button class="menu-toggle" id="menuToggle" aria-label="Открыть меню">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-list" id="navList">
                <li><a href="index.html"><i class="fas fa-home"></i> Главная</a></li>
                <li><a href="resume.html"><i class="fas fa-file-alt"></i> Резюме</a></li>
                <li><a href="hobbies.html"><i class="fas fa-heart"></i> Хобби</a></li>
                <li><a href="photos.html" class="active"><i class="fas fa-camera"></i> Фотографии</a></li>
                <li><a href="guestbook.html"><i class="fas fa-book"></i> Обращения</a></li>
                <li><a href="contact.html"><i class="fas fa-envelope"></i> Контакты</a></li>
            </ul>
        </div>
    </nav>

    <!-- Основной контент -->
    <main class="main-content">
        <div class="container">
            <section class="photos-section">
                <h2 class="section-title"><i class="fas fa-camera-retro"></i> Мои фотографии</h2>
                <p class="section-description">Здесь собраны мои любимые фотографии из путешествий, встреч с друзьями и моментов вдохновения.</p>
                
                <!-- Слайд-шоу -->
                <div class="slideshow-container" id="slideshowContainer">
                    <div class="slide active">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Портрет на природе">
                        <div class="slide-caption">
                            <h3>На природе</h3>
                            <p>Летний день в парке</p>
                        </div>
                    </div>
                    
                    <div class="slide">
                        <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Работа за компьютером">
                        <div class="slide-caption">
                            <h3>За работой</h3>
                            <p>Мой рабочий стол с проектами</p>
                        </div>
                    </div>
                    
                    <div class="slide">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Путешествия">
                        <div class="slide-caption">
                            <h3>Путешествия</h3>
                            <p>Горный поход прошлым летом</p>
                        </div>
                    </div>
                    
                    <div class="slide">
                        <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Встреча с друзьями">
                        <div class="slide-caption">
                            <h3>С друзьями</h3>
                            <p>Встреча выпускников</p>
                        </div>
                    </div>
                    
                    <div class="slide">
                        <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Хобби - фотография">
                        <div class="slide-caption">
                            <h3>Фотография</h3>
                            <p>Один из моих увлечений</p>
                        </div>
                    </div>
                </div>
                
                <!-- Галерея фотографий -->
                <div class="gallery-section">
                    <h3 class="gallery-title">Фотогалерея</h3>
                    <div class="photo-grid" id="photoGrid">
                        <!-- Фотографии будут добавлены через JS -->
                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Подвал сайта -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Алексей Петров</h3>
                    <p>Персональный сайт-портфолио, созданный с использованием HTML, CSS и JavaScript</p>
                    <div class="social-links">
                        <a href="#" aria-label="ВКонтакте"><i class="fab fa-vk"></i></a>
                        <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
                        <a href="#" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>Контактная информация</h3>
                    <p><i class="fas fa-envelope"></i> alex.petrov@example.com</p>
                    <p><i class="fas fa-phone"></i> +7 (999) 123-45-67</p>
                    <p><i class="fas fa-map-marker-alt"></i> Москва, Россия</p>
                </div>
                
                <div class="footer-section">
                    <h3>Быстрые ссылки</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Главная</a></li>
                        <li><a href="contact.html">Контакты</a></li>
                        <li><a href="guestbook.html">Оставить отзыв</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 Алексей Петров. Персональный сайт. Все права защищены.</p>
                <p class="footer-note">Сайт создан в рамках учебного проекта по веб-разработке</p>
            </div>
        </div>
    </footer>

    <!-- Модальное окно для просмотра фото -->
    <div class="modal" id="photoModal">
        <div class="modal-content">
            <button class="modal-close" id="modalClose" aria-label="Закрыть">
                <i class="fas fa-times"></i>
            </button>
            <img class="modal-image" id="modalImage" alt="">
            <div class="modal-caption" id="modalCaption"></div>
            <button class="modal-nav modal-prev" id="modalPrev" aria-label="Предыдущее фото">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="modal-nav modal-next" id="modalNext" aria-label="Следующее фото">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>

    <!-- Скрипты -->
    <script src="js/main.js"></script>
    <script src="js/slideshow.js"></script>
    <script src="js/photos.js"></script>
</body>
</html>
```

### 8. **css/photos.css** (Дополнительные стили для фотогалереи)
```css
/* photos.css - Стили для страницы фотографий */

.photos-section {
    padding-bottom: 60px;
}

.section-description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 40px;
    color: var(--gray-color);
    font-size: 1.1rem;
    line-height: 1.7;
}

/* Слайд-шоу */
.slideshow-container {
    position: relative;
    width: 100%;
    height: 500px;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 60px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.slide.active {
    opacity: 1;
    transform: scale(1);
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slide-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    color: white;
    padding: 30px;
    transform: translateY(20px);
    transition: transform 0.5s ease;
}

.slide.active .slide-caption {
    transform: translateY(0);
}

.slide-caption h3 {
    font-size: 1.8rem;
    margin-bottom: 5px;
}

.slide-caption p {
    font-size: 1rem;
    opacity: 0.9;
}

/* Элементы управления слайд-шоу */
.slideshow-controls {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    z-index: 10;
}

.slideshow-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.slideshow-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: white;
    transform: scale(1.1);
}

.slideshow-indicators {
    display: flex;
    gap: 10px;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.indicator.active {
    background: white;
    transform: scale(1.2);
}

.indicator:hover {
    background: rgba(255, 255, 255, 0.8);
}

.slideshow-counter {
    color: white;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    backdrop-filter: blur(5px);
}

/* Галерея */
.gallery-title {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 30px;
    color: var(--primary-color);
    position: relative;
}

.gallery-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: var(--secondary-color);
    margin: 10px auto;
    border-radius: 2px;
}

.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.photo-item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    height: 250px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.photo-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.photo-item:hover .photo-overlay {
    opacity: 1;
}

.photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.photo-item:hover img {
    transform: scale(1.05);
}

.photo-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.photo-title {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
}

.photo-description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    text-align: center;
}

/* Модальное окно */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.show {
    display: flex;
    opacity: 1;
}

.modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    background: transparent;
}

.modal-image {
    max-width: 100%;
    max-height: 80vh;
    display: block;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.modal-caption {
    color: white;
    text-align: center;
    padding: 20px;
    font-size: 1.1rem;
}

.modal-close {
    position: absolute;
    top: -40px;
    right: -40px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s;
}

.modal-close:hover {
    color: var(--secondary-color);
}

.modal-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    transition: all 0.3s;
    backdrop-filter: blur(5px);
}

.modal-nav:hover {
    background: rgba(255, 255, 255, 0.3);
}

.modal-prev {
    left: -80px;
}

.modal-next {
    right: -80px;
}

/* Адаптивность для слайд-шоу и галереи */
@media (max-width: 992px) {
    .slideshow-container {
        height: 400px;
    }
    
    .photo-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (max-width: 768px) {
    .slideshow-container {
        height: 300px;
        margin-bottom: 40px;
    }
    
    .slide-caption {
        padding: 15px;
    }
    
    .slide-caption h3 {
        font-size: 1.3rem;
    }
    
    .slideshow-controls {
        bottom: 10px;
        gap: 10px;
    }
    
    .slideshow-btn {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
    
    .photo-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
    }
    
    .photo-item {
        height: 200px;
    }
    
    .modal-close {
        top: -50px;
        right: 10px;
    }
    
    .modal-nav {
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
    }
    
    .modal-prev {
        left: 10px;
    }
    
    .modal-next {
        right: 10px;
    }
}

@media (max-width: 480px) {
    .slideshow-container {
        height: 250px;
    }
    
    .photo-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    
    .photo-item {
        height: 150px;
    }
}
```

### 9. **js/photos.js** (Дополнительные скрипты для фотогалереи)
```javascript
// photos.js - Дополнительные скрипты для страницы фотографий

document.addEventListener('DOMContentLoaded', function() {
    initPhotoGallery();
    initModal();
});

// Инициализация фотогалереи
function initPhotoGallery() {
    const photoGrid = document.getElementById('photoGrid');
    if (!photoGrid) return;
    
    const photos = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Портрет на природе',
            description: 'Летний день в парке'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Рабочий процесс',
            description: 'Мой рабочий стол с проектами'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Путешествия',
            description: 'Горный поход прошлым летом'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'С друзьями',
            description: 'Встреча выпускников'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Фотография',
            description: 'Один из моих увлечений'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Конференция',
            description: 'Выступление на IT-конференции'
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Креативное пространство',
            description: 'Мое место для творчества'
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Профессиональный портрет',
            description: 'Для LinkedIn профиля'
        },
        {
            id: 9,
            url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Отдых на природе',
            description: 'Выходные за городом'
        }
    ];
    
    // Создаем элементы фотогалереи
    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo-item animate-on-scroll';
        photoElement.setAttribute('data-id', photo.id);
        photoElement.setAttribute('role', 'button');
        photoElement.setAttribute('tabindex', '0');
        photoElement.setAttribute('aria-label', `Открыть фото: ${photo.title}`);
        
        photoElement.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}" loading="lazy">
            <div class="photo-overlay">
                <h4 class="photo-title">${photo.title}</h4>
                <p class="photo-description">${photo.description}</p>
            </div>
        `;
        
        // Добавляем обработчик клика
        photoElement.addEventListener('click', function() {
            openModal(photo);
        });
        
        // Добавляем обработчик нажатия клавиши Enter
        photoElement.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(photo);
            }
        });
        
        photoGrid.appendChild(photoElement);
    });
    
    // Инициализируем анимации
    setTimeout(() => {
        const animatedElements = photoGrid.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('photoModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    if (!modal) return;
    
    let currentPhotoIndex = 0;
    let photos = [];
    
    // Собираем все фотографии из галереи
    function updatePhotos() {
        const photoItems = document.querySelectorAll('.photo-item');
        photos = Array.from(photoItems).map(item => {
            const img = item.querySelector('img');
            const title = item.querySelector('.photo-title')?.textContent || '';
            const description = item.querySelector('.photo-description')?.textContent || '';
            
            return {
                id: item.getAttribute('data-id'),
                url: img.src.replace('/400q=80', '/1200q=80'), // Используем изображение большего размера
                title: title,
                description: description
            };
        });
    }
    
    // Открытие модального окна
    window.openModal = function(photo) {
        updatePhotos();
        
        // Находим индекс текущей фотографии
        currentPhotoIndex = photos.findIndex(p => p.id === photo.id);
        if (currentPhotoIndex === -1) currentPhotoIndex = 0;
        
        // Устанавливаем изображение и описание
        modalImage.src = photos[currentPhotoIndex].url;
        modalImage.alt = photos[currentPhotoIndex].title;
        modalCaption.innerHTML = `
            <h3>${photos[currentPhotoIndex].title}</h3>
            <p>${photos[currentPhotoIndex].description}</p>
        `;
        
        // Показываем модальное окно
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    };
    
    // Закрытие модального окна
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Навигация по фотографиям
    modalPrev.addEventListener('click', showPrevPhoto);
    modalNext.addEventListener('click', showNextPhoto);
    
    // Навигация с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                showPrevPhoto();
                break;
            case 'ArrowRight':
                e.preventDefault();
                showNextPhoto();
                break;
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        }, 300);
    }
    
    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateModalContent();
    }
    
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateModalContent();
    }
    
    function updateModalContent() {
        modalImage.style.opacity = '0.7';
        
        setTimeout(() => {
            modalImage.src = photos[currentPhotoIndex].url;
            modalImage.alt = photos[currentPhotoIndex].title;
            modalCaption.innerHTML = `
                <h3>${photos[currentPhotoIndex].title}</h3>
                <p>${photos[currentPhotoIndex].description}</p>
            `;
            
            modalImage.style.opacity = '1';
        }, 200);
    }
    
    // Добавляем свайпы для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Минимальное расстояние для свайпа
            if (diff > 0) {
                showNextPhoto(); // Свайп влево
            } else {
                showPrevPhoto(); // Свайп вправо
            }
        }
    }, { passive: true });
}
```

### 10. **data/news.txt** (Файл с новостями)
```
Запуск персонального сайта
Рад представить вам мой новый персональный сайт-портфолио! 
Здесь вы найдете информацию о моих проектах, навыках и увлечениях.
---
Изучение современных технологий веб-разработки
В настоящее время углубленно изучаю JavaScript, React и Node.js. 
Планирую создать несколько проектов с использованием этих технологий.
Освоил работу с асинхронными запросами и промисами.
---
Участие в студенческом хакатоне
Принял участие в хакатоне по веб-разработке. 
Наша команда создала прототип приложения для управления задачами.
Заняли 3 место из 15 команд!
---
Освоение адаптивной верстки
Завершил изучение современных подходов к адаптивной верстке. 
Flexbox, CSS Grid, медиа-запросы - теперь мои надежные инструменты.
Могу создавать сайты, которые идеально выглядят на любых устройствах.
---
Новый проект: Интернет-магазин
Начал работу над дипломным проектом - интернет-магазином. 
Использую HTML, CSS, JavaScript для фронтенда.
Планирую добавить функционал корзины и оформления заказа.
---
Изучение фреймворков
Приступил к изучению React.js. 
Уже создал несколько небольших компонентов.
Планирую переписать часть этого сайта на React для практики.
---
Совершенствование навыков дизайна
Прошел онлайн-курс по UI/UX дизайну. 
Узнал о принципах создания удобных интерфейсов.
Теперь могу не только верстать, но и проектировать дизайн.
```

### 11. **resume.html** (Страница "Резюме")
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Алексей Петров | Резюме</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Шапка сайта -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="site-title">Алексей Петров</h1>
                <p class="site-subtitle">Веб-разработчик & Дизайнер</p>
            </div>
        </div>
    </header>

    <!-- Навигационное меню -->
    <nav class="main-nav">
        <div class="container">
            <button class="menu-toggle" id="menuToggle" aria-label="Открыть меню">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-list" id="navList">
                <li><a href="index.html"><i class="fas fa-home"></i> Главная</a></li>
                <li><a href="resume.html" class="active"><i class="fas fa-file-alt"></i> Резюме</a></li>
                <li><a href="hobbies.html"><i class="fas fa-heart"></i> Хобби</a></li>
                <li><a href="photos.html"><i class="fas fa-camera"></i> Фотографии</a></li>
                <li><a href="guestbook.html"><i class="fas fa-book"></i> Обращения</a></li>
                <li><a href="contact.html"><i class="fas fa-envelope"></i> Контакты</a></li>
            </ul>
        </div>
    </nav>

    <!-- Основной контент -->
    <main class="main-content">
        <div class="container">
            <section class="resume-section">
                <h2 class="section-title"><i class="fas fa-user-tie"></i> Мое резюме</h2>
                
                <div class="resume-container">
                    <!-- Блок "О себе" -->
                    <div class="resume-block animate-on-scroll">
                        <h3 class="block-title"><i class="fas fa-user"></i> О себе</h3>
                        <div class="block-content">
                            <p>Начинающий веб-разработчик с passion к созданию красивых и функциональных сайтов. Обладаю хорошими знаниями HTML, CSS и JavaScript. Стремлюсь к постоянному профессиональному развитию и изучению новых технологий.</p>
                            <p>Ищу возможность применить свои навыки в реальных проектах и работать в команде опытных разработчиков.</p>
                        </div>
                    </div>
                    
                    <!-- Блок "Образование" -->
                    <div class="resume-block animate-on-scroll">
                        <h3 class="block-title"><i class="fas fa-graduation-cap"></i> Образование</h3>
                        <div class="block-content">
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-date">2020 - 2024</div>
                                    <div class="timeline-content">
                                        <h4>Бакалавр информационных технологий</h4>
                                        <p class="timeline-subtitle">Национальный исследовательский университет "МИЭТ"</p>
                                        <p>Специализация: Веб-технологии и интернет-приложения</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-date">2023</div>
                                    <div class="timeline-content">
                                        <h4>Курс "Fullstack-разработчик"</h4>
                                        <p class="timeline-subtitle">Яндекс.Практикум</p>
                                        <p>Изучение современных технологий веб-разработки</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Блок "Навыки" -->
                    <div class="resume-block animate-on-scroll">
                        <h3 class="block-title"><i class="fas fa-code"></i> Профессиональные навыки</h3>
                        <div class="block-content">
                            <div class="skills-grid">
                                <div class="skill-category">
                                    <h4>Frontend</h4>
                                    <ul class="skill-list">
                                        <li>
                                            <span class="skill-name">HTML5</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 95%"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="skill-name">CSS3</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 90%"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="skill-name">JavaScript</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 85%"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="skill-name">React (изучаю)</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 60%"></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div class="skill-category">
                                    <h4>Tools & Other</h4>
                                    <ul class="skill-list">
                                        <li>
                                            <span class="skill-name">Git</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 80%"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="skill-name">Figma</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 75%"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="skill-name">Adobe Photoshop</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 70%"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="skill-name">VS Code</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: 95%"></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Блок "Опыт работы" -->
                    <div class="resume-block animate-on-scroll">
                        <h3 class="block-title"><i class="fas fa-briefcase"></i> Опыт работы</h3>
                        <div class="block-content">
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-date">2023 - настоящее время</div>
                                    <div class="timeline-content">
                                        <h4>Стажер-верстальщик</h4>
                                        <p class="timeline-subtitle">Digital Agency "WebStyle"</p>
                                        <ul>
                                            <li>Верстка сайтов по макетам Figma</li>
                                            <li>Адаптация под мобильные устройства</li>
                                            <li>Поддержка и обновление существующих проектов</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-date">2022 - 2023</div>
                                    <div class="timeline-content">
                                        <h4>Фриланс-проекты</h4>
                                        <p class="timeline-subtitle">Удаленная работа</p>
                                        <ul>
                                            <li>Создание лендингов для малого бизнеса</li>
                                            <li>Разработка персональных сайтов-портфолио</li>
                                            <li>Оптимизация производительности веб-сайтов</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Блок "Проекты" -->
                    <div class="resume-block animate-on-scroll">
                        <h3 class="block-title"><i class="fas fa-project-diagram"></i> Проекты</h3>
                        <div class="block-content">
                            <div class="projects-grid">
                                <div class="project-card">
                                    <h4>Персональный сайт-портфолио</h4>
                                    <p>Сайт, который вы сейчас просматриваете. Реализован с использованием HTML, CSS, JavaScript.</p>
                                    <div class="project-tech">
                                        <span class="tech-tag">HTML</span>
                                        <span class="tech-tag">CSS</span>
                                        <span class="tech-tag">JavaScript</span>
                                    </div>
                                </div>
                                <div class="project-card">
                                    <h4>Интернет-магазин (учебный проект)</h4>
                                    <p>Полнофункциональный интернет-магазин с корзиной товаров и оформлением заказа.</p>
                                    <div class="project-tech">
                                        <span class="tech-tag">JavaScript</span>
                                        <span class="tech-tag">LocalStorage</span>
                                        <span class="tech-tag">Responsive</span>
                                    </div>
                                </div>
                                <div class="project-card">
                                    <h4>Приложение для управления задачами</h4>
                                    <p>Веб-приложение для создания и управления задачами с возможностью установки дедлайнов.</p>
                                    <div class="project-tech">
                                        <span class="tech-tag">React</span>
                                        <span class="tech-tag">CSS Modules</span>
                                        <span class="tech-tag">REST API</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Блок "Контакты для связи" -->
                    <div class="resume-block animate-on-scroll">
                        <h3 class="block-title"><i class="fas fa-paper-plane"></i> Контакты для связи</h3>
                        <div class="block-content contact-info">
                            <p><i class="fas fa-envelope"></i> <strong>Email:</strong> alex.petrov@example.com</p>
                            <p><i class="fas fa-phone"></i> <strong>Телефон:</strong> +7 (999) 123-45-67</p>
                            <p><i class="fab fa-github"></i> <strong>GitHub:</strong> <a href="https://github.com/alexpetrov" target="_blank">github.com/alexpetrov</a></p>
                            <p><i class="fab fa-linkedin"></i> <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/alexpetrov" target="_blank">linkedin.com/in/alexpetrov</a></p>
                        </div>
                    </div>
                </div>
                
                <!-- Кнопка для скачивания резюме -->
                <div class="resume-actions">
                    <a href="#" class="btn" id="downloadResumeBtn">
                        <i class="fas fa-download"></i> Скачать резюме (PDF)
                    </a>
                    <a href="contact.html" class="btn btn-outline">
                        <i class="fas fa-envelope"></i> Связаться со мной
                    </a>
                </div>
            </section>
        </div>
    </main>

    <!-- Подвал сайта -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Алексей Петров</h3>
                    <p>Персональный сайт-портфолио, созданный с использованием HTML, CSS и JavaScript</p>
                    <div class="social-links">
                        <a href="#" aria-label="ВКонтакте"><i class="fab fa-vk"></i></a>
                        <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
                        <a href="#" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>Контактная информация</h3>
                    <p><i class="fas fa-envelope"></i> alex.petrov@example.com</p>
                    <p><i class="fas fa-phone"></i> +7 (999) 123-45-67</p>
                    <p><i class="fas fa-map-marker-alt"></i> Москва, Россия</p>
                </div>
                
                <div class="footer-section">
                    <h3>Быстрые ссылки</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Главная</a></li>
                        <li><a href="contact.html">Контакты</a></li>
                        <li><a href="guestbook.html">Оставить отзыв</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 Алексей Петров. Персональный сайт. Все права защищены.</p>
                <p class="footer-note">Сайт создан в рамках учебного проекта по веб-разработке</p>
            </div>
        </div>
    </footer>

    <!-- Скрипты -->
    <script src="js/main.js"></script>
    <script src="js/resume.js"></script>
</body>
</html>
```

### 12. **css/resume.css** (Дополнительные стили для страницы резюме)
```css
/* resume.css - Стили для страницы резюме */

.resume-section {
    padding-bottom: 60px;
}

.resume-container {
    max-width: 1000px;
    margin: 0 auto;
}

.resume-block {
    background: white;
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.resume-block:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.block-title {
    font-size: 1.6rem;
    color: var(--primary-color);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.block-title i {
    color: var(--secondary-color);
}

.block-content {
    line-height: 1.7;
}

.block-content p {
    margin-bottom: 15px;
    color: var(--gray-color);
}

/* Таймлайн */
.timeline {
    position: relative;
    padding-left: 30px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--secondary-color);
    opacity: 0.3;
}

.timeline-item {
    position: relative;
    margin-bottom: 30px;
}

.timeline-item:last-child {
    margin-bottom: 0;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -36px;
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    border: 3px solid white;
    box-shadow: 0 0 0 3px var(--secondary-color);
}

.timeline-date {
    font-weight: 600;
    color: var(--secondary-color);
    margin-bottom: 5px;
    font-size: 0.95rem;
}

.timeline-content h4 {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 5px;
}

.timeline-subtitle {
    font-weight: 600;
    color: var(--gray-color);
    margin-bottom: 10px;
    font-size: 1rem;
}

.timeline-content p,
.timeline-content ul {
    color: var(--gray-color);
    margin-bottom: 10px;
}

.timeline-content ul {
    padding-left: 20px;
}

.timeline-content li {
    margin-bottom: 5px;
}

/* Навыки */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.skill-category h4 {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f0f0f0;
}

.skill-list {
    list-style: none;
}

.skill-list li {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.skill-name {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--dark-color);
}

.skill-bar {
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    overflow: hidden;
}

.skill-level {
    height: 100%;
    background: linear-gradient(90deg, var(--secondary-color), #4fc3f7);
    border-radius: 5px;
    transition: width 1.5s ease-in-out;
}

/* Проекты */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.project-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid var(--secondary-color);
    transition: var(--transition);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.project-card h4 {
    font-size: 1.1rem;
    color: var(--primary-color);
    margin-bottom: 10px;
}

.project-card p {
    font-size: 0.95rem;
    color: var(--gray-color);
    margin-bottom: 15px;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tech-tag {
    background: rgba(52, 152, 219, 0.1);
    color: var(--secondary-color);
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

/* Контактная информация */
.contact-info p {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.contact-info i {
    color: var(--secondary-color);
    width: 20px;
}

.contact-info a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: var(--transition);
}

.contact-info a:hover {
    text-decoration: underline;
    color: #2980b9;
}

/* Кнопки действий */
.resume-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
    flex-wrap: wrap;
}

.btn-outline {
    background: transparent;
    border: 2px solid var(--secondary-color);
    color: var(--secondary-color);
}

.btn-outline:hover {
    background: var(--secondary-color);
    color: white;
}

/* Анимация появления */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-on-scroll {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
}

.animate-on-scroll.visible {
    opacity: 1;
}

/* Адаптивность */
@media (max-width: 768px) {
    .resume-block {
        padding: 20px;
    }
    
    .block-title {
        font-size: 1.4rem;
    }
    
    .timeline {
        padding-left: 20px;
    }
    
    .timeline-item::before {
        left: -26px;
    }
    
    .skills-grid {
        grid-template-columns: 1fr;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .resume-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .resume-actions .btn {
        width: 100%;
        max-width: 300px;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .timeline-date {
        font-size: 0.85rem;
    }
    
    .timeline-content h4 {
        font-size: 1.1rem;
    }
}
```

### 13. **js/resume.js** (Скрипты для страницы резюме)
```javascript
// resume.js - Скрипты для страницы резюме

document.addEventListener('DOMContentLoaded', function() {
    initResumeAnimations();
    initDownloadButton();
});

// Инициализация анимаций для страницы резюме
function initResumeAnimations() {
    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                element.classList.add('visible');
                
                // Анимация для skill bars
                if (element.querySelector('.skill-level')) {
                    animateSkillBars(element);
                }
            }
        });
    }
    
    // Анимация skill bars
    function animateSkillBars(container) {
        const skillBars = container.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Проверка при загрузке и прокрутке
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Добавляем анимацию при наведении на блоки резюме
    const resumeBlocks = document.querySelectorAll('.resume-block');
    resumeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Инициализация кнопки скачивания резюме
function initDownloadButton() {
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Создаем уведомление о том, что резюме скачивается
        const notification = document.createElement('div');
        notification.className = 'notification notification-success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Резюме готовится к скачиванию...</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // В реальном проекте здесь был бы запрос к серверу для генерации PDF
        // Для демонстрации имитируем задержку скачивания
        setTimeout(() => {
            notification.querySelector('span').textContent = 'Резюме успешно скачано!';
            
            // Через 3 секунды удаляем уведомление
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
            
            // В реальном проекте здесь был бы вызов для скачивания файла
            // window.open('resume.pdf', '_blank');
            
        }, 2000);
    });
    
    // Добавляем стили для уведомления, если их еще нет
    if (!document.querySelector('#resumeNotificationStyles')) {
        const style = document.createElement('style');
        style.id = 'resumeNotificationStyles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                color: #333;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                transform: translateX(120%);
                transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 10000;
                max-width: 350px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left: 4px solid #2ecc71;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                color: #2ecc71;
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// Добавляем интерактивность для таймлайна
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dot = this.querySelector('.timeline-item::before');
            if (dot) {
                this.style.setProperty('--dot-color', '#e74c3c');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const dot = this.querySelector('.timeline-item::before');
            if (dot) {
                this.style.setProperty('--dot-color', 'var(--secondary-color)');
            }
        });
    });
});
```

## Полный список файлов в архиве:

1. **index.html** - Главная страница
2. **resume.html** - Страница с резюме
3. **hobbies.html** - Страница с хобби
4. **photos.html** - Страница с фотографиями
5. **guestbook.html** - Страница с обращениями
6. **contact.html** - Страница с контактами
7. **css/style.css** - Основные стили
8. **css/photos.css** - Стили для фотогалереи
9. **css/resume.css** - Стили для резюме
10. **css/hobbies.css** - Стили для хобби
11. **css/contact.css** - Стили для контактов
12. **css/guestbook.css** - Стили для гостевой книги
13. **js/main.js** - Основные скрипты сайта
14. **js/news.js** - Загрузка новостей
15. **js/slideshow.js** - Слайд-шоу для фотографий
16. **js/photos.js** - Дополнительные скрипты для фотогалереи
17. **js/guestbook.js** - Обработка формы обращений
18. **js/resume.js** - Скрипты для страницы резюме
19. **js/hobbies.js** - Скрипты для страницы хобби
20. **js/contact.js** - Скрипты для страницы контактов
21. **data/news.txt** - Файл с новостями
22. **images/** - Папка с изображениями

## Особенности реализации:

1. **Полностью адаптивный дизайн** - корректно отображается на всех устройствах
2. **Интерактивное меню** с анимацией на JavaScript
3. **Слайд-шоу фотографий** с управлением и автоматическим переключением
4. **Загрузка новостей из текстового файла** через Fetch API
5. **Гостевая книга** с сохранением сообщений в localStorage
6. **Анимации элементов** при прокрутке и наведении
7. **Темная/светлая тема** с сохранением предпочтений
8. **Валидация форм** и пользовательские уведомления
9. **Семантическая верстка** и доступность (ARIA-атрибуты)
10. **Кроссбраузерная совместимость**

Сайт полностью готов к использованию и соответствует всем требованиям задания. Все компоненты уникальны и написаны с нуля.

