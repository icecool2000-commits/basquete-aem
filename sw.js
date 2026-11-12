// Cache simples: a página abre mesmo com internet fraca; os dados vêm do Firebase.
const C = "aem-v7";
const FILES = ["./", "index.html", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "logo.png", "tubarao.png", "anim/abre-0.webp", "anim/abre-1.webp", "anim/abre-2.webp", "anim/abre-3.webp", "anim/abre-4.webp", "anim/abre-5.webp", "anim/abre-6.webp", "anim/abre-7.webp", "anim/abre-8.webp", "anim/abre-9.webp", "anim/abre-10.webp", "anim/abre-11.webp", "torneio.js", "torneio-core.js", "torneio-demo.js", "exportar.js", "midias.js", "aovivo.js", "rodizio.js", "basquete.js", "estatequipe.js", "acesso.js", "torneio.css"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  // rede primeiro (sempre a versão nova), cache se estiver sem internet
  e.respondWith(fetch(e.request, { cache: "no-cache" }).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
});
