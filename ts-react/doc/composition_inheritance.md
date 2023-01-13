# Composition 対 Inheritance

> 参考: https://en.reactjs.org/docs/composition-vs-inheritance.html

Reactには強力なコンポジションモデルがあり、コンポーネント間でコードを再利用するために使用されます。

ここでは、React初心者が継承機能を使うと起こる問題について取り上げ、コンポジションで解決する方法も見ていきます。

## Containment

一部のコンポーネントは、子コンポーネントを知りません。しかし、`children`プロパティを使うことで、子要素に直接出力を渡せます。
これにより他のコンポーネントは、JSXをネストすることで任意の子要素を渡すことができます。

```javascript
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="dialog-title">Welcome</h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

WelcomeDialogのFancyBorderタグ内にあるものは、FancyBorderの`props.children`になります。

この方法はあまり一般的ではありませんが、たまにコンポーネントの中に穴が必要な場合があり、そこでこの方法を使うと良いでしょう。

```javascript
function About() {
  return <div>About</div>;
}

function Chat() {
  return <div>Chat</div>;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function Contacts() {
  return (
    <SplitPane
      left={<About />}
      right={<Chat />}
    />
  );
}
```

`About, Chat`などのReact要素は単なるオブジェクトなので他のデータと同じように`props`として渡すことができます。
このアプローチは、他のライブラリにおけるスロットのようなものですが、Reactの`props`には渡す時の上限はありません。

## Specialization

ときには、コンポーネントに特殊なケースを適用したい場合があります。Reactでは、コンポジションを使ってその問題に対応できます。

コンポジションは、クラスとして定義されたコンポーネントに対しても機能します。

```javascript
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event) {
    this.setState({ login: event.target.value });
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }

  render() {
    return (
      <Dialog
        title="Mars Exploration Program"
        message="How should we refer to you?"
      >
        <input
          type="text"
          value={this.state.login}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }
}
```

## Inheritanceとは

Facebookでは、何千ものReactコンポーネントを使用していますが、コンポーネントの継承階層についてはあまり議論されていません。

PropとCompositionは、コンポーネントの外観と動作を明示的かつ安全で、柔軟性のあるカスタマイズが可能です。

コンポーネント間で非UI機能を再利用したい場合、JavaScriptモジュールに抽出しそれを使用することで、関数、オブジェクト、クラスを拡張する必要がなくなります。
