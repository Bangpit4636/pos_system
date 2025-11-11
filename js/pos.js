let menu = JSON.parse(localStorage.getItem("menu")) || [
  { id: 1, name: "Ayam Gepuk", price: 13 },
  { id: 2, name: "Ayam Penyet", price: 13 },
  { id: 3, name: "Nasi", price: 2 },
  { id: 4, name: "Sambal", price: 2 },
  { id: 5, name: "Tempe", price: 1 },
  { id: 6, name: "Tauhu", price: 1 }
];

let cart = [];

const menuList = document.getElementById("menuList");
menuList.innerHTML = menu.map(item => `
  <div class='menu-item' onclick='addToCart(${item.id})'>
    <h4>${item.name}</h4>
    <p>RM ${item.price}</p>
  </div>
`).join("");

function addToCart(id) {
  const item = menu.find(m => m.id === id);
  cart.push(item);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = cart.map((c, i) => `
    <div class='cart-item'>
      ${c.name} - RM ${c.price}
      <button onclick='removeItem(${i})'>X</button>
    </div>
  `).join("");
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  document.getElementById("total").innerText = total.toFixed(2);
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

function checkout() {
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  if (cart.length === 0) return alert("Cart kosong!");

  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push({ id: Date.now(), amount: total, date: new Date().toISOString() });
  localStorage.setItem("sales", JSON.stringify(sales));

  cart = [];
  renderCart();
  alert("Checkout berjaya! Jumlah: RM " + total.toFixed(2));
}
