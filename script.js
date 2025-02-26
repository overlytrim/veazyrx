// Initialize Three.js scene
document.addEventListener('DOMContentLoaded', function() {
    // Create missing audio elements if they don't exist
    const audioIds = ['hover-sound-1', 'hover-sound-2', 'hover-sound-3'];
    audioIds.forEach(id => {
        if (!document.getElementById(id)) {
            const audio = document.createElement('audio');
            audio.id = id;
            audio.preload = 'auto';

            const source = document.createElement('source');
            source.src = `https://assets.mixkit.co/active_storage/sfx/${id.split('-')[2]}/25${id.split('-')[2]}-preview.mp3`;
            source.type = 'audio/mpeg';

            audio.appendChild(source);
            document.body.appendChild(audio);
        }
    });

    // Initialize Three.js if canvas exists
    if (document.getElementById('universe')) {
        initThreeJS();
    }

    // Initialize cursor
    initCursor();

    // Initialize hover effects
    initHoverEffects();

    // Initialize card effects for any page with glass cards
    if (document.querySelector('.glass-card')) {
        init3DCardEffect();
    }

    // Initialize quotes if they exist on the page
    if (document.querySelector('.quote-text')) {
        initializeQuotes();
    }
});

// Global variables
let scene = null, camera = null, renderer = null, points = null;
let comets = [];
let supernovas = [];
let mouseX = 0, mouseY = 0;
let initialized = false;

function initThreeJS() {
    const canvas = document.getElementById('universe');
    if (!canvas) return;

    // Skip if already initialized
    if (initialized) return;

    // Create scene only if it doesn't exist
    if (!scene) {
        scene = new THREE.Scene();
    }
    
    // Create camera only if it doesn't exist
    if (!camera) {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1000;
    }

    // Create renderer only if it doesn't exist
    if (!renderer) {
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    }

    // Add stars
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < 15000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );

        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.8, 0.8);
        colors.push(color.r, color.g, color.b);

        sizes.push(Math.random() * 2);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add event for creating supernovas on click
    canvas.addEventListener('click', createSupernovaOnClick);

    // Initialize comets
    comets = []; // Clear existing comets to prevent duplicates
    for (let i = 0; i < 5; i++) {
        comets.push(new Comet());
    }

    initialized = true;

    // Start animation loop
    animate();
}

function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    if (cursor && cursorBlur) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorBlur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

            // Update for Three.js parallax
            mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
        });
    }
}

function initHoverEffects() {
    const elements = document.querySelectorAll('.nav-links a, .social-button, .glass-card, .button');

    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            try {
                const soundId = `hover-sound-${Math.floor(Math.random() * 3) + 1}`;
                const sound = document.getElementById(soundId);
                if (sound) {
                    // Reset time and volume
                    try {
                        sound.currentTime = 0;
                        sound.volume = 0.2;
                        sound.play().catch(e => console.log("Audio play error:", e));
                    } catch (e) {
                        console.log("Audio property error:", e);
                    }
                }
            } catch (err) {
                console.log("Sound effect error:", err);
            }
        });
    });
}

