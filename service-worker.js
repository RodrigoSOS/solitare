const CACHE_NAME = "solitaire-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./assets/cards/back.png",
];

// adiciona TODAS as cartas
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A","02","03","04","05","06","07","08","09","10","J","Q","K"];

for (const s of suits) {
  for (const v of values) {
    ASSETS.push(`./cards/card_${s}_${v}.webp`);
  }
}

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
