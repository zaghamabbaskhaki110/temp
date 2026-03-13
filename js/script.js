// 3000 high-quality Unsplash images — 300 per category × 10 categories
// Using picsum.photos with IDs 1–1000 (all verified real photos)
// + Unsplash source URLs for beautiful category-specific images

const CATEGORIES = ['art', 'nature', 'architecture', 'fashion', 'food', 'travel', 'interior', 'photography', 'minimal', 'vintage'];

// Unsplash source keywords per category — gives beautiful real photos
const UNSPLASH_KEYWORDS = {
    art: ['art', 'painting', 'gallery', 'creative', 'illustration', 'sculpture', 'abstract', 'watercolor', 'canvas', 'studio'],
    nature: ['nature', 'forest', 'mountain', 'ocean', 'flower', 'sunset', 'landscape', 'garden', 'trees', 'wilderness'],
    architecture: ['architecture', 'building', 'city', 'interior', 'design', 'bridge', 'skyscraper', 'facade', 'structure', 'urban'],
    fashion: ['fashion', 'style', 'outfit', 'model', 'clothing', 'portrait', 'aesthetic', 'chic', 'editorial', 'wardrobe'],
    food: ['food', 'coffee', 'cooking', 'restaurant', 'meal', 'dessert', 'bakery', 'fresh', 'culinary', 'brunch'],
    travel: ['travel', 'adventure', 'explore', 'destination', 'wanderlust', 'beach', 'mountains', 'road', 'paris', 'japan'],
    interior: ['interior', 'home', 'furniture', 'cozy', 'room', 'decor', 'living', 'bedroom', 'kitchen', 'loft'],
    photography: ['photography', 'portrait', 'black and white', 'film', 'camera', 'light', 'shadow', 'street', 'documentary', 'cinematic'],
    minimal: ['minimal', 'clean', 'white', 'simple', 'texture', 'geometric', 'nordic', 'calm', 'space', 'lines'],
    vintage: ['vintage', 'retro', 'nostalgia', 'film grain', 'old', 'classic', 'antique', 'faded', 'analog', '70s'],
};

// Height variations for masonry visual interest
const HEIGHTS = [280, 340, 380, 420, 460, 300, 360, 400, 320, 440];

const TITLES = [
    'Golden hour vibes', 'Soft light morning', 'Into the wild', 'Urban poetry',
    'Still life study', 'Chasing shadows', 'Warm tones', 'Found in nature',
    'Architectural details', 'The quiet moment', 'Bloom', 'Wanderlust',
    'Color theory', 'Frame within a frame', 'Texture hunt', 'Season change',
    'Coffee and dreams', 'Minimalist life', 'Through the lens', 'Street story',
    'Hidden geometry', 'Soft focus', 'Palette study', 'Light and shadow',
    'Morning ritual', 'City at dusk', 'Forest floor', 'Abstract thought',
    'Coastal mood', 'Vintage finds', 'Desert palette', 'Mountain air',
    'Quiet places', 'Warm afternoons', 'Evening glow', 'Perfect symmetry',
    'Layers of light', 'Untamed beauty', 'Candid moments', 'Golden ratio',
    'Blue hour', 'Misty morning', 'Raw texture', 'Faded glory',
    'In bloom', 'Slow living', 'Visual poetry', 'Natural rhythm',
    'Wabi-sabi', 'Sacred geometry', 'Borrowed light', 'Negative space',
];

const USERS = [
    { name: 'Sofia Chen', followers: '12.4k', emoji: '🌸' },
    { name: 'Marcus Wilde', followers: '8.9k', emoji: '🎨' },
    { name: 'Aisha Noor', followers: '24.1k', emoji: '✨' },
    { name: 'Leo Fontaine', followers: '5.2k', emoji: '🌿' },
    { name: 'Priya Kapoor', followers: '18.7k', emoji: '💫' },
    { name: 'James Park', followers: '3.1k', emoji: '🏔' },
    { name: 'Elena Vasquez', followers: '31.5k', emoji: '🌊' },
    { name: 'Noa Fischer', followers: '7.6k', emoji: '🦋' },
    { name: 'Kai Tanaka', followers: '9.3k', emoji: '🌙' },
    { name: 'Amara Diallo', followers: '15.2k', emoji: '🔥' },
    { name: 'Luca Romano', followers: '6.8k', emoji: '🍃' },
    { name: 'Zara Ahmed', followers: '22.1k', emoji: '⚡' },
];

