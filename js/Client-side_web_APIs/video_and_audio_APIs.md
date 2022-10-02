# 動画と音声のAPI

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

このページでは、video要素やaudio要素のカスタム再生コントロールの作成や一般的なタスク実行の方法など見ていきます。

### HTML5動画と音声

video, audio要素を使用すると、ビデオとオーディオをWebページに埋め込むことができます。

```html
<video controls>
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
</video>
```

またvideo要素の属性としてcontrolsをつけることで、再生コントロールの規定のセットが有効になります。この属性にはメリットとデメリットがあります。

メリットは、再生コントロールがこの属性をつけるのみで機能すること、デメリットは、ブラウザによって再生コントロールの操作が異なってしまう点です。またキーボードでのアクセスもできない点もあります。

ここでは、`controls`ネイティブコントロールを非表示にして、HTML, CSS, JavaScriptを使用して独自のコントロールをプログラミングしていきます。

### HTMLMediaElement API

[HTMLMediaElement API](https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement)は、オーディオプレーヤーをプログラムで制御する機能を提供します。この[ライブの例](https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/)を目指して進めていきます。

### 入門

まずは、[こちら](https://github.com/mdn/learning-area/tree/main/javascript/apis/video-audio/start)からソースコードをコピーします。

#### html

htmlファイルを見ていきます。

- video要素には2つのsource要素が含まれており、サイトで表示するブラウザに応じて異なる形式を読み込むことができます。
- 動画をコントロールする要素として、再生、一時停止、停止、巻き戻し、早送りのbutton要素や、`aria-label`属性で、各ボタンをわかりやすく説明しています。
- またdiv, span要素で、ビデオの経過時間を表示するタイマーの機能もついています。

#### css

cssファイルを見ていきます。

- `.controls`クラスで、`visibility: hidden;`を指定します。これはJavaScriptが読み込まれない場合、ユーザがネイティブコントロールでビデオを使用できるようにするためです。
- `@font-face`ではカスタムWebフォントをインポートしています。ここではアイコンフォントを使っています。アイコンフォントが優れている理由は、アイコンを画像ファイルとしてダウンロードする必要がないためHTTPリクエストを削減できること、優れたスケーラビリティ、テキストプロパティを使用してスタイルを設定できることなどがあります。

#### javascript

ここではあまり説明しません。

完成版はこちらです。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/tree/main/javascript/apis/video-audio/finished)
  - [ライブ](https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/tree/main/js/Client-side_web_APIs/Video-audio/)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/js/Client-side_web_APIs/Video-audio/)

### まとめ

これはあまり使うことはないかな。もし使うとしたらvideo.jsとかのライブラリを使うかな。
