# Palette Showcase — Resumable Brief

> **Purpose**: Self-contained brief so a new AI session can resume this task from scratch without any prior conversation context.
>
> **Next action**: Create `palette-showcase.html` at workspace root using the full spec below. No changes to `src/`.

---

## Background

`rouletabille.fr` is a static Eleventy/WebC site for a unicycling association. The **entire visual appearance** is driven by 9 CSS custom properties defined in one file: `src/_includes/webc/pagestyle.webc`. Changing those 9 values completely repaints the site.

The owner wants to explore alternative color schemes. The deliverable is a **standalone `palette-showcase.html`** at the workspace root that lets them visually compare 20 palettes (no changes to the live site).

---

## Design System — The 9 Tokens

All tokens are stored as raw RGB triplets (no `rgb()` wrapper) so they can be composed with `rgba(var(--token), 0.15)` etc.

| Token                       | Current RGB     | Where used                               |
| --------------------------- | --------------- | ---------------------------------------- |
| `--palette-nav-bg`          | `244, 240, 229` | Sidebar/header background                |
| `--palette-nav-fg`          | `14, 14, 14`    | Nav text, logo, hamburger bars           |
| `--palette-nav-dim`         | `85, 85, 85`    | Subtitle under site name (muted)         |
| `--palette-content-bg`      | `37, 37, 37`    | Main page background                     |
| `--palette-content-fg`      | `239, 239, 239` | All body text                            |
| `--palette-accent`          | `224, 92, 0`    | h1/h2/h3, all links, nav hover arrow `⫸` |
| `--palette-content-surface` | `47, 42, 40`    | Card component background                |
| `--palette-page-bg`         | `160, 153, 135` | Outer HTML letterbox frame               |
| `--palette-bright`          | `254, 254, 254` | Near-white (currently unused)            |

### Token usage details

- **accent** appears in **both zones**: as nav hover arrow `⫸` on `nav-bg`, and as h1/links on `content-bg`. WCAG constraint applies primarily to the content zone (body text size links). Nav zone uses accent only for a decorative pseudo-element, so 3:1 contrast suffices there.
- **content-surface** in dark mode = slightly _lighter_ than `content-bg`; in light mode = slightly _darker_ than `content-bg`.
- **page-bg** = bridge value between the two main backgrounds; visible only on extreme viewports (>1400px wide) as a letterbox.

### 4 Components to showcase per palette

1. **Nav sidebar** — background `nav-bg`; text `nav-fg`; subtitle `nav-dim`; divider `rgba(nav-fg, 0.15)`; hover arrow `accent`
2. **Content area** — background `content-bg`; h1 in `accent`; body text `content-fg`; link `accent`
3. **Card block** — background `content-surface`; h2 in `accent`; body text `content-fg`
4. **Footer** — background `content-bg`; icon + link text in `accent`

---

## Layout of the Showcase HTML

- Single `palette-showcase.html` file, **no external dependencies** (inline CSS + SVG only)
- `<head>` legend section explaining the 4 components and 9 token roles
- **Section heading**: "🌑 Dark Mode Palettes (light nav + dark content)"
  - Grid of palettes #1–10
- **Section heading**: "☀️ Light Mode Palettes (light nav + light content)"
  - Grid of palettes #11–20

### Per-palette card layout

```
┌─────────────────────────────────────────────────┐
│ #N  PALETTE NAME          [DARK] or [LIGHT]      │
│ Inspiration tagline                              │
├────────────────┬────────────────────────────────┤
│ NAV ZONE       │ CONTENT ZONE                   │
│ (nav-bg)       │ (content-bg)                   │
│                │                                │
│ 🚲 Monocycle   │ H1 Heading                     │
│ Paris / IdF    │ Body text paragraph here...    │
│ (nav-dim)      │ → A link in accent color       │
│ ─────────      │                                │
│ > L'asso       │ ┌──────────────────────────┐   │
│   Initiations  │ │ CARD (content-surface)   │   │
│   Balades      │ │ H2 Card heading          │   │
│                │ │ Card body text           │   │
│   Adhérer      │ └──────────────────────────┘   │
├────────────────┴────────────────────────────────┤
│ Color swatches (9 boxes, labeled by token name) │
│ [nav-bg][nav-fg][nav-dim][content-bg][content-fg]│
│ [accent][content-surface][page-bg][bright]       │
├──────────────────────────────────────────────────┤
│ Contrast: nav AA ✓/✗  content AA ✓/✗            │
└──────────────────────────────────────────────────┘
```

