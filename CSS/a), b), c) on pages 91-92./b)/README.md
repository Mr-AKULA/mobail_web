б) С помощью относительного позиционирования каждой буквы создайте 
«эффект морской волны».

# Создание эффекта морской волны с помощью относительного позиционирования

Я создам текст, где каждая буква будет позиционирована относительно своего обычного места с разными смещениями, создавая волнообразный эффект.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Эффект морской волны</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(180deg, #87CEEB, #1E90FF);
            margin: 0;
            padding: 40px 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            max-width: 800px;
            text-align: center;
        }
        
        h1 {
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            margin-bottom: 40px;
            font-size: 2.5em;
        }
        
        .wave-text {
            font-size: 3em;
            font-weight: bold;
            color: #0066cc;
            margin: 30px 0;
            line-height: 1.4;
        }
        
        .wave-letter {
            display: inline-block;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .wave-text:hover .wave-letter {
            animation: wave 1.5s ease-in-out infinite;
        }
        
        /* Создаем волнообразное движение для каждой буквы с задержкой */
        .wave-letter:nth-child(1) { animation-delay: 0.0s; }
        .wave-letter:nth-child(2) { animation-delay: 0.1s; }
        .wave-letter:nth-child(3) { animation-delay: 0.2s; }
        .wave-letter:nth-child(4) { animation-delay: 0.3s; }
        .wave-letter:nth-child(5) { animation-delay: 0.4s; }
        .wave-letter:nth-child(6) { animation-delay: 0.5s; }
        .wave-letter:nth-child(7) { animation-delay: 0.6s; }
        .wave-letter:nth-child(8) { animation-delay: 0.7s; }
        .wave-letter:nth-child(9) { animation-delay: 0.8s; }
        .wave-letter:nth-child(10) { animation-delay: 0.9s; }
        .wave-letter:nth-child(11) { animation-delay: 1.0s; }
        .wave-letter:nth-child(12) { animation-delay: 1.1s; }
        .wave-letter:nth-child(13) { animation-delay: 1.2s; }
        
        @keyframes wave {
            0%, 100% {
                transform: translateY(0);
                color: #0066cc;
            }
            25% {
                transform: translateY(-15px);
                color: #0099ff;
            }
            50% {
                transform: translateY(0);
                color: #00ccff;
            }
            75% {
                transform: translateY(10px);
                color: #66ccff;
            }
        }
        
        .explanation {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            margin-top: 30px;
            line-height: 1.6;
        }
        
        .explanation h2 {
            color: #0066cc;
            margin-top: 0;
        }
        
        .controls {
            margin: 20px 0;
        }
        
        button {
            background-color: #0066cc;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            margin: 0 10px;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #004499;
        }
        
        .static-wave {
            font-size: 2em;
            font-weight: bold;
            color: #0066cc;
            margin: 30px 0;
            line-height: 1.4;
        }
        
        .static-wave .wave-letter {
            position: relative;
        }
        
        /* Статическое позиционирование для демонстрации относительного позиционирования */
        .static-wave .wave-letter:nth-child(odd) {
            top: -5px;
        }
        
        .static-wave .wave-letter:nth-child(even) {
            top: 5px;
        }
        
        .static-wave .wave-letter:nth-child(3n) {
            top: -8px;
        }
        
        .static-wave .wave-letter:nth-child(5n) {
            top: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Эффект морской волны</h1>
        
        <div class="wave-text" id="animatedWave">
            <span class="wave-letter">П</span>
            <span class="wave-letter">р</span>
            <span class="wave-letter">и</span>
            <span class="wave-letter">в</span>
            <span class="wave-letter">е</span>
            <span class="wave-letter">т</span>
            <span class="wave-letter"> </span>
            <span class="wave-letter">м</span>
            <span class="wave-letter">и</span>
            <span class="wave-letter">р</span>
            <span class="wave-letter">!</span>
        </div>
        
        <div class="controls">
            <button onclick="startAnimation()">Запустить анимацию</button>
            <button onclick="stopAnimation()">Остановить анимацию</button>
        </div>
        
        <div class="static-wave">
            <span class="wave-letter">С</span>
            <span class="wave-letter">т</span>
            <span class="wave-letter">а</span>
            <span class="wave-letter">т</span>
            <span class="wave-letter">и</span>
            <span class="wave-letter">ч</span>
            <span class="wave-letter">е</span>
            <span class="wave-letter">с</span>
            <span class="wave-letter">к</span>
            <span class="wave-letter">а</span>
            <span class="wave-letter">я</span>
            <span class="wave-letter"> </span>
            <span class="wave-letter">в</span>
            <span class="wave-letter">о</span>
            <span class="wave-letter">л</span>
            <span class="wave-letter">н</span>
            <span class="wave-letter">а</span>
        </div>
        
        <div class="explanation">
            <h2>Как это работает?</h2>
            <p>Эффект морской волны создается с помощью относительного позиционирования каждой буквы:</p>
            <ul>
                <li>Каждая буква обернута в элемент с <code>position: relative</code></li>
                <li>Для анимированной версии используется CSS-анимация с разной задержкой для каждой буквы</li>
                <li>Для статической версии каждая буква смещена с помощью свойства <code>top</code> на разное значение</li>
                <li>Используется <code>transform: translateY()</code> для плавного перемещения букв вверх и вниз</li>
                <li>Цвет букв также меняется для усиления эффекта волны</li>
            </ul>
            <p>Наведите курсор на анимированный текст или используйте кнопки для управления анимацией.</p>
        </div>
    </div>

    <script>
        function startAnimation() {
            const waveText = document.getElementById('animatedWave');
            waveText.style.animationPlayState = 'running';
        }
        
        function stopAnimation() {
            const waveText = document.getElementById('animatedWave');
            waveText.style.animationPlayState = 'paused';
        }
        
        // Автоматический запуск анимации при загрузке
        document.addEventListener('DOMContentLoaded', function() {
            startAnimation();
        });
    </script>
</body>
</html>
```

## Особенности реализации:

1. **Относительное позиционирование**:
   - Каждая буква обернута в элемент с `position: relative`
   - Используется `transform: translateY()` для перемещения букв

2. **Волнообразный эффект**:
   - Анимированная версия: буквы плавно перемещаются вверх и вниз с задержкой
   - Статическая версия: буквы постоянно смещены на разные значения

3. **Визуальное оформление**:
   - Градиентный фон в морской тематике
   - Изменение цвета букв для усиления эффекта волны
   - Плавные переходы и анимации

4. **Интерактивность**:
   - Анимация запускается при наведении курсора
   - Кнопки для управления анимацией
   - Подробное объяснение принципа работы

Этот пример демонстрирует, как с помощью относительного позиционирования можно создать интересный визуальный эффект, напоминающий морскую волну.
<img width="975" height="745" alt="image" src="https://github.com/user-attachments/assets/2987f5e4-4598-4698-b995-994f8b2a033b" />

