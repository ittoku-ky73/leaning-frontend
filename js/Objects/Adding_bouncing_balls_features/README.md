# Bouncing balls game

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features
>
> 完成版：https://mdn.github.io/learning-area/javascript/oojs/assessment/

### プロジェクト概要

ダウンロードしてきたバウンシングボールのデモは面白いですが、ここではもう少しインタラクティブにするため、次のような機能を実装します。

- バウンスボールを捕まえたら食べてしまう邪悪な円をユーザ制御できる形で追加する。
- バウンスボールや邪悪な縁を継承できる`Shape()`オブジェクトを作成する。
- 残ったボールが数えられるスコアカウンタも追加する。

### 新しいオブジェクトを作成する

1. Shapeクラスを作成。コンストラクタのみ定義し、`x, y, velX, velY`プロパティを持たせる。
2. BallクラスにShapeクラスを継承させる。`super()`を使用するとよい。あとは`color, size`プロパティを定義する。
3. Ballコンストラクタにexistsという新しいプロパティを定義する。これはボールがプログラム内に存在するかどうかを追跡するために追加する。
4. BallクラスのCollisionDetect()メソッドに衝突判定の処理の機能を追加する。以下のコードを追加する。

```js
collisionDetect() {
  for (const ball of balls) {
    if (!(this === ball) && ball.exists) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        ball.color = this.color = randomRGB();
      }
    }
  }
}
```

### EvilCircleの定義

1. EvilCircleクラスを作成し、Shapeクラスを継承させます。
2. EvilCircleコンストラクタの引数には`x, y`を渡します。これは`super(x, y, 20, 20)`のようなコードで行います。
3. `color = white, size = 10`のように設定します。
4. キーイベントを作成します。

```js
window.addEventListener('keypress', e => {
  switch (e.key) {
    case 'a':
      this.x -= this.velX;
      break;
    case 'd':
      this.x += this.velX;
      break;
    case 'w':
      this.y += this.velY;
      break;
    case 's':
      this.y += this.velY;
      break;
  }
});
```

5. EvilCircleクラスに3つのメソッドを追加します。

**draw()**

`Ball.prototype.draw()`と同じくキャンバス上にオブジェクトインスタンスを描画するという目的を持ちます。またEvilcircle独自の設定は次のとおりです。

- `fillStyle, fill()`を`strokeStyle, stroke()`に変更する。
- `lineHeight = 3`に変更して線を太くします。

**checkBounds()**

邪悪な円が画面の端から出そうになったら出ないようにする機能を持ちます。`Ball.prototype.update()`の定義をもとに幾つか変更します。

- 最後の2行のボールを更新する処理を削除します。
- if文でEvilCircleが壁を突き抜けようとしたときに元の位置に戻るような処理に書き直す。

**collisionDetect()**

`Ball.prototype.collisionDetect()`メソッドをもとに幾つか変更します。

- if文でチェックするボールが自分のボールかどうかの判定を削除します。
- ぶつかったときに色が変わる処理を削除します。

### プログラムに邪悪な円を持ち込む

`loop()`関数をいくつか変更します。

- EvilCircleオブジェクトインスタンスを一度だけ実行します。
- ボールがあるときだけ`draw(), update(), collisionDetect()`が呼び出されるように制御する。
- EvilCircleインスタンスの`draw(), update(), collisionDetect()`メソッドを呼び出す。

### スコアカウンターの実装

1. HTMLのh1要素の下に、`<p>Boll count: </p>`を追加する。
2. CSSルールを追加する

```css
p {
  position: absolute;
  margin: 0;
  top: 35px;
  right: 5px;
  color: #aaa;
}
```

3. JavaScriptに次の機能を追加する。

- 段落への参照を格納する変数を作成する
- 画面上のボールの数をカウントする。
- 邪悪な円がボールを食べるとカウントを減らす処理を追加する。

以上！
