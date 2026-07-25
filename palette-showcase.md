# rouletabille.fr — Palette Showcase

> **Keep this file in sync with [`src/public/palette-showcase.html`](src/public/palette-showcase.html).** The interactive showcase page and this Markdown catalogue share the same palette data. Any addition, removal, or value change made here **must** be mirrored in the `PALETTES` array inside `palette-showcase.html` — and vice-versa. The two files are the canonical reference for the site's design tokens and should never drift.

Each palette below is defined by nine CSS custom properties (exposed in the showcase as `--palette-<token>`). Values are given as the raw `r, g, b` triple used inside `rgb()` and as the equivalent `#RRGGBB` hex code for quick reference.

## 🌑 Section A — Baseline Dark

### Charcoal & Ember

_Earthy, baseline reference_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 244, 240, 229 | `#F4F0E5` |
| `--palette-nav-fg`          | 14, 14, 14    | `#0E0E0E` |
| `--palette-nav-dim`         | 85, 85, 85    | `#555555` |
| `--palette-content-bg`      | 37, 37, 37    | `#252525` |
| `--palette-content-fg`      | 239, 239, 239 | `#EFEFEF` |
| `--palette-accent`          | 224, 92, 0    | `#E05C00` |
| `--palette-content-surface` | 52, 47, 45    | `#342F2D` |
| `--palette-page-bg`         | 160, 153, 135 | `#A09987` |
| `--palette-bright`          | 254, 254, 254 | `#FEFEFE` |

### Marine & Ivory

_Nautical, athletic, clean_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 247, 248, 250 | `#F7F8FA` |
| `--palette-nav-fg`          | 15, 23, 42    | `#0F172A` |
| `--palette-nav-dim`         | 71, 85, 105   | `#475569` |
| `--palette-content-bg`      | 15, 23, 42    | `#0F172A` |
| `--palette-content-fg`      | 226, 232, 240 | `#E2E8F0` |
| `--palette-accent`          | 56, 189, 248  | `#38BDF8` |
| `--palette-content-surface` | 30, 41, 59    | `#1E293B` |
| `--palette-page-bg`         | 100, 116, 139 | `#64748B` |
| `--palette-bright`          | 248, 250, 252 | `#F8FAFC` |

### Forest & Mist

_Nature, outdoors, organic_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 249, 245 | `#F8F9F5` |
| `--palette-nav-fg`          | 20, 30, 20    | `#141E14` |
| `--palette-nav-dim`         | 80, 95, 80    | `#505F50` |
| `--palette-content-bg`      | 18, 40, 22    | `#122816` |
| `--palette-content-fg`      | 220, 240, 222 | `#DCF0DE` |
| `--palette-accent`          | 132, 204, 22  | `#84CC16` |
| `--palette-content-surface` | 28, 55, 32    | `#1C3720` |
| `--palette-page-bg`         | 90, 120, 90   | `#5A785A` |
| `--palette-bright`          | 254, 255, 254 | `#FEFFFE` |

### Dusk & Coral

_Evening warmth, creative_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 242, 237, 230 | `#F2EDE6` |
| `--palette-nav-fg`          | 30, 20, 25    | `#1E1419` |
| `--palette-nav-dim`         | 100, 80, 85   | `#645055` |
| `--palette-content-bg`      | 45, 20, 40    | `#2D1428` |
| `--palette-content-fg`      | 240, 225, 235 | `#F0E1EB` |
| `--palette-accent`          | 251, 113, 133 | `#FB7185` |
| `--palette-content-surface` | 65, 35, 58    | `#41233A` |
| `--palette-page-bg`         | 135, 90, 115  | `#875A73` |
| `--palette-bright`          | 255, 250, 252 | `#FFFAFC` |

### Nordic Ice

_Scandinavian minimal, crisp_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 247, 252 | `#F5F7FC` |
| `--palette-nav-fg`          | 15, 25, 50    | `#0F1932` |
| `--palette-nav-dim`         | 80, 95, 130   | `#505F82` |
| `--palette-content-bg`      | 20, 30, 65    | `#141E41` |
| `--palette-content-fg`      | 210, 225, 248 | `#D2E1F8` |
| `--palette-accent`          | 34, 211, 238  | `#22D3EE` |
| `--palette-content-surface` | 30, 45, 85    | `#1E2D55` |
| `--palette-page-bg`         | 95, 115, 160  | `#5F73A0` |
| `--palette-bright`          | 248, 252, 255 | `#F8FCFF` |

### Terra & Sand

_Mediterranean, earth, warm_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 243, 236, 218 | `#F3ECDA` |
| `--palette-nav-fg`          | 42, 30, 18    | `#2A1E12` |
| `--palette-nav-dim`         | 110, 85, 65   | `#6E5541` |
| `--palette-content-bg`      | 55, 30, 20    | `#371E14` |
| `--palette-content-fg`      | 240, 225, 210 | `#F0E1D2` |
| `--palette-accent`          | 245, 158, 11  | `#F59E0B` |
| `--palette-content-surface` | 75, 45, 33    | `#4B2D21` |
| `--palette-page-bg`         | 155, 120, 90  | `#9B785A` |
| `--palette-bright`          | 254, 250, 244 | `#FEFAF4` |

### Midnight & Gold

_Classic, elegant, luxury_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 242, 243, 244 | `#F2F3F4` |
| `--palette-nav-fg`          | 12, 12, 15    | `#0C0C0F` |
| `--palette-nav-dim`         | 90, 90, 100   | `#5A5A64` |
| `--palette-content-bg`      | 10, 10, 12    | `#0A0A0C` |
| `--palette-content-fg`      | 235, 235, 230 | `#EBEBE6` |
| `--palette-accent`          | 234, 179, 8   | `#EAB308` |
| `--palette-content-surface` | 22, 22, 28    | `#16161C` |
| `--palette-page-bg`         | 80, 80, 90    | `#50505A` |
| `--palette-bright`          | 254, 254, 252 | `#FEFEFC` |

### Jade & Stone

_Fresh, organic, spa-like_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 246, 247, 243 | `#F6F7F3` |
| `--palette-nav-fg`          | 18, 35, 28    | `#12231C` |
| `--palette-nav-dim`         | 75, 100, 88   | `#4B6458` |
| `--palette-content-bg`      | 15, 50, 45    | `#0F322D` |
| `--palette-content-fg`      | 215, 240, 235 | `#D7F0EB` |
| `--palette-accent`          | 52, 211, 153  | `#34D399` |
| `--palette-content-surface` | 25, 70, 63    | `#19463F` |
| `--palette-page-bg`         | 80, 130, 118  | `#508276` |
| `--palette-bright`          | 248, 255, 252 | `#F8FFFC` |

### Plum & Rose

_Creative, sophisticated, bold_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 240, 250 | `#F5F0FA` |
| `--palette-nav-fg`          | 38, 18, 45    | `#26122D` |
| `--palette-nav-dim`         | 110, 80, 120  | `#6E5078` |
| `--palette-content-bg`      | 38, 18, 55    | `#261237` |
| `--palette-content-fg`      | 238, 225, 248 | `#EEE1F8` |
| `--palette-accent`          | 232, 121, 249 | `#E879F9` |
| `--palette-content-surface` | 58, 32, 78    | `#3A204E` |
| `--palette-page-bg`         | 125, 90, 145  | `#7D5A91` |
| `--palette-bright`          | 254, 250, 255 | `#FEFAFF` |

### Steel & Arctic

_Modern, technical, sharp_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 246, 247, 250 | `#F6F7FA` |
| `--palette-nav-fg`          | 15, 20, 35    | `#0F1423` |
| `--palette-nav-dim`         | 80, 90, 115   | `#505A73` |
| `--palette-content-bg`      | 18, 28, 55    | `#121C37` |
| `--palette-content-fg`      | 218, 228, 248 | `#DAE4F8` |
| `--palette-accent`          | 99, 179, 237  | `#63B3ED` |
| `--palette-content-surface` | 28, 42, 80    | `#1C2A50` |
| `--palette-page-bg`         | 90, 110, 155  | `#5A6E9B` |
| `--palette-bright`          | 248, 250, 255 | `#F8FAFF` |

## ☀️ Section B — Baseline Light

### Paper & Ink

_Classic editorial, timeless_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 244, 240, 229 | `#F4F0E5` |
| `--palette-nav-fg`          | 14, 14, 14    | `#0E0E0E` |
| `--palette-nav-dim`         | 85, 85, 85    | `#555555` |
| `--palette-content-bg`      | 255, 255, 253 | `#FFFFFD` |
| `--palette-content-fg`      | 22, 22, 22    | `#161616` |
| `--palette-accent`          | 13, 116, 103  | `#0D7467` |
| `--palette-content-surface` | 238, 235, 228 | `#EEEBE4` |
| `--palette-page-bg`         | 200, 196, 188 | `#C8C4BC` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Blueprint

_Technical, structured, precise_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 219, 232, 245 | `#DBE8F5` |
| `--palette-nav-fg`          | 10, 25, 60    | `#0A193C` |
| `--palette-nav-dim`         | 70, 95, 140   | `#465F8C` |
| `--palette-content-bg`      | 248, 250, 253 | `#F8FAFD` |
| `--palette-content-fg`      | 10, 25, 60    | `#0A193C` |
| `--palette-accent`          | 29, 78, 216   | `#1D4ED8` |
| `--palette-content-surface` | 224, 234, 245 | `#E0EAF5` |
| `--palette-page-bg`         | 160, 185, 210 | `#A0B9D2` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Garden Path

_Botanical, organic, outdoors_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 212, 228, 210 | `#D4E4D2` |
| `--palette-nav-fg`          | 20, 38, 18    | `#142612` |
| `--palette-nav-dim`         | 80, 108, 78   | `#506C4E` |
| `--palette-content-bg`      | 248, 246, 240 | `#F8F6F0` |
| `--palette-content-fg`      | 28, 38, 22    | `#1C2616` |
| `--palette-accent`          | 172, 58, 20   | `#AC3A14` |
| `--palette-content-surface` | 234, 228, 215 | `#EAE4D7` |
| `--palette-page-bg`         | 162, 185, 158 | `#A2B99E` |
| `--palette-bright`          | 254, 254, 250 | `#FEFEFA` |

### Morning Coffee

_Cozy, warm, inviting_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 225, 205, 178 | `#E1CDB2` |
| `--palette-nav-fg`          | 35, 22, 10    | `#23160A` |
| `--palette-nav-dim`         | 100, 75, 50   | `#644B32` |
| `--palette-content-bg`      | 254, 250, 243 | `#FEFAF3` |
| `--palette-content-fg`      | 35, 22, 10    | `#23160A` |
| `--palette-accent`          | 146, 64, 14   | `#92400E` |
| `--palette-content-surface` | 240, 232, 218 | `#F0E8DA` |
| `--palette-page-bg`         | 190, 168, 140 | `#BEA88C` |
| `--palette-bright`          | 255, 253, 248 | `#FFFDF8` |

### Birch Forest

_Naturalist, Scandinavian-light, airy_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 240, 236, 228 | `#F0ECE4` |
| `--palette-nav-fg`          | 20, 32, 22    | `#142016` |
| `--palette-nav-dim`         | 88, 102, 85   | `#586655` |
| `--palette-content-bg`      | 245, 246, 245 | `#F5F6F5` |
| `--palette-content-fg`      | 22, 32, 24    | `#162018` |
| `--palette-accent`          | 21, 90, 30    | `#155A1E` |
| `--palette-content-surface` | 225, 228, 224 | `#E1E4E0` |
| `--palette-page-bg`         | 175, 185, 172 | `#AFB9AC` |
| `--palette-bright`          | 255, 255, 254 | `#FFFFFE` |

### Periwinkle

_Refined, calm, creative_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 228, 225, 245 | `#E4E1F5` |
| `--palette-nav-fg`          | 25, 18, 50    | `#191232` |
| `--palette-nav-dim`         | 98, 85, 140   | `#62558C` |
| `--palette-content-bg`      | 252, 251, 255 | `#FCFBFF` |
| `--palette-content-fg`      | 25, 18, 50    | `#191232` |
| `--palette-accent`          | 88, 28, 135   | `#581C87` |
| `--palette-content-surface` | 236, 232, 248 | `#ECE8F8` |
| `--palette-page-bg`         | 175, 168, 210 | `#AFA8D2` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Seashell

_Mediterranean coast, warm, relaxed_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 238, 216, 198 | `#EED8C6` |
| `--palette-nav-fg`          | 45, 22, 12    | `#2D160C` |
| `--palette-nav-dim`         | 120, 80, 60   | `#78503C` |
| `--palette-content-bg`      | 254, 248, 242 | `#FEF8F2` |
| `--palette-content-fg`      | 45, 22, 12    | `#2D160C` |
| `--palette-accent`          | 140, 40, 10   | `#8C280A` |
| `--palette-content-surface` | 240, 228, 215 | `#F0E4D7` |
| `--palette-page-bg`         | 192, 160, 135 | `#C0A087` |
| `--palette-bright`          | 255, 252, 248 | `#FFFCF8` |

### Misty Mountain

_Clean, minimal, focus_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 220, 223, 228 | `#DCDFE4` |
| `--palette-nav-fg`          | 15, 22, 35    | `#0F1623` |
| `--palette-nav-dim`         | 80, 93, 110   | `#505D6E` |
| `--palette-content-bg`      | 255, 255, 255 | `#FFFFFF` |
| `--palette-content-fg`      | 15, 22, 35    | `#0F1623` |
| `--palette-accent`          | 30, 80, 160   | `#1E50A0` |
| `--palette-content-surface` | 238, 241, 246 | `#EEF1F6` |
| `--palette-page-bg`         | 172, 178, 190 | `#ACB2BE` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Meadow

