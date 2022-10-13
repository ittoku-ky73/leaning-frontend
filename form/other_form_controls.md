# その他のフォームコントロール

> https://developer.mozilla.org/ja/docs/Learn/Forms/Other_form_controls

このページでは、input要素以外のフォーム要素の機能について見ていきます。

### 複数行のテキストフィールド

複数行のテキストフィールドは次のように書きます。

```html
<textarea cols="30" rows="8"></textarea>
```

**textarea要素の特徴**

- 送信データ内に改行を入れることができる。
- input要素のvalue属性のような機能は、textarea要素の中に入れることで可能となる。
- textarea要素にはなんでも入るが、この性質によりプレーンテキストコンテンツのように描画されます。
- 入力されたテキストは折り返される。またドラッグすることで要素のサイズを変更できる。

下記のスクリーンショットは、macOSでのFirefox、Safari、Windows10でのEdge、Yandex、Firefox、Chromeにおける、textarea要素の

- 既定状態
- フォーカス状態
- 無効状態状態

を示しています。

![textarea_basic](https://developer.mozilla.org/en-US/docs/Learn/Forms/Other_form_controls/textarea_basic.png)

#### 複数行レンダリングの制御

textarea要素では、レンダリングを制御する3つの属性があります。

1. `cols`、テキストコントロールの幅（桁数）を平均的な文字幅で指定します。既定値は20です。
2. `rows`、コントロールの行数を指定します。既定値は2です。
3. `wrap`、コントロールがどのようにテキストを折り返すかを指定します。既定値はsoftです。値は3種類指定できます。
   1. `soft`、送信されるテキストは改行されないが、ブラウザでは折り返す。
   2. `hard`、送信テキストとレンダリングされるテキスト両方を折り返す。col属性の指定が必要。
   3. `off`、折り返しを行わない。

#### テキストエリアのリサイズ制御

textarea要素のリサイズは、CSSのresizeプロパティで制御できます。値は次のとおりです。

- `both`、垂直ともリサイズ許可。既定値。
- `horizontal`、水平のみリサイズ許可。
- `vertical`、垂直のみリサイズ許可。
- `none`、リサイズを許可しない。
- `block/inline`、方向のみにリサイズ許可。サポートが微妙。

### ドロップダウンコントロール

ドロップダウンコントロールは、ユーザーインターフェイスのスペースをあまり取らずに、ユーザがさまざまなオプションから選択できるようにするためのシンプルなコントロールです。HTMLには、選択ボックスと自動補完ボックスという2つの形式のドロップダウンコンテンツがあります。

#### 選択ボックス

単純な選択ボックスは、1つ以上のoption要素を子要素として持つselect要素で生成され、それぞれが可能な値のうち1つを指定します。

```html
<select name="simple" id="simple">
  <option>Banana</option>
  <option selected>Cherry</option>
  <option>Lemon</option>
</select>
```

selected属性を使用することで、選択ボックスの既定値を指定できます。

**optgroupの使用**

optgroup要素は、option要素を入れ子にすることで、視覚的に関連する値のグループを生成します。

```html
<select name="simple" id="simple">
  <optgroup label="Fruits">
    <option>Banana</option>
    <option selected>Cherry</option>
    <option>Lemon</option>
  </optgroup>
  <optgroup label="Vegetables">
    <option>Carrot</option>
    <option>eggplant</option>
    <option>yam</option>
  </optgroup>
</select>
```

**value属性の使用**

option要素にvalue属性を指定することで、サーバに送られるフォームデータのその値を指定することができます。これはブラウザで表示している文字と、サーバに送りたい文字が違う場合に便利です。

```html
<select id="simple" name="simple">
  <option value="banana">大きく美しい黄色いバナナ</option>
  <option value="cherry">ふくよかでジューシーなさくらんぼ</option>
  <option value="lemon">鋭くて力強いレモン</option>
</select>
```

**複数選択の選択ボックス**

select要素にmultiple属性を追加することで、ボックスの複数選択が可能になります。

```html
<select name="simple" id="simple" multiple size="2">
  <option>Banana</option>
  <option selected>Cherry</option>
  <option>Lemon</option>
</select>
```

複数選択するには、`Cmd/Ctrl`を押しながらクリックします。使いづらいです。

#### 自動補完のボックス

自動補完のボックスは、option要素にdatalist要素を入れ子にすることで作成します。

```html
<label for="myFruit">What is your favorite fruit?</label>
<input type="text" name="myFruit" id="myFruit" list="mySuggestion">
<datalist id="mySuggestion">
  <option>Apple</option>
  <option>Banana</option>
  <option>Black cherry</option>
  <option>Blue berry</option>
  <option>Lemon</option>
  <option>Lychee</option>
  <option>Peach</option>
  <option>Apple pear</option>
</datalist>
```

**datalist要素の対応状況と代替手段**

ほぼすべてのブラウザでサポートしています。IEではサポートしていなかったみたいですが、もう関係ありません。飛ばします。

**より目立たないdatalistの使用方法**

datalist要素は、選択ボックス以外のウィジェットでも使うことができます。例えば、スライダーでは目もりを書くことができたり、色指定ではカスタマイズしたパレットを既定で使用できたりします。しかし、これらの機能はブラウザによって挙動が異なったり、サポートが不十分であったりします。

### その他のフォーム機能

目立つようなものではありませんが、状況によっては有用なフォーム機能を紹介していきます。

#### メーターとプログレスバー

数値を視覚的に表現するウィジェット。

**progress**

プログレスバーは、max属性を用いて指定した最大値まで時間と共に変化する値を表します。この機能は、ダウンロードされたファイルの総数の割合や、アンケートで記入された質問の数など、進捗状況の報告をするときに使用します。

```html
<progress max="100" value="75">75/100</progress>
```

progress要素の入れ子のテキストは、この要素に対応していないブラウザや、画面リーダーが発生するための代替となります。

**meter**

メーターは、max, min値で区切られた範囲内の固定された値を表します。

```html
<meter min="0" max="100" value="75" low="33" high="66" optimum="50">75</meter>
```

low, high属性を指定することで、範囲を設定し、範囲外に値が設定されていれば、バーの色が変わります。

optimum属性はmeter要素の最適な値を定義します。low, high値を組み合わせて、どの範囲の値を推奨するか定義します。

メーターの色には次のような意味があります。

- 値が推奨部分にある場合、緑色になる。
- 値が平均部分にある場合、黄色になる。
- 値が最悪の部分にある場合、赤色になる。

メーターとプログレスバーのサポートはかなり良好です。IEは対応していませんが、もう関係ありません！

### まとめ

あんまり使わないみたいな書いているけど結構使う場面あるよな🧐全部つかうよ😅あとプログレスバーとメーターが面白そう😆
