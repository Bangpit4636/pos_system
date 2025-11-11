function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Contoh data sementara (boleh ubah ikut sistem kau)
  const users = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "cashier1", password: "1234", role: "staff" },
    { username: "manager1", password: "1234", role: "staff" }
  ];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Username atau password salah!");
  }
}
function checkAccess() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Hide Staff Management link kalau bukan admin
  const staffLink = document.querySelector('a[href="staff.html"]');
  if (staffLink && user.role !== "admin") {
    staffLink.style.display = "none";
  }

  // Kalau bukan admin tapi cuba buka page staff.html, redirect balik
  if (window.location.pathname.includes("staff.html") && user.role !== "admin") {
    alert("Akses terhad kepada Admin sahaja!");
    window.location.href = "dashboard.html";
  }
}
checkAccess();
