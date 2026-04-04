(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress__bar");
  let scrollRaf = 0;

  function updateScrollUI() {
    scrollRaf = 0;
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    if (progressBar) {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const p = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      progressBar.style.width = `${p}%`;
    }
  }

  function onScroll() {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(updateScrollUI);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollUI();

  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
