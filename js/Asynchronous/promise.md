# Promiseの使い方

> 参考：https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises

このページでは、JavaScriptにおける非同期プログラミングの1つであるPromiseについて見ていきます。

Promiseは、非同期関数によって返されるオブジェクトであり、現在の操作の状態を表します。Promiseが呼び出しもとに返された時点では、大体操作は終わっていませんが、オブジェクトには操作の最終的な成功や失敗を処理するメソッドが用意されています。

### fetch() API

コードを見ていきましょう。ここではfetch() APIを使用してHTTPリクエストを送信して、その結果を出力しています。`XMLHttpRequest`に似ていますね。

```js
const fetchURL = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json';
const fetchPromise = fetch(fetchURL);

console.log(fetchPromise); // Promise

fetchPromise.then(response => console.log(`Received response: ${response.status}`));

console.log('Started request ...');

/* console log
Promise { <state>: "pending" }
Started request…
Received response: 200
*/
```

Promiseの`then()`メソッドは、フェッチ操作が成功した場合、ハンドラを呼び出し、サーバーの応答を含む`Response`オブジェクトを渡します。

### Promiseの連鎖

`fetch API`では、Responseオブジェクトを取得したら、別の関数を呼び出して応答データを取得する必要があります。上記の場合、応答データをJSONで取得したいので`json()`メソッドを呼び出します。また`json()`も非同期であることから2つの連続する非同期関数を呼び出さなければいけません。

次の例を見て見ましょう。ここでは良い例と悪い例がもう1つの例あります。悪い例の方は前回のページで見た「コールバック地獄」と似たような感じがします。これは`then()`メソッドの正しい使い方ではありません。良い例の方は`then()`メソッドに返り値を指定して、その値を次の`then()`メソッドに渡すことで地獄を回避しています。

1番下の例は、リクエストを読み取る前にサーバーがリクエストを受け入れて処理できたことを確認する必要があります。これを行うには、応答のステータスコードをチェックし、`ok`ではない場合はエラーを投げるようにします。

```js
const fetchURL = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json';
const fetchPromise = fetch(fetchURL);

// 悪い例
fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data[0].name);
  });
});

// 良い例
fetchPromise
  .then(response => return response.json())
  .then(data => console.log(data[0].name));

// ステータスコードのチェック
fetchPromise
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data[0].name);
  });
```

### エラーのキャッチ

fetch APIはさまざまな理由からエラーをスローする可能性があり（例えば、ネットワーク接続がなかったり、URLが間違えてたりなど）、サーバーがエラーを返した場合は、fetch API自身もエラーを投げます。

このようなエラー処理をサポートするために、Promiseオブジェクトは`catch()`メソッドを提供しています。これは`then()`によく似ており、`catch()`は非同期操作が失敗した時に呼び出されます。

`catch()`は、`then()`でチェインしていった最後で使用します。

```js
const fetchURL = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json';
const fetchPromise = fetch(fetchURL);

fetchPromise
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data[0].name);
  })
  .catch(error => {
    console.error(`Could not get products: ${error}`);
  });
```

### Promiseの用語

Promiseには明確にする価値のある非常に具体的な用語がいくつかあります。

**状態**

- pending、待機状態。リクエストが成功も失敗もしていない状態。
- fulfilled、非同期関数が成功した状態。`then()`ハンドラが呼び出される。
- rejected、非同期関数が失敗した状態。`catch()`ハンドラが呼び出される。

ここで「成功」または「失敗」が何を意味するかは、API次第であることに注意してください、例えばサーバーが404（Not Found）を返した場合、成功とみなしますが、ネットワークエラーの場合はそうではありません。

`settled`という言葉を、`fulfilled, rejected`の両方をカバーするために使うこともあります。Promiseが解決した場合、または他のPromiseの状態に追従するように「`locked in`」された場合、Promiseは解決されたことになります。（よくわからん）

この用語の詳細については、[Let's talk about how to talk about promises](https://thenewtoys.dev/blog/2021/02/08/lets-talk-about-how-to-talk-about-promises/)という記事で、すばらしい説明があります。

### 複数のPromiseを組み合わせる

Promiseチェーンは、操作が複数の非同期関数で構成され、次の関数を開始する前に各関数を完了する必要がある場合に必要なものです。しかし、非同期関数呼び出しを結合するための方法がPromise APIには既にあります。

`Promise.all()`メソッドは、Promiseの配列を引数として単一のPromiseを返します。返り値は次のとおりです。

- 配列内のすべてのPromiseが成功した場合に成功します。
- 配列内のいずれかのPromiseが失敗した場合に失敗します。

```js
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then(responses => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch(error => {
    console.error(`Failed to fetch: ${error}`);
  });
```

`Promise.any()`メソッドは、`Promise.all()`と機能は同じですが、1つでも失敗すると全部失敗する点が異なります。

### 非同期で待機

`async`キーワードを使用すると、非同期のPromiseベースのコードを簡単に操作することができます。関数の先頭にasyncを追加するだけで非同期関数となります。

`await`キーワードは、非同期関数内のPromiseを返す関数の呼び出しの前で使用するもので、Promiseが解決されるまでコードがその時点で待機します。

ではfetch()の例を書き直して見ましょう。ここでは`await fetch()`を呼び出してPromiseを取得します。このコードの特徴は同期関数かのように非同期関数を書くことができる点です。`try, catch`でエラー処理をしています。

```js
const fetchURL = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json';

async function fetchProducts(url) {
  try {
    const response = await fetch(fetchURL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data[0].name);
  }
  catch(error) {
    console.error(`Could not get products: ${error}`);
  }
}

fetchProducts(fetchURL);

const promise = fetchProducts(fetchURL);
promise.then(data => console.log(data[0].name));
```

### まとめ

Promiseは、最新のJavaScriptにおける非同期プログラミングの基盤です。これらは、深くネストされたコールバックを使用せずに、非同期操作のシーケンスを簡単に表現、推論できるようにし、`try, catch`同期ステートメントと同様のエラー処理スタイルをサポートしています。

`async, await`キーワードを使用すると、一連の連続する非同期関数呼び出しから操作を簡単に作成できるため、明示的なPromiseチェーンを作成する必要がなくなり、同期コードと同じように見えるコードを記述できます。

`Prome.all()`では、複数のURLに対して非同期処理を行う際に優れています。

また、`WebRTC, Web Audio API, Media Capture, Streams`など、最新のWeb APIの多くはPromiseベースです。

非同期処理をマスターして、サイトのレスポンスをあげよう😆
