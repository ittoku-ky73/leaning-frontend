# Web APIの紹介

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Introduction

このページでは、APIを高い視点から見ていきます。

### APIとは

`Application Programming Interfaces (APIs)`は、開発者が複雑な機能を、より簡単に作成できるようにプログラミング言語から提供される構造です。複雑なコードを抽象化し、それに代わる簡潔な構文を提供します。

実世界の例として、家のコンセントについて考えます。あなたの家で機器を使いたいときには、電源コードのプラグをコンセントに差し込めばいいだけです。電源に直接結線したりする必要はありません。そんなのは危ないし非効率です。

それと同じことで、例えば3Dグラフィックのプログラムを、`C, C++`のような低レベル言語から直接コンピュータのGPUやグラフィック機能を叩くより、`JavaScript, Python`のような高レベル言語で書かれたAPIを使う方が、ずっと簡単です。

### クライアントサイドJavaScript API

クライアントサイドAPIでは、たくさんのAPIが使えます。それらはJavaScript言語本体の一部ではなく、JavaScript言語のコア上で築かれた代物です。それらはおおよそ2つのカテゴリに分けられます。

**ブラウザAPI**

Webブラウザに組み込まれており、ブラウザやコンピュータの環境の情報を取得し、これを使って役に立つややこしいことを行えるようにするものです。

例えば`Geolocation API`は位置情報を取得するための簡単なJavaScript構造を提供するので、Google Mapなどにあなたの居場所を表示したりできます。実際にはブラウザの裏で低レベル言語で、複雑なコードを使ってデバイスのGPS機器（または位置情報を得られるその他）と通信し、位置情報を取得、JavaScriptコードから利用できるようにブラウザ環境に情報を戻しています。ですがここでもこの複雑な事柄はAPIで抽象化され隠蔽されます。

**サードパーティAPI**

デフォルトのブラウザに組み込まれてはおらず、普通はコードと情報をWebの何処かから読み込む必要があります。例えば `Twitter API`を使えば、あなたのWebサイトにあなたの最新のツイートを表示するようなことが可能になります。`Twitter API`は、Twitterサービスに特定の情報を要求するのに使用する特別な構造のかたまりを提供しています。

### JavaScriptとAPIとその他JavaScriptツールの関係

ここまでクライアントサイドAPIとは何か、JavaScript言語とどう関係しているのか説明しました。もっとはっきりさせるために一度おさらいをして、ついでに他のJavaScriptツールがどう関係してくるかも見ていきます。

**JavaScript**

