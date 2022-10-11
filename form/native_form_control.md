# ネイティブフォームコントロール

> 参考：https://developer.mozilla.org/ja/docs/Learn/Forms/Basic_native_form_controls

このページでは、フォームコントロールやウィジェットの機能を見ていきます。特にウェブ初期からすべてのブラウザで利用できる（元からある）フォームコントロールを見ていきます。

### テキスト入力フィールド

テキスト入力フィールドは最も基本的なフォームウィジェットです。これはユーザがあらゆる種類のデータを入力することができる方法です。

テキストフィールドには次のような共通する動作があります。

- `readonly, disabled`、ユーザが入力値を変更できない設定。
- `placeholder`、ボックス内に表示されるテキスト。
- `size, maxlength`、ボックスの物理的な大きさや入力できる最大文字数による制限。
- `spellcheck`、スペルチェックができる。

### 単一行のテキストフィールド

基本的な単一行のテキストフィールドは次のように書きます。

```html
<input type="text" name="comment" id="comment" value="I'm text field">
```

下記のスクリーンショットは、macOSでのFirefox 71、Safari、 Windows 10のChrome 79、Edge 18においてテキストフィールドが、

1. 既定の場合
2. フォーカスされた場合
3. 無効にされた場合

を示しています。

![disabled](https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls/disabled.png)

### パスワードフィールド

パスワードフィールドは次のよう書きます。

```html
<input type="password" name="pwd" id="pwd">
```

passwordの値は、フィールドに入力された値を不明瞭にして、他の人が簡単に読めないようにします。

これはユーザーインターフェイスの機能でしかないことに注意してください。テキストをエンコードしなければ、平文で送信されてしまいセキュリティ上あまり好ましくありません。つまり第三者にデータを傍受されてしまう可能性があるということです。このようなことにならないように、フォームを含むページを安全な接続（https）でホストし、データを送信する前に暗号化した方が良いでしょう。

しかしブラウザは、安全でない接続でフォームデータを送信する際に警告を表示する機能があります。

### hiddenコンテンツ

hiddenフィールドは次のように書きます。

```html
<input type="hidden" id="timestamp" name="timestamp" value="1286705410">
```

hiddenの値は、ユーザには見えないが、フォームデータを送信する時には値が送信されるようになっています。これは、注文が行われた時のタイムスタンプをサーバーに送信したい場合に使います。

また、hiddenを使うときは、name, value属性が必須になります。

### チェック可能項目

チェック可能項目とは、関連したラベルをクリックすることで状態を変更できるコントロールです。チェックボックスとラジオボタンがチェック可能項目となります。どちらも既定でチェック状態にする場合、checked属性を使用します。

これらのウィジェットは、他の要素と違い、値がチェックされていない状態でフォームデータを送信する際に、nameも含めて何も送信されないようになっています。

最大限のユーザビリティ、アクセシビリティを実現するために、関連項目のリストをfieldset要素で囲み、legend要素で説明を示すことをお勧めします。

### チェックボックス

チェックボックスは次のように書きます。関連するチェックボックス項目には同じ、name属性を使用します。

```html
<input type="checkbox" id="questionOne" name="subscribe" value="yes" checked>

<fieldset>
  <legend>Choose all the vegetables you like to eat</legend>
  <ul>
    <li>
      <label for="carrots">Carrots</label>
      <input type="checkbox" id="carrots" name="vegetable" value="carrots" checked>
    </li>
    <li>
      <label for="peas">Peas</label>
      <input type="checkbox" id="peas" name="vegetable" value="peas">
    </li>
    <li>
      <label for="cabbage">Cabbage</label>
      <input type="checkbox" id="cabbage" name="vegetable" value="cabbage">
    </li>
  </ul>
</fieldset>
```

下記のスクリーンショットは、macOSでのFirefox 71、Safari、 Windows 10のChrome 79、Edge 18のチェックボックスが、

1. 既定の場合
2. フォーカスされた場合
3. 無効にされた場合

を示しています。

![checkboxes](https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls/checkboxes.png)

チェックボックスにはオン、オフとなる性質があるため、チェックボックスはトグルボタンと考えることができ、多くの開発者やデザイナーが既定のチェックボックスのスタイルを拡張して、トグルスイッチのように見えるボタンを作成しています。