### CSS approach

- Base showcase styles inline in `<style>` in `<head>`
- Each palette card scoped with class `.p1` … `.p20`
- Each `.pN` sets all 9 tokens as CSS custom properties on itself
- Inner components reference the tokens via `var(--palette-*)` — same naming as the real site
- Card is approximately `400px` wide; grid uses `repeat(auto-fill, minmax(400px, 1fr))`

### WCAG contrast badge calculation

Inline JavaScript (small, self-contained) computes relative luminance for:

- `nav-bg` vs `nav-fg` → ratio, badge "AA ✓" if ≥ 4.5
- `content-bg` vs `content-fg` → ratio, badge "AA ✓" if ≥ 4.5
- `content-bg` vs `accent` → ratio, badge note if < 3.0

Formula:

```js
function luminance(r, g, b) {
  return [r, g, b]
    .map((c) => {
      c /= 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    })
    .reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0);
}
function contrast(l1, l2) {
  const [hi, lo] = [Math.max(l1, l2), Math.min(l1, l2)];
  return (hi + 0.05) / (lo + 0.05);
}
```

---

## 20 Palettes — Complete Specification

### Section A — Dark Mode (palettes 1–10)

Format: `nav-bg | nav-fg | nav-dim | content-bg | content-fg | accent | content-surface | page-bg | bright`

---

**1. Charcoal & Ember** _(current palette, refined)_
Vibe: earthy, baseline reference

```
nav-bg:          244, 240, 229   warm cream
nav-fg:           14,  14,  14   near-black
nav-dim:          85,  85,  85   mid gray
content-bg:       37,  37,  37   dark charcoal
content-fg:      239, 239, 239   near-white
accent:          224,  92,   0   vivid orange
content-surface:  52,  47,  45   slightly lighter charcoal
page-bg:         160, 153, 135   warm gray-brown
bright:          254, 254, 254   near-white
```

---

**2. Marine & Ivory**
Vibe: nautical, athletic, clean

```
nav-bg:          247, 248, 250   ivory off-white
nav-fg:           15,  23,  42   deep navy
nav-dim:          71,  85, 105   slate
content-bg:       15,  23,  42   deep navy
content-fg:      226, 232, 240   light slate
accent:           56, 189, 248   sky blue (sky-400)
content-surface:  30,  41,  59   dark slate
page-bg:         100, 116, 139   slate-500
bright:          248, 250, 252   near-white
```

---

**3. Forest & Mist**
Vibe: nature, outdoors, organic

```
nav-bg:          248, 249, 245   cool near-white, green tint
nav-fg:           20,  30,  20   near-black forest
nav-dim:          80,  95,  80   muted forest green
content-bg:       18,  40,  22   dark forest green
content-fg:      220, 240, 222   light mint
accent:          132, 204,  22   lime-500 (chartreuse)
content-surface:  28,  55,  32   slightly lighter dark green
page-bg:          90, 120,  90   medium forest green
bright:          254, 255, 254   near-white
```

---

**4. Dusk & Coral**
Vibe: evening warmth, creative

```
nav-bg:          242, 237, 230   warm stone
nav-fg:           30,  20,  25   near-black, warm tint
nav-dim:         100,  80,  85   muted warm gray
content-bg:       45,  20,  40   deep aubergine
content-fg:      240, 225, 235   light lavender-pink
accent:          251, 113, 133   rose-400 (coral)
content-surface:  65,  35,  58   slightly lighter aubergine
page-bg:         135,  90, 115   medium mauve
bright:          255, 250, 252   near-white
```

---

**5. Nordic Ice**
Vibe: Scandinavian minimal, crisp

```
nav-bg:          245, 247, 252   icy cool white
nav-fg:           15,  25,  50   deep blue-black
nav-dim:          80,  95, 130   slate blue
content-bg:       20,  30,  65   deep slate blue
content-fg:      210, 225, 248   ice blue
accent:           34, 211, 238   cyan-400
content-surface:  30,  45,  85   medium dark slate
page-bg:          95, 115, 160   medium slate blue
bright:          248, 252, 255   near-white
```

---

**6. Terra & Sand**
Vibe: Mediterranean, earth, warm

