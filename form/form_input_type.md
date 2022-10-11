# フォームの入力型

> 参考：https://developer.mozilla.org/ja/docs/Learn/Forms/HTML5_input_types

このページでは、HTML5で追加された最近のフォームコントロールの機能と特定のデータを集める新しい入力型を見ていきます。

### メールアドレスフィールド

単一行のメールアドレスフィールドは次のように書きます。

```html
<input type="email" name="email" id="email">
```

テキストフィールドとの主な違いは、入力された値をメールアドレスかどうか検証する点です。また、`multiple`属性を追加するとカンマ（,）区切りにすることで複数のメールアドレスを入力することもできます。

### クライアント側の検証

メールアドレスフィールドには、組み込みでクライアント側のエラー検証機能（データがサーバに送られる前にブラウザで実行されるもの）があります。これはユーザが正確に入力するのに役立ち時間を短縮できます。データが正しくないことをサーバとのラウンドトリップを待つことなくすぐに知ることができます。

しかしこれは完全なセキュリティ対策ではありません。クライアント側の検証はオフにできるため、悪意あるユーザは不正なデータを簡単にサーバに送ることができるからです。

既定の制約では、`a@b`は有効なメールアドレスです。これはイントラネットのメールアドレスを許可しているためです。異なる検証動作を実装するには、`pattern`属性を使います。これによりエラーメッセージをカスタムすることができます。

### 検索フィールド

検索フィールドは次のように書きます。

```html
<input type="search" name="search" id="search">
```

テキストフィールドとの主な違いは、ブラウザのスタイル設定です。検索フィールドでは、フィールドが角丸で描画されます。また値をクリアする「x」マークもあります。そしてキーボードのある端末では、Enterキーで検索、あるいは虫眼鏡アイコンが表示されることもあります。

下記のスクリーンショットではmacOSでのFirefox 71、Safari 13、Chrome 79、Windoes10でのEdge 18、Chrome 79での、検索フィールドが

- 既定の場合
- フォーカスされた場合
- 無効の場合

を表しています。

![search_focus](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types/search_focus.png)

### 電話番号フィールド

電話番号を入力する特殊なフィールドは次のように書きます。

```html
<input type="tel" name="tel" id="tel">
```

動的キーボード付きのタッチ端末でアクセスした時、数字のキーパッドを表示します。また世界中にはいろいろな電話番号の書式があるため、このフィールドはユーザが入力した値に制約をつけません。制約をつけるには、`pattern`属性を使用します。

### URLフィールド

URLを入力するための特殊なフィールドは次のように書きます。

```html
<input type="url" name="url" id="url">
```

このフィールドは、検証を行います。ブラウザはプロトコルがない場合や、URLの形式がよくない場合にエラーを発します。

### 数値フィールド

数値入力用のフィールドは次のように書きます。

```html
<input type="number" name="age" id="age" min="1" max="10" step="2">
```

`min, max`属性は最小値、最大値を指定します。`step`属性はスピナーボタンを押した時の値の振れ幅を指定します。また小数点は有効です。

### スライダーコントロール

数値入力用のスライダーは次のように書きます。

```html
<input type="range" name="price" id="price" min="50000" max="500000" step="100" value="250000">
```

属性については数値フィールドと似ています。似ていない点としてはスライダーフィールドには現在の数値が幾つなのかフィードバックがないことです。つまりスライダーの数値を出力する要素を追加する必要があるということです。これには、output要素やJavaScriptを使用します。

output要素を組み合わせた書き方は次のようになります。

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
  <input type="range" id="b" name="b" value="50" /> +
  <input type="number" id="a" name="a" value="10" /> =
  <output name="result" for="a b">60</output>
</form>
```

JavaScriptを用いた書き方は次のようになります。

```javascript
const price = document.querySelector('#price');
const output = document.querySelector('.price-output');

output.textContent = price.value;

price.addEventListener('input', () => {
  output.textContent = price.value;
});
```

### 日付と時刻ピッカー

日付と時刻の値を収集することは、ウェブ開発者にとって悪夢でした。使い勝手を重視するなら、カレンダーを選択するUIを提供することが重要です。

これにより、ユーザはネイティブのカレンダーアプリケーションに切り替えることなく日付を選択でき、解釈しにくいさまざまな形式で日付を入力することができます。前千世紀の最後の1分は、`1999/12/31 23:59, 12/31/99T11:59PM`のようにさばざまな方法で入力される可能性があります。

HTMLの日付コントロールは、カレンダーウィジェットを提供して統一されたデータを作成し、この種類のデータを扱うことができます。

では日付や時刻に関するいろいろな型を簡単に見ていきましょう。これらの型は非常に複雑で、特にブラウザの対応を考えた場合に難しくなります。

**datetime-local**

特定のタイムゾーン情報のない日付と時刻を表示して選択するウィジェット。

```html
<input type="detetime-local" name="datetime" id="datetime">
```

**month**

年と月を表示して選択するウィジェット。

```html
<input type="month" name="month" id="month">
```

**time**

時刻の値を表示して選択するウィジェット。12時間のフォーマットで表示されるが、返り値は24時間フォーマット。

```html
<input type="time" name="time" id="time">
```

**week**

今年の週の番号を表示して選択するウィジェット。週は月曜から始まり日曜で終わります。

```html
<input type="week" name="week" id="week">
```

**date/time値の制限**

`min, max`属性で、日付と時刻に制約をつけることができます。また`step`属性も使用可能です。

```html
<input type="date" name="myDate" id="myDate" min="2013-06-01" max="2013-08-31" step="7">
```

### 色選択コントロール

色も扱いが難しいです。色の表現には、RGB（10進数、16進数）、HSL、キーワードなどがあります。返り値は16進数になります。

色を選択するフィールドは次のように書きます。

```html
<input type="color" name="color" id="color">
```

### まとめ

時間と色のフォームがむずい😅スライダーは難しそうで簡単🤣
