# QA-Checkliste – Kochwelt

> **Projekt:** Kochwelt – Teamprojekt (Developer Akademie)
> **Prüfdatum:** 17.02.2026
> **Prüfer:** Claude (automatisierte QA)
> **Team:** Roger Friebus, Bjoern Sagmeister, Waldemar Chorow

---

## Zusammenfassung

| Kategorie | PASS | WARN | FAIL | Gesamt |
|-----------|------|------|------|--------|
| A – Projektbasics | 4 | 1 | 2 | 7 |
| B – Design & UX | 4 | 1 | 1 | 6 |
| C – Responsiveness | 5 | 1 | 0 | 6 |
| D – Funktionalität | 4 | 1 | 0 | 5 |
| E – Legal & Compliance | 4 | 1 | 0 | 5 |
| F – Technische Qualität | 3 | 2 | 2 | 7 |
| **Gesamt** | **24** | **7** | **5** | **36** |

> **Änderungsprotokoll:**
> - 17.02.2026 (Update 1): `rezept_roger.html` + `script_portionen.js` erstellt. D5 Portionsrechner von FAIL → PASS (Roger) / WARN (Bjoern). A7 hinzugefügt (fehlendes Rezeptbild).
> - 17.02.2026 (Update 2): `carbonara.jpg` + `profile_roger.jpeg` vorhanden → A7 PASS. Bildnachweis (Unsplash/Rob Wicks) in `impressum.html` eingetragen. Portionsrechner: Startwert 4, Negativwerte-Schutz, initiale Berechnung.

---

## A – Projektbasics

### A1 – Ordnerstruktur & Dateiorganisation
**Status:** ✅ PASS

Vorhandene Struktur:
```
/
├── components/          (header.html, footer.html)
├── fonts/               (Raleway Variable Font, 2 Dateien)
├── img/                 (12 Bilder)
│   └── icons/           (6 Icons + 1 Stockfoto)
├── *.html               (8 HTML-Dateien)
├── *.css                (5 CSS-Dateien)
├── *.js                 (2 JS-Dateien)
├── credits.txt
└── *.png / *.pdf        (Mockups, Checkliste)
```

Komponenten-Architektur (header.html, footer.html per `data-include`) ist sinnvoll und wartbar.

---

### A2 – Verlinkte Seiten erreichbar (keine toten Links)
**Status:** ❌ FAIL | **Schwere:** Blocker

| Link | Datei | Zeile | Problem |
|------|-------|-------|---------|
| `./croissant.html` | index.html | 38 | **Datei existiert nicht** |
| `#` (3×) | index.html | 45–47 | Platzhalter-Links (recipes-links) |
| `#` (3×) | footer.html | 13, 16, 19 | Social-Media-Links ohne echte URLs |

