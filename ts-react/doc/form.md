# ウェブフォーム

> 参考: https://en.reactjs.org/docs/forms.html

HTMLのフォーム要素は、Reactの他のDOM要素とは少し異なる動作をします。なぜならフォーム要素は何らかの内部状態を保持しているからです。

```html
<form>
  <label for="name">
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

このフォームは、ユーザーがフォームを送信したら新しいページをブラウズするという、デフォルトのHTMLフォームの動作を行います。Reactでこの動作が必要な場合はそのまま動かします。
しかし、フォームの送信を処理し、ユーザーの入力データにアクセスしたりすると、それに関するJavaScript関数があると便利です。それを制御されたコンポーネントといい、これから学んでいきます。

## 制御されたコンポーネント

HTMLには、`input, textarea, select`などのフォーム要素があり、ユーザーの入力を保持、更新を行うことができます。Reactでは、ミュータブルな状態は通常、コンポーネントの`state`に保持し、`setState()`によって更新します。

Reactの状態を、単一の真実の源とすることで、フォームをレンダリングするコンポーネントが、ユーザーの入力によるフォームの制御をすることができます。
このようにReactによって値が制御される入力フォーム要素を、制御型コンポーネントと呼びます。

例として、投稿時に名前をログに残すようにしたい場合、このように書きます。

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted:" + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

`form`要素に`value`属性が設定されており、常に`this.state.value`が要素の値となり、Reactが状態の真実の源となります。
キー入力のたびに、`handleChange`が実行され、Reactの状態が更新されるため、ユーザーの入力に応じて値も更新されます。

制御されたコンポーネントを使用すると、Reactの状態によって常に入力の値を操ることができます。また、他のUI要素に値を渡したり、他のイベントハンドラから値をリセットしたりなどができるようになります。

## テキストエリアタグ

HTMLの`textarea`要素は、文字列ではなく、テキストを入れることができます。

Reactでは、`textarea`要素の代わりに`value`属性が使用されます。こうすることで、`textarea`要素を使ったフォームで、`input`要素のように書くことができるようになります。

```javascript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("An essay was submitted:" + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

また、コンストラクタで`this.state.value`が初期化され、要素にテキストが入った状態でページが表示されます。

## セレクトタグ

HTMLの`select`要素は、ドロップダウンリストを作成します。

Reactで`select`要素を書くには次のようにします。`selected`属性は、ページを開いたときにすでに選択している値を指定できます。

```javascript
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">グレープフルーツ</option>
            <option value="lime">ライム</option>
            <option value="coconut">ココナッツ</option>
            <option value="mango">マンゴー</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

`input, textarea, select`とReactで実装してみましたがすべて書き方が似ています。これは、入力フォームによって、実装方法を変えなければいけないことから解放されます。

## ファイル入力タグ

HTMLの`input`要素の`file`タイプは、ユーザーがデバイスのストレージからファイルを選択し、 サーバーにアップロードしたり、File APIを通じてJavaScriptで操作することができます。

Reactでは、この要素の値は読み取り専用であるため、非制御コンポーネントとなります。ここでは詳しく説明はしません。

## 複数の入力に対応する

複数の入力要素を扱う場合、それぞれの要素に`name`属性を追加し、ハンドラ関数を追加します。

```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = (target.type === "checkbox") ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

TypeScriptでは上記の`setState`のようにはいかず次のように定義します。

```typescript
switch(name) {
  case "isGoing":
    this.setState({ [name]: target.checked });
    break;
  case "numberOfGuests":
    this.setState({ [name]: Number(target.value) });
    break;
}
```

## Null入力を制御する

TypeScriptでは`value`に`null`を設定することはできないようになっています。

## 制御コンポーネントの代替

Reactにはデータが変化するたびにイベントハンドラを記述し、入力状態をコンポーネントにパイプする必要があり、これは少し面倒に思うことがあると思います。
この場合、非制御コンポーネントの入力フォームを代替とすると良いでしょう。

## 本格的なソリューション

バリデーション、フィールドの追跡、フォーム送信処理などを楽に、直感的に行いたい場合は、[Formik](https://formik.org/)は人気のある選択肢の1つです。
Formikは制御されたコンポーネントと状態の管理というReactと同じ原則に基づいて作られているので、まずReactを使えるようになりましょう。