_Fresh, energetic, sporty_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 210, 240, 220 | `#D2F0DC` |
| `--palette-nav-fg`          | 12, 35, 18    | `#0C2312` |
| `--palette-nav-dim`         | 60, 105, 72   | `#3C6948` |
| `--palette-content-bg`      | 248, 252, 248 | `#F8FCF8` |
| `--palette-content-fg`      | 12, 35, 18    | `#0C2312` |
| `--palette-accent`          | 22, 130, 48   | `#168230` |
| `--palette-content-surface` | 228, 242, 230 | `#E4F2E6` |
| `--palette-page-bg`         | 148, 195, 162 | `#94C3A2` |
| `--palette-bright`          | 254, 255, 254 | `#FEFFFE` |

### Sunset Blush

_Elegant, festive, warm_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 220, 220 | `#F5DCDC` |
| `--palette-nav-fg`          | 45, 15, 20    | `#2D0F14` |
| `--palette-nav-dim`         | 120, 65, 72   | `#784148` |
| `--palette-content-bg`      | 255, 249, 248 | `#FFF9F8` |
| `--palette-content-fg`      | 45, 15, 20    | `#2D0F14` |
| `--palette-accent`          | 130, 15, 40   | `#820F28` |
| `--palette-content-surface` | 240, 225, 224 | `#F0E1E0` |
| `--palette-page-bg`         | 195, 158, 158 | `#C39E9E` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## ✨ Section C — Bonus Dark — Trend Research

### Cobalt Moonlight

_Polished, modern, technical_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 242, 246, 252 | `#F2F6FC` |
| `--palette-nav-fg`          | 10, 18, 42    | `#0A122A` |
| `--palette-nav-dim`         | 78, 98, 145   | `#4E6291` |
| `--palette-content-bg`      | 8, 18, 50     | `#081232` |
| `--palette-content-fg`      | 208, 222, 248 | `#D0DEF8` |
| `--palette-accent`          | 50, 218, 252  | `#32DAFC` |
| `--palette-content-surface` | 18, 32, 75    | `#12204B` |
| `--palette-page-bg`         | 52, 82, 148   | `#345294` |
| `--palette-bright`          | 248, 252, 255 | `#F8FCFF` |

### Velvet Orchard

_Moody, organic, earthy_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 246, 242, 230 | `#F6F2E6` |
| `--palette-nav-fg`          | 24, 28, 14    | `#181C0E` |
| `--palette-nav-dim`         | 92, 98, 68    | `#5C6244` |
| `--palette-content-bg`      | 22, 38, 18    | `#162612` |
| `--palette-content-fg`      | 222, 232, 208 | `#DEE8D0` |
| `--palette-accent`          | 212, 155, 38  | `#D49B26` |
| `--palette-content-surface` | 35, 55, 28    | `#23371C` |
| `--palette-page-bg`         | 85, 108, 62   | `#556C3E` |
| `--palette-bright`          | 255, 252, 238 | `#FFFCEE` |

### Saffron Noir

_Cinematic, editorial, bold_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 238, 222 | `#F5EEDE` |
| `--palette-nav-fg`          | 12, 10, 8     | `#0C0A08` |
| `--palette-nav-dim`         | 88, 78, 62    | `#584E3E` |
| `--palette-content-bg`      | 15, 12, 10    | `#0F0C0A` |
| `--palette-content-fg`      | 238, 228, 212 | `#EEE4D4` |
| `--palette-accent`          | 215, 95, 25   | `#D75F19` |
| `--palette-content-surface` | 28, 24, 20    | `#1C1814` |
| `--palette-page-bg`         | 72, 62, 50    | `#483E32` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

### Aurora Slate

_Modern, tech-forward, crisp_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 244, 244, 252 | `#F4F4FC` |
| `--palette-nav-fg`          | 20, 14, 52    | `#140E34` |
| `--palette-nav-dim`         | 98, 92, 158   | `#625C9E` |
| `--palette-content-bg`      | 18, 14, 58    | `#120E3A` |
| `--palette-content-fg`      | 215, 218, 248 | `#D7DAF8` |
| `--palette-accent`          | 42, 218, 208  | `#2ADAD0` |
| `--palette-content-surface` | 30, 25, 85    | `#1E1955` |
| `--palette-page-bg`         | 85, 88, 158   | `#55589E` |
| `--palette-bright`          | 248, 250, 255 | `#F8FAFF` |

## ☀️ Section D — Bonus Light — Trend Research

### Desert Bloom

_Tactile, approachable, warm_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 228, 210, 192 | `#E4D2C0` |
| `--palette-nav-fg`          | 55, 30, 15    | `#371E0F` |
| `--palette-nav-dim`         | 132, 98, 72   | `#846248` |
| `--palette-content-bg`      | 252, 245, 235 | `#FCF5EB` |
| `--palette-content-fg`      | 55, 30, 15    | `#371E0F` |
| `--palette-accent`          | 168, 72, 28   | `#A8481C` |
| `--palette-content-surface` | 238, 228, 215 | `#EEE4D7` |
| `--palette-page-bg`         | 192, 168, 142 | `#C0A88E` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Misty Orchard

_Calm, airy, botanical_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 218, 232, 215 | `#DAE8D7` |
| `--palette-nav-fg`          | 18, 42, 20    | `#122A14` |
| `--palette-nav-dim`         | 78, 112, 80   | `#4E7050` |
| `--palette-content-bg`      | 250, 250, 246 | `#FAFAF6` |
| `--palette-content-fg`      | 22, 42, 24    | `#162A18` |
| `--palette-accent`          | 28, 100, 42   | `#1C642A` |
| `--palette-content-surface` | 232, 236, 228 | `#E8ECE4` |
| `--palette-page-bg`         | 162, 188, 160 | `#A2BCA0` |
| `--palette-bright`          | 255, 255, 252 | `#FFFFFC` |

### Velvet Teal

_Restrained, premium, minimal_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 210, 228, 238 | `#D2E4EE` |
| `--palette-nav-fg`          | 14, 38, 58    | `#0E263A` |
| `--palette-nav-dim`         | 72, 112, 138  | `#48708A` |
| `--palette-content-bg`      | 248, 252, 254 | `#F8FCFE` |
| `--palette-content-fg`      | 14, 38, 58    | `#0E263A` |
| `--palette-accent`          | 12, 108, 140  | `#0C6C8C` |
| `--palette-content-surface` | 228, 240, 248 | `#E4F0F8` |
| `--palette-page-bg`         | 152, 188, 208 | `#98BCD0` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Rose Quartz Studio

_Fashion-forward, elegant, warm_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 242, 222, 228 | `#F2DEE4` |
| `--palette-nav-fg`          | 55, 18, 28    | `#37121C` |
| `--palette-nav-dim`         | 138, 82, 95   | `#8A525F` |
| `--palette-content-bg`      | 255, 250, 252 | `#FFFAFC` |
| `--palette-content-fg`      | 55, 18, 28    | `#37121C` |
| `--palette-accent`          | 120, 22, 45   | `#78162D` |
| `--palette-content-surface` | 242, 230, 235 | `#F2E6EB` |
| `--palette-page-bg`         | 198, 165, 175 | `#C6A5AF` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## ⚡ Section E — Flashy / Neon / Vibrant

### Cyberpunk Alley

_Magenta + cyan on wet asphalt_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 15, 5, 30     | `#0F051E` |
| `--palette-nav-fg`          | 240, 235, 250 | `#F0EBFA` |
| `--palette-nav-dim`         | 180, 130, 220 | `#B482DC` |
| `--palette-content-bg`      | 250, 245, 255 | `#FAF5FF` |
| `--palette-content-fg`      | 15, 5, 30     | `#0F051E` |
| `--palette-accent`          | 190, 20, 130  | `#BE1482` |
| `--palette-content-surface` | 240, 232, 250 | `#F0E8FA` |
| `--palette-page-bg`         | 45, 20, 60    | `#2D143C` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Vaporwave Miami

_Pink/teal sunset, chrome text_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 220, 235 | `#F5DCEB` |
| `--palette-nav-fg`          | 40, 20, 60    | `#28143C` |
| `--palette-nav-dim`         | 130, 90, 130  | `#825A82` |
| `--palette-content-bg`      | 25, 15, 45    | `#190F2D` |
| `--palette-content-fg`      | 230, 250, 255 | `#E6FAFF` |
| `--palette-accent`          | 255, 100, 200 | `#FF64C8` |
| `--palette-content-surface` | 40, 25, 65    | `#281941` |
| `--palette-page-bg`         | 80, 200, 210  | `#50C8D2` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Rave Acid

_Neon green + hot pink, black bg_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 8, 8       | `#080808` |
| `--palette-nav-fg`          | 220, 255, 220 | `#DCFFDC` |
| `--palette-nav-dim`         | 110, 160, 110 | `#6EA06E` |
| `--palette-content-bg`      | 12, 15, 12    | `#0C0F0C` |
| `--palette-content-fg`      | 235, 255, 235 | `#EBFFEB` |
| `--palette-accent`          | 180, 255, 40  | `#B4FF28` |
| `--palette-content-surface` | 22, 26, 22    | `#161A16` |
| `--palette-page-bg`         | 30, 40, 30    | `#1E281E` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Synthwave Sunset

_Purple → orange gradient, ink content_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 255, 235, 220 | `#FFEBDC` |
| `--palette-nav-fg`          | 40, 15, 50    | `#280F32` |
| `--palette-nav-dim`         | 130, 80, 130  | `#825082` |
| `--palette-content-bg`      | 30, 15, 55    | `#1E0F37` |
| `--palette-content-fg`      | 255, 240, 230 | `#FFF0E6` |
| `--palette-accent`          | 255, 140, 50  | `#FF8C32` |
| `--palette-content-surface` | 45, 25, 75    | `#2D194B` |
| `--palette-page-bg`         | 230, 100, 130 | `#E66482` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Neon Tokyo

_Kanji red + electric blue on charcoal_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 18, 18, 22    | `#121216` |
| `--palette-nav-fg`          | 230, 235, 255 | `#E6EBFF` |
| `--palette-nav-dim`         | 120, 130, 170 | `#7882AA` |
| `--palette-content-bg`      | 248, 248, 250 | `#F8F8FA` |
| `--palette-content-fg`      | 15, 15, 20    | `#0F0F14` |
| `--palette-accent`          | 200, 20, 40   | `#C81428` |
| `--palette-content-surface` | 235, 235, 240 | `#EBEBF0` |
| `--palette-page-bg`         | 30, 60, 130   | `#1E3C82` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Electric Watermelon

_Hot pink + lime on cream_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 25, 40, 25    | `#192819` |
| `--palette-nav-fg`          | 235, 255, 220 | `#EBFFDC` |
| `--palette-nav-dim`         | 130, 170, 120 | `#82AA78` |
| `--palette-content-bg`      | 255, 250, 240 | `#FFFAF0` |
| `--palette-content-fg`      | 40, 15, 20    | `#280F14` |
| `--palette-accent`          | 220, 30, 90   | `#DC1E5A` |
| `--palette-content-surface` | 250, 240, 235 | `#FAF0EB` |
| `--palette-page-bg`         | 140, 200, 90  | `#8CC85A` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## 🕯️ Section F — Gloomy / Gothic / Moody

### Obsidian & Blood

_Ink black + arterial red accent_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 6, 6, 8       | `#060608` |
| `--palette-nav-fg`          | 220, 220, 225 | `#DCDCE1` |
| `--palette-nav-dim`         | 110, 105, 110 | `#6E696E` |
| `--palette-content-bg`      | 10, 8, 10     | `#0A080A` |
| `--palette-content-fg`      | 225, 220, 220 | `#E1DCDC` |
| `--palette-accent`          | 230, 50, 50   | `#E63232` |
| `--palette-content-surface` | 22, 15, 15    | `#160F0F` |
| `--palette-page-bg`         | 35, 15, 15    | `#230F0F` |
| `--palette-bright`          | 245, 245, 245 | `#F5F5F5` |

### Storm Cloud

_Slate greys, weak yellow lightning_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 220, 225, 230 | `#DCE1E6` |
| `--palette-nav-fg`          | 25, 30, 40    | `#191E28` |
| `--palette-nav-dim`         | 100, 110, 125 | `#646E7D` |
| `--palette-content-bg`      | 40, 45, 55    | `#282D37` |
| `--palette-content-fg`      | 220, 225, 235 | `#DCE1EB` |
| `--palette-accent`          | 230, 220, 90  | `#E6DC5A` |
| `--palette-content-surface` | 55, 60, 70    | `#373C46` |
| `--palette-page-bg`         | 100, 105, 115 | `#646973` |
| `--palette-bright`          | 250, 250, 255 | `#FAFAFF` |

### Volcanic Ash

_Charcoal + molten orange embers_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 15, 12, 10    | `#0F0C0A` |
| `--palette-nav-fg`          | 225, 220, 215 | `#E1DCD7` |
| `--palette-nav-dim`         | 110, 100, 95  | `#6E645F` |
| `--palette-content-bg`      | 22, 18, 15    | `#16120F` |
| `--palette-content-fg`      | 230, 220, 215 | `#E6DCD7` |
| `--palette-accent`          | 255, 110, 20  | `#FF6E14` |
| `--palette-content-surface` | 35, 28, 22    | `#231C16` |
| `--palette-page-bg`         | 55, 40, 30    | `#37281E` |
| `--palette-bright`          | 250, 245, 240 | `#FAF5F0` |

### Sepulcher

