const canvas = document.querySelector('#walking_animation');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 背景を黒に、座標原点を真ん中に指定
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0, 0, width, height);
ctx.translate(width / 2, height / 2);

// 左から右へ歩く男。一番右まで行ったら左にまた戻る。
// 画像が読み込まれたらアニメーションスタート。
function WalkingMan() {
  this.x = 0;
  this.y = 0;
  this.image = new Image();
  this.image.src = 'walk-right.png';

  this.spriteWidth = 612;
  this.spriteHeight = 148;
  this.width = this.spriteWidth / 6;
  this.height = this.spriteHeight;
  this.spriteLength = this.spriteWidth / this.width - 1;

  this.speed = 13;
  this.frame = 0;
  this.image.onload = animate;
}

/* WalkingMan::draw()
 * 歩く男を描画します。
 */
WalkingMan.prototype.draw = function () {
  ctx.fillRect(-(width / 2), -(height / 2), width, height);
  ctx.drawImage(
    this.image, // image
    this.frame * this.width, // sprite x
    this.y, // sprite y
    this.width, // sprite width
    this.height, // sprite height
    this.x, // ctx x
    -this.height / 2, // ctx y
    this.width, // ctx width
    this.height // ctx height
  );
}

/* WalkingMan::update()
 * 歩く男の値を更新しています。
 */
WalkingMan.prototype.update = function () {
  // speedループごとに画像を切り替える
  if (this.x % this.speed === 0) {
    if (this.frame === this.spriteLength) {
      this.frame = 0;
    } else {
      this.frame++;
    }
  }

  // もし、右の壁まで歩ききったら
  if (this.x > width / 2) {
    let newStartPos = -((width / 2) + this.width);
    this.x = Math.ceil(newStartPos);
  } else {
    this.x += 2;
  }
}

let walkingMan = new WalkingMan();

function animate() {
  walkingMan.draw();
  walkingMan.update();

  window.requestAnimationFrame(animate);
};
