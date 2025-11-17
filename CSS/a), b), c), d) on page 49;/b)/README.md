б) На главной странице измените цвет фона на отличный от цвета на других 
страницах. 

Понял! Изменим цвет фона только на главной странице. Вот решение:

**1. Обновляем `styles.css` - убираем background-color из общего body:**

```css
/* Основные стили для всех страниц сайта */
body {
    font-family: Arial, sans-serif;
    font-size: 18px;
    /* Убрали background-color - зададим отдельно */
    border: 5px solid #4CAF50;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
}

/* Цвет фона для всех страниц КРОМЕ главной */
body:not(.home-page) {
    background-color: #f0f8ff; /* Голубой фон для обычных страниц */
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

/* Стили для ссылок */
a {
    color: #2980b9;
    text-decoration: none;
    transition: color 0.3s;
}

a:hover {
    color: #e74c3c;
    text-decoration: underline;
}
```

**2. Обновляем `index.html` - добавляем класс и уникальный фон:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Моя первая страница</title>
    <link rel="stylesheet" href="styles/styles.css">
    <style>
        /* Уникальный фон только для главной страницы */
        body.home-page {
            background-color: #fff0f5; /* Светло-розовый фон */
        }
        
        .welcome-message {
            text-align: center;
            font-size: 24px;
            color: #e74c3c;
            margin-bottom: 30px;
            font-weight: bold;
        }
        
        .nav-links {
            text-align: center;
            margin: 30px 0;
        }
        
        .nav-links a {
            display: inline-block;
            margin: 0 10px;
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        
        .nav-links a:hover {
            background-color: #2980b9;
            text-decoration: none;
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
        
        <div class="nav-links">
            <h2>Навигация по сайту</h2>
            <p>
                <a href="hobby.html">🎯 Мое хобби</a>
                <a href="links.html">🔗 Любимые сайты</a>
                <a href="computer.html">💻 Мой компьютер</a>
                <a href="recipe.html">🍰 Рецепт штруделя</a>
            </p>
        </div>
        
        <div>
            <h2>Особенности главной страницы</h2>
            <p>Эта страница имеет <strong style="color: #e74c3c;">уникальный светло-розовый фон</strong>, в то время как все остальные страницы сайта имеют голубой фон.</p>
        </div>
    </div>
</body>
</html>
```

**3. Убедимся, что другие страницы НЕ имеют класс `home-page`:**

**`hobby.html`, `links.html`, `computer.html`, `recipe.html`** - должны остаться с простым тегом body:
```html
<body>
    <!-- содержимое страницы -->
</body>
```

**Результат:**

- ✅ **Главная страница** (`index.html`) - светло-розовый фон (`#fff0f5`)
- ✅ **Все остальные страницы** - голубой фон (`#f0f8ff`)
- ✅ **Единая граница** - все страницы имеют зеленую рамку 5px

**Альтернативные цвета для главной страницы (на выбор):**
- `#f0fff0` - светло-зеленый
- `#fff8dc` - светло-бежевый
- `#f5f5dc` - бежевый
- `#e6e6fa` - лавандовый
- `#f0e68c` - хаки

Теперь главная страница визуально выделяется среди других страниц сайта! 🎨

<img width="1915" height="772" alt="image" src="https://github.com/user-attachments/assets/f467f1a2-6bcb-4d74-8994-098cf4c16175" />
<img width="1903" height="940" alt="image" src="https://github.com/user-attachments/assets/456e2467-324b-49d5-9019-75ea0f0ec078" />
<img width="1911" height="699" alt="image" src="https://github.com/user-attachments/assets/221abf4b-cf06-430d-92bf-c4b1f28ec060" />
<img width="1917" height="586" alt="image" src="https://github.com/user-attachments/assets/efec53e6-82df-4a02-a0c0-c75191e4e046" />
