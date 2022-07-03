# 背景と枠線

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders

このページでは、背景・枠線モジュールの機能を使ったクリエイティブな表現方法について紹介します。

## CSSによる背景の設定

`background`プロパティは一括指定プロパティです。この例では一度に多くの値を渡しているため、読みにくくなっています。

```css
.box {
  background: linear-gradient(105deg, rgba(255,255,255,.2) 39%,
              rgba(51,56,57,1) 96%) center center / 400px 200px no-repeat,
              url(big-star.png) center no-repeat, rebeccapurple;
} 
```

### 背景色

`background-color`プロパティは、要素の背景色を定義します。これはコンテンツボックス、パディングボックスの後ろに広がります。

```css
.box {
  background-color: #123456;
}
```

### 背景画像

`background-image`プロパティは、要素の後ろに画像を表示させます。要素のサイズより画像のサイズが大きければ、画像は一部だけ表示され、逆に要素のサイズの方が大きい場合、画像は要素いっぱいまで繰り返し表示されます。

```css
.box {
  background-image: url(example.jpg);
}
```

### 背景画像の繰り返しの指定

`background-repeat`プロパティは、画像の繰り返し表示の動作を制御します。値には次のようなものがあります。

- no-repeat、背景画像は繰り返しされません。
- repeat-x、水平方向に繰り返します。
- repeat-y、垂直方向に繰り返します。
- repeat、両方の方向に繰り返します（デフォルト）。

### 背景画像のサイズ指定

`background-size`プロパティは、背景内に収まるように画像のサイズを調整できます。値は`<length>, <percentage>`と、次のキーワードの値を取ることができます。

- cover、アスペクト比を維持したままボックスの領域を完全に覆うように画像の大きさを調節する。
- contain、アスペクト比を維持せず、ボックスの領域を完全に覆うように画像の大きさを調節する。

### 背景画像の位置の指定

`background-position`プロパティは、ボックス上で背景画像を表示する位置を選択できます。値は`(x y)`で取ることができます。`(0 0)`の場合は要素の一番左上が対象になります。
また`center, top, right, bottom, left`のようなキーワードを使用できます。

```css
.box {
  background-position: top center;
}
```

### グラデーション背景

`background-iamge`プロパティを使用してグラデーションを設定することもできます。詳細は[gradient](https://developer.mozilla.org/ja/docs/Web/CSS/gradient)データ型のMDNページにあります。

```css
.example-a {
  background-image: linear-gradient(
    105deg, rgba(0,249,255,1) 39%,
    rgba(51,56,57,1) 96%);
}
```

### 複数の背景画像

`background-image`プロパティは、コンマで区切ることで複数の画像を指定することもできます。`background-repeat`プロパティも同様に、複数指定された画像に合わせて値を設定することもできます。

```css
.bg-img {
  background-image: url(image1.png), url(image2.png);
  background-repeat: repeat, no-repeat;
}
```

### スクロール時の背景画像の固定

`background-attachment`プロパティは、コンテンツがスクロールするときのスクロール方法を指定することができます。

- scroll、ページ全体のスクロールに応じて要素の背景を移動します。要素のコンテンツがスクロールされた場合は、移動しません。
- fixed、要素の背景をビューポートに固定します。ページや要素のコンテンツがスクロールされても移動しません。
- local、要素の背景をその要素自身に対して固定します。要素のコンテンツをスクロールした場合、それに合わせて背景が移動します。

このプロパティはスクロールするコンテンツがある場合にのみ効果があります。

### 背景に関する指定をまとめて行う

`background`プロパティで背景に関する指定をまとめて行うことができる。

```css
.box {
  background: linear-gradient(105deg, rgba(255,255,255,.2) 39%,
              rgba(51,56,57,1) 96%) center center / 400px 200px no-repeat,
              url(big-star.png) center no-repeat, 
              rebeccapurple;
}
```

### アクセシビリティの観点での注意点

背景画像の上にテキストを置く場合は、文字が見えやすいように工夫する必要がある。
あとスクリーンリーダーは背景画像を解析できないため、画像は装飾としての役割のみを担うべきである。

### 枠線

通常、CSSで要素に枠線を追加するときは`border`プロパティを使用して幅、スタイル、色で設定します。他にもさまざまな指定方法も用意されています。

```css
.box {
  border: 1px solid black;
}

.box {
  border-top: 1px solid black;
}

.box {
  border-width: 1px;
  border-style: solid;
  border-color: black;
}

.box {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: black;
}

/*
 * スタイルには次のような値が用意されている。
 */
.box {
  border-style: solid; /* まっすぐな線 */
  border-style: dashed;/* だっだっだっだっ、みたいな線 */
  border-style: double;/* 二重線 */
  border-style: dotted;/* てんてんてんてん、みたいな線 */
}
```

### 角の丸み

`border-radius`プロパティでボックスの角の丸みを表現することができます。値は`length, percentage`を使用できます。

```css
.box {
  border-radius: 10px;
}
```

### 背景と枠線を試す

飛ばす。
