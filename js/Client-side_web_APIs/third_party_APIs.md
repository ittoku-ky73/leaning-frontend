# サードパーティAPI

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs

このページでは、ブラウザに組み込まれていないGoogle Maps・Twitter・Facebook・PayPalなどのサードパーティAPIや、その典型的な使い方を見ていきます。

### サードパーティAPIとは

サードパーティ（Facebook・Twitter・Googleなどの企業）が提供するAPIで、JavaScriptでアクセスし、サイトでその機能を使用することができます。最もわかりやすい例の1つとして、マッピングAPIでカスタムマップを表示する機能があります。そちらを見ていきます。

### サードパーティのサーバー

ブラウザAPIはブラウザに組み込まれており、すぐにJavaScriptからアクセスできます。しかし、サードパーティのAPIはサードパーティのサーバーにあるため、アクセスするには、まずAPI機能に接続してページで利用できるようにする必要があります。

Mapquestの例では、script要素を介してサーバー上で利用可能なJavaScriptライブラリのリンクを含めています。これはこのように利用することができます。ここではマップ情報を格納する変数を作成し、`mapquest.map()`メソッドで新しいマップを作成しています。

```html
<head>
  <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
  <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
</head>

<script>
  let map = L.mapquest.map('map', {
    center: [53.480759, -2.242631],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });
</script>
```

### APIキー

ブラウザAPIのセキュリティは、許可プロンプトによって処理される傾向にあります。その目的は、ユーザが訪問したウェブサイトで何が起きているのかをユーザ自身が認識できるようにし、悪意のある方法でAPIを使用している人の被害にある可能性を低くしています。

サードパーティAPIには、開発者がAPI機能にアクセスするために鍵を使用するといった少し異なる権限があります。

```javascript
L.mapquest.key = 'YOUR-API-KEY-HERE';
```

キーを要求することで、APIプロバイダはAPIユーザに、自分のアクションに対する責任を持たせることができます。開発者がキーを登録すると、APIプロバイダに認識され、APIに悪意のあること（利用者の位置を追跡したり、大量のリクエストでAPIをスパムしようとする行為）を始めると、その行動に対して対処することができます。

### Mapquestの例を拡張

Mapquestの例をもとにAPIを使用してみましょう。

