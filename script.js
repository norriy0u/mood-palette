// ===== MoodPalette - AI Color Therapy =====

const moodPalettes = {
    happy: {
        name: 'Sunshine Bloom',
        desc: 'Warm, radiant tones that capture the glow of pure joy.',
        colors: ['#FFD93D', '#FF6B6B', '#6BCB77', '#4D96FF', '#FF8B94'],
        altColors: ['#FFC75F', '#FF9671', '#D65DB1', '#845EC2', '#FF6F91']
    },
    calm: {
        name: 'Serene Waters',
        desc: 'Cool, tranquil hues that wash over you like a gentle tide.',
        colors: ['#A0D2DB', '#D4E09B', '#F6F7EB', '#3D5A80', '#98C1D9'],
        altColors: ['#B8E0D2', '#D6EADF', '#EAE4E9', '#436B95', '#ADC5CF']
    },
    energetic: {
        name: 'Electric Surge',
        desc: 'High-voltage colors that pulse with unstoppable energy.',
        colors: ['#FF0054', '#FFBD00', '#00FF87', '#00B4D8', '#9B5DE5'],
        altColors: ['#FF006E', '#FB5607', '#FFBE0B', '#3A86FF', '#8338EC']
    },
    melancholy: {
        name: 'Rain on Glass',
        desc: 'Muted, contemplative tones for when the world feels heavy.',
        colors: ['#5C6378', '#8B95A2', '#B8C5D6', '#3E4A5C', '#A4B0BE'],
        altColors: ['#4A5568', '#718096', '#A0AEC0', '#2D3748', '#CBD5E0']
    },
    creative: {
        name: 'Spectrum Vision',
        desc: 'A kaleidoscope of inspiration for the boundless mind.',
        colors: ['#FF6B6B', '#FECA57', '#48DBFB', '#FF9FF3', '#54A0FF'],
        altColors: ['#EE5A24', '#FFC312', '#12CBC4', '#ED4C67', '#0652DD']
    },
    dreamy: {
        name: 'Moonlit Whisper',
        desc: 'Soft, ethereal colors from the edges of a beautiful dream.',
        colors: ['#C3AED6', '#DDB3E6', '#5B2C6F', '#AED6DC', '#4A266A'],
        altColors: ['#E8DAEF', '#D7BDE2', '#7D3C98', '#A9CCE3', '#6C3483']
    },
    fierce: {
        name: 'Molten Core',
        desc: 'Blazing, intense hues forged in the heart of a volcano.',
        colors: ['#FF0000', '#FF4500', '#FF6347', '#DC143C', '#8B0000'],
        altColors: ['#E74C3C', '#C0392B', '#FF5733', '#900C3F', '#581845']
    },
    nostalgic: {
        name: 'Faded Polaroid',
        desc: 'Vintage, sun-kissed tones that feel like an old photograph.',
        colors: ['#D4A574', '#E8C49C', '#F0DCC8', '#8B7355', '#C4956A'],
        altColors: ['#CC9966', '#DEB887', '#F5DEB3', '#A0522D', '#D2B48C']
    }
};

let selectedMood = null;
let currentPalette = null;

// DOM
const introScreen = document.getElementById('intro-screen');
const moodScreen = document.getElementById('mood-screen');
const intensityScreen = document.getElementById('intensity-screen');
const paletteScreen = document.getElementById('palette-screen');
const startBtn = document.getElementById('start-btn');
const generateBtn = document.getElementById('generate-btn');
const copyCssBtn = document.getElementById('copy-css-btn');
const newMoodBtn = document.getElementById('new-mood-btn');
const moodBtns = document.querySelectorAll('.mood-btn');
const bgAudio = document.getElementById('bg-audio');
const particleCanvas = document.getElementById('particle-bg');

// ===== Particle Background =====
function initParticles() {
    const ctx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.4 + 0.1,
            color: `hsla(${260 + Math.random() * 40}, 70%, 60%, `
        });
    }

    function animate() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > particleCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > particleCanvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 * (1 - dist / 120)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });
}
initParticles();

// ===== Navigation =====
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

startBtn.addEventListener('click', () => {
    bgAudio.volume = 0.3;
    bgAudio.play().catch(() => {});
    showScreen(moodScreen);
});

moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        moodBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMood = btn.dataset.mood;

        // Transition to intensity
        setTimeout(() => {
            document.getElementById('mood-echo').textContent = selectedMood;
            showScreen(intensityScreen);
        }, 300);
    });
});

generateBtn.addEventListener('click', () => {
    if (!selectedMood) return;
    const intensity = parseInt(document.getElementById('intensity-slider').value);
    generatePalette(selectedMood, intensity);
    showScreen(paletteScreen);
});

// ===== Palette Generation =====
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function lerpColor(hex1, hex2, t) {
    const c1 = hexToRgb(hex1);
    const c2 = hexToRgb(hex2);
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function generatePalette(mood, intensity) {
    const data = moodPalettes[mood];
    const t = intensity / 100;

    // Blend between base and alt based on intensity
    currentPalette = data.colors.map((c, i) => lerpColor(c, data.altColors[i], t));

    document.getElementById('palette-title').textContent = data.name;
    document.getElementById('palette-desc').textContent = data.desc;

    // Render swatches
    const display = document.getElementById('palette-display');
    display.innerHTML = '';
    currentPalette.forEach((color, i) => {
        const swatch = document.createElement('div');
        swatch.className = 'palette-swatch';
        swatch.style.background = color;
        swatch.innerHTML = `<span class="swatch-hex">${color.toUpperCase()}</span>`;
        swatch.addEventListener('click', () => {
            navigator.clipboard.writeText(color).then(() => showToast());
        });
        swatch.style.animationDelay = `${i * 0.1}s`;
        display.appendChild(swatch);
    });

    // Color details
    const details = document.getElementById('color-details');
    details.innerHTML = '';
    currentPalette.forEach(color => {
        const rgb = hexToRgb(color);
        const card = document.createElement('div');
        card.className = 'color-detail-card';
        card.innerHTML = `
            <div class="color-preview" style="background:${color}"></div>
            <div class="color-hex">${color.toUpperCase()}</div>
            <div class="color-rgb">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
        `;
        details.appendChild(card);
    });

    // Update particles to match mood
    updateParticleColors(currentPalette);
}

function updateParticleColors(palette) {
    // Visual feedback - change body bg slightly
    document.body.style.transition = 'background 1s ease';
    const rgb = hexToRgb(palette[0]);
    document.body.style.background = `rgb(${Math.floor(rgb.r*0.1)}, ${Math.floor(rgb.g*0.1)}, ${Math.floor(rgb.b*0.1)})`;
}

// ===== Copy CSS =====
copyCssBtn.addEventListener('click', () => {
    if (!currentPalette) return;
    const css = `:root {\n${currentPalette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
    navigator.clipboard.writeText(css).then(() => showToast());
});

newMoodBtn.addEventListener('click', () => {
    selectedMood = null;
    moodBtns.forEach(b => b.classList.remove('selected'));
    showScreen(moodScreen);
});

function showToast() {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2000);
}