_Deep purple + tomb grey + candlelight_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 15, 10, 22    | `#0F0A16` |
| `--palette-nav-fg`          | 220, 215, 230 | `#DCD7E6` |
| `--palette-nav-dim`         | 115, 105, 130 | `#736982` |
| `--palette-content-bg`      | 22, 18, 30    | `#16121E` |
| `--palette-content-fg`      | 225, 220, 235 | `#E1DCEB` |
| `--palette-accent`          | 230, 190, 100 | `#E6BE64` |
| `--palette-content-surface` | 35, 28, 45    | `#231C2D` |
| `--palette-page-bg`         | 55, 45, 65    | `#372D41` |
| `--palette-bright`          | 250, 245, 250 | `#FAF5FA` |

### Coal Mine

_Anthracite + soot + safety-lamp amber_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 12, 12, 12    | `#0C0C0C` |
| `--palette-nav-fg`          | 210, 210, 210 | `#D2D2D2` |
| `--palette-nav-dim`         | 95, 95, 95    | `#5F5F5F` |
| `--palette-content-bg`      | 20, 20, 22    | `#141416` |
| `--palette-content-fg`      | 220, 220, 220 | `#DCDCDC` |
| `--palette-accent`          | 255, 180, 30  | `#FFB41E` |
| `--palette-content-surface` | 32, 32, 34    | `#202022` |
| `--palette-page-bg`         | 45, 45, 45    | `#2D2D2D` |
| `--palette-bright`          | 245, 245, 245 | `#F5F5F5` |

### Black Iris

_Very dark violet + iridescent teal_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 12, 8, 22     | `#0C0816` |
| `--palette-nav-fg`          | 215, 215, 235 | `#D7D7EB` |
| `--palette-nav-dim`         | 115, 110, 140 | `#736E8C` |
| `--palette-content-bg`      | 18, 12, 30    | `#120C1E` |
| `--palette-content-fg`      | 220, 220, 240 | `#DCDCF0` |
| `--palette-accent`          | 80, 220, 200  | `#50DCC8` |
| `--palette-content-surface` | 28, 22, 45    | `#1C162D` |
| `--palette-page-bg`         | 45, 35, 70    | `#2D2346` |
| `--palette-bright`          | 245, 245, 250 | `#F5F5FA` |

## 📓 Section G — Manga / Anime

### Shonen Impact

_Manga ink, screentone grey, action red_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 250, 248, 245 | `#FAF8F5` |
| `--palette-nav-fg`          | 15, 15, 15    | `#0F0F0F` |
| `--palette-nav-dim`         | 120, 120, 120 | `#787878` |
| `--palette-content-bg`      | 255, 253, 250 | `#FFFDFA` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 220, 30, 40   | `#DC1E28` |
| `--palette-content-surface` | 245, 243, 240 | `#F5F3F0` |
| `--palette-page-bg`         | 200, 195, 190 | `#C8C3BE` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Shojo Petal

_Sparkles pink + lilac + ink_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 255, 240, 245 | `#FFF0F5` |
| `--palette-nav-fg`          | 70, 20, 55    | `#461437` |
| `--palette-nav-dim`         | 170, 100, 140 | `#AA648C` |
| `--palette-content-bg`      | 255, 250, 253 | `#FFFAFD` |
| `--palette-content-fg`      | 55, 15, 45    | `#370F2D` |
| `--palette-accent`          | 200, 40, 130  | `#C82882` |
| `--palette-content-surface` | 250, 235, 245 | `#FAEBF5` |
| `--palette-page-bg`         | 230, 190, 220 | `#E6BEDC` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Studio Night

_Ghibli-esque teal + warm lantern ink_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 232, 242, 240 | `#E8F2F0` |
| `--palette-nav-fg`          | 30, 45, 45    | `#1E2D2D` |
| `--palette-nav-dim`         | 110, 130, 130 | `#6E8282` |
| `--palette-content-bg`      | 18, 40, 45    | `#12282D` |
| `--palette-content-fg`      | 225, 235, 230 | `#E1EBE6` |
| `--palette-accent`          | 230, 180, 90  | `#E6B45A` |
| `--palette-content-surface` | 28, 55, 60    | `#1C373C` |
| `--palette-page-bg`         | 90, 130, 130  | `#5A8282` |
| `--palette-bright`          | 250, 250, 245 | `#FAFAF5` |

### Berserk Iron

_Rust brown + steel + parchment_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 30, 25, 22    | `#1E1916` |
| `--palette-nav-fg`          | 220, 210, 195 | `#DCD2C3` |
| `--palette-nav-dim`         | 130, 120, 105 | `#827869` |
| `--palette-content-bg`      | 242, 235, 220 | `#F2EBDC` |
| `--palette-content-fg`      | 35, 25, 20    | `#231914` |
| `--palette-accent`          | 155, 60, 30   | `#9B3C1E` |
| `--palette-content-surface` | 235, 225, 205 | `#EBE1CD` |
| `--palette-page-bg`         | 110, 90, 75   | `#6E5A4B` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Neo-Tokyo Rain

_Neon signs on a rainy night_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 10, 12, 20    | `#0A0C14` |
| `--palette-nav-fg`          | 220, 225, 240 | `#DCE1F0` |
| `--palette-nav-dim`         | 110, 130, 170 | `#6E82AA` |
| `--palette-content-bg`      | 15, 18, 30    | `#0F121E` |
| `--palette-content-fg`      | 225, 230, 245 | `#E1E6F5` |
| `--palette-accent`          | 255, 60, 180  | `#FF3CB4` |
| `--palette-content-surface` | 25, 30, 50    | `#191E32` |
| `--palette-page-bg`         | 45, 55, 90    | `#2D375A` |
| `--palette-bright`          | 245, 250, 255 | `#F5FAFF` |

### Chibi Pastel

_Soft yellow + baby blue + chibi pink_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 255, 248, 230 | `#FFF8E6` |
| `--palette-nav-fg`          | 50, 40, 70    | `#322846` |
| `--palette-nav-dim`         | 140, 130, 160 | `#8C82A0` |
| `--palette-content-bg`      | 250, 250, 255 | `#FAFAFF` |
| `--palette-content-fg`      | 45, 35, 65    | `#2D2341` |
| `--palette-accent`          | 200, 60, 130  | `#C83C82` |
| `--palette-content-surface` | 235, 240, 255 | `#EBF0FF` |
| `--palette-page-bg`         | 180, 220, 245 | `#B4DCF5` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## 🍵 Section H — Zen / Japandi

### Sumi-e Ink

_Bone white paper, sumi ink, seal red_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 250, 247, 240 | `#FAF7F0` |
| `--palette-nav-fg`          | 15, 15, 18    | `#0F0F12` |
| `--palette-nav-dim`         | 110, 110, 115 | `#6E6E73` |
| `--palette-content-bg`      | 253, 250, 244 | `#FDFAF4` |
| `--palette-content-fg`      | 10, 10, 12    | `#0A0A0C` |
| `--palette-accent`          | 175, 30, 25   | `#AF1E19` |
| `--palette-content-surface` | 245, 240, 232 | `#F5F0E8` |
| `--palette-page-bg`         | 200, 190, 175 | `#C8BEAF` |
| `--palette-bright`          | 255, 253, 248 | `#FFFDF8` |

### Wabi-sabi

_Clay + weathered plaster + rust accent_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 238, 225 | `#F5EEE1` |
| `--palette-nav-fg`          | 40, 30, 22    | `#281E16` |
| `--palette-nav-dim`         | 125, 110, 95  | `#7D6E5F` |
| `--palette-content-bg`      | 250, 244, 232 | `#FAF4E8` |
| `--palette-content-fg`      | 35, 25, 20    | `#231914` |
| `--palette-accent`          | 155, 60, 30   | `#9B3C1E` |
| `--palette-content-surface` | 240, 232, 218 | `#F0E8DA` |
| `--palette-page-bg`         | 175, 150, 120 | `#AF9678` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Matcha Ceremony

_Matcha green + kraft + cast iron_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 242, 238, 225 | `#F2EEE1` |
| `--palette-nav-fg`          | 30, 40, 25    | `#1E2819` |
| `--palette-nav-dim`         | 110, 125, 100 | `#6E7D64` |
| `--palette-content-bg`      | 248, 244, 232 | `#F8F4E8` |
| `--palette-content-fg`      | 25, 35, 22    | `#192316` |
| `--palette-accent`          | 80, 110, 45   | `#506E2D` |
| `--palette-content-surface` | 238, 232, 218 | `#EEE8DA` |
| `--palette-page-bg`         | 45, 55, 40    | `#2D3728` |
| `--palette-bright`          | 255, 252, 245 | `#FFFCF5` |

### Ink Wash Night

_Deep indigo + rice paper + moonstone_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 22, 25, 45    | `#16192D` |
| `--palette-nav-fg`          | 225, 228, 240 | `#E1E4F0` |
| `--palette-nav-dim`         | 130, 140, 175 | `#828CAF` |
| `--palette-content-bg`      | 248, 246, 238 | `#F8F6EE` |
| `--palette-content-fg`      | 22, 25, 40    | `#161928` |
| `--palette-accent`          | 50, 80, 145   | `#325091` |
| `--palette-content-surface` | 240, 238, 228 | `#F0EEE4` |
| `--palette-page-bg`         | 130, 140, 175 | `#828CAF` |
| `--palette-bright`          | 255, 253, 248 | `#FFFDF8` |

### Ryoan-ji Stone

_Raked-sand beige + stone grey + moss_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 240, 232, 218 | `#F0E8DA` |
| `--palette-nav-fg`          | 35, 35, 30    | `#23231E` |
| `--palette-nav-dim`         | 115, 115, 105 | `#737369` |
| `--palette-content-bg`      | 246, 240, 228 | `#F6F0E4` |
| `--palette-content-fg`      | 30, 30, 25    | `#1E1E19` |
| `--palette-accent`          | 75, 100, 60   | `#4B643C` |
| `--palette-content-surface` | 235, 228, 215 | `#EBE4D7` |
| `--palette-page-bg`         | 155, 150, 135 | `#9B9687` |
| `--palette-bright`          | 255, 252, 245 | `#FFFCF5` |

### Kyoto Twilight

_Deep plum sky + lantern gold_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 22, 12, 30    | `#160C1E` |
| `--palette-nav-fg`          | 225, 215, 230 | `#E1D7E6` |
| `--palette-nav-dim`         | 125, 105, 140 | `#7D698C` |
| `--palette-content-bg`      | 28, 18, 38    | `#1C1226` |
| `--palette-content-fg`      | 230, 220, 235 | `#E6DCEB` |
| `--palette-accent`          | 230, 175, 65  | `#E6AF41` |
| `--palette-content-surface` | 42, 28, 55    | `#2A1C37` |
| `--palette-page-bg`         | 65, 40, 80    | `#412850` |
| `--palette-bright`          | 250, 245, 250 | `#FAF5FA` |

## ⬛ Section I — High Contrast / OLED

### Pure OLED

_True black + pure white + cyan_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 0, 0, 0       | `#000000` |
| `--palette-nav-fg`          | 255, 255, 255 | `#FFFFFF` |
| `--palette-nav-dim`         | 140, 140, 140 | `#8C8C8C` |
| `--palette-content-bg`      | 0, 0, 0       | `#000000` |
| `--palette-content-fg`      | 255, 255, 255 | `#FFFFFF` |
| `--palette-accent`          | 0, 220, 255   | `#00DCFF` |
| `--palette-content-surface` | 15, 15, 15    | `#0F0F0F` |
| `--palette-page-bg`         | 30, 30, 30    | `#1E1E1E` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Traffic Signal

_Green/yellow/red on black_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 5, 5, 5       | `#050505` |
| `--palette-nav-fg`          | 250, 250, 245 | `#FAFAF5` |
| `--palette-nav-dim`         | 135, 135, 130 | `#878782` |
| `--palette-content-bg`      | 8, 8, 8       | `#080808` |
| `--palette-content-fg`      | 250, 250, 245 | `#FAFAF5` |
| `--palette-accent`          | 255, 200, 0   | `#FFC800` |
| `--palette-content-surface` | 20, 20, 20    | `#141414` |
| `--palette-page-bg`         | 40, 40, 40    | `#282828` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Newspaper

_Newsprint cream + solid black + red ink_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 244, 232 | `#F8F4E8` |
| `--palette-nav-fg`          | 8, 8, 8       | `#080808` |
| `--palette-nav-dim`         | 95, 90, 85    | `#5F5A55` |
| `--palette-content-bg`      | 250, 246, 234 | `#FAF6EA` |
| `--palette-content-fg`      | 5, 5, 5       | `#050505` |
| `--palette-accent`          | 180, 25, 25   | `#B41919` |
| `--palette-content-surface` | 242, 238, 225 | `#F2EEE1` |
| `--palette-page-bg`         | 200, 190, 175 | `#C8BEAF` |
| `--palette-bright`          | 255, 252, 245 | `#FFFCF5` |

### Blueprint Sharp

_Cyan blueprint + chalk white_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 10, 30, 65    | `#0A1E41` |
| `--palette-nav-fg`          | 235, 245, 255 | `#EBF5FF` |
| `--palette-nav-dim`         | 130, 165, 210 | `#82A5D2` |
| `--palette-content-bg`      | 15, 40, 85    | `#0F2855` |
| `--palette-content-fg`      | 240, 248, 255 | `#F0F8FF` |
| `--palette-accent`          | 110, 220, 255 | `#6EDCFF` |
| `--palette-content-surface` | 25, 55, 105   | `#193769` |
| `--palette-page-bg`         | 40, 80, 130   | `#285082` |
| `--palette-bright`          | 250, 253, 255 | `#FAFDFF` |

### Panda Mono

_Pure white nav + pure black content + one blue_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 255, 255, 255 | `#FFFFFF` |
| `--palette-nav-fg`          | 0, 0, 0       | `#000000` |
| `--palette-nav-dim`         | 110, 110, 110 | `#6E6E6E` |
| `--palette-content-bg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-content-fg`      | 255, 255, 255 | `#FFFFFF` |
| `--palette-accent`          | 80, 160, 255  | `#50A0FF` |
| `--palette-content-surface` | 25, 25, 25    | `#191919` |
| `--palette-page-bg`         | 130, 130, 130 | `#828282` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## 📼 Section J — Retro / Nostalgic

