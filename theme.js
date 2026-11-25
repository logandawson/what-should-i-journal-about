const savedTheme = localStorage.getItem("theme");
const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";

  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
  );

  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;

  setTheme(currentTheme === "dark" ? "light" : "dark");
});

setTheme(savedTheme || "light");
