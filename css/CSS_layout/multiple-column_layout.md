# 段組みレイアウト

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Multiple-column_Layout

このページでは、新聞で見られるようなコンテンツを段にしてレイアウトする方法について見ていきます。

## 基本的な例

ここでは`multicol`と呼ばれる段組みレイアウトの使用方法を見ていきます。コードは[こちら](https://github.com/mdn/learning-area/blob/main/css/css-layout/multicol/0-starting-point.html)で入手できます。

muticolを有効にするには、`column-count, column-width`のいずれかを使用します。

`column-count`プロパティは、値の数字と同じ数の段（column）を作成します。作成した段の幅は可変です。ブラウザは格段に割り当てるためのスペースを計算します。

```css
.container {
  column-count: 3;
}
```

`column-width`プロパティは、指定したサイズでできる数の段を作成します。これは、コンテナがその幅で正確に割り切れない限り、指定した幅と正確には一致しないことを意味します。

```css
.container {
  column-width: 200px;
}
```

### 段をスタイリングする

multicolで作成された段を個別にスタイリングすることはできません。しかし段の表示方法を変更するプロパティは2つあります。

- `column-gap`、段間のギャップのサイズを変更します。値には数値を入れます。
- `column-rule`、段間に線を追加します。値には`border`プロパティと同じような値を入れます。

```css
.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid black;
}
```

### 段と断片化

段組みレイアウトのコンテンツは断片化されています。Webページを印刷するときなどに見るテキストが途中で飛ぶ現象など、ページ付きメディアでコンテンツがふるまうのと基本的に同じようにふるまいます。

つまりコンテンツが次の段にいくときに、テキストが途中で中断された状態で次の段に移動する場合があります。

このふるまいを制御するために、[CSS 断片化](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Fragmentation)のプロパティを使用します。この仕様はmulticolとページ付きメディアでのコンテンツの分割を制御するためのプロパティを提供します。

```css
.fragmentation {
  break-inside: avoid;
  page-break-inside: avoid;
}
```
