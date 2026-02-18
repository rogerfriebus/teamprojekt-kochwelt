# QA-Checkliste – Kochwelt

> **Projekt:** Kochwelt – Teamprojekt (Developer Akademie)
> **Prüfdatum:** 18.02.2026 (Re-Run)
> **Prüfer:** Claude (automatisierte QA)
> **Team:** Roger Friebus, Bjoern Sagmeister, Waldemar Chorow

---

## Zusammenfassung

| Kategorie | PASS | WARN | FAIL | Gesamt |
|-----------|------|------|------|--------|
| A – Projektbasics | 5 | 2 | 1 | 8 |
| B – Design & UX | 5 | 1 | 0 | 6 |
| C – Responsiveness | 5 | 1 | 0 | 6 |
| D – Funktionalität | 4 | 1 | 0 | 5 |
| E – Legal & Compliance | 4 | 1 | 0 | 5 |
| F – Technische Qualität | 3 | 3 | 1 | 7 |
| **Gesamt** | **26** | **9** | **2** | **37** |

> **Änderungsprotokoll:**
> - 17.02.2026: Initiale Checkliste erstellt (36 Punkte).
> - 17.02.2026 (Update 1–4): `rezept_roger.html`, `croissant.html`, `script_portionen.js` erstellt. Portionsrechner, Profilbilder, X-Icon, Bildnachweise erledigt.
> - **18.02.2026 (Re-Run):** Komplette Neubewertung nach Teammate-Änderungen. Waldemar: index.html + style.css komplett überarbeitet, recipe-croissant.html neu. Bjoern: rezept-bjoern.html neu. **script_portionen.js Syntaxfehler gefixt.** Viele bisherige FAIL-Punkte behoben, neue Issues identifiziert.

---

## A – Projektbasics

### A1 – Ordnerstruktur & Dateiorganisation
**Status:** ✅ PASS

Vorhandene Struktur:
```
/
├── components/          (header.html, footer.html)
├── fonts/               (Raleway Variable Font, 2 Dateien)
├── img/                 (16 Bilder)
│   └── icons/           (6 SVG + 2 Raster)
├── *.html               (12 HTML-Dateien)
├── *.css                (6 CSS-Dateien)
├── *.js                 (3 JS-Dateien)
├── credits.txt
├── Used font.txt
└── *.png / *.pdf        (Mockups, Checkliste)
```

Komponenten-Architektur (header.html, footer.html per `data-include`) ist sinnvoll und wartbar.

---

### A2 – Verlinkte Seiten erreichbar (keine toten Links)
**Status:** ✅ PASS (vorher WARNING)

Alle Rezept-Links in index.html führen jetzt zu existierenden Seiten:
- `./recipe-croissant.html` → ✅ vorhanden (Waldemar)
- `./rezept_roger.html` → ✅ vorhanden (Roger)
- `./rezept-bjoern.html` → ✅ vorhanden (Bjoern)
- `./rezept-des-tages.html` → ✅ vorhanden (Bjoern)

Verbleibende Platzhalter: `#` auf Social-Media-Links im Footer (bewusst, da Lernprojekt).

---

### A3 – Einheitliches Komponenten-System
**Status:** ✅ PASS

Alle produktiven Seiten nutzen `data-include` für Header/Footer:
- ✅ index.html, kontakt.html, SendMail.html, impressum.html, datenschutz.html
- ✅ rezept-des-tages.html, rezept-bjoern.html, rezept_roger.html
- ✅ croissant.html, recipe-croissant.html
- ⚠️ index_bjoern.html – Standalone-Entwurf (Legacy)

---

### A4 – Keine externen CDNs / Datenschutz-Konformität
**Status:** ✅ PASS

- Fonts: Lokal (`./fonts/Raleway-VariableFont_wght.ttf`) – kein Google Fonts
- Icons: Lokal (`./img/icons/`) – kein FontAwesome CDN
- Kein jQuery, kein Bootstrap, keine externen Scripts
- Einziger externer Dienst: Formspree (dokumentiert in Datenschutzerklärung)

---