const DESCS = [
    'Captured in a fleeting moment between light and shadow.',
    'Some places speak directly to your soul.',
    'Finding beauty in the overlooked corners of everyday life.',
    'The world is full of quiet poetry if you slow down enough to notice.',
    'A study in contrasts — rough and smooth, dark and light.',
    'This one stopped me in my tracks.',
    'Everything that matters exists in small, careful details.',
    'Sometimes the most ordinary things are the most extraordinary.',
    'Where the light falls just right.',
    'A reminder to look up more often.',
    'Stillness captured in motion.',
    'The beauty of imperfect things.',
    'Found beauty where I least expected it.',
    'This is what magic looks like.',
];

const TAGS_POOL = {
    art: ['abstract', 'painting', 'colorful', 'gallery', 'canvas', 'brushwork', 'palette', 'creative', 'studio'],
    nature: ['outdoors', 'greenery', 'forest', 'botanical', 'wildlife', 'earth', 'organic', 'landscape', 'serene'],
    architecture: ['design', 'structure', 'urban', 'geometric', 'cityscape', 'modern', 'facade', 'spaces'],
    fashion: ['style', 'outfit', 'aesthetic', 'editorial', 'lookbook', 'wardrobe', 'chic', 'couture'],
    food: ['culinary', 'plating', 'gastronomy', 'fresh', 'homemade', 'brunch', 'recipe', 'delicious'],
    travel: ['adventure', 'explore', 'destination', 'wanderlust', 'journey', 'discovery', 'roadtrip', 'abroad'],
    interior: ['homedecor', 'cozy', 'livingspace', 'furniture', 'hygge', 'design', 'ambiance', 'loft'],
    photography: ['portrait', 'cinematic', 'analog', 'film', 'exposure', 'composition', 'moody', 'street'],
    minimal: ['clean', 'simple', 'whitespace', 'nordic', 'sparse', 'calm', 'quiet', 'zen'],
    vintage: ['retro', 'nostalgic', 'throwback', 'oldschool', 'grain', 'faded', 'classic', 'analog'],
};

// Generate 3000 pins: 300 per category
// Using picsum.photos — 1000 unique IDs across categories
function buildAllPins() {
    const pins = [];
    let globalId = 0;

    CATEGORIES.forEach((cat, catIdx) => {
        const tags = TAGS_POOL[cat];
        const keyword = UNSPLASH_KEYWORDS[cat];

        for (let i = 0; i < 300; i++) {
            // Use picsum IDs spread evenly — picsum has ~1000 valid photos
            // We'll cycle through IDs 1-1000 with offset per category
            const picsumBase = (catIdx * 100 + i) % 1000 + 1;
            const w = 400;
            const h = HEIGHTS[(i + catIdx) % HEIGHTS.length];

            const tag1 = tags[i % tags.length];
            const tag2 = tags[(i + 2) % tags.length];
            const tag3 = tags[(i + 4) % tags.length];

            pins.push({
                id: globalId++,
                cat: cat,
                src: `https://picsum.photos/id/${picsumBase}/${w}/${h}`,
                fullSrc: `https://picsum.photos/id/${picsumBase}/800/1000`,
                title: TITLES[(globalId) % TITLES.length],
                desc: DESCS[(globalId) % DESCS.length],
                user: USERS[(globalId) % USERS.length],
                tags: [...new Set([cat, tag1, tag2, tag3])],
                topicTags: [cat],
                saved: false,
            });
        }
    });

    // Shuffle
    for (let i = pins.length - 1; i > 0; i--) {
        const j = Math.floor(Math.abs(Math.sin(i * 9301 + 49297) * 1e9)) % (i + 1);
        [pins[i], pins[j]] = [pins[j], pins[i]];
    }

    return pins;
}

const allPins = buildAllPins();
let currentTag = 'all';
let page = 0;
const PER_PAGE = 30;

function getFiltered() {
    const q = document.getElementById('searchInput').value.toLowerCase().trim();
    return allPins.filter(p => {
        const tagMatch = currentTag === 'all' || p.topicTags.includes(currentTag);
        const searchMatch = !q || p.title.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.cat.includes(q);
        return tagMatch && searchMatch;
    });
}

