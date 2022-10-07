# フォームの構築

> 参考：https://developer.mozilla.org/ja/docs/Learn/Forms/How_to_structure_a_web_form

このページでは、フォームと各パーツに構造と意味を提供している要素についてみていきます。

フォームは柔軟性があるため、HTMLで最も複雑な構造の1つとなっています。専用のフォーム要素と属性を使用して、あらゆる種類の基本フォームを作成できます。HTMLフォームを構築する時に正しい構造を使用すると、フォームの使用性やアクセシビリティを保証するのに役立ちます。

### form要素

フォームを正式に定義すると共に、属性でフォームの動作を定義します。HTMLフォームを作成する時にはform要素から始めて、関連するコンテンツを入れ子にします。多くの支援技術やブラウザプラグインはform要素を検出して、フォームを使いやすくする特別なフックを実装しています。

> フォームの中にフォームを入れ子にはしないでください、これは予期せぬ動作を発生させる恐れがあります。

form要素の外部でもウェジェットを使用できますが、そのウィジェットはform属性を用いて関連付けする必要があります。これは、フォーム内に包含されていないコントロールを明示的にフォー目へ紐付けられるように導入された機能です。

### fieldset, legend要素

fieldset要素は、スタイルや意味づけのための同じ目的を持つウィジェットのグループを作るのに使います。また、fieldset要素にラベルを付与するには、legend要素をfieldset要素の入れ子にして使います。

多くの支援技術は、legend要素を対応するfieldset要素内にある各ウィジェットのラベルの一部として扱います。例えば、スクリーンリーダーでは各ウィジェットのラベルを読み上げる前にlegend要素を読み上げます。

```html
<form>
  <fieldset>
    <legend>Fruit juice size</legend>
    <p>
      <input type="radio" name="size" id="size_1" value="small">
      <label for="size_1">Small</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_2" value="medium">
      <label for="size_2">Medium</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_3" value="Large">
      <label for="size_3">Large</label>
    </p>
  </fieldset>
</form>
```

### label要素

HTMLフォームウィジェットのラベルを定義する正式な方法です。これは、アクセシブルなフォームを作成する場合に重要な要素です。適切に実装されたとき、画面リーダーはフォーム要素のラベルと関連する指示を一緒に読み上げます。

ラベルをセットアップするもう1つの利点は、ユーザーがラベルをクリックするとウィジェットをアクティブにすることが可能な点です。もしlabel要素をクリックすると、関連付けされている要素にフォーカスさせることができます。

### 複数のラベル

1つのウィジェット内に複数のラベルを入れることは可能ですがお勧めしません。label要素にspan要素などを入れ子にして使うのが良いでしょう。

```html
<div>
  <label for="username">Name: <span aria-label="required">*</span></label>
  <input type="text" name="username" id="username">
</div>
```

label要素に定義されているaria-label属性は常に画面リーダーによって読み上げられます。

### フォームで使用される一般的なHTML構造

ラベルとウィジェットは、`ul, ol`要素の中に`li`要素で包み込むのが一般的な慣習です。、`p, div`要素もよく使われます。リストは複数のチェックボックスやラジオボタンを構造化するのに最もよく使われます。

fieldset要素などに複雑なフォームの構築に、`h1, h2`要素や`section`要素を使うことも一般的です。

#### フォーム構造を構築する：アクティブラーニング

複雑なフォーム構造である支払いフォームを作成しましょう。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/tree/main/html/forms/html-form-structure)
  - [ライブ](https://mdn.github.io/learning-area/html/forms/html-form-structure/payment-form.html)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/tree/main/form/payment-form)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/form/payment-form)

### まとめ

フォームはいろいろな技術が絡み合っているから難しい。