### A5 – Doppelte/veraltete Dateien
**Status:** ⚠️ WARNING | **Schwere:** Minor (vorher FAIL – teilweise behoben)

| Datei | Problem | Status |
|-------|---------|--------|
| `script.js` | Legacy-Duplikat von `script_roger.js` | ⚠️ Sollte entfernt werden |
| `index_bjoern.html` | Standalone-Entwurf ohne Komponenten-Integration | ⚠️ Legacy |
| `style_bjoern.css` | Fast identisch mit `rezept-des-tages.css` | ⚠️ Klären ob nötig |
| `croissant.html` + `recipe-croissant.html` | **Zwei Croissant-Rezeptseiten** (Roger + Waldemar) | ⚠️ Duplikat klären |

**Verbesserung:** `style.css` enthält KEINE duplizierten Header/Footer/Nav-Regeln mehr (von Waldemar bereinigt ✅).

**Offen:** `croissant.html` (Roger, mit Portionsrechner) und `recipe-croissant.html` (Waldemar, ohne Portionsrechner) – index.html verlinkt auf `recipe-croissant.html`. Entweder zusammenführen oder `croissant.html` entfernen.

---

### A6 – Favicon konsistent
**Status:** ✅ PASS (vorher WARNING)

| Seite | Favicon | Status |
|-------|---------|--------|
| index.html | `favicon-light.png` + `favicon-dark.png` | ✅ (Waldemar ergänzt) |
| kontakt.html, datenschutz.html, SendMail.html | `favicon-light.png` + `favicon-dark.png` | ✅ |
| Alle Rezeptseiten | `favicon-light.png` + `favicon-dark.png` | ✅ |
| impressum.html | `logo_small.png` (kein Dark-Mode) | ⚠️ Abweichend |

---

### A7 – Fehlende Assets
**Status:** ✅ PASS

Alle referenzierten Bilder sind vorhanden:
- `./img/carbonara.jpg` ✅
- `./img/croissant.jpg` ✅
- `./img/salad.jpg` ✅
- `./img/bibimbap.jpg` ✅
- `./img/wok.jpg` ✅
- `./img/frische-croissants.png` ✅
- `./img/profile_roger.jpeg` ✅
- `./img/profile_bjoern.jpg` ✅
- `./img/389904-B_02.jpg` ✅

---

### A8 – Doppeltes Script-Tag
**Status:** ❌ FAIL | **Schwere:** Minor

| Datei | Problem |
|-------|---------|
| recipe-croissant.html Z.18 + Z.21 | `script_roger.js` wird **zweimal** per `<script defer>` geladen |

**Fix:** Zweites `<script src="./script_roger.js" defer></script>` in Z.21 entfernen.

---

## B – Design & UX

### B1 – CSS Custom Properties / Design Tokens
**Status:** ✅ PASS

Variables in `style_components.css`:
```css
:root {
  --green: #0a8f2a;  --border: #e6e6e6;  --text: #111;
  --muted: #666;  --bg: #ffffff;  --container: 1264px;  --pad: 24px;
  --footer-bg: #2b2b2b;  --footer-fg: #ffffff;
}
```

Hinweis: `style.css` (Waldemar) definiert kein eigenes `:root` mehr – nutzt eigene Werte inline (z.B. `max-width: 1240px` statt `var(--container)`). Kein Kaskadenkonflikt, aber leicht inkonsistent.

---

### B2 – Echte Inhalte (kein Lorem Ipsum)
**Status:** ✅ PASS (vorher FAIL)

Waldemar hat den Lorem-Ipsum-Text in der Wok-Sektion durch echten Inhalt ersetzt (Pfanne vs. Wok Vergleich). Alle Sektionen enthalten jetzt reale Texte.

---

### B3 – cursor:pointer auf klickbaren Elementen
**Status:** ✅ PASS

Alle interaktiven Elemente haben `cursor: pointer` – Buttons, Social-Icons, Burger-Button, Formular-Button.

---

### B4 – Transitions auf Hover-Zuständen
**Status:** ✅ PASS

