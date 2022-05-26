# 高度なテキスト処理

> Ref: https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting
>
> ここでは、注釈、説明リスト、コンピュータコード、その他の関連テキスト、下文字付き文字と上付き文字、連絡先情報などのマーキングについて学習します。

## 説明リスト

- 説明リストには`dl`, `dt`, `dd`を使う。
  - `dl`: description list
  - `dt`: description term
  - `dd`: description definition

```html
<dl>
  <dt>独白( soliloquy )</dt>
  <dd>ドラマでは、登場人物が自分自身にしゃべりかけ、内なる考えや感情や、そうなった過程を(他の登場人物ではなく)観客に対して表現します。</dd>
  <dt>独白( monologue)</dt>
  <dd>ドラマで、登場人物が自分の考えを観客や他の登場人物に伝わるように喋ります。</dd>
  <dt>ひそひそ話</dt>
  <dd>ドラマで、登場人物が観客のみに対し、ユーモアやドラマチックな効果を狙ってコメントをします。これは通常は感情や、考えや、追加の背景情報です。</dd>
</dl>
```

## 引用

- ブロックとインラインの２種類がある。

### ブロッククォート

- ブロッククォートには`blockquote`要素を使用する。
- また、`cite`属性には引用元のURLを含む。

```html
<blockquote cite="https://developer.mozilla.org/ja/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
    Quotation Element</em>) indicates that the enclosed text is an extended quotation.
  </p>
</blockquote>
```

### インラインクォート

- インラインクォートには`q`要素を使用する。

```html
<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/ja/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q></p>
```

### 引用元

- `cite`属性は、ブラウザ、スクリーンリーダーなどではあまり機能しない。
- JavaScriptやCSSを使って独自のソリューションを作成しないと、ブラウザに引用元の内容を表示させる方法はない。
- 一つの方法として、`cite`要素を、`q`要素の隣に置くなどがある

```html
<p>According to the <a href="https://developer.mozilla.org/ja/docs/Web/HTML/Element/blockquote">
<cite>MDN blockquote page</cite></a>:
</p>

<blockquote cite="https://developer.mozilla.org/ja/docs/Web/HTML/Element/blockquote">
  <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
  Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>

<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/ja/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q> -- <a href="https://developer.mozilla.org/ja/docs/Web/HTML/Element/q">
<cite>MDN q page</cite></a>.</p>
```

## 略語

- 略語は`abbr`要素を使うことによって解決する
- そして、略語の名称を`title`属性に記入する

```html
<p><abbr title="National Aeronautics and Space Administration">NASA</abbr> sure does some exciting work.</p>
```

## 詳細な連絡先をマークアップする

- 住所をマークアップする時は`address`要素を使う

```html
<address>
  <p>Chris Mills, Manchester, The Grim North, UK</p>
</address>

<address>
  <p>Page written by <a href="../authors/chris-mills/">Chris Mills</a>.</p>
</address>
```

## 上付きと下付き

- 日付け、化学式、数式などで上付き、下付きもじを使用する必要がある場合は、`sup`と`sub`要素を使用する

```html
<p>My birthday is on the 25<sup>th</sup> of May 2001.</p>

<p>Caffeine's chemical formula is C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.</p>

<p>If x<sup>2</sup> is 9, x must equal 3 or -3.</p>
```

### コンピュータコードを表現する

- `code`: コンピュータコードの一般的な部分をマークアップする。
- `pre`: 空白をマークアップする。
- `var`: 変数名をマークアップする。
- `kbd`: キーボード入力をマークアップする
- `samp`: コンピュータプログラムの出力をマークアップする

```html
<pre><code>var para = document.querySelector('p');

para.onclick = function() {
  alert('Owww, stop poking me!');
}</code></pre>

<p>You shouldn't use presentational elements like <code>&lt;font&gt;</code> and <code>&lt;center&gt;</code>.</p>

<p>In the above JavaScript example, <var>para</var> represents a paragraph element.</p>


<p>Select all the text with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd>.</p>

<pre>$ <kbd>ping mozilla.org</kbd>
<samp>PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms</samp></pre>
```

## 日付と時刻をマークアップする

- 時間と日付を機械可読形式でマークアップするには`time`要素を使う

```html
<!-- Standard simple date -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- Just year and month -->
<time datetime="2016-01">January 2016</time>
<!-- Just month and day -->
<time datetime="01-20">20 January</time>
<!-- Just time, hours and minutes -->
<time datetime="19:30">19:30</time>
<!-- You can do seconds and milliseconds too! -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- Date and time -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- Date and time with timezone offset-->
<time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
<!-- Calling out a specific week number-->
<time datetime="2016-W04">The fourth week of 2016</time>
```

