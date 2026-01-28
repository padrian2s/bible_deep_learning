# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# ML-Book2 Project: Deep Learning Book Explanations in Romanian

## Quick Start
```bash
# Run local server (required for fetch() API)
python3 -m http.server 8000

# Open http://localhost:8000
```
**Critical:** Do NOT open `index.html` directly - CORS will block page loading.

## Project Overview
Interactive web-based explanations of the "Deep Learning" book by Goodfellow, Bengio, Courville. Each page from the book (JPG images) is explained in Romanian with expandable sections for simulations, references, and animations.

**Tech Stack:** Pure HTML/CSS/JS (no frameworks)
- Dynamic page loading via fetch API (`PageLoader` in `js/scripts.js`)
- Canvas-based interactive simulations (neural networks, perceptrons)
- Three customizable themes (midnight, sepia, ocean)
- Mobile-responsive design

## Directory Structure
```
ml-book2/
├── index.html              # Main HTML with navigation, theme selector, and page loader
├── css/
│   └── styles.css          # All styling (3 themes: midnight, sepia, ocean)
├── js/
│   └── scripts.js          # PageLoader, interactions, canvas simulations
├── pages/
│   └── page-XX.html        # Individual page explanations (XX = page number)
├── book_page_jpg/
│   └── page-XXX.jpg        # Source book pages (3-digit page numbers)
└── CHAPTER*_PROGRESS.md    # Progress tracking for chapters
```

## Page HTML Template Structure
Each page file in `/pages/page-XX.html` follows this structure:

```html
<section class="page-section" id="page-XX">
    <div class="page-header">
        <div class="page-number">XX</div>
        <div class="page-title">
            <h3>Title in Romanian</h3>
            <span>Section/Topic</span>
        </div>
    </div>
    <div class="image-container">
        <img src="book_page_jpg/page-0XX.jpg"
             alt="Pagina XX" class="page-image" onclick="zoomImage(this)">
    </div>
    <div class="explanation-content">
        <!-- Multiple interactive-paragraph blocks -->
        <div class="interactive-paragraph">
            <div class="paragraph-main" onclick="toggleParagraph(this)">
                <h4>Topic Title</h4>
                <p>Main explanation text in Romanian...</p>
            </div>
            <div class="expandable-sections">
                <!-- Simulation section -->
                <div class="section-tab">
                    <div class="section-header" onclick="toggleSection(this)">
                        <div class="section-icon simulation">🎮</div>
                        <span>Simulare: Title</span>
                        <span class="arrow">▶</span>
                    </div>
                    <div class="section-content">
                        <div class="section-body">
                            <!-- Content: code-block, formulas, visualizations -->
                        </div>
                    </div>
                </div>
                <!-- Reference section -->
                <div class="section-tab">
                    <div class="section-header" onclick="toggleSection(this)">
                        <div class="section-icon reference">📚</div>
                        <span>Referinte/Aplicatii</span>
                        <span class="arrow">▶</span>
                    </div>
                    <div class="section-content">...</div>
                </div>
                <!-- Animation/visualization section -->
                <div class="section-tab">
                    <div class="section-header" onclick="toggleSection(this)">
                        <div class="section-icon animation">✨</div>
                        <span>Vizualizare/Animatie</span>
                        <span class="arrow">▶</span>
                    </div>
                    <div class="section-content">...</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

## CSS Classes Reference
- `.formula` - Math formulas with special styling
- `.code-block` - Code examples with dark background
- `.key-concept` - Highlighted important concepts box
- `.reference-list`, `.reference-item` - Reference list styling
- Colors: `var(--primary)`, `var(--secondary)`, `var(--accent)`, `var(--success)`, `var(--warning)`
- `var(--bg-lighter)`, `var(--bg-dark)` - Background variants
- `var(--text-secondary)` - Muted text color

## Adding New Pages Workflow

### 1. Work in Chunks (4-5 pages at a time)
- Read book page images from `book_page_jpg/` to understand content
- Create HTML files for that chunk
- Test in browser before moving to next chunk

### 2. For Each Page:
1. **Read the JPG image** (`book_page_jpg/page-XXX.jpg`) to understand the content
2. **Create `pages/page-XX.html`** following the template structure below
3. **Write explanations in Romanian** - informal, educational tone (like explaining to a friend)
4. **Add expandable sections** (at least 2 types per paragraph):
   - 🎮 Simulare: Python code examples, interactive canvas demos
   - 📚 Referinte/Aplicatii: Related resources, real-world ML applications
   - ✨ Vizualizare/Animatie: Visual diagrams, math visualizations

### 3. Update index.html (CRITICAL):
After creating page files, you MUST update `index.html` in TWO places:

**A. Add to PAGES_CONFIG array:**
```javascript
const PAGES_CONFIG = [
    16, 17, 20, 21, ..., YOUR_NEW_PAGE_NUMBER
];
```
This tells PageLoader which files to fetch.

**B. Add navigation link:**
Find the appropriate chapter section and add:
```html
<div class="nav-item">
    <a href="#page-XX" class="nav-link">Pag. XX - Title in Romanian</a>
