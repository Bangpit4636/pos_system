let menu = JSON.parse(localStorage.getItem("menu")) || [
  { id: 1, name: "Ayam Gepuk", price: 13, img: "assets/ayam_gepuk.jpg" },
  { id: 2, name: "Ayam Penyet", price: 13, img: "assets/ayam_penyet.jpg" },
  { id: 3, name: "Nasi", price: 2, img: "assets/nasi.jpg" },
  { id: 4, name: "Sambal", price: 2, img: "assets/sambal.jpg" },
  { id: 5, name: "Tempe", price: 1, img: "assets/tempe.jpg" },
  { id: 6, name: "Tauhu", price: 1, img: "assets/tauhu.jpg" }
];

let cart = [];

const menuList = document.getElementById("menuList");
menuList.innerHTML = menu.map(i => `
  <div class="menu-item">
    <img src="${i.img}" alt="${i.name}">
    <h4>${i.name}</h4>
    <p>RM ${i.price}</p>
    <div class="menu-btns">
      <button onclick="decItem(${i.id})">-</button>
      <button onclick="addToCart(${i.id})">+</button>
    </div>
  </div>
`).join("");

function addToCart(id) {
  const item = menu.find(m => m.id === id);
  cart.push(item);
  renderCart();
}

function decItem(id) {
  const index = cart.findIndex(c => c.id === id);
  if (index >= 0) cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Tiada item dalam cart.</p>";
    document.getElementById("total").innerText = "0.00";
    return;
  }

  const grouped = {};
  cart.forEach(i => {
    grouped[i.name] = grouped[i.name]
      ? { ...grouped[i.name], qty: grouped[i.name].qty + 1 }
      : { ...i, qty: 1 };
  });

  cartItems.innerHTML = Object.values(grouped)
    .map(i => `
      <div class="cart-item">
        <span>${i.name} x${i.qty}</span>
        <span>RM ${(i.price * i.qty).toFixed(2)}</span>
      </div>
    `)
    .join("");

  const total = Object.values(grouped).reduce((sum, i) => sum + i.price * i.qty, 0);
  document.getElementById("total").innerText = total.toFixed(2);
}

function checkout() {
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  if (cart.length === 0) return alert("Cart kosong!");

  const method = document.getElementById("paymentMethod").value;
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push({
    id: Date.now(),
    amount: total,
    date: new Date().toISOString(),
    payment: method,
    items: [...cart]
  });
  localStorage.setItem("sales", JSON.stringify(sales));
  cart = [];
  renderCart();
  alert(`Bayaran RM ${total.toFixed(2)} (${method.toUpperCase()}) berjaya!`);
}
