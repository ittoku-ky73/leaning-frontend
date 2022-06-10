# HTMLテーブルの基本

この記事ではHTMLテーブルを始めるために、行やセルなどとても基本的なところから、
見出し、複数列や行のセルの結合、スタイルを適用するためのセル列のグループ化などを扱います。

## テーブルとは何か

テーブルとは、行と列からなる構造化されたデータの集合（表形式データ）です。

テーブルを使用すると、さまざまな種類のデータ間にある種の関連性、例えば人の年齢、1日または1週間、地元のプールの予定時刻などを示す値を素早く簡単に検索できる。

1800年以降の米国国税調査文書で証明されているように、テーブルは人間社会で非常に一般的に使用されており、長い間使用されてきました。

![1800-census](https://mdn.mozillademos.org/files/14585/1800-census.jpg)

## テーブルはどのように動作するか

テーブルの特徴は厳密だと言うことです。情報は行と列ヘッダーを視覚的に関連付けることによって簡単に解釈されます。

HTMLテーブルを正しく書くことで、視覚障害者でも同様にユーザエクスペリエンスが向上します。

```html
<table>
  <tr>
    <td>&nbsp;</td>
    <td>Knocky</td>
    <td>Flor</td>
    <td>Ella</td>
    <td>Juan</td>
  </tr>
  <tr>
    <td>Breed</td>
    <td>Jack Russell</td>
    <td>Poodle</td>
    <td>Streetdog</td>
    <td>Cocker Spaniel</td>
  </tr>
  ...
</table>
```

## 表のスタイル付け

表のスタイルはCSSを使用することにより見やすくなる。

例

- [Planets data](https://mdn.github.io/learning-area/html/tables/assessment-finished/planets-data.html)

## HTMLテーブルを使用するべきでない場面

ヘッダーを含む1行、コンテンツ列を含む1行、フッターを含む1行、といったように
HTMLテーブルを使用してWebページをレイアウトしている場面があります。

これはあまり良くありません。なぜならこれは昔、ブラウザ間でのCSSサポートがひどいものだったためです。現在のCSSサポートはまともです。

**テーブルレイアウトがなぜだめなのか**

1. 視覚障害のあるユーザーのアクセシビリティを低下させる。
2. タグスープが生成される（コードの記述、保守、デバッグが困難になる）。
3. レスポンシブではない。

## Table要素

- `table`要素はテーブルを表します。
- `tr`要素は行を表します。
- `td`要素はテーブルの値を表します。
- `th`要素はテーブルのヘッダーの値を表します。太字になります。

行を追加したい場合は、tr要素を追加する。

テーブルの上部にth要素を使用するとテーブルが見やすくなる。

テーブルヘッダには`scope`属性を追加することができる（次章で解説）。

## セルを複数の行と列で使用する

セルを複数行にさせたい場合は`colspan="2"`を使用する。
また複数列にさせたい場合は`rowspan="3"`を使う。

```html
<table>
  <tr>
    <th colspan="3">Animals</th>
  </tr>
  <tr>
    <td>kirin</td>
    <td>gorila</td>
    <td>chicken</td>
  </tr>
</table>
```

## 列に共通のスタイルを提供する

`colgroup`と`col`要素を使うことにより、列にスタイルを適用させることができる。

```html
<table>
  <colgroup>
    <col>
    <col style="background-color: yellow">
  </colgroup>
  <tr>
    <th>Data 1</th>
    <th>Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td>Orange</td>
  </tr>
</table>
```
