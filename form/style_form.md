# フォームのスタイル設定

> 参考：https://developer.mozilla.org/ja/docs/Learn/Forms/Styling_web_forms

このページでは、CSSを使用してフォームコントロールのスタイルを設定する方法について見ていきます。

### なぜフォームウィジェットのスタイル設定は難しいのか

1995年ごろに、[HTML 2 仕様書](https://www.ietf.org/rfc/rfc1866.txt)へフォームコントロールが追加されました。CSSは1996年までリリースされず、その後も数年はブラウザの対応は十分ではありませんでした。なのでブラウザは、フォームコントロールの管理とレンダリングを、オペレーティングシステムに頼っていました。

CSSがHTMLのスタイルを設定できるようになってからも、ユーザは各プラットフォームの視覚的な外見に慣れていましたので、ブラウザベンダーはフォームコントロールのスタイル付けに乗り気ではありませんでした。しかし、ウェブサイトのオーナーはこれまでよりも、サイト全体に適するスタイルを欲しており、ウェブプラットフォームはこれを実現可能にしました。

一部のフォームウィジェットは、CSSを使ってスタイルを設定できます。しかし、スタイルの設定は難しくなったり、ユーザビリティを破綻させないよう気をつける必要があります。

### CSSを使用する場合、すべてのウィジェットが同じように作成されるわけではない

フォームでCSSを使用するときにスタイルが設定できない場合があります。この問題は、3つのカテゴリに分けられます。

**良好**、ほとんど問題なくスタイルを設定できる

1. form要素
2. fieldset, legend要素
3. 単一行のinput要素（search以外）
4. textarea要素
5. ボタン
6. label要素
7. output要素

**不良**、ほとんどスタイルを設定できない。難しい。

1. チェックボックスとラジオボタン
2. input type search

**劣悪**、スタイルを設定できない

1. input type color
2. input type datetime-localのような日時関連
3. input type range
4. input type file
5. ドロップダウン
6. progress, meter要素

これらすべてのウィジェットの主な問題は、ウィジェットの構造がとても複雑であるという事実と、基本的なスタイル設定を超えると、現在のCSSではウィジェットの細かい部分全てにスタイルを設定できるほどの表現力がないことによります。

これらのウィジェットを完全にカスタマイズしたい場合は、HTML, CSS, JavaScriptを使って独自のものを作成する必要があります。詳しくは、[カスタムウィジェットの作成方法](https://developer.mozilla.org/ja/docs/Learn/Forms/How_to_build_custom_form_controls)をご覧ください。難しいです。

### 良好

スタイル付けが簡単なフォームコントロールは、他のHTML要素とほぼ同じようにスタイルを設定することができます。

### フォントとテキスト

フォームウィジェットでも、フォントやテキストを指定できます。フォームの体裁を他のコンテンツと一致させるには、以下のルールをスタイルシートに追加するとよいでしょう。

```css
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
}
```

### ボックスモデル

すべてのテキストフィールドは、CSSのボックスモデルに関する前プロパティ（`widthm height, padding, margin, border`）をサポートしています。さまざまなウィジェットを同じサイズにしたい場合は、以下のルールをスタイルシートに追加します。

```css
button,
input,
select,
textarea {
  width: 150px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

### legend要素の配置

legend要素の配置を操作するスタイル設定は次のように書きます。下記のルールはlegend要素を一番右下に配置します。

```css
fieldset {
  position: relative;
}

legend {
  position: absolute;
  bottom: 0;
  right: 0;
}
```

#### 具体的なスタイル設定の例：アクティブラーニング

HTMLフォームにスタイルを設定する方法を見るのに、ハガキ風の連絡フォームを作成します。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/tree/main/html/forms/postcard-example)
  - [ライブ](https://mdn.github.io/learning-area/html/forms/postcard-example/)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/tree/main/form/Postcard-form)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/form/Postcard-form)

### まとめ

フォームのスタイル付けは一味違う🙃
