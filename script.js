const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const starterRecords = [
  { id: 1, title: "Finish my portfolio homepage", category: "Task", details: "Polish the layout, check the mobile version, and add my real projects.", date: "Today" },
  { id: 2, title: "Learn one new JavaScript trick", category: "Idea", details: "Practice small functions and DOM events in a mini project.", date: "Today" },
  { id: 3, title: "Collect inspiration for my next design", category: "Project", details: "Save color palettes, typography ideas, and little UI details I love.", date: "Yesterday" }
];
const STORAGE_KEY = "petalPixelRecordsV1";
let records = loadRecords();

function loadRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterRecords;
  } catch (error) {
    return starterRecords;
  }
}
function persistRecords() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch (error) {}
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function navigate(viewName) {
  const target = $(`#view-${viewName}`);
  if (!target) return;
  $$(".view").forEach((view) => view.classList.remove("active-view"));
  target.classList.add("active-view");
  $$(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  const title = { dashboard: "Dashboard", portfolio: "My portfolio", records: "Saved records", about: "About me", login: "Sign in" };
  $("#crumbTitle").textContent = title[viewName] || "Dashboard";
  $("#sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$$("[data-view]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.view)));
$("#menuToggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
document.addEventListener("click", (event) => {
  if (window.innerWidth <= 760 && !$("#sidebar").contains(event.target) && !$("#menuToggle").contains(event.target)) {
    $("#sidebar").classList.remove("open");
  }
});
$("#themeButton").addEventListener("click", () => {
  document.body.classList.toggle("cozy-mode");
  showToast(document.body.classList.contains("cozy-mode") ? "Cozy mode is on ☼" : "Pink mode is back ♡");
});

function renderRecords() {
  const query = $("#recordSearch").value.trim().toLowerCase();
  const filtered = records.filter((record) => [record.title, record.category, record.details].join(" ").toLowerCase().includes(query));
  const icons = { Idea: "✧", Task: "✓", Project: "♡", Reminder: "♧" };
  $("#recordsList").innerHTML = filtered.map((record) => `
    <article class="record-item">
      <div class="record-symbol">${icons[record.category] || "♡"}</div>
      <div class="record-main">
        <h3>${escapeHTML(record.title)}</h3>
        <p>${escapeHTML(record.details || "A little note saved for later.")}</p>
        <div class="record-meta"><span class="record-category">${escapeHTML(record.category)}</span><span>♡ ${escapeHTML(record.date)}</span></div>
      </div>
      <button class="delete-record" data-delete="${record.id}" aria-label="Delete ${escapeHTML(record.title)}" title="Delete record">×</button>
    </article>`).join("");
  $("#emptyState").classList.toggle("hidden", filtered.length > 0);
  $("#visibleCount").textContent = filtered.length;
  $("#recordCount").textContent = records.length;
  $("#savedStat").textContent = String(records.length).padStart(2, "0");
  $("#recordsList").querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", () => {
    records = records.filter((record) => record.id !== Number(button.dataset.delete));
    persistRecords();
    renderRecords();
    showToast("Record removed ♡");
  }));
}
$("#recordSearch").addEventListener("input", renderRecords);

function openModal() {
  $("#recordModal").classList.remove("hidden");
  $("#recordTitle").focus();
}
function closeModal() {
  $("#recordModal").classList.add("hidden");
  $("#recordForm").reset();
}
$("#addRecordButton").addEventListener("click", openModal);
$("#closeModal").addEventListener("click", closeModal);
$("#cancelModal").addEventListener("click", closeModal);
$("#recordModal").addEventListener("click", (event) => { if (event.target === $("#recordModal")) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
$("#recordForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = $("#recordTitle").value.trim();
  if (!title) return;
  records.unshift({
    id: Date.now(),
    title,
    category: $("#recordCategory").value,
    details: $("#recordDetails").value.trim(),
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })
  });
  persistRecords();
  $("#recordSearch").value = "";
  renderRecords();
  closeModal();
  showToast("Your little record is saved ♡");
});

$("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;
  const message = $("#loginMessage");
  if (!email || password.length < 4) {
    message.textContent = "Please enter a valid email and a password of at least 4 characters.";
    return;
  }
  message.textContent = `Demo sign-in complete, ${email}! No account was created. ♡`;
  showToast("Welcome to your little space ♡");
});
$("#guestButton").addEventListener("click", () => {
  $("#loginMessage").textContent = "You're exploring as a guest. Enjoy your space! ♡";
  showToast("Welcome, lovely guest!");
});

const now = new Date();
$("#currentDate").textContent = now.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
$$(".year").forEach((node) => node.textContent = now.getFullYear());
renderRecords();
