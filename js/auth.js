// === AUTH SYSTEM ===
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "dashboard.html";
  } else {
    error.innerText = "❌ Username atau password salah!";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// === GUARD PAGE ACCESS ===
if (!window.location.href.includes("login.html")) {
  const logged = localStorage.getItem("loggedInUser");
  if (!logged) {
    window.location.href = "login.html";
  }
}
