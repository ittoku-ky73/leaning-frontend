# JavaScriptとは

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/What_is_JavaScript

このページでは、高水準からJavaScriptを見ていき、JavaScriptとはどういったものかやその用途について見ていきます。

### 高水準の定義

JavaScriptはWebページにて複雑な機能をできるようにするプログラミング言語です。更新されたコンテンツの定期表示、インタラクティブな地図、2D/3Dグラフィックのアニメーション、ビデオジュークボックスのスクロールなど、たぶんJavaScriptが組み込まれています。

ウェブ技術をケーキだとするとJavaScriptは3つ目の層で、他の2つはHTMLとCSSになります。

- HTMLは、マークアップ言語で、ウェブコンテンツに構造と意味を与えます。例えば、段落、見出し、表、画像、動画などです。
- CSSは、HTMLコンテンツに適用するスタイリング規則の言語です。例えば、背景、フォントの色、複数カラム、レイアウトなどです。
- JavaScriptは、動的にコンテンツを更新したり、マルチメディアを管理したり、その他多くのことができるスクリプト言語です。

この3層は素晴らしい構成です。簡単な例を見ていきましょう。下記では、ボタンがありそれをクリックすると、ポップアップが表示され、そこに文字を入力すると、ボタンのテキストが更新されます。

```html
<style>
  p {
    font-family: 'helvetica neue', helvetica, sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    borer: 2px solid rgba(0,0,200,0.6);
    background-color: rgba(0,0,200,0.3);
    color: rgba(0,0,200,0.6);
    box-shadow: 1px 1px 2px rgba(0,0,200,0.4);
    border-radius: 10px;
    padding: 3px 10px;
    display: inline-block;
    cursor: pointer;
  }
</style>

<p>Player 1: Chris</p>

<script>
  const para = document.querySelector('p');
  para.addEventListener('click', () => {
    let name = prompt('Enter your name');
    para.textContent = 'Player 1: ' + name;
  });
</script>
```

### 実際に何ができるのか

JavaScriptは次のことを実現する一般的なプログラミング機能で構成されています。

- 有用な値を変数に格納する。例えば、ユーザに新しい名前を問いかけて、`name`という変数に入力された新しい名前を格納するなどです。
- 連なった文字（文字列）に対する操作ができます。例えば、`Player 1:`という文字列を`name`変数につなげて新しいラベルを生成することができます。
- Webページで起きる事柄に対処できます。例えば、`click`イベントを使用して、ボタンがクリックされたことを検出し、ラベルを更新するコードなどを実行できます。
- 他にもたくさんのことができます！

さらにワクワクするのは、JavaScriptからすぐに使えるように構成されている機能です。それをApplication Programming Interface (API)と呼び、JavaScriptのコードに更なる強力な力を得ることができます。

APIがなければ難しかったり、不可能であるようなコードを、すぐに使えるブロックのように、開発者がプログラムを作ることを可能にします。家を作るときの既成の家具と同じことを、プログラミングでしてくれるのです。

自分で設計し、使用する木材を剪定し、正しい形で切り出して、正しいサイズのネジを見つけて、自分で組み立てるよりも、すでに切り出されたボードとネジを使って本棚を組み立てるだけの方がずっと簡単です。

APIには大まかに2種類に分けられます。

**ブラウザAPI**

ウェブブラウザに組み込まれており、コンピュータを取り巻く環境からデータを取り出したり、複雑で便利なことをしてくれます。例えば、