**Fix:** `croissant.html` erstellen oder Link auf existierende Rezeptseite ändern. Platzhalter-Links (#) durch echte URLs ersetzen oder entfernen.

---

### A3 – Einheitliches Komponenten-System
**Status:** ✅ PASS

Alle produktiven Seiten nutzen `data-include` für Header/Footer:
- ✅ index.html
- ✅ kontakt.html
- ✅ SendMail.html
- ✅ impressum.html
- ✅ datenschutz.html
- ✅ rezept-des-tages.html
- ✅ rezept-bjoern.html
- ⚠️ index_bjoern.html – Standalone-Entwicklungsdatei ohne data-include (vermutlich Legacy/Entwurf)

---

### A4 – Keine externen CDNs / Datenschutz-Konformität
**Status:** ✅ PASS

- Fonts: Lokal (`./fonts/Raleway-VariableFont_wght.ttf`) – ✅ kein Google Fonts
- Icons: Lokal (`./img/icons/`) – ✅ kein FontAwesome CDN
- Kein jQuery, kein Bootstrap, keine externen Scripts
- Einziger externer Dienst: Formspree (dokumentiert in Datenschutzerklärung)

---

### A5 – Doppelte/veraltete Dateien
**Status:** ❌ FAIL | **Schwere:** Major

| Datei | Problem |
|-------|---------|
| `script.js` | **Legacy-Duplikat** von `script_roger.js` (nur Sektionen 1–3, ohne Burger-Menü und Kontaktformular) |
| `style.css` | **Enthält komplette Kopie** aller Header/Footer/Nav-Regeln aus `style_components.css` mit veralteten Werten (`padding-bottom: 10px`, `bottom: -1px`, alte Social-Icons) |
| `index_bjoern.html` | Standalone-Entwurf ohne Komponenten-Integration |
| `style_bjoern.css` | Fast identisch mit `rezept-des-tages.css` |

**Fix:** `script.js` entfernen (wird nur in index_bjoern.html referenziert). Duplizierte Header/Footer/Nav-Regeln aus `style.css` entfernen. `index_bjoern.html` entweder integrieren oder als Legacy markieren.

---

### A6 – Favicon konsistent
**Status:** ⚠️ WARNING | **Schwere:** Minor

| Seite | Favicon |
|-------|---------|
| kontakt.html, datenschutz.html, SendMail.html, rezept-*.html | `favicon-light.png` + `favicon-dark.png` (Dark-Mode) ✅ |
| impressum.html | `logo_small.png` (kein Dark-Mode Favicon) ⚠️ |
| index.html | Kein Favicon definiert ❌ |

**Fix:** Einheitliches Favicon-Set in alle HTML-Dateien einbauen.

---

### A7 – Fehlende Assets
**Status:** ✅ PASS (erledigt)

| Datei | Referenziert in | Status |
|-------|----------------|--------|
| `./img/carbonara.jpg` | rezept_roger.html | ✅ Vorhanden (Unsplash, Rob Wicks) |
| `./img/profile_roger.jpeg` | rezept_roger.html | ✅ Vorhanden |

---

## B – Design & UX

### B1 – CSS Custom Properties / Design Tokens
**Status:** ✅ PASS

```css
:root {
  --green: #0a8f2a;
  --border: #e6e6e6;
  --text: #111;
  --muted: #666;
  --bg: #ffffff;
  --container: 1264px;
  --pad: 24px;
  --footer-bg: #2b2b2b;
  --footer-fg: #ffffff;
}
```

Variables werden konsistent in `style_components.css` und `style_roger.css` verwendet. Einzige Abweichung: `style.css` definiert `--container: 1240px` statt `1264px`.

---

### B2 – Echte Inhalte (kein Lorem Ipsum)
**Status:** ❌ FAIL | **Schwere:** Major

| Seite | Befund |
|-------|--------|
| index.html (Wok-Sektion, Z.53) | **Lorem ipsum dolor sit amet...** |
| Rezeptseiten | Echte Rezeptdaten ✅ |
| Impressum / Datenschutz | Echte, rechtlich korrekte Daten ✅ |
| Kontakt | Echtes Formular ✅ |

**Fix:** Lorem-ipsum-Text in der Wok-Sektion durch echten Vergleichstext (Pfanne vs. Wok) ersetzen.

---

### B3 – cursor:pointer auf klickbaren Elementen
**Status:** ✅ PASS

| Element | Datei | cursor:pointer |
|---------|-------|----------------|
| `.button` | style.css, rezept-des-tages.css | ✅ |
| `.social-icon` | style_components.css | ✅ |
| `.burger-btn` | style_components.css | ✅ |
| `form button` | style_roger.css | ✅ (implizit via `cursor: pointer`) |
| `.btn-back` | style_roger.css | Links (inline-block) – Browser-Default ✅ |

---

### B4 – Transitions auf Hover-Zuständen
**Status:** ✅ PASS

| Element | Transition |
|---------|-----------|
| `.nav a::after` | `transform 120ms ease` ✅ |
| `.social-icon` | `opacity 150ms ease` ✅ |
| `.social-icon` (style.css) | `transform 100ms ease` ✅ |
| `.burger-btn span` | `transform 300ms ease, opacity 200ms ease` ✅ |
| `.nav` (mobile) | `transform 300ms ease-in-out` ✅ |
| `.nav-overlay` | `opacity 300ms ease, visibility 300ms ease` ✅ |
| `form input/textarea` | `border-color 150ms ease` ✅ |
| `form button` | `background 150ms ease` ✅ |
| `.btn-back` | `background 150ms ease` ✅ |
| `.button:hover` | ⚠️ Kein Transition (abrupter Farbwechsel) |

---

### B5 – Konsistente Markenfarbe
**Status:** ✅ PASS

Grün (`--green: #0a8f2a` bzw. `#008000`) wird durchgängig verwendet für:
- Aktive Nav-Links, Underline
- Footer-Legal-Links
- Kontaktformular Fokus-Border, Button
- Portionen-Button auf Rezeptseiten

Hinweis: Waldemar/Bjoern verwenden `#008000` (reines Grün) statt `#0a8f2a` (Markenton). Unterschied ist gering, aber inkonsistent.

---

### B6 – Sticky Footer
**Status:** ✅ PASS

```css
body { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1 0 auto; }
.site-footer { margin-top: auto; }
```

Footer sitzt auch bei wenig Content am unteren Rand. Korrekt in `style_components.css` und `style.css` implementiert.

---

## C – Responsiveness

### C1 – Viewport-Meta-Tag
**Status:** ✅ PASS

Alle HTML-Dateien enthalten:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

### C2 – Kein horizontaler Overflow
**Status:** ✅ PASS

```css
html, body { overflow-x: hidden; }
```

In beiden Haupt-CSS-Dateien definiert. Mobile nav setzt `body.nav-open { overflow: hidden; }`.

---

### C3 – Mobile Navigation (Burger-Menü)
**Status:** ✅ PASS

- Breakpoint: `max-width: 768px`
- Off-Canvas von rechts (280px breit, max 85vw)
- Burger-zu-X-Animation via CSS transforms
- Overlay (rgba(0,0,0,0.4)) zum Schließen
- Escape-Taste schließt Menü
- Nav-Link-Klick schließt Menü
- `aria-expanded` und `aria-label` für Accessibility
- `body.nav-open { overflow: hidden }` verhindert Scroll

---

### C4 – Bilder responsiv
**Status:** ✅ PASS

```css
img { display: block; max-width: 100%; height: auto; }
```

Globaler Reset in beiden Haupt-CSS-Dateien. Zusätzlich `object-fit: cover` auf Rezeptbildern.

---

### C5 – Touch-Targets ≥ 48px
**Status:** ✅ PASS

| Element | min-height |
|---------|-----------|
| `.nav a` (mobile) | `min-height: 48px` ✅ |
| `.burger-btn` | Ausreichend groß (padding 8px + 3 Spans) ✅ |
| `form input/textarea` | `padding: 10px 14px` → ~40px (knapp, aber akzeptabel) |
| `form button` | `padding: 12px 48px` → ~44px ✅ |

---

### C6 – Responsive Breakpoints
**Status:** ⚠️ WARNING | **Schwere:** Minor

| Breakpoint | Datei | Zweck |
|-----------|-------|-------|
| 900px | style_components.css | Nav-Gap + Footer zentriert |
| 768px | style_components.css | Mobile Burger-Menü |
| 480px | style_roger.css | Kontakt/Bestätigung kleiner |
| 420px | style_components.css | Container padding + Footer |
| 1440px | rezept-des-tages.css | Rezept padding |
| 610px | rezept-des-tages.css | Portionen-Layout |
| 474px | rezept-des-tages.css | Rezept mobil |

Die Breakpoints decken den Bereich 320px–1440px ab. Hinweis: Startseite (`style.css`) hat **keine eigenen Breakpoints** – Inhalt (recipe-otd, recipes-links) ist auf kleinen Screens nicht responsiv (fixe `width: 400px`, `width: 200px`).

**Fix:** Responsive Rules für `.recipe-otd`, `.recipes-links` und `.wok` in `style.css` ergänzen.

---

## D – Funktionalität

### D1 – Header/Footer Fragment-Loading
**Status:** ✅ PASS

`includeFragments()` in `script_roger.js`:
- Lädt alle `[data-include]`-Elemente parallel via `fetch()`
- `cache: "no-store"` für sofortige Änderungen
- Fehlerbehandlung mit `console.error` + leeres Element
- Wird in `boot()` als erster Schritt ausgeführt

---

### D2 – Aktive Navigation
**Status:** ✅ PASS

`setActiveNav()` vergleicht aktuellen Dateinamen mit Link-`href`:
- Sauberer Reset aller `.active`-Klassen
- Fallback auf `index.html` bei Root-URL
- Wird nach Fragment-Loading aufgerufen (korrekte Reihenfolge)

---

### D3 – Kontaktformular (Formspree)
**Status:** ✅ PASS

- Formular-ID: `xreakveq` (Formspree)
- `preventDefault()` + `fetch()` mit FormData
- Erfolg → Weiterleitung auf `SendMail.html`
- Fehler → `alert()` mit Fehlermeldung
- Netzwerkfehler → eigene Meldung
- HTML5-Validierung (`required`) auf allen Feldern

---

### D4 – Burger-Menü
**Status:** ✅ PASS

`initBurgerMenu()`:
- Toggle-Funktion mit `classList.toggle`
- Overlay-Klick schließt Menü
- Nav-Link-Klick schließt Menü
- Escape-Taste schließt Menü + Fokus zurück auf Button
- `aria-expanded` wird synchron gesetzt
- Guard-Clause wenn kein Burger-Button vorhanden

---

### D5 – Portionsrechner
**Status:** ⚠️ WARNING | **Schwere:** Minor (teilweise gelöst)

**Neu erstellt:** `script_portionen.js` – gemeinsamer Portionsrechner für alle Rezeptseiten.

| Seite | Status | Details |
|-------|--------|---------|
| rezept_roger.html | ✅ PASS | `data-amount`/`data-unit`/`data-label` Attribute + Script eingebunden |
| rezept-des-tages.html | ⚠️ Offen | Script noch nicht eingebunden, Zutaten-`<p>` brauchen `data-*` Attribute |
| rezept-bjoern.html | ⚠️ Offen | Script noch nicht eingebunden, Zutaten-`<p>` brauchen `data-*` Attribute |

**Funktionsweise von `script_portionen.js`:**
- Liest `#personen` Input (Basis = 1 Portion)
- Multipliziert `data-amount` × Portionszahl
- Formatiert Ausgabe: `"150g Spaghetti"` (mit Einheit) oder `"2 Eigelb"` (ohne)
- Zutaten ohne `data-amount` (z. B. "Salz") bleiben unverändert

**TODO für Bjoern:** In `rezept-des-tages.html` und `rezept-bjoern.html`:
1. `<script src="./script_portionen.js" defer></script>` vor `</head>` einfügen
2. Jede berechenbare Zutat mit Attributen versehen: `<p data-amount="500" data-unit="g" data-label="Tomaten">500g Tomaten</p>`

---

## E – Legal & Compliance

### E1 – Impressum
**Status:** ✅ PASS

Vollständig mit: Diensteanbieter, Verantwortliche (3 Namen), Anschrift, Kontakt (E-Mail + Telefon), Projektkontext, Haftung für Inhalte/Links, Urheberrecht, Bildnachweise.

---

### E2 – Datenschutzerklärung
**Status:** ✅ PASS

10 Abschnitte inkl. DSGVO-Rechtsgrundlagen:
1. Verantwortliche Stelle ✅
2. Allgemeine Hinweise ✅
3. Server-Logfiles (Art. 6 Abs. 1 lit. f) ✅
4. Kontaktaufnahme ✅
5. **Formspree explizit erwähnt** ✅
6. Lokale Schriftarten (kein Google Fonts) ✅
7. Externe Links ✅
8. Betroffenenrechte ✅
9. Datensicherheit ✅
10. Aktualität (Stand: 17.02.2026) ✅

---

### E3 – Bildnachweise / Credits
**Status:** ⚠️ WARNING | **Schwere:** Minor

`credits.txt` verweist auf:
- LogoMakr.com (Logo)
- FontAwesome (Icons, CC BY 4.0)

Impressum verweist auf `credits.txt`, aber die konkreten Nachweise fehlen direkt im Impressum. Außerdem fehlen Nachweise für Stockfotos (croissant.jpg, salad.jpg, wok.jpg, bibimbap.jpg, `sl_z_072523_61700_05.jpg`).

**Fix:** Bildquellen in `credits.txt` ergänzen oder direkt im Impressum auflisten.

---

### E4 – Footer-Links zu Legal-Seiten
**Status:** ✅ PASS

Footer enthält:
- Link zu `./impressum.html` ✅
- Link zu `./datenschutz.html` ✅

Sichtbar auf allen Seiten durch Komponenten-System.

---

### E5 – Cookie-/Tracking-Hinweis
**Status:** ✅ PASS

Nicht erforderlich, da:
- Keine Cookies gesetzt werden
- Keine Tracking-Scripts eingebunden
- Keine externen Ressourcen geladen (Fonts lokal)
- Formspree nur bei aktiver Formularnutzung

---

## F – Technische Qualität

### F1 – JavaScript Best Practices
**Status:** ✅ PASS

- `"use strict"` am Dateianfang ✅
- Async/Await statt Callbacks ✅
- Fehlerbehandlung mit try/catch ✅
- Guard-Clauses (z.B. `if (!form) return`) ✅
- Ausführliche JSDoc-Kommentare ✅
- Klare Trennung in nummerierte Sektionen ✅

---

### F2 – CSS Organisation
**Status:** ✅ PASS

`style_components.css` ist klar strukturiert:
1. Fonts (local)
2. Design Tokens / Variables
3. Reset / Base
4. Layout Helpers
5. Header / Navigation
5b. Burger-Button
5c. Mobile Breakpoint
6. Footer
7. Responsive

Kommentare in deutsch, verständlich für Anfänger.

---

### F3 – Doppelte CSS-Definitionen (Kaskadenkonflikt)
**Status:** ❌ FAIL | **Schwere:** Major

`style.css` definiert **identische Selektoren** wie `style_components.css` mit abweichenden Werten:

| Selektor | style.css | style_components.css | Konflikt |
|----------|-----------|---------------------|----------|
| `.header-inner` padding-bottom | `10px` | `0` | ✅ |
| `.nav a::after` bottom | `-1px` | `0` | ✅ |
| `.logo` margin-bottom | (fehlt) | `10px` | ✅ |
| `.social-icon` | runder Hintergrund | ohne Hintergrund | ✅ |
| `--container` | `1240px` | `1264px` | ✅ |

**Workaround:** index.html lädt `style.css` VOR `style_components.css`, sodass `style_components.css` gewinnt. Dies ist fragil.

**Fix:** Alle Header/Footer/Nav-Regeln aus `style.css` entfernen. Nur Startseiten-spezifische Klassen (`.recipe-otd`, `.recipes`, `.wok`, `.button`, `.lorem`) behalten.

---

### F4 – Rezept-CSS überschreibt globale Styles
**Status:** ❌ FAIL | **Schwere:** Major

`rezept-des-tages.css` und `style_bjoern.css` enthalten:

```css
header { width: 100%; height: 112px; background-color: rgb(42, 165, 159); }
footer { width: 100%; height: 112px; background-color: rgb(0, 0, 0); }
body { margin: 0; }
```

Diese **Element-Selektoren** (`header`, `footer`) überschreiben die Klassen-basierten Styles aus `style_components.css` **nicht** (Klassen haben höhere Spezifität), aber sie setzen unerwünschte Basis-Styles, die bei fehlender Klasse sichtbar werden.

Zusätzlich werden `h1`, `h2`, `h3`, `p`, `span` global überschrieben, was andere Seiten beeinflussen kann, wenn die CSS-Datei geladen wird.

**Fix:** Element-Selektoren in rezept-des-tages.css durch Klassen-Selektoren ersetzen. `header`/`footer`-Regeln entfernen (werden von `style_components.css` gehandhabt).

---

### F5 – HTML-Validität
**Status:** ⚠️ WARNING | **Schwere:** Minor

| Datei | Problem |
|-------|---------|
| index.html Z.29 | `<selection>` statt `<section>` (Tippfehler) |
| index_bjoern.html Z.2 | `lang="en"` statt `lang="de"` |
| index.html | Fehlendes `<link rel="icon">` |
| rezept-des-tages.html Z.19 | `<link>` nach `<script>` (unüblich, funktioniert aber) |

---

### F6 – Accessibility (a11y)
**Status:** ⚠️ WARNING | **Schwere:** Minor

**Gut:**
- `aria-label` auf Logo-Links, Burger-Button, Social-Icons ✅
- `aria-expanded` auf Burger-Button ✅
- `aria-label="Hauptnavigation"` auf `<nav>` ✅
- `lang="de"` auf allen Produktiv-Seiten ✅

**Verbesserungswürdig:**
- Mehrere `alt=""`-Attribute auf dekorativen Icons (akzeptabel, aber Rezept-Profilbilder sollten alt-Text haben)
- Alt-Texte teils auf Englisch ("the image depicts...") statt Deutsch
- Kein `<main>` landmark label
- Formular-Felder haben `<label>`, aber kein `aria-describedby` für Fehlermeldungen

---

### F7 – Tippfehler im Content
**Status:** ✅ PASS (informativ)

| Stelle | Tippfehler | Korrektur |
|--------|-----------|-----------|
| rezept-des-tages.html Z.108 | "Paprike" | "Paprika" |
| rezept-bjoern.html Z.69 | "Zuccini" | "Zucchini" |
| rezept-bjoern.html Z.107 | "Zuereitungszeit" | "Zubereitungszeit" |
| rezept-des-tages.css Z.98 | `.preperation-info` | `.preparation-info` |

---

## Priorisierte Fix-Liste

### 🔴 Blocker (vor Abgabe fixen)

1. **Broken Link** `./croissant.html` in index.html → Seite erstellen oder Link ändern
2. **Lorem Ipsum** in Wok-Sektion auf Startseite → echten Text einsetzen

### 🟠 Major (sollte gefixt werden)

3. **Portionsrechner** auf Bjoerns Rezeptseiten → `data-*` Attribute + Script einbinden (Roger's Seite bereits erledigt)
4. **style.css Duplikate** → Header/Footer/Nav-Regeln entfernen, nur Startseiten-Styles behalten
5. **script.js Legacy** → Datei entfernen (oder durch `script_roger.js` ersetzen)
6. **rezept-des-tages.css** globale Element-Selektoren → durch Klassen ersetzen

### 🟡 Minor (nice-to-have)

7. ~~**Rezeptbild** `./img/carbonara.jpg`~~ ✅ erledigt
8. **Favicon** auf allen Seiten vereinheitlichen
8. **Social-Media-Links** mit echten URLs befüllen
9. **Credits** für Stockfotos ergänzen (Carbonara ✅ erledigt in impressum.html, übrige Bilder offen)
10. **Alt-Texte** auf Deutsch vereinheitlichen
11. **Tippfehler** im Content korrigieren
12. **Startseite Responsiveness** → Breakpoints für mobile Darstellung ergänzen
13. **`<selection>` → `<section>`** Tippfehler in index.html fixen

---

## Datei-Inventar

| Datei | Owner | Typ | Status |
|-------|-------|-----|--------|
| components/header.html | Roger | Komponente | ✅ Produktiv |
| components/footer.html | Roger | Komponente | ✅ Produktiv |
| style_components.css | Roger | Shared CSS | ✅ Produktiv |
| style_roger.css | Roger | Page CSS | ✅ Produktiv |
| script_roger.js | Roger | Shared JS | ✅ Produktiv |
| **script_portionen.js** | **Roger** | **Shared JS** | **✅ NEU – Portionsrechner** |
| **rezept_roger.html** | **Roger** | **Rezeptseite** | **✅ NEU – Spaghetti Carbonara** |
| index.html | Waldemar | Startseite | ⚠️ Broken Link + Lorem |
| style.css | Waldemar | Startseite CSS | ⚠️ Duplizierte Regeln |
| rezept-des-tages.html | Bjoern | Rezeptseite | ✅ Produktiv (Portionsrechner offen) |
| rezept-des-tages.css | Bjoern | Rezept CSS | ⚠️ Globale Overrides |
| rezept-bjoern.html | Bjoern | Rezeptseite | ✅ Produktiv (Portionsrechner offen) |
| style_bjoern.css | Bjoern | Rezept CSS | ⚠️ Globale Overrides |
| kontakt.html | Roger | Kontaktseite | ✅ Produktiv |
| SendMail.html | Roger | Bestätigung | ✅ Produktiv |
| impressum.html | Roger | Legal | ✅ Produktiv |
| datenschutz.html | Roger | Legal | ✅ Produktiv |
| script.js | Legacy | JS | ❌ Entfernen |
| index_bjoern.html | Bjoern | Entwurf | ❌ Legacy |

---

*Diese Checkliste kann für zukünftige Sprints wiederverwendet werden. Einfach die Status-Spalten aktualisieren und neue Prüfpunkte ergänzen.*
