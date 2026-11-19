# Lichtzeit

Ein generatives Kunstwerk: ein Pixel-Raster-Bild vom Chiemsee (an drei Tagen pro Woche
von der Höri am Untersee) mit einer **Fallblatt-Uhr**, Wetter, Mondphase und Jahreslauf. Es läuft dauerhaft im Browser, gedacht
für einen 32-Zoll Muse Frame im Hochformat.

**Adresse:** https://maxslobster.github.io/lichtzeit/

## So liest man die Uhr

- **Uhrzeit:** Oben links steht die Zeit auf einer Fallblatt-Tafel aus großen
  Pixelziffern (je 5×7 Zellen, etwa 19 % der Bildbreite; sie rasten auf das
  Bildraster ein, am Muse ist ein Schriftpixel genau eine Rasterzelle). Die Farbe
  kommt aus dem Licht der Szene. Beim Minutenwechsel klappt die Ziffer zur Fuge
  (nach der dritten Zeile) hin um, der Doppelpunkt atmet langsam.
- **Darunter:** das Wetter der nächsten drei Tage als kleine Abfahrtstafel
  (siehe „Vorhersage“).
- **Lichtstrahl und Raddampfer** sind reine Stimmung: Der Strahl von Sonne bzw.
  Mond liegt auf dem See, der Raddampfer fährt in zwei Stunden einmal quer
  darüber: mit roter Wasserlinie, drehendem Schaufelrad, Fenstern, Schornstein,
  zwei Masten und weiß-blauer Fahne, Kielwasser, Bugwelle und Rauchfahne. Nachts
  leuchten die Fenster warm und spiegeln sich, an den Masten brennen Toplichter.
- **Mond:** Der Mond zeigt seine echte Phase. Bei Vollmond wird das Bild klar
  und silbern. In der Neumond-Nacht wird das Raster etwas gröber und blasser.

## Anzeigetafel: die Uhr schreibt

Die Uhr ist zugleich eine Anzeigetafel. Jede Stelle ist ein eigenes Fallblatt;
wechselt die Tafel zwischen Uhr und Wort, rattert es kurz wie an einer echten
Tafel. Zwei Zeilen werden mit `|` getrennt, mehrere Seiten mit `/` (je 5 s).
Solange ein zweizeiliges Wort steht, blendet die Vorhersage aus. Grüße und
Rituale sind bairisch, Infos hochdeutsch.

Was wann kommt (in dieser Reihenfolge, das Erste gewinnt):

1. **6:00:** Die Tafel wacht auf und blättert etwa 4 s wild durch.
2. **Rituale:** 7:00 „SERVUS“ (10 s), 19:00 „GUAD NACHT“ (12 s), einstellbar in `config.json`.
3. **Advent:** um 7:30 „TÜRL“ mit der Zahl des Tages.
4. **Anlässe** (die ersten 9 s): „EIS VOGEL“, „FEUER WEHR“ und die Szenen zum
   Entdecken (z. B. „REIHER“, „GASSI“, „LATERNE“).
5. **Volle Stunde** (8 s, mit zwei Seiten 10 s): ein Wort zur Lage. Die Auswahl
   wechselt stündlich: Festtage („1. ADVENT“, „NIKO LAUS“, „HEILIG ABEND“,
   „FROHE WEIHNACHT“, „GUADN RUTSCH“, „PROSIT NEUJAHR“, an Geburtstagen
   „ALLES GUTE“), Wetter („FÖHN“, „GEWITTER“, „STURM“, „SCHNEE“, „REGEN“,
   „HOCH NEBEL“, „NEBEL“, „FROST“, „SONNE“), Himmel („VOLL MOND“, „NEU MOND“,
   „VENUS“) und Tageslicht (vormittags „SONNEN AUFGANG“ mit Uhrzeit, nachmittags
   „SONNEN UNTERGANG“ mit Uhrzeit).

## Vorhersage

Unter der Uhr stehen die nächsten drei Tage wie auf einer Abfahrtstafel, eine
Zeile pro Tag: Wochentag, Symbol und Höchsttemperatur (rechtsbündig). Symbole: klar, heiter, Wolke, Regen, Schnee, Gewitter, Frost.
**Frost** (Tiefstwert höchstens 0 °C, kein Niederschlag) hat ein Eiskristall-
Symbol; statt des Höchstwerts steht dann der Tiefstwert, beides in Eisblau. Bei
Schnee mit Frost steht der Tiefstwert ebenfalls in Eisblau. Die Werte kommen mit
dem normalen Wetterabruf von Open-Meteo; ohne Daten sind sie simuliert.

**Hinweise im Bild für morgen** (ab etwa 13 Uhr zunehmend):

- **Regen:** eine dunkle Wolkenwand hinter den rechten Bergen, darunter ein
  Regenschleier.
