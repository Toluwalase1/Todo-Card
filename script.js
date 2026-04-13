const dueDateEl = document.getElementById("todo-due-date");
const timeRemainingEl = document.getElementById("todo-time-remaining");
const statusEl = document.querySelector('[data-testid="test-todo-status"]');
const toggleEl = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const cardEl = document.querySelector('[data-testid="test-todo-card"]');

const dueDate = new Date(dueDateEl.getAttribute("datetime"));

function formatDueDate(date) {
  return `Due ${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  })}`;
}

function formatRelativeTime(ms) {
  const absMs = Math.abs(ms);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (absMs < minute) {
    return ms >= 0 ? "Due now" : "Overdue just now";
  }

  const getValue = (unitMs) => Math.floor(absMs / unitMs);

  if (absMs < hour) {
    const mins = getValue(minute);
    return ms >= 0
      ? `Due in ${mins} minute${mins === 1 ? "" : "s"}`
      : `Overdue by ${mins} minute${mins === 1 ? "" : "s"}`;
  }

  if (absMs < day) {
    const hrs = getValue(hour);
    return ms >= 0
      ? `Due in ${hrs} hour${hrs === 1 ? "" : "s"}`
      : `Overdue by ${hrs} hour${hrs === 1 ? "" : "s"}`;
  }

  const days = getValue(day);
  return ms >= 0
    ? `Due in ${days} day${days === 1 ? "" : "s"}`
    : `Overdue by ${days} day${days === 1 ? "" : "s"}`;
}

function updateDateHints() {
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();

  dueDateEl.textContent = formatDueDate(dueDate);
  timeRemainingEl.textContent = formatRelativeTime(diff);

  if (toggleEl.checked) {
    statusEl.textContent = "Completed";
    return;
  }

  if (diff < 0) {
    statusEl.textContent = "Overdue";
  } else if (diff <= 24 * 60 * 60 * 1000) {
    statusEl.textContent = "Due Soon";
  } else {
    statusEl.textContent = "In Progress";
  }
}

toggleEl.addEventListener("change", () => {
  cardEl.classList.toggle("completed", toggleEl.checked);
  updateDateHints();
});

updateDateHints();
setInterval(updateDateHints, 60000);
