let currentPage = 1;
const totalPages = 10;
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
    const currentElement = document.getElementById(`page${currentPage}`);
    if (currentElement) {
        currentElement.classList.remove('active');
        if (pageNumber > currentPage) {
            currentElement.classList.add('prev');
        } else {
            currentElement.classList.remove('prev');
        }
    }
    
    // Add active class to new page
    const newElement = document.getElementById(`page${pageNumber}`);
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
        
        // Special animation for gallery page
        if (pageNumber === 9) {
            initializeGalleryAnimations();
        }
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
    const page = document.getElementById(`page${pageNumber}`);
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

// Gallery Variables
let galleryImages = [
    'images/GLR/PP (1).jpg',
    'images/GLR/PP (2).jpg',
    'images/GLR/PP (3).jpg',
    'images/GLR/PP (4).jpg',
    'images/GLR/PP (5).jpg',
    'images/GLR/PP (6).jpg',
    'images/GLR/PP (7).jpg',
    'images/GLR/PP (8).jpg',
    'images/GLR/PP (9).jpg',
    'images/GLR/PP (10).jpg'
];

let currentImageIndex = 0;
let slideshowInterval = null;
let currentZoom = 1;
let currentFilter = 'none';
let currentLayout = 'grid';
let currentGalleryMode = '3d';
let carousel3DRotation = 0;
let autoRotate3D = false;
let autoRotateInterval = null;
let infiniteSpeed = 'normal';
let infiniteDirection = 1;
let morphingIndex = 0;
let morphingInterval = null;

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

function initializeGallery() {
    // Initialize default 3D carousel mode
    switchGalleryMode('3d');
    
    // Add keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('lightboxModal').style.display === 'block') {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevImage();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeLightbox();
            }
        }
    });
}

// Lightbox Functions
function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = galleryImages[index];
    counter.textContent = `${index + 1} / ${galleryImages.length}`;
    
    modal.style.display = 'block';
    resetZoom();
    
    // Add smooth entrance animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = galleryImages[currentImageIndex];
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        resetZoom();
        
        setTimeout(() => {
            lightboxImage.style.opacity = '1';
        }, 100);
    }, 150);
}

// Zoom Functions
function zoomIn() {
    currentZoom += 0.25;
    if (currentZoom > 3) currentZoom = 3;
    applyZoom();
}

function zoomOut() {
    currentZoom -= 0.25;
    if (currentZoom < 0.5) currentZoom = 0.5;
    applyZoom();
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}

function applyZoom() {
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.style.transform = `scale(${currentZoom})`;
}

// Gallery Control Functions - Legacy (keeping for compatibility)
function toggleSlideshow() {
    // Legacy function - switch to normal mode first
    switchGalleryMode('normal');
}

function toggleLayout() {
    // Legacy function - switch to normal mode first
    switchGalleryMode('normal');
}

function applyFilter() {
    // Legacy function - switch to normal mode first  
    switchGalleryMode('normal');
}

function shuffleGallery() {
    // Enhanced shuffle that works with current mode
    if (currentGalleryMode === '3d') {
        // Shuffle carousel rotation
        carousel3DRotation = Math.random() * 360;
        const carousel = document.getElementById('carousel3d');
        if (carousel) {
            carousel.style.transform = `translate(-50%, -50%) rotateX(-10deg) rotateY(${carousel3DRotation}deg)`;
        }
    } else {
        // Switch to normal mode for traditional shuffle
        switchGalleryMode('normal');
    }
}

// Add shuffle animation
const shuffleStyle = document.createElement('style');
shuffleStyle.textContent = `
    @keyframes shuffleIn {
        0% {
            opacity: 0;
            transform: translateY(30px) rotateX(90deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
    }
`;
document.head.appendChild(shuffleStyle);