```
nav-bg:          243, 236, 218   sandy linen
nav-fg:           42,  30,  18   dark brown
nav-dim:         110,  85,  65   warm tan
content-bg:       55,  30,  20   deep terracotta-brown
content-fg:      240, 225, 210   warm cream
accent:          245, 158,  11   amber-400
content-surface:  75,  45,  33   slightly lighter reddish-brown
page-bg:         155, 120,  90   medium warm brown
bright:          254, 250, 244   near-white
```

---

**7. Midnight & Gold**
Vibe: classic, elegant, luxury

```
nav-bg:          242, 243, 244   cool light gray
nav-fg:           12,  12,  15   near-black
nav-dim:          90,  90, 100   cool gray
content-bg:       10,  10,  12   near-black
content-fg:      235, 235, 230   warm near-white
accent:          234, 179,   8   yellow-500 (gold)
content-surface:  22,  22,  28   very dark gray
page-bg:          80,  80,  90   dark gray
bright:          254, 254, 252   near-white
```

---

**8. Jade & Stone**
Vibe: fresh, organic, spa-like

```
nav-bg:          246, 247, 243   warm off-white, green tint
nav-fg:           18,  35,  28   very dark teal
nav-dim:          75, 100,  88   muted teal
content-bg:       15,  50,  45   dark teal
content-fg:      215, 240, 235   light teal-white
accent:           52, 211, 153   emerald-400 (jade)
content-surface:  25,  70,  63   slightly lighter dark teal
page-bg:          80, 130, 118   medium teal
bright:          248, 255, 252   near-white
```

---

**9. Plum & Rose**
Vibe: creative, sophisticated, bold

```
nav-bg:          245, 240, 250   pale lavender
nav-fg:           38,  18,  45   deep plum near-black
nav-dim:         110,  80, 120   muted purple
content-bg:       38,  18,  55   deep eggplant
content-fg:      238, 225, 248   light lavender
accent:          232, 121, 249   fuchsia-400
content-surface:  58,  32,  78   slightly lighter eggplant
page-bg:         125,  90, 145   medium purple
bright:          254, 250, 255   near-white
```

---

**10. Steel & Arctic**
Vibe: modern, technical, sharp

```
nav-bg:          246, 247, 250   light warm white, blue tint
nav-fg:           15,  20,  35   dark navy-black
nav-dim:          80,  90, 115   slate
content-bg:       18,  28,  55   dark steel blue
content-fg:      218, 228, 248   pale arctic blue
accent:           99, 179, 237   blue-400 (electric blue)
content-surface:  28,  42,  80   slightly lighter steel blue
page-bg:          90, 110, 155   medium steel blue
bright:          248, 250, 255   near-white
```

---

### Section B — Light Mode (palettes 11–20)

> **Key structural difference from dark mode:**
>
> - `content-bg` is a **light** color
> - `content-fg` is **dark** (near-black family)
> - `content-surface` is **slightly darker** than `content-bg` (not lighter)
> - `accent` must be **dark enough** to read on the light `content-bg` (WCAG 4.5:1 for links)

---

**11. Paper & Ink**
Vibe: classic editorial, timeless

```
nav-bg:          244, 240, 229   warm cream
nav-fg:           14,  14,  14   near-black
nav-dim:          85,  85,  85   mid gray
content-bg:      255, 255, 253   clean near-white
content-fg:       22,  22,  22   near-black
accent:           13, 116, 103   teal-700 (dark teal)
content-surface: 238, 235, 228   warm light gray card
page-bg:         200, 196, 188   warm medium gray
bright:          255, 255, 255   white
```

---

**12. Blueprint**
Vibe: technical, structured, precise

```
nav-bg:          219, 232, 245   light steel blue
nav-fg:           10,  25,  60   deep navy
nav-dim:          70,  95, 140   medium blue
content-bg:      248, 250, 253   cool off-white
content-fg:       10,  25,  60   deep navy
accent:           29,  78, 216   blue-700 (indigo-blue)
content-surface: 224, 234, 245   light blue-tinted card
page-bg:         160, 185, 210   medium blue-gray
bright:          255, 255, 255   white
```

---

**13. Garden Path**
Vibe: botanical, organic, outdoors

