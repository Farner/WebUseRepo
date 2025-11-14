function initNav() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");

  if (!navToggle || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("open");
    if (overlay) overlay.classList.remove("visible");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    if (overlay) {
      overlay.classList.toggle("visible", isOpen);
    }
  });

  // Lukk meny når man klikker på en lenke
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Lukk meny når man klikker utenfor (på overlayet)
  if (overlay) {
    overlay.addEventListener("click", () => {
      closeMenu();
    });
  }
}

function initSnow() {
  const snowContainer = document.getElementById("snow-container");
  if (!snowContainer) return;

  function createSnowflake() {
    const flake = document.createElement("div");
    flake.classList.add("snowflake");

    // Tilfeldig størrelse
    const size = Math.random() * 3 + 2;      // 2–5px
    flake.style.width = size + "px";
    flake.style.height = size + "px";

    // Tilfeldig horisontal startposisjon
    flake.style.left = Math.random() * 100 + "vw";

    // Fall- og drift-varighet
    const fallDuration = Math.random() * 8 + 10;   // 10–18s
    flake.style.animationDuration = fallDuration + "s";


    snowContainer.appendChild(flake);

    // Rydd opp etterpå
    setTimeout(() => {
      flake.remove();
    }, (fallDuration + 1) * 1000);
  }

  // Start med noen fnugg
  for (let i = 0; i < 50; i++) {
    setTimeout(createSnowflake, Math.random() * 5000);
  }

  // Jevn strøm av nye fnugg
  setInterval(createSnowflake, 400);
}

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");

  if (placeholder) {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((html) => {
        placeholder.innerHTML = html;
        initNav();
        initSnow();
      })
      .catch((err) => console.error("Kunne ikke laste navbar:", err));
  } else {
    initNav();
    initSnow();
  }
});
