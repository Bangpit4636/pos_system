// Ambil semua data
const sales = JSON.parse(localStorage.getItem("sales")) || [];
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const grabSales = JSON.parse(localStorage.getItem("grabSales")) || [];

// Jumlah kiraan
const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
const totalGrabPending = grabSales.filter(g => g.status === "pending")
  .reduce((sum, g) => sum + g.amount, 0);

const netProfit = totalSales - totalExpense;

// Papar ringkasan
document.getElementById("sumSales").innerText = "RM " + totalSales.toFixed(2);
document.getElementById("sumExpense").innerText = "RM " + totalExpense.toFixed(2);
document.getElementById("pendingGrab").innerText = "RM " + totalGrabPending.toFixed(2);
document.getElementById("netProfit").innerText = "RM " + netProfit.toFixed(2);

// Warna profit ikut status
const profitEl = document.getElementById("netProfit");
if (netProfit > 0) profitEl.style.color = "#00FF88";
else if (netProfit < 0) profitEl.style.color = "red";
else profitEl.style.color = "#999";

// Table jualan & belanja
document.getElementById("reportSales").innerHTML = sales
  .map(s => `<tr><td>${new Date(s.date).toLocaleDateString()}</td><td>RM ${s.amount.toFixed(2)}</td></tr>`)
  .join("");

document.getElementById("reportExpense").innerHTML = expenses
  .map(e => `<tr><td>${e.desc}</td><td>RM ${e.amount.toFixed(2)}</td></tr>`)
  .join("");
// =====================
// SALES BY ITEM
// =====================

function getDateRange(filter) {
  const now = new Date();
  const start = new Date();

  if (filter === "day") start.setHours(0, 0, 0, 0);
  if (filter === "week") {
    const first = now.getDate() - now.getDay();
    start.setDate(first);
    start.setHours(0, 0, 0, 0);
  }
  if (filter === "month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }
  return { start, end: now };
}

function renderItemSales() {
  const filter = document.getElementById("salesFilter").value;
  const { start, end } = getDateRange(filter);
  const filteredSales = sales.filter(s => {
    const saleDate = new Date(s.date);
    return saleDate >= start && saleDate <= end;
  });

  // Gabung semua item jualan
  const itemMap = {};
  filteredSales.forEach(s => {
    (s.items || []).forEach(item => {
      if (!itemMap[item.name]) itemMap[item.name] = { qty: 0, total: 0 };
      itemMap[item.name].qty += 1;
      itemMap[item.name].total += item.price;
    });
  });

  const sorted = Object.entries(itemMap)
    .sort((a, b) => b[1].qty - a[1].qty);

  const tbody = document.getElementById("itemSalesList");
  tbody.innerHTML = sorted
    .map(
      ([name, val]) =>
        `<tr><td>${name}</td><td>${val.qty}</td><td>RM ${val.total.toFixed(2)}</td></tr>`
    )
    .join("");

  if (sorted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:#aaa">Tiada jualan untuk tempoh ini</td></tr>`;
  }
}

// Auto render bila buka report
renderItemSales();

