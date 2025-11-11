function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Invalid username or password!";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

if (!localStorage.getItem("loggedInUser") && !window.location.href.includes("login.html")) {
  window.location.href = "login.html";
}
