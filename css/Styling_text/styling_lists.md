# リストの装飾

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Styling_text/Styling_lists

このページでは、リストを装飾するCSSプロパティについて見ていきます。

## 簡単なリストの例

[こちら](https://developer.mozilla.org/ja/docs/Learn/CSS/Styling_text/Styling_lists#a_simple_list_example)を参照。見ても見なくてもどちらでも構いません。

## リストの間隔の取り扱い

リストを装飾するときは、周囲の要素と同じ垂直方向の間隔（vertical rhythm）と、お互いに同じ水平方向の間隔を維持するように調整する必要がある。

## リスト固有の装飾

`ul, ol`要素に設定できる、リスト固有のプロパティは次のとおりです。

- `list-style-type`、行頭記号の種類を設定します。例えば順序なしリストの場合は正方形や丸、順序付きリストの場合は数字、文字、ローマ字などです。
- `list-style-position`、行頭記号をリスト項目の内側に表示するか、外側の各項目の先頭より前に表示するかを設定します。
- `list-style-image`、行頭記号に画像を設定する。svgだとうまくいかない。

## 行頭記号の装飾

値は、`disc, circle, square`などがあり、そのほかにも`<custom-ident>, symbols(), <string>`なども指定できます。詳しくは[こちら](https://developer.mozilla.org/ja/docs/Web/CSS/list-style-type)をご覧ください。たくさんあります。

## 行頭記号の位置

`list-style-position`プロパティは、行頭記号をリスト項目の内側に表示するか、外側に表示するかを設定します。デフォルトは`outside`です。内側に指定する場合は`inside`です。

## 独自の行頭記号画像の使用

`list-style-image`プロパティは、行頭記号に独自の画像を設定します。しかしこのプロパティを使用するより`background`プロパティを使う方が得策です。こちらの方が自由度が高いです。

```css
/* list style image */
ul {
  list-style-image: url(star.svg);
}

/* background */

ul {
  padding-left: 2rem;
  list-style-type: none;
}

ul li {
  padding-left: 2rem;
  background-image: url(star.svg);
  background-position: 0 0;
  background-size: 1.6rem 1.6rem;
  background-repeat: no-repeat;
}
```

### list-style一括指定

`list-style`プロパティは上記のプロパティを一括して指定することができます。順番は自由です。

```css
ul {
  list-style-type: square;
  list-style-image: url(example.png);
  list-style-position: inside;
}

ul {
  list-style: square url(example.png) inside;
}
```

## リストの数え方の制御

時には、違う順番でリストを数えたい場面があると思います。例えば、1以外の数字から始めたい場合、逆から数えたい場合、1以上のステップで数えたい場合などです。

**start**

`start`属性を使用すると、1以外の数字からリストを数え始めます。

```html
<ol start="4">
  <li>four</li>
  <li>five</li>
  <li>six</li>
</ol>
```

**reversed**

`reversed`属性を使用すると、リストはカウントダウンを開始します。

```html
<ol start="4" reversed>
  <li>four</li>
  <li>three</li>
  <li>two</li>
</ol>
```

**value**

`value`属性を使用すると、リスト項目を特定の数値に設定できます。

```html
<ol>
  <li value="2">two</li>
  <li value="4">four</li>
  <li value="8">eight</li>
  <li value="16">sixteen</li>
</ol>
```

### 関連情報

CSSカウンターは、リストの数え方と装飾をカスタマイズする高度なツールを提供していますが、非常に複雑です。リストについて深く知りたい場合は下記をご覧ください

- [`@counter-style`](https://developer.mozilla.org/ja/docs/Web/CSS/@counter-style)
- [`counter-increment`](https://developer.mozilla.org/ja/docs/Web/CSS/counter-increment)
- [`counter-reset`](https://developer.mozilla.org/ja/docs/Web/CSS/counter-reset)
