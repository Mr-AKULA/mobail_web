
2.3. Практическая работа №3. Объекты клиентских приложений. 
Обработка событий.  
Задание 9.  
1. Рассмотрите скрипт: 
<html> 
<head> 
<title>document</title> 
</head> 
<body> 
<script language="JavaScript" type="text/JavaScript"> 
document.write("Спасибо, что пришли к нам на курсы!"); 
</script> 
</body> 
</html> 
2. Допишите скрипт так, чтобы  
• цвет фона документа был #E7E6D8, 
• цвет шрифта – красный, 
• внизу выводилась дата последней модификации документа, 
используйте для этого слияние методов wtite(…) и 
lastModified(…) объекта document. 
3. Сохраните документ с именем Ex9.html в рабочей папке. 
Задание 10.  
1. Рассмотрите пример скрипта открытия нового окна на странице: 
<html> 
<head> 
<title>window</title> 
</head> 
<body> 
<h1>Создание нового окна</h1> 
<hr> 
<script language="JavaScript" type="text/JavaScript"> 
window.open("http://www.google.com","","toolbar=no,scrollbars=yes,widt
 h=250, height=250, resizable=yes, top=100, left=500")  
</script> 
</body> 
</html> 
2. Измените скрипт так, чтобы выполнялись следующие условия:  
• открытие нового окна происходило при нажатии на ссылку с 
текстом: «Щелкните на ссылке для получения справочной 
информации», 
•  размеры окна - 500х500,  
• есть возможность изменения размеров окна. 
Для выполнения задания используйте написание функции. 
3. Сохраните документ с именем Ex10.html в рабочей папке. 
Задание 11.  
1. Создайте страницу с переадресацией на другой адрес (redirect). 
2. Изменитескрипт так, чтобы переадресация на другой адрес была с 
задержкой 5 секунд. 
3. Сохраните документ с именем Ex11.html в рабочей папке. 
Задание 12.  
1. Создайте HTML-документ, в котором будет 2 ссылки: 
• первая ссылка должна ссылаться на PDF файл; при нажатии на 
нее выпадает сообщение с предупреждением о том, что для 
загрузки документа требуется программа Acrobat, и 
продолжить загрузку или нет; используйте для написания 
метод confirm(…) для подтверждения загрузки; 
• вторая ссылка должна содержать такой код, чтобы при 
наведении на нее мыши менялся цвет фона документа на 
красный. 
2. Сохраните документ с именем Ex12.html в рабой папке. 
Задание 13.  
1. Создайте HTML-документ, содержащий любую картинку. 
2. Добавьте скрипт с условиями: 
• при наведении курсора мыши на картинку она увеличивается, 
• при отведении курсора мыши – уменьшается до исходного 
размера. 
Постройте скрипт через использование функций и событий 
MouseOver и MouseOut. 
3. Сохраните документ с именем Ex13.html в рабочей папке. 
Задание 14.  
1. Создайте HTML-страницу содержащую следующую форму 
заполнения данных: 
Ваше имя: *
 Пароль *
 Подтверждение пароля*
 Электронный адрес: *
 Тема сообщения: 
Сообщение: 
Отправить
 Очистить 
* - необходимые для заполнения поля  
 
2. Добавьте скрипт, проверяющий следующие данные: 
• заполнено ли поле имени, 
• введен ли пароль и содержит ли он больше 4-х символов. 
Используйте для этого свойство length данного поля,  
• совпадают ли значения, введенные в оба поля для паролей, 
• заполнено ли поле электронного адреса и содержит ли оно 
символ @, 
• заполнено ли поле сообщения и содержит ли оно больше 10 
символов, 
3. При несоблюдении условий, курсор должен установиться в то 
поле, где пользователем введено неверное значение. 
4. Сохраните документ с именем Ex15.html в рабочей папке. 



# Практическая работа №3. Объекты клиентских приложений. Обработка событий

В этой практической работе рассматриваются объекты клиентских приложений и обработка событий в JavaScript.

## Задание 9: Свойства документа

**Цель:** Научиться работать со свойствами объекта `document`.

**Файлы:**
- `Ex9.html`

**Задачи:**
1. Установить цвет фона документа
2. Установить цвет текста
3. Вывести дату последней модификации документа

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Свойства документа</title>
</head>
<body>
    <script>
        // Установка свойств документа
        document.bgColor = "#E7E6D8";
        document.fgColor = "red";
        
        // Вывод сообщения
        document.write("<h1>Спасибо, что пришли к нам на курсы!</h1>");
        
        // Вывод даты последней модификации
        document.write("<p style='position: fixed; bottom: 10px; width: 100%; text-align: center;'>");
        document.write("Дата последней модификации: " + document.lastModified);
        document.write("</p>");
    </script>
</body>
</html>
```

---

## Задание 10: Открытие нового окна

**Цель:** Научиться открывать новые окна браузера и работать с функциями.

**Файлы:**
- `Ex10.html`

**Задачи:**
1. Создать функцию для открытия нового окна
2. Вызывать функцию при нажатии на ссылку
3. Настроить параметры окна

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Открытие нового окна</title>
    <script>
        function openHelpWindow() {
            window.open(
                "https://www.google.com",
                "helpWindow",
                "toolbar=no,scrollbars=yes,width=500,height=500,resizable=yes,top=100,left=500"
            );
        }
    </script>
</head>
<body>
    <h1>Создание нового окна</h1>
    <hr>
    <p>
        <a href="javascript:void(0);" onclick="openHelpWindow()">
            Щелкните на ссылке для получения справочной информации
        </a>
    </p>
</body>
</html>
```

---

## Задание 11: Переадресация с задержкой

**Цель:** Научиться выполнять переадресацию с временной задержкой.

**Файлы:**
- `Ex11.html`

**Задачи:**
1. Создать страницу с переадресацией
2. Установить задержку 5 секунд
3. Информировать пользователя о переадресации

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Переадресация</title>
    <script>
        setTimeout(function() {
            window.location.href = "https://www.example.com";
        }, 5000); // 5000 миллисекунд = 5 секунд
    </script>
</head>
<body>
    <h1>Переадресация</h1>
    <p>Вы будете перенаправлены на другую страницу через 5 секунд...</p>
    <p>Пожалуйста, подождите.</p>
</body>
</html>
```

---

## Задание 12: Обработка событий ссылок

**Цель:** Научиться обрабатывать события для ссылок.

**Файлы:**
- `Ex12.html`

**Задачи:**
1. Создать ссылку на PDF с подтверждением загрузки
2. Создать ссылку, меняющую цвет фона при наведении

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Обработка событий ссылок</title>
    <script>
        function confirmDownload() {
            return confirm("Для загрузки документа требуется программа Acrobat Reader. Продолжить загрузку?");
        }
        
        function changeBackground() {
            document.body.style.backgroundColor = "red";
        }
        
        function restoreBackground() {
            document.body.style.backgroundColor = "white";
        }
    </script>
</head>
<body>
    <h1>Примеры обработки событий для ссылок</h1>
    
    <p>
        <a href="document.pdf" onclick="return confirmDownload()">
            Скачать PDF документ
        </a>
    </p>
    
    <p>
        <a href="javascript:void(0);" 
           onmouseover="changeBackground()" 
           onmouseout="restoreBackground()">
            Наведите на меня мышь для изменения цвета фона
        </a>
    </p>
</body>
</html>
```

---

## Задание 13: Изменение изображения при наведении

**Цель:** Научиться обрабатывать события мыши для изображений.

**Файлы:**
- `Ex13.html`

**Задачи:**
1. Создать изображение
2. Увеличивать изображение при наведении мыши
3. Восстанавливать размер при отведении мыши

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Изменение изображения</title>
    <style>
        #myImage {
            transition: transform 0.3s ease;
            cursor: pointer;
        }
    </style>
    <script>
        function enlargeImage() {
            document.getElementById('myImage').style.transform = 'scale(1.5)';
        }
        
        function shrinkImage() {
            document.getElementById('myImage').style.transform = 'scale(1)';
        }
    </script>