- トグルボタン
  - [ライブ](https://mdn.github.io/learning-area/html/forms/toggle-switch-example/)
  - [ソースコード](https://github.com/mdn/learning-area/blob/main/html/forms/toggle-switch-example/index.html)

### ラジオボタン

ラジオボタンは次のように書きます。関連するチェックボックス項目には同じ、name属性を使用します。

```html
<input type="radio" name="meal" id="soup" checked>

<fieldset>
  <legend>What is your favorite meal?</legend>
  <ul>
    <li>
      <label for="soup">Soup</label>
      <input type="radio" id="soup" name="meal" value="soup" checked>
    </li>
    <li>
      <label for="curry">Curry</label>
      <input type="radio" id="curry" name="meal" value="curry">
    </li>
    <li>
      <label for="pizza">Pizza</label>
      <input type="radio" id="pizza" name="meal" value="pizza">
    </li>
  </ul>
</fieldset>
```

name属性の値が同じであれば、同じグループのボタンであるとみなされ同時に1つしかチェックできないようになっています。チェックボックスと同様に、値が何も設定されていなければ、フォームデータも何も送信しません。

下記のスクリーンショットは、macOSでのFirefox 71、Safari、 Windows 10のChrome 79、Edge 18の、ラジオボタンが

1. チェックされていない場合
2. いる場合
3. フォーカスしている場合
4. 無効にされた場合

を示しています。

![radios](https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls/radios.png)

### 実際のボタン

ボタンを生成する入力型は3種類あります。

- submit、フォームデータをサーバーに送信します。
- reset、すべてのフォームウィジェットを既定値にリセットします。
- button、何も効果のないボタン。JavaScriptでカスタマイズできるものです。

またボタンそのものを表すbutton要素もあります。こちらの要素の方がスタイル付けしやすいというメリットがあります。

```html
<!-- submit -->
<button type="submit">これは送信ボタンです</button>
<input type="submit" value="これは送信ボタンです">

<!-- reset -->
<button type="reset">これはリセットボタンです</button>
<input type="reset" value="これはリセットボタンです">

<!-- button -->
<button type="button">これはただのボタンです</button>
<input type="button" value="これはただのボタンです">
```

下記のスクリーンショットは、macOSでのFirefox 71、Safari、 Windows 10のChrome 79、Edge 18の、ボタンが

1. 既定の状態

2. フォーカス状態

3. 無効状態

を表しています。

![buttons](https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls/buttons.png)

### 画像ボタン

画像ボタンコントロールは、img要素と全く同じように表示されますが、ユーザがクリックすると送信ボタンのように動作します。

```html
<input type="image" alt="Click me!" src="my-img.png" width="80" height="30">
```

画像ボタンをフォームの送信に使用する場合、ウィジェット自身の値は送信しませんが、画像上でクリックした位置のX, Y座標を送信します。これはホットマップを作成する時に便利です。

```txt
https://example.com?pos.x=123&pos.y=456
```

### ファイルピッカー

ファイル入力型は、フォームでファイルをサーバーに送信することができます。いくつかのモバイル端末では、次のようにaccept属性を追加することで、端末のカメラやマイクでキャプチャーされた写真、動画、音声にアクセスすることができます。

```html
<input type="file" name="file" id="file" accept="image/*" multiple>

<input type="file" accept="image/*;capture=camera">
<input type="file" accept="video/*;capture=camcorder">
<input type="file" accept="audio/*;capture=microphone">
```

### 共通の属性

フォームコントロールの定義に使われる要素の多くはそれぞれ固有の属性を持っています。しかし、すべてのフォーム要素に共通する属性もあります。

| 属性      | 既定値 | 説明                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| autofocus | false  | ページ読み込み時に自動的に要素にフォーカスします。<br />この属性を指定できるのは、文書内に1つだけです。 |
| disabled  | false  | ウィジェットを無効にします。ユーザが入力できないようにします。 |
| form      | none   | フォーム内に含まれていないウィジェットを関連づけます。       |
| name      | none   | 要素の名前。                                                 |
| value     | none   | 要素の初期値。                                               |

### まとめ

これらの入力型はHTMLの初期の頃に導入されたものですべてのブラウザに対応しています。次の記事では新しいtype属性の値を見ていきます。
