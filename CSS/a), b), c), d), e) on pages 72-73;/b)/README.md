в) Измените форматирование: задайте одинаковую высоту строк и установи
те чередование фона («зебра»). 
У к а з а н и е: используйте разные классы стилей для четных и нечетных 
строк таблицы. 
Рисунок. 3.16. Задание 3.3.в.

<img width="483" height="285" alt="image" src="https://github.com/user-attachments/assets/889608ec-4e61-4db6-b143-d7e973e44980" />


```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 3.3в - Чередование фона строк таблицы</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th, td {
            border: 1px solid #000;
            padding: 12px;
            text-align: center;
        }
        
        th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        
        /* Одинаковая высота строк */
        tr {
            height: 50px; /* Фиксированная высота строк */
        }
        
        /* Стили для четных строк */
        .even-row {
            background-color: #f9f9f9; /* Светлый фон для четных строк */
        }
        
        /* Стили для нечетных строк */
        .odd-row {
            background-color: #e6f7ff; /* Голубоватый фон для нечетных строк */
        }
        
        .figure-caption {
            font-style: italic;
            text-align: center;
            margin-top: 5px;
            color: #666;
        }
        
        .table-title {
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Задание 3.3в - Чередование фона строк таблицы</h1>

    <div class="table-container">
        <div class="table-title">Статистика использования браузеров по годам</div>
        <table>
            <thead>
                <tr>
                    <th>Год\Браузер</th>
                    <th>IE</th>
                    <th>Firefox</th>
                    <th>Safari</th>
                    <th>Opera</th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd-row"> <!-- 2010 - нечетная строка -->
                    <td>2010</td>
                    <td>61.43%</td>
                    <td>24.40%</td>
                    <td>4.55%</td>
                    <td>2.37%</td>
                </tr>
                <tr class="even-row"> <!-- 2009 - четная строка -->
                    <td>2009</td>
                    <td>69.13%</td>
                    <td>22.67%</td>
                    <td>3.58%</td>
                    <td>2.18%</td>
                </tr>
                <tr class="odd-row"> <!-- 2008 - нечетная строка -->
                    <td>2008</td>
                    <td>77.83%</td>
                    <td>16.86%</td>
                    <td>2.65%</td>
                    <td>1.84%</td>
                </tr>
                <tr class="even-row"> <!-- 2007 - четная строка -->
                    <td>2007</td>
                    <td>79.38%</td>
                    <td>14.35%</td>
                    <td>4.70%</td>
                    <td>0.50%</td>
                </tr>
            </tbody>
        </table>
        <div class="figure-caption">Рисунок 3.16. Задание 3.3в - Таблица с чередованием фона строк ("зебра")</div>
    </div>

</body>
</html>
```

## Альтернативный вариант с использованием CSS псевдоклассов:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Задание 3.3в - Вариант с CSS псевдоклассами</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th, td {
            border: 1px solid #000;
            padding: 12px;
            text-align: center;
        }
        
        th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        
        /* Одинаковая высота строк */
        tr {
            height: 50px;
        }
        
        /* Чередование фона с помощью CSS псевдоклассов */
        tbody tr:nth-child(odd) {
            background-color: #e6f7ff; /* Нечетные строки */
        }
        
        tbody tr:nth-child(even) {
            background-color: #f9f9f9; /* Четные строки */
        }
        
        .figure-caption {
            font-style: italic;
            text-align: center;
            margin-top: 5px;
            color: #666;
        }
        
        .table-title {
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Задание 3.3в - Чередование фона строк (вариант с CSS псевдоклассами)</h1>

    <div class="table-container">
        <div class="table-title">Статистика использования браузеров по годам</div>
        <table>
            <thead>
                <tr>
                    <th>Год\Браузер</th>
                    <th>IE</th>
                    <th>Firefox</th>
                    <th>Safari</th>
                    <th>Opera</th>
                </tr>
            </thead>
            <tbody>
                <tr> <!-- 2010 - автоматически нечетная -->
                    <td>2010</td>
                    <td>61.43%</td>
                    <td>24.40%</td>
                    <td>4.55%</td>
                    <td>2.37%</td>
                </tr>
                <tr> <!-- 2009 - автоматически четная -->
                    <td>2009</td>
                    <td>69.13%</td>
                    <td>22.67%</td>
                    <td>3.58%</td>
                    <td>2.18%</td>
                </tr>
                <tr> <!-- 2008 - автоматически нечетная -->
                    <td>2008</td>
                    <td>77.83%</td>
                    <td>16.86%</td>
                    <td>2.65%</td>
                    <td>1.84%</td>
                </tr>
                <tr> <!-- 2007 - автоматически четная -->
                    <td>2007</td>
                    <td>79.38%</td>
                    <td>14.35%</td>
                    <td>4.70%</td>
                    <td>0.50%</td>
                </tr>
            </tbody>
        </table>
        <div class="figure-caption">Рисунок 3.16. Задание 3.3в - Таблица с чередованием фона строк ("зебра")</div>
    </div>

</body>
</html>
```

## Ключевые особенности реализации:

1. **Одинаковая высота строк**: Установлено свойство `height: 50px` для всех строк таблицы

2. **Чередование фона ("зебра")**: Реализовано двумя способами:
   - **Первый вариант**: Использование классов `even-row` и `odd-row`
   - **Второй вариант**: Использование CSS псевдоклассов `nth-child(odd)` и `nth-child(even)`

3. **Визуальное оформление**:
   - Четные строки: светло-серый фон (`#f9f9f9`)
   - Нечетные строки: голубоватый фон (`#e6f7ff`)
   - Заголовок таблицы: серый фон (`#f0f0f0`)
   - Все ячейки имеют рамки и выравнивание по центру

Второй вариант с псевдоклассами более предпочтителен, так как не требует ручного назначения классов и автоматически применяет стили к строкам.
<img width="1894" height="529" alt="image" src="https://github.com/user-attachments/assets/8d2170a9-ad1c-441c-bf1b-a614bfde0fa1" />
