// Глаза котёнка (оставил без изменений)
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

// Кнопки
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const card = document.querySelector('.card');

// === Улучшенная логика убегания кнопки "Нет" ===
function moveNoButton() {
    if (!card || !noBtn) return;

    // Делаем кнопку абсолютно позиционированной внутри карточки
    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }

    const cardRect = card.getBoundingClientRect();
    const btnW = noBtn.offsetWidth || 240;
    const btnH = noBtn.offsetHeight || 70;
    const padding = 50;

    const maxX = cardRect.width - btnW - padding * 2;
    const maxY = cardRect.height - btnH - padding * 2;

    const newX = padding + Math.random() * Math.max(10, maxX);
    const newY = padding + Math.random() * Math.max(10, maxY);

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.transform = 'scale(1.12) rotate(8deg)';

    setTimeout(() => {
        noBtn.style.transform = 'scale(1) rotate(0deg)';
    }, 220);
}

// Убегает при приближении курсора
document.addEventListener('mousemove', (e) => {
    if (!noBtn || noBtn.style.position !== 'absolute') return;

    const rect = noBtn.getBoundingClientRect();
    const dist = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );

    if (dist < 170) {
        moveNoButton();
    }
});

// Убегает при наведении и попытке нажать
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Кнопка "Да"
yesBtn.addEventListener('click', () => {
    createConfetti();

    const msg = document.createElement('div');
    msg.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        font-size:68px;z-index:1000;color:#ff4d8c;text-shadow:0 0 25px #fff;
        pointer-events:none;font-family:'Comic Neue',cursive;`;
    msg.textContent = 'УРААА! 💖🐱';
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.style.transition = 'all 1.2s';
        msg.style.opacity = '0';
        msg.style.transform = 'translate(-50%, -90%) scale(1.6)';
        setTimeout(() => msg.remove(), 1300);
    }, 1600);
});

// Конфетти
function createConfetti() {
    for (let i = 0; i < 90; i++) {
        const c = document.createElement('div');
        c.classList.add('confetti');

        const colors = ['#ff6b9d', '#ff9eb7', '#ff4d8c', '#ffb6c1'];
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-30px';
        c.style.width = (8 + Math.random() * 12) + 'px';
        c.style.height = c.style.width;

        if (Math.random() > 0.65) {
            c.textContent = '💕';
            c.style.fontSize = '20px';
            c.style.background = 'transparent';
        } else {
            c.style.borderRadius = '50%';
        }

        const duration = 2800 + Math.random() * 3200;
        c.style.animationDuration = duration + 'ms';
        c.style.animationTimingFunction = 'linear';

        document.body.appendChild(c);
        setTimeout(() => c.remove(), duration + 100);
    }
}

console.log('%c🐱 Более красивый и романтичный лендинг готов! Кнопка "Нет" теперь почти непобедима 💕', 'color:#ff6b9d;font-size:17px;font-family:Comic Neue');