# Webpage Generation Rules

Convert the Markdown digest into a self-contained interactive HTML file.

## Design System

**CSS Variables (required, do not change):**
```css
:root {
  --primary: #2563eb;
  --bg: #ffffff;
  --text-main: #333333;
  --text-heading: #111111;
  --text-light: #666666;
  --border: #e5e5e5;
  --card-bg: #ffffff;
  --hover-bg: #f9fafb;
}
```

**Typography:**
- h1 (page title): `3.2rem`, `letter-spacing: 1px`, serif font, mobile: `2.4rem`
- h2 (section title): `1.8rem`, serif font
- h3 (card title): `1.5rem`, serif font, color: `var(--primary)`
- Body: `1rem`, system sans-serif
- Meta text: `0.85rem–0.95rem`

**Layout:** Max width `900px`, centered, single column, `padding: 0 1.5rem 4rem`

**Background: `#ffffff` (pure white — never use `#f9fafb` or any off-white for the body)**

---

## Required Page Structure

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Weekly Report [DATE]</title>
  <style>/* COMPLETE CSS — see below */</style>
</head>
<body>

  <nav>
    <a href="#overview" onclick="scrollToSection(event, 'overview')">本期概览</a>
    <a href="#products" onclick="scrollToSection(event, 'products')">产品与技术</a>
    <a href="#builders" onclick="scrollToSection(event, 'builders')">建造者动态</a>
    <a href="#podcasts" onclick="scrollToSection(event, 'podcasts')">播客精选</a>
    <a href="#insights" onclick="scrollToSection(event, 'insights')">深度洞察</a>
  </nav>

  <header>
    <h1>AI Weekly</h1>
    <p class="subtitle">[DATE RANGE]</p>
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="搜索标题、内容或标签...">
    </div>
  </header>

  <div class="tags-cloud" id="tagCloud">
    <!-- tag buttons go here -->
  </div>

  <main>
    <div id="noResults" class="no-results">
      没有找到匹配的内容，请尝试调整搜索词或取消标签选择。
    </div>

    <section id="overview" class="content-section">
      <h2>本期概览</h2>
      <!-- overview list -->
    </section>

    <section id="products" class="content-section">
      <h2>产品发布与技术突破</h2>
      <!-- product cards -->
    </section>

    <section id="builders" class="content-section">
      <h2>AI 建造者动态</h2>
      <!-- builder cards -->
    </section>

    <section id="podcasts" class="content-section">
      <h2>YouTube 播客精选</h2>
      <!-- podcast cards -->
    </section>

    <section id="insights" class="content-section">
      <h2>本期洞察</h2>
      <!-- insight cards -->
    </section>
  </main>

  <script>/* COMPLETE JAVASCRIPT — see below */</script>
</body>
</html>
```

---

## Critical Structure Rules

**Navigation:**
- Links go directly inside `<nav>` — do NOT add inner wrapper divs like `.nav-inner`
- Nav uses `justify-content: center`
- Every link MUST have `onclick="scrollToSection(event, 'section-id')"`

**Tags cloud:**
- Placed between `</header>` and `<main>` — outside both, never inside a section
- Container: `<div class="tags-cloud" id="tagCloud">`
- Each button: `<button class="tag-btn" data-tag="#TagName">#TagName</button>`
- Total tags across whole page: 25–30
- Remove `#AI` (too broad to be useful)
- Per-card limit: max 5 tags

**Cards:**
- Every card MUST have: `class="card filter-item"`
- Every card MUST have: `data-tags="#Tag1,#Tag2"` (comma-separated, each with `#` prefix)
- Tag priority per card: Company/Product name > Core tech category > Application context

**No-results div:**
- MUST use `id="noResults"` — not a class name

**Sections:**
- Every section MUST have `class="content-section"`
- Skip any section that has no content

---

## Tag Optimization Rules

**Step 1 — Remove `#AI`** (everything is AI-related, this tag adds no value)