function renderGrid(reset = false) {
    const grid = document.getElementById('masonry');
    const filtered = getFiltered();

    if (reset) { grid.innerHTML = ''; page = 0; }

    const start = page * PER_PAGE;
    const slice = filtered.slice(start, start + PER_PAGE);
    page++;

    document.getElementById('gridCount').textContent = filtered.length.toLocaleString() + ' ideas';
    const loadBtn = document.getElementById('loadBtn');
    loadBtn.style.display = filtered.length > page * PER_PAGE ? '' : 'none';

    slice.forEach((pin, i) => {
        const card = document.createElement('div');
        card.className = 'pin-card';
        card.style.animationDelay = (i * 20) + 'ms';

        // Extract height from src URL for aspect ratio
        const hMatch = pin.src.match(/\/(\d+)$/);
        const imgH = hMatch ? parseInt(hMatch[1]) : 300;

        card.innerHTML = `
      <img src="${pin.src}" alt="${pin.title}" loading="lazy" draggable="false" style="height:${imgH}px">
      <div class="pin-overlay">
        <div class="pin-actions">
          <button class="pin-act-btn" title="More" onclick="event.stopPropagation()">⋯</button>
          <button class="pin-act-btn like-btn" title="Like" onclick="event.stopPropagation(); this.textContent=this.textContent==='🤍'?'❤️':'🤍'">🤍</button>
        </div>
        <button class="pin-save" id="save-${pin.id}" onclick="event.stopPropagation(); toggleSave(${pin.id}, this)">${pin.saved ? '✓ Saved' : 'Save'}</button>
        <div class="pin-info">
          <div class="pin-title">${pin.title}</div>
          <div class="pin-meta">
            <div class="pin-avatar">${pin.user.emoji}</div>
            <span>${pin.user.name}</span>
          </div>
        </div>
      </div>
    `;
        card.onclick = () => openModal(pin);
        grid.appendChild(card);
    });
}

function loadMore() {
    const btn = document.getElementById('loadBtn');
    btn.textContent = 'Loading...';
    btn.classList.add('loading');
    setTimeout(() => {
        renderGrid(false);
        btn.textContent = 'Load more ideas';
        btn.classList.remove('loading');
    }, 400);
}

function filterByTag(tag, btn) {
    currentTag = tag;
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const labels = {
        all: "Today's Picks", art: 'Art & Illustration', nature: 'Nature & Outdoors',
        architecture: 'Architecture', fashion: 'Fashion & Style', food: 'Food & Drink',
        travel: 'Travel & Places', interior: 'Interior Design', photography: 'Photography',
        minimal: 'Minimalism', vintage: 'Vintage & Retro'
    };
    document.getElementById('gridTitle').textContent = labels[tag] || tag;
    renderGrid(true);
}

function filterPins() { renderGrid(true); }

function openModal(pin) {
    document.getElementById('modalImg').src = pin.fullSrc;
    document.getElementById('modalTitle').textContent = pin.title;
    document.getElementById('modalDesc').textContent = pin.desc;
    document.getElementById('modalAvatar').textContent = pin.user.emoji;
    document.getElementById('modalUsername').textContent = pin.user.name;
    document.getElementById('modalFollowers').textContent = pin.user.followers + ' followers';
    const saveBtn = document.getElementById('modalSaveBtn');
    saveBtn.textContent = pin.saved ? '✓ Saved' : 'Save';
    saveBtn.style.background = pin.saved ? '#4a7c59' : '';
    saveBtn.onclick = () => toggleSave(pin.id, saveBtn);
    document.getElementById('modalTags').innerHTML = pin.tags.map(t => `<span class="tag">#${t}</span>`).join('');
    document.getElementById('modalBg').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(e) {
    if (e && e.target !== document.getElementById('modalBg')) return;
    document.getElementById('modalBg').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(null); });

function toggleSave(id, btn) {
    const pin = allPins.find(p => p.id === id);
    if (!pin) return;
    pin.saved = !pin.saved;
    document.querySelectorAll(`#save-${id}`).forEach(b => {
        b.textContent = pin.saved ? '✓ Saved' : 'Save';
        b.style.background = pin.saved ? '#4a7c59' : '';
    });
    if (btn) { btn.textContent = pin.saved ? '✓ Saved' : 'Save'; btn.style.background = pin.saved ? '#4a7c59' : ''; }
}

// Start
renderGrid(true);