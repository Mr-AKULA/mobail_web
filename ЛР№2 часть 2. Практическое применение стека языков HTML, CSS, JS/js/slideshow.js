// slideshow.js - Слайд-шоу для страницы фотографий

class Slideshow {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.slides = [];
        this.currentIndex = 0;
        this.isPlaying = true;
        this.interval = null;
        this.intervalTime = 4000; // 4 секунды
        
        this.init();
    }
    
    init() {
        // Собираем все изображения из контейнера
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        
        if (this.slides.length === 0) {
            console.warn('Слайды не найдены');
            return;
        }
        
        // Создаем элементы управления
        this.createControls();
        
        // Показываем первый слайд
        this.showSlide(0);
        
        // Запускаем автоматическое переключение
        this.startAutoPlay();
        
        // Добавляем обработчики событий
        this.addEventListeners();
    }
    
    createControls() {
        // Создаем контейнер для управления
        const controls = document.createElement('div');
        controls.className = 'slideshow-controls';
        
        // Кнопка "Назад"
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slideshow-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.setAttribute('aria-label', 'Предыдущее фото');
        
        // Кнопка "Вперед"
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slideshow-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.setAttribute('aria-label', 'Следующее фото');
        
        // Кнопка воспроизведения/паузы
        const playPauseBtn = document.createElement('button');
        playPauseBtn.className = 'slideshow-btn play-pause-btn';
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
        
        // Индикаторы слайдов
        const indicators = document.createElement('div');
        indicators.className = 'slideshow-indicators';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            indicator.setAttribute('data-index', index);
            indicator.setAttribute('aria-label', `Перейти к фото ${index + 1}`);
            indicators.appendChild(indicator);
        });
        
        // Счетчик слайдов
        const counter = document.createElement('div');
        counter.className = 'slideshow-counter';
        
        // Собираем все элементы управления
        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        controls.appendChild(playPauseBtn);
        controls.appendChild(indicators);
        controls.appendChild(counter);
        
        this.container.appendChild(controls);
        
        // Сохраняем ссылки на элементы
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.playPauseBtn = playPauseBtn;
        this.indicators = indicators;
        this.counter = counter;
    }
    
    showSlide(index) {
        // Проверяем границы
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;
        
        // Скрываем все слайды
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'scale(0.95)';
        });
        
        // Показываем текущий слайд
        this.slides[index].classList.add('active');
        setTimeout(() => {
            this.slides[index].style.opacity = '1';
            this.slides[index].style.transform = 'scale(1)';
        }, 50);
        
        // Обновляем индикаторы
        this.updateIndicators(index);
        
        // Обновляем счетчик
        this.updateCounter(index);
        
        // Сохраняем текущий индекс
        this.currentIndex = index;
    }
    
    updateIndicators(index) {
        const indicators = this.indicators.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    updateCounter(index) {
        this.counter.textContent = `${index + 1} / ${this.slides.length}`;
    }
    
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.interval = setInterval(() => {
            if (this.isPlaying) {
                this.nextSlide();
            }
        }, this.intervalTime);
    }
    
    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        
        const icon = this.playPauseBtn.querySelector('i');
        if (this.isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            this.playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
            this.startAutoPlay();
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            this.playPauseBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
            this.stopAutoPlay();
        }
    }
    
    goToSlide(index) {
        this.showSlide(index);
        // При ручном переключении останавливаем автовоспроизведение на 5 секунд
        if (this.isPlaying) {
            this.isPlaying = false;
            const icon = this.playPauseBtn.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            this.playPauseBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
            this.stopAutoPlay();
            
            setTimeout(() => {
                this.isPlaying = true;
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                this.playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
                this.startAutoPlay();
            }, 5000);
        }
    }
    
    addEventListeners() {
        // Кнопка "Назад"
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
        });
        
        // Кнопка "Вперед"
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Кнопка воспроизведения/паузы
        this.playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Индикаторы
        this.indicators.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.goToSlide(index);
            }
        });
        
        // Управление с клавиатуры
        document.addEventListener('keydown', (e) => {
            if (!this.container.contains(document.activeElement)) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ':
                case 'Spacebar':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
            }
        });
        
        // Пауза при наведении мыши
        this.container.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.isPlaying = false;
                const icon = this.playPauseBtn.querySelector('i');
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                this.playPauseBtn.setAttribute('aria-label', 'Возобновить слайд-шоу');
                this.stopAutoPlay();
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (!this.isPlaying) {
                this.isPlaying = true;
                const icon = this.playPauseBtn.querySelector('i');
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                this.playPauseBtn.setAttribute('aria-label', 'Приостановить слайд-шоу');
                this.startAutoPlay();
            }
        });
        
        // Свайпы для мобильных устройств
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) { // Минимальное расстояние для свайпа
                if (diff > 0) {
                    this.nextSlide(); // Свайп влево
                } else {
                    this.prevSlide(); // Свайп вправо
                }
            }
        }, { passive: true });
    }
}

// Инициализация слайд-шоу при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.getElementById('slideshowContainer');
    if (slideshowContainer) {
        new Slideshow('slideshowContainer');
    }
});