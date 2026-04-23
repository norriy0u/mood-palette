# 🎨 Mood Palette — Emotional Color Generator
**VishwaNova 2026 · National Level Weboreel AI Hackathon**

> You can't describe how you feel. But you can pick a color. Let Mood Palette translate your emotions into a full visual identity.

## ✨ Features
- 🧠 **Mood Wheel UI:** An interactive SVG-drawn emotion wheel with 12 mood segments. Clicking any segment triggers a full-page palette transition using CSS custom properties (`--primary`, `--accent`, `--bg`) animated via `transition: all 0.6s ease`.
- 🎨 **Procedural Palette Generation:** Each mood maps to a seeded HSL algorithm that generates a 5-color swatch set — complementary, triadic, and analogous variants rendered as draggable CSS tiles.
- 📋 **One-Click Copy:** Each swatch shows its HEX, RGB, and HSL code on hover. Clicking copies it to clipboard with a satisfying CSS "pop" micro-animation.
- 🌊 **Ambient Background Wave:** A full-viewport Canvas gradient wave animates continuously in the background, its color dynamically matching the active mood palette.
- 💾 **Export as CSS Variables:** A generated `:root {}` snippet with all 5 palette colors is shown in a styled `<pre>` block — copy it straight into your next project.

## 🛠️ Tech Stack
- **HTML5** — Canvas gradient animation, clipboard API.
- **Vanilla CSS3** — CSS custom property transitions, clip-path wave shapes, swatch hover effects.
- **Vanilla JavaScript** — HSL procedural palette algorithm, mood-to-color mapping, CSS export generator.

## 📸 Try It Out
Double-click `index.html` to open in any modern browser. Zero dependencies.

---
Built with ❤️ for VishwaNova 2026
