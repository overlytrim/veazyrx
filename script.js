// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const cards = document.querySelectorAll('.nav-card');
    
    if (carouselInner && cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 20; // Width + gap
        let currentIndex = 0;
        const maxIndex = cards.length - Math.floor(carouselInner.parentElement.offsetWidth / cardWidth);

        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');

        function updateCarousel() {
            carouselInner.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        rightArrow.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Add hover sound effects to nav cards
        function playRandomSound() {
            try {
                const sounds = [
                    document.getElementById('hover-sound-1'),
                    document.getElementById('hover-sound-2'),
                    document.getElementById('hover-sound-3')
                ];

                const validSounds = sounds.filter(sound => sound !== null);

                if (validSounds.length > 0) {
                    const sound = validSounds[Math.floor(Math.random() * validSounds.length)];
                    if (sound && typeof sound.play === 'function') {
                        sound.currentTime = 0;
                        sound.volume = 0.2;
                        sound.play().catch(e => console.log("Audio play prevented:", e));
                    }
                }
            } catch (err) {
                console.log("Audio system error:", err);
            }
        }

        cards.forEach(card => {
            card.addEventListener('mouseenter', playRandomSound);
        });

        // Optional: Add GSAP animation for carousel entry
        if (typeof gsap !== 'undefined') {
            gsap.from('.nav-card', {
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.5
            });
        }
    }
});
