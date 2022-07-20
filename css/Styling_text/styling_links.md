# リンクの装飾

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Styling_text/Styling_links

このページでは、次のようなことについて見ていきます。

- 擬似クラスを使用してリンク状態を効果的に装飾する方法。
- ナビゲーションメニューやタブなどの一般的なインターフェイス機能で使用されるリンクの装飾方法。

## いくつかのリンクを見る

[ハイパーリンクの作成](https://github.com/ittoku703/leaning-frontend/blob/main/html/Introduction_to_HTML/creating_hyperlinks.md)に従って、リンクの装飾を見ていきます。これは見なくてもどちらでも構いません。

### リンク状態

初めに理解することはリンク状態の概念です。それは擬似クラスを使って装飾することができます。

| 状態             | 擬似クラス | 説明                                                     |
| ---------------- | ---------- | -------------------------------------------------------- |
| リンク（未訪問） | link       | デフォルト。どの状態でもないリンク。                     |
| 訪問済み         | visited    | ブラウザの履歴に存在するリンク。                         |
| ホバー           | hover      | ユーザのマウスポインタが合わさっている時のリンク。       |
| フォーカス       | focus      | TABキーやJSの操作などでフォーカスした時のリンク。        |
| アクティブ       | active     | クリックされている（アクティブ化している）状態のリンク。 |

### デフォルトの装飾

リンクのデフォルトの装飾は次のとおりです。

- 下線が引かれている。
- 未訪問の場合、テキストは青色。
- 訪問済みの場合、テキストは紫色。
- ホバーすると、マウスポインタが小さな手のアイコンに変わる。
- フォーカスすると、テキストの周りに青い境界線が出現する。
- アクティブ状態の場合、テキストは赤色。

これらの装飾は、1990年代半ばのブラウザの初期の頃とほぼ同じです。これはユーザがリンクの振る舞いを知り、予期するようになったためです。

リンクの装飾が異なると、多くの人は混乱します。これは予想される振る舞いから大きく外れてはいけないことを意味しています。少なくとも次のことをするべきです。

- リンクに下線を使用します。使いたくない場合は、リンクをハイライトすること。
- ホバー、フォーカスしたときに、何らかの方法で反応するようにし、アクティブ状態の時は少し異なる方法で反応するようにすること。

リンクの装飾は、次のCSSプロパティで変更できます。

- `color`、テキストの色。
- `cursor`、マウスポインタのスタイル。
- `outline`、テキストの周りを囲っている境界線のようなスタイル。

`outline`プロパティは、アクセシビリティを向上させるものなので、オフにする場合は慎重に検討してください。

またリンクの装飾はやりすぎないように注意しましょう。

### いくつかのリンクを装飾する

リンクのスタイルは互いに重なっているので順序が重要です。**L(link)**o**V(visited)**e **F(focus)**ears **H(hover)A(active)**teで覚えましょう。

```css
a {}

a:link {}

a:visited {}

a:focus {}

a:hover {}

a:active {}
```

### リンクにアイコンを含める

なぜリンクにアイコンを含めるのかというと、そのリンクにより多くの情報を提供するためです。例えば、内部リンクと外部リンクを差別するときに、外部リンクのみにアイコン付きのリンクにするなどです。

```css
a[href*="http"]::after {
	content: ' ';
	padding-left: 1.2rem;
	background-image: url('/test-linkicon.svg');
	background-size: 1rem 1rem;
	background-repeat: no-repeat;
}
```

### ボタンとしてのリンクの装飾

これまで説明してきたことは、他の方法でも使用することができます。例えば、「ホバー」のような状態はリンクだけでなく、他の要素でも装飾することができます。

さらに、リンクは特定の状況下ではボタンのように見え、装飾されていることがあります。これはウェブサイトのナビゲーションメニューなどによく配置されています。

```html
<style>
  ol {
    display: flex;
    gap: 1rem;
    padding: 0;
  }

  li {
    display: inline;
    list-style-type: none;
    width: calc(100% / 5);
    text-align: center;
    line-height: 3;
  }

  a {
    color: black;
    outline: none;
    text-decoration: none;
    display: block;
    border-radius: 0.5rem;
  }

  a:link {
    background-color: #999;
  }

  a:visited {
    background-color: #aaa;
  }

  a:focus {
    background-color: #bbb;
  }

  a:hover {
    background-color: #ccc;
  }

  a:active {
    background-color: #ddd;
  }
</style>

<body>
  <ul>
    <li><a href="#">hoge</a></li>
    <li><a href="#">bar</a></li>
    <li><a href="#">baz</a></li>
    <li><a href="#">asdf</a></li>
    <li><a href="#">zxcv</a></li>
  </ul>
</body>
```
