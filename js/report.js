function renderReport() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const menu = JSON.parse(localStorage.getItem("menu")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const filterPeriod = document.getElementById("filterPeriod").value;
  const filterPayment = document.getElementById("filterPayment").value;

  const now = new Date();

  // 🧮 Filter sales ikut tarikh dan kaedah
  const filteredSales = sales.filter(s => {
    const saleDate = new Date(s.date);
    const diffDays = (now - saleDate) / (1000 * 60 * 60 * 24);
    let matchDate = false;
    if (filterPeriod === "today") matchDate = saleDate.toDateString() === now.toDateString();
    else if (filterPeriod === "week") matchDate = diffDays < 7;
    else if (filterPeriod === "month") matchDate = saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
    else if (filterPeriod === "year") matchDate = saleDate.getFullYear() === now.getFullYear();
    else matchDate = true;

    const matchPayment = filterPayment === "all" ? true : s.payment === filterPayment;
    return matchDate && matchPayment;
  });

  // 🧾 Kira total sales & order count
  const totalSales = filteredSales.reduce((sum, s) => sum + s.amount, 0);
  document.getElementById("totalSales").innerText = totalSales.toFixed(2);
  document.getElementById("totalOrders").innerText = filteredSales.length;

  // 🧾 Filter expenses ikut tempoh sama
  const filteredExpenses = expenses.filter(e => {
    const expDate = new Date(e.date || e.timestamp || Date.now());
    const diffDays = (now - expDate) / (1000 * 60 * 60 * 24);
    if (filterPeriod === "today") return expDate.toDateString() === now.toDateString();
    if (filterPeriod === "week") return diffDays < 7;
    if (filterPeriod === "month") return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
    if (filterPeriod === "year") return expDate.getFullYear() === now.getFullYear();
    return true;
  });

  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  document.getElementById("totalExpenses").innerText = totalExpenses.toFixed(2);

  // 🧮 Net profit
  const profit = totalSales - totalExpenses;
  const profitSpan = document.getElementById("netProfit");
  profitSpan.innerText = profit.toFixed(2);
  profitSpan.style.color = profit >= 0 ? "limegreen" : "red";

  // 📊 Sales by item
  const itemStats = {};
  filteredSales.forEach(s => {
    if (s.items) {
      s.items.forEach(it => {
        if (!itemStats[it.name]) itemStats[it.name] = { qty: 0, total: 0 };
        itemStats[it.name].qty += 1;
        itemStats[it.name].total += it.price;
      });
    }
  });

  const tbodyItem = document.querySelector("#salesByItem tbody");
  tbodyItem.innerHTML = Object.keys(itemStats).length
    ? Object.entries(itemStats)
        .map(([n, v]) => `<tr><td>${n}</td><td>${v.qty}</td><td>${v.total.toFixed(2)}</td></tr>`)
        .join("")
    : "<tr><td colspan='3'>Tiada data item</td></tr>";

  // 💳 Sales by payment type
  const payStats = { cash: 0, qrpay: 0, tng: 0 };
  const payCount = { cash: 0, qrpay: 0, tng: 0 };
  filteredSales.forEach(s => {
    if (payStats[s.payment] !== undefined) {
      payStats[s.payment] += s.amount;
      payCount[s.payment] += 1;
    }
  });

  const tbodyPay = document.querySelector("#salesByPayment tbody");
  tbodyPay.innerHTML = `
    <tr><td>Cash</td><td>${payCount.cash}</td><td>${payStats.cash.toFixed(2)}</td></tr>
    <tr><td>QRPay / DuitNow</td><td>${payCount.qrpay}</td><td>${payStats.qrpay.toFixed(2)}</td></tr>
    <tr><td>TNG eWallet</td><td>${payCount.tng}</td><td>${payStats.tng.toFixed(2)}</td></tr>
  `;

  // 📉 Expenses details
  const tbodyExp = document.querySelector("#expenseTable tbody");
  tbodyExp.innerHTML = filteredExpenses.length
    ? filteredExpenses.map(e => `<tr><td>${e.desc}</td><td>${Number(e.amount).toFixed(2)}</td></tr>`).join("")
    : "<tr><td colspan='2'>Tiada perbelanjaan</td></tr>";
}

window.addEventListener("DOMContentLoaded", renderReport);
