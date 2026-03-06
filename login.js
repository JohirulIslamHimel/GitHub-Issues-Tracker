function handleLogin() {
  const user = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (user === "admin" && password === "admin123") {
    window.location.href = "tracker.html";
  } else {
    alert("Invalid Username or Password ");
  }
}
