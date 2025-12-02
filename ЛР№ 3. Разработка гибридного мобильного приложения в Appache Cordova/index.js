// Ожидание загрузки Cordova
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova загружен успешно');
    initApp();
}

// Инициализация приложения
function initApp() {
    // Данные о фигурах
    const figures = {
        square: {
            name: 'Квадрат',
            emoji: '⬛',
            dimension: '2D',
            inputs: [
                { id: 'side', label: 'Сторона (a), см', placeholder: 'Введите длину стороны' }
            ],
            calculate: (v) => ({
                'Периметр': { value: 4 * v.side, unit: 'см' },
                'Площадь': { value: v.side * v.side, unit: 'см²' }
            })
        },
        rectangle: {
            name: 'Прямоугольник',
            emoji: '▭',
            dimension: '2D',
            inputs: [
                { id: 'length', label: 'Длина (a), см', placeholder: 'Введите длину' },
                { id: 'width', label: 'Ширина (b), см', placeholder: 'Введите ширину' }
            ],
            calculate: (v) => ({
                'Периметр': { value: 2 * (v.length + v.width), unit: 'см' },
                'Площадь': { value: v.length * v.width, unit: 'см²' }
            })
        },
        triangle: {
            name: 'Треугольник',
            emoji: '△',
            dimension: '2D',
            inputs: [
                { id: 'sideA', label: 'Сторона a, см', placeholder: 'Введите сторону a' },
                { id: 'sideB', label: 'Сторона b, см', placeholder: 'Введите сторону b' },
                { id: 'sideC', label: 'Сторона c, см', placeholder: 'Введите сторону c' }
            ],
            calculate: (v) => {
                const p = (v.sideA + v.sideB + v.sideC) / 2;
                const area = Math.sqrt(p * (p - v.sideA) * (p - v.sideB) * (p - v.sideC));
                return {
                    'Периметр': { value: v.sideA + v.sideB + v.sideC, unit: 'см' },
                    'Площадь': { value: area, unit: 'см²' }
                };
            }
        },
        parallelogram: {
            name: 'Параллелограмм',
            emoji: '▱',
            dimension: '2D',
            inputs: [
                { id: 'base', label: 'Основание (a), см', placeholder: 'Введите основание' },
                { id: 'side', label: 'Сторона (b), см', placeholder: 'Введите сторону' },
                { id: 'height', label: 'Высота (h), см', placeholder: 'Введите высоту' }
            ],
            calculate: (v) => ({
                'Периметр': { value: 2 * (v.base + v.side), unit: 'см' },
                'Площадь': { value: v.base * v.height, unit: 'см²' }
            })
        },
        trapezoid: {
            name: 'Трапеция',
            emoji: '⏢',
            dimension: '2D',
            inputs: [
                { id: 'baseA', label: 'Основание a, см', placeholder: 'Введите основание a' },
                { id: 'baseB', label: 'Основание b, см', placeholder: 'Введите основание b' },
                { id: 'sideC', label: 'Сторона c, см', placeholder: 'Введите сторону c' },
                { id: 'sideD', label: 'Сторона d, см', placeholder: 'Введите сторону d' },
                { id: 'height', label: 'Высота (h), см', placeholder: 'Введите высоту' }
            ],
            calculate: (v) => ({
                'Периметр': { value: v.baseA + v.baseB + v.sideC + v.sideD, unit: 'см' },
                'Площадь': { value: ((v.baseA + v.baseB) / 2) * v.height, unit: 'см²' }
            })
        },
        rhombus: {
            name: 'Ромб',
            emoji: '◆',
            dimension: '2D',
            inputs: [
                { id: 'side', label: 'Сторона (a), см', placeholder: 'Введите сторону' },
                { id: 'diagonal1', label: 'Диагональ d₁, см', placeholder: 'Введите диагональ 1' },
                { id: 'diagonal2', label: 'Диагональ d₂, см', placeholder: 'Введите диагональ 2' }
            ],
            calculate: (v) => ({
                'Периметр': { value: 4 * v.side, unit: 'см' },
                'Площадь': { value: (v.diagonal1 * v.diagonal2) / 2, unit: 'см²' }
            })
        },
        circle: {
            name: 'Круг',
            emoji: '⭕',
            dimension: '2D',
            inputs: [
                { id: 'radius', label: 'Радиус (r), см', placeholder: 'Введите радиус' }
            ],
            calculate: (v) => ({
                'Длина окружности': { value: 2 * Math.PI * v.radius, unit: 'см' },
                'Площадь': { value: Math.PI * v.radius * v.radius, unit: 'см²' }
            })
        },
        cube: {
            name: 'Куб',
            emoji: '🎲',
            dimension: '3D',
            inputs: [
                { id: 'side', label: 'Ребро (a), см', placeholder: 'Введите длину ребра' }
            ],
            calculate: (v) => ({
                'Площадь поверхности': { value: 6 * v.side * v.side, unit: 'см²' },
                'Объём': { value: v.side * v.side * v.side, unit: 'см³' }
            })
        },
        parallelepiped: {
            name: 'Параллелепипед',
            emoji: '📦',
            dimension: '3D',
            inputs: [
                { id: 'length', label: 'Длина (a), см', placeholder: 'Введите длину' },
                { id: 'width', label: 'Ширина (b), см', placeholder: 'Введите ширину' },
                { id: 'height', label: 'Высота (c), см', placeholder: 'Введите высоту' }
            ],
            calculate: (v) => ({
                'Площадь поверхности': { value: 2 * (v.length * v.width + v.length * v.height + v.width * v.height), unit: 'см²' },
                'Объём': { value: v.length * v.width * v.height, unit: 'см³' }
            })
        },
        cone: {
            name: 'Конус',
            emoji: '🔺',
            dimension: '3D',
            inputs: [
                { id: 'radius', label: 'Радиус (r), см', placeholder: 'Введите радиус основания' },
                { id: 'height', label: 'Высота (h), см', placeholder: 'Введите высоту' }
            ],
            calculate: (v) => {
                const l = Math.sqrt(v.radius * v.radius + v.height * v.height);
                return {
                    'Площадь поверхности': { value: Math.PI * v.radius * (v.radius + l), unit: 'см²' },
                    'Объём': { value: (1/3) * Math.PI * v.radius * v.radius * v.height, unit: 'см³' }
                };
            }
        },
        pyramid: {
            name: 'Пирамида',
            emoji: '🔻',
            dimension: '3D',
            inputs: [
                { id: 'base', label: 'Сторона основания (a), см', placeholder: 'Введите сторону основания' },
                { id: 'height', label: 'Высота (h), см', placeholder: 'Введите высоту' }
            ],
            calculate: (v) => {
                const slantHeight = Math.sqrt(v.height * v.height + (v.base / 2) * (v.base / 2));
                return {
                    'Площадь поверхности': { value: v.base * v.base + 2 * v.base * slantHeight, unit: 'см²' },
                    'Объём': { value: (1/3) * v.base * v.base * v.height, unit: 'см³' }
                };
            }
        },
        cylinder: {
            name: 'Цилиндр',
            emoji: '🥫',
            dimension: '3D',
            inputs: [
                { id: 'radius', label: 'Радиус (r), см', placeholder: 'Введите радиус основания' },
                { id: 'height', label: 'Высота (h), см', placeholder: 'Введите высоту' }
            ],
            calculate: (v) => ({
                'Площадь поверхности': { value: 2 * Math.PI * v.radius * (v.radius + v.height), unit: 'см²' },
                'Объём': { value: Math.PI * v.radius * v.radius * v.height, unit: 'см³' }
            })
        },
        sphere: {
            name: 'Шар',
            emoji: '⚽',
            dimension: '3D',
            inputs: [
                { id: 'radius', label: 'Радиус (r), см', placeholder: 'Введите радиус' }
            ],
            calculate: (v) => ({
                'Площадь поверхности': { value: 4 * Math.PI * v.radius * v.radius, unit: 'см²' },
                'Объём': { value: (4/3) * Math.PI * v.radius * v.radius * v.radius, unit: 'см³' }
            })
        }
    };

    // Элементы DOM
    const figureTypeSelect = document.getElementById('figureType');
    const inputFieldsDiv = document.getElementById('inputFields');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const figureImage = document.getElementById('figureImage');
    const infoBtn = document.getElementById('infoBtn');
    const authorModal = document.getElementById('authorModal');
    const closeModal = document.getElementById('closeModal');

    // Обработчик выбора фигуры
    figureTypeSelect.addEventListener('change', function() {
        const figureType = this.value;
        inputFieldsDiv.innerHTML = '';
        resultDiv.classList.remove('active');
        errorDiv.classList.remove('active');
        
        if (figureType && figures[figureType]) {
            const figure = figures[figureType];
            figureImage.textContent = figure.emoji;
            
            figure.inputs.forEach(input => {
                const div = document.createElement('div');
                div.className = 'form-group input-group active';
                div.innerHTML = `
                    <label for="${input.id}">${input.label}:</label>
                    <input type="number" id="${input.id}" step="0.01" placeholder="${input.placeholder}" required>
                `;
                inputFieldsDiv.appendChild(div);
            });
            
            calculateBtn.style.display = 'flex';
        } else {
            figureImage.textContent = '';
            calculateBtn.style.display = 'none';
        }
    });

    // Обработчик кнопки расчета
    calculateBtn.addEventListener('click', function() {
        const figureType = figureTypeSelect.value;
        if (!figureType) return;

        const figure = figures[figureType];
        const values = {};
        let hasError = false;

        errorDiv.classList.remove('active');
        
        figure.inputs.forEach(input => {
            const element = document.getElementById(input.id);
            const value = parseFloat(element.value);
            
            if (isNaN(value) || value <= 0) {
                hasError = true;
                element.style.borderColor = '#c33';
            } else {
                element.style.borderColor = '#e0e0e0';
                values[input.id] = value;
            }
        });

        if (hasError) {
            errorDiv.textContent = '⚠️ Пожалуйста, введите корректные положительные числа во все поля';
            errorDiv.classList.add('active');
            resultDiv.classList.remove('active');
            
            // Вибрация при ошибке (если поддерживается)
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            return;
        }

        const results = figure.calculate(values);
        
        resultDiv.innerHTML = `
            <h3>${figure.emoji} ${figure.name} <span class="dimension-type">${figure.dimension}</span></h3>
            ${Object.entries(results).map(([key, data]) => `
                <div class="result-item">
                    <span class="result-label">${key}:</span>
                    <span class="result-value">${data.value.toFixed(2)} ${data.unit}</span>
                </div>
            `).join('')}
        `;
        resultDiv.classList.add('active');
        
        // Вибрация при успешном расчете
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
    });

    // Сброс ошибок при вводе
    document.addEventListener('input', function(e) {
        if (e.target.type === 'number') {
            e.target.style.borderColor = '#e0e0e0';
            errorDiv.classList.remove('active');
        }
    });

    // Модальное окно с информацией об авторе
    infoBtn.addEventListener('click', function() {
        authorModal.classList.add('active');
    });

    closeModal.addEventListener('click', function() {
        authorModal.classList.remove('active');
    });

    // Закрытие по клику вне модального окна
    authorModal.addEventListener('click', function(e) {
        if (e.target === authorModal) {
            authorModal.classList.remove('active');
        }
    });

    console.log('Приложение GeoCalc инициализировано успешно');
}

// Запуск для браузерной отладки
if (!window.cordova) {
    console.log('Режим браузерной отладки');
    initApp();
}