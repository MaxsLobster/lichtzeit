// Lichtzeit als App: Dieser Service Worker sorgt nur dafür, dass Lichtzeit auch ohne Netz startet.
// Grundsatz: Seite und config.json kommen IMMER zuerst frisch vom Server (beim Server nachgefragt, nie blind aus dem Zwischenspeicher).
// Die zuletzt geladene Fassung wird nur als Notkopie aufgehoben und nur benutzt, wenn der Server nicht erreichbar ist
// (z. B. wenn der Muse schneller hochfährt als das WLAN). Alles andere (Wetter, Schriften, die Prüfung vor dem Neuladen um 4:00)
// geht unverändert ans Netz. Neue Versionen kommen deshalb genauso an wie ohne App.
const NOTKOPIE = 'lichtzeit-notkopie';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(n => n !== NOTKOPIE).map(n => caches.delete(n)))).then(() => self.clients.claim())));

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url), basis = new URL('./', self.registration.scope);
  if (u.origin !== basis.origin) return;
  const seite = r.mode === 'navigate', config = u.pathname === basis.pathname + 'config.json';
  if (!seite && !config) return;
  // Unter diesem Namen liegt die Notkopie (ohne ?raster=… usw., damit jede Adress-Variante sie findet)
  const name = seite ? basis.href : basis.href + 'config.json';
  e.respondWith(
    fetch(seite ? new Request(r, { cache: 'no-cache' }) : r)
      .then(antwort => {
        if (antwort.ok && antwort.type === 'basic') {
          const kopie = antwort.clone();
          e.waitUntil(caches.open(NOTKOPIE).then(c => c.put(name, kopie)).catch(() => {}));
        }
        return antwort;
      })
      .catch(fehler => caches.match(name).then(k => k || Promise.reject(fehler))));
});