Nav-Links, Social-Icons, Burger-Animation, Formular-Inputs und Buttons haben Transitions. Einzige Ausnahme: `.button:hover` in style.css (abrupter Farbwechsel) – minimal.

---

### B5 – Konsistente Markenfarbe
**Status:** ⚠️ WARNING | **Schwere:** Minor

| Datei | Grünton |
|-------|---------|
| style_components.css, style_roger.css | `--green: #0a8f2a` ✅ |
| style.css (Waldemar) | `#008000` |
| rezept-des-tages.css (Bjoern) | `#008000` |

Unterschied ist gering, aber inkonsistent. Empfehlung: Alle auf `var(--green)` aus style_components.css umstellen.

---

### B6 – Sticky Footer
**Status:** ✅ PASS

`body { min-height: 100vh; display: flex; flex-direction: column; }` + `main { flex: 1 0 auto; }` + `.site-footer { margin-top: auto; }` – Footer sitzt auf allen Seiten korrekt unten.

---

## C – Responsiveness

### C1 – Viewport-Meta-Tag
**Status:** ✅ PASS

Alle HTML-Dateien enthalten `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.

---

### C2 – Kein horizontaler Overflow
**Status:** ✅ PASS

`html, body { overflow-x: hidden; }` in style_components.css.

---

### C3 – Mobile Navigation (Burger-Menü)
**Status:** ✅ PASS

Off-Canvas-Menü ab 768px, Overlay, Escape-Taste, aria-expanded – vollständig implementiert.

---

### C4 – Bilder responsiv
**Status:** ✅ PASS

`img { display: block; max-width: 100%; height: auto; }` global. Zusätzlich `object-fit: cover` auf Rezept- und Profilbildern.

---

### C5 – Touch-Targets >= 48px
**Status:** ✅ PASS

Mobile Nav-Links: `min-height: 48px`. Burger-Button, Formular-Buttons ausreichend groß.

---

### C6 – Responsive Breakpoints
**Status:** ⚠️ WARNING | **Schwere:** Minor (vorher WARNING – verbessert)

**Verbesserung:** style.css hat jetzt Breakpoints bei 1440px und 767px (Waldemar ergänzt). Startseite ist jetzt mobil besser nutzbar.

Verbleibende Breakpoints:
| Breakpoint | Datei | Zweck |
|-----------|-------|-------|
| 1440px | style.css, rezept-des-tages.css | Container-Padding |
| 900px | style_components.css | Nav-Gap + Footer |
| 768px | style_components.css | Burger-Menü |
| 767px | style.css | Startseite mobil (flex-direction: column) |
| 610px | rezept-des-tages.css | Portionen-Layout |
| 480px | style_roger.css | Kontakt/Bestätigung |
| 474px | rezept-des-tages.css | Rezept mobil |
| 420px | style_components.css | Container + Footer |

---

## D – Funktionalität

### D1 – Header/Footer Fragment-Loading
**Status:** ✅ PASS

`includeFragments()` in `script_roger.js` lädt alle `[data-include]` Elemente parallel. `cache: "no-store"`, Fehlerbehandlung, wird in `boot()` als erster Schritt ausgeführt.

---

### D2 – Aktive Navigation
**Status:** ✅ PASS

`setActiveNav()` vergleicht Dateinamen mit Link-href. Sauberer Reset + Fallback auf index.html.

---

### D3 – Kontaktformular (Formspree)
**Status:** ✅ PASS

Formular-ID `xreakveq`, fetch-basierter Submit, Erfolg → SendMail.html, Fehler → Alert, HTML5-Validierung auf allen Feldern.

---

### D4 – Burger-Menü
**Status:** ✅ PASS

Toggle, Overlay-Klick, Nav-Link-Klick, Escape-Taste, aria-expanded – alles funktional.

---

### D5 – Portionsrechner
**Status:** ⚠️ WARNING | **Schwere:** Minor

**Syntaxfehler behoben:** script_portionen.js hatte fehlerhafte Klammerstruktur (formatMenge + if-Block), die den gesamten Rechner kaputt machte. **Am 18.02.2026 gefixt.**

| Seite | Portionsrechner | data-amount | Status |
|-------|----------------|-------------|--------|
| rezept_roger.html | ✅ eingebunden | ✅ vorhanden | ✅ PASS |
| croissant.html | ✅ eingebunden | ✅ vorhanden | ✅ PASS |
| recipe-croissant.html | ✅ eingebunden | ❌ fehlt | ⚠️ Script da, aber keine data-amount Attribute |
| rezept-des-tages.html | ❌ nicht eingebunden | ❌ fehlt | ⚠️ Offen |
| rezept-bjoern.html | ❌ nicht eingebunden | ❌ fehlt | ⚠️ Offen |

**TODO für Waldemar:** In `recipe-croissant.html` data-amount/data-unit/data-label Attribute auf jede Zutat setzen.

**TODO für Bjoern:** In `rezept-des-tages.html` und `rezept-bjoern.html`:
1. `<script src="./script_portionen.js" defer></script>` vor `</head>` einfügen
2. Jede berechenbare Zutat mit Attributen versehen: `<p data-amount="500" data-unit="g" data-label="Tomaten">500g Tomaten</p>`

---

## E – Legal & Compliance

### E1 – Impressum
**Status:** ✅ PASS

Vollständig: Diensteanbieter, Verantwortliche (3 Namen), Anschrift, Kontakt, Projektkontext, Haftung, Urheberrecht, Bildnachweise (Carbonara/Unsplash).

---

### E2 – Datenschutzerklärung
**Status:** ✅ PASS

10 Abschnitte inkl. DSGVO-Rechtsgrundlagen. Formspree explizit erwähnt. Stand: 17.02.2026.

---

### E3 – Bildnachweise / Credits
**Status:** ⚠️ WARNING | **Schwere:** Minor

| Bild | Nachweis | Status |
|------|---------|--------|
| carbonara.jpg | Impressum (Unsplash/Rob Wicks) | ✅ |
| croissant.jpg | Nicht dokumentiert | ⚠️ |
| salad.jpg | Nicht dokumentiert | ⚠️ |
| wok.jpg | Nicht dokumentiert | ⚠️ |
| bibimbap.jpg | Nicht dokumentiert | ⚠️ |
| frische-croissants.png | Nicht dokumentiert | ⚠️ |

**Fix:** Bildquellen in impressum.html oder credits.txt ergänzen.

---

### E4 – Footer-Links zu Legal-Seiten
**Status:** ✅ PASS

Footer enthält Links zu Impressum und Datenschutz. Sichtbar auf allen Seiten.

---

### E5 – Cookie-/Tracking-Hinweis
**Status:** ✅ PASS

Nicht erforderlich (keine Cookies, kein Tracking, Fonts lokal).

---

## F – Technische Qualität

### F1 – JavaScript Best Practices
**Status:** ✅ PASS

- `"use strict"` in beiden JS-Dateien ✅
- Async/Await in script_roger.js ✅
- Fehlerbehandlung mit try/catch ✅
- Guard-Clauses ✅
- JSDoc-Kommentare ✅
- script_portionen.js: Klammerstruktur korrigiert ✅

---

### F2 – CSS Organisation
**Status:** ✅ PASS

style_components.css klar in 7 nummerierte Sektionen gegliedert. style_roger.css ebenfalls sauber strukturiert.

---

### F3 – Doppelte CSS-Definitionen (Kaskadenkonflikt)
**Status:** ✅ PASS (vorher FAIL – von Waldemar behoben)

`style.css` enthält jetzt NUR noch Startseiten-spezifische Klassen:
- `.content-wrapper`, `.recipe-of-the-day`, `.recipes`, `.recipes-content`, `.recipes-links`, `.wok-vs-pan`, `.wok-vs-pan-content`, `.lorem`, `.highlight`, `.button`

Alle Header/Footer/Nav-Duplikate wurden entfernt. Kein Kaskadenkonflikt mehr.

---

### F4 – Rezept-CSS überschreibt globale Styles
**Status:** ❌ FAIL | **Schwere:** Major

`rezept-des-tages.css` enthält weiterhin globale Element-Selektoren:

```css
header { width: 100%; height: 112px; background-color: rgb(42, 165, 159); }
footer { width: 100%; height: 112px; background-color: rgb(0, 0, 0); }
body { margin: 0; }
h1, h2, h3, p, span { ... }
```

Diese überschreiben die Klassen-Styles aus style_components.css zwar nicht direkt (niedrigere Spezifität), setzen aber unerwünschte Basis-Styles.

**Fix:** Element-Selektoren in rezept-des-tages.css durch Klassen ersetzen. `header`/`footer`-Regeln entfernen.

---

### F5 – HTML-Validität
**Status:** ⚠️ WARNING | **Schwere:** Minor (verbessert)

**Behoben von Waldemar:**
- ~~`<selection>` statt `<section>`~~ ✅ gefixt
- ~~Kein Favicon in index.html~~ ✅ hinzugefügt

**Verbleibend:**
| Datei | Problem |
|-------|---------|
| recipe-croissant.html Z.18+21 | script_roger.js doppelt geladen |
| index_bjoern.html Z.2 | `lang="en"` statt `lang="de"` |
| rezept-bjoern.html Z.121 | `</ber>` statt `<br>` (ungültiges Tag) |

---

### F6 – Accessibility (a11y)
**Status:** ⚠️ WARNING | **Schwere:** Minor

**Gut:**
- `aria-label` auf Logo, Burger-Button, Social-Icons ✅
- `aria-expanded` auf Burger-Button ✅
- `aria-label="Hauptnavigation"` auf `<nav>` ✅
- `lang="de"` auf allen Produktiv-Seiten ✅

**Verbesserungswürdig:**
- Alt-Texte teils auf Englisch: rezept-des-tages.html ("the image depicts..."), rezept-bjoern.html ("the image depicts...")
- **Falscher Alt-Text:** index.html Z.33 – Salat-Bild hat alt="Bild der Zubereitung vom Croissant" (sollte Salat sein)
- Profilbilder in rezept-des-tages.html und recipe-croissant.html haben `alt=""`

---

### F7 – Tippfehler im Content
**Status:** ⚠️ WARNING | **Schwere:** Minor

| Datei | Zeile | Fehler | Korrektur |
|-------|-------|--------|-----------|
| **index.html** | Z.35 | "Grichischer" | "Griechischer" |
| **index.html** | Z.51 | "Spagetthi Cabonara" (alt-Text) | "Spaghetti Carbonara" |
| **index.html** | Z.52 | "Bimimbap" (alt-Text) | "Bibimbap" |
| **index.html** | Z.33 | alt="Bild der Zubereitung vom Croissant" auf Salat-Bild | "Bild vom griechischen Bauernsalat" |
| **index.html** | Z.69 | "Bildvon" | "Bild von" |
| rezept-bjoern.html | Z.69 | "Zuccini" | "Zucchini" |
| rezept-bjoern.html | Z.107 | "Zuereitungszeit" | "Zubereitungszeit" |
| rezept-bjoern.html | Z.121 | "`</ber>`" | "`<br>`" |
| rezept-bjoern.html | Z.124 | "Karttoenstreifen" | "Karottenstreifen" |
| rezept-des-tages.html | Z.108 | "Paprike" | "Paprika" |
| rezept-des-tages.css | Klasse | `.preperation-info` | `.preparation-info` (Tippfehler im Klassennamen, funktioniert aber da konsistent im HTML und CSS) |

---

## Priorisierte Fix-Liste

### Erledigt seit letzter Prüfung

- ~~Lorem Ipsum in Wok-Sektion~~ ✅ Waldemar: echten Text eingesetzt
- ~~style.css Duplikate~~ ✅ Waldemar: Header/Footer/Nav-Regeln entfernt
- ~~Broken Link ./croissant.html~~ ✅ Rezeptseiten erstellt
- ~~`<selection>` Tippfehler~~ ✅ Waldemar: gefixt
- ~~Favicon auf Startseite~~ ✅ Waldemar: hinzugefügt
- ~~script_portionen.js Syntaxfehler~~ ✅ Roger/Claude: gefixt (18.02.2026)
- ~~Startseite Responsiveness~~ ✅ Waldemar: Breakpoints 1440px + 767px ergänzt

### Offen: Major

1. **rezept-des-tages.css globale Overrides** → `header`/`footer`/Element-Selektoren durch Klassen ersetzen (Bjoern)
2. **Portionsrechner** auf Bjoerns + Waldemars Rezeptseiten → data-* Attribute + ggf. Script einbinden
3. **Doppelte Croissant-Seite** → `croissant.html` (Roger) und `recipe-croissant.html` (Waldemar) konsolidieren

### Offen: Minor

4. **script_roger.js doppelt** in recipe-croissant.html Z.21 → zweites `<script>` entfernen
5. **Tippfehler** in index.html ("Grichischer", "Spagetthi Cabonara", "Bimimbap", falscher Alt-Text)
6. **Tippfehler** in rezept-bjoern.html ("Zuccini", "Zuereitungszeit", "Karttoenstreifen", `</ber>`)
7. **Alt-Texte** auf Deutsch vereinheitlichen (rezept-des-tages.html, rezept-bjoern.html)
8. **Bildnachweise** für übrige Bilder ergänzen (salad.jpg, wok.jpg, croissant.jpg, bibimbap.jpg, frische-croissants.png)
9. **script.js Legacy** → entfernen
10. **Favicon impressum.html** → auf favicon-light/dark umstellen
11. **Social-Media-Links** im Footer mit echten URLs befüllen (nice-to-have)
12. **Grünton vereinheitlichen** → `#008000` in style.css / rezept-des-tages.css auf `var(--green)` umstellen

