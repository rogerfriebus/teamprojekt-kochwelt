async function includeFragments() {
    const nodes = document.querySelectorAll("[data-include]");
    await Promise.all([...nodes].map(async (el) => {
        const url = el.getAttribute("data-include");
        const res = await fetch(url, { cache: "no-store" });
        el.innerHTML = await res.text();
    }));
}

function setActiveNav() {
    const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav a[data-nav]").forEach(a => {
        if ((a.dataset.nav || "").toLowerCase() === current) a.classList.add("active");
    });
}

(async function boot() {
    await includeFragments();
    setActiveNav();
})();