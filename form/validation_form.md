# フォーム検証

> https://developer.mozilla.org/ja/docs/Learn/Forms/Form_validation

このページでは、クライアント側フォーム検証の基本概念と例を見ていきます。

クライアント側の検証は最初のチェックであり、ユーザの使い勝手を良くするために重要な機能です。クライアント側で不当なデータを捕捉することでユーザはすぐに修正できます。サーバへの往復とクライアント側に戻ってユーザにデータを修正するように指示することになり時間を浪費します。

しかし、クライアント側の検証はセキュリティ対策とは考えられません。アプリは常にサーバ側でもクライアント側と同様に送信されたデータをチェックするべきです。なぜならクライアント側の検証は容易に回避することができ、悪意あるユーザは簡単に不正なデータを送信することができるからです。

### フォーム検証とは

データを入力したときにブラウザ、アプリケーションがそのデータが正しい書式であるか、設定された制約に合っているかをチェックします。また有名なサイトの登録フォームで、正しくない書式で入力をすると次のようなメッセージが表示されると思います。

- このフィールドは必須です。
- 電話番号は、XXX-XXXXの形式で入力してください。
- 有効なメールアドレスを入力してください。
- パスワードは8文字から30文字の間で、1文字以上の大文字、記号、数字を含む必要があります。

情報が正しく書式化されていれば、アプリケーションはデータをサーバに送信し、データベースに保存することができます。情報が正しく書式化されていなければ、修正すべき点を説明するエラーメッセージを表示して、ユーザに再試行を促します。

なぜフォーム検証をする必要があるのか、理由は主に3つあります。

| 理由                                     | 説明                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| 正しいデータを正しい書式で入力してほしい | ユーザのデータが誤った形式で格納されたり、ユーザが正しい情報を入力しなかったり、省略したりすると、<br />アプリケーションが正しく動作しない可能性があるから。 |
| ユーザのデータを保護したい               | ユーザに安全なパスワードを入力させることで、アカウント情報を保護しやすくするため。 |
| 自分達を守りたい                         | 悪意あるユーザが保護のないフォームを悪用して、アプリケーションに危害を加える可能性があるから。 |

> クライアントからサーバーに渡されたデータを信用しないでください。フォームが正しく検証を行い、クライアント側で悪意のある入力を防いでいるとしても、ネットワークリクエストを改竄することができるからです。

### さまざまな種類のフォーム検証

ウェブで見かけるクライアント側のフォーム検証には2種類あります。

| フォーム検証         | 種類                                                         |
| -------------------- | ------------------------------------------------------------ |
| 組み込みフォーム検証 | HTMLフォームの検証の機能。<br />パフォーマンスは良いが、カスタマイズが微妙。 |
| JavaScript検証       | カスタマイズが可能。<br />が、1から作る必要がある。          |

### 組み込みフォーム検証の利用

JavaScriptに頼らないユーザーデータの検証の機能は次のようになっています。

| フォーム要素の検証     | 説明                           |
| ---------------------- | ------------------------------ |
| `required`             | 必須項目                       |
| `minlength, maxlength` | データ（文字列）の最小、最大長 |
| `min, max`             | 数値の最小、最大値             |
| `type`                 | フィールドのデータタイプの指定 |
| `pattern`              | データの正規表現による指定     |

また要素が妥当な場合、要素がCSSの`:valid`擬似クラスに一致したり、ユーザはデータを送信することができます。

要素が不正の場合、要素がCSSの`:invalid`擬似クラスに一致したり、ユーザはデータを送信させなくし、エラーメッセージを表示します。

### 入力要素の制約の検証

ここでは、組み込みのフォーム検証を使用した例を見ていきます。

HTML

