/**
 * Deep Learning - Explicat in Romana
 * Scripts principale + Page Loader dinamic
 */

// ==========================================
// PAGE LOADER - Incarca paginile din /pages/
// ==========================================

const PageLoader = {
    container: null,
    loadedPages: new Set(),

    init() {
        this.container = document.getElementById('pages-container');
        if (!this.container) {
            console.error('Container #pages-container nu a fost gasit!');
            return;
        }
        this.loadAllPages();
    },

    async loadAllPages() {
        // Obtine lista paginilor din config
        const pages = window.PAGES_CONFIG || [];

        for (const pageId of pages) {
            await this.loadPage(pageId);
        }

        // Reinitializeaza event listeners dupa incarcare
        this.initializePageInteractions();
        console.log('Toate paginile au fost incarcate.');
    },

    async loadPage(pageId) {
        if (this.loadedPages.has(pageId)) return;

        const placeholder = document.createElement('div');
        placeholder.id = `page-${pageId}-wrapper`;
        placeholder.className = 'page-loading';
        placeholder.textContent = `Se incarca pagina ${pageId}...`;
        this.container.appendChild(placeholder);

        try {
            const response = await fetch(`pages/page-${pageId}.html`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const html = await response.text();
            placeholder.outerHTML = html;
            this.loadedPages.add(pageId);

        } catch (error) {
            console.error(`Eroare la incarcarea paginii ${pageId}:`, error);
            placeholder.className = 'page-error';
            placeholder.innerHTML = `
                <p>Nu s-a putut incarca pagina ${pageId}</p>
                <button onclick="PageLoader.retryLoad('${pageId}')" class="sim-btn primary">
                    Reincearca
                </button>
            `;
        }
    },

    retryLoad(pageId) {
        const wrapper = document.getElementById(`page-${pageId}-wrapper`);
        if (wrapper) wrapper.remove();
        this.loadedPages.delete(pageId);
        this.loadPage(pageId);
    },

    initializePageInteractions() {
        // Reinitializeaza toate interactiunile pentru paginile nou incarcate
        initActiveNavigation();
    }
};

// ==========================================
// THEME SWITCHER
// ==========================================

function setTheme(themeName) {
    // Set theme on document
    document.documentElement.setAttribute('data-theme', themeName);

    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('active');
        }
    });

    // Save to localStorage
    localStorage.setItem('preferred-theme', themeName);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('preferred-theme') || 'midnight';
    setTheme(savedTheme);
}

function toggleMobileTheme() {
    const popup = document.getElementById('mobileThemePopup');
    popup.classList.toggle('open');
}

function closeMobileTheme() {
    const popup = document.getElementById('mobileThemePopup');
    popup.classList.remove('open');
}

// Close mobile theme popup when clicking outside
document.addEventListener('click', (e) => {
    const popup = document.getElementById('mobileThemePopup');
    const toggleBtn = document.querySelector('.mobile-theme-toggle');
    if (popup && !popup.contains(e.target) && !toggleBtn.contains(e.target)) {
        popup.classList.remove('open');
    }
});

// ==========================================
// NAVIGATION
// ==========================================

function toggleNav() {
    document.getElementById('navSidebar').classList.toggle('open');
}

function toggleChapter(chapterId) {
    document.getElementById(chapterId).classList.toggle('collapsed');
}

// ==========================================
// PROGRESS BAR
// ==========================================

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateProgressBar);

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

function initActiveNavigation() {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

// ==========================================
// INTERACTIVE ELEMENTS
// ==========================================

function toggleParagraph(element) {
    element.closest('.interactive-paragraph').classList.toggle('expanded');
}

function toggleSection(element) {
    element.closest('.section-tab').classList.toggle('open');
}

// ==========================================
// IMAGE ZOOM
// ==========================================

function zoomImage(img) {
    img.classList.add('zoomed');
    document.getElementById('imageOverlay').classList.add('active');
}

function closeZoom() {
    document.querySelectorAll('.page-image').forEach(img => {
        img.classList.remove('zoomed');
    });
    document.getElementById('imageOverlay').classList.remove('active');
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile nav
                document.getElementById('navSidebar').classList.remove('open');
            }
        });
    });
}

// ==========================================
// SIMULATIONS
// ==========================================

