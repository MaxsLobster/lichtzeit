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

- **Wolken** – je mehr Bewölkung, desto mehr und größere Wolken
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

Regeln, damit nichts schiefgeht:

- Datumsangaben als `"MM-TT"`, z. B. `"06-19"` für den 19. Juni. Leer (`""`) heißt: kein Goldtag.
- Uhrzeiten als `"HH:MM"`, z. B. `"14:00"`.
- Anführungszeichen und Kommas stehen lassen wie im Beispiel.
- Einträge, deren Name mit `_` beginnt (z. B. `"_notiz"`), sind Notizen und werden ignoriert.
- Ist ein Wert fehlerhaft, gilt dafür der eingebaute Standard. Das Bild läuft also immer weiter. In der Info-Zeile der Steuerleiste steht dann, welcher Eintrag nicht passt.

*Wird ergänzt: welche Test-Parameter es gibt.*
