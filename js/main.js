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
