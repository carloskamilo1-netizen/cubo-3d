const NOMBRE_CACHE = 'laboratorio-3d-v1';
const ARCHIVOS_A_GUARDAR = [
  './',
  './index.html',
  './manifest.json',
  './icono-192.png',
  './icono-512.png'
];

// Al instalar, descarga y guarda una copia de todo el juego
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => cache.addAll(ARCHIVOS_A_GUARDAR))
  );
  self.skipWaiting();
});

// Limpia versiones viejas del cache si alguna vez subes una nueva version
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(nombres.filter((n) => n !== NOMBRE_CACHE).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// A partir de aqui, todo se sirve desde la copia guardada (funciona sin internet)
self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respuesta) => respuesta || fetch(evento.request))
  );
});
