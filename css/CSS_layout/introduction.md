# CSSレイアウト入門

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Introduction

このページでは、`display`プロパティの値のことなど、CSSレイアウトの概念について見ていきます。

CSSページレイアウト技術を使用すると、Webページに含まれる要素の位置を制御することができます。

位置を制御する基準は、通常のレイアウトフローによる初期配置、隣接する要素、親コンテナ、メインビューポート、ウィンドウの位置、などです。

**ページレイアウト技術に関するモジュール**

- 通常フロー
- `display`プロパティ
- フレックスボックス（flex）
- グリッド（grid）
- フロート（float）
- 位置指定（position）
- テーブルレイアウト
- 段組みレイアウト

どの技術もそれぞれの用途、長所、短所があり単独で使用するようには設計されていません。一つ一つの技術がどのように設計されていて、それを理解することは、それぞれのタスクに最適なレイアウト方法を判断するための基礎になるでしょう。

## 通常フロー

通常フロー（Normal flow）は、ページレイアウトの制御を何もしない場合に、ブラウザがデフォルトでHTMLページをレイアウトする方法です。

CSSで何かをレイアウトすると、その要素の通常フローから遠ざけることになります。

ページ上の多くの要素は通常フローに従ってレイアウトされます。なぜなら、多くの要素のレイアウトに1から悪戦苦闘する代わりに、あらかじめ多くのものがレイアウトされている現状で作業できるからです。

下記ではCSSで要素をどのよう配置するか変更できる方法について紹介しています。

## displayプロパティ

`display`プロパティは、CSSでページレイアウトを実現する主な方法であり、デフォルトの表示方法を変更することができます。

通常フローに属するすべての要素には`display`の値が設定されており、この値によって要素のデフォルトの振る舞いが決まります。

要素のレイアウトを検討する目的において最も重要な値は`flex, grid`の2つです。

## フレックスボックス

フレックスボックス（flexbox）は**Flexible Box Layout Module**の略称で、行または列のいずれかにものを1次元（横や縦）にレイアウトすることを容易にするように設計されています。

フレックスボックスを使うには、`display: flex;`をレイアウトしたい要素の親要素に適用し、その直接の子はすべてフレックス項目になります。

`display: flex;`を親要素に指定すると、直接の子要素は行として配置されます。

`flex-direction`プロパティは、フレックスを行や列として指定できます。

`align-items`プロパティは、項目の位置を調節することができます。

`flex`プロパティは、小要素に指定するプロパティで、値に`1`を指定するとすべての項目が画面横いっぱいまで表示されます。

```html
<style>
  .flex {
    display: flex;
    flex-direction: rows;
    align-items: top;
  }

  .flex > * {
    flex: 1;
  }
</style>

<div class="grid">
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
</div>
```

ここではあまり説明しませんが、これから勉強する予定の「フレックスボックス」で説明すると思います。

## グリッドレイアウト

フレックスボックスは1次元レイアウト（列か行）用に設計されていますが、グリッドレイアウトは2次元（列と行）用に設計されています。

`display: grid`を親要素に指定すると、直接の子要素は、グリッドを操作することができます。

`grid-template-rows, grid-template-columns`プロパティは、親要素に指定するプロパティで、列と行の数を指定することができます。

`grid-column, grid-row`プロパティは、子要素に指定するプロパティで、「列、行」の「開始、終了ライン」を設定することができます。

```html
<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px;
    grid-gap: 10px;
  }

  .box1 {
    grid-column: 2 / 4;
    grid-row: 1;
  }

  .box2 {
    grid-column: 1;
    grid-row: 1 / 3;
  }

  .box3 {
    grid-row: 2;
    grid-column: 3;
  }
</style>

<div class="grid">
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
</div>
```

ここではあまり説明しませんが、これから勉強する予定の「グリッドレイアウト」で説明すると思います。

## フロート

`float`プロパティを指定すると、要素が浮動します。値は4つあります。

