
# Персональный сайт - План реализации

Я создам для вас персональный сайт с блочной версткой, используя HTML, CSS и JavaScript. Вот план реализации:

## Структура проекта
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
│   ├── news.js         # Загрузка новостей для главной страницы
│   ├── slideshow.js    # Слайд-шоу для фото
│   └── guestbook.js    # Обработка формы обращений
│
├── images/             # Изображения для сайта
│   ├── photos/         # Ваши фотографии
│   └── ui/             # Элементы интерфейса
│
├── data/
│   ├── news.txt        # Файл с новостями
│   └── guestbook.txt   # Файл для сохранения обращений
│
└── api/
    └── save-message.php # PHP-скрипт для сохранения обращений
```

## Основные компоненты дизайна

### 1. Макет
- **"Резиновая" (адаптивная) верстка** с использованием flexbox и grid
- Основные блоки: шапка, навигация, контент, подвал
- Цветовая схема: профессиональная, но персонализированная

### 2. Навигационное меню с JS-анимацией
- Плавное появление/исчезновение подменю
- Эффекты при наведении на пункты меню
- Активная страница будет выделяться

### 3. Анимации элементов
- Появление блоков при прокрутке (fade-in)
- Параллакс-эффекты для некоторых секций
- Анимация кнопок и ссылок

### 4. Слайд-шоу на странице фотографий
- Автоматическая смена фотографий
- Кнопки навигации (вперед/назад)
- Индикаторы текущего слайда
- Пауза при наведении

### 5. Дополнительные функции
- Загрузка новостей из файла на главной странице
- Форма обращений с сохранением в файл (с PHP-бэкендом)

## Пример кода для главной страницы (index.html):

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой персональный сайт | Главная</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="site-title">Мой персональный сайт</h1>
            <p class="site-subtitle">Добро пожаловать на мой сайт-портфолио</p>
        </div>
    </header>

    <nav class="main-nav">
        <div class="container">
            <button class="menu-toggle" id="menuToggle">
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

    <main class="main-content">
        <div class="container">
            <section class="welcome-section">
                <h2>Добро пожаловать!</h2>
                <div class="profile">
                    <img src="images/profile.jpg" alt="Мое фото" class="profile-img">
                    <div class="profile-info">
                        <h3>Привет, я [Ваше Имя]</h3>
                        <p>Я [Ваша профессия/специальность] с увлечением к веб-разработке, дизайну и технологиям. На этом сайте вы найдете информацию о моих навыках, увлечениях и проектах.</p>
                    </div>
                </div>
            </section>

            <section class="news-section">
                <h2><i class="fas fa-newspaper"></i> Последние новости</h2>
                <div class="news-container" id="newsContainer">
                    <!-- Новости будут загружены через JS -->
                    <div class="loading">Загрузка новостей...</div>
                </div>
            </section>

            <section class="quick-links">
                <h2>Быстрые ссылки</h2>
                <div class="links-grid">
                    <a href="resume.html" class="link-card">
                        <i class="fas fa-briefcase"></i>
                        <h3>Мое резюме</h3>
                        <p>Профессиональные навыки и опыт</p>
                    </a>
                    <a href="hobbies.html" class="link-card">
                        <i class="fas fa-gamepad"></i>
                        <h3>Мои увлечения</h3>
                        <p>Хобби и интересы вне работы</p>
                    </a>
                    <a href="photos.html" class="link-card">
                        <i class="fas fa-images"></i>
                        <h3>Фотогалерея</h3>
                        <p>Личные и профессиональные фото</p>
                    </a>
                </div>
            </section>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Мой персональный сайт</h3>
                    <p>Сайт-портфолио, созданный с использованием HTML, CSS и JavaScript</p>
                </div>
                <div class="footer-section">
                    <h3>Контактная информация</h3>
                    <p><i class="fas fa-envelope"></i> example@email.com</p>
                    <p><i class="fas fa-phone"></i> +7 (XXX) XXX-XX-XX</p>
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
                <p>&copy; 2023 Мой персональный сайт. Все права защищены.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
    <script src="js/news.js"></script>
</body>
</html>
```

## Ключевые особенности реализации:

1. **Уникальность кода** - весь код будет написан с нуля специально для этого проекта
2. **Адаптивный дизайн** - сайт будет корректно отображаться на всех устройствах
3. **Анимации** - плавные переходы, эффекты появления, интерактивное меню
4. **Слайд-шоу** - кастомная реализация на чистом JS
5. **Работа с файлами** - загрузка новостей из текстового файла и сохранение обращений