**Step 2 — Merge near-duplicates:**
- `#企业应用` + `#企业AI` → `#企业应用`
- `#开发工具` + `#开发者工具` → `#开发工具`
- `#数据提取` + `#非结构化数据` → `#数据处理`
- `#Agent基础设施` → split into `#Agent` + `#基础设施`

**Step 3 — Keep core tags (priority order):**
1. Company/Product names: OpenAI, Anthropic, Google, Replit, Vercel, Claude, Gemini
2. Tech categories: LLM, Agent, 编程, 推理能力, 创造力, 数据处理, 基础设施
3. Application contexts: 企业应用, 开发工具, 自动化, VibeCode, Cowork
4. Business: 融资, 价格战, 性价比, 投资
5. Governance: AI治理, 监管, 国防
6. Trends: 开源, 生态系统, 多Agent协作, 成本革命

**Step 4 — Assign to cards:**
- Max 5 tags per card
- Avoid having the same 2 tags appear together on every card

---

## Content Templates

### Overview section
```html
<section id="overview" class="content-section">
  <h2>本期概览</h2>
  <ul class="overview-list">
    <li>🔥 [major launch highlight]</li>
    <li>🚀 [notable release highlight]</li>
    <li>💡 [key insight highlight]</li>
  </ul>
</section>
```

### Product card
```html
<div class="card filter-item" data-tags="#OpenAI,#LLM,#企业应用">
  <h3 class="card-title">[Product Name]</h3>
  <div class="date">发布日期: [date] | 来源: [source label]</div>
  <p><strong>核心描述</strong>: [2–3 sentence description — NOT a one-liner]</p>
  <p><strong>关键亮点</strong>:</p>
  <ul>
    <li>[specific highlight 1]</li>
    <li>[specific highlight 2]</li>
    <li>[specific highlight 3]</li>
  </ul>
  <p><strong>为什么重要</strong>: [1–2 paragraph analysis]</p>
  <div class="card-tags">
    <span>#OpenAI</span><span>#LLM</span><span>#企业应用</span>
  </div>
  <div class="card-links">
    <a href="[url]" target="_blank">🔗 查看详情</a>
  </div>
</div>
```

### Builder card
```html
<div class="card filter-item" data-tags="#Anthropic,#Agent">
  <div class="builder-header">
    <span class="builder-name">[Full Name]</span>
    <span class="builder-company">@[handle] · [Company / Role]</span>
  </div>
  <p><strong>最新动态</strong>: [complete paragraph — not one sentence]</p>
  <p><strong>核心观点</strong>: [detailed description with specifics]</p>
  <p><strong>为什么重要</strong>: [analysis paragraph]</p>
  <div class="card-tags">
    <span>#Anthropic</span><span>#Agent</span>
  </div>
  <div class="card-links">
    <a href="[link1]" target="_blank">🔗 推文1</a>
    <a href="[link2]" target="_blank">🔗 推文2</a>
  </div>
</div>
```

### Podcast card
```html
<div class="card filter-item" data-tags="#Agent,#基础设施">
  <h3 class="card-title">[Channel Name] — "[Episode Title]"</h3>
  <div class="date">发布日期: [date]</div>
  <p><strong>核心观点</strong>: [one-sentence takeaway]</p>
  <p><strong>关键洞察</strong>: [2–3 paragraph detailed explanation]</p>
  <div class="card-tags">
    <span>#Agent</span><span>#基础设施</span>
  </div>
  <div class="card-links">
    <a href="[url]" target="_blank">🔗 观看完整播客</a>
  </div>
</div>
```

### Insight card
```html
<div class="card filter-item" data-tags="#AGI,#Agent">
  <h3 class="card-title">[Insight Title]</h3>
  <p>[Analysis paragraph 1]</p>
  <p>[Analysis paragraph 2 — must have at least 2 paragraphs, not just a title]</p>
  <div class="card-tags">
    <span>#AGI</span><span>#Agent</span>
  </div>
</div>
```