- **Schnee:** helle Schneewolken über dem Kamm, Flocken über der rechten
  Bildhälfte, und die Schneegrenze an den Bergen sinkt.
- **Frost** hat bewusst keinen Hinweis im Bild, nur das Symbol.

**Sturmwarnleuchte** am Ufer der Herreninsel, wie die echten Leuchten am
Chiemsee: Vorwarnung ab Böen von 46 km/h (25 Knoten) mit 40 Blitzen pro
Minute, Sturmwarnung ab 63 km/h (34 Knoten) mit 90 pro Minute. Maßgeblich ist
die stärkste Böe der letzten Stunde und der nächsten drei Stunden.

## Wetter und Barometer

Lichtzeit holt alle 15 Minuten das echte Wetter von
[Open-Meteo](https://open-meteo.com) (kostenlos, ohne Anmeldung) und übersetzt
es ins Bild. Abgerufen wird am **Wetter-Ort** aus `config.json` (`wetter_ort`,
derzeit Moosen bei Riedering). Fehlt der Eintrag, gilt der Bild-Ort (`ort`,
Chiemsee). Wetter, Vorhersage, Schneemann, Eis und Föhn kommen vom Wetter-Ort;
Sonne, Mond, Planeten und der Titel bleiben am Chiemsee.

- **Wolken** – je mehr Bewölkung, desto mehr und größere Wolken; unter 10 % ist der Himmel ganz klar
- **Bedeckt** (ab etwa 85 % Bewölkung) – geschlossene graue Decke, gedämpfte Farben, statt der Sonnenscheibe nur ein schwacher heller Fleck; der Strahl bleibt weich, aber ablesbar
- **Hochnebel** (bedeckt, vor allem tiefe Wolken, Luftdruck ab etwa 1016 hPa, kein Regen) – die graue Decke liegt tief über dem See, die Berggipfel ragen oben heraus in die Sonne. Steigender Luftdruck heißt hier nicht „klarer“: Das Raster beruhigt sich dann nicht.
- **Regen** – Pixelregen und Regenschleier, Pixel „tropfen“
- **Schnee** – fallende Flocken
- **Wind** – Pixel verwehen, Böenfelder auf dem See, Schilf wiegt sich
- **Nebel, schlechte Sicht** – Pixel lösen sich auf (nur am Vormittag, bis die
  Sonne ihn auflöst). Erkannt an der Sichtweite oder am Nebel-Wettercode. Der
  Deutsche Wetterdienst liefert die Sichtweite ab Dezember 2026 nicht mehr.
  Fehlt sie, erkennt Lichtzeit Nebel an sehr feuchter Luft (ab etwa 92 %, voll
  bei 99 %), kaum Wind (unter etwa 8–15 km/h) und tiefen Wolken (ab etwa 40 %).
  Im Abgleich mit 60 Tagen echter Daten traf das 35 von 38 Nebelvormittagen.
- **Gewitter** – Glitch und Blitze. Kündigt sich ein Gewitter an, türmen sich die Wolken schon vorher auf.
- **Sturm** – ab etwa 50 km/h Wind oder Böen ab 62 km/h (Windstärke 8) fliegen die Pixel
- **Regenbogen** – bis zu 2 Stunden nach einem Regen oder bei Sonnenregen
  (leichter Regen, die Sonne kommt durch), wenn die Sonne zwischen 2° und 42°
  hoch steht und weniger als etwa 85 % bewölkt ist. Spritzt das Feuerwehrboot
  bei Sonnenschein, steht ein kleiner Regenbogen in der Fontäne.
- **Temperatur** – der See wirkt bei Kälte ganz leicht kühler, bei Wärme wärmer
- **Barometer** – der Luftdruck-Trend der letzten 3 Stunden: Steigt er, wird
  das Raster ruhiger. Fällt er, wird es leicht unruhig. Stürzt er ab (mehr als
  4 hPa in 3 Stunden), flirrt es deutlich, wie eine Sturmwarnung.

Der letzte Stand wird im Browser gespeichert. Ist kein Internet da, läuft das
Bild mit diesem Stand weiter. Ist er älter als 6 Stunden oder gibt es keinen,
zeigt Lichtzeit das eingebaute, simulierte Wetter. Das Bild ist nie leer.

Die Grenzwerte (Wind, Sturm, Bedeckt, Hochnebel, Nebel ohne Sichtweite, Barometer, Regenbogen, Föhn, See-Farbton) stehen gesammelt
oben im Abschnitt „Echtes Wetter“ in `index.html`.

## Pixel-Effekte

Das klare Bild ist der Normalfall. Harte Pixel-Effekte sind selten und kurz:

- **Starke Verpixelung** gibt es nur bei echten Extremen: Gewitter, Sturm,
  Luftdruck-Absturz, dazu Geisterstunde und Pixelsturz um Mitternacht.
- **Kleinere Effekte** (Nebel, Regen, Wind, fallender Luftdruck, Blaue Stunde,
  Unruhe vor Mitternacht, Neumond-Nacht) sind so schwach eingestellt, dass
  Landschaft und Uhr immer klar erkennbar bleiben. In der Blauen Stunde
  sortiert sich nur der Himmel, die Berge bleiben stehen.
- **Immer nur einer:** Treffen mehrere Effekte zusammen, zeigt Lichtzeit nur
  den stärksten. Liegen zwei fast gleichauf, gehen sie weich ineinander über.
- Der Nacht-Dither und das Hochfahren am Morgen gehören zum Tagesablauf und
  laufen unabhängig davon.

Im Test-Modus (`?dev=1`) steht in der Info-Zeile, welcher Effekt gerade wirkt
und welche zurückgestellt sind.

## Zwei Bildorte: Chiemsee und Höri

Lichtzeit zeigt an vier Tagen pro Woche den **Chiemsee** und an drei Tagen die **Höri**:
den Blick über den Untersee nach Steckborn in der Schweiz, vorne eine Wiese mit Hecke
und eine große Eiche.

- **Wann welcher Ort:** Jede Woche (Montag bis Sonntag) werden drei Tage für die Höri
  ausgelost. Der Zufall hängt nur von Kalenderwoche und Jahr ab, deshalb zeigt jedes Gerät
  dasselbe, auch nach dem Neuladen. Ein Tag geht von 4:00 bis 4:00, gewechselt wird nachts
  um 4 Uhr, auch ohne Neuladen. An den Festtagen (24. bis 26. Dezember, Silvester, Neujahr)
  ist immer Chiemsee, weil die Feste dort stattfinden. Feste Tage aus `config.json`
  (`feste_tage`) kommen zu den ausgelosten Tagen dazu.
- **Gleich an beiden Orten:** Fallblatt-Uhr, Tafel, 3-Tage-Vorhersage, Wetter (aus
  Moosen), Sonne und Mond, Wolkenschatten, Föhn, Alpenglühen, Advent, Schnee und
  Schneemann, Sturmwarnleuchte, Silvester.
- **Höri:** Die Eiche trägt Laub nach Jahreszeit (frisch, Sommer, Gold, braun, kahl) und
  wirft einen Schatten wie eine Sonnenuhr. Sonne und Mond verschwinden hinter der Krone.
  Auf dem See ist meist Ruhe, ab und zu kommt etwas vorbei:
  - das **Schiff der URh** (Untersee und Rhein), in der Saison (etwa 10. April bis 20. Oktober) jede Stunde von 9 bis 19 Uhr
    um :10, gerade Stunden nach Stein am Rhein (rechts), ungerade nach Konstanz (links); im
    Winter nur um 11:10 und 14:10;
  - **Segler**, je mehr Wind, desto öfter (bei Flaute, Regen oder Sturm keiner), an
    sonnigen Sommerwochenenden nachmittags auch zwei;
  - **Schwäne** (Mai bis Juli mit Küken), ein **Haubentaucher**, der abtaucht, ein
    **Ruderer** am Morgen, der **Fischer** im Morgengrauen (Montag bis Samstag) mit Möwen,
    ein **Kormoran** auf der Boje, der bei Sonne die Flügel ausbreitet;
  - am Himmel **Möwen**, im Winterhalbjahr **Wildgänse**, im Sommer abends **Schwalben**;
  - ein **Eichhörnchen** am Stamm, im Herbst fallen Eicheln.
- **Nur am Chiemsee:** Raddampfer, Eis und Eisstock, Christkindlmarkt, Kirchenglocken,
  Feuerwehrboot und Eisvogel, die Szenen zum Entdecken, die Oktober-Gespenster und das
  Pixel-Sortieren zur Blauen Stunde. Um 7 Uhr grüßt die Tafel auf der Höri mit
  `SERVUS HÖRI`.

## Dateien

- `index.html` – das Kunstwerk (eine Datei, ohne Build-Werkzeuge)
- `config.json` – Einstellungen (Ort, Orte-Wechsel, Familie, Termine, Wetter, Anzeige, Himmel, Szenen, Tafel, Christkindlmarkt)
- `README.md` – diese Anleitung
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` – damit Lichtzeit
  als App im Vollbild läuft (siehe „Als App am Muse“)

## Einstellungen ändern

Alle veränderbaren Daten stehen in `config.json`. So änderst du sie:

1. Auf GitHub die Datei `config.json` öffnen und auf das Stift-Symbol klicken.
2. Werte ändern, dann unten auf **Commit changes** klicken.
3. Nach ein bis zwei Minuten ist die Änderung online. Seite neu laden.

| Eintrag | Bedeutung |
|---|---|
| `ort` | Name und Koordinaten des Bildes. Bestimmen Sonnen- und Mondstand, Planeten und den Titel. |
| `orte` | Wechsel der Bildorte: `wechsel` (`false` = immer Chiemsee), `andere_tage_pro_woche` (Standard 3), `andere` (Liste der anderen Orte, bisher nur `"hoeri"`; bei mehreren kommen sie reihum dran), `feste_tage` (Datum `"JJJJ-MM-TT"` → Ort, z. B. `"2026-11-20": "hoeri"`; zusätzlich zu den ausgelosten Tagen). Unbekannte Namen werden ignoriert und in der Info-Zeile gemeldet. |
| `wetter_ort` | Name und Koordinaten (`breite`, `laenge`) für das echte Wetter, die Vorhersage, Schneemann, Eis und Föhn. Fehlt der Eintrag, gilt `ort`. Es braucht beide Koordinaten, sonst gilt ebenfalls `ort`. |
| `familie` | Die drei Sterne. Die ersten beiden rücken am Hochzeitstag zusammen. Der dritte ist der kleine Stern: Mit `geburtsjahr` wächst er bis zum 18. Geburtstag. Am Geburtstag leuchtet der Stern golden. |
| `hochzeitstag` | An diesem Tag leuchten die ersten beiden Sterne golden. |
| `feuerwehrboot` | Zeitfenster (`von`, `bis`) und Dauer in `minuten`. Die genaue Uhrzeit wird jeden Tag neu ausgelost. |
| `eisvogel` | Wie oft am Tag (`pro_tag`, zwischen 7 und 19 Uhr) und wie lange (`minuten`). |
| `wetter` | `echt`: echtes Wetter an (`true`) oder aus (`false`). `aktualisieren_minuten`: wie oft das Wetter abgerufen wird (mindestens 5). |
| `anzeige` | Rastergröße, Bildrate und interne Auflösung, siehe unten. `"auto"` passt sich dem Bildschirm an. |
| `astro` | Schalter für die Himmelselemente: `planeten`, `mond_zeichen`, `kamm_punkte` (je `true` oder `false`; Kamm-Punkte sind aus). |
| `tafel` | Anzeigetafel: `an` (Wörter überhaupt), `stunden_wort` (Wort zur vollen Stunde), `rituale` (Uhrzeit → Wort, z. B. `"07:00": "SERVUS"`, zwei Zeilen mit `\|`). |
| `markt` | Christkindlmarkt: `an`, `termine` (`"advent"` = alle Adventswochenenden, oder eine Liste wie `["11-28", "11-29"]`), `von`, `bis` (`"HH:MM"`). |
| `astro_punkte` | Die Lichtpunkte auf dem Bergkamm, siehe „Himmel“. |
| `entdecken` | Die kleinen Szenen (siehe „Entdecken“) an (`true`) oder aus (`false`). |

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
als etwa 25 pro Sekunde, geht sie eine Stufe weiter: vom feinsten Raster auf
das zweitfeinste, dann **Szene halb** (die Landschaft wird auf zwei Bilder
verteilt gemalt, das Aussehen bleibt gleich; Uhr, Pixel-Effekte und Feuerwerk
laufen weiter mit voller Bildrate), danach auf gröbere Raster. Zurück geht es
erst nach dem Neuladen (spätestens um 4:00 Uhr). Feste Zahlen schalten die
Automatik fürs Raster ab.

**Grafikeinheit:** Die Endfarbe jeder Rasterzelle rechnet die Grafikeinheit
(WebGL2), das ist auf schwachen Geräten viel schneller. Die gemalte Landschaft
wird *asynchron* ausgelesen: Der Prozessor wartet nicht mehr auf die
Grafikeinheit, sondern nimmt das Ergebnis ein Bild später (33 ms, unsichtbar).
Genau dieses Warten hatte den Muse ausgebremst.

**Uhr und Zusätze:** Die Fallblatt-Uhr, die Vorhersage und die Advents- und
Winterbilder werden nicht in jedem Bild neu gemalt, sondern in eigene
Zwischenbilder, die nur jedes zweite bis sechste Bild erneuert werden. Klappt
eine Ziffer um, wird jedes Bild neu gemalt, damit das Umklappen flüssig bleibt. Grafikchips rechnen mit
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
| `lesen=cpu` | Szene über den Prozessor auslesen (`lesen=webgl` = über die Grafikeinheit, aber mit Warten; `lesen=auto` = beide messen). Standard: asynchron über die Grafikeinheit, ohne Warten. |
| `szene=halb` | Szene immer auf zwei Bilder verteilen (`szene=voll` = nie, `szene=auto` = die Automatik entscheidet, Standard) |

Mit `?dev=1` zeigt die Seite oben rechts, wie viele Bilder pro Sekunde
tatsächlich gezeichnet werden, wie viele Millisekunden jeder Teil braucht
(Szene, Auslesen, Zellen, Farben, Rest), welches Raster aktiv ist, ob die
Grafikeinheit rechnet, ob die Szene halb gemalt wird und mit welcher Auflösung
der Browser des Geräts arbeitet.

## Entdecken

Eine Schicht winziger Szenen im Pixelstil, damit man bei jedem Blick etwas
Kleines findet:

| Tageszeit | Szenen |
|---|---|
| Morgen (Dämmerung bis 10 Uhr) | Angler im Schilf, Graureiher im Flachwasser (fliegt ab und zu auf), Ruderboot im Nebel |
| Tag | Flugzeug mit Kondensstreifen, Stand-up-Paddler (Mai bis September), Entenfamilie (April bis Juni mit Küken, sonst ein Entenpaar) |
| Abend (ab etwa einer Stunde vor Sonnenuntergang) | Fledermäuse in der Dämmerung (April bis Oktober), Spaziergänger mit Hund am Ufer (im Dunkeln mit Stirnlampe), Boote fahren heim |
| Nacht | Autoscheinwerfer am fernen Ufer, Satellit als wandernder Lichtpunkt (nur bei klarem Himmel), Kahn mit Laterne |

- Immer ist mindestens eine Szene zu sehen, nie mehr als zwei. Jede dauert
  3 bis 10 Minuten.
- Der Ablauf ist für jeden Tag fest, wie bei Eisvogel und Feuerwehrboot, aber
  jeden Tag anders.
- Bei Regen oder Sturm gibt es keine Paddler, Flugzeuge oder Spaziergänger.
  Dann kommt eine andere Szene dieser Tageszeit.
- Die Szenen verdecken nie den Strahl, den Dampfer oder die Uhr. Sie suchen
  sich einen Platz daneben, und was in den Strahl gerät, verschwindet im
  Glitzern.
- Beim Pixelsturz um Mitternacht machen sie 85 Sekunden Pause.

Im Test-Modus (`?dev=1`) steht in der Info-Zeile, welche Szene gerade läuft und
welche als Nächstes kommt. Mit `?entdecken=0` lassen sie sich für ein Gerät
ausschalten, für alle über `"entdecken": false` in `config.json`.

## Feste

- **Gespenst (Oktober):** Jeden Abend einige Minuten zwischen 17 und 19 Uhr lugt
  ein kleines weißes Pixelgespenst hinter der Kirche der Fraueninsel hervor,
  schwebt kurz übers Wasser und versteckt sich wieder. **An Halloween** (31.10.)
  kommt es den ganzen Abend immer wieder, in der Geisterstunde danach (0–1 Uhr)
  hat es einen großen Auftritt mit kleinen Begleitern und einem „Buh“. Im
  Negativ der Geisterstunde ist es dunkel mit hellen Augen.
- **Heiligabend:** Ab der Dämmerung fällt sanfter Schnee (unabhängig vom
  Wetter), am Ufer und auf den Inseln brennen warme Fensterlichter, der Dampfer
  trägt eine Lichterkette vom Mast über den Schornstein zum anderen Mast und über der Fraueninsel
  steht ein heller Weihnachtsstern mit Schweif. Zwischen 17 und 18 Uhr fliegt das
  Christkind einmal als kleines Licht über den See. Am 25. und 26.12. geht es
  etwas ruhiger weiter.
- **Silvester und Neujahr:** Am 31.12. steigen ab der Dunkelheit Raketen am Ufer
  auf, immer mehr bis Mitternacht. Um 0 Uhr gibt es statt Pixelsturz und
  Geisterstunde ein großes Feuerwerk über die ganze Breite (30 Minuten), bis
  etwa 3 Uhr Nachzügler. Am Neujahrsmorgen liegt Rauch über dem See, am Abend
  des 1.1. steigen noch vereinzelte Raketen.

Strahl, Dampfer, Uhr und Sonne bzw. Mond bleiben dabei immer frei.

**Vorab ansehen:** Im Test-Modus springt **Seltenheit finden** zum nächsten
besonderen Moment (Seltenheiten, Gespenst, Halloween, Heiligabend, Christkind,
Silvester, Neujahrsfeuerwerk, Rauch, Regenbogen in der Feuerwehr-Fontäne).
Jeder Moment kommt einmal dran; die Uhr läuft von dort aus weiter. **Jetzt**
führt zurück.

## Advent und Winter

Vorne links ragt eine kleine Halbinsel mit Schilf in den See. Lichterkette,
Schneemann, Schnee, Angler und Spaziergänger folgen ihrer Uferlinie.

- **Adventskalender:** Am vorderen Ufer hängt eine Lichterkette mit 24 Lichtern;
  am n-ten Dezember brennen n davon. Jeden Morgen um 7:30 öffnet sich ein Türl:
  Das Motiv des Tages steigt leuchtend aus dem See, steht etwa 10 Minuten und
  zerfällt dann in Funken. 24 Motive, eins pro Tag (am 6. der Nikolaus-Stiefel,
  am 24. der große Stern).
- **Christkindlmarkt auf der Fraueninsel:** warmer Schein über der Insel,
  rot-grüne Budendächer, Lichter mit Spiegelung, Glühwein-Dampf, zwei Boote mit
  Laternen pendeln. Standard: Adventswochenenden (Sa und So), 11–20 Uhr; Termine
  und Zeiten in `config.json` (`markt`).
- **Schneemann:** Liegt am Ort echter Schnee (ab 2 cm), steht am Morgen nach dem
  ersten Schneetag ein Schneemann am Ufer, mit Schnee drumherum. Ab und zu
  zwinkert er. Bei Tauwetter (Tage über 2 °C) schmilzt er in drei Stufen:
  kleiner, Hut schief, zuletzt nur noch Hut und Karotte im Rest-Schnee.
- **Eisstockschießen:** Nach mindestens 4 Eistagen in Folge (Höchstwert
  höchstens 0 °C) friert die vordere Bucht zu, von 10 bis 16 Uhr wird rechts der
  Halbinsel auf dem Eis Eisstock geschossen, am Wochenende schauen mehr Leute zu. Nach 2 Tagen über
  3 °C taut das Eis wieder.
- **Föhn:** klare Luft, tiefblauer Himmel, die Berge wirken größer und näher,
  über ihnen stehen Föhnfische (linsenförmige Wolken). Erkannt wird Föhn, wenn
  alles zusammenkommt: Wind aus Süd bis Südwest (140–250°), Böen ab etwa 10 km/h,
  relative Feuchte höchstens etwa 75 %, mindestens 4 °C wärmer als im Mittel der
  drei Tage davor und sehr gute Sicht (ab 30 km). Ohne Sichtweite (ab Dezember
  2026) zählt stattdessen das Föhnfenster: höchstens etwa 30 % tiefe Wolken und
  kein Niederschlag. In 14 Monaten Archivdaten erkannten beide Wege genau
  dieselben Stunden. In Moosen sind das etwa 25 Föhn-Tage (89 Stunden) im Jahr,
  davon einige im Winter (im Winterhalbjahr 2025/26 wären es 5 Tage gewesen).

Alle Grenzwerte (`WARN`, `FOEHN`, `SCHNEE`, `EIS`) stehen im Abschnitt „Echtes
Wetter“ in `index.html`.

## Licht: Wolkenschatten, Alpenglühen, Erdschatten

- **Wolkenschatten:** Bei Sonne und lockerer Bewölkung (etwa 15 bis 85 %) ziehen
  weiche Schattenflecken über See und Berge. Bei Regen, Bedeckt oder Hochnebel
  gibt es keine. Mit echtem Wetter ziehen sie mit dem echten Wind (Richtung und
  grob die Stärke): Westwind schiebt sie nach links (der Blick geht nach Süden),
  Südwind zum Betrachter hin. Ohne echtes Wetter ziehen sie von links nach
  rechts. Wo sie stehen, hängt nur von der Uhrzeit ab, nicht davon, wie lange
  die Seite schon läuft.
- **Alpenglühen:** Nach Sonnenuntergang steigt eine Schattenlinie die Berge
  hinauf, die Gipfel glühen von Orange zu Rosa. Links (Osten) steigt der
  blaugraue Erdschatten auf, darüber der rosa Venusgürtel. **Morgens umgekehrt:**
  Vor Sonnenaufgang glühen zuerst die Gipfel, die Linie wandert nach unten, der
  Erdschatten sinkt rechts (Westen). Zeitraum etwa Sonnenhöhe +4° bis −9°, nur
  bei klarer Luft (nicht bei Bedeckt, Hochnebel, Gewitter oder dichtem Nebel).

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
- **Punkte auf dem Bergkamm** (seit der Fallblatt-Uhr ausgeschaltet, mit
  `"kamm_punkte": true` wieder an): Kleine Lichter für die nächsten
  Astrokartographie-Linien der Familie. Osten links, Westen rechts; je näher die
  Linie am Chiemsee verläuft, desto näher zur Bildmitte und desto heller. Nachts
  sichtbar, tagsüber kaum. In `config.json` steht pro Punkt nur Stern, Planet,
  Richtung und Entfernung in km, keine Geburtsdaten.

Im Test-Modus (`?dev=1`) nennt die Info-Zeile die sichtbaren Planeten, das
Zeichen des Mondes und die Kamm-Punkte.

### Geburtsdaten für die Kamm-Punkte nachreichen

Die Geburtsdaten kommen **nie** ins Repo. Berechnet wird lokal auf dem Mac, ins
Repo kommt nur das Ergebnis (`astro_punkte`). Das Werkzeug dafür liegt neben dem
Repo im Ordner `gazers/werkzeuge/`.

**Einfachster Weg:** In einer Claude-Code-Sitzung im Ordner `gazers` schreiben:
„Berechne die Kamm-Punkte für Lichtzeit mit `werkzeuge/linien.js`, die
Geburtsdaten schreibe ich dir gleich. Nichts davon ins Repo, danach die
Eingabedatei löschen.“ Dann Datum, Uhrzeit und Ort für Stern 1, 2 und 3 angeben.

**Selbst machen:**

1. `werkzeuge/geburtsdaten.beispiel.json` kopieren, z. B. nach
   `werkzeuge/geburtsdaten.json` (nicht in den Ordner `lichtzeit`!), und
   Datum, Uhrzeit und Zeitzone des Geburtsorts eintragen (in Deutschland
   `Europe/Berlin`, in Österreich `Europe/Vienna`).
2. Im Terminal: `cd ~/Desktop/MaxPrivat/gazers/werkzeuge` und
   `node linien.js geburtsdaten.json 6`
3. Die ausgegebene Zeile `"astro_punkte": [...]` in `config.json` auf GitHub an
   Stelle von `"astro_punkte": []` einsetzen (wie unter „Einstellungen ändern“).
4. `geburtsdaten.json` wieder löschen.

Die Uhrzeit sollte möglichst genau sein: 4 Minuten Unterschied verschieben eine
Linie um rund 75 km.

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

## Als App am Muse (echtes Vollbild)

Lichtzeit lässt sich in Chrome als App installieren. Sie startet dann ohne
Adressleiste und ohne Android-Leisten, im Hochformat, mit der Adresse
`./?raster=8`.

**Installieren:**

1. Am Muse Chrome öffnen und **https://maxslobster.github.io/lichtzeit/** aufrufen.
2. Oben rechts auf die drei Punkte **⋮** tippen.
3. **„App installieren“** wählen (heißt manchmal „Zum Startbildschirm
   hinzufügen“, dann im nächsten Fenster „Installieren“). Bestätigen.
4. Den Chrome-Tab schließen und Lichtzeit über das neue Symbol (Mond über den
   Bergen) starten.

**Updates:** Die App holt die Seite und `config.json` bei jedem Start und beim
Neuladen um 4:00 frisch vom Server. Die zuletzt geladene Fassung wird nur als
Notkopie aufgehoben, falls beim Start kein Internet da ist (z. B. wenn das WLAN
langsamer hochkommt als der Muse). Ohne Netz lädt die App um 4:00 nicht neu,
sondern versucht es alle 10 Minuten wieder.

**Andere Werte für den Muse** (z. B. Raster 6): Die Start-Adresse steht in
`manifest.webmanifest` (`start_url`). Chrome übernimmt eine Änderung von
selbst, das kann aber einen Tag oder länger dauern. Sofort wirkt es, wenn man
die App am Muse deinstalliert und neu installiert.

Das App-Symbol erzeugt `gazers/werkzeuge/app-symbol.mjs`
(`node werkzeuge/app-symbol.mjs lichtzeit`).

## Test-Parameter

Parameter werden an die Adresse angehängt: der erste mit `?`, weitere mit `&`.

| Parameter | Wirkung |
|---|---|
| `?dev=1` | Test-Modus: Steuerleiste (Tag, Uhrzeit, Zeitraffer, Mitternacht ansehen, Seltenheit finden), Info-Zeile mit Wetter, Ort (welcher, warum, und die Orte der Woche), Luftdruck-Trend und allem, was gerade aktiv ist und warum (Vorhersage, Warnleuchte, Schneemann, Eis, Föhn, Wolkenschatten, Alpenglühen, Markt, Tafel), oben rechts die Bildrate. Ein Tipp aufs Bild blendet die Steuerung aus. |
| `?t=2026-12-24T17:30` | Zeit simulieren. Die Uhr läuft ab diesem Moment weiter. Auch möglich: `?t=17:30` (heute) oder `?t=0:00:20`. |
| `?ort=hoeri` | Ort erzwingen (`chiemsee` oder `hoeri`). Ohne `?ort` zeigt `?t=` den Ort, der zu diesem Zeitpunkt dran wäre. |
| `?wind=0.9` | Höri: Windstärke für die Segler (`0` bis `1`; ab `0,15` fahren welche, je mehr, desto öfter). |
| `?raster=`, `?fps=`, `?aufloesung=`, `?gpu=`, `?lesen=` | Anzeige für dieses Gerät, siehe „Anzeige und Leistung“. |
| `?entdecken=0` | Die kleinen Szenen für dieses Gerät aus (`1` = an). |
| `?vorhersage=regen:6:2,schnee:1:-2,frost:3:-5` | Vorhersage für die nächsten drei Tage erzwingen (Name:Höchst:Tiefst; Namen `klar`, `heiter`, `wolke`, `regen`, `schnee`, `gewitter`, `frost`). Der erste Tag steuert auch die Hinweise für morgen. |
| `?warn=1` bzw. `?warn=2` | Sturmwarnleuchte: Vorwarnung bzw. Sturmwarnung (`0` = aus). |
| `?schnee=1` | Schneemann und Schnee am Ufer (`2`, `3`, `4` = die Schmelzstufen). |
| `?eis=1` | Zugefrorene Bucht, Eisstockschießen (10–16 Uhr). |
| `?foehn=1` | Föhn. |
| `?schatten=1` | Wolkenschatten erzwingen (nur bei Sonne). |
| `?glut=1` | Alpenglühen und Erdschatten erzwingen, auch wenn die Luft nicht klar ist; am besten mit `?t=` kurz vor Sonnenuntergang (abends) oder vor Sonnenaufgang (morgens). |
| `?markt=1` | Christkindlmarkt (unabhängig vom Termin). |
| `?tafel=GUAD\|NACHT` | Die Tafel zeigt dieses Wort 15 s lang (zwei Zeilen mit `\|`, Seiten mit `/`). |
| `?wetter=gewitter` | Wetter erzwingen: `gewitter`, `regen`, `nebel`, `klar`, `heiter`, `schnee`, `bedeckt`, `hochnebel`, `sturm` oder `regenbogen` (`heiter` = 32 % Wolken, mit Wolkenschatten). Gewitter, Regen und Sturm kommen mit fallendem Luftdruck. |

Beispiele:

- `https://maxslobster.github.io/lichtzeit/?dev=1`
- `https://maxslobster.github.io/lichtzeit/?t=2026-12-24T18:00&wetter=schnee`
- `https://maxslobster.github.io/lichtzeit/?t=23:58&dev=1` – zwei Minuten vor dem Pixelsturz
- `https://maxslobster.github.io/lichtzeit/?dev=1&t=2026-12-06T07:29:55` – das Türl am Nikolaustag
- `https://maxslobster.github.io/lichtzeit/?dev=1&t=2027-01-14T14:00&eis=1&schnee=1` – Eisstock und Schneemann
- `https://maxslobster.github.io/lichtzeit/?dev=1&t=11:30&schatten=1` – Wolkenschatten
- `https://maxslobster.github.io/lichtzeit/?dev=1&t=16:05&glut=1` – Alpenglühen heute Abend (Ende November; die Uhr läuft, nach etwa 50 Minuten ist es vorbei)
- `https://maxslobster.github.io/lichtzeit/?dev=1&t=2026-12-24T17:00` – Heiligabend mit Dampfer-Lichterkette
- `https://maxslobster.github.io/lichtzeit/?ort=hoeri&dev=1&t=2027-07-10T12:18` – Höri: URh-Schiff nach Stein am Rhein
- `https://maxslobster.github.io/lichtzeit/?ort=hoeri&dev=1&t=2027-07-08T15:41:20&wind=0.9` – Höri: Segler
- `https://maxslobster.github.io/lichtzeit/?ort=hoeri&dev=1&t=2027-10-12T10:35:10` – Höri: Herbstlaub, Eichhörnchen, Eicheln

## Stand

Lichtzeit ist fertig und läuft. Die Kontroll-Screenshots der ersten Abnahme
liegen lokal in `gazers/abnahme/`, die der Fallblatt-Uhr (November 2026) in
`gazers/abnahme/fallblatt/`, die von Auftrag 2 (kleinere Uhr, Halbinsel,
Raddampfer, Wolkenschatten, Alpenglühen) in `gazers/abnahme/auftrag-2/`, die von
Auftrag 3 (zweiter Ort Höri, Orte-Wechsel) in `gazers/abnahme/auftrag-3/`. Die
Stände davor sind als Git-Tags `v-vor-fallblatt`, `v-vor-auftrag-2` und `v-vor-auftrag-3` gesichert.

Seit Oktober 2026 weicht das Bild bewusst vom ursprünglichen Prototyp
`lichtzeit.html` ab: Die Pixel-Effekte sind seltener und schwächer, und es gibt
die Szenen zum Entdecken; seit November 2026 zeigt eine Fallblatt-Uhr die Zeit
statt der Pfähle. Geprüft wird das mit
einem Pixelvergleich gegen den jeweils vorherigen Stand (Werkzeuge in
`gazers/werkzeuge/tests/`).
