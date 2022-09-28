# グラフィックの描画

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics

このページでは、SVG言語から、canvas要素へ描画するAPI（canvas API, WebGL）までのグラフィックプログラミングツールの概要や、その使い方についてみていきます。

### Webでのグラフィック

ウェブはもともと単なるテキストであり、非常に退屈でした。そこでimg要素を使った画像やSVGが導入され、そしてbackground-imageなどのCSSプロパティも導入されました。

しかしこれでも不十分で、WebにはC++、Javaなどの低レベル言語で処理されるアニメーション、ゲーム、3Dシーンなどを効果的に作成する方法がまだありませんでした。一応CSS、JavaScriptを使用してSVGをアニメーションすることはできるようになりましたが、ビットマップ画像に対してはそうもいかず、利用できるツールはかなり限られていました。

しかし、ブラウザがCanvas APIをサポートするようになったことで改善してきました。Canvas APIはAppleが2004年ごろに発明し、その後、他のブラウザもそれに続いて実装を始めました。canvas要素の機能は、2Dアニメーション、ゲーム、データビジュアライゼーションなどがあります。特に、Webプラットフォームが提供する他のAPIと組み合わせると効果的です。

2006~7年ごろ、Mozillaは実験的に3Dキャンバスの実装に取り組み始めました。これがWebGLとなり、ブラウザベンダーの間で勢いを増し、2009~10年ごろになると標準化しました。WebGLを使用すると、3Dグラフィックを作成できます。

生のWebGLコードは非常に複雑であるため、ここでは2Dキャンバスに焦点を当てていきます。しかし、WebGLライブラリを使用した簡単な3Dシーンも少し紹介します。

#### canvas要素を使う：アクティブラーニング

まずは、HTMLにcanvas要素を追加します。

```html
<canvas width="320" height="240">
  <p>Your browser doesn't support canvas. Boo hoo!</p>
</canvas>
```

#### キャンバスの作成とサイズ変更

canvas要素を少し変更します。ここではクラスを使用していますが、`id`でもいいかもしれない。

```html
<canvas class="myCanvas">
  <p>Add suitable fallback here.</p>
</canvas>
```

JavaScriptにcanvas要素の変数を作成します。そして、ビューポートのサイズを、canvas要素のサイズと、`width, height`変数に代入します。

```javascript
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
```

#### canvas要素にコンテキストを設定する

ここの例では、2Dで書いていくのでJavaScriptに以下のコードを追加します。

```javascript
const ctx = document.getContext('2d');
```

これでセットアップは完了しました。次に進む前に、canvas要素の背景を黒くしてみましょう。ここでは、fillStyleで色を指定し、fillRectで色を反映させる範囲を指定しています。引数は、`x, y, w, h`です。

```javascript
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0, 0, width, height);
```

- [fillStyle](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/fillStyle)
- [fillRect](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/fillRect)

### 2Dキャンバスの基本

すべての描画操作は、[CanvasRenderingContext2D](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D)オブジェクト（ctx）で操作します。描画する時には、座標を指定する必要があります。座標は、`x, y`で表され、左上から右下へいくにつれて、値が大きくなっていきます。

### 簡単な長方形

上記のセットアップまで進めたら、長方形を描画してみましょう。下記のコードでは、赤色の長方形を描いています。

```javascript
ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.fillRect(50, 50, 100, 150);
```

緑色の長方形を描いています。

```javascript
ctx.fillStyle = 'rgb(0, 255, 0)';
ctx.fillRect(75, 75, 100, 100);
```

黄色の長方形を描いています。

```javascript
ctx.fillStyle = 'rgba(255, 0, 255, 0.75)';
ctx.fillRect(25, 100, 175, 50);
```

### ストロークと線の幅

ここまで塗りつぶされた四角形を書いてきましたが、輪郭だけの四角形（ストローク）を書いていきます。

```javascript
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.strokeRect(25, 25, 175, 200);
```

そして、ストロークの輪郭の幅を指定します。

```javascript
ctx.fillWidth = 5;
```

### Pathの描画

長方形よりも複雑なものを書きたい場合は、パスを書く必要があります。例えるなら紙にペンで絵を描くような感じでコードを記述する必要があるということです。これに関するいくつかのメソッドとプロパティを見ていきましょう。

- `beginPath()`、ペン書きを始めます。ペンは(0, 0)から始まります。
- `moveTo()`、線を書いたりせずに、別のポイントにペンを移動させます。
- `fill()`、これまで辿ったパスを塗りつぶします。
- `stroke()`、これまで辿ったパスに沿って、ストロークを描きます。

#### 線を書く

キャンバスに正三角形を書いてみます。beginPath()で線描き開始、moveTo()でペン移動、lineTo()で線を引くという流れになります。数学は難しい。

```javascript
// 角度をラジアンに変換
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
let triHeight = 50 * Math.tan(degToRad(60));
ctx.lineTo(100, 50+triHeight);
ctx.lineTo(50, 50);
ctx.fill();
```

#### 円を書く

`arc()`メソッドを使って、キャンバスに円を書いていきます。arc()は引数に、`x、y、半径、円の開始角度、円の終了角度、円を反時計回りに書くか`の6つを取ります。

```javascript
ctx.fillStyle = 'rgb(0, 0, 255)';
ctx.beginPath();
ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
ctx.fill();
```

もう1つ別の円を書いてみましょう。これはパックマンのような形になります。

```javascript
ctx.fillStyle = 'yellow';
ctx.beginPath();
ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
ctx.lineTo(200, 106);
ctx.fill();
```

#### テキスト

あしたする。

