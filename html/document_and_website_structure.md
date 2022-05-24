# ドキュメントとWebサイトの構造

> 参考：https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure
>
> ここでは、基本的なウェブサイト構造を計画し、この構造を表すHTMLを記述する方法について説明する。

## 文書の基本部分

- ヘッダー: `<header>`
  - 通常は大きな見出しやロゴのついた上部の部分。ウェブサイトを移動しても、サイトに関する主な共通情報が留まっている部分
- ナビゲーションバー: `<nav>`
  - サイトの主要セクションへのリンク。通常はメニューボタン、リンク、タブで表示される。ヘッダーと同様に、移動しても留まる部分。
- メインコンテンツ: `<main>`, `<article>`, `<section>`
  - 中央の大きな部分。ビデオ、記事、地図、ニュースの見出しなどページごとに異なるウェブサイトの部分
- サイドバー: `<aside>`, `<main>`
  - 周辺情報、リンク、引用、広告など。通常はメインコンテンツと関連性のあるものが含まれる
- フッター: `<footer>`
  - 通常はページの下の部分に注意事項、著作権表示、連絡先情報が含まれる。

## コンテンツを構造化するHTML

HTMLは、セマンティクスを尊重し、適切な役割に適切な要素を使用する必要がある。

HTMLコードでは、それらの機能に基づいてコンテンツのセクションをマークアップすることができる。

スクリーンリーダーのような支援技術はそれらの要素を認識し、「メインナビゲーションを見つける」や「メインコンテンツを見つける」といった作業を手だ助けることができる

## HTMLレイアウト要素の詳細

HTMLの詳しい要素については [HTML 要素のリファレンス](https://developer.mozilla.org/ja/docs/Web/HTML/Element#inline_text_semantics)を読むことによって得られる。

- `main`
  - ページの固有のコンテンツを含む。htmlには一度だけ使用し、理想は他の要素に入れ子にしないことです。
- `article`
  - 記事を囲む。
- `section`
  - `article`と似ているが、１つの機能（ミニマップ、記事の見出しと要約）を構成するページの単一部分をグループ化するもの。
- `aside`
  - メインコンテンツとは関連のないコンテンツ（追加情報など）を含む。
- `header`
  - コンテンツのグループの案内を表す。`body`の入れ子の場合、Webページのグローバルヘッダーを定義しますが、`article`, `section`の子である場合、そのセクションの特定のヘッダーを定義する
- `nav`
  - ページの主なナビゲーション機能を含む。
- `footer`
  - ページ下部のグループを表す。

### 非セマンティックなラッパー

`div`や`span`要素は、コンテンツをラップする時に理想的なセマンティックが見つからない、CSSやJavaScriptで影響を与えたい場合、などに使用する。

- `span`
  - インラインの非セマンティック要素である。コンテンツをラップするより良いテキスト要素がない場合に使う要素。
- `div`
  - ブロックの非セマンティック要素である。ブロック要素に特定の意味を追加したくない場合などに使用する。
  - また`div`は使い勝手が良く使いやすいです。使い過ぎるとHTMLコードが乱雑になりがちになるので使い所には注意するほうが良い。

### 改行と垂直方向のルール

- `br`
  - 段落内に改行を作る。`p`要素に入れ子としてよく使用する。
- `hr`
  - 水平の罫線を作る。テキストの主題の変更、トピック、シーンの変更などに使う。

### 簡単なウェブサイトを計画する

簡単なWebページのコンテンツの構造を計画したら、次のステップとして、掲載したいコンテンツ、必要なページ、ユーザーエクスペリエンス（UX）などを解決する（ [Information architecture](https://developer.mozilla.org/ja/docs/Glossary/Information_architecture)ともいう）。

**Webページのコンテンツの構造の計画手順**

1. ナビゲーション、フッターなど、ウェブサイト全体に共通したいものを書き留める。![common-features](https://mdn.mozillademos.org/files/12423/common-features.png)
2. 各ページの構造を考える。![site-structure](https://mdn.mozillademos.org/files/12429/site-structure.png)
3. ウェブサイトに載せたいコンテンツを考える。または書き留める。![feature-list](https://mdn.mozillademos.org/files/12425/feature-list.png)
4. 今までのコンテンツ項目をグループに分類して、どの部分が異なるページにあるか把握する（ [Card sorting](https://developer.mozilla.org/ja/docs/Glossary/Card_sorting)ともいう）。![card-sorting](https://mdn.mozillademos.org/files/12421/card-sorting.png)
5. サイトマップをスケッチする。サイト上の各ページにバブルをつけ、ページ間の典型的なワークフローを表す線を引く。![site-map](https://mdn.mozillademos.org/files/12427/site-map.png)