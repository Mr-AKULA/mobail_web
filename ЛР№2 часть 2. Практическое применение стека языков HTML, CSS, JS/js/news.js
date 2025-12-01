// news.js - Загрузка новостей из текстового файла

document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('newsContainer');
    
    if (!newsContainer) return;
    
    // Загружаем новости из файла
    loadNews();
    
    async function loadNews() {
        try {
            const response = await fetch('data/news.txt');
            
            if (!response.ok) {
                throw new Error('Файл с новостями не найден');
            }
            
            const text = await response.text();
            displayNews(text);
        } catch (error) {
            console.error('Ошибка загрузки новостей:', error);
            displayFallbackNews();
        }
    }
    
    function displayNews(newsText) {
        // Разделяем текст на отдельные новости
        const newsItems = newsText.split('---').filter(item => item.trim());
        
        if (newsItems.length === 0) {
            displayFallbackNews();
            return;
        }
        
        // Очищаем контейнер
        newsContainer.innerHTML = '';
        
        // Создаем элементы для каждой новости
        newsItems.forEach((item, index) => {
            const lines = item.trim().split('\n').filter(line => line.trim());
            
            if (lines.length === 0) return;
            
            const newsElement = document.createElement('div');
            newsElement.className = 'news-item';
            
            // Первая строка - заголовок, остальные - содержание
            const title = lines[0];
            const content = lines.slice(1).join('<br>');
            
            newsElement.innerHTML = `
                <h3>${title}</h3>
                <div class="news-content">${content}</div>
                <div class="news-date">${getRandomDate()}</div>
            `;
            
            // Добавляем анимацию задержки
            newsElement.style.animationDelay = `${index * 0.1}s`;
            
            newsContainer.appendChild(newsElement);
        });
    }
    
    function displayFallbackNews() {
        newsContainer.innerHTML = `
            <div class="news-item">
                <h3>Добро пожаловать на мой сайт!</h3>
                <div class="news-content">
                    Я только что запустил свой персональный сайт. Здесь будут появляться новости о моих проектах и достижениях.
                </div>
                <div class="news-date">Сегодня</div>
            </div>
            <div class="news-item">
                <h3>Изучаю веб-разработку</h3>
                <div class="news-content">
                    В настоящее время активно изучаю HTML, CSS и JavaScript. Этот сайт - один из моих учебных проектов.
                </div>
                <div class="news-date">Недавно</div>
            </div>
            <div class="news-item">
                <h3>Бекэнд</h3>
                <div class="news-content">
                    Начал изучать C#.
                </div>
                <div class="news-date">Чуть позднее чем недавно</div>
            </div>
        `;
    }
    
    function getRandomDate() {
        const dates = [
            'Сегодня',
            'Вчера',
            '2 дня назад',
            'Неделю назад',
            '10 дней назад',
            '2 недели назад'
        ];
        return dates[Math.floor(Math.random() * dates.length)];
    }
});