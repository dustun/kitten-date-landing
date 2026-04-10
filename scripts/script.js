// Глаза котёнка
const kitten = document.getElementById('kitten');
const leftPupil = document.getElementById('left-pupil');
const rightPupil = document.getElementById('right-pupil');

const leftEyeCX = 120, leftEyeCY = 165;
const rightEyeCX = 220, rightEyeCY = 165;
const maxOffset = 13;

function updateEyes(e) {
    const rect = kitten.getBoundingClientRect();
    const scaleX = 340 / rect.width;
    const scaleY = 340 / rect.height;

    let dx = (e.clientX - rect.left) * scaleX - leftEyeCX;
    let dy = (e.clientY - rect.top) * scaleY - leftEyeCY;
    let dist = Math.hypot(dx, dy);
    if (dist > 0) {
        leftPupil.setAttribute('cx', leftEyeCX + (dx / dist) * maxOffset);
        leftPupil.setAttribute('cy', leftEyeCY + (dy / dist) * maxOffset);
    }

    dx = (e.clientX - rect.left) * scaleX - rightEyeCX;
    dy = (e.clientY - rect.top) * scaleY - rightEyeCY;
    dist = Math.hypot(dx, dy);
    if (dist > 0) {
        rightPupil.setAttribute('cx', rightEyeCX + (dx / dist) * maxOffset);
        rightPupil.setAttribute('cy', rightEyeCY + (dy / dist) * maxOffset);
    }
}

document.addEventListener('mousemove', updateEyes);

// Элементы
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

// Нажатие на кнопку "Да" в главной карточке
yesBtn.addEventListener('click', () => {
    createConfetti();
    showFinalMessage("УРААА! Я так счастлив! 💖🐱 Давай скорее планировать наше свидание!");
});

// Нажатие на кнопку "Нет" в главной карточке
noBtn.addEventListener('click', () => {
    refusalCount = 0;
    showModal();
});

// Показ модального окна
function showModal() {
    if (refusalCount >= messages.length) {
        showFinalMessage("😿 Котик совсем расстроился… Может в другой раз ты будешь добрее к нам?");
        return;
    }

    modalText.textContent = messages[refusalCount];
    modal.style.display = 'flex';
}

// Кнопка "Да" в модалке
modalYes.addEventListener('click', () => {
    modal.style.display = 'none';
    createConfetti();
    showFinalMessage("УРААА! Ты согласилась! 💖🐱 Я самый счастливый котик на свете!");
});

// Кнопка "Нет" в модалке
modalNo.addEventListener('click', () => {
    refusalCount++;
    modal.style.display = 'none';

    // Небольшая задержка перед следующим вопросом
    setTimeout(() => {
        showModal();
    }, 400);
});

// Финальное сообщение
function showFinalMessage(text) {
    const finalMsg = document.createElement('div');
    finalMsg.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 50px 70px; border-radius: 40px;
        font-size: 32px; text-align: center; max-width: 600px; z-index: 200;
        box-shadow: 0 30px 70px rgba(255,107,157,0.5); border: 12px solid #ff6b9d;
        font-family: 'Comic Neue', cursive; line-height: 1.4;
    `;
    finalMsg.textContent = text;
    document.body.appendChild(finalMsg);

    // Автоматически убираем через 6 секунд
    setTimeout(() => {
        finalMsg.style.transition = 'all 1s';
        finalMsg.style.opacity = '0';
        finalMsg.style.transform = 'translate(-50%, -70%) scale(0.9)';
        setTimeout(() => finalMsg.remove(), 1000);
    }, 6000);
}

// Конфетти
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const c = document.createElement('div');
        c.classList.add('confetti');
        const colors = ['#ff6b9d', '#ff9eb7', '#ff4d8c', '#ffb6c1'];
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-40px';
        c.style.width = (10 + Math.random() * 14) + 'px';
        c.style.height = c.style.width;

        if (Math.random() > 0.7) {
            c.textContent = '💕';
            c.style.fontSize = '22px';
            c.style.background = 'transparent';
        } else {
            c.style.borderRadius = '50%';
        }

        const duration = 2500 + Math.random() * 3500;
        c.style.animationDuration = duration + 'ms';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), duration);
    }
}

// Закрытие модалки при клике вне окна (по желанию)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

console.log('%c🐱 Лендинг с последовательными вопросами готов!', 'color:#ff6b9d;font-size:18px;font-family:Comic Neue');