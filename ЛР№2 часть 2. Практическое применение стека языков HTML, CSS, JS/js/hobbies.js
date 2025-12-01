// hobbies.js - Скрипты для страницы хобби

document.addEventListener('DOMContentLoaded', function() {
    loadHobbies();
    initHobbySelector();
    initHobbySchedule();
    initHobbyGallery();
    initHobbyQuiz();
    initAnimations();
});

// Загрузка и отображение хобби
function loadHobbies() {
    const hobbiesGrid = document.getElementById('hobbiesGrid');
    if (!hobbiesGrid) return;
    
    const hobbies = [
        {
            id: 'programming',
            title: 'Программирование',
            description: 'Помимо работы, люблю изучать новые языки программирования и создавать pet-проекты. Сейчас увлекаюсь Python и машинным обучением.',
            icon: 'fas fa-code',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: '24+ часов в неделю',
            color: '#3498db'
        },
        {
            id: 'photography',
            title: 'Фотография',
            description: 'Люблю запечатлевать интересные моменты, особенно природу и архитектуру. Фотографирую на  смартфон.',
            icon: 'fas fa-camera',
            image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: '1 часов в неделю',
            color: '#e74c3c'
        },
        {
            id: 'music',
            title: 'Музыка',
            description: 'Люблю слушать музыку в частности во время творческой работы',
            icon: 'fas fa-music',
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: '24 часов в неделю',
            color: '#9b59b6'
        },
        {
            id: 'sports',
            title: 'Спорт',
            description: 'Регулярно занимаюсь спортом. Летом увлекаюсь велоспортом, зимой - бывает и лыжами.',
            icon: 'fas fa-bicycle',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: '3-7 часов в неделю',
            color: '#2ecc71'
        },
        {
            id: 'reading',
            title: 'Чтение',
            description: 'Читаю художественную литературу, книги по психологии и саморазвитию, техническую литературу. Веду список прочитанных книг.',
            icon: 'fas fa-book',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: '4 часа в неделю',
            color: '#f39c12'
        },
        {
            id: 'travel',
            title: 'Путешествия',
            description: 'Люблю исследовать новые города и страны. Предпочитаю активный отдых и погружение в местную культуру.',
            icon: 'fas fa-plane',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: '1-2 поездки в год',
            color: '#1abc9c'
        },
        {
            id: 'gaming',
            title: 'Видеоигры',
            description: 'Играю в стратегии и RPG. Люблю игры с интересным сюжетом и проработанным миром. Иногда участвую в киберспортивных турнирах.',
            icon: 'fas fa-gamepad',
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: 'сейчас менее 8 часов в неделю',
            color: '#e67e22'
        },
        {
            id: 'cooking',
            title: 'Кулинария',
            description: 'Экспериментирую с рецептами.',
            icon: 'fas fa-utensils',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            duration: '3 часа в неделю',
            color: '#d35400'
        }
    ];
    
    // Очищаем контейнер
    hobbiesGrid.innerHTML = '';
    
    // Создаем карточки хобби
    hobbies.forEach((hobby, index) => {
        const hobbyCard = document.createElement('div');
        hobbyCard.className = 'hobby-card animate-on-scroll';
        hobbyCard.style.animationDelay = `${index * 0.1}s`;
        hobbyCard.setAttribute('data-hobby', hobby.id);
        
        hobbyCard.innerHTML = `
            <div class="hobby-image">
                <img src="${hobby.image}" alt="${hobby.title}" loading="lazy">
            </div>
            <div class="hobby-content">
                <div class="hobby-icon">
                    <i class="${hobby.icon}"></i>
                </div>
                <h3 class="hobby-title">${hobby.title}</h3>
                <p class="hobby-description">${hobby.description}</p>
                <div class="hobby-duration">
                    <i class="fas fa-clock"></i>
                    <span>${hobby.duration}</span>
                </div>
            </div>
        `;
        
        // Добавляем обработчик клика
        hobbyCard.addEventListener('click', function() {
            showHobbyDetails(hobby);
            highlightHobbyButton(hobby.id);
        });
        
        hobbiesGrid.appendChild(hobbyCard);
    });
    
    // Инициализируем анимации
    setTimeout(() => {
        const animatedElements = hobbiesGrid.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// Инициализация селектора хобби
function initHobbySelector() {
    const hobbyButtonsContainer = document.getElementById('hobbySelector');
    const hobbyDetailsContainer = document.getElementById('hobbyDetails');
    
    if (!hobbyButtonsContainer || !hobbyDetailsContainer) return;
    
    const hobbies = [
        { id: 'programming', name: 'Программирование', icon: 'fas fa-code' },
        { id: 'photography', name: 'Фотография', icon: 'fas fa-camera' },
        { id: 'music', name: 'Музыка', icon: 'fas fa-music' },
        { id: 'sports', name: 'Спорт', icon: 'fas fa-bicycle' },
        { id: 'reading', name: 'Чтение', icon: 'fas fa-book' },
        { id: 'travel', name: 'Путешествия', icon: 'fas fa-plane' },
        { id: 'gaming', name: 'Видеоигры', icon: 'fas fa-gamepad' },
        { id: 'cooking', name: 'Кулинария', icon: 'fas fa-utensils' }
    ];
    
    // Создаем кнопки для выбора хобби
    hobbies.forEach(hobby => {
        const button = document.createElement('button');
        button.className = 'hobby-btn';
        button.setAttribute('data-hobby', hobby.id);
        button.innerHTML = `<i class="${hobby.icon}"></i> ${hobby.name}`;
        
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            document.querySelectorAll('.hobby-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Показываем детали выбранного хобби
            showHobbyDetailsById(hobby.id);
        });
        
        hobbyButtonsContainer.appendChild(button);
    });
    
    // Показываем первое хобби по умолчанию
    if (hobbies.length > 0) {
        const firstButton = hobbyButtonsContainer.querySelector('.hobby-btn');
        if (firstButton) {
            firstButton.classList.add('active');
            showHobbyDetailsById(hobbies[0].id);
        }
    }
}

// Функция для отображения деталей хобби по ID
function showHobbyDetailsById(hobbyId) {
    const hobbyDetails = {
        programming: {
            title: 'Программирование',
            description: 'Помимо основной работы в веб-разработке, я увлекаюсь изучением новых языков и технологий. Сейчас активно изучаю Python для анализа данных и машинного обучения. Участвую в open-source проектах и создаю собственные проекты.',
            stats: [
                { value: '5+', label: 'Языков программирования' },
                { value: '20+', label: 'Завершенных проектов' },
                { value: '2500+', label: 'Часов практики' }
            ]
        },
        photography: {
            title: 'Фотография',
            description: 'Красивые уличные фото всегда привлекают , у меня друг занимается фото а я бывает помогаю',
            stats: [
                { value: '1K+', label: 'Фотографий в архиве' },
                { value: '0', label: 'Выставки' },
                { value: '1', label: 'Камера телефона' }
            ]
        },
        music: {
            title: 'Музыка',
            description: 'Играл на гитаре с 15 лет. Потом гитара досталась брату и я больше не увликался музыкой , но я продолжаю слушать музыку.',
            stats: [
                { value: '0', label: 'Музыкальных инструментов' },
                { value: '0+', label: 'Разученных песен' },
                { value: '2000+', label: 'Прослушенных песен в месяц' }
            ]
        },
        sports: {
            title: 'Спорт',
            description: 'Занимаюсь спортом с детства. Сейчас основное внимание уделяю тренеровкам дома , правда почти нет времени в последний месяц (3 раза в неделю иногда 7) бегать я не очень люблю , но могу пробежать , труда не составит.',
            stats: [
                { value: '100', label: 'Отжиманий за подход' },
                { value: '3-7', label: 'Тренировки в неделю' },
                { value: '10', label: 'Забегов за год по физре' }
            ]
        },
        reading: {
            title: 'Чтение',
            description: 'Читаю около 1 книг в пол года. Предпочитаю читать книги которые реально откладываются и дадут какой-то результат.',
            stats: [
                { value: '5-10', label: 'Книги в год' },
                { value: '50+', label: 'Прочитано всего' },
                { value: '5', label: 'Любимых авторов' }
            ]
        },
        travel: {
            title: 'Путешествия',
            description: 'Посетил 2 стран и более 5 городов =)  Предпочитаю самостоятельные путешествия с погружением в местную культуру без гида и без ограничений , приехал походил сам всё посмотрел пофоткал если нужно и уехал или ушёл.',
            stats: [
                { value: '2', label: 'Стран посещено' },
                { value: '5+', label: 'Городов' },
                { value: '3', label: 'Континента' }
            ]
        },
        gaming: {
            title: 'Видеоигры',
            description: 'Играю в видеоигры с детства. Предпочитаю стратегии, RPG и приключенческие игры. Пытался участвовать в киберспортивных турнирах по CSGO. Интересуюсь геймдевом и изучаю движки Unity и Unreal Engine.',
            stats: [
                { value: '5000+', label: 'Часов в Steam' },
                { value: '3', label: 'Турнира' },
                { value: '150+', label: 'Завершенных игр' }
            ]
        },
        cooking: {
            title: 'Кулинария',
            description: 'Начал готовить серьезно 2 года назад. Перехал от родителей и начал изучать кухню , получалось не плохо сейчас из-за обстоятельств вернулся обратно.',
            stats: [
                { value: '100+', label: 'Освоенных рецептов' },
                { value: '500', label: 'Приготовленных блюд' },
                { value: '2', label: 'Тематических ужинов' }
            ]
        }
    };
    
    const hobby = hobbyDetails[hobbyId];
    if (!hobby) return;
    
    const hobbyDetailsContainer = document.getElementById('hobbyDetails');
    if (!hobbyDetailsContainer) return;
    
    // Создаем HTML для отображения деталей
    let statsHTML = '';
    if (hobby.stats) {
        statsHTML = `
            <div class="hobby-stats">
                ${hobby.stats.map(stat => `
                    <div class="stat-item">
                        <div class="stat-value">${stat.value}</div>
                        <div class="stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    hobbyDetailsContainer.innerHTML = `
        <div class="hobby-details-content">
            <h4>${hobby.title}</h4>
            <p>${hobby.description}</p>
            ${statsHTML}
        </div>
    `;
}

// Функция для отображения деталей хобби (из карточки)
function showHobbyDetails(hobby) {
    const hobbyDetailsContainer = document.getElementById('hobbyDetails');
    if (!hobbyDetailsContainer) return;
    
    // Заглушка для статистики (в реальном приложении можно расширить)
    const stats = [
        { value: '2+', label: 'Года увлечения' },
        { value: 'Регулярно', label: 'Занимаюсь' },
        { value: 'Высокий', label: 'Уровень' }
    ];
    
    const statsHTML = `
        <div class="hobby-stats">
            ${stats.map(stat => `
                <div class="stat-item">
                    <div class="stat-value">${stat.value}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    hobbyDetailsContainer.innerHTML = `
        <div class="hobby-details-content">
            <h4>${hobby.title}</h4>
            <p>${hobby.description}</p>
            ${statsHTML}
        </div>
    `;
}

// Подсветка кнопки при выборе хобби из карточки
function highlightHobbyButton(hobbyId) {
    const buttons = document.querySelectorAll('.hobby-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-hobby') === hobbyId) {
            btn.classList.add('active');
        }
    });
}

// Инициализация расписания хобби
function initHobbySchedule() {
    const scheduleContainer = document.getElementById('hobbySchedule');
    if (!scheduleContainer) return;
    
    const schedule = [
        {
            day: 'Понедельник',
            hobbies: ['Программирование', 'Спорт'],
            active: true
        },
        {
            day: 'Вторник',
            hobbies: ['Чтение', 'Музыка'],
            active: false
        },
        {
            day: 'Среда',
            hobbies: ['Спорт', 'Программирование'],
            active: false
        },
        {
            day: 'Четверг',
            hobbies: ['Фотография', 'Кулинария'],
            active: false
        },
        {
            day: 'Пятница',
            hobbies: ['Видеоигры', 'Музыка'],
            active: false
        },
        {
            day: 'Суббота',
            hobbies: ['Путешествия', 'Фотография'],
            active: false
        },
        {
            day: 'Воскресенье',
            hobbies: ['Отдых', 'Чтение'],
            active: false
        }
    ];
    
    // Определяем текущий день недели
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const today = new Date().getDay();
    const todayName = days[today];
    
    // Создаем элементы расписания
    schedule.forEach(daySchedule => {
        const dayElement = document.createElement('div');
        dayElement.className = 'schedule-day';
        
        // Помечаем текущий день как активный
        if (daySchedule.day === todayName) {
            dayElement.classList.add('active');
        }
        
        dayElement.innerHTML = `
            <div class="day-name">${daySchedule.day}</div>
            <div class="day-hobbies">${daySchedule.hobbies.join(', ')}</div>
        `;
        
        scheduleContainer.appendChild(dayElement);
    });
    
    // Добавляем интерактивность - при клике на день он становится активным
    const dayElements = scheduleContainer.querySelectorAll('.schedule-day');
    dayElements.forEach(day => {
        day.addEventListener('click', function() {
            dayElements.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Инициализация галереи хобби
function initHobbyGallery() {
    const galleryContainer = document.getElementById('hobbyGallery');
    if (!galleryContainer) return;
    
    const galleryItems = [
        {
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Программирование',
            description: 'Мой рабочий стол'
        },
        {
            image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Фотография',
            description: 'Фотосессия в лесу'
        },
        {
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Музыка',
            description: 'Игра на гитаре'
        },
        {
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Спорт',
            description: 'Утренняя пробежка'
        },
        {
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Чтение',
            description: 'Домашняя библиотека'
        },
        {
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Путешествия',
            description: 'Горный поход'
        },
        {
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Видеоигры',
            description: 'Игровая setup'
        },
        {
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            title: 'Кулинария',
            description: 'Домашняя пицца'
        }
    ];
    
    // Создаем элементы галереи
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        
        // Добавляем обработчик клика для увеличения изображения
        galleryItem.addEventListener('click', function() {
            showImageModal(item.image, item.title, item.description);
        });
        
        galleryContainer.appendChild(galleryItem);
    });
}

// Функция для отображения модального окна с изображением
function showImageModal(imageUrl, title, description) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 90%; max-height: 90%; position: relative;">
            <button class="modal-close" style="position: absolute; top: -40px; right: -40px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
            <img src="${imageUrl}" alt="${title}" style="max-width: 100%; max-height: 80vh; border-radius: 5px;">
            <div style="color: white; text-align: center; padding: 20px;">
                <h3 style="margin-bottom: 10px;">${title}</h3>
                <p style="opacity: 0.8;">${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Анимация появления
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Закрытие модального окна
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    // Закрытие по клику на фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Инициализация теста на хобби
function initHobbyQuiz() {
    const quizResultBtn = document.getElementById('quizResultBtn');
    const quizResult = document.getElementById('quizResult');
    
    if (!quizResultBtn || !quizResult) return;
    
    let userPoints = {
        programming: 0,
        photography: 0,
        music: 0,
        sports: 0,
        reading: 0,
        travel: 0,
        gaming: 0,
        cooking: 0
    };
    
    // Обработчик выбора ответа в тесте
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Сбрасываем стили всех вариантов
            options.forEach(opt => {
                opt.style.background = 'white';
                opt.style.color = '';
                opt.style.borderColor = '#e9ecef';
            });
            
            // Подсвечиваем выбранный вариант
            this.style.background = 'var(--secondary-color)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--secondary-color)';
            
            // Сохраняем выбранный вариант
            this.classList.add('selected');
            
            // Добавляем баллы
            const pointsData = this.getAttribute('data-points');
            const points = pointsData.split(',').map(p => p.trim());
            
            points.forEach(point => {
                const [hobby, value] = point.split(':');
                if (userPoints.hasOwnProperty(hobby)) {
                    userPoints[hobby] += parseInt(value);
                }
            });
        });
    });
    
    // Обработчик кнопки "Узнать результат"
    quizResultBtn.addEventListener('click', function() {
        // Проверяем, был ли выбран хотя бы один ответ
        const selectedOption = document.querySelector('.quiz-option.selected');
        if (!selectedOption) {
            alert('Пожалуйста, выберите ответ на вопрос!');
            return;
        }
        
        // Находим хобби с максимальным количеством баллов
        let maxPoints = 0;
        let recommendedHobby = '';
        
        for (const [hobby, points] of Object.entries(userPoints)) {
            if (points > maxPoints) {
                maxPoints = points;
                recommendedHobby = hobby;
            }
        }
        
        // Определяем название и описание рекомендованного хобби
        const hobbyNames = {
            programming: 'Программирование',
            photography: 'Фотография',
            music: 'Музыка',
            sports: 'Спорт',
            reading: 'Чтение',
            travel: 'Путешествия',
            gaming: 'Видеоигры',
            cooking: 'Кулинария'
        };
        
        const hobbyDescriptions = {
            programming: 'Вам подойдет программирование! Вы любите технические задачи и решение проблем. Это хобби поможет развить логическое мышление и может даже стать профессией.',
            photography: 'Вам подойдет фотография! Вы цените красоту вокруг и любите запечатлевать моменты. Это творческое хобби, которое развивает чувство композиции и наблюдательность.',
            music: 'Вам подойдет музыка! Вы чувствительны к звукам и ритмам. Игра на инструменте или пение помогут выразить эмоции и снять стресс.',
            sports: 'Вам подойдет спорт! Вы активны и цените физическое развитие. Регулярные тренировки улучшат здоровье и дадут заряд энергии.',
            reading: 'Вам подойдет чтение! Вы любознательны и цените знания. Чтение расширит кругозор и улучшит словарный запас.',
            travel: 'Вам подойдут путешествия! Вы любите исследовать новое и открывать неизведанное. Путешествия расширят кругозор и дадут незабываемые впечатления.',
            gaming: 'Вам подойдут видеоигры! Вы любите стратегию и погружение в другие миры. Игры развивают реакцию, стратегическое мышление и могут быть социальным хобби.',
            cooking: 'Вам подойдет кулинария! Вы цените процесс создания и эксперименты. Готовка развивает креативность и порадует ваших близких.'
        };
        
        const hobbyIcons = {
            programming: 'fas fa-code',
            photography: 'fas fa-camera',
            music: 'fas fa-music',
            sports: 'fas fa-bicycle',
            reading: 'fas fa-book',
            travel: 'fas fa-plane',
            gaming: 'fas fa-gamepad',
            cooking: 'fas fa-utensils'
        };
        
        // Отображаем результат
        quizResult.innerHTML = `
            <h4>Рекомендованное хобби:</h4>
            <div class="quiz-hobby">
                <i class="${hobbyIcons[recommendedHobby]}"></i>
                <span>${hobbyNames[recommendedHobby]}</span>
            </div>
            <p>${hobbyDescriptions[recommendedHobby]}</p>
            <p><small>На основе ваших ответов система определила, что это хобби лучше всего соответствует вашим интересам и образу жизни.</small></p>
        `;
        
        quizResult.classList.add('show');
        
        // Прокручиваем к результату
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Сбрасываем баллы для следующего прохождения
        userPoints = {
            programming: 0,
            photography: 0,
            music: 0,
            sports: 0,
            reading: 0,
            travel: 0,
            gaming: 0,
            cooking: 0
        };
        
        // Сбрасываем стили вариантов ответа
        options.forEach(opt => {
            opt.style.background = 'white';
            opt.style.color = '';
            opt.style.borderColor = '#e9ecef';
            opt.classList.remove('selected');
        });
    });
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