### CRT Phosphor

_Green-on-black terminal_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 3, 8, 3       | `#030803` |
| `--palette-nav-fg`          | 180, 255, 180 | `#B4FFB4` |
| `--palette-nav-dim`         | 100, 165, 100 | `#64A564` |
| `--palette-content-bg`      | 5, 12, 5      | `#050C05` |
| `--palette-content-fg`      | 180, 255, 180 | `#B4FFB4` |
| `--palette-accent`          | 100, 255, 100 | `#64FF64` |
| `--palette-content-surface` | 15, 25, 15    | `#0F190F` |
| `--palette-page-bg`         | 25, 40, 25    | `#192819` |
| `--palette-bright`          | 220, 255, 220 | `#DCFFDC` |

### Amber Terminal

_Amber-on-black IBM 3270_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 5, 3, 0       | `#050300` |
| `--palette-nav-fg`          | 255, 180, 60  | `#FFB43C` |
| `--palette-nav-dim`         | 155, 105, 30  | `#9B691E` |
| `--palette-content-bg`      | 8, 5, 0       | `#080500` |
| `--palette-content-fg`      | 255, 180, 60  | `#FFB43C` |
| `--palette-accent`          | 255, 210, 90  | `#FFD25A` |
| `--palette-content-surface` | 20, 15, 5     | `#140F05` |
| `--palette-page-bg`         | 40, 30, 15    | `#281E0F` |
| `--palette-bright`          | 255, 220, 130 | `#FFDC82` |

### 60s Mod

_Mustard + teal + cream + brown_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 250, 244, 225 | `#FAF4E1` |
| `--palette-nav-fg`          | 50, 30, 15    | `#321E0F` |
| `--palette-nav-dim`         | 140, 110, 80  | `#8C6E50` |
| `--palette-content-bg`      | 252, 246, 228 | `#FCF6E4` |
| `--palette-content-fg`      | 45, 25, 12    | `#2D190C` |
| `--palette-accent`          | 15, 100, 105  | `#0F6469` |
| `--palette-content-surface` | 244, 236, 215 | `#F4ECD7` |
| `--palette-page-bg`         | 200, 150, 40  | `#C89628` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

### 70s Harvest

_Avocado + harvest gold + rust_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 238, 215 | `#F8EED7` |
| `--palette-nav-fg`          | 50, 35, 15    | `#32230F` |
| `--palette-nav-dim`         | 140, 110, 65  | `#8C6E41` |
| `--palette-content-bg`      | 250, 240, 218 | `#FAF0DA` |
| `--palette-content-fg`      | 45, 30, 12    | `#2D1E0C` |
| `--palette-accent`          | 140, 55, 15   | `#8C370F` |
| `--palette-content-surface` | 240, 228, 200 | `#F0E4C8` |
| `--palette-page-bg`         | 115, 130, 55  | `#738237` |
| `--palette-bright`          | 255, 250, 230 | `#FFFAE6` |

### 90s Grunge

_Flannel red + moss + denim + bone_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 240, 235, 225 | `#F0EBE1` |
| `--palette-nav-fg`          | 30, 25, 25    | `#1E1919` |
| `--palette-nav-dim`         | 110, 100, 100 | `#6E6464` |
| `--palette-content-bg`      | 30, 35, 45    | `#1E232D` |
| `--palette-content-fg`      | 225, 220, 210 | `#E1DCD2` |
| `--palette-accent`          | 235, 80, 80   | `#EB5050` |
| `--palette-content-surface` | 45, 50, 65    | `#2D3241` |
| `--palette-page-bg`         | 80, 100, 60   | `#50643C` |
| `--palette-bright`          | 250, 248, 240 | `#FAF8F0` |

### Y2K Chrome

_Aqua + silver + iridescent + white_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 235, 240, 245 | `#EBF0F5` |
| `--palette-nav-fg`          | 25, 30, 55    | `#191E37` |
| `--palette-nav-dim`         | 115, 130, 165 | `#7382A5` |
| `--palette-content-bg`      | 248, 250, 253 | `#F8FAFD` |
| `--palette-content-fg`      | 20, 25, 50    | `#141932` |
| `--palette-accent`          | 30, 100, 180  | `#1E64B4` |
| `--palette-content-surface` | 232, 240, 250 | `#E8F0FA` |
| `--palette-page-bg`         | 175, 210, 225 | `#AFD2E1` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## 🌌 Section K — Nature Phenomena

### Aurora Borealis

_Deep navy sky + green/magenta aurora_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 10, 30     | `#080A1E` |
| `--palette-nav-fg`          | 220, 230, 245 | `#DCE6F5` |
| `--palette-nav-dim`         | 110, 130, 175 | `#6E82AF` |
| `--palette-content-bg`      | 12, 15, 38    | `#0C0F26` |
| `--palette-content-fg`      | 225, 235, 248 | `#E1EBF8` |
| `--palette-accent`          | 80, 240, 180  | `#50F0B4` |
| `--palette-content-surface` | 22, 28, 55    | `#161C37` |
| `--palette-page-bg`         | 40, 55, 90    | `#28375A` |
| `--palette-bright`          | 250, 253, 255 | `#FAFDFF` |

### Abyssal Ocean

_Trench blues + bioluminescent cyan_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 3, 8, 20      | `#030814` |
| `--palette-nav-fg`          | 215, 230, 245 | `#D7E6F5` |
| `--palette-nav-dim`         | 105, 135, 180 | `#6987B4` |
| `--palette-content-bg`      | 5, 15, 30     | `#050F1E` |
| `--palette-content-fg`      | 220, 235, 250 | `#DCEBFA` |
| `--palette-accent`          | 80, 230, 220  | `#50E6DC` |
| `--palette-content-surface` | 15, 30, 50    | `#0F1E32` |
| `--palette-page-bg`         | 25, 55, 80    | `#193750` |
| `--palette-bright`          | 245, 252, 255 | `#F5FCFF` |

### Sakura Midnight

_Midnight blue + cherry-blossom pink_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 15, 20, 45    | `#0F142D` |
| `--palette-nav-fg`          | 235, 225, 235 | `#EBE1EB` |
| `--palette-nav-dim`         | 140, 130, 165 | `#8C82A5` |
| `--palette-content-bg`      | 253, 245, 248 | `#FDF5F8` |
| `--palette-content-fg`      | 20, 25, 50    | `#141932` |
| `--palette-accent`          | 200, 60, 120  | `#C83C78` |
| `--palette-content-surface` | 248, 235, 240 | `#F8EBF0` |
| `--palette-page-bg`         | 245, 195, 210 | `#F5C3D2` |
| `--palette-bright`          | 255, 250, 252 | `#FFFAFC` |

### Glacier Dawn

_Ice blue + pale rose + platinum_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 242, 246, 250 | `#F2F6FA` |
| `--palette-nav-fg`          | 25, 40, 60    | `#19283C` |
| `--palette-nav-dim`         | 110, 130, 160 | `#6E82A0` |
| `--palette-content-bg`      | 248, 250, 253 | `#F8FAFD` |
| `--palette-content-fg`      | 20, 35, 55    | `#142337` |
| `--palette-accent`          | 30, 90, 155   | `#1E5A9B` |
| `--palette-content-surface` | 235, 242, 250 | `#EBF2FA` |
| `--palette-page-bg`         | 240, 210, 215 | `#F0D2D7` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Blood Moon

_Eclipse red + charcoal + copper_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 12, 8, 8      | `#0C0808` |
| `--palette-nav-fg`          | 225, 210, 205 | `#E1D2CD` |
| `--palette-nav-dim`         | 130, 105, 100 | `#826964` |
| `--palette-content-bg`      | 18, 10, 10    | `#120A0A` |
| `--palette-content-fg`      | 230, 215, 210 | `#E6D7D2` |
| `--palette-accent`          | 220, 90, 30   | `#DC5A1E` |
| `--palette-content-surface` | 32, 20, 18    | `#201412` |
| `--palette-page-bg`         | 80, 25, 20    | `#501914` |
| `--palette-bright`          | 245, 235, 230 | `#F5EBE6` |

### Desert Storm

_Ochre + sand + dust + sky_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 235, 215 | `#F5EBD7` |
| `--palette-nav-fg`          | 45, 30, 15    | `#2D1E0F` |
| `--palette-nav-dim`         | 140, 110, 75  | `#8C6E4B` |
| `--palette-content-bg`      | 250, 240, 220 | `#FAF0DC` |
| `--palette-content-fg`      | 40, 28, 12    | `#281C0C` |
| `--palette-accent`          | 155, 75, 15   | `#9B4B0F` |
| `--palette-content-surface` | 242, 230, 208 | `#F2E6D0` |
| `--palette-page-bg`         | 175, 195, 210 | `#AFC3D2` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

## 🎨 Section L — Editorial Art Movements

### Bauhaus

_Primary red/yellow/blue + black + white_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 250, 248, 244 | `#FAF8F4` |
| `--palette-nav-fg`          | 8, 8, 8       | `#080808` |
| `--palette-nav-dim`         | 110, 110, 108 | `#6E6E6C` |
| `--palette-content-bg`      | 252, 250, 246 | `#FCFAF6` |
| `--palette-content-fg`      | 5, 5, 5       | `#050505` |
| `--palette-accent`          | 220, 30, 30   | `#DC1E1E` |
| `--palette-content-surface` | 244, 240, 232 | `#F4F0E8` |
| `--palette-page-bg`         | 230, 190, 40  | `#E6BE28` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Mondrian

_Pure primaries on sharp white_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 255, 255, 255 | `#FFFFFF` |
| `--palette-nav-fg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-dim`         | 115, 115, 115 | `#737373` |
| `--palette-content-bg`      | 255, 255, 255 | `#FFFFFF` |
| `--palette-content-fg`      | 5, 5, 5       | `#050505` |
| `--palette-accent`          | 200, 30, 30   | `#C81E1E` |
| `--palette-content-surface` | 248, 248, 248 | `#F8F8F8` |
| `--palette-page-bg`         | 30, 60, 200   | `#1E3CC8` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Klimt Gold

_Gold leaf + burnt umber + jewel accents_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 30, 20, 8     | `#1E1408` |
| `--palette-nav-fg`          | 235, 220, 175 | `#EBDCAF` |
| `--palette-nav-dim`         | 155, 130, 80  | `#9B8250` |
| `--palette-content-bg`      | 250, 244, 225 | `#FAF4E1` |
| `--palette-content-fg`      | 35, 25, 10    | `#23190A` |
| `--palette-accent`          | 155, 100, 20  | `#9B6414` |
| `--palette-content-surface` | 242, 232, 208 | `#F2E8D0` |
| `--palette-page-bg`         | 175, 130, 30  | `#AF821E` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

### Rothko Chapel

_Layered dark maroons + charcoal_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 22, 8, 10     | `#16080A` |
| `--palette-nav-fg`          | 220, 210, 205 | `#DCD2CD` |
| `--palette-nav-dim`         | 130, 110, 105 | `#826E69` |
| `--palette-content-bg`      | 30, 12, 15    | `#1E0C0F` |
| `--palette-content-fg`      | 225, 215, 208 | `#E1D7D0` |
| `--palette-accent`          | 200, 100, 70  | `#C86446` |
| `--palette-content-surface` | 45, 20, 22    | `#2D1416` |
| `--palette-page-bg`         | 70, 30, 30    | `#461E1E` |
| `--palette-bright`          | 240, 230, 225 | `#F0E6E1` |

### Ukiyo-e

_Woodblock ink + prussian blue + coral_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 242, 228 | `#F8F2E4` |
| `--palette-nav-fg`          | 12, 12, 15    | `#0C0C0F` |
| `--palette-nav-dim`         | 110, 110, 115 | `#6E6E73` |
| `--palette-content-bg`      | 252, 246, 232 | `#FCF6E8` |
| `--palette-content-fg`      | 10, 10, 12    | `#0A0A0C` |
| `--palette-accent`          | 30, 60, 120   | `#1E3C78` |
| `--palette-content-surface` | 244, 238, 220 | `#F4EEDC` |
| `--palette-page-bg`         | 230, 130, 110 | `#E6826E` |
| `--palette-bright`          | 255, 252, 245 | `#FFFCF5` |

### Art Deco Peacock

_Emerald + gold + black + ivory_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 20, 15     | `#08140F` |
| `--palette-nav-fg`          | 230, 220, 195 | `#E6DCC3` |
| `--palette-nav-dim`         | 140, 145, 130 | `#8C9182` |
| `--palette-content-bg`      | 248, 244, 230 | `#F8F4E6` |
| `--palette-content-fg`      | 15, 25, 20    | `#0F1914` |
| `--palette-accent`          | 15, 100, 75   | `#0F644B` |
| `--palette-content-surface` | 240, 235, 218 | `#F0EBDA` |
| `--palette-page-bg`         | 175, 140, 55  | `#AF8C37` |
| `--palette-bright`          | 255, 252, 240 | `#FFFCF0` |

## 🌒 Section M — Dark Nav Showcase

### Terminal Green

_Dark chrome + phosphor green + off-white_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 15, 20, 15    | `#0F140F` |
| `--palette-nav-fg`          | 220, 240, 220 | `#DCF0DC` |
| `--palette-nav-dim`         | 130, 155, 130 | `#829B82` |
| `--palette-content-bg`      | 18, 22, 18    | `#121612` |
| `--palette-content-fg`      | 225, 240, 225 | `#E1F0E1` |
| `--palette-accent`          | 100, 230, 100 | `#64E664` |
| `--palette-content-surface` | 30, 38, 30    | `#1E261E` |
| `--palette-page-bg`         | 45, 55, 45    | `#2D372D` |
| `--palette-bright`          | 240, 250, 240 | `#F0FAF0` |

