// Three.js Starfield
let scene, camera, stars = [];
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('universe'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.z = 5;

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
    stars.push(starField);

    function animate() {
        requestAnimationFrame(animate);
        stars.forEach(star => {
            star.rotation.y += 0.0005;
        });
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}
initThree();

// Cursor Effects
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    cursorBlur.style.left = mouseX + 'px';
    cursorBlur.style.top = mouseY + 'px';
});

document.querySelectorAll('.sidebar-link, .social-button, .glass-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorBlur.style.transform = 'scale(2)';
        playRandomSound();
    });
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorBlur.style.transform = 'scale(1)';
    });
});

function playRandomSound() {
    const sounds = [
        document.getElementById('hover-sound-1'),
        document.getElementById('hover-sound-2'),
        document.getElementById('hover-sound-3')
    ];
    const availableSounds = sounds.filter(sound => sound && sound.src);
    if (availableSounds.length > 0) {
        const randomSound = availableSounds[Math.floor(Math.random() * availableSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch(error => console.log('Audio play failed:', error));
    }
}

// Audio Control (Enabled only if audio exists)
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
if (bgMusic && bgMusic.src) {
    musicToggle.style.display = 'block';
    bgMusic.style.display = 'block';
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.style.color = '#00f7ff';
        } else {
            bgMusic.pause();
            musicToggle.style.color = '#b3b3b3';
        }
    });
}

// Preloader and Landing Page Animation
const preloader = document.getElementById('preloader');
const progressBar = document.getElementById('progress-bar');
const landingPage = document.getElementById('landing-page');

let progress = 0;
const progressInterval = setInterval(() => {
    progress += 1;
    progressBar.style.width = progress + '%';
    if (progress >= 100) {
        clearInterval(progressInterval);
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            landingPage.classList.add('fade-out');
            setTimeout(() => landingPage.style.display = 'none', 1500);
        }, 500);
    }
}, 30);

// Carousel Scroll Functionality
document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.carousel');
    const leftArrow = container.querySelector('.left-arrow');
    const rightArrow = container.querySelector('.right-arrow');

    leftArrow.addEventListener('click', () => {
        carousel.scrollLeft -= 300;
    });

    rightArrow.addEventListener('click', () => {
        carousel.scrollLeft += 300;
    });

    carousel.addEventListener('scroll', () => {
        if (carousel.scrollLeft === 0) leftArrow.style.opacity = '0.3';
        else leftArrow.style.opacity = '1';
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) rightArrow.style.opacity = '0.3';
        else rightArrow.style.opacity = '1';
    });
});

// Sidebar Active Link
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
