# クライアントサイドストレージ

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage

このページでは、ユーザのコンピュータ上にデータを保存する機能がどのようになっているのかという基本的な点についてみていきます。

モダンウェブブラウザでは、ユーザの許可でウェブサイトのデータをユーザのコンピュータ上に保存する機能があります。この機能により、長期間記憶のためにデータを存続させることや、オフライン利用のためにサイトや文書の保存、ユーザ独自の設定を保持することなどが可能になります。

### クライアント側での保存とは

現在の主要なモダンウェブサイトは動的で、データベースを使ってデータをサーバー上に記憶し、必要なデータを取得するためにサーバー側のコードを実行し、そのデータを静的なページ雛形に挿入し、出来上がったHTMLをクライアントに提供し、ユーザのブラウザに表示されます。

クライアント側での保存は似たように機能します。そして、クライアント上にデータを保存して必要な時にそのデータを取得してくれる、JavaScript APIから構成されています。クライアント側での保存には、以下のような用途があります。

- サイトの環境設定を個人に合わせる。
- 以前のサイト上の行動を存続させる。記憶しておく。
- サイトをより早くダウンロードできるようにする。また、ネットワーク接続なしでサイトを利用できるようにする。
- ウェブアプリケーションが生成した文書を、オフラインで利用可能にする。

クライアント側の保存とサーバ側の保存は、しばしば共に使います。たとえば、複数の音楽ファイルをダウンロードし、それらの音楽ファイルをクライアント側のデータベース内に保存し、必要に応じて再生するなどです。これにより音楽ファイルは一度だけダウンロードするだけで済みます。

> クライアント側ストレージAPIの保存できるデータ量には上限があります。詳しく知りたい場合は、[ブラウザーのストレージ制限と削除基準](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)を参照。

### クッキー：旧式

クライアント側での保存には長い歴史があります。初期の頃ではcookieを使ってきました。これは、ウェブ上で一般的に使われるクライアント側の保存の、初期の型式です。

最近では、クライアント側のデータを保存する簡単な仕組みが利用できるため、クッキーは使いません。ただし、クッキーは現在でも、ユーザの個別化、状態に関連するデータの保持、セッションID、アクセストークンなどで使用されています。

### ウェブストレージ、IndexedDB：新式

[Web Storage API](https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API)は、名前とそれに対応する値からなる小規模なデータ項目を保存したり取り出したり、とても簡潔な構文を提供しています。これは、ユーザ名、ユーザのログイン状態、画面の背景色など、単純なデータを記憶するだけの場合に有用されます。

[IndexedDB API](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API)は、複雑なデータを保存するための完全なデータベースシステムをブラウザに提供します。これは、顧客レコードの完全な集合から、音声、動画ファイルのようなデータ型まで、種々のタスクに対して使えます。

### キャッシュAPI：これから

