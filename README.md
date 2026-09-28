# Lichtzeit

Ein generatives Kunstwerk: ein Pixel-Raster-Bild vom Chiemsee, das zugleich
**Uhr** und **Mondphasen-Anzeige** ist. Es läuft dauerhaft im Browser, gedacht
für einen 32-Zoll Muse Frame im Hochformat.

## So liest man die Uhr

- **Stunde:** Der Lichtstrahl von Sonne (6–18 Uhr) oder Mond (18–6 Uhr) fällt
  auf eine Reihe von 13 Pfählen. Links ist 6 bzw. 18 Uhr, die Mitte (Doppelpfahl)
  ist 12 bzw. 24 Uhr, rechts ist 18 bzw. 6 Uhr.
- **Minute:** Der Schornstein des Dampfers zeigt die Minute. Jeder Pfahl steht
  für 5 Minuten.
- **Mond:** Der Mond zeigt seine echte Phase. Bei Vollmond wird das Bild klar
  und silbern, bei Neumond schaltet es auf 1-Bit.

## Wetter und Barometer

Lichtzeit holt alle 15 Minuten das echte Wetter am Chiemsee von
[Open-Meteo](https://open-meteo.com) (kostenlos, ohne Anmeldung) und übersetzt
es ins Bild:

- **Wolken** – je mehr Bewölkung, desto mehr und größere Wolken; unter 10 % ist der Himmel ganz klar
- **Regen** – Pixelregen und Regenschleier, Pixel „tropfen“
- **Schnee** – fallende Flocken
- **Wind** – Pixel verwehen, Böenfelder auf dem See, Schilf wiegt sich
- **Nebel, schlechte Sicht** – Pixel lösen sich auf
- **Gewitter** – Glitch und Blitze. Kündigt sich ein Gewitter an, türmen sich die Wolken schon vorher auf.
- **Regenbogen** – nur wenn es gerade aufgehört hat zu regnen, die Sonne
  zwischen 3° und 40° hoch steht und weniger als etwa 70 % bewölkt ist
- **Temperatur** – der See wirkt bei Kälte ganz leicht kühler, bei Wärme wärmer
- **Barometer** – der Luftdruck-Trend der letzten 3 Stunden: Steigt er, wird
  das Raster ruhiger. Fällt er, wird es unruhiger. Fällt er stark (mehr als
  3 hPa), flirrt es deutlich, wie eine Sturmwarnung.

Der letzte Stand wird im Browser gespeichert. Ist kein Internet da, läuft das
Bild mit diesem Stand weiter. Ist er älter als 6 Stunden oder gibt es keinen,
zeigt Lichtzeit das eingebaute, simulierte Wetter. Das Bild ist nie leer.

Die Grenzwerte (Wind, Barometer, Regenbogen, See-Farbton) stehen gesammelt
oben im Abschnitt „Echtes Wetter“ in `index.html`.

## Dateien

- `index.html` – das Kunstwerk (eine Datei, ohne Build-Werkzeuge)
- `config.json` – Einstellungen (Ort, Familie, Termine, Wetter)
- `README.md` – diese Anleitung

## Einstellungen ändern

Alle veränderbaren Daten stehen in `config.json`. So änderst du sie:

1. Auf GitHub die Datei `config.json` öffnen und auf das Stift-Symbol klicken.
2. Werte ändern, dann unten auf **Commit changes** klicken.
3. Nach ein bis zwei Minuten ist die Änderung online. Seite neu laden.

| Eintrag | Bedeutung |
|---|---|
| `ort` | Name und Koordinaten. Bestimmen Sonnen- und Mondstand. |
| `familie` | Die drei Sterne. Die ersten beiden rücken am Hochzeitstag zusammen. Der dritte ist der kleine Stern: Mit `geburtsjahr` wächst er bis zum 18. Geburtstag. Am Geburtstag leuchtet der Stern golden. |
| `hochzeitstag` | An diesem Tag leuchten die ersten beiden Sterne golden. |
| `feuerwehrboot` | Zeitfenster (`von`, `bis`) und Dauer in `minuten`. Die genaue Uhrzeit wird jeden Tag neu ausgelost. |
| `eisvogel` | Wie oft am Tag (`pro_tag`, zwischen 7 und 19 Uhr) und wie lange (`minuten`). |
| `wetter` | `echt`: echtes Wetter an (`true`) oder aus (`false`). `aktualisieren_minuten`: wie oft das Wetter abgerufen wird (mindestens 5). |
| `anzeige` | Rastergröße, Bildrate und interne Auflösung, siehe unten. `"auto"` passt sich dem Bildschirm an. |
| `astro` | Schalter für die Himmelselemente: `planeten`, `mond_zeichen`, `kamm_punkte` (je `true` oder `false`). |
| `astro_punkte` | Die Lichtpunkte auf dem Bergkamm, siehe „Himmel“. |

Regeln, damit nichts schiefgeht:

- Datumsangaben als `"MM-TT"`, z. B. `"06-19"` für den 19. Juni. Leer (`""`) heißt: kein Goldtag.
- Uhrzeiten als `"HH:MM"`, z. B. `"14:00"`.
- Anführungszeichen und Kommas stehen lassen wie im Beispiel.
- Einträge, deren Name mit `_` beginnt (z. B. `"_notiz"`), sind Notizen und werden ignoriert.
- Ist ein Wert fehlerhaft, gilt dafür der eingebaute Standard. Das Bild läuft also immer weiter. Im Test-Modus (`?dev=1`) steht in der Info-Zeile, welcher Eintrag nicht passt.

## Anzeige und Leistung

Unter `"anzeige"` in `config.json`:

| Eintrag | Bedeutung |
|---|---|
| `raster_px` | Größe einer Rasterzelle in Bildpunkten des Browsers. Kleiner = feiner, aber mehr Rechenarbeit. `"auto"` beginnt mit dem feinsten Raster (am Handy wie gewohnt, auf 4K-Bildschirmen 6) und wird gröber, wenn das Gerät nicht mitkommt. Gleichmäßige Rasterlinien gibt es bei 4, 6 und 8. |
| `max_fps` | Höchste Bildrate (Bilder pro Sekunde), Standard 30. |
| `interne_aufloesung` | Mit welchem Anteil der Bildpunkte gerechnet wird: 1 = volle Auflösung, 0.5 = halbe (wird hochskaliert). `"auto"` = volle Auflösung, auf 4K-Bildschirmen bei überlasteter Grafik weniger. |

**Automatik:** Steht die Rastergröße auf `"auto"`, misst Lichtzeit alle
5 Sekunden, wie viele Bilder tatsächlich gezeichnet werden. Sind es weniger
als etwa 25 pro Sekunde, wechselt sie auf das nächstgröbere Raster. Feiner wird
es erst wieder nach dem Neuladen (spätestens um 4:00 Uhr). Feste Zahlen schalten
die Automatik ab.

**Grafikeinheit:** Die Endfarbe jeder Rasterzelle rechnet die Grafikeinheit
(WebGL2), das ist auf schwachen Geräten viel schneller. Grafikchips rechnen mit
etwas weniger Nachkommastellen: Im Pixelvergleich mit dem Original sind die
meisten Momente identisch, sonst weichen einzelne Zellen um eine Farbstufe ab
(unsichtbar). Ohne WebGL2 rechnet automatisch der Prozessor, dann exakt wie das
Original.

**Pro Gerät per Adresse:** Die Einstellungen lassen sich an der Adresse
überschreiben, ohne `config.json` für alle zu ändern. Beispiel für den Muse:
`https://maxslobster.github.io/lichtzeit/?raster=6&fps=30`

| Parameter | Wirkung |
|---|---|
| `raster=6` | Rastergröße (oder `auto`) |
| `fps=30` | höchste Bildrate |
| `aufloesung=0.5` | interne Auflösung (oder `auto`) |
| `gpu=0` | Farben im Prozessor statt in der Grafikeinheit (`gpu=1` = Grafikeinheit) |

Mit `?dev=1` zeigt die Seite oben rechts, wie viele Bilder pro Sekunde
tatsächlich gezeichnet werden, wie viele Millisekunden jeder Teil braucht
(Szene, Auslesen, Zellen, Farben, Rest), welches Raster aktiv ist, ob die
Grafikeinheit rechnet und mit welcher Auflösung der Browser des Geräts arbeitet.

## Himmel

Dezente Zusätze, keine Beschriftungen im Bild. Die Uhr bleibt immer das
hellste Element.

- **Planeten:** Venus (hellweiß), Mars (rötlich), Jupiter (cremefarben) und
  Saturn (goldgelb) stehen an ihrer echten Stelle über dem Chiemsee, mit Blick
  nach Süden: Osten links, Westen rechts. Man sieht sie nur, wenn sie über dem
  Horizont und über den Bergen stehen und der Himmel dunkel genug ist, bei
  Wolken, Nebel und Gewitter nicht.
- **Mond in unseren Zeichen:** Steht der Mond im Sonnenzeichen eines
  Familiensterns, schimmert dieser Stern leise. Das Sonnenzeichen ergibt sich
  aus dem Geburtstag in `config.json`.
- **Punkte auf dem Bergkamm:** Kleine Lichter für die nächsten
  Astrokartographie-Linien der Familie. Osten links, Westen rechts; je näher die
  Linie am Chiemsee verläuft, desto näher zur Bildmitte und desto heller. Nachts
  sichtbar, tagsüber kaum. In `config.json` steht pro Punkt nur Stern, Planet,
  Richtung und Entfernung in km, keine Geburtsdaten.

Im Test-Modus (`?dev=1`) nennt die Info-Zeile die sichtbaren Planeten, das
Zeichen des Mondes und die Kamm-Punkte.

## Uhrzeit

Lichtzeit rechnet immer in Berliner Zeit, auch wenn am Gerät eine andere
Zeitzone eingestellt ist. Geht die Uhr des Geräts mehr als eine Minute falsch,
korrigiert Lichtzeit sie anhand der Serveruhr. Beides steht im Test-Modus in
der Info-Zeile.

## Ausstellungsmodus

Die normale Adresse **https://maxslobster.github.io/lichtzeit/** zeigt nur das
Bild: keine Steuerleiste, kein Titel, kein Mauszeiger. Berührungen bewirken
nichts. Außerdem:

- Der Bildschirm wird wach gehalten, wenn der Browser das unterstützt.
- Jeden Tag um 4:00 Uhr lädt sich die Seite neu, damit Änderungen ankommen.
  Das passiert nur, wenn die Seite gerade erreichbar ist. Ohne Internet läuft
  das Bild einfach weiter.

## Test-Parameter

Parameter werden an die Adresse angehängt: der erste mit `?`, weitere mit `&`.

| Parameter | Wirkung |
|---|---|
| `?dev=1` | Test-Modus: Steuerleiste (Tag, Uhrzeit, Zeitraffer, Lesehilfe, Mitternacht ansehen, Seltenheit finden), Info-Zeile mit Wetter und Luftdruck-Trend, oben rechts die Bildrate. Ein Tipp aufs Bild blendet die Steuerung aus. |
| `?t=2026-12-24T17:30` | Zeit simulieren. Die Uhr läuft ab diesem Moment weiter. Auch möglich: `?t=17:30` (heute) oder `?t=0:00:20`. |
| `?raster=`, `?fps=`, `?aufloesung=`, `?gpu=` | Anzeige für dieses Gerät, siehe „Anzeige und Leistung“. |
| `?wetter=gewitter` | Wetter erzwingen: `gewitter`, `regen`, `nebel`, `klar` oder `schnee`. Gewitter kommt mit stark fallendem Luftdruck, Regen mit fallendem. |

Beispiele:

- `https://maxslobster.github.io/lichtzeit/?dev=1`
- `https://maxslobster.github.io/lichtzeit/?t=2026-12-24T18:00&wetter=schnee`
- `https://maxslobster.github.io/lichtzeit/?t=23:58&dev=1` – zwei Minuten vor dem Pixelsturz