class Comet {
    constructor() {
        this.position = new THREE.Vector3(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
        this.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        this.trail = [];
        this.trailLength = 20;

        const geometry = new THREE.SphereGeometry(2, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x00f7ff),
            transparent: true,
            opacity: 0.8
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
        scene.add(this.mesh);
    }

    update() {
        this.position.add(this.velocity);
        this.mesh.position.copy(this.position);

        this.trail.push(this.position.clone());
        if (this.trail.length > this.trailLength) {
            this.trail.shift();
        }

        if (Math.abs(this.position.x) > 1000 || 
            Math.abs(this.position.y) > 1000 || 
            Math.abs(this.position.z) > 1000) {
            this.position.set(
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000,
                Math.random() * 2000 - 1000
            );
            this.trail = [];
        }
    }
}

function createSupernovaOnClick(event) {
    if (!initialized || !renderer) return;

    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const vector = new THREE.Vector3(x * 1000, y * 1000, 0);
    const supernova = createSupernova(vector.x, vector.y, vector.z);

    supernovas.push({ 
        ...supernova, 
        age: 0,
        maxAge: 100 
    });
}

function createSupernova(x, y, z) {
    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        const radius = Math.random() * 5;
        const velocity = Math.random() * 30 + 20;

        positions[i * 3] = x + Math.sin(theta) * Math.cos(phi) * radius;
        positions[i * 3 + 1] = y + Math.sin(theta) * Math.sin(phi) * radius;
        positions[i * 3 + 2] = z + Math.cos(theta) * radius;

        velocities.push({
            x: velocity * Math.sin(theta) * Math.cos(phi),
            y: velocity * Math.sin(theta) * Math.sin(phi),
            z: velocity * Math.cos(theta)
        });

        colors[i * 3] = 1;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = Math.random() * 0.2;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const points = new THREE.Points(particles, material);
    scene.add(points);

    return { points, velocities };
}

function updateSupernovas() {
    for (let i = supernovas.length - 1; i >= 0; i--) {
        const supernova = supernovas[i];
        const positions = supernova.points.geometry.attributes.position.array;
        const colors = supernova.points.geometry.attributes.color.array;

        for (let j = 0; j < positions.length; j += 3) {
            positions[j] += supernova.velocities[j/3].x;
            positions[j + 1] += supernova.velocities[j/3].y;
            positions[j + 2] += supernova.velocities[j/3].z;

            const alpha = 1 - (supernova.age / supernova.maxAge);
            colors[j] *= alpha;
            colors[j + 1] *= alpha;
            colors[j + 2] *= alpha;
        }

        supernova.points.geometry.attributes.position.needsUpdate = true;
        supernova.points.geometry.attributes.color.needsUpdate = true;
        supernova.points.material.opacity = 1 - (supernova.age / supernova.maxAge);

        supernova.age++;

        if (supernova.age >= supernova.maxAge) {
            scene.remove(supernova.points);
            supernovas.splice(i, 1);
        }
    }
}

function animate() {
    if (!initialized) return;

    requestAnimationFrame(animate);

    // Update comets
    comets.forEach(comet => comet.update());

    // Rotate points based on mouse position
    if (points) {
        points.rotation.x += 0.0002;
        points.rotation.y += 0.0003;
        points.rotation.x += (mouseY - points.rotation.x) * 0.05;
        points.rotation.y += (mouseX - points.rotation.y) * 0.05;

        // Pulsing effect
        const time = Date.now() * 0.001;
        points.scale.x = points.scale.y = points.scale.z = Math.sin(time) * 0.15 + 1;

        // Color shifting effect
        const positions = points.geometry.attributes.position.array;
        const colors = points.geometry.attributes.color.array;
        for(let i = 0; i < colors.length; i += 3) {
            colors[i] = Math.sin(time + positions[i] * 0.001) * 0.5 + 0.5;
            colors[i + 1] = Math.cos(time + positions[i + 1] * 0.001) * 0.5 + 0.5;
            colors[i + 2] = Math.sin(time + positions[i + 2] * 0.002) * 0.5 + 0.5;
        }
        points.geometry.attributes.color.needsUpdate = true;
    }

    // Update supernovas
    updateSupernovas();

    // Render the scene
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (!initialized) return;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 3D card effect for glass cards
function init3DCardEffect() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        // Skip rodeo card if it has its own styling
        if (card.classList.contains('rodeo-card')) return;

        let bounds = card.getBoundingClientRect();
        let mouseLeaveDelay;

        card.addEventListener('mouseenter', () => {
            clearTimeout(mouseLeaveDelay);
            bounds = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
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
        });

        card.addEventListener('mouseleave', () => {
            mouseLeaveDelay = setTimeout(() => {
                card.style.transform = `
                    perspective(1000px)
                    scale3d(1, 1, 1)
                    rotate3d(0, 0, 0, 0)
                `;
                card.style.filter = 'brightness(1) contrast(1)';
            }, 100);
        });
    });
}

// Quotes system
const quotes = [
    { text: "Music expresses that which cannot be put into words and that which cannot remain silent.", author: "Victor Hugo" },
    { text: "One good thing about music, when it hits you, you feel no pain.", author: "Bob Marley" },
    { text: "Music is the universal language of mankind.", author: "Henry Wadsworth Longfellow" },
    { text: "Where words fail, music speaks.", author: "Hans Christian Andersen" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" }
];

function getNewQuote() {
    const quoteTexts = document.querySelectorAll('.quote-text');
    if (!quoteTexts || quoteTexts.length === 0) return;

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
    if (quoteContainers && quoteContainers.length > 0) {
        getNewQuote();
    }
}

// Show content function for the main page
function showContent(contentType) {
    const allContents = document.querySelectorAll('.content-details');
    allContents.forEach(content => {
        content.style.display = 'none';
    });

    const selectedContent = document.getElementById(`content-${contentType}`);
    if (selectedContent) {
        selectedContent.style.display = 'block';

        // Scroll to the content
        setTimeout(() => {
            selectedContent.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
}
