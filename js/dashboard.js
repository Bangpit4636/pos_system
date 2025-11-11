const salesData = JSON.parse(localStorage.getItem("sales")) || [];
const total = salesData.reduce((sum, s) => sum + s.amount, 0);
document.getElementById("totalSales").innerText = "RM " + total.toFixed(2);
