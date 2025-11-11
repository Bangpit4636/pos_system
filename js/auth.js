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
