let currentPage = 1;
const totalPages = 8;
let musicPlaying = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    createFloatingHearts();
    createMagicCursor();
    startTextTypewriter();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevPage();
        }
    });
});

// Music control
function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (musicPlaying) {
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicBtn.style.animationPlayState = 'paused';
        musicPlaying = false;
    } else {
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.style.animationPlayState = 'running';
        musicPlaying = true;
    }
}

// Magic cursor effect
function createMagicCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'magic-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Typewriter effect for specific text
function startTextTypewriter() {
    setTimeout(() => {
        const typewriterElements = document.querySelectorAll('.typewriter');
        typewriterElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'none';
                element.style.borderRight = 'none';
                element.style.whiteSpace = 'normal';
            }, 4000 + (index * 1000));
        });
    }, 100);
}

// Navigate to next page
function nextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

// Navigate to previous page
function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// Go to specific page
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    // Remove active class from current page
    const currentElement = document.querySelector(`.page:nth-child(${currentPage})`);
    if (currentElement) {
        currentElement.classList.remove('active');
        if (pageNumber > currentPage) {
            currentElement.classList.add('prev');
        } else {
            currentElement.classList.remove('prev');
        }
    }
    
    // Add active class to new page
    const newElement = document.querySelector(`.page:nth-child(${pageNumber})`);
    if (newElement) {
        setTimeout(() => {
            newElement.classList.add('active');
            newElement.classList.remove('prev');
        }, 100);
    }
    
    currentPage = pageNumber;
    updateNavigation();
    
    // Add entrance animations for specific elements
    setTimeout(() => {
        addPageAnimations(pageNumber);
    }, 300);
}

// Update navigation dots
function updateNavigation() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Add page-specific animations
function addPageAnimations(pageNumber) {
    const page = document.querySelector(`.page:nth-child(${pageNumber})`);
    if (!page) return;
    
    // Remove previous animations
    const animatedElements = page.querySelectorAll('.animate-in');
    animatedElements.forEach(el => el.classList.remove('animate-in'));
    
    // Add new animations
    setTimeout(() => {
        const elementsToAnimate = page.querySelectorAll('h1, h2, h3, p, .favorite-item, .message-card, .promise-item, .time-of-day');
        elementsToAnimate.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}

// Restart the journey
function restartJourney() {
    goToPage(1);
    
    // Create celebratory effect
    createCelebrationEffect();
    
    // Add special restart message
    showToast('🎉 เริ่มต้นใหม่! ยินดีต้อนรับกลับมา! 💕');
}

// Create surprise effect
function createSurprise() {
    // Create full screen overlay
    const overlay = document.createElement('div');
    overlay.className = 'surprise-overlay';
    overlay.innerHTML = `
        <div class="surprise-content">
            <h1 class="surprise-title">🎉 เซอร์ไพรส์พิเศษ! 🎉</h1>
            <div class="surprise-message">
                <p>🌟 โดนัทที่น่ารัก 🌟</p>
                <p>💖 ขอบคุณที่ให้เค้าได้รู้จักเธอ 💖</p>
                <p>✨ เธอคือความสุขในทุกๆ วัน ✨</p>
                <p>🌈 ขอให้มีความสุขตลอดไป! 🌈</p>
            </div>
            <button class="close-surprise" onclick="closeSurprise()">
                <i class="fas fa-heart"></i> ปิด
            </button>
        </div>
        <div class="fireworks">
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger animations
    setTimeout(() => {
        overlay.classList.add('show');
    }, 100);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        closeSurprise();
    }, 10000);
}

// Close surprise overlay
function closeSurprise() {
    const overlay = document.querySelector('.surprise-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    }
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    setInterval(() => {
        if (document.querySelectorAll('.floating-hearts .heart').length < 10) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 7000);
        }
    }, 2000);
}

// Create celebration effect
function createCelebrationEffect() {
    const colors = ['#ff6b6b', '#ee5a24', '#ffd700', '#ff79c6', '#50fa7b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50);
    }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }
    
    /* Additional hover effects */
    .heart-animation:hover {
        animation-duration: 0.5s;
    }
    
    .cake-animation:hover {
        animation-duration: 0.8s;
    }
    
    .big-heart:hover {
        animation-duration: 0.8s;
    }
    
    .promise-ring:hover {
        animation-duration: 1s;
    }
    
    .wish-sparkle:hover {
        animation-duration: 0.8s;
    }
    
    /* Mobile swipe support */
    @media (max-width: 768px) {
        .container {
            touch-action: pan-y;
        }
    }
`;
document.head.appendChild(style);

// Add touch/swipe support for mobile
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe left - next page
            nextPage();
        } else {
            // Swipe right - previous page
            prevPage();
        }
    }
    
    startX = 0;
    startY = 0;
});

// Add particle effects on button hover
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.next-btn, .restart-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createButtonParticles(this);
        });
    });
});

function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const colors = ['#ff6b6b', '#ee5a24', '#ffd700'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + Math.random() * rect.height + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.zIndex = '9999';
            particle.style.pointerEvents = 'none';
            particle.style.animation = 'particleFloat 1s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }, i * 50);
    }
}

// Add particle float animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);
