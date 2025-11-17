а) Создайте внешний CSS файл. Подключите его ко всем страницам вашего 
сайта. Увеличьте размер шрифта, задайте для тега BODY фон свойством  
background-color и границу толщиной 5px

Понял! Выполняем первое задание по CSS. Вот пошаговое решение:

**1. Создаем файл `styles.css` в папке `styles/`:**

```css
/* Основные стили для всех страниц сайта */
body {
    font-family: Arial, sans-serif;
    font-size: 18px; /* Увеличенный размер шрифта */
    background-color: #f0f8ff; /* Цвет фона - светло-голубой */
    border: 5px solid #4CAF50; /* Граница толщиной 5px - зеленая */
    margin: 0;
    padding: 20px;
    line-height: 1.6;
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
```

**2. Подключаем этот CSS файл ко ВСЕМ страницам:**

**В `index.html` (в разделе `<head>`):**
```html
<head>
    <meta charset="UTF-8">
    <title>Моя первая страница</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
```

**В `hobby.html` (в разделе `<head>`):**
```html
<head>
    <meta charset="UTF-8">
    <title>Мое хобби</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
```

**В `links.html` (в разделе `<head>`):**
```html
<head>
    <meta charset="UTF-8">
    <title>Мои любимые сайты</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
```

**В `computer.html` (в разделе `<head>`):**
```html
<head>
    <meta charset="UTF-8">
    <title>Мой компьютер</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
```

**В `recipe.html` (в разделе `<head>`):**
```html
<head>
    <meta charset="UTF-8">
    <title>Рецепт яблочного пирога</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
```

**3. Пример обновленного `index.html` с подключенным CSS:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Моя первая страница</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <div class="container">
        <h1>Добро пожаловать на мой сайт!</h1>
        
        <div>
            <h2>Обо мне</h2>
            <p>Привет! Меня зовут Павел, и это моя первая веб-страница с использованием CSS.</p>
        </div>
        
        <div>
            <h2>Навигация</h2>
            <p>
                <a href="hobby.html">Мое хобби</a> | 
                <a href="links.html">Любимые сайты</a> | 
                <a href="computer.html">Мой компьютер</a> | 
                <a href="recipe.html">Рецепт</a>
            </p>
        </div>
    </div>
</body>
</html>
```

**Что мы сделали:**

✅ **Создали внешний CSS файл** - `styles/styles.css`  
✅ **Подключили ко всем страницам** - через `<link rel="stylesheet" href="styles/styles.css">`  
✅ **Увеличили размер шрифта** - `font-size: 18px`  
✅ **Задали цвет фона** - `background-color: #f0f8ff` (светло-голубой)  
✅ **Добавили границу 5px** - `border: 5px solid #4CAF50` (зеленая)  

**Результат:**
- Все страницы сайта теперь имеют единое оформление
- Увеличенный шрифт для лучшей читаемости
- Светло-голубой фон страниц
- Зеленая рамка вокруг всего содержимого
- Чистая структура: HTML - содержание, CSS - оформление

Теперь можно переходить к следующему заданию! 🎉

<img width="1267" height="742" alt="image" src="https://github.com/user-attachments/assets/33dc06a9-fb41-40c5-9c6e-c09139926261" />
<img width="1906" height="940" alt="image" src="https://github.com/user-attachments/assets/307d2626-2921-464e-bde3-6a67694a2d0c" />
<img width="1914" height="636" alt="image" src="https://github.com/user-attachments/assets/b87a0095-dde3-443a-b071-28d11abf6b8b" />
<img width="1913" height="417" alt="image" src="https://github.com/user-attachments/assets/9ecd20e3-af0e-4c0c-8c95-37e7bb3920a1" />



