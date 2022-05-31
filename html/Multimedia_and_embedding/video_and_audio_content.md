# 動画と音声のコンテンツ

> 参考：[動画と音声のコンテンツ](https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
>
> ここではHTML文書に、`<video>`と`<audio>`要素を使って、動画と音声のプレイヤーを追加する方法や、動画にキャプションや字幕を追加する方法について説明します。

## Webでの動画と音声

Web開発者は、あらゆる種類の動画をサポートするのに十分な速さがある帯域幅を使い始めた2000年代初頭以来、Web上で動画や音声を長時間使用したいと考えていました。

初期段階では、HTMLなどのネイティブなWebテクノロジーでは動画や音声をWebに埋め込むことができなかったため、[Flash](https://ja.wikipedia.org/wiki/Adobe_Flash) (後の[Silverlight](https://ja.wikipedia.org/wiki/Microsoft_Silverlight)) などの独自技術（またはプラグインベース）が一般的になった。

しかし、HTML/CSSの機能、セキュリティの問題、アクセシビリティの問題でうまく機能しないなどさまざまな問題がありました。

数年後、[HTML5](https://developer.mozilla.org/ja/docs/Glossary/HTML5) 仕様には、`video`, `audio`要素、およびそれらを制御する幾つかのピカピカの新しい`JavaScript API`が追加されました。

ここではJavaScriptは使わずHTMLのみで実現できる基本的なことだけ紹介します。

> 始める前にYoutubeやDailymotion, VimeoのようなOVP（オンライン動画プロバイダ）と、Soundcloudのようなオンライン音声プロバイダがあることも知っておく必要がある。
>
> そのような企業は、動画をホストして便利で簡単な方法を提供するので、膨大な帯域幅の消費を心配する必要がなくなります。
>
> OVPはWebページに動画や音声を埋め込むための既製コードを提供しています。このサービスを使用するなら、この記事で問い上げるいくつかの困難を避けることもできる。

### video要素

video要素は、動画を簡単に埋め込むことができる。

```html
<video src="rabbit320.webm" controls>
  <p>お使いのブラウザは HTML5 動画をサポートしていません。その代わりに<a href="rabbit320.webm">動画へのリンク</a>があります。</p>
</video>
```

**機能**

- `src`
  - img要素と同じように、`src`（ソース）属性には、埋め込みたい動画のパスを指定する。
- `controls`
  - ユーザが動画や音声の再生を制御できるようにする。この機能の他に制御するには適切な [JavaScript API](https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement) を使用する。
- video要素ないの段落
  - これは代替コンテンツと呼ばれ、video要素をサポートしていない場合に表示され、古いブラウザでの代替手段となる。

### 複数のフォーマットをサポートする

MP3, MP4, WebMなどの形式は**コンテナフォーマット**と呼ばれます。これは音声トラック、動画トラック、提示されるメディアを記述するメタデータなど、歌または動画全体を構成することなる部分を含む。

- WebMコンテナ
  - VP8/VP9動画でOgg Vorbis音声をパッケージ化します。主にFirefox, Chromeでサポートされている。
- MP4コンテナ
  - H.264動画でAACまたはMP3音声をパッケージ化することがよくある。主にInternet Explorer, Safariでサーポートされている。
- Oggコンテナ
  - Ogg Vorbis音声とOgg Theora動画と一緒にする傾向がある。主にFirefox, Chromeでサポートされていたが、良質なWebMフォーマットに取って代わられている。

上記のフォーマットは、動画と音声を管理可能なファイルに圧縮するために存在します。ブラウザには、VorbisやH.264などのコーデック（coder-decorder）が含まれる。

これらのコーデックは、圧縮された音声と動画を2進数字に変換して戻すために使用される。残念ながらブラウザはすべて同じコーデックをサポートしている訳ではないので、メディア制作ごとに複数のファイルを用意する必要がある。

メディアをデコードするための適切なコーデックがない場合、再生されない。

```html
<video controls>
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>お使いのブラウザは HTML5 動画をサポートしていません。その代わりに<a href="rabbit320.mp4">動画へのリンク</a>があります。</p>
</video>
```

source要素のtype属性は、動画ファイルのMIME(Multipurpose Internet Mail Extensions)タイプが含まれており、ブラウザがこれらを読み込んで理解できない動画をすぐにスキップすることができるオプションである。

指定することにより読み込む時間とリソースを節約できる。

### その他のvideo要素

```html
<video controls width="400" height="400"
       autoplay loop muted
       poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>お使いのブラウザは HTML5 動画をサポートしていません。その代わりに<a href="rabbit320.mp4">動画へのリンク</a>があります。</p>
</video>
```

- widthとheight
  - これらの属性は、CSSを使用して動画サイズを制御することができる。また動画は元のアスペクト比を維持する。
    アスペクト比が維持されない場合は、動画は水平方向にスペースを埋めるように拡大し、デフォルトでは満たされていないスペースには無地の背景色が与えられる。
- autoplay
  - この属性は、ページの残りの部分がロードされている間に音声または動画の再生をすぐに開始する。おすすめはしない
- loop
  - この属性は、動画が終了するたびに再生を開始する。必要な時以外使用しない。
- muted
  - この属性は、音声をオフにしてメディアを再生する。
- poster
  - この属性は、動画の再生前に表示される画像のURLを値として取る。
- preload
  - この属性は、大きなファイルをバッファリングする用途で使用される。
    **3つの指定できる値**
    - none
      - ファイルをバッファリングしない。
    - auto
      - メディアファイルをバッファリングする。
    - metadata
      - ファイルのメタデータのみをバッファリングする

### audio要素

audio要素はvideo要素と全く同じように動作しますが、若干の違いがある。

```html
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>お使いのブラウザは HTML5 音声をサポートしていません。代わりに<a href="viper.mp3">音声へのリンク</a>があります。</p>
</audio>
```

autio要素は、`width, height, poster`属性をサポートしていない。

### 動画のテキストトラックを表示する

やや高度なコンセプト。多くの人々は、Web上で見つけた音声や動画のコンテンツを聴くことができない、または聞きたくない状態である
例えば、

- 聴覚障害のため。
- 騒々しい環境や、静かな場所にいるため
- 動画で喋る言語がわからない場合に、テキストや翻訳メディアを利用している場合

音声や動画で流れる言葉のテキストが提供するには[WebVTT](https://developer.mozilla.org/ja/docs/Web/API/WebVTT_API)フォーマットとtrack要素で実現できる。

##### WebVTT(Web Video Text Track Format)

複数のテキスト文字列を含むテキストファイルを書くための形式。動画ないのいつテキスト文字列を表示するか、限られたスタイリング、位置情報などのメタデータが一緒に含まれる。

これらのテキスト文字列は**キュー**と呼ばれ、さまざまな目的のためにさまざまなタイプを表示できます。

**一般的な例**

- 字幕(Subtitles)
  - 音声で話す言葉を理解できない人のための外国の翻訳材料
- キャプション(captions)
  - 対話や重要な物音の描写の動機化で、音声を聴くことのできない人に何が起こっているか理解できるようにする。
- 次元記述(timed descriptions)
  - 視覚障害者にサービスを提供するために、音声に変換するためのテキスト。

```vtt
WEBVTT

0
00:00:00.000 --> 00:00:02.000
<v Test>[Test]</v>

1
00:00:03.000 --> 00:00:05.000
Hello I'm Rabbit !!!!!!!

```

> テキストトラックは検索エンジンのSEOにも役立ちます。テキストトラックを使用すると、検索エンジンは動画の途中地点に直接リンクすることも可能です。