const STORAGE_KEY = "sales-pipeline-deals";

const form = document.getElementById("deal-form");
const dealsBody = document.getElementById("deals-body");
const ownerFilter = document.getElementById("ownerFilter");

const fields = {
  company: document.getElementById("company"),
  owner: document.getElementById("owner"),
  stage: document.getElementById("stage"),
  closeDate: document.getElementById("closeDate"),
  value: document.getElementById("value"),
};

let deals = loadDeals();
renderDeals();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  deals.push({
    id: crypto.randomUUID(),
    company: fields.company.value.trim(),
    owner: fields.owner.value.trim(),
    stage: fields.stage.value,
    closeDate: fields.closeDate.value,
    value: Number(fields.value.value),
  });

  saveDeals();
  form.reset();
  renderDeals();
});

ownerFilter.addEventListener("input", renderDeals);

function renderDeals() {
  const filterText = ownerFilter.value.trim().toLowerCase();
  const visibleDeals = deals.filter((deal) =>
    deal.owner.toLowerCase().includes(filterText)
  );

  dealsBody.innerHTML = "";

  for (const deal of visibleDeals) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(deal.company)}</td>
      <td>${escapeHtml(deal.owner)}</td>
      <td>${escapeHtml(deal.stage)}</td>
      <td>${escapeHtml(deal.closeDate)}</td>
      <td>$${deal.value.toLocaleString()}</td>
      <td><button class="small-btn" data-id="${deal.id}">Delete</button></td>
    `;
    dealsBody.appendChild(row);
  }

  dealsBody.querySelectorAll("button[data-id]").forEach((button) => {
    button.addEventListener("click", () => deleteDeal(button.dataset.id));
  });
}

function deleteDeal(id) {
  deals = deals.filter((deal) => deal.id !== id);
  saveDeals();
  renderDeals();
}

function loadDeals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDeals() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
