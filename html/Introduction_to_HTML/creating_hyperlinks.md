# ハイパーリンクの作成

> 参考: https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks
>
> ハイパーリンクは本当に重要なもので、Webが網状組織を構成しているのもハイパーリンクのおかげ

## ハイパーリンクとは

- 文書から文書へとリンクできたり、文書の特定の部分へリンクできたり、簡単なWebアドレスからアプリを利用できるようになる
- あらゆるWebコンテンツはリンクに変換でき、クリックした時にブラウザは別のWebアドレスへ移動する

## リンクの解剖

- 基本的なリンクは、`a`要素の中に囲むことで作成し、`href`属性にリンクしたいWebアドレスを入力することで機能する

### title属性による捕捉情報の追加

- ページに含まれる情報の種類や注意すべき事項など、リンクに関する捕捉的な有用な情報を含む
- リンクをホバーした時にツールチップとして表示される

### ブロックレベルリンク

- 画像などをリンクとして機能させたい場合は、*ネスト*すると良い

## URLとパスに関する簡単な入門

- URL (Uniform Resource Locator) は、Web 上のどこにあるのかを定義するテキストの文字列である

- 同一ディレクトリの場合
  - リンクしたいファイルの名前を指定する
- サブディレクトリの場合
  - ディレクトリの名前、スラッシュ、ファイルの名前を指定する
- 親ディレクトリの場合
  - `../`、ファイルの名前を指定する。
  - `../`は一つ下のディレクトリに移動する

### ドキュメントフラグメント

- HTML文書の上部だけでなく、文書の特定の部分にもリンクすることができる

```html
<!-- Example -->
<h2 id="mailing_address">Mailing address</h2>
...
<p>want to write us a letter? Use our <a href="WEBSITE_PATH_of_FILENAME#mailing_address">mailing address</a>.</p>
```

### 絶対URL vs 相対URL

- 絶対URL
  - `http://example.com/hoge/bar`
- 相対URL
  - `/hoge/bar`

## リンクのベストプラクティス

### 明確なリンク用語を使用する

- スクリーンリーダーを利用するユーザは、ページ上のリンクからリンクへと飛び回ったり、文脈の外でリンクを読んだりする
- 検索エンジンはリンクテキストを使用してターゲットファイルにインデックスをつける。そのため、リンクされているものは効果的な説明を付与したほうが良い
- リンクテキストの注意事項
  - URL、〜へのリンクなどを書かない
  - なるべく短くする

### できるだけ相対リンクを使う

- 相対リンクを使う利点
  - 絶対URLより短く、読みやすい
  - 相対URLは自分のサーバーからファイルを探すのに対して、絶対URLを使用すると、まずDNSサーバーで検索してからファイルを探すので、その分遅くなる

### HTML以外のリソースへのリンク、明確な道標を残す

- 急にダウンロードや、ホップアップウィンドウ、Flashムービーなどを読み込んだりされるとユーザが混乱する

```html
<p><a href="http://www.example.com/large-report.pdf">
  Download the sales report (PDF, 10MB)
</a></p>

<p><a href="http://www.example.com/video-stream/" target="_blank">
  Watch the video (stream opens in separate tab, HD quality)
</a></p>

<p><a href="http://www.example.com/car-game">
  Play the car game (requires Flash)
</a></p>
```

### ダウンロードへのリンクはdownload属性を使用する

```html
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
   download="firefox-latest-64bit-installer.exe">
  Download Latest Firefox for Windows (64-bit) (English, US)
</a>
```

## メールのリンク

- 送信メールメッセージを開く場合は、`href`属性に`mailto:`URLスキームを使用する

### 詳細の指定

- `mailto`URLスキームには標準のメールヘッダフィールドも追加することができる

```html
<a href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email">
  Send mail with cc, bcc, subject and body
</a>
```

