а) Реализуйте примеры таблиц из лекции (рис. 3.13. и рис. 3.14.).

<img width="500" height="707" alt="image" src="https://github.com/user-attachments/assets/1fb1e206-e371-4eb7-887e-9970877898a0" />

Я реализую оба примера таблиц из лекции с CSS стилизацией.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS таблицы - примеры из лекции</title>
    <style>
        /* Общие стили для обеих таблиц */
        .table-container {
            margin: 20px 0;
        }
        
        table {
            width: 100%;
            margin-bottom: 20px;
        }
        
        caption {
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        /* Стили для таблицы 3.13 */
        .table-3-13 {
            border-collapse: collapse;
        }
        
        .table-3-13 th, 
        .table-3-13 td {
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
        }
        
        .table-3-13 th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        
        /* Стили для таблицы 3.14 */
        .table-3-14 {
            border-collapse: collapse;
        }
        
        .table-3-14 th, 
        .table-3-14 td {
            border: 1px solid #000;
            padding: 8px;
        }
        
        .table-3-14 th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-align: center;
        }
        
        .table-3-14 .lc {
            text-align: right;
            font-weight: bold;
        }
        
        .table-3-14 td:not(.lc) {
            text-align: center;
            width: 20%; /* Одинаковая ширина для столбцов с браузерами */
        }
        
        /* Разделительные линии */
        .table-3-14 thead {
            border-bottom: 2px solid #000;
        }
        
        .table-3-14 tbody tr:first-child td {
            border-top: 2px solid #000;
        }
        
        .figure-caption {
            font-style: italic;
            text-align: center;
            margin-top: 5px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>Технология CSS - Примеры таблиц</h1>

    <!-- Таблица 3.13 -->
    <div class="table-container">
        <table class="table-3-13">
            <caption>Таблица 3.13 - Эффект слияния границ соседних ячеек</caption>
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
        <div class="figure-caption">Рисунок 3.13. Эффект слияния границ соседних ячеек</div>
    </div>

    <!-- Таблица 3.14 -->
    <div class="table-container">
        <table class="table-3-14">
            <caption>Таблица 3.14 - Оформление таблицы с двумя разделительными линиями</caption>
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
                    <td class="lc">2010</td>
                    <td>61.43%</td>
                    <td>24.40%</td>
                    <td>4.55%</td>
                    <td>2.37%</td>
                </tr>
                <tr>
                    <td class="lc">2009</td>
                    <td>69.13%</td>
                    <td>22.67%</td>
                    <td>3.58%</td>
                    <td>2.18%</td>
                </tr>
                <tr>
                    <td class="lc">2008</td>
                    <td>77.83%</td>
                    <td>16.86%</td>
                    <td>2.65%</td>
                    <td>1.84%</td>
                </tr>
                <tr>
                    <td class="lc">2007</td>
                    <td>79.38%</td>
                    <td>14.35%</td>
                    <td>4.70%</td>
                    <td>0.50%</td>
                </tr>
            </tbody>
        </table>
        <div class="figure-caption">Рисунок 3.14. Оформление таблицы с двумя разделительными линиями</div>
    </div>

</body>
</html>
```

## Ключевые особенности реализации:

**Для таблицы 3.13:**
- Использовано `border-collapse: collapse` для слияния границ ячеек
- Все ячейки имеют одинаковое оформление с рамками
- Текст выровнен по центру

**Для таблицы 3.14:**
- Добавлен класс `lc` для ячеек левой колонки (годы)
- Левая колонка выровнена по правому краю и выделена жирным шрифтом
- Столбцы с браузерами имеют одинаковую ширину (20%)
- Добавлены две разделительные линии:
  - Под заголовком таблицы
  - После первой строки с данными
- Названия браузеров и процентные данные выровнены по центру

Обе таблицы используют свойство `border-collapse: collapse` для устранения двойных границ между ячейками.
<img width="1911" height="790" alt="image" src="https://github.com/user-attachments/assets/447f860a-aa1c-4f28-bfb7-045276bddaeb" />