---

## Complete CSS

Place this verbatim inside `<style>`:

```css
:root {
  --primary: #2563eb;
  --bg: #ffffff;
  --text-main: #333333;
  --text-heading: #111111;
  --text-light: #666666;
  --border: #e5e5e5;
  --card-bg: #ffffff;
  --hover-bg: #f9fafb;
}

* { box-sizing: border-box; }

body {
  margin: 0; padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, .serif { font-family: Georgia, serif; }

nav {
  position: sticky; top: 0;
  background-color: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  display: flex; justify-content: center; gap: 2rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  z-index: 1000;
  overflow-x: auto; white-space: nowrap;
}

nav a {
  color: var(--text-main); text-decoration: none;
  font-weight: 500; font-size: 1rem;
  transition: color 0.2s;
}
nav a:hover { color: var(--primary); }

header { text-align: center; padding: 4rem 1.5rem 2rem; }

header h1 {
  font-size: 3.2rem; letter-spacing: 1px;
  color: var(--text-heading); margin: 0 0 0.8rem 0;
}

header .subtitle {
  font-size: 1.1rem; color: var(--text-light); margin: 0 0 2.5rem 0;
}

.search-box { max-width: 600px; margin: 0 auto; }

.search-box input {
  width: 100%; padding: 0.8rem 1.5rem;
  border-radius: 999px; border: 1px solid var(--border);
  background-color: var(--hover-bg); font-size: 1rem; outline: none;
  transition: all 0.2s;
}
.search-box input:focus {
  background-color: var(--bg); border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
}

.tags-cloud {
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: 0.6rem; max-width: 800px;
  margin: 0 auto 3rem; padding: 0 1.5rem;
}

.tag-btn {
  background-color: #f3f4f6; border: 1px solid transparent;
  padding: 0.4rem 0.9rem; border-radius: 999px;
  font-size: 0.85rem; color: #4b5563;
  cursor: pointer; transition: all 0.2s ease;
}
.tag-btn:hover { background-color: #e5e7eb; }
.tag-btn.active { background-color: var(--text-heading); color: #ffffff; }

main { max-width: 900px; margin: 0 auto; padding: 0 1.5rem 4rem; }

section { margin-bottom: 3.5rem; }

section h2 {
  font-size: 1.8rem; color: var(--text-heading);
  border-bottom: 2px solid var(--text-heading);
  padding-bottom: 0.5rem; margin-bottom: 1.5rem;
}

.overview-list { list-style: none; padding: 0; margin: 0; }

.overview-list li {
  background-color: var(--hover-bg);
  border-left: 4px solid var(--primary);
  padding: 1rem 1.2rem; margin-bottom: 1rem;
  border-radius: 0 8px 8px 0; font-size: 1.05rem;
  display: flex; align-items: flex-start; gap: 0.8rem;
}

.card {
  background-color: var(--card-bg); border: 1px solid var(--border);
  border-radius: 12px; padding: 1.8rem; margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08); }

.card h3.card-title {
  font-size: 1.5rem; color: var(--primary);
  margin: 0 0 0.5rem 0; line-height: 1.4;
}

.card .date { font-size: 0.85rem; color: var(--text-light); margin-bottom: 1.2rem; }

.card p { margin-top: 0; margin-bottom: 0.8rem; }

.card ul { margin-top: 0.5rem; margin-bottom: 1rem; padding-left: 1.5rem; }

.card li { margin-bottom: 0.4rem; }

.card strong { color: var(--text-heading); }

.builder-header {
  display: flex; align-items: baseline; gap: 0.8rem;
  margin-bottom: 1.2rem; flex-wrap: wrap;
}

.builder-name { font-size: 1.4rem; font-weight: bold; color: var(--text-heading); }

.builder-company {
  font-size: 0.95rem; color: var(--text-light);
  background: var(--hover-bg); padding: 0.2rem 0.6rem; border-radius: 4px;
}

.card-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.2rem 0; }

.card-tags span {
  background-color: #f0f4f8; color: var(--primary);
  font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px;
}

.card-links {
  display: flex; flex-wrap: wrap; gap: 1rem;
  margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border);
}

.card-links a {
  display: inline-flex; align-items: center;
  color: var(--primary); text-decoration: none;
  font-weight: 600; font-size: 0.95rem;
  transition: color 0.2s, transform 0.2s;
}
.card-links a:hover { color: #1d4ed8; text-decoration: underline; }

.no-results {
  text-align: center; padding: 3rem; color: var(--text-light);
  font-size: 1.1rem; background: var(--hover-bg); border-radius: 12px;
  display: none; margin-bottom: 2rem;
}

@media (max-width: 768px) {
  header h1 { font-size: 2.4rem; }
  nav { justify-content: flex-start; padding: 1rem; }
  .card { padding: 1.2rem; }
}
```

