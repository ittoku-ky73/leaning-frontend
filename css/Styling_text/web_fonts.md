# ウェブフォント

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Styling_text/Web_fonts

このページでは、ウェブフォントの詳細、カスタムフォントの使い方について見ていきます。

## フォントファミリーの復習

`font-family`プロパティは、HTMLで適用されるフォントを指定します。左から読んで行き、使用できるフォントがあればそのフォントを使用します。

```css
p {
  font-family: Helvetica, "Trebuchet MS", Verdana, sans-serif;
}
```

また一般的にすべてのシステムで利用できる、保証できるフォントをウェブセーフフォントと言います。

## ウェブフォント

ウェブサイトにアクセスしたときにダウンロードするフォントファイルを指定できるCSSの機能です。つまり、ウェブフォントをサポートするブラウザであれば、指定したフォントをそのまま使用できることを意味します。

構文は次のとおりです。まず初めに、`@font-face`ブロックでダウンロードしたフォントファイルを指定します。そして`html`ブロックで定義したフォントを指定します。

```css
@font-face {
  font-family: "myFont";
  src: url("myFont.woff");
}

html {
  font-family: "myFont", "Bitstream Vera Serif", serif;
}
```

**ウェブフォントに関して留意すべき重要な点**

ブラウザはさまざまなフォント形式をサポートしているため、クロスブラウザをサポートするには複数のフォント形式が必要になります（しかし現在では`woff, ttf`であれば大体サポートしています）。

例えば、最近のブラウザでは`WOFF/WOFF2 (Web Open Font Format)`をサポートしていますが、古いバージョンのIEは`EOT (Embedded Open Type)`しかサポートしておらず、古いバージョンのiPhone, AndroidではSVG版のフォントが必要な時があります。

またフォントは無料ではなく代金を払わなければならない場合があります。また無料で公開されていたとしても、ライセンス条件には従わなければなりません。

## 能動的学習：ウェブフォントの例

飛ばす。

### フォントを探す

飛ばす。

### 必要なコードの生成

**カスタムフォントをCSSに適用する時の手順**

1. フォントをダウンロードします。
2. 商用やウェブプロジェクトで使用する際は、ライセンス要件をすべて満たしていることを確認します。
3. ダウンロードしたフォントの拡張子を確認し、それをサポートしているブラウザを確認します。`woff, ttf`のどちらかであれば大体いけます。

### デモでのコードの実装

飛ばす。こういうのは必要になったときに覚えた方が良い。

## オンラインフォントサービスの使用

一般的にフォントを保存して提供するもので、`@font-face`を書くことなく、単純なコードを挿入するだけでそのフォントを使用できます。例として次のサイトが挙げられます。

- [Adobe Fonts](https://fonts.adobe.com/)
- [Cloud.typography](http://www.typography.com/cloud/welcome/)
- [Google Fonts](https://www.google.com/fonts)

## @font-faceの詳細

`@font-face`ブロック内で一般的に定義されているルールについて詳しく見ていきます。これはFont Squirrelで生成された構文です。

```css
@font-face {
  font-family: 'ciclefina';
  src: url('fonts/cicle_fina-webfont.eot');
  src: url('fonts/cicle_fina-webfont.eot?#iefix')    format('embedded-opentype'),
       url('fonts/cicle_fina-webfont.woff2')         format('woff2'),
       url('fonts/cicle_fina-webfont.woff')          format('woff'),
       url('fonts/cicle_fina-webfont.ttf')           format('truetype'),
       url('fonts/cicle_fina-webfont.svg#ciclefina') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

- `font-family`、フォントとして参照したい名前を指定します。どんな名前でもいけます。
- `src`、CSSにインポートされるフォントファイルのパスと形式を指定します。複数指定することができ、多ければ対応できるブラウザが増えたり、ブラウザがフォントファイルを素早く見つけることができたりします。
- `font-weight, font-style`、フォントの太さ、斜体を指定します。

## 可変フォント

幅、太さ、スタイルごとに別のフォントファイルを用意するのではなく、書体のさまざまなバリエーションを1つのファイルに組み込むことができるフォントです。高度な内容です。詳しくは[Variable フォントガイド](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)で紹介しています。
