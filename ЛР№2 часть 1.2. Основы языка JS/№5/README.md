2.4. Практическая работа №5. Слои. Движущиеся элементы. 
Задание 18.  
1. Рассмотрите скрипт: 
<html>  
<head>  
<title>simple animation</title>  
<script language="JavaScript">  
function moveTxt()  
{  
if (anil.style.pixelLeft < 500)  
{  
anil.style.pixelLeft +=50;  
setTimeout("moveTxt()", 5000);  
}  
}  
</script>  
</head>  
<body onLoad="moveTxt()">  
<div id="anil" style="position:absolute; left:10; top:10">  
Текст, шагом марш!  
</div>  
</body>  
</html> 
2. Измените скрипт страницы: 
• добейтесь плавного передвижения текста; 
• измените направление текста - задайте направление сверху 
вниз при помощи атрибута pixelTop. 
3. Сохраните документ с именем Ex18.html в рабочей папке. 
Задание 19.  
1. Рассмотрите скрипт: 
<head>  
<title>anima1</title>  
<script language="JavaScript">  
function moveTxt()  
{  
if (anim.style.pixelTop <500)  
{  
anim.style.pixelTop +=2;  
anim.style.pixelLeft +=2;  
setTimeout("moveTxt()", 50);  
}  
}  
</script>  
</head>  
<body onLoad="moveTxt()">  
<div id="anim" style="position:absolute; left:10; top:10">  
Текст, шагом марш!  
</div>  
</body>  
</html> 
2. Измените направление текста. Задайте направление с верхнего 
правого угла экрана (приблизительно) по диагонали к середине 
экрана. 
3. Сохраните документ с именем Ex19.html в рабочей папке. 
Задание 20. 
1. Создайте HTML-страницу, на которой будет три слоя. Верхний и 
нижней представляют из себя статичные квадраты разного цвета с 
текстом, а меду ними должна проплывать любая картинка слева 
направо. 
2. Сохраните документ с именем Ex20.html в рабочей папке.



# Практическая работа №5. Слои. Движущиеся элементы

В этой практической работе рассматривается создание анимации и движение элементов на странице с помощью JavaScript.

## Задание 18: Плавное движение текста сверху вниз

**Цель:** Научиться создавать плавную анимацию движения элементов.

**Файлы:**
- `Ex18.html`

**Задачи:**
1. Изменить направление движения на сверху вниз
2. Сделать движение более плавным
3. Использовать свойство `pixelTop` для вертикального движения

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Плавная анимация текста</title>
    <style>
        #anil {
            position: absolute;
            left: 10px;
            top: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #ff6b6b;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            transition: all 0.1s ease;
        }
    </style>
    <script>
        function moveTxt() {
            var element = document.getElementById('anil');
            var currentTop = parseInt(element.style.top) || 10;
            
            if (currentTop < 500) {
                currentTop += 2; // Меньший шаг для плавности
                element.style.top = currentTop + 'px';
                setTimeout(moveTxt, 50); // Более частая частота обновления
            }
        }
        
        // Запуск анимации при загрузке страницы
        window.onload = moveTxt;
    </script>
</head>
<body>
    <div id="anil" style="position:absolute; left:10px; top:10px;">
        Текст, шагом марш вниз!
    </div>
    
    <div style="position: absolute; top: 510px; left: 10px; color: #666;">
        <p>Текст движется плавно сверху вниз</p>
    </div>
</body>
</html>
```

**Современная версия с requestAnimationFrame:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Современная анимация текста</title>
    <style>
        #anil {
            position: absolute;
            left: 50%;
            top: 10px;
            transform: translateX(-50%);
            font-size: 24px;
            font-weight: bold;
            color: #4ecdc4;
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
    </style>
    <script>
        function moveTxt() {
            var element = document.getElementById('anil');
            var startTime = null;
            var duration = 3000; // 3 секунды
            var startTop = 10;
            var endTop = 500;
            
            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                var progress = (currentTime - startTime) / duration;
                
                if (progress < 1) {
                    var currentTop = startTop + (endTop - startTop) * progress;
                    element.style.top = currentTop + 'px';
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        window.onload = moveTxt;
    </script>
</head>
<body>
    <div id="anil">Текст плавно движется вниз!</div>
</body>
</html>
```

---

## Задание 19: Движение по диагонали к центру экрана

**Цель:** Научиться создавать сложные траектории движения.

**Файлы:**
- `Ex19.html`

