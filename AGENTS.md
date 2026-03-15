# AGENTS.md

## Cursor Cloud specific instructions

### Overview
FamilyMoney is a collection of static HTML/CSS/JS financial simulation tools for Japanese families. There is no build system, no package manager, and no server-side code. All external libraries (Chart.js, Google Fonts) are loaded from CDNs at runtime.

### Running the dev server
```bash
python3 -m http.server 8000
```
Access at `http://localhost:8000`. See `README.md` for details.

### Key files
- `index.html` — Landing page with links to all simulators
- `kakei.html` — Household budget simulator (uses Chart.js for graphs)
- `souzokuzei.html` — Inheritance tax calculator
- `kyouikushikin.html` — Education cost simulator
- `nenkin.html` — Pension/retirement simulator
- `初回ヒアリングシート_家計相談.html` — Consultation intake form (uses Formspree)

### Notes
- No linter, test framework, or build step exists in this repo. Validation is done by manually opening each HTML file in a browser.
- The Formspree form in `初回ヒアリングシート_家計相談.html` requires a real Formspree form ID to submit; it is not needed for local development of the simulators.
- All JavaScript logic is inline within each HTML file — there are no separate `.js` files.
