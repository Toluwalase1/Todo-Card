# HNG Todo Task Card

A clean, modern single-task card UI with interactive editing, status control, priority indicators, and smart time management. Built with semantic HTML, CSS, and vanilla JavaScript.

## Live URL
https://todo-card-two.vercel.app/


## How to Run Locally
1. Clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser 

## Stage 0: Core Task Card (Completed)
- Semantic task card with all required `data-testid` attributes
- Task details: title, description, priority badge, due date, remaining time, status, tags, and action buttons
- Real completion checkbox with accessible labeling
- Dynamic due date and relative time hint updates every 45 seconds
- Responsive black-and-white visual style

## Stage 1: Interactive Features (NEW)

### What Changed
- **Edit Mode**: Card now enters an edit form on "Edit" button click
- **Status Control**: Added a status dropdown to change status between Pending, In Progress, and Done
- **Priority Indicator**: Added a colored left border that changes based on priority (Low, Medium, High)
- **Collapsible Description**: Long descriptions now collapse and can be expanded with a toggle
- **Overdue Indicator**: When a task is overdue, a red badge appears
- **Smart Time Management**: When status is set to "Done", time remaining stops updating and shows "Completed"

### New Test IDs (Stage 1)
- `test-todo-edit-form` – Edit form container
- `test-todo-edit-title-input` – Title input field
- `test-todo-edit-description-input` – Description textarea
- `test-todo-edit-priority-select` – Priority dropdown
- `test-todo-edit-due-date-input` – Due date input
- `test-todo-save-button` – Save button
- `test-todo-cancel-button` – Cancel button
- `test-todo-status-control` – Status dropdown control
- `test-todo-priority-indicator` – Visual priority indicator (colored bar)
- `test-todo-expand-toggle` – Expand/collapse toggle button
- `test-todo-overdue-indicator` – Overdue badge


## Key Decisions
- Chose vanilla HTML/CSS/JS to match requirement and keep setup lightweight.
- Used semantic elements (`article`, `h2`, `p`, `time`, `ul`, `li`, `button`, `select`, `textarea`) for accessibility and structure.
- Used `data-testid` values exactly as specified to align with test automation criteria.
- Kept visual direction minimal (black/white, colored accents) for a modern non-flashy look.
- Priority indicator as a colored left border provides quick scanning without visual clutter.
- Status dropdown in addition to badge allows rapid status changes without entering edit mode.
- Client-side state management with a single state object keeps logic predictable.

## Trade-offs and Known Limitations

1. **Single Card Only**: This is a single card component, not a full app with multiple tasks.
2. **Delete Button**: Currently a placeholder with no action.
3. **Date Locale Dependent**: Month/day text varies by browser locale.
4. **No Undo/Redo**: Changes are direct; no history capability.

## Accessibility Features

- **Semantic HTML**: Uses `article`, `h2`, `p`, `time`, `button`, `select`, `textarea`, `input[type="checkbox"]`
- **ARIA Labels**: All interactive elements have `aria-label` or associated labels
- **Focus Management**: Form inputs focus on edit mode entry; focus returns to Edit button on cancel
- **Keyboard Navigation**: All controls are keyboard accessible (tab, enter, arrow keys for select)
- **Live Regions**: Status and time remaining use `aria-live="polite"` for dynamic updates
- **Semantic Time**: `<time datetime="">` elements for structured date/time data



