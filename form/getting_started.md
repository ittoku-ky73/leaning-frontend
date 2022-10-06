# HTMLフォームを始めよう

> 参考：https://developer.mozilla.org/ja/docs/Learn/Forms/Your_first_form

このページでは、簡単なフォームの設計、HTMLフォームコントロールとその他のHTML要素を使用した正しい実装、CSSによる簡単なスタイル付け、データサーバーに送る方法などの、初歩的なことについてみていきます。

### ウェブフォームとは何か

ユーザとウェブサイトやアプリケーションとの対話の要となるものの1つです。ユーザはフォームによって、ウェブサイトへデータを送ることができます。それらのデータは大抵ウェブサーバに送られて処理、保存されたり、クライアント側ですぐにインターフェイスを更新されることもあります。

ウェブフォームは1つ以上のフォームコントロール（ウィジェット）と、フォーム全体を構成するHTMLフォームで作られています。それらのコントロールは単一行、複数行のテキストフィールド、ドロップダウンボックス、ボタン、チェックボックス、ラジオボタンがあります。これらは、input要素を使って作成されます。

### フォームを設計する

コードを書き始める前に、フォームについて考えてみることは大事なことです。簡単なモデルを作ると、ユーザに入力依頼したいデータの適切なセットの定義が簡単になります。ユーザー体験（UX）の観点では、フォームが大規模になるとユーザが不満を持って離れるリスクが高まります。フォームは簡潔であるべきです。

フォームの設計は、サイトやアプリケーションを構築する際の大切なステップです。フォームのユーザ体験について深く知りたい場合は、以下の記事を参照してみてください。

- Smashing Magazineの[フォームの UX ](https://www.smashingmagazine.com/2018/08/ux-html5-mobile-form-part-1/)、[Extensive Guide To Web Form Usability](https://www.smashingmagazine.com/2011/11/extensive-guide-web-form-usability/)
- UXMattersの[基本的なベストプラクティス](https://www.uxmatters.com/mt/archives/2012/05/7-basic-best-practices-for-buttons.php)、[複数ページのフォーム](https://www.uxmatters.com/mt/archives/2010/03/pagination-in-web-forms-evaluating-the-effectiveness-of-web-forms.php)

#### フォームの実装：アクティブラーニング

では試しにウェブフォームを作ってみましょう。

**form要素**

すべてのフォームは、form要素から始まります。

```html
<form action="/my-handling-from-page" method="post"></form>
```

この要素は、section, footer要素と同じコンテナ要素ですが、フォームを含めることに特化しています。フォームの動作方法を設定するための特有の属性にも対応しています。すべての属性を書く必要はないですが、少なくとも、action, method属性は常に設定すべきでしょう。

- action属性は、フォームで収集したデータを送信すべき場所（URL）を定義します。
- method属性は、データを創始するのに使用するHTTPメソッド（get, post）を定義します。

### label, input, textarea要素

問い合わせフォームはとてもシンプルで、3つのテキストフィールドがあり、それぞれに対応するlabel要素がついています。

- 名前入力フィールドは、単一行のテキストフィールド。
- メールアドレス入力フィールドは、email型入力フィールドです。
- メッセージ入力フィールドは、複数行の適すフィールドを持つtextareaです。

```html
<form action="/my-handling-form-page" method="post">
  <ul>
    <li>
      <label for="name">Name:</label>
      <input type="text" id="name" name="user_name">
    </li>
    <li>
      <label for="mail">E-mail:</label>
      <input type="email" id="mail" name="user_email">
    </li>
    <li>
      <label for="msg">Message:</label>
      <textarea id="msg" name="user_message">
    </li>
  </ul>
</form>
```

label要素のfor属性は、その値として関連付けるフォームコントロールのidを取ります。これには、ユーザがマウス、トラックパッド、タッチ端末でラベルをクリックすると、対応するウィジェットがアクティブになり、画面リーダーのユーザに読み上げられるアクセシティブな名前が提供されます。

input要素において、最も重要な属性はtypeです。この属性はinput要素の見た目や動作を定義するのにとても重要です。

- `type=text`は、あらゆるテキストを受け入れる単一行のテキストフィールドを表します。
- `type=email`は、正しい形式のメールアドレスのみを受け入れる単一行のテキストフィールドです。

また、input要素に既定値を与えたい場合は、value属性を使用します。

### button要素

フォームはほぼ出来上がりました。最後にユーザがデータを送信するためのボタンを追加します。

```html
<li class="button">
  <button type="submit">Send message</button>
</li>
```

button要素のtype属性の値は3種類あります。

- `submit`は、フォームのデータを、form要素のaction属性で定義したWebページへ送信されます。
- `reset`は、すべてのフォームウィジェットを規定値にリセットします。UXの観点では、必要な理由がない限り使用しない方が良いです。
- 指定なしの場合は、何もしません。何もしませんが、とても役に立ちます。

### 基本的なフォームの整形

一応フォームの形は出来上がりましたが、かなり不細工です。綺麗にCSSでスタイル付けしてあげましょう。

```html
<style>
  form {
    margin: 0 auto;
    width: 400px;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 1em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  form li + li {
    margin-top: 1em;
  }

  label {
    display: inline-block;
    width: 90px;
    text-align: right;
  }

  input,
  textarea {
    font: 1em sans-serif;
    width: 300px;
    box-sizing: border-box;
    border: 1px solid #999;
  }

  input:focus,
  textarea:focus {
    border-color: #000;
  }

  textarea {
    vertical-align: top;
    height: 5em;
  }

  .button {
    padding-left: 90px; /* label 要素と同じサイズ */
  }

  button {
    margin-left: .5em;
  }
</style>
```

### ウェブサーバーへのデータ送信

最もややこしいであろう部分が、サーバー側でのフォームデータの扱いです。フォームコントロールには、name属性をつけます。ブラウザ側では、それぞれのデータのどのような名前をつけるかを示すものであり、サーバー側では名前によってそれぞれのデータを扱うことができます。フォームデータは「名前、値」のペアとしてサーバーに送信されます。

例では、`user_name, user_email, user_message`のデータが、POSTメソッドを用いて、`/my-handling-form-page`に送信されます。

### まとめ

ここから始まる…ウェブフォームの真髄へ！
