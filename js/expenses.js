let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const list = document.getElementById("expenseList");

function renderExpenses() {
  list.innerHTML = expenses.map((e, i) => `
    <tr>
      <td>${e.desc}</td>
      <td>RM ${e.amount}</td>
      <td>${new Date(e.date).toLocaleDateString()}</td>
      <td><button onclick="removeExpense(${i})">🗑️</button></td>
    </tr>
  `).join("");
}

function addExpense(e) {
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  expenses.push({ desc, amount, date: new Date().toISOString() });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  e.target.reset();
  renderExpenses();
}

function removeExpense(i) {
  expenses.splice(i, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

renderExpenses();
