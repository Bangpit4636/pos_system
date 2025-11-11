function renderReport() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const menu = JSON.parse(localStorage.getItem("menu")) || [];
  const filterPeriod = document.getElementById("filterPeriod").value;
  const filterPayment = document.getElementById("filterPayment").value;

  // 🧮 Filter by date
  const now = new Date();
  const filteredSales = sales.filter(s => {
    const saleDate = new Date(s.date);
    const sameDay = saleDate.toDateString() === now.toDateString();
    const sameWeek = (() => {
      const diff = now - saleDate;
      return diff < 7 * 24 * 60 * 60 * 1000;
    })();
    const sameMonth = saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
    const sameYear = saleDate.getFullYear() === now.getFullYear();

    let matchDate = false;
    if (filterPeriod === "today") matchDate = sameDay;
    else if (filterPeriod === "week") matchDate = sameWeek;
    else if (filterPeriod === "month") matchDate = sameMonth;
    else if (filterPeriod === "year") matchDate = sameYear;
    else matchDate = true;

    const matchPayment = filterPayment === "all" ? true : s.payment === filterPayment;
    return matchDate && matchPayment;
  });

  // 🧾 Total sales & orders
  const totalSales = filteredSales.reduce((sum, s) => sum + s.amount, 0);
  document.getElementById("totalSales").innerText = totalSales.toFixed(2);
  document.getElementById("totalOrders").innerText = filteredSales.length;

  // 🧩 Sales by item (approximation using menu structure)
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
  if (Object.keys(itemStats).length === 0) {
    tbodyItem.innerHTML = "<tr><td colspan='3'>Tiada data item</td></tr>";
  } else {
    tbodyItem.innerHTML = Object.entries(itemStats)
      .map(([name, val]) => `<tr><td>${name}</td><td>${val.qty}</td><td>${val.total.toFixed(2)}</td></tr>`)
      .join("");
  }

  // 💳 Sales by payment type
  const paymentStats = { cash: 0, qrpay: 0, tng: 0 };
  const paymentCount = { cash: 0, qrpay: 0, tng: 0 };

  filteredSales.forEach(s => {
    if (paymentStats[s.payment] !== undefined) {
      paymentStats[s.payment] += s.amount;
      paymentCount[s.payment] += 1;
    }
  });

  const tbodyPay = document.querySelector("#salesByPayment tbody");
  tbodyPay.innerHTML = `
    <tr><td>Cash</td><td>${paymentCount.cash}</td><td>${paymentStats.cash.toFixed(2)}</td></tr>
    <tr><td>QRPay / DuitNow</td><td>${paymentCount.qrpay}</td><td>${paymentStats.qrpay.toFixed(2)}</td></tr>
    <tr><td>TNG eWallet</td><td>${paymentCount.tng}</td><td>${paymentStats.tng.toFixed(2)}</td></tr>
  `;
}

// ⏳ Load on start
window.addEventListener("DOMContentLoaded", renderReport);
