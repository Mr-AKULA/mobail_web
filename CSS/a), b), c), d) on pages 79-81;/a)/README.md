а) На основе данных о популярности браузеров за 2010 год (из предыдущей 
лекции) создайте столбчатую диаграмму (гистограмму). Пример показан на 
рис. 
У к а з а н и е: используйте элементы DIV заданной ширины. 
3.22.  
80 
Тема 3 
Рисунок. 3.22. 

<img width="360" height="437" alt="image" src="https://github.com/user-attachments/assets/3a07a7a8-6d06-468c-8be4-81c6f2850ec4" />

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Столбчатая диаграмма популярности браузеров за 2010 год</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 30px;
        }
        
        .chart {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            height: 400px;
            padding: 20px;
            border: 1px solid #ddd;
            background-color: #fafafa;
            position: relative;
        }
        
        /* Вертикальная ось Y */
        .y-axis {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 40px;
            border-right: 2px solid #333;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-right: 10px;
        }
        
        .y-label {
            text-align: right;
            font-size: 12px;
            color: #666;
            transform: translateY(50%);
        }
        
        /* Горизонтальная ось X */
        .x-axis {
            position: absolute;
            left: 40px;
            right: 0;
            bottom: 0;
            height: 30px;
            border-top: 2px solid #333;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            padding-top: 5px;
        }
        
        .x-label {
            text-align: center;
            font-size: 12px;
            color: #666;
            width: 80px;
        }
        
        /* Столбцы диаграммы */
        .bar-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80px;
            height: 100%;
        }
        
        .bar {
            width: 50px;
            background: linear-gradient(to top, #4a90e2, #2c6fb7);
            border-radius: 4px 4px 0 0;
            position: relative;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .bar:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        
        .bar-value {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            font-weight: bold;
            color: #2c3e50;
            background: rgba(255,255,255,0.9);
            padding: 2px 6px;
            border-radius: 3px;
            border: 1px solid #ddd;
        }
        
        .browser-name {
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            text-align: center;
        }
        
        .legend {
            display: flex;
            justify-content: center;
            margin-top: 30px;
            gap: 20px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 12px;
        }
        
        .legend-color {
            width: 15px;
            height: 15px;
            background: linear-gradient(to top, #4a90e2, #2c6fb7);
            border-radius: 2px;
        }
        
        .data-source {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 20px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Популярность браузеров за 2010 год</h1>
        
        <div class="chart">
            <!-- Ось Y -->
            <div class="y-axis">
                <div class="y-label">80%</div>
                <div class="y-label">60%</div>
                <div class="y-label">40%</div>
                <div class="y-label">20%</div>
                <div class="y-label">0%</div>
            </div>
            
            <!-- Ось X -->
            <div class="x-axis">
                <div class="x-label">Internet Explorer</div>
                <div class="x-label">Firefox</div>
                <div class="x-label">Safari</div>
                <div class="x-label">Opera</div>
            </div>
            
            <!-- Столбцы диаграммы -->
            <div class="bar-container">
                <div class="bar" style="height: 61.43%;" data-value="61.43%">
                    <div class="bar-value">61.43%</div>
                </div>
                <div class="browser-name">IE</div>
            </div>
            
            <div class="bar-container">
                <div class="bar" style="height: 24.40%;" data-value="24.40%">
                    <div class="bar-value">24.40%</div>
                </div>
                <div class="browser-name">Firefox</div>
            </div>
            
            <div class="bar-container">
                <div class="bar" style="height: 4.55%;" data-value="4.55%">
                    <div class="bar-value">4.55%</div>
                </div>
                <div class="browser-name">Safari</div>
            </div>
            
            <div class="bar-container">
                <div class="bar" style="height: 2.37%;" data-value="2.37%">
                    <div class="bar-value">2.37%</div>
                </div>
                <div class="browser-name">Opera</div>
            </div>
        </div>
        
        <div class="legend">
            <div class="legend-item">
                <div class="legend-color"></div>
                <span>Доля использования браузеров</span>
            </div>
        </div>
        
        <div class="data-source">
            Данные за 2010 год: IE - 61.43%, Firefox - 24.40%, Safari - 4.55%, Opera - 2.37%
        </div>
    </div>

    <script>
        // Добавляем интерактивность для столбцов
        document.addEventListener('DOMContentLoaded', function() {
            const bars = document.querySelectorAll('.bar');
            
            bars.forEach(bar => {
                bar.addEventListener('mouseenter', function() {
                    const value = this.getAttribute('data-value');
                    const browser = this.closest('.bar-container').querySelector('.browser-name').textContent;
                    this.style.background = 'linear-gradient(to top, #e74c3c, #c0392b)';
                });
                
                bar.addEventListener('mouseleave', function() {
                    this.style.background = 'linear-gradient(to top, #4a90e2, #2c6fb7)';
                });
            });
        });
    </script>
</body>
</html>
```

## Альтернативный вариант с более простой реализацией:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Простая столбчатая диаграмма - Браузеры 2010</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f0f0f0;
        }
        
        .simple-chart {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 40px;
        }
        
        .chart-row {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            padding: 10px;
        }
        
        .browser-label {
            width: 100px;
            font-weight: bold;
            text-align: right;
            padding-right: 20px;
            color: #555;
        }
        
        .bar-wrapper {
            flex-grow: 1;
            background: #ecf0f1;
            height: 30px;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
        }
        
        .bar {
            height: 100%;
            border-radius: 15px;
            transition: width 1s ease-in-out;
            position: relative;
        }
        
        .bar-value {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            font-weight: bold;
            font-size: 12px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        
        /* Цвета для разных браузеров */
        .ie-bar { background: linear-gradient(90deg, #3498db, #2980b9); }
        .firefox-bar { background: linear-gradient(90deg, #e74c3c, #c0392b); }
        .safari-bar { background: linear-gradient(90deg, #2ecc71, #27ae60); }
        .opera-bar { background: linear-gradient(90deg, #9b59b6, #8e44ad); }
        
        .total {
            text-align: center;
            margin-top: 30px;
            padding: 15px;
            background: #34495e;
            color: white;
            border-radius: 8px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="simple-chart">
        <h2>📊 Популярность браузеров в 2010 году</h2>
        
        <div class="chart-row">
            <div class="browser-label">Internet Explorer</div>
            <div class="bar-wrapper">
                <div class="bar ie-bar" style="width: 61.43%">
                    <span class="bar-value">61.43%</span>
                </div>
            </div>
        </div>
        
        <div class="chart-row">
            <div class="browser-label">Firefox</div>
            <div class="bar-wrapper">
                <div class="bar firefox-bar" style="width: 24.40%">
                    <span class="bar-value">24.40%</span>
                </div>
            </div>
        </div>
        
        <div class="chart-row">
            <div class="browser-label">Safari</div>
            <div class="bar-wrapper">
                <div class="bar safari-bar" style="width: 4.55%">
                    <span class="bar-value">4.55%</span>
                </div>
            </div>
        </div>
        
        <div class="chart-row">
            <div class="browser-label">Opera</div>
            <div class="bar-wrapper">
                <div class="bar opera-bar" style="width: 2.37%">
                    <span class="bar-value">2.37%</span>
                </div>
            </div>
        </div>
        
        <div class="total">
            Общая доля рынка: 92.75% (остальные браузеры - 7.25%)
        </div>
    </div>

    <script>
        // Анимация появления столбцов
        document.addEventListener('DOMContentLoaded', function() {
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                const originalWidth = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = originalWidth;
                }, 100);
            });
        });
    </script>
</body>
</html>
```

## Ключевые особенности реализации:

### 1. **Столбчатая диаграмма с использованием DIV:**
- Каждый столбец - элемент DIV с заданной шириной (процентом)
- Использование Flexbox для выравнивания
- Градиентные фоны для визуальной привлекательности

### 2. **Элементы диаграммы:**
- **Ось Y**: Процентные значения слева
- **Ось X**: Названия браузеров снизу
- **Столбцы**: Прямоугольники с высотой, пропорциональной данным
- **Подписи**: Значения над столбцами

### 3. **Интерактивность:**
- Эффекты при наведении курсора
- Анимация появления
- Подсветка элементов

### 4. **Данные за 2010 год:**
- Internet Explorer: 61.43%
- Firefox: 24.40%
- Safari: 4.55%
- Opera: 2.37%

Оба варианта корректно отображают данные и соответствуют требованиям задания по созданию столбчатой диаграммы с использованием элементов DIV.

<img width="1007" height="730" alt="image" src="https://github.com/user-attachments/assets/4f2dc83a-6cd5-437e-b788-c1e5ad817552" />



