# UI擬似クラス

> 参考：https://developer.mozilla.org/ja/docs/Learn/Forms/UI_pseudo-classes

このページでは、フォームをスタイル設定するためのUI擬似クラスについて見ていきます。

### 利用できる擬似クラス

元から利用できるフォームに関連する（[CSS 2.1](https://www.w3.org/TR/CSS21/selector.html#dynamic-pseudo-classes)時点）擬似クラスは次のとおりです。

- `:hover`、マウスポインタを当てたときだけ要素を選択する。
- `:focus`、フォーカスされているとき（キーボードのタブで移動したとき）、要素を選択する。
- `:active`、アクティブ化されているとき（クリックされた時や、キーボードで`Return/Enter`が押されたとき）、要素を選択する。

そして[CSS Selector Level 3](https://www.w3.org/TR/selectors-3/)、[CSS Basic UI Level 3](https://drafts.csswg.org/css-ui-3/#pseudo-classes)で追加された擬似クラスは次のとおりです。

- `:required, :optional`、必須、省略可能。
- `:valid, :invalid, :in-range, :out-of-range`、フォーム検証の有効・無効、範囲内・範囲外。
- `:enabled, :disabled, :read-only, :read-write`、有効・無効、読み取り専用・読み書き可能。
- `:checked, :indeterminate, :default`、チェックボックス、ラジオボタンのチェックされた状態、不確定な状態、既定の選択オプション。

その他にも擬似クラスはありますが、上にあげたものが最も使用頻度が高いです。

### 入力が必須か否かによるスタイル設定

クライアントサイドのフォーム検証に関する最も基本的な概念の1つは、フォームの入力が必須か任意なのかです。これは、`input, select, textarea`要素に`required`属性を付与することでそのフィールドを必須項目にすることができます。

```html
<input type="text" name="name" id="name" required>
```

またCSSで、`:required, :optional`擬似クラスでそれらのスタイルを設定することができます。

```css
input:required {
  border: 1px solid black;
}

input:optional {
  border: 1px solid silver;
}
```

上記のスタイルは、悪くもなければ良くもありません。第一に、必須とオプションの状態を色だけで表示していることです。これは色覚障碍者にとってあまり良いことではありません。第二に、ウェブの標準的な必須状態の表記は、アスタリスク、または必須という言葉を該当する操作に関連づけることだからです。

### 擬似クラスでコンテンツを生成する

`::before, ::after`擬似要素と`content`プロパティを使用すれば、要素の前、後にコンテンツの塊を表示させることができます。コンテンツの塊はDOMに追加されず、画面リーダーからも見えません。つまり文書のスタイルの一部として振る舞います。

これは、支援技術を使わせずに、ラベルやアイコンのような視覚的なインジケータを要素に追加したい場合に使えます。

### データの妥当性でスタイル設定する

フォーム検証におけるもう1つの重要で基本的な概念は、フォームコントロールのデータが有効か無効なのかです。

**:validと:invalid**

フォームコントロールは、`:valid, :invalid`擬似クラスを使用して対象とすることができます。この点について幾つか留意すべき点があります。

- 制約検証を行わないコントロールは常に有効である。
- `required`が設定されていないコントロールで、値がないものは無効となる。
- `input type email, url`の入力されたデータがパターンと一致しない場合、無効とみなされる。
- `min, max`属性で指定した範囲外にあるコントロールは、`:invalid, :out-of-range`と一致する。

それでは例として、span要素を使用して、有効・無効なデータのインジケーターを見て見ましょう。

```css
input + span {
  position: relative;
}

input + span::before {
  position: absolute;
  right: -20px;
  top: 5px;
}

input:invalid {
  border: 2px solid red;
}

input:invalid + span::before {
  content: '✖';
  color: red;
}

input:valid + span::before {
  content: '✓';
  color: green;
}
```

**:in-rangeと:out-of-range**

この擬似クラスの注目すべきところは、データが範囲内にある入力欄は、`:valid`擬似クラスに一致し、範囲外である入力欄は、`:invalid`擬似クラスに一致する点です。ではなぜこの2つの擬似クラスはあるのでしょうか。それは範囲外が無効であることを伝えるためです。つまりユーザに、なぜ無効なのか具体的に伝えることができます。

```css
input + span {
position: relative;
}

input + span::after {
  font-size: 0.7rem;
  position: absolute;
  padding: 5px 10px;
  top: -26px;
}

input:required + span::after {
  color: white;
  background-color: black;
  content: "Required";
  left: -70px;
}

input:out-of-range + span::after {
  color: white;
  background-color: red;
  width: 155px;
  content: "Outside allowable value range";
  left: -182px;
}
```

### 有効・無効、読み取り専用・書き込み可能

有効な要素とは、選択、クリック、入力などが可能な要素のことです。無効な要素とは、どのような方法でも操作することができず、データがサーバに送信されることのない要素のことです。この2つの状態は、`:enabled, :disabled`で対象化することができます。

**:read-onlyと:read-write**

`read-only`は、値をサーバーに送信できますが編集することはできません。`read-write`は、編集可能な状態、つまり既定の状態です。

### ラジオボタンとチェックボックス

ラジオボランとチェックボックスには、チェックと解除の状態があります。しかし、他にも考慮すべき状態がいくつかあります。

- `:default`、ページ読み込み時に既定でチェックされている状態。
- `:indeterminate`、チェックも解除もされていない状態、不定の状態。

**:checked**

最も一般的な使用方法は、チェックされたときに、`appearance: none`を使用して、システムの既定値のスタイルを削除し、自分のスタイルを構築し直したい場合に別のスタイルを追加する場合です。

使い方は、[チェック、ラジオ、トグルボタン](https://ittoku-ky73.github.io/leaning-frontend/form/Check-radio-toggle-buttons)をご覧ください。

**:defaultと:indeterminate**

`:default`擬似クラスは、ページ読み込み時に既定でチェックされるラジオ。チェックボックスに、チェックされていない時でも一致します。これは、ユーザが選択をリセットしたい場合に備えて、既定値が何であったかを知りたい場合に有用です。

`:indeterminate`擬似クラスは、ラジオ・チェックボックスがチェックでも解除でもない状態にある時に一致します。これはどういうことでしょうか。下記をご覧ください。

- `input/radio`入力で同じ名前のグループ内のすべてのラジオボタンのチェックが外れている場合
- `input/checkbox`入力の`interminate`プロパティがJavaScriptによって`true`に設定された場合
- `progress`要素に値がない場合

これは、あまり頻繁に使用するものではないでしょう。例えば、ユーザが次に移動する前に、必ずラジオボタンを選択する必要があることを知らせたいときなどに使用します。

### その他の擬似クラス

他にも興味深い擬似クラスはたくさんありますが、ここでは、その中で特に興味深い擬似クラスを見ていきます。

**ほぼブラウザのサポートあり**

- `:focus-within`、フォーカスを保有する要素、あるいはフォーカスを保有する要素を含む要素に一致します。これは、フォーム内の入力にフォーカスが当たったときにフォーム全体を何らかの方法でハイライトさせたい場合に使います。
- `:focus-visible`、キーボード操作によってフォーカスを受けた要素に一致します。これはキーボードフォーカスのために使用したい場合に使います。
- `:placeholder-snown`、`input, textarea`要素の値が空で、placeholder属性が表示している場合に一致します。

**ブラウザのサポート不十分**

- `:blank`、全くサポートされていないのでスルー。
- `:user-invalid`、こちらはよくわからないが多分サポートされていない。

### スキルをテスト

では最後にこのページで学んだ擬似要素のスタイル付けを実装していきます。

- MDN
  - [requiredとout-of-rangeの擬似クラス](https://mdn.github.io/learning-area/html/forms/pseudo-classes/out-of-range.html)
  - [enabledの擬似クラス](https://mdn.github.io/learning-area/html/forms/pseudo-classes/enabled-disabled-shipping.html)
  - [read-onlyの擬似クラス](https://mdn.github.io/learning-area/html/forms/pseudo-classes/readonly-confirmation.html)
  - [interminateの擬似クラス](https://mdn.github.io/learning-area/html/forms/pseudo-classes/radios-checked-indeterminate.html)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/form/Various-UI-pseudo-classes)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/form/Various-UI-pseudo-classes)

### まとめ

これらはを覚えておくと、他のウェブフォームとは一味違うフォームになる。かも🤣
