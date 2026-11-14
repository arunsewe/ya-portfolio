const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  root.dataset.theme = theme;
  toggle.textContent = theme === "dark" ? "Day mode" : "Night mode";
}

if (toggle) {
  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // storage can be blocked; the toggle still works for this visit
    }
  });
}