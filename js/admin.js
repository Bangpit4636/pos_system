let menu = JSON.parse(localStorage.getItem("menu")) || [];
const menuList = document.getElementById("menuList");
const menuForm = document.getElementById("menuForm");

function renderMenu() {
  menuList.innerHTML = menu.map((m, i) => `
    <tr>
      <td>${m.name}</td>
      <td>RM ${m.price.toFixed(2)}</td>
      <td>
        <button class="edit-btn" onclick="editItem(${i})">✏️ Edit</button>
        <button class="delete-btn" onclick="deleteItem(${i})">🗑️ Padam</button>
      </td>
    </tr>
  `).join("");
}

function addMenuItem(e) {
  e.preventDefault();
  const name = document.getElementById("menuName").value.trim();
  const price = parseFloat(document.getElementById("menuPrice").value);
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex !== "") {
    // edit existing
    menu[editIndex] = { name, price };
    document.getElementById("editIndex").value = "";
  } else {
    // add new
    menu.push({ id: Date.now(), name, price });
  }

  localStorage.setItem("menu", JSON.stringify(menu));
  menuForm.reset();
  renderMenu();
}

function editItem(index) {
  document.getElementById("menuName").value = menu[index].name;
  document.getElementById("menuPrice").value = menu[index].price;
  document.getElementById("editIndex").value = index;
}

function deleteItem(index) {
  if (confirm(`Padam ${menu[index].name}?`)) {
    menu.splice(index, 1);
    localStorage.setItem("menu", JSON.stringify(menu));
    renderMenu();
  }
}

renderMenu();
