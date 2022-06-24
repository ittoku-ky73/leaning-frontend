# CSSの全体像

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/First_steps/How_CSS_is_structured

ここではCSSの構造について詳しく説明します。

## CSSをHTMLに適用する

文書にCSSを適用する方法として3つの方法がある

1. **外部スタイルシート**

CSSファイルを用意して文書にリンクする最も一般的で便利な方法。1つのCSSファイルを複数のWebページにリンクして、全てのWebページを同じCSSスタイルで統一することができる。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
    <!-- ここ↓ -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    Test
  </body>
</html>
```

2. **内部スタイルシート**

文書のhead要素の中にあるstyle要素の中でCSSを記述する方法。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
    <style>
      body {
        background-color: red;
      }
    </style>
  </head>
  <body>
    Test
  </body>
</html>
```

この方法は、コンテンツ管理システムを使用していて、外部のCSSファイルの変更がブロックされている場合に便利な場合がある。
デメリットは複数のページを持つサイトで、CSSを変更する場合に困難になる。

3. **インラインスタイル**

HTMLの要素にstyle属性として記述する方法。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
  </head>
  <body style="background-color: red;">
    Test
  </body>
</html>
```

この方法でのCSSの使用は、可能な限り避けてください。理由として、保守の効率性が悪い、読みにくい、などがあります。
またHTMLメールでこのスタイルが使われている場合もあります

## CSSを試してみる

飛ばす。

## セレクター

さまざまなセレクター

```css
h1,
a:link,
.manythings,
#onething,
*,
.box p,
.box p:first-child,
h1,
h2,
.intro {}
```

## 詳細度

CSS言語には、競合が発生した場合にどちらのセレクターが強いかを制御するための規則があります。これらの規則はカスケード（cascade）と詳細度（specificity）と呼ばれます。

例えば、下記の場合ではテキストは青くなります。これはカスケード規則に当たります。

```css
p {
  color: red;
}

p {
  color: blue;
}
```

また下記の場合ではテキストは赤くなります。これは詳細度が関係しています。

```css
.special-paragragh {
  color: red;
}

p {
  color: blue;
}
```

## プロパティと値　

CSSは2つの部品でできています。

- プロパティ
  - スタイルに関して変更できるなんらかの特徴を表す人が理解できる識別子です。
- 値
  - 各プロパティには値が割り当てられています。この値は、プロパティをどのようにスタイルづけするかを示します。

またプロパティと値が組み合わされている状態をCSS宣言（CSS declaration）と呼びます。
プロパティや値が不明だった場合、宣言は無効となります。

## 関数

`calc()`関数は、CSS内で簡単な数式を行うことができる関数です。
下記は、ボックス幅の90％から30px引いた値と定義されます。

```css
.box {
  width: calc(90% - 30px);
}
```

あとは`transform`プロパティの`rotate()`関数などがあります。

```css
.box {
  width: 100px;
  height: 100px;
  transform: rotate(0.8turn);
}
```

## アット規則

CSSのアット規則は、CSSが実行すること、またはそれがどのように動作するべきかの指示を提供します。
たとえば、`@import`はスタイルシートを別のCSSスタイルシートにインポートします。

```css
@import 'styles2.css';
```

`@media`はメディアクエリを作成するために使用されます。
メディアクエリとは、サイトやアプリをさまざまな引数や端末の特性に基づいて合わすことができるものです。

下記は、ブラウザのビューポートが30emよりも広い場合、背景が青くなります。

```css
@media(min-width: 30em) {
  body {
    background-color: blue;
  }
}
```

## 一括指定

`font, background, padding, border, margin`のようなプロパティは一括指定プロパティ（shorthand properties）と呼ばれています。これは一括指定プロパティが複数の値を1行で設定するからです。

```css
/*
 * この2つの定義は等価です。
 */
p {
  padding: 10px 15px 15px 5px;
}

p {
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 5px;
}
```

## コメント

どのコーディング作業でもそうですが、CSSと一緒にコメントを書くのがベストプラクティスです。
これは、後で修正や強化のために戻ってきた時に、コードがどのように動作するかを思い出すのに役立ちます。
また、他の人がコードを理解するのにも役立ちます。

CSSのコメントは`/*`で始まり`*/`で終わります。

## ホワイトスペース

ホワイトスペースとは、半角スペース、タブ、改行を意味します。ブラウザがHTMLのホワイトスペースを無視するように、ブラウザはCSSの中のホワイトスペースを無視します。
ホワイトスペースの価値は、読みやすさを向上させるためにあります。