ブラウザに組み込まれた高レベルスクリプト言語で、Webページやアプリに機能を実装するために使用します。[Node](https://developer.mozilla.org/ja/docs/Learn/Server-side/Express_Nodejs/Introduction)のようなブラウザ以外のプログラミング環境でも使うことができます。

**ブラウザAPI**

JavaScript言語の上にある構造で、ブラウザに組み込まれた機能。実装が難しい機能をあらかじめ用意してくれている。

**サードパーティAPI**

サードパーティのプラットフォーム（Twitter, Facebookなど）上に作られた構造で、それらのプラットフォームの機能を自分のWebページで利用できるようにする。

**JavaScriptライブラリ**

多くは独自の関数を含んだ1つか複数のJavaScriptファイル。Webページにくっつけることでスピードアップしたり、共通の機能を書いたりできるもの。例えば、`jQuery, Mootools, React`などがあります。

**JavaScriptフレームワーク**

ライブラリの一階層上にあり、インストールして、1からWebアプリケーションを作成するのに使えるその他諸々の技術がパッケージされたもの。例えば、`Angular, Ember`などがあります。

ライブラリとフレームワークの大きな相違点は、「制御の逆転（Inversion of Control）」にあります。ライブラリのメソッドを呼ぶ時は、開発者がコントロールしています。フレームワークではコントロールが逆転します。フレームワークから開発者のコードが呼ばれるのです。

### APIで何ができる

モダンなブラウザではすごい数のAPIが利用できます。[MDN API 索引](https://developer.mozilla.org/ja/docs/Web/API)にはさまざまなAPIが載っています。

#### 一般的なブラウザAPI

**ブラウザで読み込んだ文書を操作するためのAPI**

[DOM (Document Object Model) API](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model)では、HTML, CSSを操作できます。HTMLを作成、削除、編集したり、動的に新しいスタイルをページに適用したりできます。ポップアップウィンドウが現れたり、何か新しい中身が表示されたりするときもDOMが使われています。

**サーバからデータを取得するAPI**

 [XMLHttpRequest](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest)、[Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)では、在庫一覧や新しいお話一覧などのページを書き換えたいときに、サーバからページ全体をリロードすることなしに、ページの一部のみを書き換えることができます。これによりサイトやアプリはずっと反応良く素早く感じることができます。このテクニックをAjaxといいます。

**グラフィックスを描画したり操作するAPI**

[Canvas](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API)、 [WebGL](https://developer.mozilla.org/ja/docs/Web/API/WebGL_API)では、HTMLのcanvas要素上にあるピクセルデータを書き換えて、2次元や3次元のシーンを作成するために使われます。例えば`Canvas API`を使用して長方形や円のような形を書いたり、キャンバスに画像を読み込んだり、セピアやグレイスケールといったフィルターを適用したり、あるいはWebGLを使用してライティングやテクスチャを使った3Dシーンを作成したりできます。

これらのAPIはよくアニメーションループを作成するAPI（`window.requestAnimationFrame()`など）や他のものと組み合わせて使われ、アニメやゲームなどの表示を定期的に書き換えるようにします。

**動画と音声のAPI**

[HTMLMediaElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement)、[Web Audio API](https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API) 、[WebRTC](https://developer.mozilla.org/ja/docs/Web/API/WebRTC_API)では、マルチメディアを操作して次のようなことができます。

- 音声や動画再生のための独自のコントロールUIの作成
- 字幕やサブタイトルのような音声トラックをビデオと一緒に表示
- Webカメラの画像を取り込んで操作し、canvas要素に表示
- Webカンファレンスに参加している他の誰かのコンピュータ上に表示
- 音声トラックにイフェクト（ゲイン、ディストーション、音場効果）をかけたり。

**デバイスAPI**

基本的にWebアプリを使えるような形で、今どきのハードウェアデバイスのデータを操作したり取得するAPIです。デバイスの位置データにアクセスして居場所を取得する位置情報APIもデバイスAPIです。他にもシステム通知を使ってWebアプリに役に立つアップデートがあるのを知らせたり（[Notifications API](https://developer.mozilla.org/ja/docs/Web/API/Notifications_API)）、ハードウェアを振動させたり（[Vibration API](https://developer.mozilla.org/ja/docs/Web/API/Vibration_API)）するデバイスAPIもあります。

**クライアントサイドでのデータ保持API**

クライアント側にデータを保存できると、ページを移動しても状態を保存できたり、デバイスがオフラインでも動作するようなアプリを作成することができます。データを保存するAPIには、[Web Storage API](https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API)を使ったキーバリューストアや、[IndexedDB API](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API)を使ったもっと複雑なテーブル型データ保存などがあります。

### 一般的なサードパーティAPI

- [Twitter API](https://dev.twitter.com/overview/documentation)
  - 最新のツイートを自分のウェブサイトに表示したりできます。
- [Mapquest](https://developer.mapquest.com/)、[Google Maps API](https://developers.google.com/maps/)
  - 自分のWebページ上に、地図を使ったあらゆることができます。
- [Facebook API スイート](https://developers.facebook.com/docs/)
  - Facebookエコシステムのさまざまな部品を使って、アプリを強化できます。例えばアプリへのログインをFacebookのログインで行えたり、アプリ内での支払い、ターゲット広告を出したりできます。
- [Telegram APIs](https://core.telegram.org/api)
  - ボットのサポートに加えて、Telegramチャンネルのコンテンツをウェブサイトに埋め込むことができます。
- [YouTube API](https://developers.google.com/youtube/)
  - 自分のサイトにYouTubeのビデオを埋め込んだり、検索したり、プレイリストを作成したりできます。
- [Pinterest API](https://developers.pinterest.com/)
  - Pinterestのボードとピンを管理して、それをウェブサイトで使えるようにできます。
- [Twilio API](https://www.twilio.com/)
  - アプリで音声、ビデオ電話の機能を作成したり、SMS/MMSを送信したりなどするためのフレームワークを提供します。
- [Mastodon API](https://docs.joinmastodon.org/api/)
  - Mastodonの提供するソーシャルネットワーク機能をプログラムで操作できます。

### APIはどのように動作する

異なる`JavaScript API`はそれぞれ違う方法で動作しますが、共通した機能とどのように動くべきかの類似したテーマを持っています。

**オブジェクトに基づいている**

あなたのコードは、1つ以上のJavaScriptオブジェクトを通じてAPIとやりとりし、オブジェクトはAPIが使用するデータやAPIが提供する機能の入れ物として使われます。

Web Audio APIの例として考えます。これはとても複雑なAPIで、たくさんのオブジェクトから成り立っています。

- `AudioContext`
  - ブラウザ内で再生する音声を操作するのに使われるオーディオグラフを表し、その音声を操作するたくさんのメソッドとプロパティを持ちます。
- `MediaElementAudioSourceNode`
  - 音声コンテキストの中で再生、操作したい音声を含むaudio要素を表します。
- `AudioDestinationNode`
  - 音声の最終目的地、つまりコンピュータで実際に出力するデバイス（スピーカ、ヘッドホン）を表します。

簡単な例を見ていきます。いや難しいか。[デモページ（github.io）](https://mdn.github.io/learning-area/javascript/apis/introduction/web-audio/)

```html
<audio src="outfoxing.mp3"></audio>
<button class="paused">Play</button>
<input type="range" min="0" max="1" step="0.01" value="1" class="volume">

<script>
  // Create an AudioContext (cross browser)
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  // store references to our HTML elements
  const audioElement = document.querySelector('audio');
  const playBtn = document.querySelector('button');
  const volumeSlider = document.querySelector('.volume');

  // load the audio source into our audio graph
  const audioSource = audioCtx.createMediaElementSource(audioElement);

  // play/pause audio
  playBtn.addEventListener('click', () => {
    // check if context is in suspended state (autoplay policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // if track is stopped, play it
    if (playBtn.getAttribute('class') === 'paused') {
      audioElement.play();
      playBtn.setAttribute('class', 'playing');
      playBtn.textContent = 'Pause';
    }
    // if track is playing, stop it
    else if (playBtn.getAttribute('class') === 'playing') {
      audioElement.pause();
      playBtn.setAttribute('class', 'paused');
      playBtn.textContent = 'Play';
    }
  });

  // if track ends
  audioElement.addEventListener('ended', () => {
    playBtn.setAttribute('class', 'paused');
    playBtn.textContent = 'Play';
  });

  // volume
  const gainNode = audioCtx.createGain();

  volumeSlider.addEventListener('input', () => {
    gainNode.gain.value = volumeSlider.value;
  });

  // connect our graph
  audioSource.connect(gainNode).connect(audioCtx.destination);

  // Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons
</script>
```

### 認識できる入り口

APIを使う時は、そのAPIの「入り口」がどこなのかしっかり確認するべきです。

`Web Audio API`ではとても単純でした。それは`AudioContext`オブジェクトであり、あらゆる音声操作を行うために使用されます。

`DOM API`でも単純な入り口があります。それは`Document`もしくは何らかの方法で影響を与えたいHTML要素のインスタンスなどです。

`Canvas API`は、諸々を操作するために使用するコンテキストオブジェクトの取得にも依存しますが、描画コンテキストが入り口に当たります。キャンバスを使って何かしようとする場合は、何でもコンテキストオブジェクトのプロパティやメソッドを呼び出します。

```js
// DOM
const em = document.createElement('em');
const para = document.createElement('p');
em.textContent = 'Hello there!';
para.appendChild(em);

// Canvas API
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
function draw() {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(0, 0, 200, 0, 2 * Math.PI);
  ctx.fill();
}
```

### 状態の変化を捉えるのにイベントを使用する

イベントを持たないWeb APIもありますが、ほとんどはいくつか持っています。上記以外の例として、`XMLHttpRequest`オブジェクトのインスタンス（サーバから何か新しいリソースを取得しようとするHTTPリクエスト）にはとてもたくさんのイベントが付随しており、`load`イベントは発火したリソースに対する正常なレスポンスが返ってきて、それが使えるようになったときに発火します。

```js
let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.addEventListener('load', () => {
  const superHeroes = request.response;
  populateHeader(superHeroes);
  showHeroes(superHeroes);
});
```

### 必要なところに追加のセキュリティ機構あり

Web API機能はJavaScriptや他のWeb技術と同等のセキュリティ上の配慮が必要です（[same-originポリシー](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy)など）。また追加のセキュリティ機構が必要な場合もあります。例としてWeb APIの中には`HTTPS`で配信されるページ上でしか動かないものがあり、これは機密とすべきデータをやり取りする可能性があるためです。これには、[ServiceWorkers](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)、[Push](https://developer.mozilla.org/ja/docs/Web/API/Push_API)などがあります。

さらには、ある種のWeb APIへの呼び出しがあなたのコードにあると、ユーザに対して許可を要求します。例えば、`NotificationsAPI`はポップアップのダイアログボックスを用いて許可を要求します。

`Web Audio`および`HTMLMediaElementAPI`には、自動再生ポリシーと呼ばれるセキュリティ機構が適用されています。これはページの読み込み時に音声を自動的に再生できないことを意味します。音声を再生するにはユーザが何かしらの操作を行う必要があります。

### まとめ

ここまで来れば、APIとは何か、どう動くのか、あなたのJavaScriptコードからどんなことができるのか何となくわかったと思います。

初学者にとってはなかなか難しいと思います。横文字、外部URLが多かったですね。APIは慣れるのに時間が要ります。焦らず日々の積み重ねと知識の蓄積で使えるようになりましょう😆

あと学習する順番間違えた🤪
