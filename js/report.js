const sales = JSON.parse(localStorage.getItem("sales")) || [];
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const reportSales = document.getElementById("reportSales");
const reportExpense = document.getElementById("reportExpense");

reportSales.innerHTML = sales.map(s => `
  <tr><td>${new Date(s.date).toLocaleDateString()}</td><td>RM ${s.amount.toFixed(2)}</td></tr>
`).join("");

reportExpense.innerHTML = expenses.map(e => `
  <tr><td>${e.desc}</td><td>RM ${e.amount.toFixed(2)}</td></tr>
`).join("");

// Calculate totals
const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
const netProfit = totalSales - totalExpense;

// Display totals
document.getElementById("sumSales").innerText = totalSales.toFixed(2);
document.getElementById("sumExpense").innerText = totalExpense.toFixed(2);
document.getElementById("netProfit").innerText = netProfit.toFixed(2);

// Color code profit
const profitEl = document.getElementById("netProfit");
if (netProfit < 0) {
  profitEl.style.color = "red";
} else if (netProfit === 0) {
  profitEl.style.color = "#999";
} else {
  profitEl.style.color = "#00FF88";
}
