# headには何が入る？HTMLのメタデータ

> Ref: https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
>
> head要素はbody要素とは違い、ページには表示されない。

## タイトルをつける

- title要素はHTML文書のタイトルを表すメタデータ

## meta要素

- メタデータはデータを説明するデータ
- ドキュメントの文字エンコードを指定するときは、`<meta charset="ENCODE">`を使う

### 著者と説明を追加する

- `name`: メタ要素のタイプを指定する。含まれている情報の種類
- `content`: 実際のメタコンテンツを指定する

```html
<!-- 例 -->
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Web Docs Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

- 著者(author)を指定しておくと、質問や連絡したい時に便利
- 説明(description)を指定すると、googleで検索された時に、`title`要素と、その下に`description`が表示される
- Googleでは、メインのホームページリンクの下にMDN Web Docsの関連するサブページがいくつか表示されます。これらはサイトリンクと呼ばれ、[Googleのウェブマスターツール](https://search.google.com/search-console/about?hl=en)で構成できます
- metaデータの`keywords`は、検索エンジンによって無視される

### 他のタイプのメタデータ

- [Open Graph Data](https://ogp.me/)は、FacebookがWebサイトにより豊富なmetaデータを提供するためにたつ名されたmetaデータプロトコル

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

- FacebookでMDN Web Docsにリンクすると、リンクが画像と説明とともに表示される

![facebook-output](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML/facebook-output.png)

- [Twitterカード](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)と呼ばれるmetaデータはサイトのURLがtwitter.comに表示されるときに同様の効果をもたらす

```html
<meta name="twitter:title" content="Mozilla Developer Network">
```

### サイトにカスタムアイコンを追加する

- ファビコンを指定することでブラウザの「お気に入り」や「ブックマーク」で、Webサイトのアイコンを表示することができる

1. サイトのページと同じディレクトリに`.ico`形式で保存します。（ほとんどのブラウザは、`.gif`や`.png`などの、より一般的な形式のファビコンをサポートします。ICO形式を使用すると、Internet Explorer 6まで機能します）。

2. HTMLの`<head>`に次の行を追加する

   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

- そのほかにも、iPadのホーム画面に保存する時に使用するアイコンなどの要素などをカバーしている

```html
<!-- Example -->
<!-- third-generation iPad with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://developer.mozilla.org/static/img/favicon144.png">
<!-- iPhone with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://developer.mozilla.org/static/img/favicon114.png">
<!-- first- and second-generation iPad: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://developer.mozilla.org/static/img/favicon72.png">
<!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed" href="https://developer.mozilla.org/static/img/favicon57.png">
<!-- basic favicon -->
<link rel="icon" href="https://developer.mozilla.org/static/img/favicon32.png">
```

### CSSとJavaScriptをHTMLに適用させる

- `link`要素は常にドキュメントの先頭に配置する必要がある

```html
<link rel="stylesheet" href="my-css-file.css">
```

- `script`要素は先頭に`src`を先頭に配置し、ろーどするJavaScriptのパスを属性に含める必要がある
- `defer`は、ページがHTMLの解析を終了した後にJavaScriptをロードするようにブラウザに指示する

```html
<script src="my-js-file.js" defer></script>
```

### ドキュメントに言語を設定する

- `lang`属性を使うことにより、ページの言語を設定することができる

````html
<html lang="en-US">

<!-- 部分的に言語を設定することもできる -->
<p>Japanese example: <span lang="ja">ご飯が熱い。</span>.</p>
````

