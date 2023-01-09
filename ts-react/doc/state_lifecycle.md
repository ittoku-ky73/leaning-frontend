# stateとライフサイクル

> 参考: https://ja.reactjs.org/docs/state-and-lifecycle.html

ここでは、Reactコンポーネントにおける`state`とライフサイクルについて説明します。

前の章に書いた時計の例を考えてみましょう。そこでは以下のように実装を行いました。

```javascript
const root = ReactDOM.createRoot(document.querySelector("#root"));

function tick() {
  const element = (
    <div>
      <h1>Hello World!</h1>
      <h2>
        It is {new Date().toLocaleTimeString()}.
      </h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

この章では、上記のコードからClockコンポーネントを作成し、再利用可能でカプセル化されたものを作ります。

ではまずは、時計の見た目から始めましょう。

```javascript
const root = ReactDOM.createRoot(document.querySelector("#root"));

function Clock(props) {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>
        It is {props.date.toLocaleTimeString()}.
      </h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()}) />);
}

setInterval(tick, 1000);
```

まだまだ完成ではありません。Clockがタイマーを設定してUIに毎秒五個描画するという処理は、Clock内部で実装すべきです。
つまりレンダーするところ、`root.render(<Clock />)`のように書きたいということです。

これを実装するには、`state`を使用する必要があります。`state`は`props`と似ていますが、コンポーネントによって完全に管理されるプライベートなものです。

## 関数をクラスに変換する

Clockを関数コンポーネントからクラスに変換しましょう。

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>
          It is {props.date.toLocaleTimeString()}.
        </h2>
      </div>
    );
  }
}
```

`render`メソッドは更新が発生した際に毎回呼ばれますが、同一のDOMノード内で`<Clock />`をレンダーしている限り、`state`やライフサイクルメソッドの機能が使えます。

## クラスに`state`を追加する

以下の手順で`date`を`props`から`state`に移行します。

まずは`this.props.date`から`this.state.date`に書き換えます。次にクラスにコンストラクタを追加します。
クラスのコンポーネントは`props`を引数として親クラスのコンストラクタに渡す必要があります。
最終的に以下のようなコードになります。

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>
          It is {this.state.date.toLocaleTimeString()}.
        </h2>
      </div>
    );
  }
}
```

## クラスにライフサイクルメソッドを追加する

多くのコンポーネントを持つアプリケーションでは、コンポーネントが破棄されたときに、占有していたリソースを解放すべきです。

タイマーの設定は、ClockがDOMに描画されるときにします。これをReactではマウント(mounting)と言います。
タイマーのクリアは、ClockのDOMが削除されるときにします。これをReactではアンマウント(unmounting)と言います。

コンポーネントクラスで特別なメソッドを宣言することで、コンポーネントをマウント、アンマウントします。これらのメソッドはライフサイクルメソッドと呼ばれます。

```javascript
class Clock extends React.Component {
  ...
  componentDidMount() {}
  componentWillUnmount() {}
  ...
}
```

`componentDidMound()`メソッドは、出力がDOMにレンダーされた後に実行されます。

```javascript
componentDidMound() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

`componentWillUnmount()`メソッドは、DOMが削除されたときに実行されます。

```javascript
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

コンポーネントの`state`の更新に、`this.setState()`を使用します。

```javascript
tick() {
  this.setState({
    date: new Date()
  });
}
```

上記のコードをClockに追加すると、毎秒ごとに時間を刻みます。ここで何が起きているのか説明します。

1. `<Clock />`がレンダーに渡され、コンストラクタを呼び出し、初期化を行います。
2. Clockの`render()`メソッドが呼び出され、ページにDOMを表示します。
3. `componentDidMount()`ライフサイクルメソッドが呼び出され、タイマーを設定します。
4. ブラウザは毎秒ごとに`tick()`メソッドを呼び出し、Clockコンポーネントは現在自国を含んだオブジェクトを引数として`setState()`を呼び出し、UIの更新を行います。つまり、`this.state.date`の値は毎秒ごとに変化するということです。
5. 何らかの形でClockコンポーネントがDOMから削除されたら、`componentWillUnmount()`ライフサイクルメソッドを呼び出し、タイマーを停止します。

## `state`を正しく使用する

`setState()`について3つ重要なことがあります。

**stateを触接変更しない**

`state`の値を変更するには、`setState()`を使う必要があります。`state`の値を直接変更しても再レンダーされません。

```javascript
this.state.comment = 'Hello';  // NG
this.setState({ comment: 'Hello' });  // OK
```

**stateの更新は非同期で行われる可能性がある**

Reactはパフォーマンスのために複数の更新を`setState()`でまとめて処理することがあります。

`this.props, this.state`は非同期に更新されるため、`state`を求めるときに値に依存すべきではありません。例えば以下のコードでは、一番上ではカウンターの更新に失敗することがありますが、一番下のコードは正しいコードです。

```javascript
this.setState({
  counter: this.state.counter + this.props.increment,
});

this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment,
  };
});
```

**stateの更新はマージされる**

Reactは`setState()`呼び出し時に、与えられたオブジェクトを現在のstateにマージします。

```javascript
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: [],
  };
}

componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts,
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments,
    });
  });
}
```

上記のコードでは、`posts, comments`は別々で更新されます。マージは浅く行われるので、`comments`を変更する場合、`comments`のみを完全に置き換えることができます。

## データは下方向に伝わる

親コンポーネントも子コンポーネントも、あるコンポーネントがステートフルかステートレスか、関数かクラスか知る必要はありません。

この状態はローカル、カプセル化と呼ばれ、そのコンポーネント以外からはアクセスできないようになります。

コンポーネントは、その状態を子コンポーネントに`props`を渡すことで選択できます。下記のコードのFormattedDateコンポーネントは`props`で日付を受け取りますがそれはClockからきたのか、Clockの`props`からきたのか知ることはできません。

```javascript
<FormattedDate date={this.state.date} />

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>
}
```

これは、トップダウン、単一方向のデータフローと呼ばれます。ある特定のコンポーネントによって所有され、その状態から派生するデータやUIは、ツリーの中の下のコンポーネントのみ影響を与えることができます。
