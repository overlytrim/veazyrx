:root {
    --primary: #00f7ff;
    --secondary: #ff00f7;
    --accent: #7B68EE;
    --dark: #0a0a0a;
    --glass: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Space Grotesk', sans-serif;
    background: var(--dark);
    color: #fff;
    overflow-x: hidden;
    perspective: 2000px;
}

h1, h2, .nav-links a {
    font-family: 'Syncopate', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem;
    z-index: 1000;
}

.nav-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--primary);
}

#universe {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.content-section {
    min-height: 100vh;
    padding-top: 80px;
    width: 100%;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
    position: relative;
    z-index: 1;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 4rem 0;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 2rem;
    transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
    color: white;
}

.glass-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--primary);
    box-shadow: 
        0 0 30px rgba(0, 247, 255, 0.4),
        0 0 60px rgba(0, 247, 255, 0.2);
}

.glass-card h2 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.glass-card p {
    margin: 0.5rem 0;
}

.glitch {
    position: relative;
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    color: var(--primary);
    text-shadow: 
        0 0 10px var(--primary),
        0 0 20px var(--primary);
    margin-bottom: 2rem;
}

#cursor {
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
    z-index: 9999;
}

#cursor-blur {
    width: 400px;
    height: 400px;
    background: rgba(0, 247, 255, 0.1);
    border-radius: 50%;
    position: fixed;
    filter: blur(80px);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: -1;
}

@media (max-width: 768px) {
    .glitch {
        font-size: 2.5rem;
    }

    .grid {
        grid-template-columns: 1fr;
    }

    #cursor, #cursor-blur {
        display: none;
    }
}



// Initialize preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    let width = 0;
    const interval = setInterval(() => {
        width += 2;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = width + '%';
        }
        if (width >= 100) {
            clearInterval(interval);
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }
    }, 20);
});

// Landing page handler
document.getElementById('landing-page').addEventListener('click', () => {
    const landingPage = document.getElementById('landing-page');
    landingPage.classList.add('fade-out');
    setTimeout(initializeQuotes, 100);
});

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursorBlur.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// Sound effects
function playRandomSound() {
    // Disabled for now to prevent errors
    return;
}

// Add hover sound effects
document.querySelectorAll('.nav-links a, .social-button, .glass-card, .button').forEach(element => {
    element.addEventListener('mouseenter', playRandomSound);
});

// Quotes system
const quotes = [
    { text: "Music expresses that which cannot be put into words and that which cannot remain silent.", author: "Victor Hugo" },
    { text: "One good thing about music, when it hits you, you feel no pain.", author: "Bob Marley" },
    { text: "Music is the universal language of mankind.", author: "Henry Wadsworth Longfellow" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Life is not about waiting for the storm to pass, it's about learning to dance in the rain.", author: "Vivian Greene" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
    { text: "You never fail until you stop trying.", author: "Albert Einstein" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Success is not built on success. It's built on failure. It's built on frustration. Sometimes it's built on catastrophe.", author: "Sumner Redstone" },
    { text: "The music is not in the notes, but in the silence between.", author: "Wolfgang Amadeus Mozart" },
    { text: "Music washes away from the soul the dust of everyday life.", author: "Berthold Auerbach" },
    { text: "Music is a higher revelation than all wisdom and philosophy.", author: "Ludwig van Beethoven" },
    { text: "Life seems to go on without effort when I am filled with music.", author: "George Eliot" },
    { text: "Music is the soundtrack of your life.", author: "Dick Clark" },
    { text: "Music touches us emotionally, where words alone can't.", author: "Johnny Depp" },
    { text: "If music be the food of love, play on.", author: "William Shakespeare" },
    { text: "Music is the great uniter. An incredible force.", author: "Dave Matthews" },
    { text: "Music is like a dream. One that I cannot hear.", author: "Ludwig van Beethoven" },
    { text: "Music is the divine way to tell beautiful, poetic things to the heart.", author: "Pablo Casals" },
    { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
    { text: "I think it is possible for ordinary people to choose to be extraordinary.", author: "Elon Musk" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Persistence is very important. You should not give up unless you are forced to give up.", author: "Elon Musk" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

function getNewQuote() {
    const quoteTexts = document.querySelectorAll('.quote-text');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteContent = `
        <div class="quote-content">${randomQuote.text.split('').map(char => 
            char === ' ' ? ' ' : `<span>${char}</span>`
        ).join('')}</div>
        <div class="quote-author">- ${randomQuote.author}</div>
    `;
    quoteTexts.forEach(quoteText => {
        quoteText.innerHTML = quoteContent;
    });
}

function showContent(contentType) {
    // Hide all content sections first
    document.querySelectorAll('.content-details').forEach(content => {
        content.style.opacity = '0';
        setTimeout(() => {
            content.style.display = 'none';
        }, 300);
    });

    // Show selected content
    const selectedContent = document.getElementById(`content-${contentType}`);
    if (selectedContent) {
        selectedContent.style.display = 'block';
        // Force a reflow
        selectedContent.offsetHeight;
        selectedContent.style.opacity = '1';
        selectedContent.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize content display
document.addEventListener('DOMContentLoaded', () => {
    // Hide all content sections initially
    document.querySelectorAll('.content-details').forEach(content => {
        content.style.display = 'none';
    });
});

function initializeQuotes() {
    const quoteContainers = document.querySelectorAll('.quote-text');
    if (quoteContainers.length > 0) {
        getNewQuote();
    }
}

document.addEventListener('DOMContentLoaded', initializeQuotes);

// Music player functionality
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    isMusicPlaying = !isMusicPlaying;
    if (isMusicPlaying) {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    }
});

// Add 3D tilt effect to cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.setProperty('--rotateX', `${rotateX}deg`);
        card.style.setProperty('--rotateY', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotateX', '0deg');
        card.style.setProperty('--rotateY', '0deg');
    });
});

// Reinitialize quotes when landing page is clicked
document.getElementById('landing-page').addEventListener('click', () => {
    setTimeout(initializeQuotes, 100);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.to('.hero', {
    yPercent: 50,
    ease: "none",
    scrollTrigger: {
        trigger: '.hero',
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.from('.glass-card', {
    duration: 1.2,
    y: 100,
    opacity: 0,
    rotation: 5,
    stagger: 0.2,
    ease: 'elastic.out(1, 0.75)',
    scrollTrigger: {
        trigger: '.grid',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    }
});

document.querySelectorAll('.glass-card').forEach(card => {
    let bounds = card.getBoundingClientRect();
    let mouseLeaveDelay;

    const mouseEnter = (e) => {
        clearTimeout(mouseLeaveDelay);
        bounds = card.getBoundingClientRect();
    };

    const mouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        };
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        card.style.transform = `
            perspective(1000px)
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${center.y / 100},
                ${-center.x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )
        `;
        card.style.filter = `brightness(1.1) contrast(1.1)`;
    };

    const mouseLeave = () => {
        mouseLeaveDelay = setTimeout(() => {
            card.style.transform = `
                perspective(1000px)
                scale3d(1, 1, 1)
                rotate3d(0, 0, 0, 0)
            `;
            card.style.filter = 'brightness(1) contrast(1)';
        }, 100);
    };

    card.addEventListener('mouseenter', mouseEnter);
    card.addEventListener('mousemove', mouseMove);
    card.addEventListener('mouseleave', mouseLeave);

    gsap.to(card, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

.overall-rating {
    font-size: 1.3em;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--secondary);
    color: var(--secondary);
    text-shadow: 0 0 10px var(--secondary);
    animation: ratingPulse 2s infinite;
}

@keyframes ratingPulse {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.5) saturate(1.5); }
}
