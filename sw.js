// Lichtzeit als App: Dieser Service Worker sorgt nur dafür, dass Lichtzeit (und die eigenen Seiten der Orte) auch ohne Netz starten.
// Grundsatz (network-first): Seiten, Skripte und config.json kommen IMMER zuerst frisch vom Server – beim Server nachgefragt, nie blind
// aus einem Zwischenspeicher, auch nicht aus dem des Browsers. Die zuletzt geladene Fassung wird nur als Notkopie aufgehoben und nur
// benutzt, wenn der Server nicht erreichbar ist (z. B. wenn der Muse schneller hochfährt als das WLAN).
// Jede Seite hat ihre eigene Notkopie unter ihrer eigenen Adresse (Lichtzeit unter ./, Simssee unter ./simssee/ …): So startet ohne Netz
// nie eine andere Seite als Lichtzeit. Seiten außerhalb von lichtzeit/ fasst dieser Service Worker nicht an.
// Wetter, Schriften und die Prüfungen vor dem Neuladen (HEAD) gehen unverändert ans Netz.
// Eine neue Fassung dieses Service Workers gilt sofort (skipWaiting und clients.claim), ohne dass der Tab geschlossen werden muss.
const NOTKOPIE = 'lichtzeit-notkopie';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(n => n !== NOTKOPIE).map(n => caches.delete(n)))).then(() => self.clients.claim())));

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || r.cache === 'only-if-cached') return;
  const u = new URL(r.url), basis = new URL('./', self.registration.scope);
  if (u.origin !== basis.origin || !u.pathname.startsWith(basis.pathname)) return;
  const pfad = u.pathname.slice(basis.pathname.length);
  // Seiten (auch index.html), Skripte, Einstellungen: beim Server nachfragen; Bilder dürfen aus dem Browser-Zwischenspeicher kommen
  const seite = r.mode === 'navigate' || pfad === '' || pfad.endsWith('/') || pfad.endsWith('.html');
  const frisch = seite || /\.(js|json|webmanifest)$/.test(pfad), bild = /\.(jpg|png)$/.test(pfad);
  if (!frisch && !bild) return;
  // Name der Notkopie: Adresse ohne ?raster=… usw. und ohne index.html, damit jede Adress-Variante dieselbe Kopie findet
  const name = basis.origin + u.pathname.replace(/index\.html$/, '');
  const anfrage = frisch && r.cache !== 'no-store' && r.cache !== 'reload' ? new Request(r, { cache: 'no-cache' }) : r;
  e.respondWith(
    fetch(anfrage)
      .then(antwort => {
        if (antwort.ok && antwort.type === 'basic') {
          const kopie = antwort.clone();
          e.waitUntil(caches.open(NOTKOPIE).then(c => c.put(name, kopie)).catch(() => {}));
        }
        return antwort;
      })
      .catch(fehler => caches.match(name).then(k => k || Promise.reject(fehler))));
});
