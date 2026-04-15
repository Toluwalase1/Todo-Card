// DOM elements
const cardEl = document.querySelector('[data-testid="test-todo-card"]');
const titleEl = document.querySelector('[data-testid="test-todo-title"]');
const descriptionEl = document.querySelector('[data-testid="test-todo-description"]');
const priorityEl = document.querySelector('[data-testid="test-todo-priority"]');
const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');
const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
const statusEl = document.querySelector('[data-testid="test-todo-status"]');
const toggleEl = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const overdueIndicatorEl = document.querySelector('[data-testid="test-todo-overdue-indicator"]');

// Edit mode elements
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const editTitleInput = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const editDescriptionInput = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const editPrioritySelect = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const editDueDateInput = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');

// Status control
const statusControlSelect = document.querySelector('[data-testid="test-todo-status-control"]');

// Expand/collapse
const expandToggle = document.querySelector('[data-testid="test-todo-expand-toggle"]');

// State
let state = {
  title: titleEl.textContent,
  description: descriptionEl.textContent,
  priority: priorityEl.textContent,
  dueDate: new Date(dueDateEl.getAttribute('datetime')),
  status: statusEl.textContent,
  completed: toggleEl.checked,
  isEditMode: false
};

// Helper: Format date for due date display
function formatDueDate(date) {
  return `Due ${date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })}`;
}

// Helper: Format relative time
function formatRelativeTime(ms) {
  const absMs = Math.abs(ms);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (absMs < minute) {
    return ms >= 0 ? 'Due now' : 'Overdue just now';
  }

  const getValue = (unitMs) => Math.floor(absMs / unitMs);

  if (absMs < hour) {
    const mins = getValue(minute);
    return ms >= 0
      ? `Due in ${mins} minute${mins === 1 ? '' : 's'}`
      : `Overdue by ${mins} minute${mins === 1 ? '' : 's'}`;
  }

  if (absMs < day) {
    const hrs = getValue(hour);
    return ms >= 0
      ? `Due in ${hrs} hour${hrs === 1 ? '' : 's'}`
      : `Overdue by ${hrs} hour${hrs === 1 ? '' : 's'}`;
  }

  const days = getValue(day);
  return ms >= 0
    ? `Due in ${days} day${days === 1 ? '' : 's'}`
    : `Overdue by ${days} day${days === 1 ? '' : 's'}`;
}

// Helper: Check if description is truncated (too long)
function isDescriptionTruncated() {
  return descriptionEl.scrollHeight > descriptionEl.clientHeight;
}

// Update card visual state
function updateCardState() {
  // Update priority indicator
  cardEl.classList.remove('priority-low', 'priority-medium', 'priority-high');
  const priorityClass = `priority-${state.priority.toLowerCase()}`;
  cardEl.classList.add(priorityClass);

  // Update completed state
  if (state.completed) {
    cardEl.classList.add('completed');
  } else {
    cardEl.classList.remove('completed');
  }

  // Update display text
  titleEl.textContent = state.title;
  descriptionEl.textContent = state.description;
  priorityEl.textContent = state.priority;
}

// Update time remaining
function updateDateHints() {
  if (state.status === 'Done') {
    timeRemainingEl.textContent = 'Completed';
    overdueIndicatorEl.textContent = '';
    cardEl.classList.remove('overdue');
    return;
  }

  const now = new Date();
  const diff = state.dueDate.getTime() - now.getTime();

  dueDateEl.textContent = formatDueDate(state.dueDate);
  timeRemainingEl.textContent = formatRelativeTime(diff);

  // Update overdue indicator
  if (diff < 0) {
    cardEl.classList.add('overdue');
    overdueIndicatorEl.textContent = 'Overdue';
  } else {
    cardEl.classList.remove('overdue');
    overdueIndicatorEl.textContent = '';
  }
}

// Edit mode: toggle form visibility
function enterEditMode() {
  state.isEditMode = true;
  editForm.classList.remove('hidden');

  // Populate form with current values
  editTitleInput.value = state.title;
  editDescriptionInput.value = state.description;
  editPrioritySelect.value = state.priority;

  // Format due date for datetime-local input
  const isoString = state.dueDate.toISOString().slice(0, 16);
  editDueDateInput.value = isoString;

  // Focus the title input
  editTitleInput.focus();
}

function exitEditMode() {
  state.isEditMode = false;
  editForm.classList.add('hidden');
}

function saveChanges() {
  state.title = editTitleInput.value || 'Untitled';
  state.description = editDescriptionInput.value || '';
  state.priority = editPrioritySelect.value;

  // Parse new due date
  if (editDueDateInput.value) {
    state.dueDate = new Date(editDueDateInput.value);
  }

  updateCardState();
  updateDateHints();
  exitEditMode();
  editBtn.focus();
}

// Status control: sync with checkbox
function updateStatusFromCheckbox() {
  if (toggleEl.checked) {
    state.completed = true;
    state.status = 'Done';
    statusEl.textContent = 'Done';
    statusControlSelect.value = 'Done';
    cardEl.classList.add('completed');
  } else {
    state.completed = false;
    state.status = 'Pending';
    statusEl.textContent = 'Pending';
    statusControlSelect.value = 'Pending';
    cardEl.classList.remove('completed');
  }
  updateDateHints();
}

function updateStatusFromSelect() {
  const newStatus = statusControlSelect.value;
  state.status = newStatus;
  statusEl.textContent = newStatus;

  if (newStatus === 'Done') {
    state.completed = true;
    toggleEl.checked = true;
    cardEl.classList.add('completed');
  } else {
    state.completed = false;
    toggleEl.checked = false;
    cardEl.classList.remove('completed');
  }

  updateDateHints();
}

// Expand/collapse description
function checkDescriptionTruncation() {
  if (isDescriptionTruncated()) {
    descriptionEl.classList.add('truncated');

    if (!expandToggle.textContent) {
      expandToggle.textContent = 'Show more';
    }
  } else {
    descriptionEl.classList.remove('truncated');
  }
}

function toggleDescriptionExpand() {
  const isExpanded = descriptionEl.classList.toggle('expanded');
  expandToggle.setAttribute('aria-expanded', isExpanded);
  expandToggle.textContent = isExpanded ? 'Show less' : 'Show more';
}

// Event listeners
editBtn.addEventListener('click', enterEditMode);
cancelBtn.addEventListener('click', exitEditMode);
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveChanges();
});

toggleEl.addEventListener('change', updateStatusFromCheckbox);
statusControlSelect.addEventListener('change', updateStatusFromSelect);
expandToggle.addEventListener('click', toggleDescriptionExpand);

// Delete button (placeholder)
deleteBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete this task?')) {
    alert('Delete functionality not implemented in this stage.');
  }
});

// Initialize
updateCardState();
updateDateHints();
checkDescriptionTruncation();

// Update date hints every 45 seconds
const updateInterval = setInterval(() => {
  if (!state.isEditMode) {
    updateDateHints();
  }
}, 45000);

// Check truncation on window resize
window.addEventListener('resize', checkDescriptionTruncation);
