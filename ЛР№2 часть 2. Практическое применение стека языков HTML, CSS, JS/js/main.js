// main.js - Основные скрипты для сайта

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initAnimations();
    initTheme();
});

// Навигационное меню с анимацией
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    
    if (menuToggle && navList) {
        // Переключение мобильного меню
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Анимация иконки меню
            const icon = this.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                this.setAttribute('aria-label', 'Закрыть меню');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                this.setAttribute('aria-label', 'Открыть меню');
            }
        });
        
        // Закрытие меню при клике на ссылку (на мобильных)
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.setAttribute('aria-label', 'Открыть меню');
                }
            });
        });
        
        // Анимация пунктов меню при наведении
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(-3px)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }
    
    // Подсветка активной страницы
    highlightCurrentPage();
}

// Подсветка текущей страницы в меню
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Анимация элементов при прокрутке
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Проверка видимости элемента
    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверка при загрузке и прокрутке
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Анимация кнопок
    const buttons = document.querySelectorAll('.btn, .link-card, .message-card');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Инициализация темы (можно расширить для темной/светлой темы)
function initTheme() {
    // Сохранение предпочтений темы
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Переключить тему');
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--secondary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    themeToggle.style.transition = 'all 0.3s ease';
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Переключение темы
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Включить светлую тему');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Включить темную тему');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Включить светлую тему');
    }
    
    document.body.appendChild(themeToggle);
    
    // Стили для темной темы
    const darkThemeStyles = `
        <style>
            .dark-theme {
                background-color: #1a1a2e;
                color: #e6e6e6;
            }
            
            .dark-theme .header {
                background: linear-gradient(135deg, #16213e, #0f3460);
            }
            
            .dark-theme .main-nav {
                background-color: #16213e;
            }
            
            .dark-theme .nav-list a {
                color: #e6e6e6;
            }
            
            .dark-theme .nav-list a:hover {
                background-color: #0f3460;
            }
            
            .dark-theme .profile-card,
            .dark-theme .news-item,
            .dark-theme .link-card,
            .dark-theme .message-card {
                background-color: #16213e;
                color: #e6e6e6;
            }
            
            .dark-theme .section-title,
            .dark-theme .profile-info h3,
            .dark-theme .news-item h3,
            .dark-theme .link-card h3 {
                color: #e6e6e6;
            }
            
            .dark-theme .profile-info p,
            .dark-theme .news-content,
            .dark-theme .link-card p {
                color: #b0b0b0;
            }
            
            .dark-theme .footer {
                background-color: #0f3460;
            }
            
            .dark-theme .social-links a {
                background-color: rgba(255, 255, 255, 0.15);
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', darkThemeStyles);
}

// Утилитарные функции
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Экспорт функций для использования в других файлах
window.siteUtils = {
    debounce,
    highlightCurrentPage
};