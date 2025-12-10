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

    // mailto автоматически определяет:
    // - Gmail (если стоит по умолчанию)
    // - Outlook
    // - Thunderbird
    // - Apple Mail
    // - Почта Windows
    // - Mail.ru / Yandex клиент
    // И открывает тот, что используется у пользователя.

    const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    // Перенаправление на почтовый клиент
    window.location.href = mailtoLink;
});