### Console Amber

_Dark chrome + amber CRT + parchment content_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 12, 10, 5     | `#0C0A05` |
| `--palette-nav-fg`          | 255, 190, 90  | `#FFBE5A` |
| `--palette-nav-dim`         | 180, 130, 55  | `#B48237` |
| `--palette-content-bg`      | 248, 242, 225 | `#F8F2E1` |
| `--palette-content-fg`      | 35, 25, 12    | `#23190C` |
| `--palette-accent`          | 155, 85, 15   | `#9B550F` |
| `--palette-content-surface` | 240, 232, 210 | `#F0E8D2` |
| `--palette-page-bg`         | 80, 60, 25    | `#503C19` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

### Deep Ocean

_Navy nav + midnight content + coral accent_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 15, 30     | `#080F1E` |
| `--palette-nav-fg`          | 220, 230, 245 | `#DCE6F5` |
| `--palette-nav-dim`         | 115, 135, 175 | `#7387AF` |
| `--palette-content-bg`      | 12, 18, 35    | `#0C1223` |
| `--palette-content-fg`      | 225, 235, 245 | `#E1EBF5` |
| `--palette-accent`          | 255, 130, 100 | `#FF8264` |
| `--palette-content-surface` | 22, 30, 50    | `#161E32` |
| `--palette-page-bg`         | 40, 60, 90    | `#283C5A` |
| `--palette-bright`          | 245, 252, 255 | `#F5FCFF` |

### Cinema

_Theater black nav + charcoal content + red_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 0, 0, 0       | `#000000` |
| `--palette-nav-fg`          | 230, 225, 220 | `#E6E1DC` |
| `--palette-nav-dim`         | 135, 130, 125 | `#87827D` |
| `--palette-content-bg`      | 18, 15, 15    | `#120F0F` |
| `--palette-content-fg`      | 235, 225, 220 | `#EBE1DC` |
| `--palette-accent`          | 220, 40, 40   | `#DC2828` |
| `--palette-content-surface` | 30, 25, 25    | `#1E1919` |
| `--palette-page-bg`         | 45, 35, 35    | `#2D2323` |
| `--palette-bright`          | 250, 245, 240 | `#FAF5F0` |

### Vault

_Steel nav + light concrete content_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 30, 32, 35    | `#1E2023` |
| `--palette-nav-fg`          | 220, 225, 232 | `#DCE1E8` |
| `--palette-nav-dim`         | 135, 140, 148 | `#878C94` |
| `--palette-content-bg`      | 232, 232, 230 | `#E8E8E6` |
| `--palette-content-fg`      | 25, 27, 30    | `#191B1E` |
| `--palette-accent`          | 45, 90, 155   | `#2D5A9B` |
| `--palette-content-surface` | 220, 220, 218 | `#DCDCDA` |
| `--palette-page-bg`         | 110, 115, 120 | `#6E7378` |
| `--palette-bright`          | 248, 248, 247 | `#F8F8F7` |

### Onyx & Copper

_Onyx nav + warm ivory content + copper_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 12, 10, 10    | `#0C0A0A` |
| `--palette-nav-fg`          | 230, 220, 210 | `#E6DCD2` |
| `--palette-nav-dim`         | 140, 125, 115 | `#8C7D73` |
| `--palette-content-bg`      | 248, 240, 228 | `#F8F0E4` |
| `--palette-content-fg`      | 30, 22, 15    | `#1E160F` |
| `--palette-accent`          | 155, 70, 25   | `#9B4619` |
| `--palette-content-surface` | 242, 232, 218 | `#F2E8DA` |
| `--palette-page-bg`         | 80, 45, 25    | `#502D19` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Slate & Ivory

_Slate nav + ivory content + navy accent_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 35, 40, 50    | `#232832` |
| `--palette-nav-fg`          | 225, 230, 240 | `#E1E6F0` |
| `--palette-nav-dim`         | 140, 150, 165 | `#8C96A5` |
| `--palette-content-bg`      | 248, 246, 240 | `#F8F6F0` |
| `--palette-content-fg`      | 25, 30, 40    | `#191E28` |
| `--palette-accent`          | 25, 55, 130   | `#193782` |
| `--palette-content-surface` | 240, 238, 232 | `#F0EEE8` |
| `--palette-page-bg`         | 90, 100, 115  | `#5A6473` |
| `--palette-bright`          | 255, 253, 248 | `#FFFDF8` |

### Espresso & Cream

_Espresso nav + cream content + caramel_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 22, 15, 10    | `#160F0A` |
| `--palette-nav-fg`          | 235, 220, 200 | `#EBDCC8` |
| `--palette-nav-dim`         | 150, 130, 105 | `#968269` |
| `--palette-content-bg`      | 248, 242, 228 | `#F8F2E4` |
| `--palette-content-fg`      | 30, 20, 12    | `#1E140C` |
| `--palette-accent`          | 140, 75, 20   | `#8C4B14` |
| `--palette-content-surface` | 240, 232, 215 | `#F0E8D7` |
| `--palette-page-bg`         | 80, 55, 30    | `#50371E` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

### Midnight Broadsheet

_Ink nav + newsprint content + red ink_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 10, 15     | `#080A0F` |
| `--palette-nav-fg`          | 235, 230, 220 | `#EBE6DC` |
| `--palette-nav-dim`         | 140, 138, 130 | `#8C8A82` |
| `--palette-content-bg`      | 250, 245, 232 | `#FAF5E8` |
| `--palette-content-fg`      | 8, 8, 8       | `#080808` |
| `--palette-accent`          | 175, 25, 25   | `#AF1919` |
| `--palette-content-surface` | 242, 236, 222 | `#F2ECDE` |
| `--palette-page-bg`         | 50, 45, 40    | `#322D28` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Gothic Study

_Deep green nav + parchment content + gold_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 12, 25, 18    | `#0C1912` |
| `--palette-nav-fg`          | 225, 215, 190 | `#E1D7BE` |
| `--palette-nav-dim`         | 140, 145, 125 | `#8C917D` |
| `--palette-content-bg`      | 245, 238, 220 | `#F5EEDC` |
| `--palette-content-fg`      | 30, 25, 15    | `#1E190F` |
| `--palette-accent`          | 140, 100, 25  | `#8C6419` |
| `--palette-content-surface` | 238, 230, 210 | `#EEE6D2` |
| `--palette-page-bg`         | 55, 70, 50    | `#374632` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

## 🌍 Section N — Cultural Inspirations

### Marrakech Souk

_Terracotta + saffron + indigo + bone_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 240, 225 | `#F8F0E1` |
| `--palette-nav-fg`          | 30, 20, 45    | `#1E142D` |
| `--palette-nav-dim`         | 125, 105, 145 | `#7D6991` |
| `--palette-content-bg`      | 252, 244, 228 | `#FCF4E4` |
| `--palette-content-fg`      | 28, 18, 40    | `#1C1228` |
| `--palette-accent`          | 175, 65, 30   | `#AF411E` |
| `--palette-content-surface` | 244, 234, 215 | `#F4EAD7` |
| `--palette-page-bg`         | 200, 130, 45  | `#C8822D` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

### Havana Sunrise

_Faded turquoise + coral + mustard_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 240, 225 | `#F8F0E1` |
| `--palette-nav-fg`          | 30, 30, 30    | `#1E1E1E` |
| `--palette-nav-dim`         | 115, 115, 115 | `#737373` |
| `--palette-content-bg`      | 252, 245, 230 | `#FCF5E6` |
| `--palette-content-fg`      | 25, 25, 25    | `#191919` |
| `--palette-accent`          | 20, 110, 115  | `#146E73` |
| `--palette-content-surface` | 244, 236, 218 | `#F4ECDA` |
| `--palette-page-bg`         | 235, 130, 100 | `#EB8264` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Provençal Lavender

_Lavender fields + limestone + olive_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 240, 232 | `#F5F0E8` |
| `--palette-nav-fg`          | 40, 30, 55    | `#281E37` |
| `--palette-nav-dim`         | 130, 115, 150 | `#827396` |
| `--palette-content-bg`      | 250, 246, 240 | `#FAF6F0` |
| `--palette-content-fg`      | 35, 25, 50    | `#231932` |
| `--palette-accent`          | 90, 55, 155   | `#5A379B` |
| `--palette-content-surface` | 242, 236, 232 | `#F2ECE8` |
| `--palette-page-bg`         | 155, 135, 195 | `#9B87C3` |
| `--palette-bright`          | 255, 253, 250 | `#FFFDFA` |

### Scandi Fika

_White + birch + cinnamon + berry_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 252, 250, 245 | `#FCFAF5` |
| `--palette-nav-fg`          | 30, 25, 22    | `#1E1916` |
| `--palette-nav-dim`         | 115, 110, 105 | `#736E69` |
| `--palette-content-bg`      | 254, 252, 248 | `#FEFCF8` |
| `--palette-content-fg`      | 25, 22, 20    | `#191614` |
| `--palette-accent`          | 140, 30, 55   | `#8C1E37` |
| `--palette-content-surface` | 246, 242, 235 | `#F6F2EB` |
| `--palette-page-bg`         | 220, 205, 180 | `#DCCDB4` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Andes Alpaca

_Undyed wool + cochineal red + sky_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 238, 225 | `#F5EEE1` |
| `--palette-nav-fg`          | 35, 25, 20    | `#231914` |
| `--palette-nav-dim`         | 120, 105, 95  | `#78695F` |
| `--palette-content-bg`      | 250, 244, 232 | `#FAF4E8` |
| `--palette-content-fg`      | 30, 22, 15    | `#1E160F` |
| `--palette-accent`          | 175, 30, 40   | `#AF1E28` |
| `--palette-content-surface` | 242, 234, 218 | `#F2EADA` |
| `--palette-page-bg`         | 140, 175, 200 | `#8CAFC8` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Kabuki Curtain

_Persimmon + black + moss + gold_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-fg`          | 230, 220, 200 | `#E6DCC8` |
| `--palette-nav-dim`         | 140, 130, 115 | `#8C8273` |
| `--palette-content-bg`      | 250, 244, 232 | `#FAF4E8` |
| `--palette-content-fg`      | 15, 12, 10    | `#0F0C0A` |
| `--palette-accent`          | 200, 70, 25   | `#C84619` |
| `--palette-content-surface` | 242, 234, 218 | `#F2EADA` |
| `--palette-page-bg`         | 55, 75, 45    | `#374B2D` |
| `--palette-bright`          | 255, 252, 245 | `#FFFCF5` |

## ☕ Section O — Food & Drink

### Matcha Latte

_Matcha + oat milk + ceramic_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 242, 230 | `#F8F2E6` |
| `--palette-nav-fg`          | 25, 35, 20    | `#192314` |
| `--palette-nav-dim`         | 110, 130, 100 | `#6E8264` |
| `--palette-content-bg`      | 252, 246, 232 | `#FCF6E8` |
| `--palette-content-fg`      | 22, 32, 18    | `#162012` |
| `--palette-accent`          | 75, 110, 40   | `#4B6E28` |
| `--palette-content-surface` | 244, 238, 222 | `#F4EEDE` |
| `--palette-page-bg`         | 180, 205, 155 | `#B4CD9B` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Blood Orange

_Blood-orange flesh + peel + pith_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 250, 242, 228 | `#FAF2E4` |
| `--palette-nav-fg`          | 50, 20, 10    | `#32140A` |
| `--palette-nav-dim`         | 155, 90, 55   | `#9B5A37` |
| `--palette-content-bg`      | 253, 246, 232 | `#FDF6E8` |
| `--palette-content-fg`      | 45, 18, 8     | `#2D1208` |
| `--palette-accent`          | 180, 55, 30   | `#B4371E` |
| `--palette-content-surface` | 245, 236, 220 | `#F5ECDC` |
| `--palette-page-bg`         | 225, 100, 40  | `#E16428` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Wine Bar

_Bordeaux + candlelight + oak_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 22, 8, 12     | `#16080C` |
| `--palette-nav-fg`          | 225, 205, 195 | `#E1CDC3` |
| `--palette-nav-dim`         | 140, 110, 100 | `#8C6E64` |
| `--palette-content-bg`      | 28, 12, 15    | `#1C0C0F` |
| `--palette-content-fg`      | 230, 215, 200 | `#E6D7C8` |
| `--palette-accent`          | 230, 175, 90  | `#E6AF5A` |
| `--palette-content-surface` | 42, 20, 22    | `#2A1416` |
| `--palette-page-bg`         | 70, 40, 30    | `#46281E` |
| `--palette-bright`          | 245, 235, 220 | `#F5EBDC` |

### Cocoa & Cardamom

_Cocoa + cardamom green + cream_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 248, 240, 225 | `#F8F0E1` |
| `--palette-nav-fg`          | 40, 22, 15    | `#28160F` |
| `--palette-nav-dim`         | 130, 95, 75   | `#825F4B` |
| `--palette-content-bg`      | 252, 244, 228 | `#FCF4E4` |
| `--palette-content-fg`      | 35, 20, 12    | `#23140C` |
| `--palette-accent`          | 80, 105, 50   | `#506932` |
| `--palette-content-surface` | 244, 236, 218 | `#F4ECDA` |
| `--palette-page-bg`         | 95, 55, 30    | `#5F371E` |
| `--palette-bright`          | 255, 250, 235 | `#FFFAEB` |

## 🚴 Section P — Sport & Performance

### Cyclist Neon

