# CSS入門

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/First_steps/Getting_started

ここでは簡単なHTMLコードにCSSを適用させ、その過程でCSSについての実用的なことを学びます。

## HTMLから始めよう

飛ばします。

## CSSを加える

飛ばします。

## HTML要素をスタイリングする

セレクタをカンマ`,`で区切ると複数のセレクタへ焦点を当てることができる。

```css
p, li {
  color: red;
}
```

## 要素の基本的な振る舞いを変える

ブラウザのデフォルトのスタイリングを変更したい場合は、HTML要素を選び、CSSルールを変更するだけで可能です。

## クラスを加える

クラスは文書内にある一部の要素のスタイルを変更する場合にとても有効です。
セレクターはピリオド`.`から始めます。

```html
<style>
  li.special {
    color: orange;
  }
</style>

<ul>
  <li>One</li>
  <li class="special">Two</li>
  <li>Three</li>
</ul>
```

## 文書内の場所に基づいてスタイリングする

li要素の入れ子にem要素がある場合にのみスタイルを有効にしたいときはディセンダント・コンビネーターと呼ばれるセレクタを使用する。

```css
li em {
  color: red;
}
```

見出しのすぐ直後にくる段落を、見出しと同じ階層レベルにしたい場合はアジャイセント・シブリング・コンビネーターを使用する。

```css
h1 + p {
  font-size: 200%;
}
```

## 状態に基づいてスタイリングする

リンクのスタイリングを例とすると、リンクされたページを開いていなかったり、開いた後だったり、マウスの矢印を置いたり（ホバー）、キーボードで選択したり、クリックしたりといったように状態をスタイリングすることもできる。

```css
a:link {
  color: pink;
}

a:visited {
  color: green;
}

a:hover {
  text-decoration: none;
}
```

CSSではリンクの下線を消すこともできるが、それはリンクであるかどうかわからなくなる。アクセシビリティには注意すること。

## セレクタとコンビネーターを組み合わせる

例

```css
article p span {}

h1+ul+p {}

body h1 + p .special {}

article a:hover {}
```