[Cache API](https://developer.mozilla.org/ja/docs/Web/API/Cache)は、特定の要求に対するHTTP応答を記憶しておくために設計されています。ネットワークなしでサイトを利用するといったことで有用です。キャッシュは通常、[Service worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)と組み合わせて利用します。

### Web Storage API：単純なデータを保存する

ウェブストレージデータは、`sessionStorage, localStorage`の2つのオブジェクトの構造体の中に含まれています。この2つの違いは、`sessionStorage`の場合、ブラウザを閉じるとデータを失いますが、`localStorage`の場合、データを保持します。

構文は次のとおりです。

```javascript
// 値を設定
localStorage.setItem('name', 'Chris');
// 値を取得
localStorage.getItem('name'); // 'Chris'
// 値を削除
localStorage.removeItem('name');
```

### ドメインごとのストレージ

当然ですが、ブラウザにはドメインごとの別々のデータストアがあります。これによりこのドメインで保存したデータを他のドメインでは利用できないようになっています。

### 実装に近い例：Web Storage API

この例では、`name`入力フォームを用意して、その値を保存、表示するアプリです。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/tree/main/javascript/apis/client-side-storage/web-storage)
  - [ライブ](https://mdn.github.io/learning-area/javascript/apis/client-side-storage/web-storage/personal-greeting.html)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/Client-side_web_APIs/Personal-greeting)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/js/Client-side_web_APIs/Personal-greeting/)

### 複雑なデータ保存：IndexedDB API

この例では、メモ帳アプリを書いていきます。これは、`title, text`入力フォームを用意して、その値を保存、表示するアプリです。完成するとこのようになります（百聞は一見に如かず）。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/tree/main/javascript/apis/client-side-storage/indexeddb/notes)
  - [ライブ](https://mdn.github.io/learning-area/javascript/apis/client-side-storage/indexeddb/notes/)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/Client-side_web_APIs/Memo-app)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/js/Client-side_web_APIs/Web-storage/Memo-app)

### もう1つの複雑なデータ保存：IndexedDB API

この例では、動画ストアを書いていきます。これは動画をネットワークからダウンロードしてIndexedDBデータベースに保存し、video要素で表示するアプリです。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/tree/main/javascript/apis/client-side-storage/indexeddb/video-store)
  - [ライブ](https://mdn.github.io/learning-area/javascript/apis/client-side-storage/indexeddb/video-store/)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/Client-side_web_APIs/Video-store)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/js/Client-side_web_APIs/Video-store)

### オフラインでの保存

上記では、IndexedDBデータベース内に大規模なリソースを保存するアプリを作成しました。欠けていることといえば、HTML, CSS, JavaScriptファイルを、サイトにアクセスするたびにダウンロードしなければならないことです。これはネットワーク接続がない場合、サイトが動作しないということです。ここで、`Service worker, Cache API`の出番です。

`Service worker`は、特定のオリジン（ウェブサイト、ドメイン）に対して、ブラウザにアクセスした時に登録されるJavaScriptファイルのことです。登録されていれば、そのオリジンで利用可能なページを制御できます。またロードされたページとネットワークの間に位置して、オリジン宛のネットワーク要求を横取りすることにより、こうした制御が可能になります。

要求の横取りとは、例として、ネットワーク応答をオフラインに保存し、その要求にがきた場合、ネットワークの応答の代わりオフラインで保存していたネットワーク応答をすることです。これによりウェブサイトをオフラインで機能させることが可能となります。

`Cache API`は、クライアント側の保存の仕組みの1つです。他の仕組みと違う点として、HTTP応答を保存するように設計されている点です。そのため、`Service worker`と共に使うと、うまく機能します。

### サービスワーカーの例

先ほど作ったビデオストアをもとに、これをオフラインでも動作できるようにしていきます。

**サービスワーカーの登録**

`script.js`に、以下のコードを追加します。ここでは、サービスワーカーが使えるかどうか、またオリジンを登録しています。そのために次のようなメソッドを使用します。

- `Navigator`オブジェクトで`ServiceWorker`メンバーが利用可能かどうか調べています。
- [ServiceWorkerContainer.register()](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerContainer/register)で、`ServiceWorker`に`sw.js`を登録しています。

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/leaning-frontend/js/Client-side_web_APIs/Video-store-offline/sw.js')
    .then(() => console.log('Service Worker Registered'));
    .catch((err) => console.error('sw registration error: ' + err));
}
```

**サービスワーカーのインストール**

`sw.js`ファイルを作成し、`install`イベントを追加して、Service workerを使う準備をします。そのために次のようなメソッドを使用します。

- [ExtendableEvent.waitUntil()](https://developer.mozilla.org/ja/docs/Web/API/ExtendableEvent/waitUntil)を使って、内部のプロミスが成功してから、ブラウザはサービスワーカーのインストールを完了すると知らせています。
- [CacheStorage.open()](https://developer.mozilla.org/ja/docs/Web/API/CacheStorage/open)で、新規キャッシュオブジェクトを開き、[Cache.addAll()](https://developer.mozilla.org/ja/docs/Web/API/Cache/addAll)で、複数の応答をキャッシュに追加しています。

```javascript
addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('video-store')
      .then((cache) => {
        cache.addAll([
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline',
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline/index.html',
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline/style.css',
          'leaning-frontend/js/Client-side_web_APIs/Video-store-offline/script.js'
        ])
      })
      .catch((err) => console.log('sw install error: ' + err))
  );
});
```

**要求に応答する**

上記で準備が終わりました。つぎに、`fetch`イベントを追加して、サービスワーカーの登録先に対して、ブラウザに要求を出させます。そのために次のようなメソッドを使用します。

- [FetchEvent.respondWith()](https://developer.mozilla.org/ja/docs/Web/API/FetchEvent/respondWith)は、要求されたリソースのURLを記録します。
- [CacheStorage.match()](https://developer.mozilla.org/ja/docs/Web/API/CacheStorage/match)は、キャッシュからリクエスト（URL）を探します。

```javascript
addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => response || fetch(e.request))
      .catch((err) => console.error('sw fetch error: ' + err))
  );
});
```

**オフラインで試す**

chromeを使用している場合、developer tool -> Application -> Service Workers -> Offlineのチェックボックスをチェックします。

**完成版**

- MDN

  - [ソースコード](https://github.com/mdn/learning-area/tree/main/javascript/apis/client-side-storage/cache-sw/video-store-offline)
  - [ライブ](https://mdn.github.io/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/)

- ittoku-ky73

    - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/Client-side_web_APIs/Video-store-offline)

    - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/js/Client-side_web_APIs/Web-storage/Video-store-offline)

### まとめ

激ムズAPI🤓ネットワークの帯域幅を減らすのを目的としたAPIって感じ。Cookieとかはユーザ認証に使えるし、WebStorageは簡単だし、IndexedDBはブラウザの中にデータベースを作ることができるし、ServiceWorker, Cache APIはオフラインでサイトを表示することができる。全部使える🥸
