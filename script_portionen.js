/**
 * Kochwelt – Portionsrechner
 *
 * Zweck:
 * Berechnet Zutatenmengen dynamisch anhand der eingegebenen Portionszahl.
 *
 * Funktionsweise:
 * - Liest das Input-Feld #personen aus (data-amount = Menge pro 1 Portion).
 * - Sucht alle <p>-Elemente mit data-amount Attribut.
 * - Multipliziert den Basiswert mit der Portionszahl.
 * - Aktualisiert den angezeigten Text.
 *
 * Voraussetzungen im HTML:
 * - Input:  <input type="number" id="personen" min="1" value="4">
 * - Zutat:  <p data-amount="100" data-unit="g" data-label="Spaghetti">100g Spaghetti</p>
 * - Ohne Menge (z. B. "Salz"): kein data-amount → wird nicht verändert.
 *
 * Einbindung:
 *   <script src="./script_portionen.js" defer></script>
 *   (nach script_roger.js, da boot() die Seite erst aufbaut)
 */

"use strict";

function initPortionenRechner() {
  const input = document.getElementById("personen");
  if (!input) return; // Kein Portionen-Input → nicht auf Rezeptseite

  const zutaten = document.querySelectorAll("[data-amount]");
  if (!zutaten.length) return; // Keine berechnenbaren Zutaten vorhanden

  /**
   * Formatiert eine Zahl für die Anzeige:
   * - Ganzzahlen ohne Dezimalstellen (z. B. "2")
   * - Dezimalzahlen mit max. 1 Stelle (z. B. "1.5")
   * - Vermeidet Anzeigen wie "2.0"
   */
  function formatMenge(wert) {
    if (wert % 1 === 0) {
      return wert.toString();
    }
    return wert.toFixed(1);
  }

  /**
   * Aktualisiert alle Zutaten basierend auf der Portionszahl.
   * Erzwingt Minimum von 1 – negative Werte und 0 werden abgefangen.
   */
  function berechne() {
    var rohwert = parseFloat(input.value);

    // Ungültig, negativ oder 0 → auf 1 korrigieren
    if (isNaN(rohwert) || rohwert < 1) {
      rohwert = 1;
      input.value = 1;
    }

    // Nur ganzzahlige Portionen (keine 2.5 Portionen)
    var portionen = Math.round(rohwert);
    if (portionen !== rohwert) {
      input.value = portionen;
    }

    zutaten.forEach(function (el) {
      var basis = parseFloat(el.dataset.amount);
      var einheit = el.dataset.unit || "";
      var bezeichnung = el.dataset.label || "";
      var neueMenge = basis * portionen;
      var anzeige = formatMenge(neueMenge);

      // Format: "100g Spaghetti" (mit Einheit) oder "2 Eigelb" (ohne Einheit)
      if (einheit) {
        el.textContent = anzeige + einheit + " " + bezeichnung;
      } else {
        el.textContent = anzeige + " " + bezeichnung;
      }
    });
  }

  // Events: bei Eingabe und bei Änderung (Pfeiltasten, Spinner)
  input.addEventListener("input", berechne);
  input.addEventListener("change", berechne);

  // Initiale Berechnung: zeigt sofort die richtige Menge für den Startwert an
  berechne();
}

/*
 * Start:
 * Wartet kurz (200ms), damit script_roger.js die Komponenten
 * per includeFragments() fertig laden kann.
 * Alternativ: nach boot() in script_roger.js aufrufen.
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(initPortionenRechner, 250);
  });
} else {
  setTimeout(initPortionenRechner, 250);
}
