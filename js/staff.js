let staffData = JSON.parse(localStorage.getItem("staffData")) || [];
const staffList = document.getElementById("staffList");
const staffForm = document.getElementById("staffForm");

function renderStaff() {
  if (!staffList) return;
  staffList.innerHTML = staffData.map((s, i) => `
    <tr>
      <td>${s.name}</td>
      <td>${s.role}</td>
      <td>${s.phone}</td>
      <td>
        <button class="edit-btn" onclick="editStaff(${i})">✏️ Edit</button>
        <button class="delete-btn" onclick="deleteStaff(${i})">🗑️ Padam</button>
      </td>
    </tr>
  `).join("");
}

function saveStaff(e) {
  e.preventDefault();
  const name = document.getElementById("staffName").value.trim();
  const role = document.getElementById("staffRole").value.trim();
  const phone = document.getElementById("staffPhone").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex !== "") {
    staffData[editIndex] = { name, role, phone };
    document.getElementById("editIndex").value = "";
  } else {
    staffData.push({ id: Date.now(), name, role, phone });
  }

  localStorage.setItem("staffData", JSON.stringify(staffData));
  staffForm.reset();
  renderStaff();
}

function editStaff(i) {
  document.getElementById("staffName").value = staffData[i].name;
  document.getElementById("staffRole").value = staffData[i].role;
  document.getElementById("staffPhone").value = staffData[i].phone;
  document.getElementById("editIndex").value = i;
}

function deleteStaff(i) {
  if (confirm(`Padam staff ${staffData[i].name}?`)) {
    staffData.splice(i, 1);
    localStorage.setItem("staffData", JSON.stringify(staffData));
    renderStaff();
  }
}

renderStaff();
