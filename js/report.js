const sales = JSON.parse(localStorage.getItem("sales")) || [];
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const reportSales = document.getElementById("reportSales");
const reportExpense = document.getElementById("reportExpense");

reportSales.innerHTML = sales.map(s => `
  <tr><td>${new Date(s.date).toLocaleDateString()}</td><td>RM ${s.amount}</td></tr>
`).join("");

reportExpense.innerHTML = expenses.map(e => `
  <tr><td>${e.desc}</td><td>RM ${e.amount}</td></tr>
`).join("");
