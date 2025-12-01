// guestbook.js - Обработка формы обращений

document.addEventListener('DOMContentLoaded', function() {
    const guestbookForm = document.getElementById('guestbookForm');
    const messagesContainer = document.getElementById('guestbookMessages');
    
    if (!guestbookForm || !messagesContainer) return;
    
    // Загружаем сохраненные сообщения
    loadMessages();
    
    // Обработка отправки формы
    guestbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('guestName');
        const emailInput = document.getElementById('guestEmail');
        const messageInput = document.getElementById('guestMessage');
        
        // Валидация
        if (!nameInput.value.trim()) {
            showError('Пожалуйста, введите ваше имя');
            nameInput.focus();
            return;
        }
        
        if (!messageInput.value.trim()) {
            showError('Пожалуйста, введите сообщение');
            messageInput.focus();
            return;
        }
        
        // Проверка email (необязательное поле)
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            showError('Пожалуйста, введите корректный email адрес');
            emailInput.focus();
            return;
        }
        
        // Создаем объект сообщения
        const message = {
            id: Date.now(),
            name: escapeHTML(nameInput.value.trim()),
            email: email ? escapeHTML(email) : null,
            message: escapeHTML(messageInput.value.trim()),
            date: new Date().toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            avatar: generateAvatar(nameInput.value.trim())
        };
        
        // Сохраняем сообщение
        saveMessage(message);
        
        // Сбрасываем форму
        guestbookForm.reset();
        
        // Показываем уведомление
        showNotification('Ваше сообщение успешно сохранено!', 'success');
        
        // Плавная прокрутка к новому сообщению
        setTimeout(() => {
            const firstMessage = messagesContainer.querySelector('.message-card');
            if (firstMessage) {
                firstMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 300);
    });
    
    // Функция сохранения сообщения
    function saveMessage(message) {
        let messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
        messages.unshift(message); // Добавляем в начало
        
        // Сохраняем только последние 100 сообщений
        if (messages.length > 100) {
            messages = messages.slice(0, 100);
        }
        
        localStorage.setItem('guestbookMessages', JSON.stringify(messages));
        
        // Обновляем отображение
        displayMessage(message);
    }
    
    // Функция загрузки всех сообщений
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
        
        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <div class="no-messages">
                    <i class="fas fa-comment-slash"></i>
                    <h3>Пока нет сообщений</h3>
                    <p>Будьте первым, кто оставит сообщение!</p>
                </div>
            `;
            return;
        }
        
        // Очищаем контейнер
        messagesContainer.innerHTML = '';
        
        // Отображаем все сообщения
        messages.forEach(message => {
            displayMessage(message);
        });
    }
    
    // Функция отображения одного сообщения
    function displayMessage(message) {
        // Если контейнер пустой, удаляем сообщение "нет сообщений"
        if (messagesContainer.querySelector('.no-messages')) {
            messagesContainer.innerHTML = '';
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message-card animate-on-scroll';
        messageElement.setAttribute('data-id', message.id);
        
        const emailHtml = message.email ? 
            `<a href="mailto:${message.email}" class="message-email">${message.email}</a>` : 
            '';
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                ${message.avatar}
            </div>
            <div class="message-content">
                <div class="message-header">
                    <div class="message-author">
                        <strong class="message-name">${message.name}</strong>
                        ${emailHtml}
                    </div>
                    <span class="message-date">${message.date}</span>
                </div>
                <div class="message-body">
                    ${message.message.replace(/\n/g, '<br>')}
                </div>
                <div class="message-actions">
                    <button class="message-btn like-btn" data-id="${message.id}" aria-label="Нравится">
                        <i class="far fa-thumbs-up"></i>
                        <span class="like-count">0</span>
                    </button>
                    <button class="message-btn reply-btn" data-id="${message.id}" aria-label="Ответить">
                        <i class="far fa-comment"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Добавляем анимацию
        setTimeout(() => {
            messageElement.classList.add('visible');
        }, 50);
        
        // Добавляем в начало контейнера
        messagesContainer.prepend(messageElement);
        
        // Инициализируем кнопки лайков
        initLikeButtons();
    }
    
    // Инициализация кнопок лайков
    function initLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-btn');
        
        likeButtons.forEach(button => {
            const messageId = button.getAttribute('data-id');
            const likeCount = button.querySelector('.like-count');
            
            // Загружаем количество лайков из localStorage
            let likes = JSON.parse(localStorage.getItem('guestbookLikes')) || {};
            let count = likes[messageId] || 0;
            likeCount.textContent = count;
            
            // Проверяем, лайкал ли текущий пользователь это сообщение
            let userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
            if (userLikes[messageId]) {
                button.classList.add('liked');
                button.querySelector('i').classList.remove('far');
                button.querySelector('i').classList.add('fas');
            }
            
            // Обработчик клика
            button.addEventListener('click', function() {
                const messageId = this.getAttribute('data-id');
                const icon = this.querySelector('i');
                const countElement = this.querySelector('.like-count');
                
                // Проверяем, лайкал ли уже пользователь это сообщение
                let userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
                let likes = JSON.parse(localStorage.getItem('guestbookLikes')) || {};
                
                if (userLikes[messageId]) {
                    // Убираем лайк
                    likes[messageId] = (likes[messageId] || 1) - 1;
                    delete userLikes[messageId];
                    this.classList.remove('liked');
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                } else {
                    // Добавляем лайк
                    likes[messageId] = (likes[messageId] || 0) + 1;
                    userLikes[messageId] = true;
                    this.classList.add('liked');
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
                
                // Сохраняем
                localStorage.setItem('guestbookLikes', JSON.stringify(likes));
                localStorage.setItem('userLikes', JSON.stringify(userLikes));
                
                // Обновляем счетчик
                countElement.textContent = likes[messageId] || 0;
                
                // Анимация
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }
    
    // Генерация аватара по имени
    function generateAvatar(name) {
        const colors = [
            '#3498db', '#2ecc71', '#e74c3c', '#f39c12',
            '#9b59b6', '#1abc9c', '#d35400', '#c0392b'
        ];
        
        const initials = name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
        
        const colorIndex = name
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        
        return `
            <div class="avatar" style="background-color: ${colors[colorIndex]}">
                ${initials}
            </div>
        `;
    }
    
    // Валидация email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Экранирование HTML
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Показать ошибку
    function showError(message) {
        showNotification(message, 'error');
    }
    
    // Показать уведомление
    function showNotification(text, type = 'success') {
        // Удаляем предыдущие уведомления
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${text}</span>
            </div>
            <button class="notification-close" aria-label="Закрыть">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Кнопка закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Добавляем стили для уведомлений и сообщений
    const styles = document.createElement('style');
    styles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            color: #333;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            transform: translateX(120%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 10000;
            max-width: 350px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #2ecc71;
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i {
            color: #2ecc71;
        }
        
        .notification-error .notification-content i {
            color: #e74c3c;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #7f8c8d;
            cursor: pointer;
            font-size: 1rem;
            margin-left: 15px;
            padding: 5px;
            transition: color 0.3s;
        }
        
        .notification-close:hover {
            color: #e74c3c;
        }
        
        .message-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
            display: flex;
            gap: 15px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .message-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
        }
        
        .message-avatar .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .message-content {
            flex: 1;
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .message-author {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .message-name {
            font-size: 1.1rem;
            color: #2c3e50;
        }
        
        .message-email {
            font-size: 0.9rem;
            color: #3498db;
            text-decoration: none;
        }
        
        .message-email:hover {
            text-decoration: underline;
        }
        
        .message-date {
            font-size: 0.85rem;
            color: #7f8c8d;
            white-space: nowrap;
        }
        
        .message-body {
            color: #555;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .message-actions {
            display: flex;
            gap: 15px;
        }
        
        .message-btn {
            background: none;
            border: none;
            color: #7f8c8d;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 15px;
            transition: all 0.3s;
        }
        
        .message-btn:hover {
            background: #f5f5f5;
            color: #3498db;
        }
        
        .message-btn.liked {
            color: #e74c3c;
        }
        
        .message-btn.liked:hover {
            color: #c0392b;
        }
        
        .no-messages {
            text-align: center;
            padding: 60px 20px;
            color: #7f8c8d;
        }
        
        .no-messages i {
            font-size: 4rem;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .no-messages h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        
        @media (max-width: 768px) {
            .message-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .message-date {
                align-self: flex-start;
            }
        }
    `;
    document.head.appendChild(styles);
});