---

## Datei-Inventar (Stand 18.02.2026)

| Datei | Owner | Typ | Status |
|-------|-------|-----|--------|
| components/header.html | Roger | Komponente | ✅ Produktiv |
| components/footer.html | Roger | Komponente | ✅ Produktiv (X-Icon aktualisiert) |
| style_components.css | Roger | Shared CSS | ✅ Produktiv |
| style_roger.css | Roger | Page CSS | ✅ Produktiv (inkl. Profilbild-Fix) |
| script_roger.js | Roger | Shared JS | ✅ Produktiv |
| script_portionen.js | Roger | Shared JS | ✅ Produktiv (Syntaxfehler gefixt 18.02.) |
| rezept_roger.html | Roger | Rezeptseite | ✅ Spaghetti Carbonara (mit Portionsrechner) |
| croissant.html | Roger | Rezeptseite | ⚠️ Französische Croissants – Duplikat mit recipe-croissant.html |
| kontakt.html | Roger | Kontaktseite | ✅ Produktiv |
| SendMail.html | Roger | Bestätigung | ✅ Produktiv |
| impressum.html | Roger | Legal | ✅ Produktiv |
| datenschutz.html | Roger | Legal | ✅ Produktiv |
| index.html | Waldemar | Startseite | ⚠️ Tippfehler + falscher Alt-Text |
| style.css | Waldemar | Startseite CSS | ✅ Bereinigt (keine Duplikate mehr) |
| recipe-croissant.html | Waldemar | Rezeptseite | ⚠️ Doppeltes Script + keine data-amount |
| recipe-croissant.css | Waldemar | Rezept CSS | ✅ Produktiv |
| rezept-des-tages.html | Bjoern | Rezeptseite | ✅ Bauernsalat (Portionsrechner offen) |
| rezept-bjoern.html | Bjoern | Rezeptseite | ⚠️ Bibimbap (Tippfehler + Portionsrechner offen) |
| rezept-des-tages.css | Bjoern | Rezept CSS | ⚠️ Globale Element-Selektoren |
| style_bjoern.css | Bjoern | Rezept CSS | ⚠️ Vermutlich Legacy |
| script.js | — | JS | ❌ Legacy – entfernen |
| index_bjoern.html | Bjoern | Entwurf | ❌ Legacy – entfernen |

---

*Diese Checkliste wird bei jedem QA-Durchlauf aktualisiert. Nächster geplanter Re-Run: nach Behebung der offenen Major-Punkte.*
