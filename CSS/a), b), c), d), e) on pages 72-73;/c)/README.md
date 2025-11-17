б) Измените форматирование таблицы на следующий вариант: 
Рисунок. 3.15. Задание 3.3.б.

<img width="406" height="162" alt="image" src="https://github.com/user-attachments/assets/08079460-0555-4579-bfe0-57ef42bb706b" />

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Рисунок 3.15 - Альтернативное форматирование таблицы</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        
        .table-container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: 0 auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        
        th {
            background: linear-gradient(to bottom, #4a90e2, #2c6fb7);
            color: white;
            font-weight: bold;
            padding: 15px 10px;
            text-align: center;
            border: none;
            font-size: 14px;
        }
        
        td {
            padding: 12px 10px;
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
            font-size: 13px;
        }
        
        /* Стили для левой колонки с годами */
        td:first-child {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #2c3e50;
            border-right: 2px solid #e0e0e0;
        }
        
        /* Чередование цвета строк */
        tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        tbody tr:nth-child(odd) {
            background-color: #ffffff;
        }
        
        /* Эффект при наведении */
        tbody tr:hover {
            background-color: #e3f2fd;
            transition: background-color 0.3s ease;
        }
        
        /* Стили для процентных значений */
        td:not(:first-child) {
            color: #555;
            font-weight: 500;
        }
        
        .table-title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 15px;
        }
        
        .figure-caption {
            font-style: italic;
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 10px;
        }
        
        /* Специальное оформление для максимальных значений */
        .max-value {
            color: #e74c3c;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="table-container">
        <div class="table-title">Статистика использования браузеров по годам</div>
        
        <table>
            <thead>
                <tr>
                    <th>Год/Браузер</th>
                    <th>IE</th>
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
        
        <div class="figure-caption">Рисунок 3.15. Современное оформление таблицы статистики браузеров</div>
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
        });
    </script>
</body>
</html>
```

## Ключевые особенности нового форматирования:

### 1. **Современный дизайн заголовков**
- Градиентный фон от синего к темно-синему
- Белый текст для лучшей читаемости
- Убраны границы, только разделительные линии

### 2. **Четкое визуальное разделение**
- Левая колонка с годами выделена серым фоном
- Правая граница для отделения годов от данных
- Чередование фона строк для лучшей читаемости

### 3. **Улучшенная типографика**
- Жирный шрифт для годов
- Полужирный шрифт для процентных значений
- Уменьшенный размер шрифта для компактности

### 4. **Интерактивные элементы**
- Эффект при наведении на строки
- Плавные переходы
- Выделение максимальных значений красным цветом

### 5. **Общее оформление**
- Тень вокруг таблицы для глубины
- Закругленные углы
- Четкое разделение контента от фона

Это форматирование создает современный, профессиональный вид таблицы с улучшенной читаемостью и визуальной иерархией данных.
<img width="1905" height="519" alt="image" src="https://github.com/user-attachments/assets/969a2d32-573c-49c8-9076-3fcfaaa9666e" />

