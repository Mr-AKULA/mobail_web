в) Создайте 2 различных класса стилей для ссылок на внутренние страницы 
(в навигационном меню) и внешних ссылок. Добавьте атрибут class в теги 
<a> на страницах. 
Понял! Создам два разных класса стилей для внутренних и внешних ссылок.

**1. Обновляем `styles.css` - добавляем классы для ссылок:**

```css
/* Основные стили для всех страниц сайта */
body {
    font-family: Arial, sans-serif;
    font-size: 18px;
    border: 5px solid #4CAF50;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
}

/* Цвет фона для всех страниц КРОМЕ главной */
body:not(.home-page) {
    background-color: #f0f8ff; /* Голубой фон для обычных страниц */
}

/* Стили для внутренних ссылок (навигация по сайту) */
.link-internal {
    display: inline-block;
    padding: 12px 25px;
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin: 5px 10px;
    font-weight: bold;
    border: 2px solid #2980b9;
    text-align: center;
    min-width: 150px;
}

.link-internal:hover {
    background: linear-gradient(135deg, #2980b9, #21618c);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    text-decoration: none;
}

/* Стили для внешних ссылок (на другие сайты) */
.link-external {
    display: inline-block;
    padding: 10px 20px;
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.3s ease;
    margin: 5px 8px;
    font-weight: bold;
    border: 2px solid #c0392b;
    position: relative;
}

.link-external:hover {
    background: linear-gradient(135deg, #c0392b, #a93226);
    transform: scale(1.05);
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    text-decoration: none;
}

/* Иконка для внешних ссылок */
.link-external::after {
    content: " ↗";
    font-size: 0.9em;
}

/* Стили для обычных текстовых ссылок (без классов) */
a {
    color: #2980b9;
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #e74c3c;
    text-decoration: underline;
}

/* Дополнительные базовые стили */
h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
}

h2 {
    color: #34495e;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-top: 25px;
}

p {
    margin-bottom: 15px;
    color: #555;
}

/* Стили для контейнера */
.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

/* Навигационная панель */
.nav-menu {
    text-align: center;
    margin: 30px 0;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
}

/* Стили для таблиц */
table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

th {
    background-color: #4CAF50;
    color: white;
}
```

**2. Обновляем `index.html` - добавляем классы к ссылкам:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Моя первая страница</title>
    <link rel="stylesheet" href="styles/styles.css">
    <style>
        body.home-page {
            background-color: #fff0f5;
        }
        
        .welcome-message {
            text-align: center;
            font-size: 24px;
            color: #e74c3c;
            margin-bottom: 30px;
            font-weight: bold;
        }
    </style>
</head>
<body class="home-page">
    <div class="container">
        <div class="welcome-message">🎉 Добро пожаловать на мой сайт!</div>
        
        <h1>Главная страница</h1>
        
        <div>
            <h2>Обо мне</h2>
            <p>Привет! Меня зовут Павел Алексеев, и это моя первая веб-страница с использованием CSS.</p>
            <p>
                <span style="color: #ff4500; font-weight: bold;">Алексеев</span>
                <span style="color: #2e8b57; font-weight: bold;">Павел</span>
                <span style="color: #1e90ff; font-weight: bold;">Васильевич</span>
            </p>
        </div>
        
        <div class="nav-menu">
            <h2>Навигация по сайту</h2>
            <p>
                <a href="hobby.html" class="link-internal">🎯 Мое хобби</a>
                <a href="links.html" class="link-internal">🔗 Любимые сайты</a>
                <a href="computer.html" class="link-internal">💻 Мой компьютер</a>
            </p>
            
            <h2>Внешние ресурсы</h2>
            <p>
                <a href="https://www.yandex.ru" class="link-external" target="_blank">Яндекс</a>
                <a href="https://www.gismeteo.ru" class="link-external" target="_blank">Gismeteo</a>
                <a href="https://www.cbr.ru" class="link-external" target="_blank">ЦБ РФ</a>
            </p>
        </div>
    </div>
</body>
</html>
```

**3. Обновляем `links.html` - добавляем классы к ссылкам:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Мои любимые сайты</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <div class="container">
        <h1>Мои любимые сайты</h1>
        
        <div class="nav-menu">
            <h2>IT и программирование</h2>
            <p>
                <a href="https://github.com" class="link-external" target="_blank">GitHub</a>
                <a href="https://stackoverflow.com" class="link-external" target="_blank">Stack Overflow</a>
                <a href="https://habr.com" class="link-external" target="_blank">Habr</a>
                <a href="https://youtube.com" class="link-external" target="_blank">YouTube</a>
            </p>
            
            <h2>Обучение и ресурсы</h2>
            <p>
                <a href="https://medium.com" class="link-external" target="_blank">Medium</a>
                <a href="https://freecodecamp.org" class="link-external" target="_blank">freeCodeCamp</a>
                <a href="https://css-tricks.com" class="link-external" target="_blank">CSS-Tricks</a>
            </p>
            
            <a href="index.html" class="link-internal">🏠 На главную</a>
        </div>
    </div>
</body>
</html>
```

**4. Обновляем `hobby.html`, `computer.html`, `recipe.html` аналогично**

**Различия между классами:**

- **`link-internal`** (синие кнопки):
  - Градиент синего цвета
  - Для навигации внутри сайта
  - При наведении поднимаются вверх
  - Без иконки ↗

- **`link-external`** (красные кнопки):
  - Градиент красного цвета
  - Для ссылок на внешние сайты
  - Имеют иконку "↗"
  - При наведении увеличиваются
  - Открываются в новом окне (`target="_blank"`)

Теперь навигация интуитивно понятна - синие кнопки ведут внутри сайта, красные с иконкой ↗ ведут на внешние ресурсы! 🎯
