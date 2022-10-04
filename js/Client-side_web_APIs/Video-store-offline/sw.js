// Service Workerのインストール、Cacheをオープンして追加
addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('video-store')
      .then((cache) => {
        return cache.addAll([
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline',
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline/index.html',
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline/style.css',
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline/script.js'
        ])
      })
      .catch((err) => console.log('sw install error: ' + err))
  );
});

// ブラウザがフェッチした時に、Cacheの中も見るようにする。
addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => response || fetch(e.request))
      .catch((err) => console.error('sw fetch error: ' + err))
  );
});