- DOM (Document Object Model) APIは、HTMLとCSSの操作を可能とします。HTMLを生成、削除、変更など、動的にページの見た目を変更することが可能です。
- Geolocation APIは、地理的な情報を取得します。これはGoogle Mapであなたの所在地を見つけて地図上にプロットする場合に使用されます。
- Canvas, WebGLは、2D/3Dグラフィックでのアニメーションを可能とします。[experiments with google](https://experiments.withgoogle.com/search?q=WebGL)で実際に見ることができます。
- 音声、動画のAPIは、例えば`HTMLMediaElement, WebRTC`などの機能は、音声、動画をWebページで再生することや、ウェブカメラの動画を撮って他の人のコンピュータで流すといった、マルチメディア的なこともできます。

**サードパーティAPI**

ブラウザに組み込まれていないAPI。そしてウェブ上からそのコードと情報を探さなければいけない。例えば、

- [Twitter API](https://developer.twitter.com/en/docs)は、ウェブサイトに最新のツイートを表示させることができます。
- [Google Map API](https://developers.google.com/maps/)は、ウェブサイトに専用の地図を埋め込み、付加機能をつけることができます。

## JavaScriptは何をするのか

JavaScriptのごく一般的な用途は、DOMを使用してHTML, CSSを変更し、ユーザーインターフェイスを更新することです。

また、ウェブドキュメント上のコードは通常、ページ上に現れる順序で読み込まれて実行されます。もしJavaScriptがロードされ、影響を受けるHTML, CSSがロードされる前に実行すると、エラーが発生する可能性があります。回避策については、このページの後半で説明します。

### ブラウザのセキュリティ

ブラウザのタブは、コードを実行するための入れ物（実行環境）を個別に持ちます。つまり、それぞれのタブ内でコードは完全に分かれて実行されており、別のタブで動いているコードは他のタブなどに干渉されません。これは良いセキュリティ対策です。

### JavaScriptの実行順序

ブラウザがJavaScriptのブロックを見つけたとき、大抵は先頭から最後に向かって順番に実行されます。なのでコードを書くときはどの順番で実行されるか気を配らなければなりません。

### インタプリタとコンパイルコード

インタプリタは、コードが上から下に実行されて、コードの実行結果がすぐに返ってきます。ブラウザが実行する前にコードを何らかの形に変換する必要はありません。コードはプログラマに親しみやすいテキストで受け取って、直接処理されます。

コンパイル言語は、コンピュータで実行する前に他の形式に変換（コンパイル）しなければいけません。C/C++は機械語にコンパイルされてから、コンピュータで実行されます。プログラムは元のプログラムソースコードから生成されるバイナリフォーマットで実行されます。

JavaScriptは軽量なインタプリタ型プログラミング言語です。Webブラウザは元のテキストの形でJavaScriptコードを受け取り、スクリプトを実行します。

JavaScriptインタプリタは「just-in-time compiling」というテクニックを使ってパフォーマンスを向上させています。これはスクリプトが使われるときに、JavaScriptコードが速いバイナリフォーマットにコンパイルされて、可能な限り高速に実行されます。しかし、JavaScriptは事前ではなく実行時にコンパイルされるため、インタプリタ言語と考えられています。

### サーバーサイドコードとクライアントサイドコード

クライアントサイドコードは、ユーザのコンピュータ上で実行されるコードです。Webページを見ているとき、ページのクライアントサイドコードがダウンロードされて、ブラウザで実行されて表示されます。このJavaScriptモジュールのことを明示的にクライアントサイドJavaScriptと言います。

サーバーサイドコードはサーバー上で実行され、結果がブラウザにダウンロードされて表示されます。サーバーサイドの言語には、`PHP, Python, Ruby, ASP.NET, JavaScript`などがあります。JavaScriptもサーバーサイドの言語として使われます。例えばNode.js環境です。

### 動的コードと静的コード

クライアントサイドのJavaScriptと、サーバーサイドの言語を説明するのに動的という言葉を使います。これはWebページやウェブアプリが必要に応じてコンテンツを生成し、異なる状況において異なる表示ができるという能力を指しています。

サーバーサイドのコードは、データベースからデータを取得して動的にコンテンツを生成します。

クライアントサイドのJavaScriptはクライアント上のブラウザでHTMLのテーブルを生成したり、そのテーブルにサーバーから指示を受け、データを追加したり、Webページ上でユーザにテーブルを表示したりするなどして、動的にコンテンツを生成します。

動的に更新されるコンテンツを含まないWebページは静的と表現されます。静的なWebページとは常に同じコンテンツを表示するページのことです。

## ページにJavaScriptを追加する方法

JavaScriptは`script`要素を使用してCSSと同じような方法で、HTMLページに適用することができます。

### 内部のJavaScript

これはHTMLドキュメントに`script`要素を追加して、その中にコードを記述する方法です。

```html
<head>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      function createParagraph() {
        let para = document.createElement('p');
        para.textContent = 'ボタンが押されました!';
        document.body.appendChild(para);
      }

      const buttons = document.querySelectorAll('button');

      for(let i = 0; i < buttons.length ; i++) {
        buttons[i].addEventListener('click', createParagraph);
      }
    });
  </script>
</head>
```

### 外部のJavaScript

これはHTMLドキュメントに`script`要素を追加して、`src`属性に読み込みたいコードのパスを記述する方法です。

```html
<script src="script.js" defer></script>
```

**インラインのJavaScriptハンドラー**

JavaScriptで関数を定義して、その関数を要素の属性に追加する方法もあります。

```html
<button onclick="createParagraph()">Please push</button>

<script>
  function createParagraph() {
    let para = document.createElement('p');
    para.textContent = 'ボタンが押されました！';
    document.body.appendChild(para);
  }
</script>
```

この方法はお勧めできません。この書き方はHTMLをJavaScriptで汚してしまう悪い書き方です。このイベントを消したいとき、めんどくさいです。

### スクリプトの読み込み方針

HTMLは上から下に向けて読み込まれます。JavaScriptでDOMを操作する場合、対象の要素が読み込まれる前だとコードは機能しません。

下記のコード例では、その問題を回避しています。`DOMContentLoaded`イベントはHTML bodyが完全に読み込まれて解析されたときに発火します。

```js
document.addEventListener("DOMContentLoaded", function() {
  ...
});
```

外部の例では、より現代的なJavaScript機能の`defer`属性を使用して問題を解決します。この属性は外部スクリプトに対してのみ機能します。

```html
<script src="script.js" defer></script>
```

この問題に対する昔ながらの解決策は、すべてのHTMLが解析された後に読み込まれるように、bodyの一番下に`script`要素を置くことでした。

この解決策の問題点は、HTML DOMが読み込まれるまでスクリプトの読み込みと解析が完全にブロックされることです。JavaScriptがたくさんある大規模なサイトでは、これは大きなパフォーマンス上の問題を引き起こす可能性があり、サイトをおそくします。

### asyncとdefer

スクリプトのブロッキングの問題を回避できるモダンな機能として`async, defer`があります。

`async`属性は、スクリプトをページのレンダリングをブロックせずにスクリプトをダウンロードし、スクリプトのダウンロードが終了すると直ちに実行します。

複数のスクリプトが特定の順序で実行されるという保証はないので、ページ内のスクリプトがお互いに独立して実行され、ページ上の他のスクリプトに依存しない場合は、`async`は積極的に使用しましょう。

以下の例では、async属性を使用しているので順序に依存していません。そしてscript2, 3.jsはjqueryに依存していると考えます。その場合、async属性を使用しているため、一番上のjqueryが読み込まれる前に下の2つのスクリプトが読み込まれるとエラーを吐きます。

```html
<script async src="js/vendor/jquery.js"></script>
<script async src="js/script2.js"></script>
<script async src="js/script3.js"></script>
```

読み込むバックグラウンドスクリプトがいくつもあって、それらをできるだけ早く実行したい場合に`async`を使用するべきです。例えば、ゲームを始めるときに必要ないくつかのロードするファイルがあるとして、とりあえずスクリプトのロードによってブロックされずに、ゲームのイントロ、タイトル、ロビーを表示したい場合などに有効です。

`defer`属性付きのスクリプトは、ページに現れた順序でスクリプトを実行し、スクリプトとコンテンツがダウンロードされるとすぐに実行します。

```html
<script defer src="js/vendor/jquery.js"></script>
<script defer src="js/script2.js"></script>
<script defer src="js/script3.js"></script>
```

上記の場合だと、jquery -> script2 -> script3の順番で読み込まれます。これはスクリプトがDOM配置に依存している場合に便利です。

まとめると、

- `async, defer`の両方とも、ページのその他の部分（DOMなど）がダウンロード中でも、ブラウザにスクリプトを別々のスレッドでダウンロードするように指示するので、HTMLページの読み込み画がブロックされることはありません。
- 依存関係なしでスクリプトを単独ですぐに実行できる場合は、`async`を使う。
- スクリプトが他のスクリプトやDOM配置に依存している場合は、`defer`を使う。

### コメント

JavaScriptのコメントは2種類あります。

```js
// こめんとだお

/*
  これもこめんと
  だお
*/
```

一般的にコメントは多い方が少ないよりも優れていますが、変数が何であるか説明するためや、非常に単純な操作を説明するために、多くのコメントを追加する場合は注意が必要です。本当は、変数名は直感的でわかりやすくすべきで、コードは読みやすく単純であるべきです。

### まとめ

JavaScriptの勉強は大変そうだ。覚えることが多そうである。
