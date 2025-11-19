
2.4. Практическая работа №4. Объединение JavaScript и CSS. 
Задание 15.  
1. Рассмотрите скрипт: 
<head>  
<title>h1</title>  
<script language="JavaScript">  
function colorchange()  
{  
head.style.color = "red";  
}  
</script>  
</head>  
<body>  
<h1 id="head" onmouseover="colorchange()">Добро пожаловать на 
нашу страницу!</h1>  
</body>  
</html> 
2. Допишите скрипт страницы таким образом, чтобы красный цвет 
исчезал после отвода курсора мыши с заголовка. 
3. Сохраните документ с именем Ex15.html в рабочей папке. 
Задание 16.  
1. Рассмотрите скрипт: 
<html>  
<head>  
<title>text decoration</title>  
<script language="JavaScript">  
function addunderline()  
{  
head.style.textDecoration = "underline";  
}  
function removeunderline()  
{  
head.style.textDecoration = "none";  
}  
</script>  
</head>  
<body>  
<h1 id="head" onMouseover="addunderline()" 
onMouseout="removeunderline()"> 
Добро пожаловать на нашу страницу!  
</h1>  
</body>  
</html> 
2. Допишите скрипт страницы  таким образом, чтобы на одинарный 
щелчок мыши появлялось полоса над заголовком, а на двойной 
щелчок – текст зачеркивался. Используйте события onclick, 
ondblclick и значения рассматриваемого свойства overline и line
through. 
3.  Сохраните документ с именем Ex18.html в рабочей папке. 
Задание 17.  
1. Создайте HTML-документ, содержащий любое изображение. 
2. Поместите изображение в тег <div>. Задайте для него абсолютное 
позиционирование со смещением вниз и влево на 500 пикселей. 
3. Сохраните документ с именем Ex17.html в рабочей папке.


# Практическая работа №4. Объединение JavaScript и CSS

В этой практической работе рассматривается интеграция JavaScript и CSS для создания интерактивных эффектов.

## Задание 15: Изменение цвета текста

**Цель:** Научиться изменять стили элементов при событиях мыши.

**Файлы:**
- `Ex15.html`

**Задачи:**
1. Изменить цвет заголовка на красный при наведении мыши
2. Вернуть исходный цвет при отведении мыши

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Изменение цвета заголовка</title>
    <script>
        function changeColorRed() {
            document.getElementById('head').style.color = "red";
        }
        
        function changeColorBlack() {
            document.getElementById('head').style.color = "black";
        }
    </script>
</head>
<body>
    <h1 id="head" 
        onmouseover="changeColorRed()" 
        onmouseout="changeColorBlack()">
        Добро пожаловать на нашу страницу!
    </h1>
</body>
</html>
```

**Альтернативная реализация с CSS классами:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Изменение цвета заголовка</title>
    <style>
        .red-text {
            color: red;
        }
        .normal-text {
            color: black;
        }
    </style>
    <script>
        function changeColorRed() {
            var head = document.getElementById('head');
            head.classList.remove('normal-text');
            head.classList.add('red-text');
        }
        
        function changeColorBlack() {
            var head = document.getElementById('head');
            head.classList.remove('red-text');
            head.classList.add('normal-text');
        }
    </script>
</head>
<body>
    <h1 id="head" 
        class="normal-text"
        onmouseover="changeColorRed()" 
        onmouseout="changeColorBlack()">
        Добро пожаловать на нашу страницу!
    </h1>
</body>
</html>
```

---

## Задание 16: Декорации текста по кликам

**Цель:** Научиться обрабатывать различные события кликов мыши.

**Файлы:**
- `Ex18.html`

**Задачи:**
1. Добавить подчеркивание при наведении мыши
2. Убрать подчеркивание при отведении мыши  
3. Добавить надчеркивание при одинарном клике
4. Добавить зачеркивание при двойном клике

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Декорации текста</title>
    <script>
        function addUnderline() {
            document.getElementById('head').style.textDecoration = "underline";
        }
        
        function removeUnderline() {
            document.getElementById('head').style.textDecoration = "none";
        }
        
        function addOverline() {
            document.getElementById('head').style.textDecoration = "overline";
        }
        
        function addLineThrough() {
            document.getElementById('head').style.textDecoration = "line-through";
        }
        
        function resetDecoration() {
            document.getElementById('head').style.textDecoration = "none";
        }
    </script>
</head>
<body>
    <h1 id="head" 
        onmouseover="addUnderline()" 
        onmouseout="removeUnderline()"
        onclick="addOverline()"
        ondblclick="addLineThrough()">
        Добро пожаловать на нашу страницу!
    </h1>
    
    <p>Наведите мышь - подчеркивание</p>
    <p>Одинарный клик - надчеркивание</p>
    <p>Двойной клик - зачеркивание</p>
    
    <button onclick="resetDecoration()">Сбросить оформление</button>
