# サーバーからのデータ取得

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data

このページでは、Ajaxについてや、その使用方法（`XMLHttpRequest, Fetch API`）を見ていきます。

### ページの読み込み

もともとWebパージの読み込みは単純でした。ウェブサイトのデータをサーバーにリクエストすると、ページを構成するいろいろなものがダウンロードされてコンピュータに表示されます。

![traditional-loading](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data/traditional-loading.svg)

このモデルの問題は、ページの一部のみを書き換えたい場合、ページ全体を読み直さなければならないことです。これはとても無駄が多くユーザ体験が悪化します。とりわけページが多く苦複雑になるにつれてそれは現れてきます。

### Ajaxの登場

上述の問題を解決すべく、Webページから細かいデータ（HTML, XML, JSONやプレーンテキスト）をリクエストし、それを必要な時だけ表示するという技術が生まれました。これは、`XMLHttpRequest, Fetch API`によって実現されます。これらの技術は、Webページがサーバにある特定のリソースに向けてHTTPリクエストし、そのレスポンスを値として使用することができます。必要であれば返ってきたデータを表示する前に成形することができます。

> これらのテクニックはAjax（Asynchronous JavaScript and XML）と呼ばれていました。これは、`XMLHttpRequest`を使ってXMLデータを要求するものが多かったためです。今日ではそういうものばかりではありませんが結果としては同じであり、今でもその用語は使われています。

![fetch-update](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data/fetch-update.svg)

Ajaxモデルは、ブラウザにページ全体をリロードさせるのではなく、もっと賢くデータをリクエストするためにWeb APIをプロキシとして使うということもあります。

例えば、Amazonやyoutubeなどのサイトで、検索や商品のなんだかをしてページを読み込みます。その時にメインコンテンツのみを更新し、ヘッダーやフッター、ナビゲーションはそのままだと思います。

こういう設計をすることでページの更新が素早くなり、切り替わるのを待つ必要もないので、サイトが早くて反応の良いものに感じます。あとは、更新する時にダウンロードされるデータが少ないので、帯域の無駄が少なくなります。

ブロードバンドに接続されたデスクトップではさして問題ではないかもしれませんが、モバイルデバイスからや、どこでも高速インターネット接続が使えるわけではない開発途上国ではとても重要な問題です。

更なる高速化のために、サイトの中には必要なものやデータを最初にリクエストされた時にユーザのコンピュータに保存してしまい、以降の訪問では保存されたものをサーバから最新版のダウンロードさせることなく使用するものもあります。コンテンツはそれが更新された時だけサーバから再読み込みされます。

### Ajaxリクエスト

`XMLHttpRequest, Fetch`をそれぞれ使ってみましょう。これから書く例は、擬似データベースとして働きます。実際のアプリケーションでは、PHP, Python, Nodeなどのサーバサイド言語を使って、データベースから取り出したデータをリクエストする場合が多いでしょうが、ここではクライアント側のパートに集中します。

**XMLHttpRequest**

今となっては古い技術で、Microsoftによって1990年代に発明され、非常に長い間ブラウザを超えて標準化されてきました。

```js
const verseChoose = document.querySelector('select');
const poemDisplay = document.querySelector('pre');

verseChoose.addEventListener('change', function () {
  const verse = verseChoose.value;
  updateDisplay(verse);
});

// セレクタから取得した値をもとにurlを生成、そのurlからリクエストを行う
function updateDisplay(verse) {
  // example: 'Verse 1' => 'verse1.txt'
  verse = verse.replaceAll(' ', '').toLowerCase()
  let url = verse + '.txt';

  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'text';
  request.addEventListener('load', function () {
    poemDisplay.textContent = request.response;
  });
  request.send();
}

// 初期化
updateDisplay('Verse 1');
verseChoose.value = 'Verse 1';
```

### サーバからリクエストを送信

> 今どきのブラウザはXHRリクエストをローカルファイルで実行しようとしてもしません。これはセキュリティの制限によるものです。実行するには、ローカルのウェブサーバを使って実行しなければいけません。

**Fetch**

これは、今風のXHRの代替品です。ブラウザに組み込まれたAPIで、非同期HTTPリクエストをJavaScriptで、開発者や他のFetchの上に組まれたAPIから簡単に行えるようにしたものです。先ほどの例をFetchで実装してみましょう。

```js
const verseChoose = document.querySelector('select');
const poemDisplay = document.querySelector('pre');

verseChoose.addEventListener('change', function () {
  const verse = verseChoose.value;
  updateDisplay(verse);
});

// セレクタから取得した値をもとにurlを生成、そのurlからリクエストを行う
function updateDisplay(verse) {
  // example: 'Verse 1' => 'verse1.txt'
  verse = verse.replaceAll(' ', '').toLowerCase()
  let url = verse + '.txt';

  fetch(url)
    .then(response => response.text())
    .then(text => poemDisplay.textContent = text)
}

// 初期化
updateDisplay('Verse 1');
verseChoose.value = 'Verse 1';
```

fetchについて説明します。まず初めにfetchメソッドが呼ばれ引数にurlが渡されています。これはXHRの`request.open()`のようなものです。

次に`then()`メソッドがチェインされており引数にresponseが渡されています。responseには前の処理の実行結果が渡されており、その結果をテキストに変換しています。

次にまたチェインされており引数にtextが渡されています。そのテキストをpoemDisplayのテキストに置き換えています。

詳しくは、[Promise APIの使い方](https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/Asynchronous/promise-based_API.md)で説明されています。

### どちらを使うべきか

Fetchを使うべきでしょう。現在ではほとんどのブラウザでサポートされています。ですが、XHRも覚えておいても良いでしょう。完全になくなったわけではないので。

### ややこしい例題

Fetchの興味深い使い方を示す、少し難しい例題を見ていきましょう。

- [缶詰サイト](https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/)と[ソースコード](https://github.com/mdn/learning-area/tree/master/javascript/apis/fetching-data/can-store)（mdn）。

- [缶詰サイト](https://ittoku-ky73.github.io/leaning-frontend/js/Client-side_web_APIs/Can-store/)と[ソースコード](https://github.com/ittoku-ky73/leaning-frontend/tree/main/js/Client-side_web_APIs/Can-store)（ittoku-ky73）。

#### XHR版の缶詰サイト：アクティブラーニング

書いてあります。

### まとめ

XHRが1990年代からあったのは驚いた😱30年前のテクノロジーだったとは😱Fetchの方が使いやすいな🙄