1. [mapquest_start](https://github.com/mdn/learning-area/tree/main/javascript/apis/third-party-apis/mapquest/start)にあるファイルをコピペする。
2. [Mapquest developer site](https://developer.mapquest.com/)に行き、アカウントを作成。そして鍵を入手（コピー）する。
3. ファイルを開き、そこにコピーしてきた鍵を貼り付けます。

**地図の種類を変更する**

mapをhybridに変更します。他にもさまざまな値があり、[tileLayer_reference page](https://developer.mapquest.com/documentation/mapquest-js/v1.3/l-mapquest-tile-layer/)で確認できます。

```javascript
layers: L.mapquest.tileLayer('hybrid')
```

**コントロールを追加する**

以下のコードを`window.onload`ハンドラに追加してみてください。このメソッドは、単純なフル機能のコントロールセットが右上隅に配置されます。また`position`プロパティを含めると、位置を調整することもできます。

```javascript
map.addControl(L.mapquest.control({ position: 'bottomright' }));
```

その他にも、[`mapquest.searchControl()`](https://developer.mapquest.com/documentation/mapquest-js/v1.3/l-mapquest-search-control/)や、[`mapquest.satelliteControl()`](https://developer.mapquest.com/documentation/mapquest-js/v1.3/l-mapquest-satellite-control/)など、いろいろなコントロールがあるので、みてみると面白いかもしれません。

**カスタムマーカーを追加する**

`L.marker()`メソッドを使用すると、マップ上にマーカーを追加することができます。L.markerの最初の引数で位置を指定し、その後の引数でアイコンを指定しています。続いてのチェインでポップアップを出すようにして、最後のチェインでマップに追加しています。

```javascript
L.marker([53.480759, -2.242631], {
  icon: L.mapquest.icons.marker({
    primaryColor: '#22407F',
    secondaryColor: '#3B5998',
    shadow: true,
    size: 'md',
    symbol: 'A'
  })
})
.bindPopup('This is Manchester!')
.addTo(map);
```

### Google Mapはどうなのか

Google Mapsは間違いなく最も人気のある地図APIです。しかし今回、例にしたのはMapquestです。なぜかというと、使い始めるのが簡単だからです。

Google APIを使用する場合、Googleアカウントを作成、[Google Cloud Platform Console](https://console.cloud.google.com/)にログインしてAPIキーを作成、Google Maps APIを使用する場合は別で、クレジットカードを登録しないといけないなど色々と面倒だからです。

### RESTful API・NY Times

次は、[New York Times API](https://developer.nytimes.com/)を試してみましょう。このAPIは、New York Timesのニュース情報を取得して、サイトに表示することができます。このタイプのAPIはRESTful APIとして知られています。

これは特定のURLにHTTPリクエストを行い、検索語やその他のプロパティのようなデータをURL内にエンコードしてデータを取得するやり方で、APIではよくみられるパターンです。

### サードパーティAPIを利用するアプローチ

新しいAPIを使うためのアプローチとして、一般的なステップを紹介します。

**ドキュメントを探す**

サードパーティAPIを利用したい場合や、機能を知りたい場合などを知るためにはドキュメントがどこにあるのかを知っておかなければいけません。New York Times APIのドキュメントは「https://developer.nytimes.com/」にあります。

**開発者キーを取得**

ほとんどのAPIでは、セキュリティと説明責任のために、開発者キーが必要になります。NYTimes API キーは、https://developer.nytimes.com/get-startedの内容に従って、取得しましょう。

**APIをアプリに接続する**

アプリでAPIを利用するには接続が必要です。New York Times APIの場合は、コードにAPIキーを含む必要があります。まずは「https://github.com/mdn/learning-area/tree/main/javascript/apis/third-party-apis/nytimes/start」にあるコードをコピーしてきましょう。

下記のコードでは、フォームで決定されたタイミングで、urlを整形して、リクエストを投げます。そして返ってきた値をjsonに変換して、ページにその結果を表示させます。`displayNYTimes()`のところは長いので飛ばしています。

```javascript
let key = 'YOUR-API-KEY';

function fetchNYTimes(e) {
  e.preventDefault();

  url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;

  if (startDate.value !== '') {
    url += '&begin_date=' + startDate.value;
  }
  if (endDate.value !== '') {
    url += '&begin_date=' + startDate.value;
  }

  fetch(url)
    .then(res => res.json())
    .then(json => displayNYTimes(json));
}

function displayNYTimes(json) {
  // ...
}

searchForm.addEventListener('submit', function (e) {
  pageNumber = 0;
  fetchNYTimes(e);
});

nextBtn.addEventListener('click', function () {
  pageNumber++;
  fetchNYTimes(e);
});

previousBtn.addEventListener('click', function () {
  pageNumber > 0 ? pageNumber-- : return;
  fetchNYTimes(e);
});
```

完成したコードは「https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/Client-side_web_APIs/NYTimes」に置いています。

### YouTubeの例

次は、Youtubeに関するAPIを実装していきます。これから作成するAPIには次のような機能をつけます。

- YouTubeの動画を検索して結果を返す。[YouTube Data API](https://developers.google.com/youtube/v3/docs/)
- 返された動画の例をIFrameビデオプレーヤー内に表示して視聴する。[YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

ではさっそく作ってみましょう。

1. https://github.com/mdn/learning-area/tree/main/javascript/apis/third-party-apis/youtube」から、ソースコードをとってきます。
2. [Google Cloud](https://cloud.google.com/)から、APIキーを取得します。
3. ソースコードから、APIキーを貼り付けます。
4. ローカルサーバーを立ち上げてみましょう。

### まとめ

便利だよねぇ、こーいうAPIは🤓けどこーいうのは、サーバーサイドでやった方がいいかなと感じた。セキュリティとかも踏まえると🧐フロントではAPIキーは隠せないようになってるらしい。これが問題😀
