/* Video store application script
 * 次のような手順で実行します。
 * 1. データベースをセットアップ
 * 2. videos/videos.jsonをフェッチ
 * 3. ビデオが保存されていれば、HTMLで表示
 * 4. されていなければ、データベースに値を保存してからHTMLで表示
 */
const section = document.querySelector('section');

let db;

window.addEventListener('load', () => {
  const request = window.indexedDB.open('videos_db', 1);

  request.addEventListener('error', () => console.error('Database failed to open'));
  request.addEventListener('success', requestSuccess);
  request.addEventListener('upgradeneeded', requestUpgradeNeeded);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/leaning-frontend/js/Client-side_web_APIs/Video-store-offline/sw.js')
    .then(() => console.log('sw Registration is success'))
    .catch((err) => console.error('sw registration error: ', err));
}

// Database request success
function requestSuccess(e) {
  db = e.target.result;

  fetchVideosJson();
}

// Database needed upgrade
function requestUpgradeNeeded(e) {
  db = e.target.result;
  const objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

  objectStore.createIndex('mp4', 'mp4', { unique: false });
  objectStore.createIndex('webm', 'webm', { unique: false });
}

// fetch videos.json
async function fetchVideosJson() {
  try {
    const res = await fetch('videos/videos.json')
    const json = await res.json();
    return init(json);
  }
  catch (err) {
    console.error('videos.json, fetch probrem: ', err);
  }
}

// Video store initialize
function init(videos) {
  videos.forEach(video => {
    const transaction = db.transaction('videos_os', 'readonly');
    const objectStore = transaction.objectStore('videos_os');

    const request = objectStore.get(video.name);

    request.addEventListener('success', (e) => {
      let result = e.target.result;

      if (result) {
        displayVideo(result.mp4, result.webm, result.name);
      }
      else {
        fetchVideosData(video);
      }
    });
  });
}

// display video to HTML
function displayVideo(mp4Blob, webmBlob, title) {
  const mp4URL = URL.createObjectURL(mp4Blob);
  const webmURL = URL.createObjectURL(webmBlob);

  const myarticle = document.createElement('article');
  const myh2 = document.createElement('h2');
  const myvideo = document.createElement('video');
  const mysource1 = document.createElement('source');
  const mysource2 = document.createElement('source');

  myh2.textContent = title;
  myvideo.controls = true;
  mysource1.src = mp4URL;
  mysource1.type = 'video/mp4';
  mysource2.src = webmURL;
  mysource1.type = 'video/webm';

  myvideo.appendChild(mysource1);
  myvideo.appendChild(mysource2);
  myarticle.appendChild(myh2);
  myarticle.appendChild(myvideo);
  section.appendChild(myarticle);
}

// save item to Database and display video to HTML
function fetchVideosData(video) {
  const mp4Blob = fetchBlob(`videos/${video.name}.mp4`);
  const webmBlob = fetchBlob(`videos/${video.name}.webm`);

  Promise.all([mp4Blob, webmBlob])
    .then(values => {
      displayVideo(values[0], values[1], video.name);
      storeVideo(values[0], values[1], video.name);
    })
    .catch(err => console.error('fetch probrem: ', err));
}

function storeVideo(mp4Blob, webmBlob, name) {
  const transaction = db.transaction('videos_os', 'readwrite');
  const objectStore = transaction.objectStore('videos_os');

  const record = {
    mp4: mp4Blob,
    webm: webmBlob,
    name: name
  };
  const request = objectStore.add(record);

  request.addEventListener('success', () => console.log('video added'));
  request.addEventListener('error', (e) => console.error('video add failed: ', e.target.error));
}

// fetch mp4 and webm blob
async function fetchBlob(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return blob;
  }
  catch (err) {
    console.error(`fetch probrem: ${url} | ${err}`);
  }
}
