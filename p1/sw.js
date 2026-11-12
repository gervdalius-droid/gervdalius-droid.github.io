// Keeps the app working offline: everything is stored on the phone after the first visit.
const CACHE="p1-sessions-0a4b551b";
const FILES=["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "vendor/three.min.js", "vendor/fflate.min.js", "vendor/FBXLoader.js", "vendor/RoomEnvironment.js", "man.js", "man_body_color.jpg", "man_body_normal.jpg", "man_head_color.jpg", "man_head_normal.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
    if(res&&(res.ok||res.type==="opaque")){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}
    return res;}).catch(()=>hit)));
});