```
nav-bg:          212, 228, 210   sage green
nav-fg:           20,  38,  18   dark forest
nav-dim:          80, 108,  78   muted forest green
content-bg:      248, 246, 240   warm linen
content-fg:       28,  38,  22   dark green-black
accent:          172,  58,  20   terracotta (dark on light)
content-surface: 234, 228, 215   slightly darker linen
page-bg:         162, 185, 158   medium sage
bright:          254, 254, 250   near-white
```

---

**14. Morning Coffee**
Vibe: cozy, warm, inviting

```
nav-bg:          225, 205, 178   warm tan
nav-fg:           35,  22,  10   espresso dark
nav-dim:         100,  75,  50   warm brown
content-bg:      254, 250, 243   creamy white
content-fg:       35,  22,  10   espresso
accent:          146,  64,  14   amber-800 (caramel-dark)
content-surface: 240, 232, 218   slightly darker cream
page-bg:         190, 168, 140   medium warm tan
bright:          255, 253, 248   near-white
```

---

**15. Birch Forest**
Vibe: naturalist, Scandinavian-light, airy

```
nav-bg:          240, 236, 228   warm off-white
nav-fg:           20,  32,  22   dark forest
nav-dim:          88, 102,  85   muted sage
content-bg:      245, 246, 245   cool light gray
content-fg:       22,  32,  24   near-black, green tint
accent:           21,  90,  30   green-800 (deep forest)
content-surface: 225, 228, 224   slightly darker light gray
page-bg:         175, 185, 172   medium sage gray
bright:          255, 255, 254   near-white
```

---

**16. Periwinkle**
Vibe: refined, calm, creative

```
nav-bg:          228, 225, 245   pale lavender
nav-fg:           25,  18,  50   deep violet near-black
nav-dim:          98,  85, 140   muted purple
content-bg:      252, 251, 255   near-white, purple tint
content-fg:       25,  18,  50   deep violet text
accent:           88,  28, 135   purple-800 (deep violet)
content-surface: 236, 232, 248   lavender-tinted card
page-bg:         175, 168, 210   medium lavender
bright:          255, 255, 255   white
```

---

**17. Seashell**
Vibe: Mediterranean coast, warm, relaxed

```
nav-bg:          238, 216, 198   sandy peach
nav-fg:           45,  22,  12   dark sienna
nav-dim:         120,  80,  60   warm brown
content-bg:      254, 248, 242   warm cream
content-fg:       45,  22,  12   sienna text
accent:          140,  40,  10   sienna-700 (dark rust)
content-surface: 240, 228, 215   slightly darker cream card
page-bg:         192, 160, 135   medium warm tan
bright:          255, 252, 248   near-white
```

---

**18. Misty Mountain**
Vibe: clean, minimal, focus

```
nav-bg:          220, 223, 228   cool light gray, blue tint
nav-fg:           15,  22,  35   near-black, blue tint
nav-dim:          80,  93, 110   blue-gray
content-bg:      255, 255, 255   pure white
content-fg:       15,  22,  35   near-black
accent:           30,  80, 160   blue-700 (slate blue)
content-surface: 238, 241, 246   very light blue-gray card
page-bg:         172, 178, 190   medium blue-gray
bright:          255, 255, 255   white
```

---

**19. Meadow**
Vibe: fresh, energetic, sporty

```
nav-bg:          210, 240, 220   pale mint
nav-fg:           12,  35,  18   dark forest near-black
nav-dim:          60, 105,  72   medium green
content-bg:      248, 252, 248   warm white, green tint
content-fg:       12,  35,  18   dark forest text
accent:           22, 130,  48   green-600 (vivid green)
content-surface: 228, 242, 230   light mint card
page-bg:         148, 195, 162   medium mint green
bright:          254, 255, 254   near-white
```

---

**20. Sunset Blush**
Vibe: elegant, festive, warm

```
nav-bg:          245, 220, 220   pale rose
nav-fg:           45,  15,  20   dark burgundy near-black
nav-dim:         120,  65,  72   muted rose
content-bg:      255, 249, 248   warm cream-white
content-fg:       45,  15,  20   dark burgundy text
accent:          130,  15,  40   red-900 (dark burgundy)
content-surface: 240, 225, 224   blush-tinted card
page-bg:         195, 158, 158   medium rose
bright:          255, 255, 255   white
```

---

## Implementation Instructions

### Step 1 — Create `palette-showcase.html` at workspace root

The file must be **completely self-contained** (no CDN, no external images, no JS files).

