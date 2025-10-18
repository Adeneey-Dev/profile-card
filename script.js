//Interactive: time, avatar upload, theme toggle, small card toggle
(function () {
  // time -> updates every second (milliseconds)
  const timeEl = document.querySelector('[data-testid="test-user-time"]');
  const tick = () => (timeEl.textContent = String(Date.now()));
  tick();
  const tId = setInterval(tick, 1000);

  // avatar upload (FileReader via object URL)
  const avatarIn = document.getElementById("avatar-file");
  const avatarImg = document.getElementById("avatar-img");
  if (avatarIn && avatarImg) {
    avatarIn.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      avatarImg.src = URL.createObjectURL(f);
      avatarImg.alt = f.name || "Uploaded avatar";
    });
  }

  // theme toggle (global) stored in localStorage
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  if (localStorage.getItem("theme") === "light") body.classList.add("light");
  toggle &&
    toggle.addEventListener("click", () => {
      body.classList.toggle("light");
      localStorage.setItem(
        "theme",
        body.classList.contains("light") ? "light" : "dark"
      );
      toggle.textContent = body.classList.contains("light") ? "☀️" : "🌙";
    });
  // set initial toggle icon
  toggle &&
    (toggle.textContent = body.classList.contains("light") ? "☀️" : "🌙");

  // small button in card (example micro-interaction)
  const smallToggle = document.getElementById("card-theme-toggle");
  if (smallToggle)
    smallToggle.addEventListener("click", () => {
      smallToggle.classList.toggle("active");
      smallToggle.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0.95)" },
          { transform: "scale(1)" },
        ],
        { duration: 180 }
      );
    });

  // year in footer
  const year = document.getElementById("year");
  year && (year.textContent = new Date().getFullYear());

  // cleanup on unload
  window.addEventListener("beforeunload", () => clearInterval(tId));
})();
