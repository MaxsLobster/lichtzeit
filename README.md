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

## Dateien

- `index.html` – das Kunstwerk (eine Datei, ohne Build-Werkzeuge)
- `config.json` – Einstellungen (Ort, Familie, Termine, Wetter)
- `README.md` – diese Anleitung

*Wird ergänzt: wie man die Einstellungen ändert und welche Test-Parameter es gibt.*
