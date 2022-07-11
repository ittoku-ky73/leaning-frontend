# CSSの整理

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Organizing

このページでは、CSSの保守性を向上させる方法について見ていきます。

## CSSを整理するためのヒント

下記の例にはスタイルシートを整理整頓するための一般的な提案を示しています。

### プロジェクトのコーディング規約があるか

既存のプロジェクトでチームと作業している場合、最初に確認することは、プロジェクトにCSSの既存のスタイルガイドがあるかどうかです。

個人的な好みより、チームでの一貫性を大事にしましょう。

また、[CSSガイドライン](https://developer.mozilla.org/ja/docs/MDN/Guidelines/Code_guidelines/CSS)という記事には、CSSを記述する方法について説明しています。

### 一貫性を保つ

クラスに同じ命名規則を使用する、色を定義する方法を1つにする、一貫したフォーマットを維持するなど決めておくこと。

常に従う一連のルールがあると、CSSを作成するときに必要な精神的なオーバーヘッドの量が減ります。

### CSSを読みやすくする

上の例より下の例の方が開発者にとって好まれます。

```css
.box { background-color: #567895; }
h2 { background-color: black; color: white; }

/* --------------------------------------- */

.box {
  background-color: #567895;
}

h2 {
  background-color: black;
  color: white;
}
```

### CSSにコメントを書いておく

あなたのCSSにコメントを追加することは、将来の開発者があなたのCSSファイルを使って作業する際の助けになるだけでなく、休暇の後にプロジェクトに戻ってきたときにも役立ちます。

スタイルシートの論理セクション間にコメントブロックを追加したり、検索するときに素早く見つけられるよう、ジャンプするための文字列をコメントの中に入れといたりなどしておくと便利です。

また特定のウェブサイトを元にCSSを書いたならば、コメントにURLを入れておくと、なぜこのCSSを書いたか分かりやすくなります。

```css
/*
 * これはCSSコメントです。
 */

/* || 一般的なスタイル */

.box {
  /*
   * Ref: https://example.com/
   * グラデーションをサポートしない古いブラウザのフォールバック
   */
  background-color: red;
  background-image: linear-gradient(to right, #ff0000, #aa0000);
}
```

### スタイルシートを合理的に分割する

最初に、`body, p, h1~5, ul, table, a`要素などの一般的なスタイルを設定する。そうすることで、サイトにデフォルトのスタイルを提供できます。

### 過剰なセレクターを避ける

上の例より下の例の方が開発者にとって好まれます。

```css
article.main p.box {
  border: 1px solid #ccc;
}

.box {
  border: 1px solid #ccc;
}
```

### スタイルシートが大きくなったら分割する

サイトの異なる部分に対して非常に異なるスタイルを持っている場合、グローバルルールを含むスタイルシートと、そのページ独自のスタイルシートを持ちたい場面があります。

その場合、CSSファイルを分割することで、ファイルの肥大化、詳細度の競合、読みにくさ、などのリスクを回避できます。

また、複数のユーザがCSSで作業している場合、２人が同時にスタイルシートで作業する必要がなくなりソース管理で競合が発生する可能性も少なくなります。

## その他の役立つツール

CSS自体には内蔵された整理の方法があまりないので、書き方に一貫性やルールを作る作業が必要あります。

またウェブコミュニティでは、大規模なCSSプロジェクトを管理するのに役立つさまざまなツールやアプローチが開発されています。

これらのいくつかの簡単なガイドを紹介します。

### CSSの方法論

CSSを作成するのに独自のルールは必要なく、コミュニティによって既に設計され、多くのプロジェクトでテストされているアプローチを採用することでメリットが得られる場合があります。

この方法論は基本的にCSSコーディングガイドであり、CSSの作成と管理に非常に構造化されたアプローチを採用しています。

また全てのセレクタを作成して、そのプロジェクトのカスタムルールセットに最適化した場合よりも、CSSの使用が冗長になる傾向があります。

しかし、採用することで多くの構造を得ることができますし、このシステムは多くの開発者が使っているので理解されやすいです。

### OOCSS

Object Oriented CSS（OOCSS）とは、Nicole Sullivanが考案した「CSSを再利用可能なオブジェクトに分割し、サイト上の必要な場所で使用できるようにすること」です。

OOCSSでは、`media`と呼ばれる1つのパターンを作成して、両方のパターンに共通のCSSを全て持つようにします。一般的には`media`オブジェクトの形状を表す基底クラスです。

```css
.media {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.media .content {
  font-size: 0.8rem;
}

.comment img {
  border: 1px solid grey;
}

.list-item {
  border-bottom: 1px solid grey;
}
```

HTMLでは、コメントに`media, comment`クラスの両方を適用する必要があります。リストには`media, list-item`が適用されます。

```html
<div class="media comment">
  <img />
  <div class="content"></div>
</div>

<ul>
  <li class="media list-item">
    <img />
   <div class="content"></div>
  </li>
</ul>
```

OOCSSはそのアプローチに厳密に従っていない人でも、一般的にはこの方法でCSSを再利用することを意味します。

### BEM

Block Element Modifier（BEM）は、CSSを次のように解釈します。

- `Block`、ボタン、メニュー、ロゴなどのスタンドアロンエンティティ
- `Element`、リストアイテム、タイトル
- `Modifier`、スタイルや動作を変更するブロック、要素のフラグ

下記は、SCSSを例にしたスタイルの書き方です。

```scss
.Block {
    //
    &__element {
        //
        &--modifier {
            //
        }
    }
}
```

下記は、[BEMの命名規則](http://getbem.com/naming/)に則った、HTMLに適用されるクラスの書き方です。

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>
```

BEMは大規模なWebプロジェクトで広く使用されており、多くの人がこの方法でCSSを作成しています。

### その他

そのほかにも、Jonathan Snookによって作成された[SMACSS](http://smacss.com/)、Harry Robertsの[ITCSS](https://itcss.io/)、Yahoo!によって最初に作成された[Atomic CSS（ACSS）](https://acss.io/)があります。

またこのようなシステムの欠点は、小規模なプロジェクトの場合、複雑に見える可能性があることです。

### CSSのビルドシステム

CSSを編成するもう1つの方法は、フロントエンド開発者が利用できるツールを利用することです。これによりCSSを書くために、よりプログラム的なアプローチをとることができます。

例として、プリプロセッサとポストプロセッサがあります。

- プリプロセッサは、未加工ファイルを実行してスタイルシートに変換します。
- ポストプロセッサは、加工したスタイルシートをロードを高速化するために最適化する処理を行います。

これらのツールは、開発環境で前処理と後処理を行うスクリプトを実行できる環境が必要です。

最も人気のあるプリプロセッサは[Sass](https://sass-lang.com/)です。スタイルを整理する上で非常に便利です。

### 変数の定義

CSSにはカスタムプロパティ（変数）があります。これはSassを使用する1つの理由になります。この機能を使うことで色、フォントの設定を定義でき、その変数をプロジェクトで使用できることができます。

```scss
$base-color: #c6538c;

.alert {
  border: 1px solid $base-color;
}
```

### コンポーネントスタイルシートのコンパイル

CSSを整理する方法の1つに、分割する方法があります。Sassを使用することで、非常に小さなスタイルシートをたくさん持つことができます。

例えば、[partial](https://sass-lang.com/documentation/at-rules/use#partials)を使って、`fundation/_code.scss, fundation/_lists.scss`などのファイルを作成して、`@use`ロールで他のスタイルシートにロードすることができます。ディレクトリも指定できます。

```scss
@use 'code';
@use 'lists';

@use 'fundation';
```

### ポストプロセッサー

プリプロセッサを使用すると、コメントや空白を削除してCSSのファイルサイズを小さくしてくれます。例として、[cssnano](https://cssnano.co/)があります。