</body>
</html>
```

**Улучшенная версия с комбинированными стилями:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Декорации текста - улучшенная версия</title>
    <style>
        #head {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .underlined {
            text-decoration: underline;
        }
        .overlined {
            text-decoration: overline;
        }
        .line-through {
            text-decoration: line-through;
        }
        .combined {
            text-decoration: overline underline line-through;
        }
    </style>
    <script>
        var currentDecoration = 'none';
        
        function addUnderline() {
            var head = document.getElementById('head');
            head.classList.add('underlined');
        }
        
        function removeUnderline() {
            var head = document.getElementById('head');
            head.classList.remove('underlined');
        }
        
        function toggleOverline() {
            var head = document.getElementById('head');
            head.classList.toggle('overlined');
        }
        
        function toggleLineThrough() {
            var head = document.getElementById('head');
            head.classList.toggle('line-through');
        }
        
        function resetAll() {
            var head = document.getElementById('head');
            head.className = '';
        }
    </script>
</head>
<body>
    <h1 id="head" 
        onmouseover="addUnderline()" 
        onmouseout="removeUnderline()"
        onclick="toggleOverline()"
        ondblclick="toggleLineThrough()">
        Добро пожаловать на нашу страницу!
    </h1>
    
    <p><strong>Инструкция:</strong></p>
    <ul>
        <li>Наведите мышь - подчеркивание</li>
        <li>Отведите мышь - убрать подчеркивание</li>
        <li>Одинарный клик - переключить надчеркивание</li>
        <li>Двойной клик - переключить зачеркивание</li>
    </ul>
    
    <button onclick="resetAll()">Сбросить все оформление</button>
</body>
</html>
```

---

## Задание 17: Абсолютное позиционирование изображения

**Цель:** Научиться работать с абсолютным позиционированием элементов.

**Файлы:**
- `Ex17.html`

**Задачи:**
1. Создать контейнер для изображения
2. Применить абсолютное позиционирование
3. Сместить элемент на 500px вниз и влево

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Абсолютное позиционирование</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            height: 2000px; /* Добавляем высоту для демонстрации прокрутки */
            position: relative;
        }
        
        .image-container {
            position: absolute;
            top: 500px;    /* Смещение вниз на 500px */
            left: 500px;   /* Смещение влево на 500px */
            border: 2px solid #333;
            padding: 10px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .image-container img {
            display: block;
            max-width: 300px;
            height: auto;
        }
        
        .controls {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
    </style>
    <script>
        function moveImage() {
            var container = document.getElementById('imageContainer');
            var topPos = document.getElementById('topPosition').value;
            var leftPos = document.getElementById('leftPosition').value;
            
            container.style.top = topPos + 'px';
            container.style.left = leftPos + 'px';
        }
        
        function resetPosition() {
            var container = document.getElementById('imageContainer');
            container.style.top = '500px';
            container.style.left = '500px';
            
            document.getElementById('topPosition').value = '500';
            document.getElementById('leftPosition').value = '500';
        }
    </script>
</head>
<body>
    <h1>Абсолютное позиционирование изображения</h1>
    <p>Изображение позиционировано абсолютно со смещением 500px вниз и 500px влево.</p>
    
    <div class="image-container" id="imageContainer">
        <img src="https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Absolute+Position" 
             alt="Пример изображения с абсолютным позиционированием">
        <p>Этот контейнер имеет абсолютное позиционирование</p>
    </div>
    
    <div class="controls">
        <h3>Управление позицией</h3>
        <label for="topPosition">Сверху (px):</label>
        <input type="number" id="topPosition" value="500" min="0" max="1000"><br><br>
        
        <label for="leftPosition">Слева (px):</label>
        <input type="number" id="leftPosition" value="500" min="0" max="1000"><br><br>
        
        <button onclick="moveImage()">Переместить</button>
        <button onclick="resetPosition()">Сбросить</button>
    </div>
    
    <div style="margin-top: 600px;">
        <p><strong>Особенности абсолютного позиционирования:</strong></p>
        <ul>
            <li>Элемент удаляется из нормального потока документа</li>
            <li>Позиционируется относительно ближайшего позиционированного предка</li>
            <li>Не занимает места в макете страницы</li>
            <li>Может перекрывать другие элементы</li>
        </ul>
    </div>
</body>
</html>
```

**Упрощенная версия:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Абсолютное позиционирование - упрощенная версия</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            height: 1500px;
            position: relative; /* Создаем контекст позиционирования */
        }
        
        .absolute-image {
            position: absolute;
            top: 500px;
            left: 500px;
            width: 300px;
            border: 3px solid #ff6b6b;
            border-radius: 10px;
        }
        
        .info {
            margin-top: 600px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Пример абсолютного позиционирования</h1>
    <p>Прокрутите страницу вниз, чтобы увидеть изображение с абсолютным позиционированием.</p>
    
    <img class="absolute-image" 
         src="https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Positioned+Absolutely" 
         alt="Абсолютно позиционированное изображение">
    
    <div class="info">
        <h2>Координаты изображения:</h2>
        <p><strong>top:</strong> 500px (от верхнего края)</p>
        <p><strong>left:</strong> 500px (от левого края)</p>
        <p>Изображение сохраняет свою позицию при прокрутке страницы.</p>
    </div>
</body>
</html>
```

---

## Примечания

### Для Задания 15:
- Событие `onmouseover` срабатывает при наведении курсора на элемент
- Событие `onmouseout` срабатывает при уходе курсора с элемента
- Свойство `style.color` изменяет цвет текста

### Для Задания 16:
- Свойство `textDecoration` может принимать значения:
  - `underline` - подчеркивание
  - `overline` - надчеркивание  
  - `line-through` - зачеркивание
  - `none` - без оформления
- Можно комбинировать значения через пробел

### Для Задания 17:
- `position: absolute` - элемент позиционируется относительно ближайшего позиционированного предка
- Если позиционированного предка нет - относительно окна браузера
- Свойства `top`, `left`, `right`, `bottom` задают смещение от соответствующих краев

## Как запустить проекты

1. Сохраните каждый пример в соответствующий файл
2. Для изображений используйте реальные файлы или замените URL на актуальные
3. Откройте HTML-файлы в браузере для тестирования функциональности
