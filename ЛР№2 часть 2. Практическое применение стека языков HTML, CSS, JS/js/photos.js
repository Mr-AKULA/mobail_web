// photos.js - Дополнительные скрипты для страницы фотографий

document.addEventListener('DOMContentLoaded', function() {
    initPhotoGallery();
    initModal();
});

// Инициализация фотогалереи
function initPhotoGallery() {
    const photoGrid = document.getElementById('photoGrid');
    if (!photoGrid) return;
    
    const photos = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Портрет на природе',
            description: 'Летний день в парке'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Рабочий процесс',
            description: 'Мой рабочий стол с проектами'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Путешествия',
            description: 'Горный поход прошлым летом'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'С друзьями',
            description: 'Встреча выпускников'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Фотография',
            description: 'Один из моих увлечений'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Конференция',
            description: 'Выступление на IT-конференции'
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Креативное пространство',
            description: 'Мое место для творчества'
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Профессиональный портрет',
            description: 'Для LinkedIn профиля'
        },
        {
            id: 9,
            url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            title: 'Отдых на природе',
            description: 'Выходные за городом'
        }
    ];
    
    // Создаем элементы фотогалереи
    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.className = 'photo-item animate-on-scroll';
        photoElement.setAttribute('data-id', photo.id);
        photoElement.setAttribute('role', 'button');
        photoElement.setAttribute('tabindex', '0');
        photoElement.setAttribute('aria-label', `Открыть фото: ${photo.title}`);
        
        photoElement.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}" loading="lazy">
            <div class="photo-overlay">
                <h4 class="photo-title">${photo.title}</h4>
                <p class="photo-description">${photo.description}</p>
            </div>
        `;
        
        // Добавляем обработчик клика
        photoElement.addEventListener('click', function() {
            openModal(photo);
        });
        
        // Добавляем обработчик нажатия клавиши Enter
        photoElement.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(photo);
            }
        });
        
        photoGrid.appendChild(photoElement);
    });
    
    // Инициализируем анимации
    setTimeout(() => {
        const animatedElements = photoGrid.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('photoModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    if (!modal) return;
    
    let currentPhotoIndex = 0;
    let photos = [];
    
    // Собираем все фотографии из галереи
    function updatePhotos() {
        const photoItems = document.querySelectorAll('.photo-item');
        photos = Array.from(photoItems).map(item => {
            const img = item.querySelector('img');
            const title = item.querySelector('.photo-title')?.textContent || '';
            const description = item.querySelector('.photo-description')?.textContent || '';
            
            return {
                id: item.getAttribute('data-id'),
                url: img.src.replace('/400q=80', '/1200q=80'), // Используем изображение большего размера
                title: title,
                description: description
            };
        });
    }
    
    // Открытие модального окна
    window.openModal = function(photo) {
        updatePhotos();
        
        // Находим индекс текущей фотографии
        currentPhotoIndex = photos.findIndex(p => p.id === photo.id);
        if (currentPhotoIndex === -1) currentPhotoIndex = 0;
        
        // Устанавливаем изображение и описание
        modalImage.src = photos[currentPhotoIndex].url;
        modalImage.alt = photos[currentPhotoIndex].title;
        modalCaption.innerHTML = `
            <h3>${photos[currentPhotoIndex].title}</h3>
            <p>${photos[currentPhotoIndex].description}</p>
        `;
        
        // Показываем модальное окно
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    };
    
    // Закрытие модального окна
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Навигация по фотографиям
    modalPrev.addEventListener('click', showPrevPhoto);
    modalNext.addEventListener('click', showNextPhoto);
    
    // Навигация с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                showPrevPhoto();
                break;
            case 'ArrowRight':
                e.preventDefault();
                showNextPhoto();
                break;
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        }, 300);
    }
    
    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateModalContent();
    }
    
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateModalContent();
    }
    
    function updateModalContent() {
        modalImage.style.opacity = '0.7';
        
        setTimeout(() => {
            modalImage.src = photos[currentPhotoIndex].url;
            modalImage.alt = photos[currentPhotoIndex].title;
            modalCaption.innerHTML = `
                <h3>${photos[currentPhotoIndex].title}</h3>
                <p>${photos[currentPhotoIndex].description}</p>
            `;
            
            modalImage.style.opacity = '1';
        }, 200);
    }
    
    // Добавляем свайпы для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Минимальное расстояние для свайпа
            if (diff > 0) {
                showNextPhoto(); // Свайп влево
            } else {
                showPrevPhoto(); // Свайп вправо
            }
        }
    }, { passive: true });
}