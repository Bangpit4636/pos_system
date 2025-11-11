function renderReport() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const now = new Date();

  const period = document.getElementById("filterPeriod").value;
  const payFilter = document.getElementById("filterPayment").value;

  // === FILTER SALES ===
  const filteredSales = sales.filter(s => {
    const d = new Date(s.date);
    const daysDiff = (now - d) / (1000 * 60 * 60 * 24);
    let ok = false;
    if (period === "today") ok = d.toDateString() === now.toDateString();
    else if (period === "week") ok = daysDiff < 7;
    else if (period === "month") ok = d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    else if (period === "year") ok = d.getFullYear() === now.getFullYear();
    else ok = true;

    const payOk = payFilter === "all" ? true : s.payment === payFilter;
    return ok && payOk;
  });

  const totalSales = filteredSales.reduce((sum, s) => sum + s.amount, 0);
  document.getElementById("totalSales").innerText = "RM " + totalSales.toFixed(2);

  // === FILTER EXPENSES ===
  const filteredExp = expenses.filter(e => {
    const d = new Date(e.date);
    const daysDiff = (now - d) / (1000 * 60 * 60 * 24);
    if (period === "today") return d.toDateString() === now.toDateString();
    if (period === "week") return daysDiff < 7;
    if (period === "month") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if (period === "year") return d.getFullYear() === now.getFullYear();
    return true;
  });

  const totalExp = filteredExp.reduce((sum, e) => sum + Number(e.amount), 0);
  document.getElementById("totalExpenses").innerText = "RM " + totalExp.toFixed(2);

  const netProfit = totalSales - totalExp;
  const profitEl = document.getElementById("netProfit");
  profitEl.innerText = "RM " + netProfit.toFixed(2);
  profitEl.style.color = netProfit >= 0 ? "limegreen" : "#ff5555";

  // === SALES BY ITEM ===
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

  const itemBody = document.querySelector("#salesByItem tbody");
  itemBody.innerHTML = Object.keys(itemStats).length
    ? Object.entries(itemStats).map(([n, v]) => `<tr><td>${n}</td><td>${v.qty}</td><td>${v.total.toFixed(2)}</td></tr>`).join("")
    : "<tr><td colspan='3'>Tiada data item</td></tr>";

  // === SALES BY PAYMENT ===
  const payStats = { cash: 0, qrpay: 0, tng: 0 };
  const payCount = { cash: 0, qrpay: 0, tng: 0 };
  filteredSales.forEach(s => {
    if (payStats[s.payment] !== undefined) {
      payStats[s.payment] += s.amount;
      payCount[s.payment] += 1;
    }
  });

  const payBody = document.querySelector("#salesByPayment tbody");
  payBody.innerHTML = `
    <tr><td>Cash</td><td>${payCount.cash}</td><td>${payStats.cash.toFixed(2)}</td></tr>
    <tr><td>QRPay</td><td>${payCount.qrpay}</td><td>${payStats.qrpay.toFixed(2)}</td></tr>
    <tr><td>TNG</td><td>${payCount.tng}</td><td>${payStats.tng.toFixed(2)}</td></tr>
  `;

  // === EXPENSES TABLE ===
  const expBody = document.querySelector("#expenseTable tbody");
  expBody.innerHTML = filteredExp.length
    ? filteredExp.map(e => `<tr><td>${e.desc}</td><td>${Number(e.amount).toFixed(2)}</td></tr>`).join("")
    : "<tr><td colspan='2'>Tiada perbelanjaan</td></tr>";
}

window.addEventListener("DOMContentLoaded", renderReport);
