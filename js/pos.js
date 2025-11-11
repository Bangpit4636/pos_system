let menu = JSON.parse(localStorage.getItem("menu")) || [
  { id: 1, name: "Ayam Gepuk", price: 13 },
  { id: 2, name: "Ayam Penyet", price: 13 },
  { id: 3, name: "Nasi", price: 2 },
  { id: 4, name: "Sambal", price: 2 },
  { id: 5, name: "Tempe", price: 1 },
  { id: 6, name: "Tauhu", price: 1 }
];

let cart = [];
let proofImageBase64 = "";

// RENDER MENU
const menuList = document.getElementById("menuList");
menuList.innerHTML = menu
  .map(
    (item) => `
  <div class='menu-item' onclick='addToCart(${item.id})'>
    <h4>${item.name}</h4><p>RM ${item.price}</p>
  </div>`
  )
  .join("");

// CART FUNCTION
function addToCart(id) {
  const item = menu.find((m) => m.id === id);
  cart.push(item);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = cart
    .map(
      (c, i) => `
    <div class='cart-item'>
      ${c.name} - RM ${c.price} <button onclick='removeItem(${i})'>X</button>
    </div>`
    )
    .join("");
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  document.getElementById("total").innerText = total.toFixed(2);
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

// PAYMENT TYPE TOGGLE
function toggleProofUpload() {
  const type = document.getElementById("paymentType").value;
  const proofSection = document.getElementById("proofSection");
  proofSection.classList.toggle("hidden", type === "cash");
}

// IMAGE PREVIEW
function previewProof(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    proofImageBase64 = e.target.result;
    document.getElementById("proofPreview").src = proofImageBase64;
  };
  reader.readAsDataURL(file);
}

// CHECKOUT FUNCTION
function checkout() {
  if (cart.length === 0) {
    alert("Sila tambah item ke cart dahulu!");
    return;
  }

  const total = cart.reduce((sum, c) => sum + c.price, 0);
  const paymentType = document.getElementById("paymentType").value;

  // Simpan transaksi
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const newSale = {
    id: Date.now(),
    amount: total,
    paymentType,
    proof: proofImageBase64,
    date: new Date().toISOString()
  };
  sales.push(newSale);
  localStorage.setItem("sales", JSON.stringify(sales));

  // Reset
  cart = [];
  proofImageBase64 = "";
  renderCart();
  document.getElementById("paymentProof").value = "";
  document.getElementById("proofPreview").src = "";
  toggleProofUpload();

  alert(`Checkout berjaya!\nJumlah: RM ${total.toFixed(2)}\nKaedah: ${paymentType.toUpperCase()}`);
}
