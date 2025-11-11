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
