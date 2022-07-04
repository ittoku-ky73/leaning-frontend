# テキスト方向の操作

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Handling_different_text_directions

このページでは、書き込みモードについて紹介します。

## 書き込みモードとは

テキストの読むときの向きのこと。例えば、英語であれば「左から右」へ読みますが、アラビア語は「右から左」へ読みます。日本語も「右から左」へ読むこともあります。

`writing-mode`プロパティは、書き込みモードを操作します。値は次のようなものがあります。

- `horizontal-tb`、上から下へブロックが流れる。文字は水平に表示される。
- `vertical-rl`、右から左へブロックが流れる。文字は垂直に表示される。
- `vertical-lr`、左から右へブロックが流れる。文字は垂直に表示される。

## 書き込みモードとブロックレイアウトとインラインレイアウト

書き込みモードは、ブロック要素とインライン要素と同じような動作をします。ブロック要素の場合は上から下へ要素を配置しますが、インライン要素は左右に空いている領域があればそこに配置します。

horizontal-tbはCSSでいうブロック要素のように動作し、vertical-*ではインライン要素のように動作します。

横書きモードでの2つのdimensions

![horizontal-tb](https://mdn.mozillademos.org/files/16574/horizontal-tb.png)

縦書きモードでの2つのdimensions

![vertical](https://mdn.mozillademos.org/files/16575/vertical.png)

## 方向

書き込みモードに加えて、テキストの方向にもいろいろあります。アラビア語などは右から左に書かれています。上記はよく使うプロパティではありませんが、CSSの性質の一部として理解することは重要です。

## 論理プロパティと値

vertical-rlでwidthを指定した場合、テキストがオーバーフローすることがあります。これは縦書きモードで要素が重なるためです。
この問題を解決する方法はheightとwidthを入れ替えることです。これの簡単な実装方法はwidth, heightのような物理プロパティを、論理的なフローに関連するバージョンに置き換えることです。
横書きモードでwidthにマップされるプロパティは`inline-size`で、heightは`block-size`になるのでこれらを置き換えると良いでしょう。

```css
.box {
  inline-size: 140px;
  block-size: 140px;
  writing-mode: vertical-rl;
}
```

## 論理マージン、ボーダー、パディングのプロパティ

上記のプロパティにはマッピングがあります。`margin-top`プロパティは`margin-block-start`にマップされます。これは常にブロックディメンションの先頭のマージンを参照します。
その他にもpadding-leftの場合`padding-inline-start`にマップされ、border-bottomは`border-block-end`にマップされます。

```css
.box {
  writing-mode: horizontal-tb; /* この値を変更するとスタイルが変わる */
  inline-size: 200px;
}

.logical {
  margin-block-start: 20px;
  padding-inline-end: 2em;
  padding-block-start: 2px;
  border-block-start: 5px solid pink;
  border-inline-end: 10px dotted rebeccapurple;
  border-block-end: 1em double orange;
  border-inline-start: 1px solid black;
}

.physical {
  margin-top: 20px;
  padding-right: 2em;
  padding-top: 2px;
  border-top: 5px solid pink;
  border-right: 10px dotted rebeccapurple;
  border-bottom: 1em double orange;
  border-left: 1px solid black;
}
```

## 論理値

top, right, bottom, leftの物理値を取るプロパティには論理値（block-start, inline-start, block-end, inline-end）へのマッピングもあります。
例えば、floatプロパティにも論理値を設定することもできます。

```css
.box {
  inline-size: 200px;
  writing-mode: vertical-rl;
}

img{
  float: ;
  margin-inline-end: 10px;
  margin-block-end: 10px;
}
```

## 物理的または論理的プロパティを使うべきか

論理的プロパティは新しく実装されました。なので実装する際はブラウザサポートを確認した方が良いかもしれません。
書き込みモードを使用する場合は、積極的に論理的プロパティは使う方が良いかもしれません。
