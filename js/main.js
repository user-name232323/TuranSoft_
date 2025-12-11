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
// ИНИЦИАЛИЗАЦИЯ КАРТЫ LEAFLET
// =====================
document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map");

    if (!mapContainer) {
        console.warn("Контейнер карты с id 'map' не найден.");
        return;
    }

    // Проверяем, подключена ли библиотека Leaflet
    if (typeof L === "undefined") {
        console.error("Leaflet не загружен. Проверьте подключение скриптов Leaflet.");
        return;
    }

    const lat = 51.1290;
    const lon = 71.4305;

    try {
        const map = L.map("map").setView([lat, lon], 16);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([lat, lon])
            .addTo(map)
            .bindPopup(
                "<b>Адрес:</b><br>г. Астана, район Есиль,<br>ул. Букар Жырау, зд. 36А, кв. 90"
            )
            .openPopup();
    } catch (error) {
        console.error("Ошибка при инициализации карты Leaflet:", error);
    }
});

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
