г*) Модифицируйте пример с рис. 3.17. С помощью таблицы реализуйте ме
ню, как показано на рис. 3.23. Используя псевдокласс hover для строки таб
лицы, добавьте выделение пункта меню цветом при наведении курсора. При
мер не будет работать в браузере Internet Explorer версии 6 и ниже.

<img width="460" height="255" alt="image" src="https://github.com/user-attachments/assets/0fe024b3-1f27-4ffc-9fb8-436be39a75cc" />
<img width="338" height="253" alt="image" src="https://github.com/user-attachments/assets/a79a011a-9ca3-4d09-b404-82fca39629e2" />



# Модификация меню с использованием таблицы и hover-эффектов

Для реализации меню с тремя квадратными кнопками, как показано на рисунке 3.23, я создам HTML-таблицу с использованием CSS для стилизации и hover-эффектов.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Меню с hover-эффектами</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        
        .menu-table {
            border-collapse: collapse;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .menu-table td {
            width: 33.33%;
            text-align: center;
            vertical-align: middle;
            padding: 0;
        }
        
        .menu-button {
            display: block;
            width: 100%;
            height: 150px;
            background-color: #4a6fa5;
            color: white;
            text-decoration: none;
            font-size: 18px;
            font-weight: bold;
            transition: background-color 0.3s;
            border: none;
            cursor: pointer;
            box-sizing: border-box;
        }
        
        .menu-table tr:hover td .menu-button {
            background-color: #2c4a7a;
        }
        
        .menu-button:hover {
            background-color: #1e3a6a !important;
        }
        
        h1 {
            text-align: center;
            color: #333;
        }
        
        .description {
            text-align: center;
            margin-bottom: 30px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>Пример меню с hover-эффектами</h1>
    <p class="description">Наведите курсор на кнопки меню, чтобы увидеть эффект</p>
    
    <table class="menu-table">
        <tr>
            <td>
                <a href="#" class="menu-button">Главная</a>
            </td>
            <td>
                <a href="#" class="menu-button">Мое хобби</a>
            </td>
            <td>
                <a href="#" class="menu-button">Фотоальбом</a>
            </td>
        </tr>
    </table>
    
    <div style="margin-top: 30px; text-align: center;">
        <p>Примечание: Этот пример не будет работать в браузере Internet Explorer версии 6 и ниже.</p>
    </div>
</body>
</html>
```

## Особенности реализации:

1. **Структура меню**:
   - Используется таблица с одной строкой и тремя ячейками
   - Каждая ячейка содержит кликабельную кнопку-ссылку

2. **Стилизация**:
   - Кнопки имеют квадратную форму (высота 150px)
   - Использован синий цвет фона с плавным переходом при наведении
   - Текст кнопок написан не капсом (как требуется)

3. **Hover-эффекты**:
   - При наведении на строку таблицы все кнопки немного затемняются
   - При наведении на конкретную кнопку она становится еще темнее
   - Эффекты реализованы с помощью псевдокласса `:hover`

4. **Совместимость**:
   - Пример не будет работать в IE6 и ниже (как указано в задании)
   - Современные браузеры корректно отображают все эффекты

Это меню полностью функционально и соответствует требованиям из задания.


<img width="800" height="378" alt="image" src="https://github.com/user-attachments/assets/9dd832d3-2860-481f-97c1-68e12c9eb912" />

