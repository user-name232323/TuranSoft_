// =====================
// ПЛАВНАЯ ПРОКРУТКА
// =====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// =============================
// ОТПРАВКА ПИСЬМА ЧЕРЕЗ КЛИЕНТ
// =============================
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const toEmail = "info@turan-soft.com";

    const subject = encodeURIComponent("Сообщение с сайта от " + name);
    const body = encodeURIComponent(
        "Имя: " + name + "\n" +
        "Email отправителя: " + email + "\n\n" +
        "Сообщение:\n" + message
    );

    const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
});

// =====================
// ИНИЦИАЛИЗАЦИЯ КАРТЫ LEAFLET
// =====================
document.addEventListener("DOMContentLoaded", function () {
    const lat = 51.1290;
    const lon = 71.4305;

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
});