```html
<form>
  <p>
    <fieldset>
      <legend>Do you have a driver's license?<span aria-label="required">*</span></legend>
      <input type="radio" required name="driver" id="r1" value="yes"><label for="r1">Yes</label>
      <input type="radio" required name="driver" id="r2" value="no"><label for="r2">No</label>
    </fieldset>
  </p>
  <p>
    <label for="n1">How old are you?</label>
    <input type="number" min="12" max="120" step="1" id="n1" name="age" pattern="\d+">
  </p>
  <p>
    <label for="t1">What's your favorite fruit?<span aria-label="required">*</span></label>
    <input type="text" id="t1" name="fruit" list="l1" required pattern="[Bb]anana|[Cc]herry|[Aa]pple|[Ss]trawberry|[Ll]emon|[Oo]range">
    <datalist id="l1">
      <option>Banana</option>
      <option>Cherry</option>
      <option>Apple</option>
      <option>Strawberry</option>
      <option>Lemon</option>
      <option>Orange</option>
    </datalist>
  </p>
  <p>
    <label for="t2">What's your e-mail address?</label>
    <input type="email" id="t2" name="email">
  </p>
  <p>
    <label for="t3">Leave a short message</label>
    <textarea id="t3" name="msg" maxlength="140" rows="5"></textarea>
  </p>
  <p>
    <button>Submit</button>
  </p>
</form>
```

CSS

