// === EXPENSES ===
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const list = document.getElementById("expenseList");

function renderExpenses() {
  if (expenses.length === 0) {
    list.querySelector("tbody").innerHTML = "<tr><td colspan='2'>Tiada perbelanjaan</td></tr>";
  } else {
    list.querySelector("tbody").innerHTML = expenses
      .map(e => `<tr><td>${e.desc}</td><td>RM ${Number(e.amount).toFixed(2)}</td></tr>`)
      .join("");
  }
}

function addExpense() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  if (!desc || !amount) return alert("Sila isi semua maklumat!");

  expenses.push({ desc, amount, date: new Date().toISOString() });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  renderExpenses();
}

window.addEventListener("DOMContentLoaded", renderExpenses);