_Hi-vis yellow + safety orange + carbon_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 245, 235 | `#F5F5EB` |
| `--palette-nav-fg`          | 15, 15, 15    | `#0F0F0F` |
| `--palette-nav-dim`         | 110, 110, 105 | `#6E6E69` |
| `--palette-content-bg`      | 15, 15, 18    | `#0F0F12` |
| `--palette-content-fg`      | 235, 235, 230 | `#EBEBE6` |
| `--palette-accent`          | 235, 230, 40  | `#EBE628` |
| `--palette-content-surface` | 28, 28, 32    | `#1C1C20` |
| `--palette-page-bg`         | 255, 130, 25  | `#FF8219` |
| `--palette-bright`          | 250, 250, 245 | `#FAFAF5` |

### Track Lane

_Wood-track amber + white lanes + red_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 252, 248, 240 | `#FCF8F0` |
| `--palette-nav-fg`          | 30, 20, 12    | `#1E140C` |
| `--palette-nav-dim`         | 130, 110, 90  | `#826E5A` |
| `--palette-content-bg`      | 253, 250, 244 | `#FDFAF4` |
| `--palette-content-fg`      | 25, 18, 10    | `#19120A` |
| `--palette-accent`          | 180, 30, 30   | `#B41E1E` |
| `--palette-content-surface` | 245, 240, 228 | `#F5F0E4` |
| `--palette-page-bg`         | 190, 120, 50  | `#BE7832` |
| `--palette-bright`          | 255, 253, 248 | `#FFFDF8` |

### Alpine

_Peak white + rock grey + glacier blue_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 250, 252, 254 | `#FAFCFE` |
| `--palette-nav-fg`          | 25, 35, 50    | `#192332` |
| `--palette-nav-dim`         | 115, 130, 150 | `#738296` |
| `--palette-content-bg`      | 252, 253, 255 | `#FCFDFF` |
| `--palette-content-fg`      | 20, 30, 45    | `#141E2D` |
| `--palette-accent`          | 30, 90, 155   | `#1E5A9B` |
| `--palette-content-surface` | 240, 245, 250 | `#F0F5FA` |
| `--palette-page-bg`         | 120, 130, 140 | `#78828C` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Velodrome

_Track blue + medal gold + wood + white_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 15, 30, 75    | `#0F1E4B` |
| `--palette-nav-fg`          | 230, 235, 250 | `#E6EBFA` |
| `--palette-nav-dim`         | 140, 155, 195 | `#8C9BC3` |
| `--palette-content-bg`      | 250, 248, 244 | `#FAF8F4` |
| `--palette-content-fg`      | 20, 25, 45    | `#14192D` |
| `--palette-accent`          | 140, 90, 15   | `#8C5A0F` |
| `--palette-content-surface` | 242, 240, 232 | `#F2F0E8` |
| `--palette-page-bg`         | 155, 100, 55  | `#9B6437` |
| `--palette-bright`          | 255, 253, 248 | `#FFFDF8` |

## 💥 Section Q — Chromatic Clash

### Crimson vs Teal

_Red-blue collision cooled by amber_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 234, 184, 188 | `#EAB8BC` |
| `--palette-nav-fg`          | 58, 3, 8      | `#3A0308` |
| `--palette-nav-dim`         | 137, 84, 89   | `#895459` |
| `--palette-content-bg`      | 21, 40, 38    | `#152826` |
| `--palette-content-fg`      | 230, 240, 239 | `#E6F0EF` |
| `--palette-accent`          | 250, 204, 66  | `#FACC42` |
| `--palette-content-surface` | 35, 53, 51    | `#233533` |
| `--palette-page-bg`         | 170, 147, 56  | `#AA9338` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Ultraviolet Meadow

_Violet + acid green, ochre punch_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 222, 184, 234 | `#DEB8EA` |
| `--palette-nav-fg`          | 44, 3, 58     | `#2C033A` |
| `--palette-nav-dim`         | 124, 84, 137  | `#7C5489` |
| `--palette-content-bg`      | 31, 40, 21    | `#1F2815` |
| `--palette-content-fg`      | 235, 240, 230 | `#EBF0E6` |
| `--palette-accent`          | 250, 158, 66  | `#FA9E42` |
| `--palette-content-surface` | 44, 53, 35    | `#2C3523` |
| `--palette-page-bg`         | 173, 117, 50  | `#AD7532` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Ember & Aegean

_Rust nav, deep sea reading_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 234, 196, 184 | `#EAC4B8` |
| `--palette-nav-fg`          | 58, 17, 3     | `#3A1103` |
| `--palette-nav-dim`         | 137, 98, 84   | `#896254` |
| `--palette-content-bg`      | 21, 31, 40    | `#151F28` |
| `--palette-content-fg`      | 230, 235, 240 | `#E6EBF0` |
| `--palette-accent`          | 250, 235, 66  | `#FAEB42` |
| `--palette-content-surface` | 35, 44, 53    | `#232C35` |
| `--palette-page-bg`         | 170, 164, 57  | `#AAA439` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Jade & Magenta

_Botanical against theatre pink_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 184, 234, 205 | `#B8EACD` |
| `--palette-nav-fg`          | 3, 58, 26     | `#033A1A` |
| `--palette-nav-dim`         | 84, 137, 107  | `#54896B` |
| `--palette-content-bg`      | 40, 21, 34    | `#281522` |
| `--palette-content-fg`      | 240, 230, 236 | `#F0E6EC` |
| `--palette-accent`          | 66, 189, 250  | `#42BDFA` |
| `--palette-content-surface` | 53, 35, 47    | `#35232F` |
| `--palette-page-bg`         | 57, 130, 174  | `#3982AE` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Butter & Cobalt

_Warm signage, cold long-form_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 234, 230, 184 | `#EAE6B8` |
| `--palette-nav-fg`          | 58, 54, 3     | `#3A3603` |
| `--palette-nav-dim`         | 137, 133, 84  | `#898554` |
| `--palette-content-bg`      | 24, 21, 40    | `#181528` |
| `--palette-content-fg`      | 231, 230, 240 | `#E7E6F0` |
| `--palette-accent`          | 250, 81, 66   | `#FA5142` |
| `--palette-content-surface` | 38, 35, 53    | `#262335` |
| `--palette-page-bg`         | 171, 60, 57   | `#AB3C39` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

## 🖨️ Section R — Riso / Duotone

### Riso Pink & Federal

_Zine cover, ink still tacky_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 239, 224 | `#F5EFE0` |
| `--palette-nav-fg`          | 61, 85, 136   | `#3D5588` |
| `--palette-nav-dim`         | 144, 154, 176 | `#909AB0` |
| `--palette-content-bg`      | 249, 245, 235 | `#F9F5EB` |
| `--palette-content-fg`      | 61, 85, 136   | `#3D5588` |
| `--palette-accent`          | 153, 0, 87    | `#990057` |
| `--palette-content-surface` | 234, 230, 221 | `#EAE6DD` |
| `--palette-page-bg`         | 187, 86, 139  | `#BB568B` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Riso Kraft & Aqua

_Community poster, deep bordeaux_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 232, 220, 196 | `#E8DCC4` |
| `--palette-nav-fg`          | 99, 54, 78    | `#63364E` |
| `--palette-nav-dim`         | 159, 129, 131 | `#9F8183` |
| `--palette-content-bg`      | 240, 232, 217 | `#F0E8D9` |
| `--palette-content-fg`      | 145, 78, 114  | `#914E72` |
| `--palette-accent`          | 0, 144, 153   | `#009099` |
| `--palette-content-surface` | 226, 218, 204 | `#E2DACC` |
| `--palette-page-bg`         | 84, 175, 175  | `#54AFAF` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Riso Violet & Neon Coral

_Punk chapbook, screaming coral_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 239, 224 | `#F5EFE0` |
| `--palette-nav-fg`          | 118, 91, 167  | `#765BA7` |
| `--palette-nav-dim`         | 175, 158, 193 | `#AF9EC1` |
| `--palette-content-bg`      | 249, 245, 235 | `#F9F5EB` |
| `--palette-content-fg`      | 118, 91, 167  | `#765BA7` |
| `--palette-accent`          | 153, 0, 3     | `#990003` |
| `--palette-content-surface` | 234, 230, 221 | `#EAE6DD` |
| `--palette-page-bg`         | 187, 86, 84   | `#BB5654` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Riso Forest & Burgundy

_Herbarium plate + wine stain_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 239, 224 | `#F5EFE0` |
| `--palette-nav-fg`          | 0, 122, 59    | `#007A3B` |
| `--palette-nav-dim`         | 110, 175, 133 | `#6EAF85` |
| `--palette-content-bg`      | 249, 245, 235 | `#F9F5EB` |
| `--palette-content-fg`      | 0, 122, 59    | `#007A3B` |
| `--palette-accent`          | 145, 78, 114  | `#914E72` |
| `--palette-content-surface` | 234, 230, 221 | `#EAE6DD` |
| `--palette-page-bg`         | 181, 136, 156 | `#B5889C` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Riso Ink & Yellow

_Black + hi-vis yellow on kraft_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 232, 220, 196 | `#E8DCC4` |
| `--palette-nav-fg`          | 42, 42, 42    | `#2A2A2A` |
| `--palette-nav-dim`         | 128, 122, 111 | `#807A6F` |
| `--palette-content-bg`      | 240, 232, 217 | `#F0E8D9` |
| `--palette-content-fg`      | 42, 42, 42    | `#2A2A2A` |
| `--palette-accent`          | 143, 130, 0   | `#8F8200` |
| `--palette-content-surface` | 226, 218, 204 | `#E2DACC` |
| `--palette-page-bg`         | 177, 166, 76  | `#B1A64C` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## ☢️ Section S — Toxic / Bioluminescent

### Radium Dial

_Watchface glow after the lights die_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 17, 19, 11    | `#11130B` |
| `--palette-nav-fg`          | 228, 234, 215 | `#E4EAD7` |
| `--palette-nav-dim`         | 133, 137, 123 | `#85897B` |
| `--palette-content-bg`      | 11, 12, 8     | `#0B0C08` |
| `--palette-content-fg`      | 237, 240, 230 | `#EDF0E6` |
| `--palette-accent`          | 186, 255, 26  | `#BAFF1A` |
| `--palette-content-surface` | 26, 27, 23    | `#1A1B17` |
| `--palette-page-bg`         | 125, 170, 20  | `#7DAA14` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Neon Frog

_Dendrobates green, do-not-touch bright_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 11, 19, 13    | `#0B130D` |
| `--palette-nav-fg`          | 215, 234, 218 | `#D7EADA` |
| `--palette-nav-dim`         | 123, 137, 126 | `#7B897E` |
| `--palette-content-bg`      | 8, 12, 9      | `#080C09` |
| `--palette-content-fg`      | 230, 240, 231 | `#E6F0E7` |
| `--palette-accent`          | 10, 255, 51   | `#0AFF33` |
| `--palette-content-surface` | 23, 27, 24    | `#171B18` |
| `--palette-page-bg`         | 9, 170, 36    | `#09AA24` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### UV Reactor

_Blacklight violet, subterranean_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 17, 11, 19    | `#110B13` |
| `--palette-nav-fg`          | 229, 215, 234 | `#E5D7EA` |
| `--palette-nav-dim`         | 134, 123, 137 | `#867B89` |
| `--palette-content-bg`      | 11, 8, 12     | `#0B080C` |
| `--palette-content-fg`      | 237, 230, 240 | `#EDE6F0` |
| `--palette-accent`          | 207, 61, 255  | `#CF3DFF` |
| `--palette-content-surface` | 26, 23, 27    | `#1A171B` |
| `--palette-page-bg`         | 138, 42, 170  | `#8A2AAA` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Deep Bioluminescence

_Anglerfish lure at 800 m_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 11, 18, 19    | `#0B1213` |
| `--palette-nav-fg`          | 215, 231, 234 | `#D7E7EA` |
| `--palette-nav-dim`         | 123, 135, 137 | `#7B8789` |
| `--palette-content-bg`      | 8, 12, 12     | `#080C0C` |
| `--palette-content-fg`      | 230, 238, 240 | `#E6EEF0` |
| `--palette-accent`          | 26, 217, 255  | `#1AD9FF` |
| `--palette-content-surface` | 23, 27, 27    | `#171B1B` |
| `--palette-page-bg`         | 20, 145, 170  | `#1491AA` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Hazmat Yellow

_Trefoil sign, keep back three metres_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 19, 18, 11    | `#13120B` |
| `--palette-nav-fg`          | 234, 232, 215 | `#EAE8D7` |
| `--palette-nav-dim`         | 137, 136, 123 | `#89887B` |
| `--palette-content-bg`      | 12, 12, 8     | `#0C0C08` |
| `--palette-content-fg`      | 240, 239, 230 | `#F0EFE6` |
| `--palette-accent`          | 255, 236, 26  | `#FFEC1A` |
| `--palette-content-surface` | 27, 27, 23    | `#1B1B17` |
| `--palette-page-bg`         | 170, 158, 20  | `#AA9E14` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

## 🎬 Section T — Split-Tone Cinematic

### Teal & Orange

_Blockbuster grade, standard issue_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 9, 24, 32     | `#091820` |
| `--palette-nav-fg`          | 243, 186, 138 | `#F3BA8A` |
| `--palette-nav-dim`         | 138, 113, 90  | `#8A715A` |
| `--palette-content-bg`      | 12, 32, 42    | `#0C202A` |
| `--palette-content-fg`      | 246, 203, 167 | `#F6CBA7` |
| `--palette-accent`          | 235, 140, 60  | `#EB8C3C` |
| `--palette-content-surface` | 27, 45, 55    | `#1B2D37` |
| `--palette-page-bg`         | 157, 102, 54  | `#9D6636` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Amelie