```css
form {
  font: 1em sans-serif;
  max-width: 320px;
}

p > label {
  display: block;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea,
fieldset {
  width: 100%;
  border: 1px solid #333;
  box-sizing: border-box;
}

input:invalid {
  box-shadow: 0 0 5px 1px red;
}

input:focus:invalid {
  box-shadow: none;
}
```

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/blob/main/html/forms/form-validation/full-example.html)
  - [ライブ](https://mdn.github.io/learning-area/html/forms/form-validation/full-example.html)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/form/Embedded-form-validation)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/Embedded-form-validation)

### JavaScriptを使用したフォーム検証

次に、JavaScriptを使用したフォーム検証について見ていきます。

**制約検証API**

多くのブラウザでサポートしており、以下のフォーム要素DOMインターフェイスで利用できます。

- [HTMLButtonElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLButtonElement)
- [HTMLFieldSetElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLFieldSetElement)
- [HTMLOutputElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLOutputElement)
- [HTMLSelectElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLSelectElement)
- [HTMLTextAreaElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLTextAreaElement)

以下のプロパティが利用できます。

- `validationMessage`、コントロールが満たさない検証制約を記述したローカライズされたメッセージを返します。
- `validity`、要素の検証状態を説明する`ValidityState`オブジェクト。検証できることについては[ValidityState](https://developer.mozilla.org/ja/docs/Web/API/ValidityState)に書いています。

form要素に対しての制約検証APIで次のようなメソッドを利用することができます。

- `checkValidity()`、要素の値で妥当性の問題がない場合、`true`を返します。要素が不正の場合、`false`を返し、[invalidイベント](https://developer.mozilla.org/ja/docs/Web/API/HTMLInputElement/invalid_event)を発生させます。
- `setCustomValidity(message)`、要素に独自のエラーメッセージを追加します。

**独自のエラーメッセージを実装する**

HTMLのフォーム検証のエラーメッセージは、ブラウザによって異なります。またこれには2つの欠点があります。

- CSSでメッセージの表示方法を変更するための標準的な方法がない。
- メッセージはブラウザのロケールに依存しており、ある言語のページでエラーメッセージが別の言語で表示されることがある。

これらは制約検証APIの最も一般的なユースケースです。使用例も見ていきましょう。

```javascript
const email = document.querySelector('#email');

email.addEventListener('input', () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity('I am expecting an e-mail address');
    email.reportValidity();
  }
  else {
    email.setCustomValidity('');
  }
});
```

**より詳細な例**

次に少し複雑な独自の検証を作成してみます。

```html
<form novalidate>
  <p>
    <label for="email">
      <span>メールアドレスを入力してください。</span>
      <input type="eemail" name="email" id="email" required minlength="8">
      <span class="error" aria-live="polite"></span>
    </label>
  </p>
  <button>Submit</button>
</form>
```

ここではブラウザの自動検証を無効にするために、`novalidate`属性を使用しています。ただし、これは制約検証APIの対応やCSSの擬似クラスの適用を無効にしているわけではありません。これについては自分で制御を行う必要があります。

span要素の`aria-live`属性は、画面リーダーのような支援技術を使用している人々を含む独自のエラーメッセージを設定できます。

次にCSSを見ていきます。

```css
body {
  font: 1em sans-serif;
  width: 200px;
  padding: 0;
  margin: 0 auto;
}

p * {
  display: block;
}

input[type="email"] {
  appearance: none;

  width: 100%;
  border: 1px solid #333;
  margin: 0;

  font-family: inherit;
  font-size: 90%;

  box-sizing: border-box;
}

input:invalid {
  border-color: #900;
  background-color: #fdd;
}

input:focus:invalid {
  outline: none;
}

.error {
  width: 100%;
  padding: 0;

  font-size: 80%;
  color: white;
  background-color: #900;
  border-radius: 0 0 5px 5px;

  box-sizing: border-box;
}

.error.active {
  padding: 0.3em;
}
```

そしてJavaScriptです。ここでは次のことをしています。

- 入力値を変えるたびに、妥当なデータかチェックします。
- フォームの送信を試すごとに、妥当なデータかチェックし、妥当でなければエラーを表示し、フォームの送信を止めます。
- `showError()`は、入力の`validity`オブジェクトのプロパティを使って、適当なエラーメッセージを表示します。

```javascript
const form = document.querySelector("form");
const email = document.getElementById("#email");
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = "error";
  }
  else {
    showError();
  }
});

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    showError();
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.'';
  }
  else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  emailError.className = "error active";
}
```

### 組み込みAPIを使用しないフォーム検証

古いブラウザやカスタムコントロールなどでは、制約検証APIを使用できない場合があります。こののような場合でもフォーム検証するためにJavaScriptを使用します。この場合、実際のデータの検証よりもユーザーインターフェイスの問題の方が大きくなります。

フォームを検証するためにはいくつか考えておかなければいけないことがあります。

- どのような検証を実施するべきか。
- フォームが妥当でない場合、何をするべきか。
- ユーザが不正なデータを修正することをどのように支援できるか。

**制約検証APIを使用しない例**

では実際に書いていきましょう。主にJavaScriptに変更を加えていきます。

```javascript
const form = document.querySelector("form");
const email = document.getElementById("#email");
const emailError = document.querySelector("#email + span.error");

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

window.addEventListener("load", () => {
  const isValid = email.value.length === 0 || emailRegExp.test(email.value);
  email.className = isValid ? "valid" : "invalid";
});

email.addEventListener("input", (event) => {
  const isValid = email.value.length === 0 || emailRegExp.test(email.value);

  if (isValid) {
    email.className = 'valid';
    emailError.textContent = '';
    emailError.className = "error";
  }
  else {
    showError();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = email.value.length === 0 || emailRegExp.test(email.value);

  if (isValid) {
    email.className = 'valid';
    emailError.textContent = '';
    emailError.className = "error";
  }
  else {
    email.className = "invalid";
    error.textContent = "I expect an e-mail, darling!";
    error.className = "error active";
  }
});

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.'';
  }
  else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  emailError.className = "error active";
}
```

自分で検証システムを構築するのは大変ということはありません。しかしフォーム検証を行うことのできる[Validate.js](https://rickharrison.github.io/validate.js/)ライブラリを使うことで簡単に検証システムを構築することができます。使い方を学ばなければいけないですが。

- MDN
  - [ソースコード](https://github.com/mdn/learning-area/blob/main/html/forms/form-validation/detailed-custom-validation.html)
  - [ライブ](https://mdn.github.io/learning-area/html/forms/form-validation/detailed-custom-validation.html)
- ittoku-ky73
  - [ソースコード](https://github.com/ittoku-ky73/leaning-frontend/blob/main/form/Javascript-form-validation)
  - [ライブ](https://ittoku-ky73.github.io/leaning-frontend/form/Javascript-form-validation)

### まとめ

しんどい...勉強は辛い...😩ここらへんの話はややこしい。
