// =====================
// ПЛАВНАЯ ПРОКРУТКА
// =====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        } else {
            console.warn(`Плавная прокрутка: элемент с id '${targetId}' не найден.`);
        }
    });
});

// =============================
// ОТПРАВКА ПИСЬМА ЧЕРЕЗ КЛИЕНТ
// =============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const messageInput = document.getElementById("message");

        if (!nameInput || !messageInput) {
            console.error("Форма: не найдены обязательные поля name или message.");
            alert("Ошибка: форма некорректна. Попробуйте обновить страницу.");
            return;
        }

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !message) {
            alert("Пожалуйста, заполните все поля формы.");
            return;
        }

        const toEmail = "dimacri558@gmail.com";

        const subject = encodeURIComponent("Сообщение с сайта от " + name);
        const body = encodeURIComponent(
            "Имя: " + name + "\n" +
            "Сообщение:\n" + message
        );

        const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;
    });
} else {
    console.warn("Форма контактов с id 'contactForm' не найдена на странице.");
}

// =====================
// АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));
});

// =====================
// ФИЛЬТР УСЛУГ
// =====================
document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    
    // Проверяем, есть ли элементы фильтра на странице
    if (filterButtons.length === 0 || cards.length === 0) {
        console.log("Фильтр услуг: элементы не найдены, пропускаем инициализацию.");
        return;
    }
    
    // Создаем и добавляем счётчик найденных услуг
    const filterButtonsContainer = document.querySelector('.filter-buttons');
    if (filterButtonsContainer) {
        const counter = document.createElement('div');
        counter.className = 'filter-counter';
        filterButtonsContainer.parentNode.insertBefore(counter, filterButtonsContainer.nextSibling);
    }
    
    // Функция обновления счётчика
    function updateCounter(filter) {
        const counter = document.querySelector('.filter-counter');
        if (!counter) return;
        
        let visibleCount;
        
        if (filter === 'all') {
            visibleCount = cards.length;
        } else {
            visibleCount = document.querySelectorAll(`.card[data-category="${filter}"]:not(.hidden)`).length;
        }
        
    }
    
    // Функция для перекомпоновки карточек рядом друг с другом
    function rearrangeCards() {
        const visibleCards = Array.from(cards).filter(card => !card.classList.contains('hidden'));
        const hiddenCards = Array.from(cards).filter(card => card.classList.contains('hidden'));
        
        // Находим контейнер карточек
        const cardsContainer = document.querySelector('.cards');
        if (!cardsContainer) return;
        
        // Очищаем контейнер
        cardsContainer.innerHTML = '';
        
        // Сначала добавляем все видимые карточки
        visibleCards.forEach(card => {
            cardsContainer.appendChild(card);
        });
        
        // Затем добавляем скрытые карточки (они будут в конце, но невидимы)
        hiddenCards.forEach(card => {
            cardsContainer.appendChild(card);
        });
    }
    
    // Улучшенная функция фильтрации с перекомпоновкой
    function filterCards(filter) {
        let delay = 0;
        let hasChanges = false;
        
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                if (card.classList.contains('hidden')) {
                    // Карточка была скрыта, теперь показываем
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, delay);
                    delay += 100; // Задержка для каскадного эффекта
                    hasChanges = true;
                }
            } else {
                if (!card.classList.contains('hidden')) {
                    // Карточка была видима, теперь скрываем
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    hasChanges = true;
                }
            }
        });
        
        // Если были изменения, перекомпоновываем карточки
        if (hasChanges) {
            setTimeout(() => {
                rearrangeCards();
            }, delay + 100);
        }
        
        updateCounter(filter);
    }
    
    // Обработчик клика по кнопкам фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            
            // Получаем фильтр из data-атрибута
            const filter = this.getAttribute('data-filter');
            
            // Фильтруем карточки
            filterCards(filter);
            
            // Плавная прокрутка к началу секции на мобильных
            if (window.innerWidth < 768) {
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Инициализируем счётчик при загрузке
    updateCounter('all');
    
    // Добавляем кнопку сброса фильтра (опционально)
    const resetBtn = document.querySelector('#reset-filter');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
            filterCards('all');
        });
    }
});