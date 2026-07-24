# Palette Showcase Refactor — Resume Brief

> **Purpose:** self-contained handoff so a fresh Copilot session can pick up
> the palette showcase refactor without needing prior conversation context.
> Read this file first, then follow "Next steps" at the bottom.

---

## 1. Where we are

| Phase                                              | Status             | Notes                                                                                                                                                                                                                                  |
| -------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 1 — Data-driven refactor**                 | ✅ Done + verified | `palette-showcase.html` now renders 28 palettes from a `PALETTES` array. Was 3864 lines → 1256 lines. `npm run build:dev` exits 0. Playwright confirmed 28 cards, 4 sections, 84/84 badges pass.                                       |
| **Phase 2 — Sticky menu + filter chips**           | ✅ Done + verified | Menu has section anchors + 4 mode-filter chips (Light nav / Dark nav / Dark content / Light content). Responsive hamburger < 700 px. Filter round-trip verified with Playwright.                                                       |
| **Phase 3 — Add 71 new palettes**                  | 🟡 Partial         | `SECTION_META` extended A→P (16 sections). `SECTION_ORDER` extended. Hero text updated to "Ninety-nine palettes across sixteen themed sections". **The 71 palette objects (p29–p99) have NOT been added to the `PALETTES` array yet.** |
| **Phase 3.5 — Update `palette-showcase-brief.md`** | ❌ Not started     | Companion doc still describes pre-refactor architecture and only 28 palettes.                                                                                                                                                          |

