# ML-Book2 Project: Deep Learning Book Explanations in Romanian

## Project Overview
Interactive web-based explanations of the "Deep Learning" book by Goodfellow, Bengio, Courville. Each page from the book (JPG images) is explained in Romanian with expandable sections for simulations, references, and animations.

## Directory Structure
```
ml-book2/
├── index.html              # Main HTML with navigation and page loader
├── css/
│   └── styles.css          # All styling (dark theme, interactive components)
├── js/
│   └── scripts.js          # Page loader, toggle functions, zoom, etc.
├── pages/
│   └── page-XX.html        # Individual page explanations (XX = page number)
└── *.jpg                   # Source book pages (Ian Goodfellow...-page-XXX.jpg)
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
        <img src="Ian Goodfellow, Yoshua Bengio, Aaron Courville - Deep Learning (2017, MIT)-page-0XX.jpg"
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
- Read images first to understand content
- Create HTML files for that chunk
- Repeat for next chunk

### 2. For Each Page:
1. **Read the JPG image** to understand the content
2. **Create page-XX.html** in `/pages/` folder
3. **Write explanations in Romanian** - clear, educational
4. **Add expandable sections:**
   - 🎮 Simulation: Code examples, interactive demos
   - 📚 Reference: Related resources, applications in ML
   - ✨ Animation: Visual explanations, diagrams

### 3. Update index.html:
1. Add page number to `PAGES_CONFIG` array
2. Add navigation entry in appropriate chapter section
3. Update final section statistics if needed

## Content Guidelines
- **Language:** Romanian (informal, educational tone)
- **Formulas:** Use Unicode math symbols or HTML entities
- **Code:** Python/NumPy/PyTorch examples where relevant
- **Visualizations:** Use inline CSS with grid layouts and color-coded elements
- **Expandable sections:** Always include at least 2 types per paragraph

## Navigation Structure
Chapters are in `nav-chapter-container` divs with:
- `chapter-toggle` header
- `chapter-pages` containing:
  - `nav-section` for section headers
  - `nav-item` with `nav-link` anchors

## Image File Naming
Source images: `Ian Goodfellow, Yoshua Bengio, Aaron Courville - Deep Learning (2017, MIT)-page-0XX.jpg`
(Note: 3-digit page numbers with leading zeros)

## Completed Pages
- Chapter 1 (Introduction): pages 16-40
- Chapter 2 (Linear Algebra): pages 46-67

## TODO for Future
- Chapter 3 (Probability): pages 68+
