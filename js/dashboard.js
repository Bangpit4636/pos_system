// === DASHBOARD DATA ===
function loadDashboard() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const netProfit = totalSales - totalExpenses;

  document.getElementById("totalSales").innerText = "RM " + totalSales.toFixed(2);
  document.getElementById("totalExpenses").innerText = "RM " + totalExpenses.toFixed(2);
  const profitEl = document.getElementById("netProfit");
  profitEl.innerText = "RM " + netProfit.toFixed(2);
  profitEl.style.color = netProfit >= 0 ? "limegreen" : "#ff5555";
}

window.addEventListener("DOMContentLoaded", loadDashboard);
