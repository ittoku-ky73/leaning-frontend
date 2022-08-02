# 過去のレイアウト方法

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Legacy_Layout_Methods

このページでは、CSSグリッドレイアウトが登場する以前のフロートなどのレイアウト機能について見ていきます。

なぜ今、過去のレイアウトについて学ぶのか。それは古いプロジェクトに携わる場合に役に立つからです。

## グリッドレイアウト以前のレイアウトとグリッドシステム

このレッスンでは、フロートとフレックスボックスに基づいたグリッドシステムとグリッドフレームワークの仕組みについて説明します。

### 2列レイアウト

HTMLを用意します。

```html
<h1>2 column layout example</h1>
<div>
  <h2>First column</h2>
  <p>
    long paragraph ...
  </p>
</div>
<div>
  <h2>Second column</h2>
  <p>
    long paragraph ...
  </p>
</div>
```

CSSは次のとおりです。ここでは、

- Webページの幅を90%にし、残り10%余白を真ん中にするよう指示しています。
- 各コンテナの幅は48%にし、残り2%はガターのために残しています。

```css
body {
  width: 90%;
  max-width: 900px;
  margin 0 auto;
}

div:nth-of-type(1) {
  width: 48%;
  float: left;
}

div:nth-of-type(2) {
  width: 48%;
  float: right;
}
```

### 単純な過去のグリッドフレームワークを作成する

下記では、固定幅とブラウザの幅に合わせた12列からなる過去のグリッドフレームワークを見ていきます。まずは、HTMLを作成します。

```html
<div class="wrapper">
  <div class="row">
    <div class="col">1</div>
    ...
    <div class="col">12</div>
  </div>
  <div class="row">
    <div class="col span2">13</div>
    ...
    <div class="col span3">16</div>
  </div>
</div>
```

**単純な固定幅グリッド**

CSSは次のとおりです。ここでは、

- .wrapperクラスまでは、ページの調整をしています。
- .rowでは`clear`を適用すると、完全に埋める必要がなくなります。
- .colではフロートを左に設定し、その空いたところに要素をぶち込みます。
- .col.spanでは、要素の幅を拡張したりしています。

```css
* {
  box-sizing: border-box;
}

body {
  width: 980px;
  margin: 0 auto;
}

.wrapper {
  padding-right: 20px;
}

.row {
  clear: both;
}

.col {
  float: left;
  margin-left: 20px;
  width: 60px;
}

/* two column width (120px) plus one gutter width (20px) */
.col.span2 { width: 140px; }
/* two column width (180px) plus one gutter width (40px) */
.col.span3 { width: 220px; }
```

**フルードグリッド**

CSSは次のとおりです。ここでは、上のCSSとやっていることは同じですが、ここではパーセントを用いています。

```css
body {
  width: 90%;
  max-width: 980px;
  margin: 0 auto;
}

/* 20 / 960 = 0.020833333 */
.wrapper {
  padding-right: 2.08333333%;
}

/* 60 / 960 = 0.0625 */
.col {
  float: left;
  margin-left: 2.0833333%;
  width: 6.25%;
}

/* 140 / 960 = 0.145833333 */
.col.span2 { width: 14.5833333%; }

/* 180 / 960 = 0.229166666 */
.col.span2 { width: 22.9166666%; }
```

## calc()関数を使ったより簡単な計算

フルードグリッドの.col.spanのところを`calc()`関数で表現すると次のようになります。

```css
/* calculation
 * (colwidth * spanwidth) + (gatter * spanwidth)
 */

.col.span2 { width: calc((6.25%*2) + (2.0833333%*1)); }
.col.span3 { width: calc((6.25%*3) + (2.0833333%*2)); }
```

### 意味論グリッドvs意味論でないグリッド

意味論的グリッドシステムとは、いきなり値を定義するのではなく、その値になった過程までを定義する方法である。

```css
.content {
  width: calc((6.25%*8) + (2.08333333%*7));
}
```

Sassなどのプロプロセッサを使用する場合は、単純なmixinを作成してその値を挿入することもできます。

### グリッドでオフセットしたコンテナを使う

上記のグリッドは、すべてのコンテナをグリッドの左側から始めてピッタリ重ねる限り、うまく動作します。最初のコンテナの左にスペースを作りたい場合は、左のマージンのオフセットクラスを作る必要があります。

```css
.offset-by-one {
  margin-left: calc(6.25% + (2.0833333%*2));
}

.offset-by-two {
  margin-left: calc(6.25% + (2.0833333%*3));
}
```

### フロートのグリッドの制限

このようなシステムを使用するときは、合計幅を正しく加算し、行に含む要素の数に注意する必要があります。これを怠ると容易くオーバーフローします。

### フレックスボックスのグリッド

フレックスボックスでグリッドシステムを設計すると次のようになります。

```css
.row {
  display: flex;
}

.col {
  margin-left: 2.0833333%;
  margin-bottom: 1rem;
  width: 6.25%;
  flex: 1 1 auto;
}
```

.colの`flex`では、`grow`を1にし項目を大きくできるようにし、`shrink`を1にし項目を縮小できるようにし、`basis`をautoにし項目を均一に設定しています。

## サードパーティのグリッドシステム

Bootstrap, Foundationなどの人気のあるフレームワークには、グリッドシステムが含まれています。またCSSやプリプロセッサを使用して開発されたスタンドアロンのグリッドシステムもあります。

ここでは、[Skeleton](http://getskeleton.com/)という単純なCSSフレームワークについて見ていきます。またこのフレームワークは[Normalize.css](http://necolas.github.io/normalize.css/)に依存しています。

説明しようと思いましたが、公式を見た方がここで説明するよりも確実で正確なので、[そちら](http://getskeleton.com/)をご覧ください。

個人的にはSkeletonは好きではありません。少し構文が古い気がします。しかし1つのファイルで完結するのでそこは評価します。Normalize.cssは好きです:heart:
