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

const messages = [
    "Может всё-таки да? Котик так ждет… 🥺",
    "Ты точно уверена? Котик очень грустит… 😿",
    "Последний раз спрашиваю… Пожалуйста? 💕",
    "Ну пожалуйста-пожалуйста? Я приготовил тебе сюрприз… ✨",
    "Хорошо… А если я скажу, что без тебя этот день не будет таким волшебным? 🥹"
];

// Открытие модалки только при нажатии "Нет" в главной карточке
function openModal() {
    refusalCount = 0;
    modalText.textContent = messages[0];
    modal.classList.add('show');
}

// Закрытие модалки
function closeModal() {
    modal.classList.remove('show');
}

// Показ финального радостного сообщения
function showSuccessMessage() {
    closeModal();
    createConfetti();
    const final = document.createElement('div');
    final.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 55px 75px; border-radius: 40px;
        font-size: 36px; text-align: center; max-width: 640px; z-index: 10000;
        box-shadow: 0 40px 90px rgba(255,107,157,0.5); border: 14px solid #ff6b9d;
        font-family: 'Comic Neue', cursive; line-height: 1.4;
    `;
    final.textContent = "УРААА! Ты согласилась! 💖🐱 Я самый счастливый котик на свете!";
    document.body.appendChild(final);

    setTimeout(() => {
        final.style.transition = 'all 1.2s';
        final.style.opacity = '0';
        final.style.transform = 'translate(-50%, -70%) scale(0.9)';
        setTimeout(() => final.remove(), 1200);
    }, 5500);
}

// Показ грустного сообщения
function showSadMessage() {
    closeModal();
    const sad = document.createElement('div');
    sad.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 50px 70px; border-radius: 40px;
        font-size: 32px; text-align: center; max-width: 600px; z-index: 10000;
        box-shadow: 0 30px 70px rgba(0,0,0,0.3); border: 12px solid #ff9eb7;
        font-family: 'Comic Neue', cursive;
    `;
    sad.textContent = "😿 Котик совсем расстроился… Может в следующий раз ты скажешь «да»?";
    document.body.appendChild(sad);

    setTimeout(() => {
        sad.style.transition = 'all 1s';
        sad.style.opacity = '0';
        sad.style.transform = 'translate(-50%, -65%)';
        setTimeout(() => sad.remove(), 1000);
    }, 5000);
}

// === Обработчики ===

// Кнопка "Да" в главной карточке → сразу радость
yesBtn.addEventListener('click', () => {
    showSuccessMessage();
});

// Кнопка "Нет" в главной карточке → открываем цепочку вопросов
noBtn.addEventListener('click', openModal);

// Кнопка "Да" в модалке → радость
modalYes.addEventListener('click', showSuccessMessage);

// Кнопка "Нет" в модалке → следующий вопрос или грусть
modalNo.addEventListener('click', () => {
    refusalCount++;

    if (refusalCount >= messages.length) {
        showSadMessage();
    } else {
        modalText.textContent = messages[refusalCount];
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

        const duration = 2500 + Math.random() * 4000;
        document.body.appendChild(c);

        setTimeout(() => {
            c.style.transition = `all ${duration}ms linear`;
            c.style.transform = `translateY(${window.innerHeight + 150}px) rotate(${Math.random()*900 - 300}deg)`;
            c.style.opacity = '0';
        }, 30);

        setTimeout(() => c.remove(), duration + 200);
    }
}

console.log('%c🐱 Логика кнопок исправлена! Теперь всё работает правильно.', 'color:#ff6b9d;font-size:18px;');