// Gallery page entrance animations
function initializeGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const controls = document.querySelectorAll('.control-btn');
    
    // Animate gallery items with stagger effect
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) rotateX(30deg)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) rotateX(0)';
        }, index * 100);
    });
    
    // Animate control buttons
    controls.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Add floating animation to some items
    setTimeout(() => {
        galleryItems.forEach((item, index) => {
            if (index % 3 === 0) {
                item.style.animation = 'float 6s ease-in-out infinite';
                item.style.animationDelay = `${index * 0.5}s`;
            }
        });
    }, 1000);
}

// Add floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        33% {
            transform: translateY(-10px) rotate(1deg);
        }
        66% {
            transform: translateY(-5px) rotate(-1deg);
        }
    }
`;
document.head.appendChild(floatStyle);

// New Gallery Mode Functions
function switchGalleryMode(mode) {
    // Clear all intervals
    clearInterval(autoRotateInterval);
    clearInterval(morphingInterval);
    
    // Hide all gallery modes
    document.querySelectorAll('.gallery-mode').forEach(gallery => {
        gallery.style.display = 'none';
        gallery.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.gallery-controls .control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected mode
    const targetGallery = document.getElementById(mode + 'Gallery');
    const targetButton = document.getElementById(mode + 'Btn');
    
    if (targetGallery && targetButton) {
        targetGallery.style.display = 'block';
        targetGallery.classList.add('active');
        targetButton.classList.add('active');
        currentGalleryMode = mode;
        
        // Initialize specific mode
        switch(mode) {
            case '3d':
                init3DCarousel();
                break;
            case 'infinite':
                initInfiniteGallery();
                break;
            case 'parallax':
                initParallaxGallery();
                break;
            case 'morphing':
                initMorphingGallery();
                break;
            case 'normal':
                initNormalGallery();
                break;
        }
    }
}

// 3D Carousel Functions
function init3DCarousel() {
    const carousel = document.getElementById('carousel3d');
    if (carousel) {
        carousel.style.transform = `translate(-50%, -50%) rotateX(-10deg) rotateY(${carousel3DRotation}deg)`;
        
        // Add click events to carousel items
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });
    }
}

function rotate3DCarousel(direction) {
    const step = 36; // 360 / 10 images
    
    if (direction === 'next') {
        carousel3DRotation -= step;
    } else {
        carousel3DRotation += step;
    }
    
    const carousel = document.getElementById('carousel3d');
    if (carousel) {
        carousel.style.transform = `translate(-50%, -50%) rotateX(-10deg) rotateY(${carousel3DRotation}deg)`;
    }
}

function toggle3DAutoRotate() {
    if (autoRotate3D) {
        clearInterval(autoRotateInterval);
        autoRotate3D = false;
    } else {
        autoRotateInterval = setInterval(() => {
            rotate3DCarousel('next');
        }, 2000);
        autoRotate3D = true;
    }
}

// Infinite Scroll Functions
function initInfiniteGallery() {
    const track = document.getElementById('infiniteTrack');
    if (track) {
        track.style.animationDuration = getInfiniteSpeed();
        track.style.animationDirection = infiniteDirection === 1 ? 'normal' : 'reverse';
        
        // Add click events
        const items = track.querySelectorAll('.infinite-item');
        items.forEach((item, index) => {
            if (index < 10) { // Only first 10 items (not duplicates)
                item.addEventListener('click', () => openLightbox(index));
            }
        });
    }
}

function changeInfiniteSpeed(speed) {
    infiniteSpeed = speed;
    const track = document.getElementById('infiniteTrack');
    
    // Remove active class from all speed buttons
    document.querySelectorAll('.infinite-controls button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    event.target.classList.add('active');
    
    if (track) {
        track.style.animationDuration = getInfiniteSpeed();
    }
}

function getInfiniteSpeed() {
    switch(infiniteSpeed) {
        case 'slow': return '60s';
        case 'fast': return '15s';
        default: return '30s';
    }
}

function changeInfiniteDirection() {
    infiniteDirection *= -1;
    const track = document.getElementById('infiniteTrack');
    if (track) {
        track.style.animationDirection = infiniteDirection === 1 ? 'normal' : 'reverse';
    }
}

// Parallax Functions
function initParallaxGallery() {
    const layer1Items = document.querySelectorAll('.layer-1 .parallax-item');
    const layer2Items = document.querySelectorAll('.layer-2 .parallax-item');
    
    layer1Items.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index * 2));
    });
    
    layer2Items.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index * 2 + 1));
    });
}

// Morphing Gallery Functions
function initMorphingGallery() {
    startMorphingAnimation();
    
    const items = document.querySelectorAll('.morphing-item');
    items.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

function startMorphingAnimation() {
    const items = document.querySelectorAll('.morphing-item');
    
    morphingInterval = setInterval(() => {
        items.forEach(item => item.classList.remove('active'));
        
        morphingIndex = (morphingIndex + 1) % items.length;
        items[morphingIndex].classList.add('active');
    }, 3000);
}

function changeMorphingShape(shape) {
    const container = document.getElementById('morphingGalleryContainer');
    if (container) {
        // Remove all shape classes
        container.classList.remove('shape-circle', 'shape-heart', 'shape-star', 'shape-diamond');
        
        // Add new shape class
        container.classList.add(`shape-${shape}`);
        
        // Update all morphing items
        const items = container.querySelectorAll('.morphing-item');
        items.forEach(item => {
            item.classList.remove('shape-circle', 'shape-heart', 'shape-star', 'shape-diamond');
            item.classList.add(`shape-${shape}`);
        });
    }
}

// Normal Gallery Functions
function initNormalGallery() {
    const items = document.querySelectorAll('#normalGallery .gallery-item');
    items.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

// Enhanced Gallery Entrance Animations
function initializeGalleryAnimations() {
    setTimeout(() => {
        switch(currentGalleryMode) {
            case '3d':
                animate3DCarousel();
                break;
            case 'infinite':
                animateInfiniteGallery();
                break;
            case 'parallax':
                animateParallaxGallery();
                break;
            case 'morphing':
                animateMorphingGallery();
                break;
            default:
                animateNormalGallery();
                break;
        }
    }, 300);
}

function animate3DCarousel() {
    const carousel = document.getElementById('carousel3d');
    const controls = document.querySelectorAll('.carousel-controls button');
    
    if (carousel) {
        carousel.style.opacity = '0';
        carousel.style.transform = 'translate(-50%, -50%) rotateX(-90deg) scale(0.5)';
        
        setTimeout(() => {
            carousel.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            carousel.style.opacity = '1';
            carousel.style.transform = `translate(-50%, -50%) rotateX(-10deg) rotateY(${carousel3DRotation}deg)`;
        }, 200);
    }
    
    controls.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.5s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 600 + index * 150);
    });
}

function animateInfiniteGallery() {
    const container = document.querySelector('.infinite-container');
    const controls = document.querySelectorAll('.infinite-controls button');
    
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 200);
    }
    
    controls.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 500 + index * 100);
    });
}

function animateParallaxGallery() {
    const container = document.querySelector('.parallax-container');
    
    if (container) {
        container.style.opacity = '0';
        
        setTimeout(() => {
            container.style.transition = 'all 1s ease';
            container.style.opacity = '1';
        }, 200);
    }
}

function animateMorphingGallery() {
    const container = document.querySelector('.morphing-container');
    const controls = document.querySelectorAll('.morphing-controls button');
    
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.5) rotate(180deg)';
        
        setTimeout(() => {
            container.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            container.style.opacity = '1';
            container.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }
    
    controls.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0) rotate(360deg)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1) rotate(0deg)';
        }, 800 + index * 150);
    });
}

function animateNormalGallery() {
    const items = document.querySelectorAll('#normalGallery .gallery-item');
    const controls = document.querySelectorAll('.gallery-controls .control-btn');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) rotateX(30deg)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) rotateX(0)';
        }, index * 100);
    });
    
    controls.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.4s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, index * 150);
    });
}
