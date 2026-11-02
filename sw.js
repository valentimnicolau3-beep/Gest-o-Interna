const C='mg-v3',A=['./','index.html','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
if(/jsdelivr|unpkg/.test(u.host)){e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{const k=y.clone();caches.open(C).then(c=>c.put(r,k));return y})));return}
if(u.origin!==location.origin)return;
e.respondWith(fetch(r).then(x=>{const k=x.clone();caches.open(C).then(c=>c.put(r,k));return x}).catch(()=>caches.match(r)))});
