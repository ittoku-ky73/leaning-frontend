# イベント処理

> 参考: https://en.reactjs.org/docs/handling-events.html

Reactのイベント処理は、DOM要素のイベント処理とよく似ています。が以下のような違いが少しあります。

- Reactのイベント名は、キャメルケースを使う
- JSXではイベントハンドラは文字列ではなく、関数を渡す

下記のコードの上の部分はHTML、下はReactのイベントの例です。

```javascript
<button onclick="activateLasers()">
  Activate Lasers
</button>

<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Reactではデフォルトの動作を防ぐために`false`を返すことができません。つまり、`preventDefalt()`などの関数を明示的に呼び出しておく必要があります。

```javascript
<form onsubmit="console.log("You clicked submit."); return false">
  <button type="submit">Submit</button>
</form>

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

引数の`e`はイベントのことで、ReactでもW3Cの仕様に従って定義をしているので、普通に動作しますが、Reactのイベントは、ネイティブのイベントと全く同じように動作するわけではありません。

Reactでは、DOMが生成された後に、`addEventListener`を呼び出してリスナーを追加する必要はありません。代わりに要素が最初にレンダリングされるときにリスナーを提供します。

ES6クラスを使ってコンポーネントを定義する場合、イベントハンドラをクラス上のメソッドとするのが一般的です。以下のコードをご覧ください。

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON": "OFF"}
      </button>
    );
  }
}
```

JSXのコールバックで、JavaScriptのクラスメソッドはデフォルトでバインドされません。もし`this.handleClick`のバインドを忘れると未定義となりエラーを吐きます。

これはReactの固有の動作ではなく、JavaScriptの関数の動作に当たります。`onClick={this.handleClick}`でメソッドの後にカッコを付けずに参照した場合にバインドが必要となります。

`bind`が煩わしい場合は、以下の2つの書き方で回避することができます。

```javascript
class Toggle extends React.Component {
  handleClick = () => { console.log("this is:", this); }
  
  render() {}
}

class Toggle extends React.Component {
  handleClick() { console.log("this is:", this); }
  
  render() { return <button onClick={() => this.handleClick()}>Click me</button> }
}
```

上記の書き方では、コールバックが下位のコンポーネントに`props`として渡されると、余分な際レンダリングが起きパフォーマンスがほんの少し低下します。
そのため一般的には、コンストラクタでバインドするか、クラスフィールド構文を使用する方が良いでしょう。

## イベントハンドラに引数を渡す

イベントハンドラに追加のパラメータを渡す方法は2つあります。

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