_Magenta shadows, absinthe highlights_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 30, 9, 32     | `#1E0920` |
| `--palette-nav-fg`          | 180, 234, 174 | `#B4EAAE` |
| `--palette-nav-dim`         | 113, 133, 110 | `#71856E` |
| `--palette-content-bg`      | 40, 12, 42    | `#280C2A` |
| `--palette-content-fg`      | 199, 239, 194 | `#C7EFC2` |
| `--palette-accent`          | 130, 220, 120 | `#82DC78` |
| `--palette-content-surface` | 53, 27, 55    | `#351B37` |
| `--palette-page-bg`         | 99, 147, 93   | `#63935D` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Blade Runner

_Deep noir blue, sodium-lamp gold_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 6, 15, 32     | `#060F20` |
| `--palette-nav-fg`          | 255, 222, 162 | `#FFDEA2` |
| `--palette-nav-dim`         | 143, 129, 104 | `#8F8168` |
| `--palette-content-bg`      | 8, 20, 42     | `#08142A` |
| `--palette-content-fg`      | 255, 230, 185 | `#FFE6B9` |
| `--palette-accent`          | 255, 200, 100 | `#FFC864` |
| `--palette-content-surface` | 23, 34, 55    | `#172237` |
| `--palette-page-bg`         | 169, 137, 80  | `#A98950` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Fincher Reverse

_Sepia gutter, cyan skin_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 34, 15, 11    | `#220F0B` |
| `--palette-nav-fg`          | 156, 222, 234 | `#9CDEEA` |
| `--palette-nav-dim`         | 101, 129, 134 | `#658186` |
| `--palette-content-bg`      | 45, 20, 15    | `#2D140F` |
| `--palette-content-fg`      | 181, 230, 239 | `#B5E6EF` |
| `--palette-accent`          | 90, 200, 220  | `#5AC8DC` |
| `--palette-content-surface` | 58, 34, 29    | `#3A221D` |
| `--palette-page-bg`         | 74, 137, 148  | `#4A8994` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

## 🧱 Section U — Brutalist / Anti-Design

### Concrete & Traffic

_Brut concrete, road-sign red_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 214, 214, 214 | `#D6D6D6` |
| `--palette-nav-fg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-dim`         | 102, 102, 102 | `#666666` |
| `--palette-content-bg`      | 237, 237, 237 | `#EDEDED` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 255, 51, 0    | `#FF3300` |
| `--palette-content-surface` | 223, 223, 223 | `#DFDFDF` |
| `--palette-page-bg`         | 249, 116, 83  | `#F97453` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Bunker & Hi-Vis

_Grey slab, high-vis workwear_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 214, 214, 214 | `#D6D6D6` |
| `--palette-nav-fg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-dim`         | 102, 102, 102 | `#666666` |
| `--palette-content-bg`      | 237, 237, 237 | `#EDEDED` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 143, 133, 0   | `#8F8500` |
| `--palette-content-surface` | 223, 223, 223 | `#DFDFDF` |
| `--palette-page-bg`         | 176, 169, 83  | `#B0A953` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Slab & Cyan

_Dark concrete, glowing signage_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 58, 58, 58    | `#3A3A3A` |
| `--palette-nav-fg`          | 245, 245, 245 | `#F5F5F5` |
| `--palette-nav-dim`         | 161, 161, 161 | `#A1A1A1` |
| `--palette-content-bg`      | 42, 42, 42    | `#2A2A2A` |
| `--palette-content-fg`      | 245, 245, 245 | `#F5F5F5` |
| `--palette-accent`          | 0, 229, 255   | `#00E5FF` |
| `--palette-content-surface` | 55, 55, 55    | `#373737` |
| `--palette-page-bg`         | 15, 164, 180  | `#0FA4B4` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Beton & Neon Pink

_Anti-design pink screaming out_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 214, 214, 214 | `#D6D6D6` |
| `--palette-nav-fg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-dim`         | 102, 102, 102 | `#666666` |
| `--palette-content-bg`      | 237, 237, 237 | `#EDEDED` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 255, 0, 168   | `#FF00A8` |
| `--palette-content-surface` | 223, 223, 223 | `#DFDFDF` |
| `--palette-page-bg`         | 249, 83, 192  | `#F953C0` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## 🖌️ Section V — CMYK Registration

### Registration Yellow

_Yellow plate over kiss-cut white_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 255, 242, 0   | `#FFF200` |
| `--palette-nav-fg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-dim`         | 120, 114, 6   | `#787206` |
| `--palette-content-bg`      | 253, 253, 248 | `#FDFDF8` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 236, 0, 140   | `#EC008C` |
| `--palette-content-surface` | 238, 238, 233 | `#EEEEE9` |
| `--palette-page-bg`         | 242, 89, 178  | `#F259B2` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Registration Cyan

_Process cyan bar, pink flourish_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 0, 174, 239   | `#00AEEF` |
| `--palette-nav-fg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-dim`         | 6, 84, 113    | `#065471` |
| `--palette-content-bg`      | 253, 253, 248 | `#FDFDF8` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 236, 0, 140   | `#EC008C` |
| `--palette-content-surface` | 238, 238, 233 | `#EEEEE9` |
| `--palette-page-bg`         | 242, 89, 178  | `#F259B2` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Registration Black

_Full ink nav, magenta highlight_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-fg`          | 217, 217, 217 | `#D9D9D9` |
| `--palette-nav-dim`         | 124, 124, 124 | `#7C7C7C` |
| `--palette-content-bg`      | 253, 253, 248 | `#FDFDF8` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 236, 0, 140   | `#EC008C` |
| `--palette-content-surface` | 238, 238, 233 | `#EEEEE9` |
| `--palette-page-bg`         | 242, 89, 178  | `#F259B2` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Registration Magenta

_Fuchsia banner, process cyan accent_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 236, 0, 140   | `#EC008C` |
| `--palette-nav-fg`          | 10, 10, 10    | `#0A0A0A` |
| `--palette-nav-dim`         | 112, 6, 69    | `#700645` |
| `--palette-content-bg`      | 253, 253, 248 | `#FDFDF8` |
| `--palette-content-fg`      | 10, 10, 10    | `#0A0A0A` |
| `--palette-accent`          | 0, 111, 153   | `#006F99` |
| `--palette-content-surface` | 238, 238, 233 | `#EEEEE9` |
| `--palette-page-bg`         | 89, 161, 186  | `#59A1BA` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## 🎨 Section W — Neo-Fauvism

### Charing Cross Bridge

_Derain: vermilion Thames, cobalt sky_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 247, 239, 217 | `#F7EFD9` |
| `--palette-nav-fg`          | 31, 11, 58    | `#1F0B3A` |
| `--palette-nav-dim`         | 128, 114, 130 | `#807282` |
| `--palette-content-bg`      | 249, 243, 227 | `#F9F3E3` |
| `--palette-content-fg`      | 31, 11, 58    | `#1F0B3A` |
| `--palette-accent`          | 230, 57, 70   | `#E63946` |
| `--palette-content-surface` | 234, 228, 213 | `#EAE4D5` |
| `--palette-page-bg`         | 237, 122, 125 | `#ED7A7D` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Green Stripe

_Matisse: pink cheek, seagreen brow_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 253, 236, 200 | `#FDECC8` |
| `--palette-nav-fg`          | 14, 42, 71    | `#0E2A47` |
| `--palette-nav-dim`         | 122, 129, 129 | `#7A8181` |
| `--palette-content-bg`      | 254, 241, 214 | `#FEF1D6` |
| `--palette-content-fg`      | 14, 42, 71    | `#0E2A47` |
| `--palette-accent`          | 216, 17, 89   | `#D81159` |
| `--palette-content-surface` | 239, 227, 201 | `#EFE3C9` |
| `--palette-page-bg`         | 229, 95, 133  | `#E55F85` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Vlaminck Barges

_Violet water, vermilion hulls_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 240, 227, 208 | `#F0E3D0` |
| `--palette-nav-fg`          | 42, 10, 63    | `#2A0A3F` |
| `--palette-nav-dim`         | 131, 108, 128 | `#836C80` |
| `--palette-content-bg`      | 244, 234, 220 | `#F4EADC` |
| `--palette-content-fg`      | 42, 10, 63    | `#2A0A3F` |
| `--palette-accent`          | 180, 36, 122  | `#B4247A` |
| `--palette-content-surface` | 229, 220, 207 | `#E5DCCF` |
| `--palette-page-bg`         | 202, 105, 156 | `#CA699C` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Estaque Trees

_Braque hills, jade against orange_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 255, 238, 208 | `#FFEED0` |
| `--palette-nav-fg`          | 32, 23, 74    | `#20174A` |
| `--palette-nav-dim`         | 132, 120, 134 | `#847886` |
| `--palette-content-bg`      | 255, 242, 220 | `#FFF2DC` |
| `--palette-content-fg`      | 32, 23, 74    | `#20174A` |
| `--palette-accent`          | 15, 138, 110  | `#0F8A6E` |
| `--palette-content-surface` | 240, 227, 207 | `#F0E3CF` |
| `--palette-page-bg`         | 99, 174, 149  | `#63AE95` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

## ☀️ Section X — Solarized Family

### Solarized Light

_Schoonover 2011, base3 paper_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 238, 232, 213 | `#EEE8D5` |
| `--palette-nav-fg`          | 66, 82, 87    | `#425257` |
| `--palette-nav-dim`         | 143, 150, 144 | `#8F9690` |
| `--palette-content-bg`      | 253, 246, 227 | `#FDF6E3` |
| `--palette-content-fg`      | 67, 81, 86    | `#435156` |
| `--palette-accent`          | 203, 75, 22   | `#CB4B16` |
| `--palette-content-surface` | 238, 231, 213 | `#EEE7D5` |
| `--palette-page-bg`         | 221, 135, 94  | `#DD875E` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Solarized Dark

_Schoonover 2011, base03 board_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 7, 54, 66     | `#073642` |
| `--palette-nav-fg`          | 147, 161, 161 | `#93A1A1` |
| `--palette-nav-dim`         | 84, 113, 118  | `#547176` |
| `--palette-content-bg`      | 0, 43, 54     | `#002B36` |
| `--palette-content-fg`      | 131, 148, 150 | `#839496` |
| `--palette-accent`          | 181, 137, 0   | `#B58900` |
| `--palette-content-surface` | 15, 56, 66    | `#0F3842` |
| `--palette-page-bg`         | 118, 104, 19  | `#766813` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Selenized Light

_Selenized fork, warmer paper_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 238, 231, 208 | `#EEE7D0` |
| `--palette-nav-fg`          | 83, 103, 109  | `#53676D` |
| `--palette-nav-dim`         | 153, 161, 154 | `#99A19A` |
| `--palette-content-bg`      | 251, 243, 219 | `#FBF3DB` |
| `--palette-content-fg`      | 83, 103, 109  | `#53676D` |
| `--palette-accent`          | 153, 121, 0   | `#997900` |
| `--palette-content-surface` | 236, 228, 206 | `#ECE4CE` |
| `--palette-page-bg`         | 187, 164, 77  | `#BBA44D` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Photonegative Solarized

_Solarized Light with roles inverted_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 253, 246, 227 | `#FDF6E3` |
| `--palette-nav-fg`          | 138, 51, 15   | `#8A330F` |
| `--palette-nav-dim`         | 190, 139, 110 | `#BE8B6E` |
| `--palette-content-bg`      | 0, 43, 54     | `#002B36` |
| `--palette-content-fg`      | 253, 246, 227 | `#FDF6E3` |
| `--palette-accent`          | 42, 161, 152  | `#2AA198` |
| `--palette-content-surface` | 15, 56, 66    | `#0F3842` |
| `--palette-page-bg`         | 27, 120, 118  | `#1B7876` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

## 🎯 Section Y — Monochromatic Extreme

### Vermilion Only

_One red hue, ramp from 8 to 96_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 238, 211, 211 | `#EED3D3` |
| `--palette-nav-fg`          | 69, 8, 8      | `#450808` |
| `--palette-nav-dim`         | 145, 99, 99   | `#916363` |
| `--palette-content-bg`      | 23, 17, 17    | `#171111` |
| `--palette-content-fg`      | 241, 228, 228 | `#F1E4E4` |
| `--palette-accent`          | 250, 66, 66   | `#FA4242` |
| `--palette-content-surface` | 37, 31, 31    | `#251F1F` |
| `--palette-page-bg`         | 171, 49, 49   | `#AB3131` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Chlorophyll Only

_One green hue across the ramp_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 211, 238, 222 | `#D3EEDE` |
| `--palette-nav-fg`          | 8, 69, 33     | `#084521` |
| `--palette-nav-dim`         | 99, 145, 118  | `#639176` |
| `--palette-content-bg`      | 17, 23, 20    | `#111714` |
| `--palette-content-fg`      | 228, 241, 234 | `#E4F1EA` |
| `--palette-accent`          | 66, 250, 143  | `#42FA8F` |
| `--palette-content-surface` | 31, 37, 34    | `#1F2522` |
| `--palette-page-bg`         | 49, 171, 100  | `#31AB64` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Cobalt Only

_One blue hue, black to porcelain_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 211, 222, 238 | `#D3DEEE` |
| `--palette-nav-fg`          | 8, 33, 69     | `#082145` |
| `--palette-nav-dim`         | 99, 118, 145  | `#637691` |
| `--palette-content-bg`      | 17, 20, 23    | `#111417` |
| `--palette-content-fg`      | 228, 234, 241 | `#E4EAF1` |
| `--palette-accent`          | 66, 143, 250  | `#428FFA` |
| `--palette-content-surface` | 31, 34, 37    | `#1F2225` |
| `--palette-page-bg`         | 49, 100, 171  | `#3164AB` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Gold Only

