const media = document.querySelector('video');
const controls = document.querySelector('.controls');
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');
const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

// setup
media.removeAttribute('controls');
controls.style.visibility = 'visible';

play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
media.addEventListener('timeupdate', setTime);

// videoの再生、一時停止を行う
function playPauseMedia() {
  if (media.paused) {
    play.setAttribute('data-icon', 'u');
    media.play();
  }
  else {
    play.setAttribute('data-icon', 'P');
    media.pause();
  }
}

// videoの停止して、最初からにする
function stopMedia() {
  media.pause();
  media.currentTime = 0;
  play.setAttribute('data-icon', 'P');
}

let intervalRwd;
let intervalFwd;

// videoの巻き戻しを行う
function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove('active');

  if (rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    media.play();
  }
  else {
    rwd.classList.add('active');
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

//  videoの早送りを行う
function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove('active');

  if (fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  }
  else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

// setIntervalに渡される巻き戻しの関数
function windBackward() {
  if (media.currentTime <= 3) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    stopMedia();
  }
  else {
    media.currentTime -= 3;
  }
}

// setIntervalに渡される早送りの関数
function windForward() {
  if (media.currentTime >= media.duration - 3) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    stopMedia();
  }
  else {
    media.currentTime += 3;
  }
}

// videoの経過時間とバーを更新、表示する
function setTime() {
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);
  let minuteValue = (minutes < 10) ? '0' + minutes : minutes;
  let secondValue = (seconds < 10) ? '0' + seconds : seconds;

  let mediaTime = minuteValue + ':' + secondValue;
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = barLength + 'px';
}
