# 表のスタイリング

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Styling_tables

このページでは、HTMLテーブルの見た目を良くするためのための方法について見ていきます。

## 典型的なHTMLテーブル

下記のHTMLテーブルはイギリスの有名なパンクロックバンドについて書かれています。

```html
<table>
  <caption>A summary of the UK's most famous punk bands</caption>
  <thead>
    <tr>
      <th scope="col">Band</th>
      <th scope="col">Year formed</th>
      <th scope="col">No. of Albums</th>
      <th scope="col">Most famous song</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Buzzcocks</th>
      <td>1976</td>
      <td>9</td>
      <td>Ever fallen in love (with someone you shouldn't've)</td>
    </tr>
    <tr>
      <th scope="row">The Clash</th>
      <td>1976</td>
      <td>6</td>
      <td>London Calling</td>
    </tr>

      ... 簡潔にするためにいくつかの行を削除

    <tr>
      <th scope="row">The Stranglers</th>
      <td>1974</td>
      <td>17</td>
      <td>No More Heroes</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Total albums</th>
      <td colspan="2">77</td>
    </tr>
  </tfoot>
</table>
```

`scope, <caption>, <thead>, <tbody>`などの機能で、テーブルはうまくマークアップされ、簡単に装飾を整えられ、アクセスした空くなりました。がこの状態では見栄えが悪いです。

![table-unstyled](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables/table-unstyled.png)

## 表のスタイリング

これからHTMLテーブルの基本的なスタイルを見ていきます。

### スペーシングとレイアウト

最初にすべきことは、スペーシングとレイアウトを整理することです。

```css
/* spacing */
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid purple;
}

thead th:nth-child(1) {
  width: 30%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 35%;
}

th, td {
  padding: 20px;
}
```

- `table-layout: fixed;`は、見出しの幅に応じて列をサイズを調節し、内容を適切に処理することができるため、動作が予測しやすくなります。それに加えて`width: 100%;`とすることで、レスポンシブになります（狭い画面幅の場合はなし）。
- `border-collapse: collapse`は、境界線と境界線が交わります。指定しない場合は、交わらず、間に余白が生まれます。

### 簡単なタイプグラフィ

HTMLに[Google Fonts](https://www.google.com/fonts)で見つけたフォントを適用させます

```html
<link href='https://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>
```

そしてCSSで適用させます。`thead, tfoot`の部分です。

```css
/* typography */
html {
  font-family: 'helvetica neue', helvetica, sans-serif;
}

thead th, tfoot th {
  font-family: 'Rock Salt', cursive;
}

th {
  letter-spacing: 2px;
}

td {
  letter-spacing: 1px;
}

tbody td {
  text-align: center;
}

tfoot th {
  text-align: right;
}
```

### グラフィックと色

次のCSSを追加します。

```css
/* graphic and color */
thead, tfoot {
  background-image: url(leopardskin.jpg);
  color: white;
  text-shadow: 1px 1px 1px black;
}

thead th, tfoot th, tfoot td {
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
  border: 3px solid purple;
}
```

この2つのルールは一緒に書くことはできますが、古いブラウザで複数の背景画像と、線形グラデーションがサポートしていないことを考えて分けています。

### ゼブラストライピング

次のCSSを追加します。

```css
/* zebra stripes */

tbody tr:nth-child(odd) {
  background-color: #ff33cc;
}

tbody tr:nth-child(even) {
  background-color: #e495e4;
}

tbody tr {
  background-image: url(noise.png);
}

table {
  background-color: #ff33cc;
}
```

`tbody tr:nth-child(odd)`セレクタは、tbody trの奇数番号の子を選択します。`tbody tr:nth-child(even)`セレクタはその逆で、偶数番号の子を選択します。

### キャプションの装飾

次のCSSを追加します。

```css
/* caption */
caption {
  font-family: 'Rock Salt', cursive;
  padding: 20px;
  font-style: italic;
  caption-side: bottom;
  color: #666;
  text-align: right;
  letter-spacing: 1px;
}
```

`caption-side: bottom;`は、テーブルの下にキャプションが表示されます。

### HTMLテーブル装飾のちょっとした助言

- パーセントを使用して、デザインをレスポンシブにする
- `table-layout: fixed;`を使って、見出しの幅を設定し、大きさを制御する。
- `border-collapse: collapse;`を使って、境界線をくっつけて見た目を良くする。
- `thead, tbody, tfoot`要素を使って、表をまとめて見やすくする。
- ゼブラストライピングを使って、行を読みやすくする。
- `text-align`で、テキストをそろえて見やすくする。
