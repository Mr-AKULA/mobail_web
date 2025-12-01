// contact.js - Скрипты для страницы контактов

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initMap();
    initFAQ();
    initAnimations();
});

// Инициализация формы обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем значения полей формы
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const agreement = document.getElementById('contactAgreement').checked;
        
        // Валидация
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите ваше имя';
        } else if (!email) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите ваш email';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите корректный email адрес';
        } else if (!message) {
            isValid = false;
            errorMessage = 'Пожалуйста, введите сообщение';
        } else if (!agreement) {
            isValid = false;
            errorMessage = 'Пожалуйста, согласитесь на обработку персональных данных';
        }
        
        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }
        
        // В реальном приложении здесь был бы AJAX запрос на сервер
        // Для демонстрации имитируем отправку
        
        // Показываем индикатор отправки
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        // Имитация задержки отправки
        setTimeout(() => {
            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Показываем уведомление об успехе
            showNotification('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
            
            // Очищаем форму
            contactForm.reset();
            
            // Сохраняем данные в localStorage для истории
            saveContactRequest({ name, email, subject, message, date: new Date().toISOString() });
        }, 2000);
    });
}

// Валидация email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Сохранение запроса в localStorage
function saveContactRequest(request) {
    let requests = JSON.parse(localStorage.getItem('contactRequests')) || [];
    requests.unshift(request);
    
    // Сохраняем только последние 50 запросов
    if (requests.length > 50) {
        requests = requests.slice(0, 50);
    }
    
    localStorage.setItem('contactRequests', JSON.stringify(requests));
}

// Инициализация карты
function initMap() {
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) return;
    
    // Проверяем, загружена ли библиотека Leaflet
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        mapContainer.innerHTML = '<p style="text-align: center; padding: 50px; color: var(--gray-color);">Карта временно недоступна</p>';
        return;
    }
 
    try {
        // Координаты Москвы
        const moscowCoords = [56.6344, 47.8999];
        
        // Создаем карту
        const map = L.map('map').setView(moscowCoords, 12);
        
        // Добавляем слой карты (используем OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        
        // Добавляем маркер
        const marker = L.marker(moscowCoords).addTo(map);
        marker.bindPopup('<b>Йошкар-Ола</b><br>Мой родной город').openPopup();
        
        // Добавляем круг для обозначения района
        L.circle(moscowCoords, {
            color: 'var(--secondary-color)',
            fillColor: 'rgba(52, 152, 219, 0.2)',
            fillOpacity: 0.5,
            radius: 2000
        }).addTo(map);
        
        // Настройка адаптивности
        map.invalidateSize();
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', function() {
            map.invalidateSize();
        });
        
    } catch (error) {
        console.error('Error initializing map:', error);
        mapContainer.innerHTML = '<p style="text-align: center; padding: 50px; color: var(--gray-color);">Ошибка загрузки карты</p>';
    }
}

// Инициализация FAQ
function initFAQ() {
    const faqContainer = document.getElementById('faqContainer');
    
    if (!faqContainer) return;
    
    const faqItems = [
        {
            question: 'Как связаться со мной для сотрудничества?',
            answer: 'Лучший способ - отправить сообщение через форму обратной связи на этой странице или написать на email. Я отвечаю в течение 24 часов в рабочие дни.'
        },
        {
            question: 'Где можно посмотреть мои работы?',
            answer: 'Примеры моих работ представлены в разделе "Резюме". Также вы можете посетить мой GitHub профиль по ссылке в контактах.'
        },
        {
            question: 'Какие условия сотрудничества?',
            answer: 'Я открыт для проектов различной сложности - от создания лендингов до разработки сложных веб-приложений. Обсудим детали индивидуально.'
        },
        {
            question: 'Работаете ли вы удаленно?',
            answer: 'Да, я работаю удаленно и могу сотрудничать с клиентами из любой точки мира. Для коммуникации использую Zoom, Skype, Telegram.'
        },
        {
            question: 'Сколько времени занимает создание сайта?',
            answer: 'Сроки зависят от сложности проекта. Простой лендинг - 1-2 недели, интернет-магазин - 3-4 недели, сложное веб-приложение - от 1 месяца.'
        },
        {
            question: 'Предоставляете ли вы гарантии на работу?',
            answer: 'Да, я предоставляю гарантию 30 дней на все работы. В течение этого периода бесплатно исправляю обнаруженные ошибки.'
        }
    ];
    
    // Создаем элементы FAQ
    faqItems.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <div class="faq-question">
                <span>${item.question}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        
        // Добавляем обработчик клика на вопрос
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Закрываем все остальные ответы
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.classList.remove('show');
                    ans.previousElementSibling.classList.remove('active');
                }
            });
            
            // Переключаем текущий ответ
            answer.classList.toggle('show');
            this.classList.toggle('active');
        });
        
        faqContainer.appendChild(faqItem);
    });
}

// Показ уведомлений
function showNotification(message, type = 'success') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Добавляем стили, если их еще нет
    if (!document.querySelector('#contactNotificationStyles')) {
        const style = document.createElement('style');
        style.id = 'contactNotificationStyles';
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }
    
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

// Инициализация анимаций
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    }
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}
