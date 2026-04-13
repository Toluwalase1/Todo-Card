# HNG Todo Task Card

A clean, modern single-task card UI built with semantic HTML, CSS, and vanilla JavaScript.

## Live URL
- Add your deployed link here (Netlify / Vercel / GitHub Pages):
- Example: https://your-project-name.netlify.app



## How to Run Locally
1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser 

## What Was Built
- Semantic task card container with required `data-testid` attributes for automated validation.
- Task details: title, description, priority badge, due date, remaining time, status, tags, and action buttons.
- Real completion checkbox (`input type="checkbox"`) with accessible labeling.
- Dynamic due date and relative time hint updates every 45 seconds.
- Responsive black-and-white visual style with subtle interaction states.

## Key Decisions
- Chose vanilla HTML/CSS/JS to match requirement and keep setup lightweight.
- Used semantic elements (`article`, `h2`, `p`, `time`, `ul`, `li`, `button`) for accessibility and structure.
- Used `data-testid` values exactly as specified to align with test automation criteria.
- Kept visual direction minimal (black/white, clean shadows, restrained motion) for a modern non-flashy look.

## Trade-offs
- Single-card implementation focuses on one polished task item rather than full multi-task CRUD flows.
- Date formatting depends on the user locale via `toLocaleDateString`, so month/day text may vary slightly by environment.


