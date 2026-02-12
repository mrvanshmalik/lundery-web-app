let Loginform = document.getElementById("login-form");
if (Loginform) {
  Loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector("#login-username").value.trim();
    if (!username) return;

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);

    window.location.replace("index.html");
  });
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.replace("login.html");
  });
}

const nameEl = document.getElementById("user-main-name");
if (nameEl) {
  nameEl.innerText = localStorage.getItem("username") || "User Name";
}
