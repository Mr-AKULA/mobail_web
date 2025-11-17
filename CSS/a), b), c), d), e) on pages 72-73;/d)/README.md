г*) Модифицируйте таблицу из задания «в». Чередование цвета фона у строк 
замените чередованием цвета фона у колонок. 




```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 3.3г - Чередование фона колонок таблицы</title>
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
            height: 50px;
        }
        
        td {
            padding: 12px 10px;
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
            font-size: 13px;
            height: 50px;
        }
        
        /* Одинаковая высота для всех строк */
        tr {
            height: 50px;
        }
        
        /* Стили для левой колонки с годами */
        td:first-child,
        th:first-child {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #2c3e50;
            border-right: 2px solid #e0e0e0;
        }
        
        /* Чередование фона колонок ("зебра" для колонок) */
        th:nth-child(odd):not(:first-child),
        td:nth-child(odd):not(:first-child) {
            background-color: #ffffff; /* Белый фон для нечетных колонок */
        }
        
        th:nth-child(even),
        td:nth-child(even) {
            background-color: #f8f9fa; /* Светло-серый фон для четных колонок */
        }
        
        /* Альтернативный вариант с более контрастными цветами */
        /*
        th:nth-child(odd):not(:first-child),
        td:nth-child(odd):not(:first-child) {
            background-color: #ffffff;
        }
        
        th:nth-child(even),
        td:nth-child(even) {
            background-color: #e8f4f8;
        }
        */
        
        /* Эффект при наведении на строку */
        tbody tr:hover td {
            background-color: #e3f2fd !important;
            transition: background-color 0.3s ease;
        }
        
        /* Эффект при наведении на ячейку */
        td:hover {
            background-color: #d4e7fa !important;
            transform: scale(1.02);
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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
            position: relative;
        }
        
        .max-value::after {
            content: "▲";
            color: #e74c3c;
            font-size: 10px;
            margin-left: 3px;
        }
        
        /* Объяснение цветовой схемы */
        .color-legend {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 15px;
            font-size: 12px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .legend-color {
            width: 15px;
            height: 15px;
            border: 1px solid #ddd;
        }
        
        .odd-column {
            background-color: #ffffff;
        }
        
        .even-column {
            background-color: #f8f9fa;
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
                    <th>IE</th>          <!-- Нечетная колонка -->
                    <th>Firefox</th>     <!-- Четная колонка -->
                    <th>Safari</th>      <!-- Нечетная колонка -->
                    <th>Opera</th>       <!-- Четная колонка -->
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2010</td>
                    <td>61.43%</td>      <!-- Нечетная колонка -->
                    <td>24.40%</td>      <!-- Четная колонка -->
                    <td>4.55%</td>       <!-- Нечетная колонка -->
                    <td>2.37%</td>       <!-- Четная колонка -->
                </tr>
                <tr>
                    <td>2009</td>
                    <td>69.13%</td>      <!-- Нечетная колонка -->
                    <td>22.67%</td>      <!-- Четная колонка -->
                    <td>3.58%</td>       <!-- Нечетная колонка -->
                    <td>2.18%</td>       <!-- Четная колонка -->
                </tr>
                <tr>
                    <td>2008</td>
                    <td>77.83%</td>      <!-- Нечетная колонка -->
                    <td>16.86%</td>      <!-- Четная колонка -->
                    <td>2.65%</td>       <!-- Нечетная колонка -->
                    <td>1.84%</td>       <!-- Четная колонка -->
                </tr>
                <tr>
                    <td>2007</td>
                    <td>79.38%</td>      <!-- Нечетная колонка -->
                    <td>14.35%</td>      <!-- Четная колонка -->
                    <td>4.70%</td>       <!-- Нечетная колонка -->
                    <td>0.50%</td>       <!-- Четная колонка -->
                </tr>
            </tbody>
        </table>
        
        <!-- Легенда цветов -->
        <div class="color-legend">
            <div class="legend-item">
                <div class="legend-color odd-column"></div>
                <span>Нечетные колонки (IE, Safari)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color even-column"></div>
                <span>Четные колонки (Firefox, Opera)</span>
            </div>
        </div>
        
        <div class="figure-caption">Рисунок 3.16г - Таблица с одинаковой высотой строк и чередованием фона колонок</div>
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

## Ключевые изменения для чередования колонок:

### 1. **Чередование фона колонок вместо строк**
```css
/* Нечетные колонки (IE, Safari) - белый фон */
th:nth-child(odd):not(:first-child),
td:nth-child(odd):not(:first-child) {
    background-color: #ffffff;
}

/* Четные колонки (Firefox, Opera) - светло-серый фон */
th:nth-child(even),
td:nth-child(even) {
    background-color: #f8f9fa;
}
```

### 2. **Особенности реализации:**
- **Исключение первой колонки**: `:not(:first-child)` чтобы не применять чередование к колонке с годами
- **Распределение колонок**:
  - Нечетные: IE, Safari (белый фон)
  - Четные: Firefox, Opera (серый фон)

### 3. **Улучшенная интерактивность:**
- Эффект при наведении на всю строку
- Отдельный эффект при наведении на конкретную ячейку
- Плавные переходы и анимации

### 4. **Визуальные преимущества:**
- **Вертикальное сравнение**: Легче сравнивать данные внутри одной колонки
- **Группировка браузеров**: Визуальное разделение по типам браузеров
- **Улучшенная навигация**: Легче следить за данными в колонках

### 5. **Дополнительные элементы:**
- Цветовая легенда для пояснения схемы
- Специальное выделение максимальных значений со стрелкой
- Сохранение одинаковой высоты строк

Этот подход особенно полезен, когда нужно сравнивать данные вертикально (по колонкам), а не горизонтально (по строкам).






<img width="1632" height="632" alt="image" src="https://github.com/user-attachments/assets/a3fa0dc9-885f-4070-b3e5-4f4e6f094b5a" />
