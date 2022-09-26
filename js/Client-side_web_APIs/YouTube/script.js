const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');

gapi.client.load('youtube', 'v3', onYouTubeApiLoad);

function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyAYRg_iaa0nmpA0xyiApgXofQopDV2RYnM');
  searchForm.addEventListener('submit', search);
}

function search(e) {
  e.preventDefault();

  const request = gapi.client.youtube.search.list({
    part: 'snippet',
    maxResults: 10,
    q: searchTerm.value
  });

  request.execute(onSearchResponse);
}

function onSearchResponse(response) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  // itemsには検索に引っかかった動画が入っている
  response.items.map((item, idx) => {
    displayVideo(item, idx);
  });
}

function displayVideo(item, i) {
  const vid = document.createElement('div');
  let vidId = 'vid' + i;

  vid.setAttribute('id', vidId);
  section.appendChild(vid);

  // iframeを生成
  const player = new YT.Player(vidId, {
    height: '360',
    width: '480',
    videoId: item.id.videoId,
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(e) {
  const myId = e.target.id;
  const duration = e.target.getDuration();

  // 動画が削除されている場合
  if (duration === 0) {
    section.removeChild(e.target.i);
  }
}