- `left`、左に浮かべる。
- `right`、右に浮かべる。
- `none`、浮動しない、デフォルト。
- `inherit`、`float`プロパティが親要素から継承される。

```html
<style>
  .float {
    float: left;
    width: 150px;
    height: 150px;
    margin-right: 30px;
  }
</style>

<div>
  <h1>Float Example</h1>
  <div class="float">Float</div>
  <p>
    hoge bar baz ....
    ...
    ...
    ...
  </p>
</div>
```

## 位置指定

位置指定（position）を使用すると、通常フローの配置から別の配置に移動することができます。

位置指定はメインページのレイアウトを作成するための方法ではなく、ページ上の特定の項目の位置を管理、微調整することを目的としています。

**5種類の位置指定**

- 静的位置指定（Static positioning）、すべての要素のデフォルト。
- 相対位置指定（Relative positioning）、通常フローの位置を軸にして位置を指定します。
- 絶対位置指定（Absolute positioning）、Webページの左上を軸にして位置を指定します。
- 固定位置指定（Fixed positioning）、ブラウザのビューポートを基準にして、スクロールしても常に画面上の同じ場所に留まります。
- 粘着位置指定（Sticky positioning）、ブラウザのビューポートを基準にして、スクロールしてその要素現れると、くっつくように配置します。

### 静的位置指定の例

飛ばします。これは下記で紹介する要素の配置と異なるすべてです。

### 相対位置指定

通常フローで配置された要素を軸に操作することができます。

これはアイコンをテキストラベルに合わせるためにアイコンを少し下に移動するなどのタスクで便利です。`top, left`プロパティで少しずらしています。マイナスの数字も指定できます。

```css
.relative {
  position: relative;
  top: 30px;
  left: 30px;
}
```

### 絶対位置指定

ページの一番左上を軸に操作することができます。

これの特徴は他の要素とは関係ない、存在しないかのように配置されることです。なので色々注意する必要があります。

```css
.absolute {
  position: absolute;
  top: 30px;
  left: 30px;
}
```

### 固定位置指定

ページの一番左上を軸に操作することができます。

これはWebページ（画面）に小さいシールを貼り付けられたみたいに配置されます。

`position: fixed;`で固定位置指定を適用できます。

### 粘着位置指定

ページの一番左上を軸に操作することができます。

これは静的位置指定と固定位置指定を合わせたようなもので、要素がビューポートのオフセットにぶつかるまでは静的位置指定、ぶつかると粘着位置指定が適用されます。

たまに広告などで見ることがあります。

`position: sticky;`で粘着位置指定を適用できます。

### テーブルレイアウト

昔はウェブページをテーブルのようにレイアウトしていた時がありましたが、現在はそれを利用するべきではないです。

以下はHTMLフォームを例としたテーブルレイアウトです。これはHTMLテーブルのように動作します。

`display: table`でテーブルを定義し、`table-row, table-cell`で列と行を定義しています。`display: table-caption`もその文字の通りです。

```html
<style>
  form {
    display: table;
  }

  form div {
    display: table-row;
  }

  form label,
  form input {
    display: table-cell;
  }

  form p {
    display: table-caption;
    caption-side: bottom;
  }
</style>

<form>
  <p>Form Table Layout</p>
  <div>
    <label for="fname">First name:</label>
    <input type="text" id="fname">
  </div>
  <div>
    <label for="lname">Last name:</label>
    <input type="text" id="lname">
  </div>
  <div>
    <label for="age">Age:</label>
    <input type="text" id="age">
  </div>
</form>
```

### 段組みレイアウト

段組みレイアウト（Multi-column layout module）は、外国の新聞のテキストの流れと同じように、コンテンツを列にレイアウトする方法を提供します。

使用するには次のどちらかを使用します。

- `column-count`、ブラウザにいくつの列を持たせるか指定する。
- `column-width`、ブラウザにその幅の列を指定します。
