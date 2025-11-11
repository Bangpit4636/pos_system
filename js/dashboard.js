const salesData = JSON.parse(localStorage.getItem("sales")) || [];
const totalSales = salesData.reduce((sum, s) => sum + s.amount, 0);

const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
const totalExpense = expenseData.reduce((sum, e) => sum + e.amount, 0);

document.getElementById("totalSales").innerText = "RM " + totalSales.toFixed(2);
document.getElementById("totalExpense").innerText = "RM " + totalExpense.toFixed(2);