`palette-showcase.html` is currently **1430 lines**. Loading it in a browser today will render 28 cards but the menu will show anchor links for **all 16 sections** (E–P will resolve to empty sections that get `hidden` attribute by `updateCounts()`, so they won't visually appear — safe intermediate state).

---

## 2. Files & key locations

### `c:\_work\rouletabille.fr\palette-showcase.html`

| Location        | Contents                                                                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lines ~1–560    | HTML shell, hero, all CSS (design tokens, layout, menu, hamburger, card)                                                                                             |
| lines ~561–605  | `<main id="showcase">` (empty; renderer fills it)                                                                                                                    |
| line ~606       | Start of `<script>`                                                                                                                                                  |
| lines ~615–640  | `SECTION_META` (A→P)                                                                                                                                                 |
| lines ~625–642  | `SECTION_ORDER = ['A' … 'P']`                                                                                                                                        |
| lines ~648–655  | `MODE_LABEL` mapping (LN-DC, LN-LC, DN-DC, DN-LC → 'DARK' / 'LIGHT')                                                                                                 |
| line **656**    | `const PALETTES = [`                                                                                                                                                 |
| lines ~657–1120 | Palettes p1–p28, grouped by `// ---------- Section X ---------- ` comments                                                                                           |
| line ~1120      | `];` (closing bracket — **insert new palettes just before this**)                                                                                                    |
| lines ~1121–end | `injectPaletteVars()`, `renderPalettes()`, `cardMarkup()`, `luminance()`, `contrast()`, `computeBadges()`, `renderMenu()`, `updateCounts()`, `initMenu()`, init call |

### `c:\_work\rouletabille.fr\palette-showcase-brief.md`

Design brief for the original 28 palettes. Sections A–D only. Post-Phase-3 rewrite pending.

### `c:\_work\rouletabille.fr\new-palettes-plan.md`

May contain earlier exploration notes — check before starting Phase 3 in case there are RGB values worth reusing.

---

## 3. `PALETTES` schema (data-driven contract)

Each entry:

```js
{
  id: 'p29',                    // sequential, must be unique
  section: 'E',                 // must exist in SECTION_META
  name: 'Cyberpunk Alley',      // English, title case
  tagline: 'Neon on wet asphalt',
  mode: 'DN-LC',                // one of LN-DC | LN-LC | DN-DC | DN-LC
  tokens: {
    'nav-bg':          [r, g, b],
    'nav-fg':          [r, g, b],
    'nav-dim':         [r, g, b],
    'content-bg':      [r, g, b],
    'content-fg':      [r, g, b],
    accent:            [r, g, b],
    'content-surface': [r, g, b],
    'page-bg':         [r, g, b],
    bright:            [r, g, b],
  },
},
```

### Mode conventions

| Code    | Nav       | Content       | Vibe                               |
| ------- | --------- | ------------- | ---------------------------------- |
| `LN-DC` | Light nav | Dark content  | Baseline dark (original site look) |
| `LN-LC` | Light nav | Light content | Baseline light                     |
| `DN-DC` | Dark nav  | Dark content  | Cohesive full-dark, OLED, gothic   |
| `DN-LC` | Dark nav  | Light content | Dramatic tonal split, editorial    |

### WCAG AA targets (enforced by `computeBadges()`, must all pass)

- `nav-bg` vs `nav-fg` — ratio ≥ **4.5:1** (body text)
- `content-bg` vs `content-fg` — ratio ≥ **4.5:1** (body text)
- `content-bg` vs `accent` — ratio ≥ **4.5:1** preferred; **3:1 floor** acceptable for large UI

### Rules of thumb when designing tokens

- Dark content bg (`DC`): use `content-bg` L* ≤ 25, `content-fg` L* ≥ 88, accent must be luminous (≥ ~55 L*).
- Light content bg (`LC`): use `content-bg` L* ≥ 92, `content-fg` L* ≤ 25, accent must be deep (≤ ~35 L*).
- `nav-dim` between fg and bg (used for muted nav items) — usually 30–50% blend.
- `content-surface` slightly offset from `content-bg` (raised card surface).
- `page-bg` framing color visible around the layout — mid-tone that matches the palette identity.
- `bright` near-white or near-black used for max-contrast accents inside content.

---

## 4. The 71 palettes to add (design targets)

**All RGB triplets still need to be designed.** The previous session planned names, sections, and mode targets but never persisted concrete RGB values. When designing each palette, verify contrast with the same math the page uses (sRGB → relative luminance → `(L1+0.05)/(L2+0.05)` — see `luminance()` and `contrast()` inside the script). Fastest workflow: add the palette to `PALETTES`, reload the page, look at the badges — any red ✗ means nudge that token and reload.

### Section E — Flashy / Neon / Vibrant (6 palettes, p29–p34)

Emoji `⚡`. Suggested mode mix: 3× DN-LC, 2× LN-DC, 1× DN-DC.

| id  | Name                | Vibe                                  | Mode target |
| --- | ------------------- | ------------------------------------- | ----------- |
| p29 | Cyberpunk Alley     | Magenta + cyan on wet asphalt         | DN-LC       |
| p30 | Vaporwave Miami     | Pink/teal sunset, chrome text         | LN-DC       |
| p31 | Rave Acid           | Neon green + hot pink, black bg       | DN-DC       |
| p32 | Synthwave Sunset    | Purple → orange gradient, ink content | LN-DC       |
| p33 | Neon Tokyo          | Kanji red + electric blue on charcoal | DN-LC       |
| p34 | Electric Watermelon | Hot pink + lime on cream              | DN-LC       |

### Section F — Gloomy / Gothic / Moody (6 palettes, p35–p40)

Emoji `🕯️`. Mostly `DN-DC` (full-dark) with 1 `LN-DC`.

| id  | Name             | Vibe                                      | Mode target |
| --- | ---------------- | ----------------------------------------- | ----------- |
| p35 | Obsidian & Blood | Ink black + arterial red accent           | DN-DC       |
| p36 | Storm Cloud      | Slate greys, weak yellow lightning accent | LN-DC       |
| p37 | Volcanic Ash     | Charcoal + molten orange embers           | DN-DC       |
| p38 | Sepulcher        | Deep purple + tomb grey + candlelight     | DN-DC       |
| p39 | Coal Mine        | Anthracite + soot + safety-lamp amber     | DN-DC       |
| p40 | Black Iris       | Very dark violet + iridescent teal        | DN-DC       |

### Section G — Manga / Anime (6 palettes, p41–p46)

Emoji `📓`. Mixed modes; strong ink contrast.

| id  | Name                | Vibe                                   | Mode target |
| --- | ------------------- | -------------------------------------- | ----------- |
| p41 | Shonen Impact       | Manga ink, screentone grey, action red | LN-LC       |
| p42 | Shojo Petal         | Sparkles pink + lilac + ink            | LN-LC       |
| p43 | Studio Night        | Studio-Ghibli-esque teal + warm ink    | LN-DC       |
| p44 | Berserk Iron        | Rust brown + steel + parchment         | DN-LC       |
| p45 | Cyberpunk Neo-Tokyo | Neon signs on rainy night              | DN-DC       |
| p46 | Chibi Pastel        | Soft yellow + baby blue + chibi pink   | LN-LC       |

### Section H — Zen / Japandi (6 palettes, p47–p52)

Emoji `🍵`. Restrained, natural, mostly `LN-LC`.

| id  | Name            | Vibe                                   | Mode target |
| --- | --------------- | -------------------------------------- | ----------- |
| p47 | Sumi-e Ink      | Bone white paper, sumi ink, seal red   | LN-LC       |
| p48 | Wabi-sabi       | Clay + weathered plaster + rust accent | LN-LC       |
| p49 | Matcha Ceremony | Matcha green + kraft + cast iron       | LN-LC       |
| p50 | Ink Wash Night  | Deep indigo + rice paper + moonstone   | DN-LC       |
| p51 | Ryoan-ji Stone  | Raked-sand beige + stone grey + moss   | LN-LC       |
| p52 | Kyoto Twilight  | Deep plum sky + lantern gold           | DN-DC       |

### Section I — High Contrast / OLED (5 palettes, p53–p57)

Emoji `⬛`. Extreme contrast studies. Great for accessibility test.

| id  | Name            | Vibe                                    | Mode target |
| --- | --------------- | --------------------------------------- | ----------- |
| p53 | Pure OLED       | True black + pure white + cyan          | DN-DC       |
| p54 | Traffic Signal  | Green/yellow/red on black               | DN-DC       |
| p55 | Newspaper       | Newsprint cream + solid black + red ink | LN-LC       |
| p56 | Blueprint Sharp | Cyan blueprint + chalk white            | DN-DC       |
| p57 | Panda Mono      | Pure black + pure white + one primary   | LN-DC       |

### Section J — Retro / Nostalgic (6 palettes, p58–p63)

Emoji `📼`. Era-specific palettes.

| id  | Name           | Vibe                               | Mode target |
| --- | -------------- | ---------------------------------- | ----------- |
| p58 | CRT Phosphor   | Green-on-black terminal            | DN-DC       |
| p59 | Amber Terminal | Amber-on-black IBM 3270            | DN-DC       |
| p60 | 60s Mod        | Mustard + teal + cream + brown     | LN-LC       |
| p61 | 70s Harvest    | Avocado + harvest gold + rust      | LN-LC       |
| p62 | 90s Grunge     | Flannel red + moss + denim + bone  | LN-DC       |
| p63 | Y2K Chrome     | Aqua + silver + iridescent + white | LN-LC       |

### Section K — Nature Phenomena (6 palettes, p64–p69)

Emoji `🌌`. Landscape drama.

| id  | Name            | Vibe                                 | Mode target |
| --- | --------------- | ------------------------------------ | ----------- |
| p64 | Aurora Borealis | Deep navy sky + green/magenta aurora | DN-DC       |
| p65 | Abyssal Ocean   | Trench blues + bioluminescent cyan   | DN-DC       |
| p66 | Sakura Midnight | Midnight blue + cherry-blossom pink  | DN-LC       |
| p67 | Glacier Dawn    | Ice blue + pale rose + platinum      | LN-LC       |
| p68 | Blood Moon      | Eclipse red + charcoal + copper      | DN-DC       |
| p69 | Desert Storm    | Ochre + sand + dust + sky            | LN-LC       |

### Section L — Editorial Art Movements (6 palettes, p70–p75)

Emoji `🎨`. Reference art history.

| id  | Name             | Vibe                                    | Mode target |
| --- | ---------------- | --------------------------------------- | ----------- |
| p70 | Bauhaus          | Primary red/yellow/blue + black + white | LN-LC       |
| p71 | Mondrian         | Same but sharper white bg               | LN-LC       |
| p72 | Klimt Gold       | Gold leaf + burnt umber + jewel accents | DN-LC       |
| p73 | Rothko Chapel    | Layered dark maroons + charcoal         | DN-DC       |
| p74 | Ukiyo-e          | Woodblock ink + prussian blue + coral   | LN-LC       |
| p75 | Art Deco Peacock | Emerald + gold + black + ivory          | DN-LC       |

### Section M — Dark Nav Showcase (10 palettes, p76–p85)

Emoji `🌒`. **All dark-nav** — this section exists to showcase DN-* modes.
Split ~50/50 between `DN-DC` (cohesive) and `DN-LC` (dramatic split).

| id  | Name                | Vibe                                        | Mode target |
| --- | ------------------- | ------------------------------------------- | ----------- |
| p76 | Terminal Green      | Dark chrome + phosphor green + off-white    | DN-DC       |
| p77 | Console Amber       | Dark chrome + amber CRT + parchment content | DN-LC       |
| p78 | Deep Ocean          | Navy nav + midnight content + coral accent  | DN-DC       |
| p79 | Cinema              | Theater black nav + charcoal content + red  | DN-DC       |
| p80 | Vault               | Steel nav + light concrete content          | DN-LC       |
| p81 | Onyx & Copper       | Onyx nav + warm ivory content + copper      | DN-LC       |
| p82 | Slate & Ivory       | Slate nav + ivory content + navy accent     | DN-LC       |
| p83 | Espresso & Cream    | Espresso nav + cream content + caramel      | DN-LC       |
| p84 | Midnight Broadsheet | Ink nav + newsprint content + red ink       | DN-LC       |
| p85 | Gothic Study        | Deep green nav + parchment content + gold   | DN-LC       |

### Section N — Cultural Inspirations (6 palettes, p86–p91)

Emoji `🌍`. Regional palettes.

| id  | Name               | Vibe                                 | Mode target |
| --- | ------------------ | ------------------------------------ | ----------- |
| p86 | Marrakech Souk     | Terracotta + saffron + indigo + bone | LN-LC       |
| p87 | Havana Sunrise     | Faded turquoise + coral + mustard    | LN-LC       |
| p88 | Provençal Lavender | Lavender fields + limestone + olive  | LN-LC       |
| p89 | Scandi Fika        | White + birch + cinnamon + berry     | LN-LC       |
| p90 | Andes Alpaca       | Undyed wool + cochineal red + sky    | LN-LC       |
| p91 | Kabuki Curtain     | Persimmon + black + moss + gold      | DN-LC       |

### Section O — Food & Drink (4 palettes, p92–p95)

Emoji `☕`. Delicious.

| id  | Name             | Vibe                             | Mode target |
| --- | ---------------- | -------------------------------- | ----------- |
| p92 | Matcha Latte     | Matcha + oat milk + ceramic      | LN-LC       |
| p93 | Blood Orange     | Blood-orange flesh + peel + pith | LN-LC       |
| p94 | Wine Bar         | Bordeaux + candlelight + oak     | DN-DC       |
| p95 | Cocoa & Cardamom | Cocoa + cardamom green + cream   | LN-LC       |

### Section P — Sport & Performance (4 palettes, p96–p99)

Emoji `🚴`. Ties back to the rouletabille identity.

| id  | Name         | Vibe                                   | Mode target |
| --- | ------------ | -------------------------------------- | ----------- |
| p96 | Cyclist Neon | Hi-vis yellow + safety orange + carbon | LN-DC       |
| p97 | Track Lane   | Wood-track amber + white lanes + red   | LN-LC       |
| p98 | Alpine       | Peak white + rock grey + glacier blue  | LN-LC       |
| p99 | Velodrome    | Track blue + medal gold + wood + white | DN-LC       |

**Target mode distribution across the full 99 palettes** (approximate — adjust as needed): LN-DC ~33 · LN-LC ~30 · DN-DC ~22 · DN-LC ~14.

---

## 5. Known gotchas (do not re-introduce)

### 5.1 `updateCounts()` visibility detection

`updateCounts()` **must** use:

```js
const visible = section
  .querySelectorAll('.palette-card')
  .filter((c) => getComputedStyle(c).display !== 'none');
```

**Do not** use `c.offsetParent !== null` — once a section is toggled to `hidden` by the count logic, its cards' `offsetParent` becomes `null`, so the section stays hidden forever after any filter change.

### 5.2 File is not touched by the site build

`palette-showcase.html` lives at workspace root, not in `src/`. `npm run build:dev` won't copy it to `dist/`. Open it directly:

```
file:///c:/_work/rouletabille.fr/palette-showcase.html
```

Still run `npm run build:dev` after any change to catch regressions in the actual site (must exit 0).

### 5.3 Self-contained file

No CDN, no external images, no external JS/CSS. Everything inlined. Keep it that way.

---

## 6. Next steps (in order)

### Step 1 — Design + insert the 71 palettes

1. Open `palette-showcase.html`.
2. Find the closing `];` of the `PALETTES` array (currently around line 1120, immediately after `p28`'s object).
3. For each section E–P, append a `// ---------- Section X — Title ----------` comment then the palette objects.
4. Design each palette's 9 RGB triplets to hit the WCAG targets in §3. Reference existing p1–p28 for stylistic conventions.
5. **Verify per palette:** save file, reload the browser page, look at the three badges on that card. All must be green (✓). Nudge any red (✗) token and reload.
6. When all 99 palettes are in, run:

   ```powershell
   npm run build:dev
   ```

   Confirm exit 0.

7. Reload the showcase in a browser (or Playwright) and verify:
   - Menu shows 16 anchor links with non-zero counts.
   - 99 palette cards visible when all 4 filter chips are ON.
   - No red ✗ badges in the browser console log (the script logs a summary).
   - Filter combinations still work (round-trip: uncheck → check → same count).

### Step 2 — Update the companion brief

Edit `c:\_work\rouletabille.fr\palette-showcase-brief.md`:

1. Rewrite the **Implementation Instructions** section to describe the data-driven pattern (PALETTES array + renderer, no more hand-written cards).
2. Bump the **Verify** count from "28 cards" to "99 cards".
3. Append sections E–P with the same format used for A–D (bold name + Vibe + 9 RGB lines per palette), using the RGB values you designed in Step 1.
4. Add a **Menu & filters** subsection describing the sticky nav + 4 filter chips + responsive hamburger.
5. Add a **Nav modes** subsection defining `LN-DC` / `LN-LC` / `DN-DC` / `DN-LC` (copy §3 table above).

### Step 3 — Final sanity

```powershell
npm run lint    # auto-fix
npm run build:dev  # exit 0
```

Commit as a single logical change (or two: one for the palettes, one for the brief).

---

## 7. Verification checklist (final)

- [ ] `palette-showcase.html` renders exactly 99 cards.
- [ ] Menu has 16 anchor links, each with a non-zero count.
- [ ] Every card shows three green ✓ WCAG badges.
- [ ] All 4 filter chips work independently and combined; unchecking then rechecking restores full count.
- [ ] Sections with 0 visible cards get the `hidden` attribute.
- [ ] Responsive: at < 700 px viewport the menu collapses to a hamburger.
- [ ] `npm run build:dev` exits 0.
- [ ] `palette-showcase-brief.md` matches the final palette set and architecture.
