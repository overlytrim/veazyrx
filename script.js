// Load GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Glass card 3D tilt and hover effects
document.querySelectorAll('.glass-card').forEach(card => {
    let bounds = card.getBoundingClientRect();
    let mouseLeaveDelay;

    const mouseEnter = (e) => {
        clearTimeout(mouseLeaveDelay);
        bounds = card.getBoundingClientRect();
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${y / 100},
                ${-x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )
        `;
        card.style.filter = `brightness(1.1) contrast(1.1)`;
    };
    
    const mouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${y / 100},
                ${-x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )
        `;
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

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
let mouseX, mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursorBlur.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
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

// GSAP animations for hero and glass cards
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

// Quotes system
const quotes = [
    { text: "Music expresses that which cannot be put into words and that which cannot remain silent.", author: "Victor Hugo" },
    { text: "One good thing about music, when it hits you, you feel no pain.", author: "Bob Marley" },
    { text: "Music is the universal language of mankind.", author: "Henry Wadsworth Longfellow" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" },
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
    // Add any additional quotes (e.g., success, motivation quotes) from your original list if needed
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

function initializeQuotes() {
    const quoteContainers = document.querySelectorAll('.quote-text');
    if (quoteContainers.length > 0) {
        getNewQuote();
    }
}

document.addEventListener('DOMContentLoaded', initializeQuotes);

// Reinitialize quotes when landing page is clicked (if applicable)
document.getElementById('landing-page')?.addEventListener('click', () => {
    setTimeout(initializeQuotes, 100);
});