---

## Complete JavaScript

Place this verbatim inside `<script>`:

```javascript
let activeTag = null;
let searchQuery = '';

function scrollToSection(event, sectionId) {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
    const navHeight = document.querySelector('nav').offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
  }
}

function filterByTag(tag) {
  const tagButtons = document.querySelectorAll('.tag-btn');
  if (activeTag === tag) {
    activeTag = null;
    tagButtons.forEach(btn => btn.classList.remove('active'));
  } else {
    activeTag = tag;
    tagButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === tag);
    });
  }
  applyFilters();
}

function handleSearch(query) {
  searchQuery = query.toLowerCase().trim();
  applyFilters();
}

function applyFilters() {
  const sections = document.querySelectorAll('.content-section');
  let hasVisibleItems = false;

  sections.forEach(section => {
    const items = section.querySelectorAll('.filter-item');
    let sectionHasVisible = false;

    items.forEach(item => {
      let visible = true;
      if (activeTag) {
        visible = (item.dataset.tags || '').includes(activeTag);
      }
      if (visible && searchQuery) {
        visible = item.textContent.toLowerCase().includes(searchQuery);
      }
      item.style.display = visible ? 'block' : 'none';
      if (visible) { sectionHasVisible = true; hasVisibleItems = true; }
    });

    // Sections with no filter-items (e.g. overview list) are always visible
    section.style.display = (items.length === 0 || sectionHasVisible) ? 'block' : 'none';
  });

  document.getElementById('noResults').style.display = hasVisibleItems ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', function() { filterByTag(this.dataset.tag); });
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) { handleSearch(e.target.value); });
  }

  applyFilters();
});
```

---

## Pre-Generation Checklist

Verify ALL of these before outputting the HTML:

- [ ] Background color is `#ffffff` (not `#f9fafb` or any off-white)
- [ ] `<nav>` uses `justify-content: center`, no inner wrapper divs
- [ ] Every nav link has `onclick="scrollToSection(event, '...')"`
- [ ] Tags cloud `<div>` is between `</header>` and `<main>`
- [ ] Tags cloud uses `id="tagCloud"` and `class="tags-cloud"`
- [ ] Every card has `class="card filter-item"`
- [ ] Every card has `data-tags` with `#` prefix and comma separation
- [ ] Max 5 tags per card
- [ ] Total unique tags: 25–30, `#AI` excluded
- [ ] No-results div uses `id="noResults"`
- [ ] `h1` has `letter-spacing: 1px`
- [ ] Every section has `class="content-section"`
- [ ] Card content is complete (not one-line summaries)
- [ ] All links have valid URLs (not placeholder `[url]`)
- [ ] JavaScript includes all 4 functions: `scrollToSection`, `filterByTag`, `handleSearch`, `applyFilters`

**If any check fails, fix it before outputting.**
