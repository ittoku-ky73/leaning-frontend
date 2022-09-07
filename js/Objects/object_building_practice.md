# オブジェクト構築の練習

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Object_building_practice

このページでは、実練習を行い、独自のJavaScriptオブジェクトを作る実践をしていきます。

### ボールを弾ませよう

ここでは伝統的な「弾むボール」のデモを作って見て、JavaScriptでどれほどオブジェクトが役に立つか見ていきます。完成版は次のようなものになります。

![bouncing-balls](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice/bouncing-balls.png)

この例では画面にボールを描くのに[Canvas API](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics)を使い、画面をアニメーションさせるのに[requestAnimationFrame](https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame)を使います。他には、ボールを壁で弾ませる、衝突判定などのテクニックも見ていきます。

### 準備

ローカルに、[bouncing-balls](https://github.com/mdn/learning-area/tree/main/javascript/oojs/bouncing-balls)フォルダの、`index.html, style.css, main.js`をコピーします。

スクリプトの最初の部分を見て見ましょう。

```js
// 要素を取得
const canvas = document.querySelector('canvas');
// 描画のためのコンテキストを取得、2次元の形状を書くことが可能に
const ctx = canvas.getContext('2d');
// 定数とcanvasのサイズにブラウザのビューポートの幅と高さを代入
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// minからmaxの間の整数を返す
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

### プログラム用のボールをモデル化

ここからはボールオブジェクトについて見ていきます。

```js
/* Ballオブジェクトのプロパティについて
 * * x, ボールが画面のどこからスタートするか表す水平の座標
 * * y, ボールが画面のどこからスタートするか表す垂直の座標
 * * velX, 水平方向の速度
 * * velY, 垂直方向の速度
 * * color, 色
 * * size, サイズ
 */
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
```

### ボールを描画する

draw()をBall()のプロトタイプに追加します。

```js
/* method: Ball::draw()
 * ボールをcanvasに描画する。
 */
Ball.prototype.draw = function() {
  // canvasに形を書くと宣言する
  ctx.beginPath();
  // 形の色を指定する
  ctx.fillStyle = this.color;
  // 円を書いていく
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  // beginPath()から描き始めた線描を終了し、描いた領域をfillStyleの色で塗りつぶす
  ctx.fill();
}

// ボールを実際に描画してみる
let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
testBall.draw();
```

### ボールを更新する

update()をBall()のプロトタイプに追加して、ボールを動かしていきます。

```js
/* method: Ball::update()
 * キャンバス上でBallを動かす。もしもボールが壁まで来たら跳ね返す。
 */
Ball.prototype.update = function() {
  // right wall
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  // left wall
  if ((this.x + this.size) >= 0) {
    this.velX = -(this.velX);
  }
  // bottom wall
  if ((this.y + this.size) >= width) {
    this.velY = -(this.velY);
  }
  // top wall
  if ((this.y + this.size) >= 0) {
    this.velY = -(this.velY);
  }
  // move the ball
  this.x += this.velX;
  this.y += this.velY;
}
```

### ボールのアニメーション

キャンバスにボールを追加します。

```js
let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let x = random(0 + size, width - size);
  let y = random(0 + size, width - size);
  let velX = random(-7, 7);
  let velY = random(-7, 7);
  let color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

  balls.push(new Ball(x, y, velX, velY, color, size));
}
```

次に追加したボールをアニメーションさせていきます。

```js
// animation
function loop() {
  // canvasの背景色を指定
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  // canvasの背景色を塗っていく
  ctx.fillRect(0, 0, width, height);
  // ballsをループさせて次のフレームに備えてballオブジェクトの更新をする
  balls.forEach(ball => {
    ball.draw();
    ball.update();
  });
  // アニメーションを行う
  requestAnimationFrame(loop);
}

loop();
```

### 衝突判定を追加する

ボールに衝突判定を追加して、ボールとボールがぶつかったときの処理を書く。

```js
/* method: Ball::collisionDetect()
 * ボールとボールがぶつかったらボールの色を変える
 */
Ball.prototype.collisionDetect = function () {
  balls.forEach(ball => {
    // 比較対象がこのボール自身だったときはスルー
    if ((this === ball)) return;

    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // ボールが重なったら色を変える
    if (distance < this.size + ball.size) {
      ball.color = this.color = randomRGB();
    }
  });
}

function loop() {
  // ...
  balls.forEach(ball => {
    // ...
    ball.collisionDetect();
  }
}
```

### まとめ

ゲームプログラミングは思っていたよりも難しかった😂FPSの表示とかして見たかったけど数学の知識が必要とかで予想以上に難しいことがわかった🙃自分は数学ができないのでお手上げである😎