</head>
<body>
    <h1>Изменение размера изображения</h1>
    <p>Наведите курсор мыши на изображение для увеличения</p>
    
    <img id="myImage" 
         src="https://via.placeholder.com/200" 
         alt="Пример изображения"
         onmouseover="enlargeImage()" 
         onmouseout="shrinkImage()"
         width="200" 
         height="150">
</body>
</html>
```

---

## Задание 14: Валидация формы

**Цель:** Научиться проверять данные формы перед отправкой.

**Файлы:**
- `Ex15.html`

**Задачи:**
1. Создать форму с обязательными полями
2. Реализовать проверку всех полей
3. Устанавливать курсор в поле с ошибкой

**Пример реализации:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Валидация формы</title>
    <style>
        .required::after {
            content: " *";
            color: red;
        }
        .error {
            border: 2px solid red;
        }
        .error-message {
            color: red;
            font-size: 12px;
        }
    </style>
    <script>
        function validateForm() {
            // Получаем элементы формы
            var name = document.getElementById('name');
            var password = document.getElementById('password');
            var confirmPassword = document.getElementById('confirmPassword');
            var email = document.getElementById('email');
            var message = document.getElementById('message');
            
            // Сбрасываем предыдущие ошибки
            resetErrors([name, password, confirmPassword, email, message]);
            
            // Проверка имени
            if (name.value.trim() === '') {
                showError(name, 'Поле имени обязательно для заполнения');
                return false;
            }
            
            // Проверка пароля
            if (password.value.length < 5) {
                showError(password, 'Пароль должен содержать более 4 символов');
                return false;
            }
            
            // Проверка подтверждения пароля
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Пароли не совпадают');
                return false;
            }
            
            // Проверка email
            if (email.value.trim() === '' || email.value.indexOf('@') === -1) {
                showError(email, 'Введите корректный email адрес');
                return false;
            }
            
            // Проверка сообщения
            if (message.value.trim().length < 10) {
                showError(message, 'Сообщение должно содержать более 10 символов');
                return false;
            }
            
            alert('Форма успешно отправлена!');
            return true;
        }
        
        function showError(field, message) {
            field.classList.add('error');
            field.focus();
            
            // Создаем элемент для сообщения об ошибке
            var errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            field.parentNode.appendChild(errorElement);
        }
        
        function resetErrors(fields) {
            fields.forEach(function(field) {
                field.classList.remove('error');
                var errorMessage = field.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        }
        
        function clearForm() {
            document.getElementById('myForm').reset();
            resetErrors(document.querySelectorAll('input, textarea'));
        }
    </script>
</head>
<body>
    <h1>Форма обратной связи</h1>
    <form id="myForm" onsubmit="return validateForm()">
        <p>
            <label for="name" class="required">Ваше имя:</label><br>
            <input type="text" id="name" name="name">
        </p>
        
        <p>
            <label for="password" class="required">Пароль:</label><br>
            <input type="password" id="password" name="password">
        </p>
        
        <p>
            <label for="confirmPassword" class="required">Подтверждение пароля:</label><br>
            <input type="password" id="confirmPassword" name="confirmPassword">
        </p>
        
        <p>
            <label for="email" class="required">Электронный адрес:</label><br>
            <input type="email" id="email" name="email">
        </p>
        
        <p>
            <label for="subject">Тема сообщения:</label><br>
            <input type="text" id="subject" name="subject">
        </p>
        
        <p>
            <label for="message" class="required">Сообщение:</label><br>
            <textarea id="message" name="message" rows="4" cols="50"></textarea>
        </p>
        
        <p>
            <button type="submit">Отправить</button>
            <button type="button" onclick="clearForm()">Очистить</button>
        </p>
    </form>
</body>
</html>
```

---

## Примечания

- Для Задания 13 замените `"https://via.placeholder.com/200"` на путь к реальному изображению
- Для Задания 12 создайте файл `document.pdf` или укажите существующий PDF файл
- События `onmouseover` и `onmouseout` используются для обработки наведения и отведения курсора мыши
- Метод `setTimeout()` используется для выполнения кода с задержкой
- Свойство `transform: scale()` позволяет масштабировать элементы

## Как запустить проекты

1. Сохраните каждый пример в соответствующий файл
2. Убедитесь, что все необходимые ресурсы (изображения, PDF файлы) доступны
3. Откройте HTML-файлы в браузере для тестирования функциональности


