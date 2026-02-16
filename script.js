/* Kochwelt – Shared JS
   - Loads header/footer fragments
   - Sets active nav link
*/

async function includeFragments() {
  const nodes = document.querySelectorAll("[data-include]");
  await Promise.all(
    [...nodes].map(async (el) => {
      const url = el.getAttribute("data-include");
      if (!url) return;

      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        el.innerHTML = await res.text();
      } catch (err) {
        console.error("Include failed:", err);
        el.innerHTML = "";
      }
    })
  );
}

function setActiveNav() {
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll(".nav a[data-nav]").forEach((a) => {
    const target = (a.dataset.nav || "").toLowerCase();
    if (target === current) a.classList.add("active");
  });
}

(async function boot() {
  await includeFragments();
  setActiveNav();
})();