// === Глаза котёнка ===
const kitten = document.getElementById('kitten');
const leftPupil = document.getElementById('left-pupil');
const rightPupil = document.getElementById('right-pupil');

function updateEyes(e) {
    const rect = kitten.getBoundingClientRect();
    const scaleX = 340 / rect.width;
    const scaleY = 340 / rect.height;

    let dx = (e.clientX - rect.left) * scaleX - 120;
    let dy = (e.clientY - rect.top) * scaleY - 165;
    let dist = Math.hypot(dx, dy);
    if (dist > 0) {
        leftPupil.setAttribute('cx', 120 + (dx / dist) * 13);
        leftPupil.setAttribute('cy', 165 + (dy / dist) * 13);
    }

    dx = (e.clientX - rect.left) * scaleX - 220;
    dy = (e.clientY - rect.top) * scaleY - 165;
    dist = Math.hypot(dx, dy);
    if (dist > 0) {
        rightPupil.setAttribute('cx', 220 + (dx / dist) * 13);
        rightPupil.setAttribute('cy', 165 + (dy / dist) * 13);
    }
}

document.addEventListener('mousemove', updateEyes);

// === Элементы ===
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalYes = document.getElementById('modal-yes');
const modalNo = document.getElementById('modal-no');

let refusalCount = 0;

// Новый позитивный сценарий отказов
const refusalMessages = [
    "Может всё-таки да? Котик так старался… 🥺",
    "Ну пожалуйста, ну очень прошу… 💕",
    "А если я скажу, что уже купил мороженое? 🍦",
    "Последний шанс сказать «да»… или я начну мурлыкать! 😻",
    "Ладно… а если мы всё равно пойдём? 😉"
];

const finalPositiveMessage = "Отлично! Значит, мы всё равно идём на свидание! 🐱💖\nЯ знал, что ты не устоишь!";

// Открытие модалки при нажатии «Нет»
function openModal() {
    refusalCount = 0;
    modalText.textContent = refusalMessages[0];
    modal.classList.add('show');
}

// Финальное радостное сообщение (всегда позитивное)
function showFinalHappyMessage() {
    closeModal();
    createConfetti();

    const final = document.createElement('div');
    final.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 60px 80px; border-radius: 40px;
        font-size: 34px; text-align: center; max-width: 660px; z-index: 10000;
        box-shadow: 0 40px 90px rgba(255,107,157,0.5); border: 14px solid #ff6b9d;
        font-family: 'Comic Neue', cursive; line-height: 1.45;
        white-space: pre-line;
    `;
    final.textContent = finalPositiveMessage;
    document.body.appendChild(final);

    setTimeout(() => {
        final.style.transition = 'all 1.2s';
        final.style.opacity = '0';
        final.style.transform = 'translate(-50%, -70%) scale(0.9)';
        setTimeout(() => final.remove(), 1400);
    }, 6000);
}

// Закрытие модалки
function closeModal() {
    modal.classList.remove('show');
}

// === Обработчики ===

// Главная кнопка "Да" → сразу счастье
yesBtn.addEventListener('click', showFinalHappyMessage);

// Главная кнопка "Нет" → начинаем цепочку
noBtn.addEventListener('click', openModal);

// В модалке "Да" → сразу праздник
modalYes.addEventListener('click', showFinalHappyMessage);

// В модалке "Нет" → следующий вопрос
modalNo.addEventListener('click', () => {
    refusalCount++;

    if (refusalCount >= refusalMessages.length) {
        // Последний отказ всё равно заканчивается позитивно
        showFinalHappyMessage();
    } else {
        modalText.textContent = refusalMessages[refusalCount];
    }
});

// Конфетти
function createConfetti() {
    for (let i = 0; i < 110; i++) {
        const c = document.createElement('div');
        const colors = ['#ff6b9d', '#ff9eb7', '#ff4d8c', '#ffb6c1'];
        c.style.position = 'fixed';
        c.style.zIndex = '10001';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-50px';
        c.style.width = (10 + Math.random() * 16) + 'px';
        c.style.height = c.style.width;
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.borderRadius = Math.random() > 0.6 ? '50%' : '4px';

        if (Math.random() > 0.65) {
            c.textContent = '💕';
            c.style.fontSize = '26px';
            c.style.background = 'transparent';
        }

        const duration = 2800 + Math.random() * 3500;
        document.body.appendChild(c);

        setTimeout(() => {
            c.style.transition = `all ${duration}ms linear`;
            c.style.transform = `translateY(${window.innerHeight + 200}px) rotate(${Math.random() * 800 - 200}deg)`;
            c.style.opacity = '0';
        }, 50);

        setTimeout(() => c.remove(), duration + 300);
    }
}

console.log('%c🐱 Сценарий отказов обновлён! Теперь всегда позитивный финал 💕', 'color:#ff6b9d;font-size:18px;');