# HTMLテーブルの高度な機能とアクセシビリティ

> 参考：https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced

ここでは、キャプション（要約）、行のヘッド、本文、フッターセクションのグループ化など、
HTMLテーブルの高度な機能と、視覚障害のあるユーザーのためのアクセシビリティについて説明します。

## caption要素を使用してテーブルにキャプションを追加する

table要素内のすぐ下にcaption要素を配置することで、キャプション（説明文）をつけることができる。

```html
<table>
  <caption>テーブルについて説明するよ</caption>
  ...
</table>
```

caption要素は、このテーブルはどう言うテーブルなのか知りたい場合や、目の不自由なユーザに対して役に立ちます。
これによりセルを読み取る前キャプションによってどう言うテーブルなのか知ることができます。

## ahead, tfoot, tbody要素を使用して構造を追加する

テーブルが複雑になるにつれ有効な手段になる。これらはスタイリングとレイアウトに非常に役に立ちます。

```html
<table>
  <thead>
    ...
  </thead>
  <tbody>
    ...
  </tbody>
  <tfoot>
    ...
  </tfoot>
</table>
```

また、これらの要素は上から下へ表示するのではなく、head, body, footにふさわしい場所へ配置するところが少し特殊である。

## ネストテーブル

table要素を別のテーブル要素へネストする方法。あまりお勧めしない（非推奨）。
どうしても必要な場合のみ使おう。

```html
<table id="table1">
  <tr>
    <th>title1</th>
    <th>title2</th>
    <th>title3</th>
  </tr>
  <tr>
    <td id="nested">
      <table id="table2">
        <tr>
          <td>cell1</td>
          <td>cell2</td>
          <td>cell3</td>
        </tr>
      </table>
    </td>
    <td>cell2</td>
    <td>cell3</td>
  </tr>
  <tr>
    <td>cell4</td>
    <td>cell5</td>
    <td>cell6</td>
  </tr>
</table>
```

## 視覚障害者のための表

表によっては視覚的な関連付けを行うことができない場合があります（td要素内の値が数字の場合など）。

> **注：**[2017年のWHOのデータに](https://www.who.int/en/news-room/fact-sheets/detail/blindness-and-visual-impairment)よると、視覚障害のある人は約2億5300万人います。

## 列ヘッダーと行ヘッダーの使用

スクリーンリーダーは全てのヘッダーを選別し、関連するセルをプログラムで関連づけます。
列ヘッダーと行ヘッダーの組み合わせにより、各セルのデータが選別、解釈されるため、ユーザーは目の見えるユーザと同じようにテーブルを解釈できます。

## スコープ属性

`scope`属性は、th要素に追加して使用します。指定すると、ヘッダーであるセルをスクリーンリーダーへ正確に伝えることができます。

```html
<thead>
  <tr>
    <th scope="col">Purchase</th>
    <th scope="col">Location</th>
    <th scope="col">Date</th>
    <th scope="col">Evaluation</th>
    <th scope="col">Cost (€)</th>
  </tr>
</thead>
```

行ヘッダーを指定する場合は次のようにする

```html
<tr>
  <th scope="row">Haircut</th>
  <td>Hairdresser</td>
  <td>12/09</td>
  <td>Great idea</td>
  <td>30</td>
</tr>
```

scope属性の値には、`colgroup, rowgroup`というものもあります。これらは、複数の列、行の上にある見出しに使用されます。
正しく使用するにはth要素でマークアップする必要があります。

## idおよびheaders属性

属性を使用する代わりに、scope属性を使用して、`id`と`headers`属性でヘッダーとセルの間に関連づけを作成することもできます。

使用方法は、th要素にid属性を追加して、各要素にheaders属性を追加します。tdのheaders属性には、そのセルのヘッダーとして機能する全てのth要素のidがリストがスペースで区切られている必要があります。

```html
<thead>
  <tr>
    <th id="purchase">Purchase</th>
    <th id="location">Location</th>
    <th id="date">Date</th>
    <th id="evaluation">Evaluation</th>
    <th id="cost">Cost (€)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th id="haircut">Haircut</th>
    <td headers="location haircut">Hairdresser</td>
    <td headers="date haircut">12/09</td>
    <td headers="evaluation haircut">Great idea</td>
    <td headers="cost haircut">30</td>
  </tr>
  ...
</tbody>
```

> **注：**このメソッドは、ヘッダーとデータセルの間に非常に正確な関連付けを作成しますが、より多くのマークアップを使用し**、**エラーの余地を残しません。通常、ほとんどのテーブルではこの`scope`アプローチで十分です。