// Neural Network Animation
function animateNeuralNetwork(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const layers = [4, 6, 6, 3];
    const neurons = [];
    const layerSpacing = canvas.width / (layers.length + 1);

    // Create neurons
    layers.forEach((count, layerIndex) => {
        const x = layerSpacing * (layerIndex + 1);
        const spacing = canvas.height / (count + 1);
        for (let i = 0; i < count; i++) {
            neurons.push({
                x: x,
                y: spacing * (i + 1),
                layer: layerIndex,
                activation: Math.random()
            });
        }
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
        ctx.lineWidth = 1;
        neurons.forEach(n1 => {
            neurons.forEach(n2 => {
                if (n2.layer === n1.layer + 1) {
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.stroke();
                }
            });
        });

        // Draw neurons
        neurons.forEach(n => {
            n.activation = 0.5 + 0.5 * Math.sin(Date.now() / 500 + n.x + n.y);

            ctx.beginPath();
            ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${n.activation})`;
            ctx.fill();
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        requestAnimationFrame(draw);
    }

    draw();
}

// Perceptron Simulation
function runPerceptronSim(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let weights = [Math.random() - 0.5, Math.random() - 0.5];
    let bias = Math.random() - 0.5;
    const learningRate = 0.1;

    // Training data for AND gate
    const data = [
        { inputs: [0, 0], target: 0 },
        { inputs: [0, 1], target: 0 },
        { inputs: [1, 0], target: 0 },
        { inputs: [1, 1], target: 1 }
    ];

    function sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    function predict(inputs) {
        const sum = inputs[0] * weights[0] + inputs[1] * weights[1] + bias;
        return sigmoid(sum);
    }

    function train() {
        data.forEach(point => {
            const output = predict(point.inputs);
            const error = point.target - output;
            weights[0] += learningRate * error * point.inputs[0];
            weights[1] += learningRate * error * point.inputs[1];
            bias += learningRate * error;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(canvas.width, canvas.height) / 2;
        const offsetX = canvas.width / 4;
        const offsetY = canvas.height - 30;

        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        for (let i = 0; i <= 1; i += 0.2) {
            ctx.beginPath();
            ctx.moveTo(offsetX + i * scale, offsetY);
            ctx.lineTo(offsetX + i * scale, offsetY - scale);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY - i * scale);
            ctx.lineTo(offsetX + scale, offsetY - i * scale);
            ctx.stroke();
        }

        // Draw decision boundary
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const x1 = 0, x2 = 1;
        const y1 = (-bias - weights[0] * x1) / weights[1];
        const y2 = (-bias - weights[0] * x2) / weights[1];
        ctx.moveTo(offsetX + x1 * scale, offsetY - y1 * scale);
        ctx.lineTo(offsetX + x2 * scale, offsetY - y2 * scale);
        ctx.stroke();

        // Draw points
        data.forEach(point => {
            const x = offsetX + point.inputs[0] * scale;
            const y = offsetY - point.inputs[1] * scale;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = point.target === 1 ? '#10b981' : '#ef4444';
            ctx.fill();
        });

        // Train and repeat
        train();
        requestAnimationFrame(draw);
    }

    draw();
}

// XOR Visualization
function runXORDemo(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const data = [
        { x: 0, y: 0, label: 0 },
        { x: 0, y: 1, label: 1 },
        { x: 1, y: 0, label: 1 },
        { x: 1, y: 1, label: 0 }
    ];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = 100;
        const offsetX = canvas.width / 2 - scale / 2;
        const offsetY = canvas.height / 2 + scale / 2;

        // Draw axes
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(offsetX - 20, offsetY);
        ctx.lineTo(offsetX + scale + 20, offsetY);
        ctx.moveTo(offsetX, offsetY + 20);
        ctx.lineTo(offsetX, offsetY - scale - 20);
        ctx.stroke();

        // Draw impossible linear boundary (dashed)
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(offsetX - 20, offsetY - scale - 20);
        ctx.lineTo(offsetX + scale + 20, offsetY + 20);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw points
        data.forEach(point => {
            const x = offsetX + point.x * scale;
            const y = offsetY - point.y * scale;

            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fillStyle = point.label === 1 ? '#10b981' : '#ef4444';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(point.label, x, y + 4);
        });

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.fillText('XOR: Nu poate fi separat liniar!', canvas.width / 2, 20);
    }

    draw();
}

// ==========================================
// SIMULATION INITIALIZERS
// ==========================================

document.addEventListener('click', (e) => {
    if (e.target.closest('.section-header')) {
        setTimeout(() => {
            const section = e.target.closest('.section-tab');
            const canvas = section.querySelector('canvas');
            if (canvas && section.classList.contains('open')) {
                const simType = canvas.dataset.simType;
                if (simType === 'neural') animateNeuralNetwork(canvas.id);
                else if (simType === 'perceptron') runPerceptronSim(canvas.id);
                else if (simType === 'xor') runXORDemo(canvas.id);
            }
        }, 100);
    }
});

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    initSmoothScroll();
    initActiveNavigation();

    // Incarca paginile daca exista configuratia
    if (window.PAGES_CONFIG && window.PAGES_CONFIG.length > 0) {
        PageLoader.init();
    }
});