_One warm ochre, no other colour_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 238, 231, 211 | `#EEE7D3` |
| `--palette-nav-fg`          | 69, 54, 8     | `#453608` |
| `--palette-nav-dim`         | 145, 134, 99  | `#918663` |
| `--palette-content-bg`      | 23, 22, 17    | `#171611` |
| `--palette-content-fg`      | 241, 238, 228 | `#F1EEE4` |
| `--palette-accent`          | 250, 204, 66  | `#FACC42` |
| `--palette-content-surface` | 37, 36, 31    | `#25241F` |
| `--palette-page-bg`         | 171, 140, 49  | `#AB8C31` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Magenta Only

_One magenta, from ink to bloom_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 238, 211, 231 | `#EED3E7` |
| `--palette-nav-fg`          | 69, 8, 54     | `#450836` |
| `--palette-nav-dim`         | 145, 99, 134  | `#916386` |
| `--palette-content-bg`      | 23, 17, 22    | `#171116` |
| `--palette-content-fg`      | 241, 228, 238 | `#F1E4EE` |
| `--palette-accent`          | 250, 66, 204  | `#FA42CC` |
| `--palette-content-surface` | 37, 31, 36    | `#251F24` |
| `--palette-page-bg`         | 171, 49, 140  | `#AB318C` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

## 👾 Section Z — Retro Computing

### CGA-1 High

_IBM CGA palette 1, high intensity_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 0, 0, 0       | `#000000` |
| `--palette-nav-fg`          | 255, 255, 255 | `#FFFFFF` |
| `--palette-nav-dim`         | 140, 140, 140 | `#8C8C8C` |
| `--palette-content-bg`      | 0, 0, 0       | `#000000` |
| `--palette-content-fg`      | 85, 255, 255  | `#55FFFF` |
| `--palette-accent`          | 255, 85, 255  | `#FF55FF` |
| `--palette-content-surface` | 15, 15, 15    | `#0F0F0F` |
| `--palette-page-bg`         | 166, 55, 166  | `#A637A6` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### CGA-2 High

_IBM CGA palette 2, red / green / brown_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 0, 0, 0       | `#000000` |
| `--palette-nav-fg`          | 255, 255, 255 | `#FFFFFF` |
| `--palette-nav-dim`         | 140, 140, 140 | `#8C8C8C` |
| `--palette-content-bg`      | 0, 0, 0       | `#000000` |
| `--palette-content-fg`      | 85, 255, 85   | `#55FF55` |
| `--palette-accent`          | 255, 85, 85   | `#FF5555` |
| `--palette-content-surface` | 15, 15, 15    | `#0F0F0F` |
| `--palette-page-bg`         | 166, 55, 55   | `#A63737` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Commodore 64

_C64 Pepto palette, boot screen_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 62, 49, 162   | `#3E31A2` |
| `--palette-nav-fg`          | 199, 194, 239 | `#C7C2EF` |
| `--palette-nav-dim`         | 137, 129, 204 | `#8981CC` |
| `--palette-content-bg`      | 62, 49, 162   | `#3E31A2` |
| `--palette-content-fg`      | 199, 194, 239 | `#C7C2EF` |
| `--palette-accent`          | 184, 199, 111 | `#B8C76F` |
| `--palette-content-surface` | 74, 61, 168   | `#4A3DA8` |
| `--palette-page-bg`         | 141, 147, 129 | `#8D9381` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Amiga Workbench

_Workbench 1.x default, blue over orange_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 0, 85, 170    | `#0055AA` |
| `--palette-nav-fg`          | 255, 255, 255 | `#FFFFFF` |
| `--palette-nav-dim`         | 140, 179, 217 | `#8CB3D9` |
| `--palette-content-bg`      | 170, 170, 170 | `#AAAAAA` |
| `--palette-content-fg`      | 0, 0, 0       | `#000000` |
| `--palette-accent`          | 133, 71, 0    | `#854700` |
| `--palette-content-surface` | 160, 160, 160 | `#A0A0A0` |
| `--palette-page-bg`         | 146, 106, 59  | `#926A3B` |
| `--palette-bright`          | 255, 255, 255 | `#FFFFFF` |

### Apple II Hi-Res

_Woz hi-res orange / green / violet_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 0, 0, 0       | `#000000` |
| `--palette-nav-fg`          | 255, 255, 255 | `#FFFFFF` |
| `--palette-nav-dim`         | 140, 140, 140 | `#8C8C8C` |
| `--palette-content-bg`      | 0, 0, 0       | `#000000` |
| `--palette-content-fg`      | 0, 224, 0     | `#00E000` |
| `--palette-accent`          | 255, 102, 0   | `#FF6600` |
| `--palette-content-surface` | 15, 15, 15    | `#0F0F0F` |
| `--palette-page-bg`         | 166, 66, 0    | `#A64200` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

## 🧭 Section AA — Uncharted

### Thermal FLIR

_Sensor imaging, cold indigo → hot orange_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 5, 30      | `#08051E` |
| `--palette-nav-fg`          | 255, 225, 90  | `#FFE15A` |
| `--palette-nav-dim`         | 200, 130, 90  | `#C8825A` |
| `--palette-content-bg`      | 5, 3, 15      | `#05030F` |
| `--palette-content-fg`      | 255, 235, 200 | `#FFEBC8` |
| `--palette-accent`          | 255, 100, 30  | `#FF641E` |
| `--palette-content-surface` | 20, 12, 45    | `#140C2D` |
| `--palette-page-bg`         | 120, 25, 90   | `#78195A` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Bruise & Iodine

_Bandage cream, bruised violet, iodine amber_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 242, 232, 218 | `#F2E8DA` |
| `--palette-nav-fg`          | 55, 18, 45    | `#37122D` |
| `--palette-nav-dim`         | 125, 90, 105  | `#7D5A69` |
| `--palette-content-bg`      | 42, 18, 55    | `#2A1237` |
| `--palette-content-fg`      | 240, 220, 205 | `#F0DCCD` |
| `--palette-accent`          | 220, 155, 55  | `#DC9B37` |
| `--palette-content-surface` | 60, 28, 70    | `#3C1C46` |
| `--palette-page-bg`         | 115, 65, 95   | `#73415F` |
| `--palette-bright`          | 255, 250, 240 | `#FFFAF0` |

### Petrichor

_Wet slate, ozone teal, moss shadow_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 232, 228, 215 | `#E8E4D7` |
| `--palette-nav-fg`          | 22, 32, 30    | `#16201E` |
| `--palette-nav-dim`         | 95, 108, 100  | `#5F6C64` |
| `--palette-content-bg`      | 20, 32, 34    | `#142022` |
| `--palette-content-fg`      | 218, 228, 215 | `#DAE4D7` |
| `--palette-accent`          | 130, 200, 175 | `#82C8AF` |
| `--palette-content-surface` | 30, 46, 46    | `#1E2E2E` |
| `--palette-page-bg`         | 110, 128, 118 | `#6E8076` |
| `--palette-bright`          | 248, 250, 240 | `#F8FAF0` |

### Malachite Vein

_Marbled jewel green + oxidized brass_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 10, 25, 20    | `#0A1914` |
| `--palette-nav-fg`          | 200, 235, 215 | `#C8EBD7` |
| `--palette-nav-dim`         | 95, 145, 120  | `#5F9178` |
| `--palette-content-bg`      | 12, 35, 28    | `#0C231C` |
| `--palette-content-fg`      | 215, 240, 225 | `#D7F0E1` |
| `--palette-accent`          | 210, 165, 65  | `#D2A541` |
| `--palette-content-surface` | 22, 55, 42    | `#16372A` |
| `--palette-page-bg`         | 55, 105, 78   | `#37694E` |
| `--palette-bright`          | 245, 252, 240 | `#F5FCF0` |

### Copper Patina

_Weathered stone, limestone, verdigris_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 232, 220, 200 | `#E8DCC8` |
| `--palette-nav-fg`          | 40, 25, 15    | `#28190F` |
| `--palette-nav-dim`         | 110, 85, 60   | `#6E553C` |
| `--palette-content-bg`      | 242, 236, 224 | `#F2ECE0` |
| `--palette-content-fg`      | 35, 20, 12    | `#23140C` |
| `--palette-accent`          | 20, 115, 90   | `#14735A` |
| `--palette-content-surface` | 222, 218, 205 | `#DEDACD` |
| `--palette-page-bg`         | 155, 108, 68  | `#9B6C44` |
| `--palette-bright`          | 252, 250, 240 | `#FCFAF0` |

### Iznik Tile

_Ivory glaze, Persian cobalt, coral red_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 242, 232 | `#F5F2E8` |
| `--palette-nav-fg`          | 8, 25, 65     | `#081941` |
| `--palette-nav-dim`         | 90, 115, 155  | `#5A739B` |
| `--palette-content-bg`      | 10, 30, 85    | `#0A1E55` |
| `--palette-content-fg`      | 235, 240, 250 | `#EBF0FA` |
| `--palette-accent`          | 235, 105, 85  | `#EB6955` |
| `--palette-content-surface` | 22, 48, 110   | `#16306E` |
| `--palette-page-bg`         | 50, 170, 175  | `#32AAAF` |
| `--palette-bright`          | 252, 252, 245 | `#FCFCF5` |

### Grotto & Torch

_Cave dark, calcite pale, torch amber_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 12, 12, 15    | `#0C0C0F` |
| `--palette-nav-fg`          | 220, 210, 190 | `#DCD2BE` |
| `--palette-nav-dim`         | 110, 100, 85  | `#6E6455` |
| `--palette-content-bg`      | 16, 18, 22    | `#101216` |
| `--palette-content-fg`      | 225, 215, 195 | `#E1D7C3` |
| `--palette-accent`          | 235, 145, 55  | `#EB9137` |
| `--palette-content-surface` | 26, 30, 34    | `#1A1E22` |
| `--palette-page-bg`         | 38, 60, 55    | `#263C37` |
| `--palette-bright`          | 245, 235, 220 | `#F5EBDC` |

### Alpenglow

_Pink-tinged snow, spruce shadow, dawn rose_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 245, 232, 232 | `#F5E8E8` |
| `--palette-nav-fg`          | 35, 30, 55    | `#231E37` |
| `--palette-nav-dim`         | 130, 100, 115 | `#826473` |
| `--palette-content-bg`      | 252, 248, 245 | `#FCF8F5` |
| `--palette-content-fg`      | 38, 32, 50    | `#262032` |
| `--palette-accent`          | 180, 55, 90   | `#B4375A` |
| `--palette-content-surface` | 242, 232, 232 | `#F2E8E8` |
| `--palette-page-bg`         | 175, 150, 165 | `#AF96A5` |
| `--palette-bright`          | 255, 253, 250 | `#FFFDFA` |

### Void & Ion

_Ion black, plasma white, electric violet_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 2, 0, 8       | `#020008` |
| `--palette-nav-fg`          | 235, 220, 255 | `#EBDCFF` |
| `--palette-nav-dim`         | 140, 100, 200 | `#8C64C8` |
| `--palette-content-bg`      | 4, 0, 12      | `#04000C` |
| `--palette-content-fg`      | 240, 225, 255 | `#F0E1FF` |
| `--palette-accent`          | 180, 80, 255  | `#B450FF` |
| `--palette-content-surface` | 15, 5, 30     | `#0F051E` |
| `--palette-page-bg`         | 55, 20, 100   | `#371464` |
| `--palette-bright`          | 255, 250, 255 | `#FFFAFF` |

### Chromatic Rift

_RGB split — near-black + magenta + cyan_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 8, 12      | `#08080C` |
| `--palette-nav-fg`          | 240, 240, 245 | `#F0F0F5` |
| `--palette-nav-dim`         | 125, 125, 135 | `#7D7D87` |
| `--palette-content-bg`      | 12, 12, 18    | `#0C0C12` |
| `--palette-content-fg`      | 235, 240, 245 | `#EBF0F5` |
| `--palette-accent`          | 240, 50, 130  | `#F03282` |
| `--palette-content-surface` | 24, 22, 32    | `#181620` |
| `--palette-page-bg`         | 30, 200, 220  | `#1EC8DC` |
| `--palette-bright`          | 250, 250, 250 | `#FAFAFA` |

### Nebula Drift

_Cosmic navy, starlight, red-giant magenta_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 8, 5, 20      | `#080514` |
| `--palette-nav-fg`          | 230, 220, 240 | `#E6DCF0` |
| `--palette-nav-dim`         | 140, 110, 165 | `#8C6EA5` |
| `--palette-content-bg`      | 10, 8, 28     | `#0A081C` |
| `--palette-content-fg`      | 235, 225, 245 | `#EBE1F5` |
| `--palette-accent`          | 230, 80, 140  | `#E6508C` |
| `--palette-content-surface` | 22, 15, 45    | `#160F2D` |
| `--palette-page-bg`         | 95, 35, 130   | `#5F2382` |
| `--palette-bright`          | 250, 245, 255 | `#FAF5FF` |

### Hazmat Trefoil

_Trefoil black, hazmat yellow, warning red_

| Token                       | RGB           | Hex       |
| --------------------------- | ------------- | --------- |
| `--palette-nav-bg`          | 15, 15, 12    | `#0F0F0C` |
| `--palette-nav-fg`          | 255, 220, 30  | `#FFDC1E` |
| `--palette-nav-dim`         | 175, 155, 45  | `#AF9B2D` |
| `--palette-content-bg`      | 240, 238, 232 | `#F0EEE8` |
| `--palette-content-fg`      | 15, 15, 12    | `#0F0F0C` |
| `--palette-accent`          | 200, 20, 20   | `#C81414` |
| `--palette-content-surface` | 228, 226, 216 | `#E4E2D8` |
| `--palette-page-bg`         | 255, 205, 0   | `#FFCD00` |
| `--palette-bright`          | 255, 255, 245 | `#FFFFF5` |
