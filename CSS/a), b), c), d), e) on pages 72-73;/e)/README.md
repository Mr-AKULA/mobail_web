д*) Отключите фон у ячеек таблицы. Добавьте фоновое изображение для 
таблицы. 

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 3.3д - Таблица с фоновым изображением</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .table-container {
            background-color: rgba(255, 255, 255, 0.92);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            max-width: 900px;
            margin: 0 auto;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            /* Фоновое изображение для таблицы */
            background-image: url('images/background.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: local;
            position: relative;
            z-index: 1;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        /* Полупрозрачный оверлей для лучшей читаемости */
        table::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.85);
            z-index: -1;
        }
        
        th {
            background: linear-gradient(135deg, rgba(74, 144, 226, 0.9), rgba(44, 111, 183, 0.9));
            color: white;
            font-weight: bold;
            padding: 20px 15px;
            text-align: center;
            border: none;
            font-size: 15px;
            height: 60px;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
            position: relative;
            z-index: 2;
            backdrop-filter: blur(10px);
            border-bottom: 2px solid rgba(255,255,255,0.3);
        }
        
        td {
            padding: 18px 15px;
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.3);
            font-size: 14px;
            height: 60px;
            position: relative;
            z-index: 2;
            /* Отключаем фон у ячеек */
            background: none !important;
            color: #2c3e50;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        /* Одинаковая высота для всех строк */
        tr {
            height: 60px;
        }
        
        /* Стили для левой колонки с годами - без фона */
        td:first-child,
        th:first-child {
            background: none !important;
            font-weight: bold;
            color: #2c3e50;
            border-right: 2px solid rgba(255,255,255,0.4);
            position: relative;
            z-index: 2;
            backdrop-filter: blur(5px);
        }
        
        th:first-child {
            background: linear-gradient(135deg, rgba(106, 176, 76, 0.9), rgba(86, 146, 56, 0.9)) !important;
            color: white;
        }
        
        /* Отключаем все фоны для ячеек */
        th:nth-child(odd):not(:first-child),
        td:nth-child(odd):not(:first-child),
        th:nth-child(even),
        td:nth-child(even) {
            background: none !important;
        }
        
        /* Эффект при наведении на строку */
        tbody tr:hover td {
            background: rgba(74, 144, 226, 0.15) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        /* Эффект при наведении на ячейку */
        td:hover {
            background: rgba(74, 144, 226, 0.25) !important;
            transform: scale(1.03);
            z-index: 3;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        /* Специальное оформление для максимальных значений */
        .max-value {
            color: #e74c3c;
            font-weight: bold;
            position: relative;
            animation: glow 2s ease-in-out infinite alternate;
        }
        
        .max-value::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100% + 20px);
            height: calc(100% + 10px);
            background: rgba(231, 76, 60, 0.1);
            border-radius: 8px;
            z-index: -1;
        }
        
        @keyframes glow {
            from {
                text-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
            }
            to {
                text-shadow: 0 0 15px rgba(231, 76, 60, 0.8), 0 0 20px rgba(231, 76, 60, 0.6);
            }
        }
        
        .table-title {
            text-align: center;
            font-size: 28px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 25px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            background: linear-gradient(135deg, #2c3e50, #4a90e2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .figure-caption {
            font-style: italic;
            text-align: center;
            color: #666;
            font-size: 14px;
            margin-top: 20px;
            background: rgba(255,255,255,0.8);
            padding: 12px;
            border-radius: 8px;
            border-left: 4px solid #4a90e2;
        }
        
        /* Стили для информации о фоне */
        .background-info {
            text-align: center;
            font-size: 13px;
            color: #666;
            margin: 15px 0;
            padding: 10px;
            background: rgba(255,255,255,0.7);
            border-radius: 6px;
            border: 1px dashed #4a90e2;
        }
        
        /* Стили для подсказки если изображение не загрузится */
        .fallback-message {
            display: none;
            text-align: center;
            color: #e74c3c;
            font-size: 12px;
            padding: 10px;
            background: rgba(231, 76, 60, 0.1);
            border-radius: 5px;
            margin: 10px 0;
        }
        
        /* Адаптивность для мобильных устройств */
        @media (max-width: 768px) {
            .table-container {
                padding: 15px;
                margin: 10px;
            }
            
            th, td {
                padding: 12px 8px;
                font-size: 13px;
            }
            
            .table-title {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="table-container">
        <div class="table-title">📊 Статистика использования браузеров по годам</div>
        
        <div class="background-info">
            💡 Таблица использует фоновое изображение: <strong>images/background.jpg</strong>
        </div>
        
        <div class="fallback-message" id="fallbackMessage">
            ⚠️ Фоновое изображение не загружено. Проверьте путь: images/background.jpg
        </div>
        
        <table id="mainTable">
            <thead>
                <tr>
                    <th>Год/Браузер</th>
                    <th>Internet Explorer</th>
                    <th>Firefox</th>
                    <th>Safari</th>
                    <th>Opera</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2010</td>
                    <td>61.43%</td>
                    <td>24.40%</td>
                    <td>4.55%</td>
                    <td>2.37%</td>
                </tr>
                <tr>
                    <td>2009</td>
                    <td>69.13%</td>
                    <td>22.67%</td>
                    <td>3.58%</td>
                    <td>2.18%</td>
                </tr>
                <tr>
                    <td>2008</td>
                    <td>77.83%</td>
                    <td>16.86%</td>
                    <td>2.65%</td>
                    <td>1.84%</td>
                </tr>
                <tr>
                    <td>2007</td>
                    <td>79.38%</td>
                    <td>14.35%</td>
                    <td>4.70%</td>
                    <td>0.50%</td>
                </tr>
            </tbody>
        </table>
        
        <div class="figure-caption">
            Рисунок 3.16д - Таблица с отключенным фоном ячеек и фоновым изображением "background.jpg"
        </div>
    </div>

    <script>
        // Добавляем класс для максимальных значений в каждом году
        document.addEventListener('DOMContentLoaded', function() {
            const rows = document.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td:not(:first-child)');
                let maxValue = 0;
                let maxCell = null;
                
                cells.forEach(cell => {
                    const value = parseFloat(cell.textContent);
                    if (value > maxValue) {
                        maxValue = value;
                        maxCell = cell;
                    }
                });
                
                if (maxCell) {
                    maxCell.classList.add('max-value');
                }
            });
            
            // Проверка загрузки фонового изображения
            const table = document.getElementById('mainTable');
            const fallbackMessage = document.getElementById('fallbackMessage');
            
            const bgImage = new Image();
            bgImage.src = 'images/background.jpg';
            
            bgImage.onload = function() {
                console.log('Фоновое изображение успешно загружено');
                fallbackMessage.style.display = 'none';
            };
            
            bgImage.onerror = function() {
                console.error('Ошибка загрузки фонового изображения');
                fallbackMessage.style.display = 'block';
                
                // Устанавливаем fallback градиентный фон
                table.style.backgroundImage = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
            };
        });
    </script>
</body>
</html>
```

## Ключевые особенности реализации:

### 1. **Использование внешнего фонового изображения**
```css
table {
    background-image: url('images/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

### 2. **Отключение фона у ячеек**
- Все ячейки имеют `background: none !important`
- Сохранение прозрачности для отображения фона таблицы

### 3. **Улучшения для работы с фоновым изображением:**

**Визуальные:**
- Полупрозрачный белый оверлей (`rgba(255, 255, 255, 0.85)`) для улучшения читаемости
- Эффекты размытия (`backdrop-filter`) для современного вида
- Плавные анимации и переходы

**Функциональные:**
- JavaScript проверка загрузки изображения
- Fallback градиентный фон если изображение не загрузится
- Информационные сообщения для пользователя

### 4. **Особенности дизайна:**
- Улучшенные эффекты при наведении с 3D-трансформациями
- Анимированное свечение для максимальных значений
- Градиентные заголовки с обрезанием текста
- Адаптивный дизайн для мобильных устройств

### 5. **Рекомендации по изображению:**
Для лучшего результата используйте изображение:
- Разрешение: не менее 1200×800 пикселей
- Формат: JPG или PNG
- Содержание: абстрактный или текстурированный фон без резких контрастов
- Размер файла: оптимизированный для быстрой загрузки

Если изображение `background.jpg` не будет найдено, скрипт автоматически заменит его на градиентный фон и покажет сообщение об ошибке.
<img width="1177" height="837" alt="image" src="https://github.com/user-attachments/assets/2ae8cb71-5059-4b53-9b34-13093f6cfb5f" />

