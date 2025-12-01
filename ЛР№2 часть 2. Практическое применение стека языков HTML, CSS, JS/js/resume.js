// resume.js - Скрипты для страницы резюме

document.addEventListener('DOMContentLoaded', function() {
    initResumeAnimations();
    initDownloadButton();
});

// Инициализация анимаций для страницы резюме
function initResumeAnimations() {
    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkVisibility() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                element.classList.add('visible');
                
                // Анимация для skill bars
                if (element.querySelector('.skill-level')) {
                    animateSkillBars(element);
                }
            }
        });
    }
    
    // Анимация skill bars
    function animateSkillBars(container) {
        const skillBars = container.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Проверка при загрузке и прокрутке
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Добавляем анимацию при наведении на блоки резюме
    const resumeBlocks = document.querySelectorAll('.resume-block');
    resumeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Инициализация кнопки скачивания резюме
function initDownloadButton() {
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Создаем уведомление о том, что резюме скачивается
        const notification = document.createElement('div');
        notification.className = 'notification notification-success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Резюме готовится к скачиванию...</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // В реальном проекте здесь был бы запрос к серверу для генерации PDF
        // Для демонстрации имитируем задержку скачивания
        setTimeout(() => {
            notification.querySelector('span').textContent = 'Резюме успешно скачано!';
            
            // Через 3 секунды удаляем уведомление
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
            
            // В реальном проекте здесь был бы вызов для скачивания файла
            window.open('resume.pdf', '_blank');
            
        }, 2000);
    });
    
    // Добавляем стили для уведомления, если их еще нет
    if (!document.querySelector('#resumeNotificationStyles')) {
        const style = document.createElement('style');
        style.id = 'resumeNotificationStyles';
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
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                color: #2ecc71;
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// Добавляем интерактивность для таймлайна
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dot = this.querySelector('.timeline-item::before');
            if (dot) {
                this.style.setProperty('--dot-color', '#e74c3c');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const dot = this.querySelector('.timeline-item::before');
            if (dot) {
                this.style.setProperty('--dot-color', 'var(--secondary-color)');
            }
        });
    });
});