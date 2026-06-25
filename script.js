// ============ LOADING SCREEN ============
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const passwordScreen = document.getElementById('passwordScreen');
        
        loadingScreen.classList.add('hidden');
        passwordScreen.classList.remove('hidden');
        
        // Initialize particles after loading
        createFloatingParticles();
    }, 2500);
});

// ============ PASSWORD PROTECTION ============
const CORRECT_PASSWORD = '1234';
const passwordInput = document.getElementById('passwordInput');
const passwordBtn = document.getElementById('passwordBtn');
const passwordError = document.getElementById('passwordError');
const passwordScreen = document.getElementById('passwordScreen');
const mainContent = document.getElementById('mainContent');

passwordBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
    const inputPassword = passwordInput.value;
    
    if (inputPassword === CORRECT_PASSWORD) {
        passwordError.classList.add('hidden');
        passwordScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Initialize countdown
        startCountdown();
    } else {
        passwordError.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Shake animation
        setTimeout(() => {
            passwordError.classList.add('hidden');
        }, 2000);
    }
}

// ============ COUNTDOWN TIMER ============
function startCountdown() {
    // Set your birthday date here (YYYY-MM-DD)
    const birthdayDate = new Date('2025-12-25T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = birthdayDate - now;
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // Show celebration message when countdown reaches 0
        if (timeLeft <= 0) {
            document.getElementById('celebrationMsg').style.display = 'block';
            clearInterval(countdownInterval);
            triggerConfetti();
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// ============ FLOATING PARTICLES ============
function createFloatingParticles() {
    const container = document.getElementById('particleContainer');
    const particleCount = window.innerWidth > 768 ? 30 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
        particle.style.fontSize = Math.random() * 15 + 10 + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float-particle ${Math.random() * 4 + 3}s linear infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
    }
    
    // Add CSS animation for particles
    if (!document.getElementById('particleAnimation')) {
        const style = document.createElement('style');
        style.id = 'particleAnimation';
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============ NAVIGATION ============
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sectionId = btn.getAttribute('data-section');
        
        // Remove active class from all buttons and sections
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked button and corresponding section
        btn.classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    });
});

// ============ MUSIC PLAYER ============
const playMusicBtn = document.getElementById('playMusicBtn');
const bgMusic = document.getElementById('bgMusic');
const musicText = document.getElementById('musicText');
let isPlaying = false;

playMusicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicText.textContent = 'Play Music';
        playMusicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.play().catch(err => {
            console.log('Audio playback failed:', err);
            alert('Please enable audio autoplay or click to play music manually.');
        });
        musicText.textContent = 'Stop Music';
        playMusicBtn.classList.add('playing');
        isPlaying = true;
    }
});

// ============ DOWNLOAD LETTER ============
const downloadBtn = document.getElementById('downloadLetter');

downloadBtn.addEventListener('click', () => {
    const letterContent = `
DEAR TEACHER,

On your special day, I want to take a moment to express my deepest gratitude for everything you do. You are not just a teacher, but a mentor, guide, and inspiration to all of us.

Your dedication, passion, and commitment to education have made a real difference in our lives. You take the time to understand each student, encourage their potential, and help them grow both academically and personally.

The lessons you teach go far beyond the classroom. You inspire us to be better, to work harder, and to believe in ourselves. Your kindness and patience have touched so many hearts.

On this special occasion, I wish for you:
✨ A year filled with joy and fulfillment
🌟 The recognition you truly deserve
💪 Strength and health for all your endeavors
🎂 Moments of happiness and celebration
🌹 Peace and contentment in all you do
💫 Success in all your future pursuits

Thank you for being an exceptional teacher and for making a positive impact on my life. Your influence will stay with me forever.

Happy Birthday! You deserve all the best! 🎂

With deep respect and gratitude,
Your Student 💚
`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(letterContent));
    element.setAttribute('download', 'Birthday_Letter_for_Teacher.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

// ============ CONFETTI EFFECT ============
function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '3000';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const confetti = [];
    
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: Math.random() * 8 - 4,
            vy: Math.random() * 8 + 8,
            angle: Math.random() * Math.PI * 2,
            size: Math.random() * 8 + 4,
            color: ['#FF1744', '#FFB6C1', '#FF69B4', '#C41E3A'][Math.floor(Math.random() * 4)],
            emoji: ['❤️', '🎉', '🎂', '✨'][Math.floor(Math.random() * 4)]
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let activeConfetti = false;
        
        confetti.forEach((item, index) => {
            item.y += item.vy;
            item.x += item.vx;
            item.vy += 0.1; // Gravity
            item.angle += 0.05;
            
            if (item.y < canvas.height) {
                if (item.emoji) {
                    ctx.save();
                    ctx.font = `${item.size * 2}px Arial`;
                    ctx.globalAlpha = Math.max(0, 1 - (item.y / canvas.height));
                    ctx.translate(item.x, item.y);
                    ctx.rotate(item.angle);
                    ctx.fillText(item.emoji, 0, 0);
                    ctx.restore();
                } else {
                    ctx.fillStyle = item.color;
                    ctx.globalAlpha = Math.max(0, 1 - (item.y / canvas.height));
                    ctx.fillRect(item.x, item.y, item.size, item.size);
                }
                activeConfetti = true;
            }
        });
        
        if (activeConfetti) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(canvas);
        }
    }
    
    animate();
}

// ============ RESPONSIVE PARTICLES ============
window.addEventListener('resize', () => {
    // Adjust particles on resize if needed
    if (window.innerWidth <= 480) {
        const particles = document.querySelectorAll('.particle');
        if (particles.length > 15) {
            for (let i = 15; i < particles.length; i++) {
                particles[i].remove();
            }
        }
    }
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});