### Step 2 — File structure skeleton

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>rouletabille.fr — Colour Palette Showcase</title>
    <style>
      /* === Base showcase chrome styles === */
      /* === Palette card component styles (use var(--palette-*) throughout) === */
    </style>
  </head>
  <body>
    <header>...</header>
    <!-- Legend: explains 4 components + 9 token roles -->

    <section class="mode-section">
      <h2>🌑 Dark Mode Palettes</h2>
      <div class="palette-grid">
        <div class="palette-card p1">...</div>
        <!-- ... p2 through p10 -->
      </div>
    </section>

    <section class="mode-section">
      <h2>☀️ Light Mode Palettes</h2>
      <div class="palette-grid">
        <div class="palette-card p11">...</div>
        <!-- ... p12 through p20 -->
      </div>
    </section>

    <script>
      /* WCAG contrast ratio calculation — runs once on load, fills badges */
    </script>
  </body>
</html>
```

### Step 3 — CSS scoping pattern for palette tokens

```css
/* Base card reads all tokens via var() */
.palette-card {
  --palette-nav-bg: 244, 240, 229; /* default fallback */
  /* ... etc */
}

/* Each card overrides all 9 tokens */
.p1 {
  --palette-nav-bg: 244, 240, 229;
  --palette-nav-fg: 14, 14, 14; /* ... */
}
.p2 {
  --palette-nav-bg: 247, 248, 250;
  --palette-nav-fg: 15, 23, 42; /* ... */
}
/* etc. */
```

All inner component HTML uses `rgb(var(--palette-nav-bg))` etc., matching the real site token pattern exactly.

### Step 4 — Mini site layout inside each card

```
┌── .card-demo (display:flex, height ~260px) ──────────────────┐
│  .demo-nav (width:130px, background: rgb(var(--palette-nav-bg))) │
│  .demo-content (flex:1, background: rgb(var(--palette-content-bg))) │
└──────────────────────────────────────────────────────────────────┘
```

Inside `.demo-nav`:

- Site icon placeholder (circle, `background: rgb(var(--palette-accent))`)
- Site name (`color: rgb(var(--palette-nav-fg))`, font: monospace bold)
- Subtitle (`color: rgb(var(--palette-nav-dim))`, smaller)
- `<hr>` styled with `border-color: rgba(var(--palette-nav-fg), 0.15)`
- 3 nav links: one with `padding-left: 1.2em` to simulate hover + `::before` arrow in accent color
- "Adhérer" link after another `<hr>`

Inside `.demo-content`:

- `<h1>` in `rgb(var(--palette-accent))`
- `<p>` in `rgb(var(--palette-content-fg))`
- `<a>` in `rgb(var(--palette-accent))`
- `.demo-card` block with `background: rgb(var(--palette-content-surface))`, `border-radius: 6px`, `padding: 10px`
  - `<h2>` in accent, `<p>` in content-fg

### Step 5 — Swatch row

Nine `<span>` elements, each:

```html
<span
  class="swatch"
  style="background: rgb(var(--palette-nav-bg))"
  title="nav-bg"
></span>
```

Label below each swatch showing token name (font-size: 9px, monospace).

### Step 6 — WCAG badge (inline JS)

```js
document.querySelectorAll('.palette-card').forEach((card) => {
  const style = getComputedStyle(card);
  const get = (token) =>
    style.getPropertyValue(token).trim().split(',').map(Number);
  const navBg = get('--palette-nav-bg');
  const navFg = get('--palette-nav-fg');
  const cBg = get('--palette-content-bg');
  const cFg = get('--palette-content-fg');
  // compute ratios, set .badge-nav and .badge-content textContent + color
});
```

### Step 7 — Verify

Open `palette-showcase.html` directly in browser (no server needed — it's fully static).
Check:

1. All 20 cards render with correct colors
2. Dark mode cards: nav light, content dark
3. Light mode cards: nav tinted, content light, text dark
4. Accent is visible in both demo zones of every card
5. WCAG badges show computed ratios

---

## Files NOT to modify

- `src/_includes/webc/pagestyle.webc` — live site styles, read-only reference
- `src/_includes/webc/header.webc` — live site nav component
- `src/_includes/webc/card.webc` — live site card component
- Everything else under `src/`

---

## Output file

`c:\_work\rouletabille.fr\palette-showcase.html`
