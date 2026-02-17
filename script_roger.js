/**
 * Kochwelt – Shared JS (Anfängerfreundlich)
 *
 * Zweck dieser Datei:
 * 1) Header/Footer als "Komponenten" per fetch() in jede Seite nachladen
 *    → damit ihr Header/Footer nur EINMAL pflegt und nicht kopieren müsst.
 *
 * 2) Den aktuell aktiven Menüpunkt automatisch markieren (Klasse: .active)
 *    → damit im Header der richtige Link grün + Unterlinie bekommt.
 *
 * Voraussetzungen im HTML:
 * - Header/Footer Platzhalter so:
 *   <header class="site-header" data-include="./components/header.html"></header>
 *   <footer class="site-footer" data-include="./components/footer.html"></footer>
 *
 * - Im header.html müssen Nav-Links vorhanden sein:
 *   <nav class="nav">
 *     <a href="./index.html">Start</a>
 *     ...
 *   </nav>
 *
 * Wichtig:
 * - Erst Fragmente laden, DANN Active-Link setzen (weil Nav erst nach dem Include existiert).
 */

"use strict";

/* ============================
   1) HTML-Fragmente laden
   ============================ */

/**
 * Lädt für jedes Element mit data-include="..." den Inhalt per fetch()
 * und setzt ihn als innerHTML.
 *
 * Beispiel:
 * <header data-include="./components/header.html"></header>
 * → wird ersetzt durch den Inhalt aus header.html
 */
async function includeFragments() {
  const nodes = document.querySelectorAll("[data-include]");

  // Promise.all: alle Includes parallel laden (schneller)
  await Promise.all(
    Array.from(nodes).map(async (el) => {
      const url = el.getAttribute("data-include");
      if (!url) return;

      try {
        // cache: "no-store" sorgt dafür, dass du Änderungen sofort siehst
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} beim Laden von ${url}`);

        const html = await res.text();
        el.innerHTML = html;
      } catch (err) {
        // Wenn etwas schiefgeht: Fehler in die Konsole + Element leer lassen
        console.error("Include failed:", err);
        el.innerHTML = "";
      }
    })
  );
}

/* ============================
   2) Aktiven Nav-Link markieren
   ============================ */

/**
 * Hilfsfunktion: Nur Dateinamen vergleichen
 * z.B. "/foo/index.html" -> "index.html"
 */
function getFileName(path) {
  const cleaned = (path || "").split("?")[0].split("#")[0];
  const parts = cleaned.split("/");
  return (parts.pop() || "").toLowerCase();
}

/**
 * Setzt .active auf den Link, dessen href zur aktuellen Seite passt.
 *
 * Warum so?
 * - data-nav ist oft nur ein Label ("index") und passt nicht zu "index.html".
 * - href ist die zuverlässigste Quelle.
 */
function setActiveNav() {
  // Aktueller Dateiname aus der URL (bei / -> index.html)
  const currentFile = getFileName(window.location.pathname) || "index.html";

  // Alle Links im Menü holen
  const links = document.querySelectorAll(".nav a");

  links.forEach((a) => a.classList.remove("active")); // sauberer Reset

  links.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const hrefFile = getFileName(href);

    // Match-Regeln:
    // - Wenn href "index.html" und current "index.html" → aktiv
    // - Wenn hrefFile leer (z.B. "#") → ignorieren
    if (!hrefFile) return;

    if (hrefFile === currentFile) {
      a.classList.add("active");
    }
  });
}

/* ============================
   3) Boot / Startlogik
   ============================ */

/**
 * Startpunkt:
 * - Erst die Komponenten laden
 * - Dann die Navigation aktiv setzen
 */
async function boot() {
  await includeFragments();
  setActiveNav();
}

// Sofort starten, sobald dieses Script geladen ist
boot();