</div>
```

**Testing:** Start local server and verify:
- Page loads without 404 errors (check browser console)
- Image displays correctly
- Interactive sections expand/collapse
- Navigation link scrolls to page

## Content Guidelines
- **Language:** Romanian, informal educational tone (tu/ti form, not dumneavoastra)
- **Formulas:** Use Unicode math symbols (∑, ∫, ∂, θ) or HTML entities (`&sum;`, `&int;`)
- **Code blocks:** Python/NumPy/PyTorch examples with `.code-block` class
- **Visualizations:**
  - Use inline CSS with grid layouts for visual diagrams
  - Canvas simulations for interactive demos (neural networks, perceptrons, etc.)
  - Color-coded elements using CSS custom properties
- **Expandable sections:** Always include at least 2 types per paragraph
- **Math notation:** Wrap in `.formula` spans for proper styling

## Common Patterns

### Adding a Canvas Simulation
```html
<div class="simulation-container">
    <canvas id="sim-unique-id" class="simulation-canvas"
            data-sim-type="neural"></canvas>
</div>
```
Supported `data-sim-type` values: `neural`, `perceptron`, `xor`

### Math Formula Display
```html
<span class="formula">f(x) = σ(Wx + b)</span>
```

### Key Concept Highlight
```html
<div class="key-concept">
    <strong>Important:</strong> Explanation here
</div>
```

### Code Block
```html
<div class="code-block">
import numpy as np
X = np.array([1, 2, 3])
</div>
```

## Navigation Structure
Chapters are in `nav-chapter-container` divs with:
- `chapter-toggle` header
- `chapter-pages` containing:
  - `nav-section` for section headers
  - `nav-item` with `nav-link` anchors

## Architecture & Key Systems

### 1. Page Loading System (`js/scripts.js`)
The `PageLoader` object dynamically loads page HTML files:
- Reads page numbers from `window.PAGES_CONFIG` array (defined in `index.html`)
- Fetches each `/pages/page-XX.html` via `fetch()` API
- Replaces placeholder divs with loaded HTML
- Reinitializes event listeners after loading

**When adding new pages:** Update `PAGES_CONFIG` array in `index.html` with the page number.

### 2. Interactive Elements
- **toggleParagraph()**: Expands/collapses main explanation paragraphs
- **toggleSection()**: Opens/closes expandable sections (simulation, references, animations)
- **zoomImage()**: Full-screen zoom for book page images
- All interactions use inline `onclick` handlers in HTML

### 3. Canvas Simulations
Three simulation types are initialized on-demand when sections are expanded:
- `animateNeuralNetwork()`: Animated neural network with pulsing neurons
- `runPerceptronSim()`: Perceptron learning visualization with decision boundary
- `runXORDemo()`: XOR problem demonstration

Canvas elements need `data-sim-type` attribute matching the simulation type.

### 4. Theme System
Three themes stored in CSS custom properties:
- **midnight** (default): Dark blue theme
- **sepia**: Warm, book-like theme
- **ocean**: Teal/cyan theme

Theme preference saved to `localStorage`. Mobile has popup theme selector, desktop has inline buttons.

### 5. Image File Naming
Source images in `book_page_jpg/`: `page-XXX.jpg` (3-digit with leading zeros)
Referenced in page HTML as: `<img src="book_page_jpg/page-016.jpg">`

## Progress Tracking
The project has extensive page coverage across multiple chapters. Check:
- Navigation in `index.html` for current chapter/page structure
- `CHAPTER*_PROGRESS.md` files for chapter-specific progress notes

Major completed sections:
- Chapter 1 (Introduction): pages 16-40
- Chapter 2 (Linear Algebra): pages 46-67
- Chapter 3 (Probability): pages 68-94
- Chapter 4 (Numerical Computation): pages 95-112
- Chapter 5 (Machine Learning Basics): pages 113-190+
- And more chapters in progress...

## Troubleshooting

### Page doesn't load
1. Check browser console for 404 errors
2. Verify page number is in `PAGES_CONFIG` array in `index.html`
3. Ensure file exists at `/pages/page-XX.html`
4. Check that local server is running (not opening file directly)

### Image doesn't display
1. Verify image exists in `book_page_jpg/` directory
2. Check filename format: `page-XXX.jpg` (3 digits with leading zeros)
3. Verify image path in page HTML: `book_page_jpg/page-0XX.jpg`

### Canvas simulation doesn't work
1. Check `data-sim-type` attribute matches one of: `neural`, `perceptron`, `xor`
2. Verify canvas has unique `id` attribute
3. Section must be expanded (opened) for simulation to initialize
4. Check browser console for JavaScript errors

### Navigation link doesn't work
1. Verify `href="#page-XX"` matches section `id="page-XX"`
2. Check page has been loaded by PageLoader (inspect DOM)
3. Ensure smooth scroll is initialized (`initSmoothScroll()` called)
