# HTMLテキストの基礎

> 参考: https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
>
> HTMLの役割の１つにはテキストに構造と意味（セマンティクス）をあたえ、ブラウザが正しく表示できるようにすることです。

## 見出しとパラグラフ

- 見出しの要素には、`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, があり、コンテンツレベルを表現している

### 構造的な階層を実装する

- 例として、`h1`は物語の題名、`h2`は各章の題名、`h3`は各章の節といったように書く

```html
<h1>The Crushing Bore</h1>

<p>By Chris Mills</p>

<h2>Chapter 1: The dark night</h2>

<p>It was a dark night. Somewhere, an owl hooted. The rain lashed down on the ...</p>

<h2>Chapter 2: The eternal silence</h2>

<p>Our protagonist could not so much as a whisper out of the shadowy figure ...</p>

<h3>The specter speaks</h3>

<p>Several more hours had passed, when all of a sudden the specter sat bolt upright and exclaimed, "Please have mercy on my soul!"</p>
```

### なぜ構造が必要なのか？

- Webページを見るユーザは、関連コンテンツを探すのにざっとみたり、時には読み始めるために見出しだけをみている傾向がある。つまり必要なものが見つからない場合、別の場所に行ってしまいます。
- ページをインデックスするサーチエンジンは、見出しのコンテンツを、ページの検索ランクに影響する重要なキーワードとみなす。
- 目が見えない人にとって、文字は無意味。スクリーンリーダーのためにも見出しはおいたほうが良い。

### なぜセマンティックが必要なのか

- 私たちはあらゆる場面でセマンティクスを頼っている。
  - 日常にある物の機能が何かを判断するために過去の経験を頼りにしている。
  - 物を見れば、 それがどのような機能をもつかを知っている

## リスト

- リストは生活のあらゆる場所にある（買い物リスト、経路リスト、このチュートリアルなど）

### 順序なし

- `ul`: 買い物リストなどの、項目の並びに関係のないものについてマークアップする時に使用する。

### 順序あり

- `ol`: 経路リストなどの、項目の並びに関係のあるものについてマークアップする時に使用する。

### 入れ子のリスト

- リストの中にリストを入れること

```html
<ol>
  <li>Remove the skin from the garlic, and chop coarsely.</li>
  <li>Remove all the seeds and stalk from the pepper, and chop coarsely.</li>
  <li>Add all the ingredients into a food processor.</li>
  <li>Process all the ingredients into a paste.
    <ul>
      <li>If you want a coarse "chunky" hummus, process it for a short time.</li>
      <li>If you want a smooth hummus, process it for a longer time.</li>
    </ul>
  </li>
</ol>
```

## 強調と重要性

- 人間の言語では、文の意味を変えるために特定の単語を強調することが多くあり、HTMLでは、そのような効果を可能にするセマンティック要素を提供している

### 強調

- 話している言葉を強調したいときはイタリック体を用いると良い
  - I am glad you weren't late.
  - I am glad you weren't *late*.

### 重要性が高い

- 重要な言葉を強調したい場合は**bold**にするとよい
  - This liquid is **highly toxic**
  - I am counting on you. **Do not** be late!

## イタリック、太字、下線など

- `b`, `i`, `u`などはあまり使わないほうが良い
  - `i`: 伝統的にイタリック体で伝えられた意味を伝えるために使われます：外来語、分類名、技術用語、考え...
  - `b`: 伝統的に太字で伝えられている意味を伝えるために使用されます。キーワード、製品名、リードセンテンス...
  - `u`: 下線で伝統的に伝えられている意味を伝えるために使用されます。適切な名前、スペルミス...