**Задачи:**
1. Задать начальную позицию в правом верхнем углу
2. Реализовать движение по диагонали к центру экрана
3. Использовать одновременное изменение `pixelTop` и `pixelLeft`

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Движение по диагонали</title>
    <style>
        #anim {
            position: absolute;
            font-size: 20px;
            font-weight: bold;
            color: #ff9ff3;
            padding: 15px;
            background: #f368e0;
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .center-mark {
            position: absolute;
            width: 10px;
            height: 10px;
            background: red;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    </style>
    <script>
        function moveTxt() {
            var element = document.getElementById('anim');
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
            
            // Начальная позиция - правый верхний угол
            var startLeft = screenWidth - 200;
            var startTop = 10;
            
            // Конечная позиция - центр экрана
            var endLeft = screenWidth / 2 - 100;
            var endTop = screenHeight / 2 - 25;
            
            element.style.left = startLeft + 'px';
            element.style.top = startTop + 'px';
            
            function animate() {
                var currentLeft = parseInt(element.style.left);
                var currentTop = parseInt(element.style.top);
                
                // Двигаемся к центру
                if (currentLeft > endLeft) {
                    currentLeft -= 2;
                }
                if (currentTop < endTop) {
                    currentTop += 2;
                }
                
                element.style.left = currentLeft + 'px';
                element.style.top = currentTop + 'px';
                
                // Продолжаем анимацию пока не достигнем цели
                if (currentLeft > endLeft || currentTop < endTop) {
                    setTimeout(animate, 20);
                }
            }
            
            animate();
        }
        
        window.onload = moveTxt;
    </script>
</head>
<body>
    <div id="anim">Движение к центру!</div>
    <div class="center-mark" title="Центр экрана"></div>
    
    <div style="position: fixed; bottom: 20px; left: 20px; background: white; padding: 10px; border-radius: 5px;">
        <p>Текст начинает движение из правого верхнего угла</p>
        <p>и движется по диагонали к центру экрана</p>
    </div>
</body>
</html>
```

**Улучшенная версия с плавным движением:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Плавное движение по диагонали</title>
    <style>
        #anim {
            position: absolute;
            font-size: 22px;
            font-weight: bold;
            color: #00d2d3;
            padding: 12px 24px;
            background: #54a0ff;
            color: white;
            border-radius: 15px;
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            transition: all 0.1s ease;
        }
        
        .target {
            position: absolute;
            width: 120px;
            height: 60px;
            border: 2px dashed #ff6b6b;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff6b6b;
            font-weight: bold;
        }
    </style>
    <script>
        function moveTxt() {
            var element = document.getElementById('anim');
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
            
            // Начальная позиция - правый верхний угол
            var startLeft = screenWidth - 250;
            var startTop = 50;
            
            // Конечная позиция - центр
            var endLeft = screenWidth / 2 - 60;
            var endTop = screenHeight / 2 - 15;
            
            element.style.left = startLeft + 'px';
            element.style.top = startTop + 'px';
            
            var startTime = null;
            var duration = 4000; // 4 секунды
            
            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                var progress = (currentTime - startTime) / duration;
                
                if (progress < 1) {
                    // Плавное движение с easing
                    var easeProgress = 1 - Math.pow(1 - progress, 3);
                    
                    var currentLeft = startLeft + (endLeft - startLeft) * easeProgress;
                    var currentTop = startTop + (endTop - startTop) * easeProgress;
                    
                    element.style.left = currentLeft + 'px';
                    element.style.top = currentTop + 'px';
                    
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        window.onload = moveTxt;
    </script>
</head>
<body>
    <div id="anim">Движение к центру экрана</div>
    <div class="target">Цель</div>
</body>
</html>
```

---

## Задание 20: Три слоя с движущимся изображением

**Цель:** Научиться работать с несколькими слоями и создавать сложные анимации.

**Файлы:**
- `Ex20.html`

**Задачи:**
1. Создать три слоя (верхний статичный, средний движущийся, нижний статичный)
2. Реализовать движение изображения слева направо между слоями
3. Использовать различные цвета и стили для слоев

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Три слоя с анимацией</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        
        .layer {
            position: absolute;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .top-layer {
            top: 0;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 10;
        }
        
        .bottom-layer {
            bottom: 0;
            height: 200px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            z-index: 10;
        }
        
        .moving-image {
            position: absolute;
            top: 250px;
            left: -200px; /* Начинаем за пределами экрана слева */
            width: 150px;
            height: 150px;
            z-index: 5;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.3);
            transition: left 0.05s linear;
        }
        
        .controls {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 100;
        }
        
        button {
            padding: 8px 16px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            background: #667eea;
            color: white;
            cursor: pointer;
            font-size: 14px;
        }
        
        button:hover {
            background: #764ba2;
        }
    </style>
    <script>
        var animationId = null;
        var isAnimating = false;
        
        function startAnimation() {
            if (isAnimating) return;
            
            var image = document.getElementById('movingImage');
            var screenWidth = window.innerWidth;
            isAnimating = true;
            
            function animate() {
                var currentLeft = parseInt(image.style.left);
                
                if (currentLeft < screenWidth + 200) {
                    currentLeft += 3;
                    image.style.left = currentLeft + 'px';
                    animationId = requestAnimationFrame(animate);
                } else {
                    // Достигли конца - начинаем заново
                    image.style.left = '-200px';
                    animationId = requestAnimationFrame(animate);
                }
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        function stopAnimation() {
            if (animationId) {
                cancelAnimationFrame(animationId);
                isAnimating = false;
            }
        }
        
        function resetAnimation() {
            stopAnimation();
            var image = document.getElementById('movingImage');
            image.style.left = '-200px';
        }
        
        // Запускаем анимацию автоматически при загрузке
        window.onload = function() {
            startAnimation();
        };
    </script>
</head>
<body>
    <!-- Верхний статичный слой -->
    <div class="layer top-layer">
        Верхний статичный слой
    </div>
    
    <!-- Движущееся изображение -->
    <img id="movingImage" 
         class="moving-image" 
         src="https://via.placeholder.com/150/00cec9/FFFFFF?text=Moving+Image" 
         alt="Движущееся изображение">
    
    <!-- Нижний статичный слой -->
    <div class="layer bottom-layer">
        Нижний статичный слой
    </div>
    
    <!-- Панель управления -->
    <div class="controls">
        <h3>Управление анимацией</h3>
        <button onclick="startAnimation()">Старт</button>
        <button onclick="stopAnimation()">Стоп</button>
        <button onclick="resetAnimation()">Сброс</button>
    </div>
</body>
</html>
```

**Альтернативная версия с несколькими движущимися элементами:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Множественная анимация слоев</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
            background: #1e272e;
        }
        
        .static-layer {
            position: absolute;
            width: 100%;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            font-weight: bold;
            color: white;
            z-index: 10;
        }
        
        .top-layer {
            top: 0;
            background: linear-gradient(90deg, #ff9ff3, #f368e0);
        }
        
        .bottom-layer {
            bottom: 0;
            background: linear-gradient(90deg, #0abde3, #10ac84);
        }
        
        .moving-element {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 5;
        }
        
        #movingImage {
            top: 200px;
            border-radius: 20px;
        }
    </style>
    <script>
        function animateElements() {
            var elements = [
                { id: 'movingImage', speed: 3, top: 200 },
                { id: 'circle1', speed: 2, top: 180 },
                { id: 'circle2', speed: 4, top: 220 }
            ];
            
            function animate() {
                elements.forEach(function(element) {
                    var el = document.getElementById(element.id);
                    var currentLeft = parseInt(el.style.left) || -100;
                    var screenWidth = window.innerWidth;
                    
                    if (currentLeft > screenWidth + 100) {
                        currentLeft = -100;
                    } else {
                        currentLeft += element.speed;
                    }
                    
                    el.style.left = currentLeft + 'px';
                });
                
                requestAnimationFrame(animate);
            }
            
            // Инициализация позиций
            elements.forEach(function(element) {
                var el = document.getElementById(element.id);
                el.style.left = '-100px';
                el.style.top = element.top + 'px';
            });
            
            animate();
        }
        
        window.onload = animateElements;
    </script>
</head>
<body>
    <div class="static-layer top-layer">
        📊 Верхний информационный слой
    </div>
    
    <img id="movingImage" 
         class="moving-element" 
         src="https://via.placeholder.com/100/ff9ff3/FFFFFF?text=IMG" 
         alt="Движущееся изображение">
    
    <div id="circle1" class="moving-element" style="background: #ff6b6b;">
        🔴
    </div>
    
    <div id="circle2" class="moving-element" style="background: #48dbfb;">
        🔵
    </div>
    
    <div class="static-layer bottom-layer">
        📈 Нижний статистический слой
    </div>
</body>
</html>
```

---

## Примечания

### Для всех заданий:
- `requestAnimationFrame` предпочтительнее `setTimeout` для анимаций
- Всегда очищайте анимации при остановке (`cancelAnimationFrame`)
- Учитывайте производительность при создании сложных анимаций

### Особенности анимации:
- **Плавность** достигается за счет маленьких шагов и высокой частоты обновления
- **Easing функции** делают движение более естественным
- **Абсолютное позиционирование** необходимо для перемещения элементов

### Совместимость:
- Современные подходы используют `transform` и `opacity` для лучшей производительности
- `pixelLeft` и `pixelTop` - устаревшие свойства, лучше использовать `style.left` и `style.top`


