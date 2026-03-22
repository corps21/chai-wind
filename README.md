# Chai-Wind

A small **utility-first CSS engine** in JavaScript. You mark up with `chai-*` classes; the library walks the DOM, parses those classes, writes **inline styles**, then **removes** the utility tokens from `classList`—Tailwind-like ergonomics without a build step, implemented as client-side DOM work.

## How it works

1. **Collect** — Query every element whose `class` contains the configured prefix (default `chai-`).
2. **Filter** — On each element, keep only class names that start with that prefix.
3. **Parse** — Split each class on `-`. The segment after the prefix is the **utility type** (e.g. `p`, `text`, `bg`, `flex`). The rest are **props** for that type’s handler.
4. **Dispatch** — A `handler` map in `handler.js` routes the type to a function that sets `element.style.*`.
5. **Arbitrary values** — Bracket values (e.g. `chai-text-[14px]`, `chai-bg-[#333]`) go through `resolveCustom` in `utils.js`, which strips `[` `]` and applies theme-aware or raw CSS.
6. **Cleanup** — Each processed `chai-*` class is removed with `classList.remove` so the DOM does not retain utility tokens after styles are applied.

## Project layout

| File | Role |
|------|------|
| `index.js` | DOM scan, class filtering, parsing, dispatch, class removal |
| `handler.js` | Per-utility handlers (spacing, typography, color, flex, grid, etc.) |
| `constants.js` | Spacing scale, font sizes, color palettes, layout keyword maps |
| `utils.js` | `resolveCustom` for bracket arbitrary values |

## Supported utilities (overview)

- **Spacing** — `m*`, `p*` (including `x`/`y` and side variants) with scale (`chai-p-4`) or arbitrary units (`chai-px-[1rem]`).
- **Color** — `text-*`, `bg-*` with palette steps (`chai-text-red-500`), specials (`current`, `transparent`, …), and bracket colors.
- **Typography** — Preset sizes (`chai-text-sm`), alignment (`chai-text-center`), arbitrary size/color via `text-[…]`.
- **Borders & radius** — `rounded-*`, `border` and side variants (`border-x-*`, `border-y-*`, …).
- **Layout** — Position, `block` / `inline-block`, `flex` / `grid`, direction, wrap, `items-*`, `justify-*`, grid columns/rows, span/start/end helpers.
- **Sizing & overflow** — `w-*`, `h-*`, `overflow-*`, `z-*`.

For every supported token, see `handler.js` and `constants.js`.

## Usage

The package is an ES module (`"type": "module"` in `package.json`). Import `start` from `index.js` and call it once the document (or the subtree you care about) is ready.

```html
<script type="module">
  import start from "./path/to/index.js";
  start(); /* default prefix: chai- */
</script>

<div class="chai-p-4 chai-bg-red-500 chai-text-white chai-rounded-lg">
  Hello
</div>
```

### Custom prefix

```javascript
import start from "./index.js";
start("my-");
```

Classes then look like `my-p-4`, `my-bg-red-500`, etc.

### Example mapping

| Class | Effect (conceptually) |
|-------|------------------------|
| `chai-p-2` | Padding from spacing scale (rem) |
| `chai-bg-red` | `background-color` from named color |
| `chai-text-center` | `text-align: center` |
| `chai-flex chai-items-center chai-justify-between` | Flex container with alignment |

Unknown utility types log a console warning and are still removed from `classList`.

## Local development

No bundler is required if your environment serves ES modules. Run a static server at the repo root, add an HTML page that imports `index.js`, and use `chai-*` classes in the markup.

## Assignment / submission checklist

Typical deliverables for a utility-first CSS engine assignment:

| Item | Notes |
|------|--------|
| **Hosted demo** | Link: https://corps21.github.io/chai-wind/ |
| **Public repository** | Link: https://github.com/corps21/chai-wind/ |
| **Short video** |  https://www.youtube.com/watch?v=fYq7YUugrJE |
| **NPM Repository** | https://www.npmjs.com/package/@corps21/chai-wind |
| **Social post** | Post URL: https://x.com/i/status/2035735811086245996 |

