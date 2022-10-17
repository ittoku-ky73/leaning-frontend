# 高度なフォームのスタイル設定

> https://developer.mozilla.org/ja/docs/Learn/Forms/Advanced_form_styling

このページでは、スタイル設定がより難しい「不良、劣悪」に分類されるフォームコントロールのスタイル設定をCSSで何ができるか見ていきます。

最初に、`appearance`プロパティについて説明します。これはスタイル設定の難しいフォームコントロールをよりスタイル付けできるようにするためにかなり有用なプロパティです。

### 見た目：OSレベルのスタイル制御

ウェブフォームのスタイル設定は歴史的にOSで行われており、それがコントロールの見た目のカスタマイズの問題の一部となっていました。

`appearance`プロパティは、OSやシステムレベルでのウェブフォームのスタイル設定を制御する方法として作成されました。最も使う値は`none`です。これは適用したコントロールがシステムレベルのスタイルを使用することを可能な限り止め、CSSを使用して自分でスタイルを構築できるようにします。

```css
input {
  appearance: none;
}
```

大抵の場合、枠線を除去し、CSSでのスタイル設定を少し簡単にしますが、本質ではありません。本当は、検索、ラジオボタン、チェックボックスで本領を発揮します。

### 検索ボックスを変更する

検索ボックスは基本的に単なるテキスト入力ですが、なぜ、`appearance: none`が便利なのでしょうか。答えは、Safariでは、検索ボックスにスタイル設定の制限があるからです。例えば、`height, font-size`を自在に調整できません。

また検索フィールドで、`border, background`プロパティを設定してもこの問題を解決できます。

### チェックボックスとラジオボタン

チェックボックスやラジオボタンのスタ椅子設定は、初期設定のままでは厄介です。サイズも初期設定のままでは変更できないようになっており、変更しようとするとブラウザの反応が異なってしまいます。

**appearance: none;を使う**

ここでは実際に、このプロパティを使用してチェックボックスやラジオボタンのスタイル付けを行って見ます。

- MDN
  - [チェックボックス](https://developer.mozilla.org/ja/docs/Learn/Forms/Advanced_form_styling#%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9%E3%81%A8%E3%83%A9%E3%82%B8%E3%82%AA%E3%83%9C%E3%82%BF%E3%83%B3)
  - [ラジオボタン](https://mdn.github.io/learning-area/html/forms/styling-examples/radios-styled.html)
  - [トグルボタン](https://mdn.github.io/learning-area/html/forms/toggle-switch-example/)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/form/Check-radio-toggle-buttons)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/form/Check-radio-toggle-buttons)

### 「劣悪」要素に何ができるか

今度は劣悪コントロールに注目しましょう。これは完全にスタイル設定するのが難しいものです。それはドロップボックス、`color, datetime-local`タイプのような複合コントロール型、`progress, meter`要素のようなコントロール志向のフィードバックになります。

問題はブラウザ同士で色々な既定の見た目があって、それにスタイル設定できても、内部のいくつかはスタイル設定ができないことです。

look & feelの違いを受け入れる覚悟があれば、サイズ変更を一貫したスタイル設定や、`background-color`プロパティのような単一スタイル設定、システムレベルのスタイル設定を除去できる`appearance`の使用で逃げることもできます。

では実際にこの劣悪なコントロールのスタイル付けをどのようにすればいいのか、例を書いていきます。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/blob/main/html/forms/styling-examples/ugly-controls.html)
  - [ライブ](https://mdn.github.io/learning-area/html/forms/styling-examples/ugly-controls.html)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/form/Ugly-controls)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/form/Ugly-controls)

`meter, progress`要素は特にスタイル付けが難しい要素です。もしこの要素にスタイル設定を制御したい場合は、「[progressbar.js](https://kimmobrunfeldt.github.io/progressbar.js/)」のようなサーボパーティのソリューションを使ったほうが楽かもしれません。

### まとめ

例を作るのに時間がかかった😅ウェブフォームのCSSは手強いな😎
